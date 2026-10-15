# Contribuer : DSFR Code Connect

Repo de fichiers Code Connect pour afficher des snippets Angular + HTML + React + Vue dynamiques en Figma Dev Mode.
Lire d'abord le [README](./README.md). Ce document explique comment ajouter ou modifier un
composant du **catalogue DSFR** (49 familles connectées à ce jour, cf. checklist plus bas).

Toutes les URLs Figma vivent dans [`figma.config.json`](./figma.config.json), partagé par les quatre
stacks : les fichiers de code référencent un composant par sa clé (`<FIGMA_BOUTON__PRIMAIRE_MD>`),
résolue via `documentUrlSubstitutions`. Pour connecter un nouveau node, ajouter d'abord sa clé
dans ce fichier (convention : `<FIGMA_<PAGE>__<CALQUE>>`, sans accent ni « Thème clair »).

## Format cible : templates Code Connect

Le repo migre vers l'[API de templates](https://developers.figma.com/docs/code-connect/templates-migration-guide/)
recommandée par Figma. Les familles déjà migrées servent de référence :

| Exemple | Ce qu'il illustre |
|---------|-------------------|
| `html/button.figma.batch.ts` + `.json` | Un seul template pour les 9 sets du bouton, données par set dans le `.json` (`figma.batch`) |
| `html/modal.figma.batch.ts` | Instances imbriquées : chaque bouton d'action est rendu par **son** template (`executeTemplate`), titre et texte lus dans les calques (`findText`) |
| `html/input-field.figma.ts` | Atomes internes lus plutôt que figés : libellé, description et message viennent des instances `⚙️ …` imbriquées |
| `angular/input-field.figma.ts` + `angular/helpers/` | Logique partagée entre templates via un import relatif (le CLI l'embarque au parse) |

Règles :

- En tête de fichier : `// url=<CLÉ>` (template simple) ; pour un template partagé, un
  `<nom>.figma.batch.json` liste `{ "url": "<CLÉ>", …données }` et pointe `templateFile`.
- `import figma from 'figma'` puis `figma.selectedInstance` : `getString`, `getBoolean`,
  `getEnum` (lister **toutes** les valeurs de la variante, sinon `undefined`), `getInstanceSwap`.
  Les variantes `True`/`False` se lisent avec `getEnum('Désactivé', { True: …, False: … })`.
- **Enfants** : `findInstance` / `findText` / `findConnectedInstances`. Toujours tester
  `type === 'INSTANCE'` (ou `'TEXT'`) avant usage : une recherche infructueuse renvoie un objet
  d'erreur, pas `null`. Un enfant code-connecté se rend avec `executeTemplate().example`, jamais
  en dur.
- **Atomes internes `⚙️ …`** : on ne les publie pas comme composants autonomes, mais on **lit**
  leurs propriétés depuis le composant parent (libellé, message…). Une brique réellement utilisable
  seule (ex. « Éléments - Champ de saisie ») a son propre template, rendu par le parent.
- Interpoler les résultats de template avec `figma.code\`…\``, jamais par concaténation (`+`,
  `.join()` produisent `[object Object]`). Les chaînes simples (attributs) peuvent se concaténer.
- `metadata: { nestable: true }` pour un composant destiné à être rendu dans un parent.
- Le label (`Angular`, `HTML`, …) n'est pas dans le fichier : `scripts/connect.sh` le passe au
  publish ; le langage de coloration en est déduit.
- `npm run typecheck` vérifie les templates (types `figma` fournis par `@figma/code-connect`).

## Format historique (en cours de migration)

Les autres familles utilisent encore `figma.connect(<CLÉ>, { props, example })` avec le parser
HTML. Les deux formats coexistent dans un même dossier ; une famille migrée supprime son ancien
fichier. Règles de l'ancien format, à respecter tant qu'un fichier n'est pas migré :

- Parser `@figma/code-connect/html` : `import figma, { html } from '@figma/code-connect/html'`.
- **Un `figma.connect(URL, {...})` par component set** Figma. La variante et la taille sont des sets
  distincts (URLs différentes) → elles ne sont PAS des props. button = 9 sets (Primaire/Secondaire/Tertiaire × SM/MD/LG).
- **Clé d'URL en string littérale** dans le `figma.connect` (jamais de template literal ni de variable).
- **Props dynamiques** via la clé `props` + helpers, avec les **noms FR exacts** des propriétés Figma :
  - `figma.string('Libellé')`
  - `figma.boolean('Désactivé', { true: ' disabled', false: '' })`
  - `figma.enum('Icône', { Sans: '', Gauche: '…', Droite: '…', Seule: '…' })`
  - `figma.instance('…')` pour une sous-instance code-connectée.
- `example: ({ ... }) => html\`...\`` interpole les props. Les fragments d'attributs commencent par
  une espace (` disabled`, ` icon="…"`) pour coller proprement après les attributs statiques.
- **Le label framework ne va PAS dans le fichier** (rejeté par le type `HtmlMeta`, ignoré par le parser).
  Il se passe au publish : `--label "Angular"` / `--label "HTML"`.
- Ignorer les **pseudo-états CSS** (État survol/actif/cliqué, Focus) : ils ne modifient pas le markup.
- **Aucune variable externe interpolée dans `html\`\``** : le parser rejette toute interpolation qui
  ne provient pas de `props` (`Could not find prop mapping for X`). Les fragments répétés se
  réécrivent en dur dans chaque `example`. Seul `imports` se factorise en constante.
- **Jamais d'interpolation collée au nom du tag** (`<dsfr-share${x}` → `Error parsing example HTML`) :
  placer un attribut statique avant l'interpolation.
- **Pas d'esperluette non échappée dans un attribut** (`href="...?a=1&b=2"` casse le parse) :
  passer par une propriété du composant ou échapper en `&amp;`.
- Les atomes internes (`🚫 …`, `⚙️ …`) ne sont pas lisibles dans ce format : le texte qu'ils
  portent est figé dans le snippet. C'est la principale raison de la migration.
- **Sous-éléments sans composant dédié** (item de fil d'Ariane, numéro de pagination, entrée de
  menu latéral…) : côté Angular, montrer le composant parent configuré pour produire cet élément ;
  côté HTML, donner le fragment (`<li>…`) exact. Un même snippet Angular peut donc servir
  plusieurs nodes d'une même famille.
- **Sets Mobile / Desktop** : le DSFR est responsive, il n'y a qu'une implémentation → même snippet
  des deux côtés.
- Icône concrète non dérivable du design (icônes DSFR non code-connectées) → poser un **placeholder**
  `fr-icon-arrow-right-line` à remplacer par le dev. Bouton « icône seule » → `[labelSrOnly]="true"` (Angular).
- **`react/`** cible `@codegouvfr/react-dsfr` (imports par sous-chemin, ex.
  `import { Button } from '@codegouvfr/react-dsfr/Button'`), mais reste sur le parser universel
  `@figma/code-connect/html` comme les deux autres dossiers (le parser React natif de Code Connect
  exigerait de compiler du vrai JSX/TSX contre le package, hors scope : ce repo ne versionne aucun
  code source de portage). Le snippet affiché en Dev Mode est donc du **JSX écrit comme texte**
  (mêmes règles de parsing que pour `html/` : pas d'interpolation collée au nom du tag, etc.), pas
  du code réellement typé/compilé contre react-dsfr. Vérifier l'API réelle du composant ciblé sur
  `github.com/codegouvfr/react-dsfr` (`src/<Composant>.tsx`) avant d'écrire le mapping de props.

## Workflow par composant

1. **Discovery** : dans Figma, repérer le component set du composant à connecter et relever, pour
   chaque node à connecter, le node-id ainsi que le **type exact des propriétés** (noms FR, valeurs
   d'enum) via le panneau Dev Mode ou l'API Figma (`GET /v1/files/:key/nodes`).
2. **API cible** : vérifier le sélecteur/inputs ngx-dsfr dans le package installé
   (`node_modules/@edugouvfr/ngx-dsfr/lib/components/<composant>/`) ou sa documentation
   ([npmjs.com/package/@edugouvfr/ngx-dsfr](https://www.npmjs.com/package/@edugouvfr/ngx-dsfr)) ;
   classes `fr-*` pour le HTML.
3. **Écriture** : clé(s) dans `figma.config.json`, puis un template par stack
   (`angular/`, `html/`, `react/`, `vue/`), au format cible ci-dessus.
4. **Vérification** : `npm run typecheck` puis `npm run parse -- --all` (zéro erreur).
5. **Validation humaine du mapping** avant publish.
6. **Publish** : `npm run publish -- --all` (le label de chaque stack est passé par le script).
7. **Vérif Dev Mode** (2 onglets + maj live).
8. **Renommer la page Figma** en ajoutant le suffixe ` 🔗` : c'est le signal visuel, dans l'arbre des
   pages, qu'un Code Connect existe pour cette famille de composants.
9. Cocher la checklist ci-dessous.

## Mapping de référence (à compléter au fil des composants)

| Composant DSFR (FR) | ngx-dsfr (sélecteur)         | Props bindées (Figma → code)                                   |
|---------------------|------------------------------|-----------------------------------------------------------------|
| Bouton              | `<dsfr-button>`              | Libellé→label · Désactivé→disabled · Icône→icon/iconPosition · Bordure (tertiaire)→tertiary-no-outline |
| Accordéon           | `<dsfr-accordion>`           | État→expanded (Ouvert=true) · Thème/Support ignorés (CSS seuls) |
| Accordéon Groupe    | `<dsfr-accordions-group>`    | Pas de binding (snippet statique 3 accordéons)                  |
| Alerte              | `<dsfr-alert>`               | État→severity · Taille→alertSize · Fermeture→closeable · Thème/Support ignorés |
| Tag                 | `<dsfr-tag>` / `<dsfr-tags-group>` | Libellé→label · Voir icône→icon · Désactivé→disabled · Sélectionné→selected · Supprimable→mode |
| Case à cocher       | `<dsfr-form-checkbox>`       | Taille→small · Coché→value · Désactivé→disabled · Validation→message/messageSeverity |
| Bouton radio        | `<dsfr-form-radio>`          | Taille→small · Orientation→inline · État→messageSeverity · options[] |
| Bouton radio riche  | `<dsfr-form-radio-rich>`     | Coché→value · Pictogramme→artworkFilePath · État→messageSeverity |
| Interrupteur        | `<dsfr-form-toggle>` / `<dsfr-form-toggles-group>` | Libellé→label · Statut→showStatusLabel · Alignement→labelPosition (déprécié 1.14.1) |
| Liste déroulante    | `<dsfr-form-select>`         | État→messageSeverity · Désactivé→disabled |
| Mot de passe        | `<dsfr-form-password>`       | Nouveau mot de passe→autocomplete · règles→validationRules |
| Fil d'Ariane        | `<dsfr-breadcrumb>`          | Type Parent/En cours→présence de routePath · collapse non bindable |
| Indicateur d'étapes | `<dsfr-stepper>`             | Étapes→totalSteps · État Courant→currentStep |
| Lien                | `<dsfr-link>`                | Taille→linkSize · Icône→icon/iconPosition · Désactivé→disabled |
| Lien d'évitement    | `<dsfr-skiplinks>`           | Pas de binding (snippet statique) |
| Retour en haut      | `<dsfr-backtotop>`           | Aucune input |
| Onglet              | `<dsfr-tabs>` / `<dsfr-tab>` | Icône→icon · État Courant→selectedTabIndex |
| Pagination          | `<dsfr-pagination>`          | État Courant→currentPage · liens désactivés en aria-disabled |
| Sommaire            | `<dsfr-summary>`             | Imbriqué→subEntries |
| Sélecteur de langue | `<dsfr-translate>`           | Langue→currentLangCode · Encadré→outline |
| Menu latéral        | `<dsfr-sidemenu>`            | Position→position · Titre→menu.title · Éléments→items/subItems · Courant→active |
| Champ de saisie     | `<dsfr-form-input>`          | Atome Libellé→label/hint · Atome Message→message · Texte Area→textarea/rows · Icône→icon · Désactivé · État→messageSeverity |
| Curseur             | `<dsfr-range>`                | État→disabled/messageSeverity · cranté→step |
| Barre de recherche  | `<dsfr-search-bar>`          | Taille LG→large |
| Ajout de fichier    | `<dsfr-form-upload>`         | État→disabled/error |
| Carte                | `<dsfr-card>`                | Voir Média→imagePath · Proportions→horizontalProportion · Désactivé |
| Tuile                | `<dsfr-tile>`                | Orientation→horizontal · Taille→panelSize · Voir Picto→artworkFilePath · Désactivé |
| Contrôle segmenté    | `<dsfr-segmented-control>`   | Légende→inline · segments[] |
| Téléchargement de fichier | `<dsfr-download>` / `<dsfr-downloads-group>` / `<dsfr-card>` / `<dsfr-tile>` | Titre groupe→heading · Card/Tile : [download]=true + downloadMimeType/downloadSizeBytes |
| En-tête              | `<dsfr-header>`              | Nom du site→serviceTitle · Description→serviceTagline · Recherche→searchBar |
| Pied de page         | `<dsfr-footer>`              | Liens→reboundLinks · Partenaires→partnerMain |
| Paramètre d'affichage | `<dsfr-display>`            | Aucune input variable |
| Groupe de boutons    | `<dsfr-buttons-group>`       | Orientation→inline · Taille→buttonGroupSize · Bouton Tertiaire→3ᵉ bouton projeté |
| Bouton FranceConnect | `<dsfr-franceconnect>`       | Plus→secure |
| Gestionnaire de consentement | `<dsfr-consent-banner>` | finalities[] (bandeau, modale, item) · Service indisponible = markup statique |
| Lettre d'information et réseaux sociaux | `<dsfr-follow>` / `<dsfr-form-email>` | Newsletter→type · Description→description |
| Navigation principale | `<dsfr-header>` ([menu]/[headerToolsLinks]) | Lien/Dépliant/Mégamenu via DsfrHeaderMenuItem · Accès rapides→headerToolsLinks |
| Bouton ProConnect (1.15) | markup DSFR brut (pas de composant ngx-dsfr dédié pour l'instant) | Aucune input variable |
| Bandeau d'information | `<dsfr-notice>`            | Titre→heading · Description→description · Voir icône→noIcon · Niveau d'alerte→type (9 valeurs) |
| Citation            | `<dsfr-quote>`               | Illustration→imagePath · Auteur→author · Détail→details |
| Mise en avant       | `<dsfr-callout>`             | Icône→icon · Bouton→dsfr-button projeté |
| Mise en exergue     | `<dsfr-highlight>`           | Taille→textSize |
| Contenu médias      | `<dsfr-content>`             | Taille média 6/8/10 colonnes→contentSize SM/MD/LG |
| Partage             | `<dsfr-share>` / `<dsfr-share-link>` | Désactivé→hasCookiePermissions |
| Infobulle           | `<dsfr-tooltip-button>` / directive `tooltip` | Message→tooltip · Direction/Alignement calculés par fr-placement |
| Modale              | `<dsfr-modal>`               | Taille→modalSize · Icône titre→icon · Titre/Texte (calques)→titleModal/contenu · Libellés des boutons imbriqués→actions |
| Transcription       | `<dsfr-transcription>`       | Titre→heading · Ouvert non bindable (collapse JS) |
| Tableau             | `<dsfr-datatable>` (DsfrColumn.formatFunction) | Fragments HTML bruts par type de cellule/en-tête/barre d'outils (pas de sous-composant dédié) |

Rappels d'API utiles :
- `DsfrSize` = `SM` \| `MD` \| `LG` (majuscules). `DsfrPosition` = `left` \| `right`.
- `DsfrButtonVariant` = `primary` \| `secondary` \| `tertiary` \| `tertiary-no-outline`.

## Rebranchement sur un autre fichier Figma

Figma réattribue un nouveau node-id à chaque composant à chaque republication de fichier, même pour
un composant strictement inchangé : impossible de se contenter de changer le fileKey, chaque URL de
`figma.config.json` doit être repointée (les fichiers de code, qui n'utilisent que des clés, ne
bougent pas). C'est vrai aussi bien pour une nouvelle version du même
fichier (montée de version DSFR) que pour un fichier entièrement différent (copie d'une autre équipe).

Le script `scripts/rebind-to-your-file.mjs` gère les deux cas (voir le README, section
« Adapter à votre propre fichier Figma DSFR ») : il compare l'inventaire du fichier cible à
`scripts/manifest.json` (généré depuis le fichier de référence actuel via l'API REST Figma), par
correspondance
**(page, nom de calque)** normalisée plutôt que par node-id. Si des variantes ont été fusionnées côté
design (ex. thèmes clair/sombre réunis en un seul component set), la normalisation retire ces
segments du nom pour que la correspondance reste possible malgré la restructuration.

## Checklist d'avancement

**183 nodes publiés** sur chacune des 4 stacks (Angular, HTML, React, Vue), soit les 49 familles du
catalogue (dont Bouton ProConnect et Tableau). Catalogue complet hors atomes internes 🚫/⚙️
(cf. note Tableau ci-dessous).

Légende : ✅ publié (Angular + HTML + React + Vue) · 🚧 en cours · ⬜ à faire

### Formulaires
- ✅ **Champ de saisie** · ✅ **Liste déroulante** · ✅ **Case à cocher** · ✅ **Bouton radio** (+ riche) · ✅ **Interrupteur**
- ✅ **Mot de passe** · ✅ **Ajout de fichier** · ✅ **Curseur** · ✅ **Barre de recherche**

**Section Formulaires complète.**

### Feedback
- ✅ **Alerte** (État→severity, Taille→alertSize, Fermeture→closeable · set `1935-224`)
- ✅ **Bandeau d'information** (notice, 9 niveaux d'alerte) · ✅ **Infobulle** · ✅ **Mise en avant** (callout)

### Navigation
- ✅ **Lien** · ✅ **Fil d'Ariane** · ✅ **Pagination** · ✅ **Onglets** · ✅ **Sommaire** · ✅ **Étapes (stepper)**
- ✅ **Menu latéral** · ✅ **Retour en haut de page** · ✅ **Sélecteur de langue**

### Contenu / structure
- ✅ **Bouton** (Libellé, Désactivé, position d'icône) : Angular + HTML + React + Vue publiés (4 labels)
- ✅ **Accordéon** (État → expanded : Desktop `128-27`, Mobile `128-110`, Groupe `128-600`)
- ✅ **Badge** · ✅ **Tag** · ✅ **Modale** · ✅ **Citation** · ✅ **Mise en exergue** · ✅ **Partage**
- ✅ **Contenu médias** · ✅ **Transcription** · ✅ **Carte** (9 variantes) · ✅ **Tuile** · ✅ **Tableau** (14 nodes, cf. note) · ✅ **Contrôle segmenté**

### Layout / système
- ✅ **En-tête** · ✅ **Pied de page** · ✅ **Navigation principale** (13 fragments, dsfr-header responsive) · ✅ **Liens d'évitement**
- ✅ **Paramètre d'affichage** · ✅ **Téléchargement de fichier** (lien, groupe, carte, tuile)
- ✅ **Groupe de boutons** · ✅ **Bouton FranceConnect** · ✅ **Bouton ProConnect** (nouveau 1.15) · ✅ **Gestionnaire de consentement**
- ✅ **Lettre d'information et réseaux sociaux**

> La liste exacte des composants se retrouve en explorant le fichier Figma ; compléter cette
> checklist au fil de l'eau.

## Notes spécifiques par framework

### Vue (`vue/`, label `Vue`)

Cible `@gouvminint/vue-dsfr` (repo source `github.com/dnum-mi/vue-dsfr`). Parité exacte de nodes avec
les trois autres stacks : 183 node-ids uniques, dont 20 pour `tag.figma.ts`, identiques sur toutes les
stacks (vérifié par comparaison croisée des node-ids).

**Syntaxe cible plus simple que React** : les templates Vue sont du HTML étendu réel
(`:prop="expression"`, `@event="..."`), donc une prop tableau/objet s'écrit directement
`:items="[{...}]"` entre guillemets doubles : c'est la VRAIE syntaxe Vue, contrairement à JSX où
la même astuce aurait produit un snippet invalide (cf. piège React ci-dessous). Aucun besoin de
hoister ces valeurs en `const` séparée dans la plupart des cas ; seuls les tableaux/objets multilignes
avec des clés répétées ont ponctuellement nécessité la même prudence que côté React/HTML (`imports`
uniquement factorisable, jamais une autre valeur interpolée hors de `props`).

**Composants sans équivalent vue-dsfr dédié** : `link.figma.ts` (Lien), `password.figma.ts` (Mot de
passe), `proconnect.figma.ts` (Bouton ProConnect), `display.figma.ts` (Paramètre d'affichage) :
markup DSFR brut, quasi identique à `html/`. À l'inverse, vue-dsfr couvre **plus** de composants que
React : `DsfrBackToTop`, `DsfrShare`, `DsfrTranscription`, `DsfrMedia`, `DsfrAccordionsGroup` existent
tous côté Vue (contrairement à React où ces familles sont en markup brut).

**Écarts d'API notables documentés dans les fichiers concernés** (limitations vue-dsfr vs
ngx-dsfr/react-dsfr, non bindables) : `DsfrCard` sans prop `disabled` ; `DsfrSummary` sans imbrication
(`subEntries`) ; `DsfrLanguageSelector`/`DsfrSideMenu` sans équivalent `outline`/`position` ; `DsfrTag`
sans mode « supprimable » dédié (fallback markup brut) ; `DsfrConsent` ne couvre que le bandeau (pas
de modale ni de `finalities[]`, plus limité que côté Angular) ; `DsfrNavigation` dont le raccourci
`:nav-items` ne propage pas l'état actif (composition manuelle du slot nécessaire à la place).

### React (`react/`, label `React`)

Cible `@codegouvfr/react-dsfr` (parité exacte de nodes avec Angular/HTML/Vue). L'`example` traduit la
syntaxe vers du JSX texte, vérifié à chaque fois contre le vrai code source du composant
(`github.com/codegouvfr/react-dsfr/blob/main/src/...`).

**Composants sans équivalent react-dsfr dédié** (comme pour certains cas déjà notés côté html/) :
markup DSFR brut traduit en JSX (`class`→`className`) plutôt qu'un composant importé : `link.figma.ts`
(Lien), `share.figma.ts` (Partage), `backtotop.figma.ts` (Retour en haut), `content.figma.ts`
(Contenu médias), `transcription.figma.ts` (Transcription).

**Piège de parsing spécifique à `react/`** (absent côté Angular/HTML où les attributs sont de simples
chaînes) : le parser HTML générique de Code Connect tokenize les valeurs d'attribut JSX comme du HTML
classique : une valeur tableau/objet multiligne ou contenant des clés répétées (`options={[{...}]}`)
casse avec `Duplicate attribute name`. Solution retenue et appliquée partout : hoister la valeur en
`const <nom> = ...;` déclarée en texte AVANT la balise JSX, à l'intérieur de la même template string
`html\`\`` (jamais en `const` JS externe partagée entre plusieurs `figma.connect`, ce qui casse le
parse pour une autre raison, cf. note "Navigation principale" plus bas), puis référencée par son
identifiant nu dans l'attribut (`options={<nom>}`). Voir `breadcrumb.figma.ts` pour l'exemple canonique.
Ne JAMAIS mettre la valeur brute entre guillemets doubles (`options="{[...]}"`) : ça parse, mais le
snippet affiché en Dev Mode devient du JSX syntaxiquement invalide. Ce piège concerne surtout les
composants à props tableau/objet (`checkbox`, `radio`, `radio-rich`, `toggle`, `password`, `range`,
`select`, `modal`, `segmentedcontrol`, `tag`), à vérifier si vous les modifiez.

## Notes détaillées par composant

### Tableau (particularité de binding)

La page Tableau casse le pattern habituel : aucun set « tableau complet », uniquement des
fragments de cellule (en-tête colonne, en-tête ligne, cellule donnée, cellules zéro, barres
d'outils). `dsfr-table` (ngx-dsfr) est piloté par un modèle `columns`/`data` sans notion de
« type de cellule » déclarative (le contenu réel est produit via `DsfrColumn.formatFunction` ou
`tableBodyTemplate`) : connecter une cellule à un snippet de tableau complet aurait été trompeur
en Dev Mode.

Approche retenue : chaque node connecté montre le **fragment HTML DSFR exact**
que `formatFunction`/`tableBodyTemplate` doit produire pour cette cellule (un fragment de rendu,
pas un composant Angular autonome. Angular et HTML utilisent donc le même markup (`table.figma.ts`
et `table-html.figma.ts`), puisqu'il n'existe pas de sous-composant Angular dédié à une cellule de
tableau. 14 nodes connectés sur les composants de haut niveau de la page (les atomes internes ⚙️
non connectés par convention) : Cellule donnée (SM/MD/LG), Cellule en-tête Colonne (SM/MD/LG),
Cellule en-tête Ligne (SM/MD/LG), Barre outils haut, Barre outils bas, Cellule zéro (SM/MD/LG).
Piège rencontré : la propriété Figma « Nb ligne par page » de Barre outils bas a un espace final
caché dans son nom réel (visible dans sa `key` API, absent de son `name` affiché) : `figma.boolean`
doit être appelé avec `'Nb ligne par page '` (espace final) sous peine de `publish` en échec
(« property does not exist »).

### Navigation principale (particularité de binding)

13 sets, tous rattachés à `dsfr-header` : desktop et mobile sont générés de façon responsive à
partir d'une seule entrée `[menu]` (`DsfrHeaderMenuItem[]`), donc aucun composant dédié par
fragment. Chaque node Figma correspond à une configuration particulière de `menu` (lien direct,
dépliant, mégamenu) plutôt qu'à un composant distinct. Les accès rapides mobiles viennent de
`headerToolsLinks`, hors de `menu`. « Rubrique »/« Lien direct » (menu déroulant simple) et
« Dernier lien » (item niveau 2 mobile) n'ont pas de rendu distinct → non bindés.
Piège de parser : une **variable JS externe interpolée dans plusieurs `figma.connect`** casse le
parse (`Expected a call expression as a placeholder`) : inliner le littéral dans chaque `example`
plutôt que de le factoriser en `const`.

## Conventions

Code en anglais, commentaires/commits en français (`type(scope): description`). Pas de commit sans
validation humaine. DSFR uniquement.
