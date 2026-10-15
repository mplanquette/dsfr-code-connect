# DSFR Code Connect

Fichiers [Code Connect](https://www.figma.com/code-connect-docs/) qui affichent, dans **Figma Dev Mode**,
des snippets de code réels et **dynamiques** pour les composants du DSFR (Design System de l'État
français). Configuré par défaut sur un fichier Figma précis (toutes les URLs sont centralisées dans
[`figma.config.json`](./figma.config.json)), mais prévu pour être **rebranché sur votre propre fichier Figma DSFR**
(cf. section [Adapter à votre fichier Figma](#adapter-à-votre-propre-fichier-figma-dsfr)).

Quatre frameworks sont exposés par composant, un dossier par framework :

| Dossier    | Label Dev Mode | Cible                                                |
|------------|----------------|-------------------------------------------------------|
| `angular/` | `Angular`      | `@edugouvfr/ngx-dsfr` (`<dsfr-button>`, …)            |
| `html/`    | `HTML`         | DSFR vanilla (classes `fr-*`)                         |
| `react/`   | `React`        | `@codegouvfr/react-dsfr` (`<Button>`, …)              |
| `vue/`     | `Vue`          | `@gouvminint/vue-dsfr` (`<DsfrButton>`, …)            |

> Les portages DSFR ne sont pas la propriété de ce repo : il ne contient **que des snippets
> d'exemple**, publiés vers Figma. Aucun code source de portage n'y est versionné.

Les quatre dossiers partagent un seul `figma.config.json` à la racine : les fichiers `*.figma.ts`
référencent les composants par une clé lisible (`<FIGMA_BOUTON__PRIMAIRE_MD>`), résolue en URL via
`documentUrlSubstitutions`. Changer de fichier Figma ne touche donc que ce fichier.

## App desktop (sans terminal)

Pas à l'aise avec un terminal ? Une application desktop (Windows/Mac) propose le même parcours
(choix des stacks, connexion Figma, rebranchement, publication) via une interface graphique, sans
Node.js à installer. Voir la page [Releases](../../releases), ou
[`desktop/README.md`](./desktop/README.md) pour la construire soi-même. Les sections suivantes
décrivent l'usage en ligne de commande, pour les utilisateurs à l'aise avec un terminal.

> **Note sur la signature** : les premières releases ne sont pas signées/notariées, macOS et
> Windows afficheront un avertissement au premier lancement (procédure de contournement documentée
> dans `desktop/README.md`).

> **Gouvernance** : l'app rend la publication accessible sans terminal, mais les snippets publiés
> restent du code lu par des développeurs. Faites relire toute modification des `*.figma.ts` par
> une personne technique avant publication.

## Prérequis (usage en ligne de commande)

- Node.js ≥ 18 et `npx`, ainsi que `curl` (utilisé par le script de rebranchement pour respecter les
  proxys d'entreprise).
- Un **token Figma personnel** avec accès Dev Mode + écriture Code Connect. Copiez
  [`.env.example`](./.env.example) en `.env` à la racine et renseignez `FIGMA_ACCESS_TOKEN`, ou
  exportez directement cette variable. Le fichier `.env` est ignoré par git et ne doit **jamais**
  être versionné.
- Plan Figma Organization/Enterprise avec sièges Dev (requis par Code Connect).

## Démarrage rapide

```bash
# Installe le CLI Code Connect (une seule dépendance, commune aux quatre stacks)
npm install

# Validation locale (sans réseau)
npm run parse -- angular html react vue

# Publication (le label de chaque stack est géré par le script, pas dans les fichiers)
npm run publish -- angular html react vue

# Retrait des snippets publiés
npm run unpublish -- angular html react vue
```

`parse`, `publish` et `unpublish` passent tous par `scripts/connect.sh` et acceptent une liste de
stacks en argument (`angular`, `html`, `react`, `vue`, ou `--all`) ; sans argument, ils proposent
une sélection interactive. Le token est lu dans `.env` à la racine.

> Publiez en **direct**, sans proxy d'entreprise qui pourrait intercepter la requête. Une erreur
> `403 Invalid token` est un problème d'authentification, pas de réseau.

## Adapter à votre propre fichier Figma DSFR

Le fichier Figma DSFR officiel est mis à disposition par le SIG (Service d'Information du
Gouvernement) sous forme de copie à dupliquer dans votre propre organisation Figma (voir
[Premiers pas sur Figma](https://www.systeme-de-design.gouv.fr/version-courante/fr/premiers-pas/vous-etes-designer/premiers-pas-sur-figma)
sur le site du DSFR). Ce repo cible par défaut ce fichier officiel tel quel (thèmes clair/sombre non
fusionnés, deux composants jumeaux par famille concernée).

Si votre copie du fichier officiel a divergé (composants renommés, thèmes fusionnés différemment,
etc.), le script de rebranchement ci-dessous gère aussi ce cas : les familles sans correspondance
univoque remontent en "ambiguës" dans le rapport, à résoudre à la main. Votre organisation a de
toute façon ses propres `node-id`, différents des nôtres : Figma en attribue de nouveaux à chaque
duplication/republication de fichier, même pour un composant identique.

Le script `scripts/rebind-to-your-file.mjs` automatise le rebranchement : il compare l'inventaire de
votre fichier (récupéré via l'API Figma) au [manifeste de référence](./scripts/manifest.json)
(page + nom de composant → node-id actuel), et réécrit les URLs de `figma.config.json` en
conséquence (aucun fichier `*.figma.ts` n'est modifié).

**Prérequis** :
- Votre fichier doit être structurellement proche de celui utilisé par ce repo (mêmes noms de page
  et de calque, cf. les intitulés FR de la table de mapping dans `CONTRIBUTING.md`), sinon la
  correspondance par nom échouera.
- Votre fichier doit être **publié comme librairie Figma** (déjà nécessaire pour Code Connect de
  toute façon) : le script lit l'inventaire via les endpoints `/components` et `/component_sets` de
  l'API Figma, qui ne listent que les composants publiés.
- Votre token Figma doit porter le scope **"File content"** (`files:read`), le scope par défaut
  d'un token personnel classique, différent du token à portée réduite généré spécifiquement pour
  publier du Code Connect (Dev Mode → Code Connect → Get access token). Les deux tokens peuvent
  être utilisés en parallèle (un pour `rebind`, un pour `publish`).

```bash
# 1. Dry-run : génère un rapport sans rien modifier
node scripts/rebind-to-your-file.mjs --file-key <VOTRE_FILE_KEY>

# 2. Lire rebind-report.json : vérifier les entrées "ambiguous" et "missing"
#    (résolution manuelle si besoin, cf. section "Rebranchement sur un autre fichier Figma"
#    du CONTRIBUTING.md pour la méthode)

# 3. Appliquer une fois le rapport validé
node scripts/rebind-to-your-file.mjs --file-key <VOTRE_FILE_KEY> --apply

# 4. Reparser puis publier normalement
npm run parse
npm run publish
```

Le token Figma passe soit par `.env` / la variable d'environnement `FIGMA_ACCESS_TOKEN`, soit via `--token`.

## Conventions et méthode

Voir [`CONTRIBUTING.md`](./CONTRIBUTING.md) : pattern de référence (`button`), table de mapping Figma → code,
et checklist d'avancement du catalogue.

## Remerciements

- Le [Système de Design de l'État](https://www.systeme-de-design.gouv.fr/) (DSFR), maintenu et
  documenté par le SIG (Service d'Information du Gouvernement).
- Les équipes qui maintiennent les [portages du DSFR](https://www.systeme-de-design.gouv.fr/version-courante/fr/communaute/portages-du-dsfr)
  ciblés par ce repo :
  - **Angular** : [`@edugouvfr/ngx-dsfr`](https://www.npmjs.com/package/@edugouvfr/ngx-dsfr), maintenu par Rémi Patriarche (Académie de Grenoble).
  - **React** : [`@codegouvfr/react-dsfr`](https://github.com/codegouvfr/react-dsfr), développé par Joseph Garrone (CodeGouvFr, mission logiciel libre de la DINUM).
  - **Vue** : [`vue-dsfr`](https://github.com/dnum-mi/vue-dsfr), maintenu par Stanislas Ormières, Cherif Diallo et Pierre-Louis Egaud (Ministère de l'Intérieur).
- Ce catalogue a été constitué avec l'aide de Claude (Anthropic) et Codex (OpenAI).

## Licence

[Licence Ouverte 2.0 / Etalab 2.0](./LICENSE).
