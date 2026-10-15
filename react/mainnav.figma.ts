import figma, { html } from '@figma/code-connect/html';

// Navigation principale DSFR : 13 sets, tous rattachés à <Header> (react-dsfr n'a pas
// de composant dédié par fragment : desktop ET mobile sont générés de façon
// responsive à partir d'une seule prop `navigation` de type `MainNavigationProps.Item[]`
//, cf. `MainNavigation/MainNavigation.tsx`). Chaque exemple montre la configuration de
// `navigation` qui produit le fragment sélectionné dans Figma. Le thème (Clair/Sombre)
// est une variante interne à chaque set (pas de duplication de page) : les 13 sets
// couvrent déjà tout le périmètre utile.
// Survol = pseudo-état → ignoré. « >1200px » et « Dernier lien » sont des variantes de
// mise en page CSS, non pilotables par une prop → ignorées.
// « Ouvert » (état déplié d'un dépliant/mégamenu) n'a PAS d'équivalent en tant que prop
// contrôlée côté react-dsfr : `aria-expanded` est géré en interne par le composant
// (toujours `false` au rendu, ouvert au clic via le JS du DSFR), contrairement à
// ngx-dsfr qui expose `expanded` sur l'item de menu → non bindé ici.
// « Rubrique » (vs « Lien direct ») utilise `categoryMainText`/`categoryMainLink` de
// façon interchangeable (les deux produisent un en-tête de catégorie) : pas de rendu
// distinct, comme déjà noté côté Angular/HTML.
// IMPORTANT (piège déjà rencontré) : aucune variable JS externe interpolée dans
// `html\`\`` en dehors de `props`, même via une const de module partagée entre
// plusieurs `figma.connect` → tout est réécrit en dur dans chaque `example`.
// AUTRE PIÈGE (spécifique au parser HTML générique utilisé pour React) : une valeur
// d'attribut JSX contenant plusieurs objets (`navigation={[{...}, {...}]}`) est
// mal tokenisée par le parseur HTML sous-jacent (JSDOM/parse5), qui la lit comme une
// liste d'attributs et lève « Duplicate attribute name » dès qu'une clé (`text`,
// `linkProps`…) se répète. Contournement : le tableau `navigation` est toujours
// déclaré en `const` AVANT le JSX, puis référencé par son seul identifiant dans
// l'attribut (`navigation={navigation}`), comme dans `breadcrumb.figma.ts`.

const imports = ["import { Header } from '@codegouvfr/react-dsfr/Header'"];

// ─── Desktop / Barre de navigation - Lien seul ───────────────────────────────
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_BARRE_DE_NAVIGATION_LIEN_SEUL>', {
  props: {
    active: figma.enum('Courant', { True: 'true', False: 'false' }),
  },
  example: ({ active }) =>
    html`const navigation = [
  { text: 'Libellé du lien', linkProps: { href: '/lien' }, isActive: ${active} }
];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  navigation={navigation} />`,
  imports,
});

// ─── Desktop / Barre de navigation - Dépliant ────────────────────────────────
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_BARRE_DE_NAVIGATION_DEPLIANT>', {
  props: {
    active: figma.enum('Courant', { True: 'true', False: 'false' }),
  },
  example: ({ active }) =>
    html`const navigation = [{
  text: 'Menu déroulant',
  isActive: ${active},
  menuLinks: [
    { text: 'Premier lien', linkProps: { href: '/premier' } },
    { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } }
  ]
}];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  navigation={navigation} />`,
  imports,
});

// ─── Desktop / Barre de navigation - Complète ────────────────────────────────
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_BARRE_DE_NAVIGATION_COMPLETE>', {
  props: {
    items: figma.enum('Items', {
      '2-4': `[
  { text: 'Premier lien', linkProps: { href: '/premier' } },
  { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } },
  { text: 'Troisième lien', linkProps: { href: '/troisieme' } }
]`,
      '5-8': `[
  { text: 'Premier lien', linkProps: { href: '/premier' } },
  { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } },
  { text: 'Troisième lien', linkProps: { href: '/troisieme' } },
  { text: 'Quatrième lien', linkProps: { href: '/quatrieme' } },
  { text: 'Cinquième lien', linkProps: { href: '/cinquieme' } }
]`,
    }),
  },
  example: ({ items }) =>
    html`const navigation = ${items};

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  navigation={navigation} />`,
  imports,
});

