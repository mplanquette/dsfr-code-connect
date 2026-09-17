// Orchestration de `@figma/code-connect` (parse/publish) sans dépendre de npx : le CLI du package,
// installé une fois comme dépendance de l'app desktop, est spawné en subprocess avec le `cwd`
// positionné sur le dossier de la stack ciblée (angular/, html/, react/, vue/) : reproduit
// exactement ce que fait `npx figma connect parse|publish` en CLI aujourd'hui (scripts/parse.sh,
// scripts/publish.sh), sans nécessiter Node/npm installés côté utilisateur final : le CLI parse
// statiquement les fichiers *.figma.ts, il n'a besoin d'aucun node_modules local à la stack
// (vérifié : `figma connect parse` fonctionne dans un dossier sans node_modules).
const { app } = require('electron');
const { spawn } = require('node:child_process');
const { join } = require('node:path');
const { existsSync } = require('node:fs');
const { STACKS } = require('./stacks');

function cliPath() {
  return join(__dirname, '..', '..', 'node_modules', '@figma', 'code-connect', 'dist', 'cli.js');
}

function stackDir(stackId) {
  if (!app.isPackaged) return join(__dirname, '..', '..', '..', stackId);
  return join(process.resourcesPath, 'stacks', stackId);
}

/** Label de publication Figma Dev Mode associé à une stack (ex. 'angular' -> 'Angular'). */
function labelFor(stackId) {
  return STACKS.find((s) => s.id === stackId)?.label ?? stackId;
}

// Lance `node <cli.js> connect <args...>` dans le dossier de la stack, en streamant stdout/stderr
// ligne par ligne via `onOutput` (pour l'affichage dans le log repliable de l'UI).
function runConnect(stackId, args, { onOutput, env = {} } = {}) {
  return new Promise((resolve) => {
    const cli = cliPath();
    const cwd = stackDir(stackId);
    if (!existsSync(cli)) {
      resolve({
        stackId,
        code: -1,
        ok: false,
        stdout: '',
        stderr: `CLI Code Connect introuvable (${cli}). Réinstallez l'application.`,
      });
      return;
    }
    if (!existsSync(cwd)) {
      resolve({
        stackId,
        code: -1,
        ok: false,
        stdout: '',
        stderr: `Dossier de la stack « ${stackId} » introuvable (${cwd}).`,
      });
      return;
    }
    const child = spawn(process.execPath, [cli, 'connect', ...args], {
      cwd,
      env: { ...process.env, ELECTRON_RUN_AS_NODE: '1', ...env },
    });

    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
      onOutput?.(chunk.toString());
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
      onOutput?.(chunk.toString());
    });
    child.on('close', (code) => {
      resolve({ stackId, code, ok: code === 0, stdout, stderr });
    });
    child.on('error', (err) => {
      resolve({ stackId, code: -1, ok: false, stdout, stderr: err.message });
    });
  });
}

/**
 * Lance `figma connect parse` sur chaque stack sélectionnée, séquentiellement. `runConnect`
 * résout toujours (jamais de rejet), mais une itération de la boucle est protégée par un
 * try/catch : si une évolution future de `runConnect` venait à lever une exception, les
 * stacks suivantes doivent quand même être tentées plutôt que de laisser la boucle
 * s'arrêter net sans rapport pour les stacks restantes.
 */
async function parseStacks(stackIds, { onOutput } = {}) {
  const results = [];
  for (const stackId of stackIds) {
    try {
      results.push(await runConnect(stackId, ['parse'], { onOutput }));
    } catch (err) {
      results.push({ stackId, code: -1, ok: false, stdout: '', stderr: err.message });
    }
  }
  return results;
}

/**
 * Lance `figma connect publish --label <label>` sur chaque stack sélectionnée,
 * séquentiellement, avec le token de publication fourni. Même logique de tolérance aux
 * exceptions que `parseStacks`.
 */
async function publishStacks(stackIds, { token, onOutput } = {}) {
  const results = [];
  for (const stackId of stackIds) {
    try {
      results.push(
        await runConnect(stackId, ['publish', '--label', labelFor(stackId)], {
          onOutput,
          env: { FIGMA_ACCESS_TOKEN: token },
        }),
      );
    } catch (err) {
      results.push({ stackId, code: -1, ok: false, stdout: '', stderr: err.message });
    }
  }
  return results;
}

module.exports = { runConnect, parseStacks, publishStacks, labelFor };
