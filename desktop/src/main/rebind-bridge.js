// Pont vers la logique de rebranchement partagée avec le CLI (scripts/rebind-to-your-file.mjs).
// Un seul fichier source de vérité : ce module se contente de résoudre les bons chemins (mode
// packagé vs développement) et d'appeler les fonctions exportées par le script.
const { app } = require('electron');
const { join } = require('node:path');
const { existsSync, readFileSync } = require('node:fs');

// En dev, le repo entier est présent à côté de desktop/. En build packagé, seuls les fichiers
// *.figma.ts + figma.config.json de chaque stack sont embarqués (cf. extraResources dans
// package.json), et le manifeste est copié dans resources/manifest.json.
function repoRoot() {
  const devRoot = join(__dirname, '..', '..', '..');
  if (!app.isPackaged) return devRoot;
  return join(process.resourcesPath, 'stacks');
}

function manifestPath() {
  if (!app.isPackaged) return join(repoRoot(), 'scripts', 'manifest.json');
  return join(process.resourcesPath, 'manifest.json');
}

function scriptUrl() {
  // Le script vit dans scripts/ en dev ; il est copié dans desktop/resources/ pour le build packagé
  // (cf. script de build) afin de rester importable par une URL file:// stable.
  if (!app.isPackaged) return join(__dirname, '..', '..', '..', 'scripts', 'rebind-to-your-file.mjs');
  return join(process.resourcesPath, 'rebind-to-your-file.mjs');
}

let rebindModulePromise = null;
async function getRebindModule() {
  if (!rebindModulePromise) {
    const path = scriptUrl();
    if (!existsSync(path)) {
      throw new Error(`Script de rebranchement introuvable : ${path}`);
    }
    rebindModulePromise = import(require('node:url').pathToFileURL(path).href);
  }
  return rebindModulePromise;
}

function loadManifest() {
  const p = manifestPath();
  if (!existsSync(p)) {
    throw new Error(`Manifeste introuvable : ${p}`);
  }
  return JSON.parse(readFileSync(p, 'utf8'));
}

async function analyze({ fileKey, token }) {
  const { fetchComponents, matchManifest } = await getRebindModule();
  const manifest = loadManifest();
  const isSelfTest = fileKey === manifest.sourceFileKey;
  const targetComponents = fetchComponents(fileKey, token);
  const result = matchManifest(manifest, targetComponents);
  return { ...result, manifest, targetFileKey: fileKey, isSelfTest, targetComponentCount: targetComponents.length };
}

async function apply({ manifest, matched, targetFileKey, frameworkDirs }) {
  const { applyRebind } = await getRebindModule();
  return applyRebind({ manifest, matched, targetFileKey, frameworkDirs, repoRoot: repoRoot() });
}

module.exports = { analyze, apply, repoRoot, loadManifest };
