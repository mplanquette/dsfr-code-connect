# DSFR Code Connect : app desktop

Application Electron packageant l'outillage de `../scripts/` derrière une interface graphique, pour
un usage sans terminal ni Node.js installé au préalable. Documentation destinée aux développeurs qui
maintiennent cette app. Pour l'utiliser sans coder, voir le [README principal](../README.md) et la
page [Releases](../../../releases) une fois publiée.

## Principe

- Aucune logique métier dupliquée : `src/main/rebind-bridge.js` importe directement
  `../scripts/rebind-to-your-file.mjs` (fonctions `fetchComponents`, `matchManifest`, `applyRebind`
  exportées pour cet usage). Le CLI garde son usage terminal habituel.
- `src/main/connect-runner.js` spawn le CLI de `@figma/code-connect` (dépendance de cette app, pas de
  chaque stack) en subprocess, avec le `cwd` positionné sur le dossier de la stack ciblée : exactement
  ce que fait `npx figma connect parse|publish` en CLI. Vérifié : le CLI analyse les `.figma.ts`
  statiquement, aucun `node_modules` local à la stack n'est nécessaire au runtime (seuls les fichiers
  `.figma.ts` + `figma.config.json` sont embarqués dans la release, cf. `extraResources` de
  `package.json`).
- Tokens Figma stockés localement via l'API `safeStorage` d'Electron (Keychain/DPAPI/libsecret),
  jamais en clair sur disque.
- L'interface utilise les vrais composants et styles du DSFR (`fr-btn`, `fr-input`, `fr-stepper`,
  `fr-alert`, police Marianne...) plutôt qu'une charte graphique custom, cohérent avec l'objet du
  projet. `scripts/prepare-resources.js` récupère un sous-ensemble minimal de `@gouvfr/dsfr` (CSS
  compilé, JS des comportements interactifs, polices, ~2 Mo) via `npm pack`, sans les icônes ni les
  sources par composant (non utilisées ici).

## Développement

```bash
npm install
npm start
```

`npm start` régénère automatiquement `src/renderer/dsfr/` et `resources/` (ignorés par git) avant de
lancer l'app.

## Build d'une release

```bash
npm run dist        # macOS + Windows
npm run dist:mac
npm run dist:win
```

`npm run prepare-resources` (appelé automatiquement avant `npm start` et chaque `dist:*`) copie
`scripts/manifest.json` et `scripts/rebind-to-your-file.mjs` dans `resources/`, et les assets DSFR
dans `src/renderer/dsfr/`, pour qu'ils soient embarqués dans la release (ces deux dossiers sont
ignorés par git, régénérés à chaque build).

Sur ce poste, le téléchargement du binaire Electron (`npm install`) et celui de Chromium par
`electron-builder` passent par le proxy RIE via le support proxy intégré de `@electron/get`, à
activer explicitement :

```bash
export ELECTRON_GET_USE_PROXY=1
export GLOBAL_AGENT_HTTP_PROXY="$HTTP_PROXY"
export GLOBAL_AGENT_HTTPS_PROXY="$HTTPS_PROXY"
export GLOBAL_AGENT_NO_PROXY="$NO_PROXY"
```

(le module `global-agent`, en devDependency, doit être installé pour que ce mécanisme fonctionne.)

Taille du DMG macOS : environ 107 Mo (`compression: maximum` + `electronLanguages: [fr, en]` dans
`package.json`, qui retire les locales inutilisées d'Electron). L'essentiel de ce poids est le
runtime Chromium/Node embarqué par Electron lui-même, incompressible au-delà de ce niveau.

## État de la signature (v1)

Les releases ne sont **pas signées/notariées** pour l'instant : macOS affichera un avertissement
Gatekeeper ("développeur non identifié") et Windows un avertissement SmartScreen à la première
ouverture. Contournement pour un premier lancement :

- **macOS** : clic droit sur l'app → "Ouvrir" → confirmer dans la boîte de dialogue (au lieu d'un
  double-clic classique, qui serait refusé).
- **Windows** : sur l'écran SmartScreen, cliquer "Informations complémentaires" puis "Exécuter
  quand même".

Signer nécessite un compte Apple Developer (~99 $/an, notarisation) et un certificat de signature de
code Windows, à mettre en place ultérieurement si besoin.

## Périmètre v1

Sélection des stacks → connexion Figma (fileKey + tokens) → analyse (rebind dry-run) → application
(rebind `--apply`) → parse → publish. Les correspondances "ambiguës" du rebind restent affichées en
lecture seule (pas de résolveur interactif dans l'UI) : rare en pratique puisque le catalogue cible
désormais directement le fichier officiel du SIG (thèmes non fusionnés), cf. `CONTRIBUTING.md` à la
racine du repo.

## État bêta

L'app affiche un badge "Bêta" dans son en-tête tant que ce statut n'a pas été levé. Au moment de
publier une release sur GitHub, le tag doit reprendre exactement le numéro de version de
`package.json` (ex. `package.json` en `1.0.0` → tag `v1.0.0`), pour que le nom du binaire distribué
(`DSFR Code Connect Setup 1.0.0.exe`, `DSFR Code Connect-1.0.0.dmg`) et le tag de la release restent
cohérents entre eux.
