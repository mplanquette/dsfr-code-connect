// Test léger de validité d'un token Figma (scope lecture) via GET /v1/me.
// Utilise `curl` en argv (pas de shell) pour la même raison que scripts/rebind-to-your-file.mjs :
// respecter nativement HTTP_PROXY/HTTPS_PROXY dans un réseau d'entreprise.
const { spawnSync } = require('node:child_process');

/**
 * Vérifie qu'un token Figma est valide en scope lecture (GET /v1/me). Retourne
 * `{ ok: true, handle, email }` ou `{ ok: false, error }`, jamais de rejet.
 */
function testFigmaToken(token) {
  // Le token passe par la config `curl` lue sur stdin (`-K -`), jamais en argv (cf. commentaire
  // équivalent dans scripts/rebind-to-your-file.mjs : évite l'exposition via `ps`).
  const result = spawnSync('curl', ['-sS', '-K', '-', 'https://api.figma.com/v1/me'], {
    input: `header = "X-Figma-Token: ${token}"\n`,
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
