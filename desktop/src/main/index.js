const { app, BrowserWindow, ipcMain, shell, session } = require('electron');
const { join } = require('node:path');
const secureStore = require('./secure-store');
const rebindBridge = require('./rebind-bridge');
const connectRunner = require('./connect-runner');
const { STACKS } = require('./stacks');
const { testFigmaToken } = require('./figma-me');

let mainWindow;

// CSP stricte : l'app est 100% locale (index.html + CSS/JS embarqués du DSFR), aucune ressource
// distante n'a besoin d'être chargée. Les liens externes sortent par shell.openExternal et ne
// transitent pas par cette politique. 'unsafe-inline' n'est autorisé que sur les styles, requis par
// le JS interactif du DSFR qui injecte du style inline ; les scripts, eux, restent 'self' seul.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
].join('; ');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 720,
    webPreferences: {
      preload: join(__dirname, '..', 'preload', 'index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.loadFile(join(__dirname, '..', 'renderer', 'index.html'));
}

// Applique la CSP à tous les chargements de la session par défaut. Doit être appelé après le
// `ready` d'Electron (la session ne peut pas être interrogée avant). S'applique aussi au contenu
// chargé ultérieurement (rechargements, nouvelles fenêtres sur activate).
function applyCsp() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [CSP],
      },
    });
  });
}

app.whenReady().then(() => {
  applyCsp();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// --- IPC : stacks -----------------------------------------------------------
ipcMain.handle('stacks:list', () => STACKS);

// --- IPC : liens externes ----------------------------------------------------
ipcMain.handle('shell:openExternal', (_event, url) => shell.openExternal(url));

// --- IPC : tokens (stockage sécurisé local, jamais en clair) -----------------
// La clé est restreinte à une allowlist : le stockage chiffré ne doit pas accepter de clé
// arbitraire dictée par le renderer (défense en profondeur sur la surface d'IPC).
const TOKEN_KEYS = new Set(['read', 'publish']);
ipcMain.handle('tokens:get', (_event, key) => (TOKEN_KEYS.has(key) ? secureStore.getToken(key) : null));
ipcMain.handle('tokens:set', (_event, key, value) => {
  if (!TOKEN_KEYS.has(key)) throw new Error(`Clé de token inconnue : ${key}`);
  secureStore.setToken(key, value);
});
ipcMain.handle('tokens:test', (_event, token) => testFigmaToken(token));

// --- IPC : extraction du fileKey depuis une URL Figma ------------------------
ipcMain.handle('figma:extractFileKey', (_event, url) => {
  const m = /figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/.exec(url ?? '');
  return m ? m[1] : null;
});

// --- IPC : rebranchement ------------------------------------------------------
ipcMain.handle('rebind:analyze', async (_event, { fileKey, token }) => {
  try {
    const result = await rebindBridge.analyze({ fileKey, token });
    return { ok: true, ...result };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle('rebind:apply', async (_event, { manifest, matched, targetFileKey, stackIds }) => {
  try {
    const filesChanged = await rebindBridge.apply({ manifest, matched, targetFileKey, frameworkDirs: stackIds });
    return { ok: true, filesChanged };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

// --- IPC : parse / publish -----------------------------------------------------
ipcMain.handle('connect:parse', async (event, { stackIds }) => {
  const results = await connectRunner.parseStacks(stackIds, {
    onOutput: (line) => event.sender.send('connect:output', line),
  });
  return results;
});

ipcMain.handle('connect:publish', async (event, { stackIds, token }) => {
  const results = await connectRunner.publishStacks(stackIds, {
    token,
    onOutput: (line) => event.sender.send('connect:output', line),
  });
  return results;
});
