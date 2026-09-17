// Source de vérité unique pour la liste des stacks et leur label de publication :
// scripts/stacks.json (lu aussi par scripts/publish.sh via un one-liner Node, pour éviter
// de dupliquer ce mapping en dur des deux côtés).
const { app } = require('electron');
const { join } = require('node:path');
const { readFileSync } = require('node:fs');

function stacksJsonPath() {
  if (!app.isPackaged) return join(__dirname, '..', '..', '..', 'scripts', 'stacks.json');
  return join(process.resourcesPath, 'stacks.json');
}

const STACKS = JSON.parse(readFileSync(stacksJsonPath(), 'utf8'));

module.exports = { STACKS };
