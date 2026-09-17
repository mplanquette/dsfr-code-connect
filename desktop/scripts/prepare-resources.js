// Copie les assets partagés avec le CLI (scripts/) dans desktop/resources/ avant packaging, pour
// qu'ils soient embarqués dans la release (electron-builder ne packages que desktop/resources/**).
// Un seul fichier source de vérité pour la logique métier (scripts/rebind-to-your-file.mjs) et pour
// le manifeste (scripts/manifest.json), cette copie n'est qu'un mirroring de build, pas une
// duplication de code à maintenir.
//
// Copie aussi un sous-ensemble minimal du DSFR (@gouvfr/dsfr) dans src/renderer/dsfr/, pour que
// l'UI de l'app utilise les vrais composants/styles du Design System plutôt qu'une interface
// custom. Volontairement partiel : seuls le CSS compilé, le JS des comportements interactifs et
// les polices sont embarqués (~2 Mo), pas les icônes (~4 Mo) ni les sources par composant (~40 Mo),
// non utilisées par cette UI. Récupéré via `npm pack` (juste le tarball, sans exécuter le script
// `preinstall` de @gouvfr/dsfr, qui attend un scaffold `npm create @gouvfr/dsfr` complet que cette
// app n'a pas besoin d'avoir).
const { copyFileSync, mkdirSync, cpSync, rmSync, readdirSync } = require('node:fs');
const { join } = require('node:path');
const { execFileSync } = require('node:child_process');
const os = require('node:os');

const REPO_ROOT = join(__dirname, '..', '..');
const RESOURCES_DIR = join(__dirname, '..', 'resources');
const DSFR_VERSION = '1.15.2';
const DSFR_DEST = join(__dirname, '..', 'src', 'renderer', 'dsfr');

mkdirSync(RESOURCES_DIR, { recursive: true });
copyFileSync(join(REPO_ROOT, 'scripts', 'manifest.json'), join(RESOURCES_DIR, 'manifest.json'));
copyFileSync(join(REPO_ROOT, 'scripts', 'rebind-to-your-file.mjs'), join(RESOURCES_DIR, 'rebind-to-your-file.mjs'));
copyFileSync(join(REPO_ROOT, 'scripts', 'stacks.json'), join(RESOURCES_DIR, 'stacks.json'));

function fetchDsfrAssets() {
  const tmpDir = join(os.tmpdir(), `dsfr-pack-${Date.now()}`);
  mkdirSync(tmpDir, { recursive: true });
  // `npm` est un script .cmd sous Windows : execFileSync (sans shell) ne le trouve pas sans
  // l'extension explicite, contrairement à `spawn`/`exec` classiques qui la résolvent seuls.
  const npmBin = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  execFileSync(npmBin, ['pack', `@gouvfr/dsfr@${DSFR_VERSION}`, '--pack-destination', tmpDir], { stdio: 'inherit' });
  const tarball = readdirSync(tmpDir).find((f) => f.endsWith('.tgz'));
  execFileSync('tar', ['xzf', tarball], { cwd: tmpDir });
  const distDir = join(tmpDir, 'package', 'dist');

  mkdirSync(DSFR_DEST, { recursive: true });
  for (const file of ['dsfr.min.css', 'dsfr.module.min.js']) {
    copyFileSync(join(distDir, file), join(DSFR_DEST, file));
  }
  cpSync(join(distDir, 'fonts'), join(DSFR_DEST, 'fonts'), { recursive: true });

  rmSync(tmpDir, { recursive: true, force: true });
}

fetchDsfrAssets();

console.log('Assets copiés dans desktop/resources/ (manifest.json, rebind-to-your-file.mjs, stacks.json)');
console.log('et desktop/src/renderer/dsfr/ (dsfr.min.css, dsfr.module.min.js, fonts/).');
