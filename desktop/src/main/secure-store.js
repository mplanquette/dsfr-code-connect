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
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error(
      "Chiffrement natif indisponible (Keychain/DPAPI/libsecret inaccessible) : impossible d'enregistrer le token en sécurité.",
    );
  }
  const encrypted = safeStorage.encryptString(JSON.stringify(data));
  // mode 0600 explicite plutôt que de dépendre de l'umask du process : le fichier ne doit être
  // lisible que par l'utilisateur courant, même si le dossier userData avait des permissions plus
  // larges.
  writeFileSync(storePath(), encrypted, { mode: 0o600 });
}

/**
 * Lit un token stocké par sa clé (ex. 'read', 'publish'). Retourne `null` si absent.
 */
function getToken(key) {
  return readStore()[key] ?? null;
}

/**
 * Enregistre un token sous une clé donnée, chiffré via `safeStorage`.
 */
function setToken(key, value) {
  const data = readStore();
  data[key] = value;
  writeStore(data);
}

/**
 * Efface tous les tokens stockés. Réservée à une future action de déconnexion côté UI
 * (non câblée à ce jour : aucun bouton n'appelle cette fonction pour l'instant).
 */
function clearTokens() {
  writeStore({});
}

module.exports = { getToken, setToken, clearTokens };
