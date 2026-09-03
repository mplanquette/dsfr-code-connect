// Stockage local chiffré des tokens Figma via l'API safeStorage native d'Electron
// (Keychain sur macOS, DPAPI sur Windows, libsecret sur Linux). Jamais en clair sur disque.
const { app, safeStorage } = require('electron');
const { readFileSync, writeFileSync, existsSync } = require('node:fs');
const { join } = require('node:path');

function storePath() {
  return join(app.getPath('userData'), 'tokens.enc');
}

function readStore() {
  const p = storePath();
  if (!existsSync(p)) return {};
  try {
    const encrypted = readFileSync(p);
    const decrypted = safeStorage.decryptString(encrypted);
    return JSON.parse(decrypted);
  } catch {
    return {};
  }
}

function writeStore(data) {
  const encrypted = safeStorage.encryptString(JSON.stringify(data));
  writeFileSync(storePath(), encrypted);
}

function getToken(key) {
  return readStore()[key] ?? null;
}

function setToken(key, value) {
  const data = readStore();
  data[key] = value;
  writeStore(data);
}

function clearTokens() {
  writeStore({});
}

module.exports = { getToken, setToken, clearTokens };
