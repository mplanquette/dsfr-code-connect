import figma, { html } from '@figma/code-connect/html';

// Navigation principale DSFR : 13 sets. Contrairement aux autres familles, le thème
// (Clair/Sombre) est ici une variante interne à chaque set, pas une duplication de
// page : les 13 sets couvrent déjà tout le périmètre utile, aucun thème sombre à
// exclure séparément.
// Aucun de ces fragments n'a de composant Angular dédié : `dsfr-header` génère toute
// la navigation (desktop ET mobile, de façon responsive) à partir d'une seule entrée
// `[menu]` de type `DsfrHeaderMenuItem[]`. Chaque exemple ci-dessous montre donc la
// configuration de `menu` qui produit le fragment sélectionné dans Figma.
// Survol = pseudo-état → ignoré. « >1200px » et « Dernier lien » sont des variantes
// de mise en page CSS, non pilotables par une input → ignorées.

const imports = ["import { DsfrHeaderComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Desktop / Barre de navigation - Lien seul ───────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-15930', {
  props: {
    active: figma.enum('Courant', { True: 'true', False: 'false' }),
  },
  example: ({ active }) =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{ label: 'Libellé du lien', routePath: '/lien', active: ${active} }]"></dsfr-header>`,
  imports,
});

// ─── Desktop / Barre de navigation - Dépliant ────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-15981', {
  props: {
    expanded: figma.enum('Ouvert', { True: 'true', False: 'false' }),
    active: figma.enum('Courant', { True: 'true', False: 'false' }),
  },
  example: ({ expanded, active }) =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Menu déroulant',
    expanded: ${expanded},
    active: ${active},
    subItems: [
      { label: 'Premier lien', routePath: '/premier' },
      { label: 'Deuxième lien', routePath: '/deuxieme' }
    ]
  }]"></dsfr-header>`,
  imports,
});

// ─── Desktop / Barre de navigation - Complète ────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-18621', {
  props: {
    items: figma.enum('Items', {
      '2-4': `[
    { label: 'Premier lien', routePath: '/premier' },
    { label: 'Deuxième lien', routePath: '/deuxieme' },
    { label: 'Troisième lien', routePath: '/troisieme' }
  ]`,
      '5-8': `[
    { label: 'Premier lien', routePath: '/premier' },
    { label: 'Deuxième lien', routePath: '/deuxieme' },
    { label: 'Troisième lien', routePath: '/troisieme' },
    { label: 'Quatrième lien', routePath: '/quatrieme' },
    { label: 'Cinquième lien', routePath: '/cinquieme' }
  ]`,
    }),
  },
  example: ({ items }) =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="${items}"></dsfr-header>`,
  imports,
});

// ─── Desktop / Menu déroulant - Item ──────────────────────────────────────────
// « Rubrique » (vs « Lien direct ») n'a pas de rendu distinct côté ngx-dsfr : les
// deux se déclarent comme un simple lien dans `subItems`.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-18731', {
  props: {
    active: figma.enum('État', { Défaut: 'false', Survol: 'false', Courant: 'true' }),
  },
  example: ({ active }) =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Menu déroulant',
    expanded: true,
    subItems: [{ label: 'Libellé du lien', routePath: '/lien', active: ${active} }]
  }]"></dsfr-header>`,
  imports,
});

// ─── Desktop / Menu déroulant - Complet ───────────────────────────────────────
// « Rubrique » (titre de section dans le panneau) n'a pas d'équivalent dans
// `subItems` (simple tableau de liens, sans regroupement par titre) → non bindé.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-18976', {
  example: () =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Menu déroulant',
    expanded: true,
    subItems: [
      { label: 'Premier lien', routePath: '/premier' },
      { label: 'Deuxième lien', routePath: '/deuxieme' },
      { label: 'Troisième lien', routePath: '/troisieme' }
    ]
  }]"></dsfr-header>`,
  imports,
});

// ─── Desktop / Mégamenu - Item ────────────────────────────────────────────────
// « Catégorie » (vs « Lien ») correspond à un lien à l'intérieur d'une `category`.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-19335', {
  props: {
    active: figma.enum('État', { Défaut: 'false', Survol: 'false', Courant: 'true' }),
  },
  example: ({ active }) =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Rubrique',
    megaMenu: {
      categories: [{
        label: 'Catégorie',
        subItems: [{ label: 'Libellé du lien', routePath: '/lien', active: ${active} }]
      }]
    }
  }]"></dsfr-header>`,
  imports,
});

