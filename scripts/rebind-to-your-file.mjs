#!/usr/bin/env node
// Rebranche ce catalogue Code Connect sur VOTRE propre fichier Figma DSFR.
//
// Principe : les composants de ce repo sont figés sur les node-id d'un fichier Figma précis
// (scripts/manifest.json). Si vous possédez votre propre copie du fichier DSFR, ses node-id sont
// différents (Figma en réattribue à chaque duplication/republication). Ce script récupère
// l'inventaire de VOTRE fichier via l'API REST Figma, le fait correspondre au manifeste par nom de
// page + nom de composant (normalisés), puis réécrit les URLs `figma.connect` en conséquence.
//
// Aucune dépendance npm : Node >= 18 + `curl` (déjà requis par ce repo) suffisent. Aucun appel à une IA.
//
// Usage CLI :
//   node scripts/rebind-to-your-file.mjs --file-key <VOTRE_FILE_KEY> [--token <PAT>] [--apply]
//
// Sans --apply : dry-run, écrit rebind-report.json et affiche un résumé, ne modifie aucun fichier.
// Avec --apply : réécrit, uniquement pour les correspondances non ambiguës, le fileKey et les
// node-id du figma.config.json racine (documentUrlSubstitutions), seul endroit où vivent les URLs.
//
// Les fonctions ci-dessous (fetchComponents, matchManifest, applyRebind) sont exportées pour être
// réutilisées telles quelles par l'app desktop (desktop/src/main/rebind-bridge.ts) : un seul fichier
// source de vérité pour la logique de rebranchement, partagé entre le CLI et l'UI.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

function parseArgs(argv) {
  const args = { apply: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--file-key') args.fileKey = argv[++i];
    else if (arg === '--token') args.token = argv[++i];
    else if (arg === '--apply') args.apply = true;
    else if (arg === '--manifest') args.manifestPath = argv[++i];
    else {
      console.error(`Argument inconnu : ${arg}`);
      process.exit(1);
    }
  }
  return args;
}

/**
 * Normalise un nom de page Figma pour l'appariement entre fichiers : retire le suffixe
 * `🔗` (marqueur visuel « Code Connect existe ») et un préfixe emoji/symbole éventuel.
 */
export function normalizePage(page) {
  return page
    .replace(/\s*🔗\s*$/u, '')
    .replace(/^[^\p{L}\p{N}]+\s*/u, '') // retire un préfixe emoji/symbole éventuel (ex: 🆕)
    .trim();
}

/**
 * Normalise un nom de calque Figma pour l'appariement entre fichiers : harmonise
 * l'espacement et fusionne les variantes « Thème clair »/« Thème sombre ».
 */