// ─── Desktop / Menu déroulant - Item ──────────────────────────────────────────
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_MENU_DEROULANT_ITEM>', {
  props: {
    active: figma.enum('État', { Défaut: 'false', Survol: 'false', Courant: 'true' }),
  },
  example: ({ active }) =>
    html`const navigation = [{
  text: 'Menu déroulant',
  menuLinks: [{ text: 'Libellé du lien', linkProps: { href: '/lien' }, isActive: ${active} }]
}];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  navigation={navigation} />`,
  imports,
});

// ─── Desktop / Menu déroulant - Complet ───────────────────────────────────────
// « Rubrique » (titre de section dans le panneau) n'a pas d'équivalent dans
// `menuLinks` (simple tableau de liens, sans regroupement par titre) → non bindé.
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_MENU_DEROULANT_COMPLET>', {
  example: () =>
    html`const navigation = [{
  text: 'Menu déroulant',
  menuLinks: [
    { text: 'Premier lien', linkProps: { href: '/premier' } },
    { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } },
    { text: 'Troisième lien', linkProps: { href: '/troisieme' } }
  ]
}];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  navigation={navigation} />`,
  imports,
});

// ─── Desktop / Mégamenu - Item ────────────────────────────────────────────────
// « Catégorie » (vs « Lien ») correspond à un lien à l'intérieur d'une `category`.
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_MEGAMENU_ITEM>', {
  props: {
    active: figma.enum('État', { Défaut: 'false', Survol: 'false', Courant: 'true' }),
  },
  example: ({ active }) =>
    html`const navigation = [{
  text: 'Rubrique',
  megaMenu: {
    categories: [{
      categoryMainText: 'Catégorie',
      links: [{ text: 'Libellé du lien', linkProps: { href: '/lien' }, isActive: ${active} }]
    }]
  }
}];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  navigation={navigation} />`,
  imports,
});

// ─── Desktop / Mégamenu - Complet ─────────────────────────────────────────────
// `leader.paragraph` est obligatoire côté react-dsfr (contrairement à ngx-dsfr où le
// texte de la rubrique est optionnel) : chaîne vide posée pour le cas « Titre » seul.
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_MEGAMENU_COMPLET>', {
  props: {
    categories: figma.enum('Catégories', {
      True: `[
    { categoryMainText: 'Première catégorie', links: [{ text: 'Lien', linkProps: { href: '/lien-1' } }] },
    { categoryMainText: 'Deuxième catégorie', links: [{ text: 'Lien', linkProps: { href: '/lien-2' } }] }
  ]`,
      False: `[
    { categoryMainText: 'Catégorie', links: [{ text: 'Lien', linkProps: { href: '/lien-1' } }] }
  ]`,
    }),
    leader: figma.enum('Rubrique', {
      Sans: '',
      Titre: `,
  leader: { title: 'Titre de la rubrique', paragraph: '' }`,
      'Titre + description': `,
  leader: { title: 'Titre de la rubrique', paragraph: 'Texte de description de la rubrique.' }`,
    }),
  },
  example: ({ categories, leader }) =>
    html`const navigation = [{
  text: 'Rubrique',
  megaMenu: {
    categories: ${categories}${leader}
  }
}];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  navigation={navigation} />`,
  imports,
});

// ─── Mobile / Items de niveau 1 - Dépliant ───────────────────────────────────
// « Titre rubrique » ajoute un titre de section au panneau du mégamenu ouvert
// (leader.title), non disponible sur un simple dépliant (menuLinks) → bindé côté
// mégamenu, comme côté Angular/HTML.
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__MOBILE_ITEMS_DE_NIVEAU_1_DEPLIANT>', {
  props: {
    active: figma.enum('État', { Défaut: 'false', Courant: 'true' }),
    title: figma.boolean('Titre rubrique', {
      true: `,
    leader: { title: 'Titre de la rubrique', paragraph: '' }`,
      false: '',
    }),
  },
  example: ({ active, title }) =>
    html`const navigation = [{
  text: 'Menu déroulant',
  isActive: ${active},
  megaMenu: {
    categories: [{ categoryMainText: 'Catégorie', links: [{ text: 'Lien', linkProps: { href: '/lien' } }] }]${title}
  }
}];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  navigation={navigation} />`,
  imports,
});