// ─── Desktop / Mégamenu - Complet ─────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-23176', {
  props: {
    categories: figma.enum('Catégories', {
      True: `[
        { label: 'Première catégorie', subItems: [{ label: 'Lien', routePath: '/lien-1' }] },
        { label: 'Deuxième catégorie', subItems: [{ label: 'Lien', routePath: '/lien-2' }] }
      ]`,
      False: `[
        { label: 'Catégorie', subItems: [{ label: 'Lien', routePath: '/lien-1' }] }
      ]`,
    }),
    leader: figma.enum('Rubrique', {
      Sans: '',
      Titre: `,
      leader: { title: 'Titre de la rubrique' }`,
      'Titre + description': `,
      leader: { title: 'Titre de la rubrique', text: 'Texte de description de la rubrique.' }`,
    }),
  },
  example: ({ categories, leader }) =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Rubrique',
    megaMenu: {
      categories: ${categories}${leader}
    }
  }]"></dsfr-header>`,
  imports,
});

// ─── Mobile / Items de niveau 1 - Dépliant ───────────────────────────────────
// « Titre rubrique » ajoute un titre de section au panneau du mégamenu ouvert
// (leader.title), non disponible sur un simple dépliant (subItems) → bindé côté
// mégamenu.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=251-16916', {
  props: {
    expanded: figma.enum('Ouvert', { True: 'true', False: 'false' }),
    active: figma.enum('État', { Défaut: 'false', Courant: 'true' }),
    title: figma.boolean('Titre rubrique', {
      true: `,
      leader: { title: 'Titre de la rubrique' }`,
      false: '',
    }),
  },
  example: ({ expanded, active, title }) =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Menu déroulant',
    expanded: ${expanded},
    active: ${active},
    megaMenu: {
      categories: [{ label: 'Catégorie', subItems: [{ label: 'Lien', routePath: '/lien' }] }]${title}
    }
  }]"></dsfr-header>`,
  imports,
});

// ─── Mobile / Item de niveau 2 ────────────────────────────────────────────────
// « Catégorie » (vs « Lien direct ») correspond à un lien de mégamenu ; « Dernier
// lien » est une variante de mise en page (absence de séparateur) → non bindée.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=251-16994', {
  props: {
    active: figma.enum('État', { Défaut: 'false', Courant: 'true' }),
  },
  example: ({ active }) =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Menu déroulant',
    expanded: true,
    subItems: [{ label: 'Libellé du lien', routePath: '/lien', active: ${active} }]
  }]"></dsfr-header>`,
  imports,
});

// ─── Mobile / Navigation - Liste de liens ────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=251-17076', {
  props: {
    category: figma.boolean('Catégorie', {
      true: `[{ label: 'Catégorie', subItems: [
      { label: 'Premier lien', routePath: '/premier' },
      { label: 'Deuxième lien', routePath: '/deuxieme' }
    ] }]`,
      false: `[{ label: 'Premier lien', routePath: '/premier' }]`,
    }),
  },
  example: ({ category }) =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Menu déroulant',
    expanded: true,
    megaMenu: { categories: ${category} }
  }]"></dsfr-header>`,
  imports,
});

// ─── Mobile / Items de niveau 1 - Lien direct ────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=251-17391', {
  props: {
    active: figma.enum('État', { Défaut: 'false', Courant: 'true' }),
  },
  example: ({ active }) =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{ label: 'Libellé du lien', routePath: '/lien', active: ${active} }]"></dsfr-header>`,
  imports,
});

// ─── Mobile / Items de niveau 1 - Accès rapide ───────────────────────────────
// Les accès rapides (connexion, langue…) ne font pas partie de `menu` : ils se
// déclarent via `headerToolsLinks`, dupliqués automatiquement dans le menu mobile.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=264-1263', {
  example: () =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [headerToolsLinks]="[
    { label: 'Se connecter', icon: 'fr-icon-lock-line', routePath: '/connexion' }
  ]"
  [menu]="[{ label: 'Libellé du lien', routePath: '/lien' }]"></dsfr-header>`,
  imports,
});

// ─── Mobile / Navigation - Complète ──────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=264-2355', {
  props: {
    quickAccess: figma.boolean('Accès rapides', {
      true: `\n  [headerToolsLinks]="[{ label: 'Se connecter', icon: 'fr-icon-lock-line', routePath: '/connexion' }]"`,
      false: '',
    }),
  },
  example: ({ quickAccess }) =>
    html`<dsfr-header
  [logo]="{ label: 'République Française' }"${quickAccess}
  [menu]="[
    { label: 'Premier lien', routePath: '/premier' },
    { label: 'Deuxième lien', routePath: '/deuxieme' },
    { label: 'Troisième lien', routePath: '/troisieme' }
  ]"></dsfr-header>`,
  imports,
});
