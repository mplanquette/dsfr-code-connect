import figma, { html } from '@figma/code-connect/html';

// En-tête DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, dsfr-header est
// un composant responsive unique. Les composants « Éléments » (Exemple de logo,
// Fonctionnel droite, Bloc marque) sont des atomes internes → non connectés.
// « Recherche ouverte » (Mobile) est un état transitoire d'interaction (panneau de
// recherche déplié), non piloté par une input → non connecté. Thème sombre = CSS seul.

const imports = ["import { DsfrHeaderComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_EN_TETE__DESKTOP_EN_TETE>', {
  props: {
    serviceTitle: figma.boolean('Nom du site', { true: '\n  serviceTitle="Nom du site / de l\'organisme"', false: '' }),
    tagline: figma.boolean('Description', { true: '\n  serviceTagline="Baseline / accroche du site"', false: '' }),
    searchBar: figma.boolean('Fonctionnel droite', { true: '\n  [searchBar]="true"', false: '' }),
  },
  example: ({ serviceTitle, tagline, searchBar }) =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"${serviceTitle}${tagline}${searchBar}
  [menu]="[
    { label: 'Premier lien', routePath: '/premier' },
    { label: 'Deuxième lien', routePath: '/deuxieme' }
  ]"></dsfr-header>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_EN_TETE__MOBILE_EN_TETE>', {
  props: {
    serviceTitle: figma.boolean('Nom du site', { true: '\n  serviceTitle="Nom du site / de l\'organisme"', false: '' }),
    tagline: figma.boolean('Description', { true: '\n  serviceTagline="Baseline / accroche du site"', false: '' }),
    searchBar: figma.boolean('Recherche', { true: '\n  [searchBar]="true"', false: '' }),
  },
  example: ({ serviceTitle, tagline, searchBar }) =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"${serviceTitle}${tagline}${searchBar}
  [menu]="[
    { label: 'Premier lien', routePath: '/premier' },
    { label: 'Deuxième lien', routePath: '/deuxieme' }
  ]"></dsfr-header>`,
  imports,
});
