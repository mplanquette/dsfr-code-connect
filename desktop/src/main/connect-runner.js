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
const { STACKS } = require('./stacks');

function cliPath() {
  return join(__dirname, '..', '..', 'node_modules', '@figma', 'code-connect', 'dist', 'cli.js');
}

function stackDir(stackId) {
  if (!app.isPackaged) return join(__dirname, '..', '..', '..', stackId);
  return join(process.resourcesPath, 'stacks', stackId);
}

function labelFor(stackId) {
  return STACKS.find((s) => s.id === stackId)?.label ?? stackId;
}

// Lance `node <cli.js> connect <args...>` dans le dossier de la stack, en streamant stdout/stderr
// ligne par ligne via `onOutput` (pour l'affichage dans le log repliable de l'UI).
function runConnect(stackId, args, { onOutput, env = {} } = {}) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [cliPath(), 'connect', ...args], {
      cwd: stackDir(stackId),
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

async function parseStacks(stackIds, { onOutput } = {}) {
  const results = [];
  for (const stackId of stackIds) {
    results.push(await runConnect(stackId, ['parse'], { onOutput }));
  }
  return results;
}

async function publishStacks(stackIds, { token, onOutput } = {}) {
  const results = [];
  for (const stackId of stackIds) {
    results.push(
      await runConnect(stackId, ['publish', '--label', labelFor(stackId)], {
        onOutput,
        env: { FIGMA_ACCESS_TOKEN: token },
      }),
    );
  }
  return results;
}

module.exports = { runConnect, parseStacks, publishStacks, labelFor };
