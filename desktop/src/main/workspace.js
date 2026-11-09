// Dossier de travail du catalogue Code Connect (familles de components/, figma.config.json,
// scripts/catalog.mjs).
//
// En développement, c'est le dépôt lui-même. En build packagé, les ressources de l'application
// ne sont pas modifiables (dossier de l'app sous Windows, bundle signé sous macOS), alors que le
// rebranchement réécrit figma.config.json et que scripts/catalog.mjs génère .codeconnect/ : on
// copie donc le catalogue embarqué dans le dossier utilisateur de l'app, une fois par version.
// Une mise à jour de l'app repart du catalogue embarqué : le rebranchement est alors à refaire.
const { app } = require('electron');
const { join } = require('node:path');
const { pathToFileURL } = require('node:url');
const { cpSync, existsSync, readFileSync, rmSync, writeFileSync } = require('node:fs');

let cachedRoot = null;
let catalogModulePromise = null;

/** Racine du catalogue sur laquelle travaillent le rebranchement, le parse et la publication. */
function workspaceRoot() {
  if (cachedRoot) return cachedRoot;
  if (!app.isPackaged) {
    cachedRoot = join(__dirname, '..', '..', '..');
    return cachedRoot;
  }
  const dest = join(app.getPath('userData'), 'catalog');
  const marker = join(dest, '.version');
  if (!existsSync(marker) || readFileSync(marker, 'utf8') !== app.getVersion()) {
    rmSync(dest, { recursive: true, force: true });
    cpSync(join(process.resourcesPath, 'stacks'), dest, { recursive: true });
    writeFileSync(marker, app.getVersion());
  }
  cachedRoot = dest;
  return cachedRoot;
}

/** Module scripts/catalog.mjs du catalogue (préparation des lots et configs par stack). */
function loadCatalog() {
  if (!catalogModulePromise) {
    catalogModulePromise = import(pathToFileURL(join(workspaceRoot(), 'scripts', 'catalog.mjs')).href);
  }
  return catalogModulePromise;
}

module.exports = { workspaceRoot, loadCatalog };