export function normalizeName(name) {
  return name
    .replace(/\s*\/\s*/g, ' / ') // harmonise l'espacement autour des "/"
    .replace(/\s*(Thème clair|Thème sombre)\s*/gi, ' ') // fusion des variantes de thème
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Clé d'appariement unique (page + nom de calque normalisés) utilisée pour retrouver un
 * composant d'un fichier Figma à l'autre, indépendamment du node-id (qui change à chaque
 * republication du fichier).
 */
export function matchKey(page, name) {
  return `${normalizePage(page)} ${normalizeName(name)}`;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Utilise `curl` plutôt que `fetch` : `curl` respecte nativement HTTP_PROXY/HTTPS_PROXY/NO_PROXY,
// ce qui n'est pas le cas du `fetch` global de Node (undici) sans configuration additionnelle,
// important dans un réseau d'entreprise avec proxy sortant obligatoire (cas fréquent dans le
// secteur public). Aucune dépendance npm ajoutée : `curl` est présent nativement sur macOS/Linux
// (et sur Windows via Git Bash/WSL).
function fetchJson(url, token) {
  // Le token passe par la config `curl` lue sur stdin (`-K -`), jamais en argv : un argument de
  // ligne de commande reste visible via `ps` par les autres processus de l'utilisateur pendant
  // toute la durée de l'appel, contrairement à stdin.
  const result = spawnSync('curl', ['-sS', '-K', '-', url], {
    input: `header = "X-Figma-Token: ${token}"\n`,
    encoding: 'utf8',
    maxBuffer: 200 * 1024 * 1024,
    timeout: 30_000,
  });
  if (result.error) {
    throw new Error(`Impossible de lancer curl : ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(`curl a échoué (code ${result.status}) : ${result.stderr}`);
  }
  let body;
  try {
    body = JSON.parse(result.stdout);
  } catch {
    throw new Error(`Réponse Figma illisible : ${result.stdout.slice(0, 500)}`);
  }
  if (body.error) {
    throw new Error(`Figma API : ${body.status ?? ''} ${body.message ?? JSON.stringify(body)}`);
  }
  return body;
}

// On interroge les endpoints de métadonnées `/components` et `/component_sets` (légers, sans la
// géométrie complète du fichier) plutôt que `/files/:key` (l'arbre complet, potentiellement énorme
// et lent à générer sur un fichier de cette taille). Ces deux endpoints nécessitent un token avec
// le scope "File content" (`files:read` / `file_read` / `library_content:read`), le scope par
// défaut d'un token Figma personnel classique, mais PAS celui, plus restreint, d'un token généré
// uniquement pour publier du Code Connect (Dev Mode > Code Connect > Get access token).
export function fetchComponents(fileKey, token) {
  const items = [];
  for (const endpoint of ['components', 'component_sets']) {
    const body = fetchJson(`https://api.figma.com/v1/files/${fileKey}/${endpoint}`, token);
    for (const c of body.meta?.[endpoint] ?? []) {
      items.push({ nodeId: c.node_id, name: c.name, page: c.containing_frame?.pageName ?? '' });
    }
  }
  return items;
}

// Compare le manifeste de référence à l'inventaire d'un fichier cible : classe chaque composant du
// manifeste en matched (correspondance unique) / ambiguous (plusieurs candidats) / missing (aucun).
export function matchManifest(manifest, targetComponents) {
  const targetIndex = new Map();
  for (const c of targetComponents) {
    const key = matchKey(c.page, c.name);
    if (!targetIndex.has(key)) targetIndex.set(key, []);
    targetIndex.get(key).push(c);
  }

  const matched = [];
  const ambiguous = [];
  const missing = [];

  for (const source of manifest.components) {
    const key = matchKey(source.page, source.name);
    const candidates = targetIndex.get(key) ?? [];
    if (candidates.length === 1) {
      matched.push({ ...source, targetNodeId: candidates[0].nodeId });
    } else if (candidates.length === 0) {
      missing.push(source);
    } else {
      ambiguous.push({ ...source, candidates: candidates.map((c) => c.nodeId) });
    }
  }

  return {
    matched,
    ambiguous,
    missing,
    summary: { matched: matched.length, ambiguous: ambiguous.length, missing: missing.length, total: manifest.components.length },
  };
}

// Réécrit, pour les entrées `matched` uniquement, le fileKey et les node-id du figma.config.json
// racine. Retourne le nombre de fichiers effectivement modifiés (0 ou 1).
export function applyRebind({ manifest, matched, targetFileKey, repoRoot = REPO_ROOT }) {
  const filePath = join(repoRoot, 'figma.config.json');
  const original = readFileSync(filePath, 'utf8');
  let content = original.split(manifest.sourceFileKey).join(targetFileKey);

  for (const m of matched) {
    const oldDash = m.nodeId.replace(':', '-');
    const newDash = m.targetNodeId.replace(':', '-');
    if (oldDash === newDash) continue;
    const re = new RegExp(`node-id=${escapeRegExp(oldDash)}(?=[^0-9-]|$)`, 'g');
    content = content.replace(re, `node-id=${newDash}`);
  }

  if (content === original) return 0;
  writeFileSync(filePath, content);
  return 1;
}

/**
 * Charge le manifeste des composants connectés (généré lors de la dernière session de
 * connexion), source de vérité pour l'appariement lors d'une migration de fichier Figma.
 */
export function loadManifest(manifestPath = join(REPO_ROOT, 'scripts', 'manifest.json')) {
  return JSON.parse(readFileSync(manifestPath, 'utf8'));
}

// Lit FIGMA_ACCESS_TOKEN dans le .env racine, même emplacement que pour scripts/connect.sh.
function tokenFromDotEnv() {
  const envPath = join(REPO_ROOT, '.env');
  if (!existsSync(envPath)) return undefined;
  const line = readFileSync(envPath, 'utf8').split(/\r?\n/).find((l) => l.startsWith('FIGMA_ACCESS_TOKEN='));
  return line?.slice('FIGMA_ACCESS_TOKEN='.length).trim() || undefined;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.fileKey) {
    console.error('Usage : node scripts/rebind-to-your-file.mjs --file-key <VOTRE_FILE_KEY> [--token <PAT>] [--apply]');
    process.exit(1);
  }
  const token = args.token ?? process.env.FIGMA_ACCESS_TOKEN ?? tokenFromDotEnv();
  if (!token) {
    console.error('Token Figma manquant : passez --token <PAT>, définissez FIGMA_ACCESS_TOKEN ou renseignez .env.');
    process.exit(1);
  }

  const manifestPath = args.manifestPath ?? join(REPO_ROOT, 'scripts', 'manifest.json');
  const manifest = loadManifest(manifestPath);

  const isSelfTest = args.fileKey === manifest.sourceFileKey;
  if (isSelfTest) {
    console.log(`(auto-test : --file-key est identique au fileKey de référence ${manifest.sourceFileKey})`);
  }

  console.log(`Récupération de l'inventaire du fichier ${args.fileKey}...`);
  const targetComponents = fetchComponents(args.fileKey, token);
  console.log(`${targetComponents.length} composants/component sets trouvés dans votre fichier.`);

  const { matched, ambiguous, missing, summary } = matchManifest(manifest, targetComponents);

  const report = {
    sourceFileKey: manifest.sourceFileKey,
    targetFileKey: args.fileKey,
    generatedAt: new Date().toISOString(),
    summary,
    matched,
    ambiguous,
    missing,
  };

  const reportPath = join(REPO_ROOT, 'rebind-report.json');
  writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');

  console.log('');
  console.log(`Correspondances trouvées : ${matched.length}/${summary.total}`);
  console.log(`Ambiguës (plusieurs candidats) : ${ambiguous.length}`);
  console.log(`Manquantes (aucun candidat) : ${missing.length}`);
  console.log(`Rapport détaillé : ${reportPath}`);

  if (!args.apply) {
    console.log('');
    console.log('Dry-run : aucun fichier modifié. Relancez avec --apply une fois le rapport vérifié.');
    return;
  }

  if (ambiguous.length > 0 || missing.length > 0) {
    console.log('');
    console.log(`⚠️  ${ambiguous.length + missing.length} entrée(s) non résolue(s) automatiquement, laissées inchangées.`);
    console.log('   Résolution manuelle : voir CONTRIBUTING.md, section "Migration entre versions du fichier Figma".');
  }

  const filesChanged = applyRebind({ manifest, matched, targetFileKey: args.fileKey });

  console.log('');
  console.log(`✅ ${filesChanged} fichier(s) réécrit(s). Relancez le parse puis le publish (voir README).`);
}

// N'exécute le CLI que si le fichier est lancé directement (pas quand il est importé par l'app desktop).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
