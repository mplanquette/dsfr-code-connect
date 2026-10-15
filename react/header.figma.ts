import figma, { html } from '@figma/code-connect/html';

// En-tête DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, <Header> de
// react-dsfr gère les deux formats de façon responsive à partir des mêmes props (pas
// de composant distinct desktop/mobile). Les composants « Éléments » (Exemple de
// logo, Fonctionnel droite, Bloc marque) sont des atomes internes → non connectés.
// « Recherche ouverte » (Mobile) est un état transitoire d'interaction (panneau de
// recherche déplié), non piloté par une prop → non connecté. Thème sombre = CSS seul
// (géré par variables/collections de thèmes, pas par une prop React).
// Recherche → présence de `onSearchButtonClick` (seul déclencheur qui active la barre
// de recherche intégrée à <Header>, react-dsfr n'a pas de booléen `searchBar` dédié).
// Le tableau `navigation` est déclaré avant le JSX : le parser Code Connect (HTML
// générique) interprète toute valeur d'attribut contenant plusieurs objets comme une
// liste d'attributs HTML et lève une erreur « Duplicate attribute name » (text répété).

const imports = ["import { Header } from '@codegouvfr/react-dsfr/Header'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_EN_TETE__DESKTOP_EN_TETE>', {
  props: {
    serviceTitle: figma.boolean('Nom du site', { true: '\n  serviceTitle="Nom du site / de l\'organisme"', false: '' }),
    tagline: figma.boolean('Description', { true: '\n  serviceTagline="Baseline / accroche du site"', false: '' }),
    search: figma.boolean('Fonctionnel droite', { true: '\n  onSearchButtonClick={(text) => console.log(text)}', false: '' }),
  },
  example: ({ serviceTitle, tagline, search }) =>
    html`const navigation = [
  { text: 'Premier lien', linkProps: { href: '/premier' } },
  { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } }
];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: "Accueil - Nom du site / de l'organisme" }}${serviceTitle}${tagline}${search}
  navigation={navigation} />`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_EN_TETE__MOBILE_EN_TETE>', {
  props: {
    serviceTitle: figma.boolean('Nom du site', { true: '\n  serviceTitle="Nom du site / de l\'organisme"', false: '' }),
    tagline: figma.boolean('Description', { true: '\n  serviceTagline="Baseline / accroche du site"', false: '' }),
    search: figma.boolean('Recherche', { true: '\n  onSearchButtonClick={(text) => console.log(text)}', false: '' }),
  },
  example: ({ serviceTitle, tagline, search }) =>
    html`const navigation = [
  { text: 'Premier lien', linkProps: { href: '/premier' } },
  { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } }
];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: "Accueil - Nom du site / de l'organisme" }}${serviceTitle}${tagline}${search}
  navigation={navigation} />`,
  imports,
});
