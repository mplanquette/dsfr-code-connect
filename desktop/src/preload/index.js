const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dsfr', {
  listStacks: () => ipcRenderer.invoke('stacks:list'),
  openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url),

  getToken: (key) => ipcRenderer.invoke('tokens:get', key),
  setToken: (key, value) => ipcRenderer.invoke('tokens:set', key, value),
  testToken: (token) => ipcRenderer.invoke('tokens:test', token),

  extractFileKey: (url) => ipcRenderer.invoke('figma:extractFileKey', url),

  analyzeRebind: (payload) => ipcRenderer.invoke('rebind:analyze', payload),
  applyRebind: (payload) => ipcRenderer.invoke('rebind:apply', payload),

  parseStacks: (payload) => ipcRenderer.invoke('connect:parse', payload),
  publishStacks: (payload) => ipcRenderer.invoke('connect:publish', payload),

  onConnectOutput: (callback) => {
    const listener = (_event, line) => callback(line);
    ipcRenderer.on('connect:output', listener);
    return () => ipcRenderer.removeListener('connect:output', listener);
  },
});
