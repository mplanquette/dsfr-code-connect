// Test léger de validité d'un token Figma (scope lecture) via GET /v1/me.
// Utilise `curl` en argv (pas de shell) pour la même raison que scripts/rebind-to-your-file.mjs :
// respecter nativement HTTP_PROXY/HTTPS_PROXY dans un réseau d'entreprise.
const { spawnSync } = require('node:child_process');

function testFigmaToken(token) {
  const result = spawnSync('curl', ['-sS', '-H', `X-Figma-Token: ${token}`, 'https://api.figma.com/v1/me'], {
    encoding: 'utf8',
    timeout: 15_000,
  });
  if (result.status !== 0) {
    return { ok: false, error: result.stderr || 'Échec de la requête' };
  }
  try {
    const body = JSON.parse(result.stdout);
    if (body.error) return { ok: false, error: body.message ?? 'Token invalide' };
    return { ok: true, handle: body.handle, email: body.email };
  } catch {
    return { ok: false, error: 'Réponse Figma illisible' };
  }
}

module.exports = { testFigmaToken };