// ─── Mobile / Item de niveau 2 ────────────────────────────────────────────────
// « Catégorie » (vs « Lien direct ») correspond à un lien de mégamenu ; « Dernier
// lien » est une variante de mise en page (absence de séparateur) → non bindée.
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__MOBILE_ITEM_DE_NIVEAU_2>', {
  props: {
    active: figma.enum('État', { Défaut: 'false', Courant: 'true' }),
  },
  example: ({ active }) =>
    html`const navigation = [{
  text: 'Menu déroulant',
  megaMenu: {
    categories: [{
      categoryMainText: 'Catégorie',
      links: [{ text: 'Libellé du lien', linkProps: { href: '/lien' }, isActive: ${active} }]
    }]
  }
}];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  navigation={navigation} />`,
  imports,
});

// ─── Mobile / Navigation - Liste de liens ────────────────────────────────────
// « Catégorie » false : lien direct sans regroupement, approximé via
// `categoryMainLink` (pas de rendu distinct de `categoryMainText` pour un lien seul).
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__MOBILE_NAVIGATION_LISTE_DE_LIENS>', {
  props: {
    category: figma.boolean('Catégorie', {
      true: `[{
    categoryMainText: 'Catégorie',
    links: [
      { text: 'Premier lien', linkProps: { href: '/premier' } },
      { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } }
    ]
  }]`,
      false: `[{
    categoryMainLink: { text: 'Premier lien', linkProps: { href: '/premier' } },
    links: []
  }]`,
    }),
  },
  example: ({ category }) =>
    html`const navigation = [{
  text: 'Menu déroulant',
  megaMenu: { categories: ${category} }
}];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  navigation={navigation} />`,
  imports,
});

// ─── Mobile / Items de niveau 1 - Lien direct ────────────────────────────────
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__MOBILE_ITEMS_DE_NIVEAU_1_LIEN_DIRECT>', {
  props: {
    active: figma.enum('État', { Défaut: 'false', Courant: 'true' }),
  },
  example: ({ active }) =>
    html`const navigation = [
  { text: 'Libellé du lien', linkProps: { href: '/lien' }, isActive: ${active} }
];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  navigation={navigation} />`,
  imports,
});

// ─── Mobile / Items de niveau 1 - Accès rapide ───────────────────────────────
// Les accès rapides (connexion, langue…) ne font pas partie de `navigation` : ils se
// déclarent via `quickAccessItems`, dupliqués automatiquement dans le menu mobile.
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__MOBILE_ITEMS_DE_NIVEAU_1_ACCES_RAPIDE>', {
  example: () =>
    html`const navigation = [{ text: 'Libellé du lien', linkProps: { href: '/lien' } }];
const quickAccessItems = [
  { iconId: 'fr-icon-lock-line', text: 'Se connecter', linkProps: { href: '/connexion' } }
];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  quickAccessItems={quickAccessItems}
  navigation={navigation} />`,
  imports,
});

// ─── Mobile / Navigation - Complète ──────────────────────────────────────────
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__MOBILE_NAVIGATION_COMPLETE>', {
  props: {
    quickAccess: figma.boolean('Accès rapides', {
      true: `const quickAccessItems = [
  { iconId: 'fr-icon-lock-line', text: 'Se connecter', linkProps: { href: '/connexion' } }
];

`,
      false: '',
    }),
    quickAccessAttr: figma.boolean('Accès rapides', {
      true: '\n  quickAccessItems={quickAccessItems}',
      false: '',
    }),
  },
  example: ({ quickAccess, quickAccessAttr }) =>
    html`${quickAccess}const navigation = [
  { text: 'Premier lien', linkProps: { href: '/premier' } },
  { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } },
  { text: 'Troisième lien', linkProps: { href: '/troisieme' } }
];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}${quickAccessAttr}
  navigation={navigation} />`,
  imports,
});
