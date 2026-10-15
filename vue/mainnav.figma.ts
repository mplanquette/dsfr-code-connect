import figma, { html } from '@figma/code-connect/html';

// Navigation principale DSFR : 13 sets. Contrairement à Angular (tout piloté par une
// unique prop `[menu]` sur `dsfr-header`) ou React (`navigation` sur `<Header>`), vue-dsfr
// isole la navigation dans un composant dédié `DsfrNavigation`, généralement posé dans le
// slot `mainnav` de `DsfrHeader` mais utilisable seul (il rend directement un `<nav
// class="fr-nav">`), c'est ce que montrent les snippets ci-dessous pour les 11 premiers
// nodes, purement dédiés au contenu de la nav. Seuls les 2 derniers nodes (accès rapides)
// impliquent `DsfrHeader` (prop `quick-links`, hors de `DsfrNavigation`).
// Vue expose 2 façons d'utiliser `DsfrNavigation` : le raccourci déclaratif `:nav-items`
// (tableau homogène, mappé automatiquement vers lien/menu/mégamenu selon sa forme), et la
// composition manuelle du slot par défaut avec `<DsfrNavigationItem>` /
// `<DsfrNavigationMenu>` / `<DsfrNavigationMegaMenu>` / `<DsfrNavigationMenuItem>` /
// `<DsfrNavigationMenuLink>`. Le raccourci `:nav-items` NE PROPAGE PAS le `active` d'un
// item vers son rendu (`DsfrNavigation.vue` ne passe pas `navItem.active` à
// `DsfrNavigationItem`/`DsfrNavigationMenuItem`) : pour tout node où « Courant »/« État »
// doit être visible, on utilise donc la composition manuelle (qui, elle, expose `active`
// directement sur `DsfrNavigationItem`/`DsfrNavigationMenuItem`) ; le raccourci `:nav-items`
// n'est gardé que pour les nodes sans état actif à démontrer.
// « Ouvert » (dépliant/mégamenu) SE bind, via la prop `expanded-id` exposée directement par
// `DsfrNavigationMenu`/`DsfrNavigationMegaMenu` (elles calculent leur état ouvert par
// `id === expandedId`), contrairement à React où l'ouverture n'est pas contrôlable.
// « État » sur un lien de catégorie de mégamenu N'A PAS d'équivalent : ni
// `DsfrNavigationMegaMenuCategory` ni `DsfrNavigationMenuLink` ne propagent/consomment de
// prop `active` pour un lien interne à une catégorie (seuls les `<DsfrNavigationItem>` et
// `<DsfrNavigationMenuItem>` de plus haut niveau le font) → non bindé sur les 2 nodes
// concernés (Mégamenu - Item, Mobile - Item de niveau 2 dans un mégamenu).
// « Rubrique » (leader du mégamenu) : `DsfrNavigationMegaMenuProps` n'a pas de `leader`
// séparé du `title` du bouton : le même `title` sert de libellé ET de titre affiché dans le
// panneau (`<h4>{{ title }}</h4>`), toujours rendu. Impossible de reproduire le cas
// « Sans » (pas de titre dans le panneau) → approximé par « Titre » (même rendu) ; seule la
// prop `description` (texte optionnel) distingue réellement « Titre + description ».
// Survol = pseudo-état → ignoré. « >1200px » et « Dernier lien » sont des variantes de mise
// en page CSS, non pilotables par une prop → ignorées. « Rubrique »/« Lien direct » (menu
// déroulant simple) n'ont pas de rendu distinct → non bindés (comme côté Angular/HTML).

const imports = [
  "import DsfrNavigation from '@gouvminint/vue-dsfr/DsfrNavigation.vue'",
  "import DsfrHeader from '@gouvminint/vue-dsfr/DsfrHeader.vue'",
];

// ─── Desktop / Barre de navigation - Lien seul ───────────────────────────────
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_BARRE_DE_NAVIGATION_LIEN_SEUL>', {
  props: {
    active: figma.enum('Courant', { True: 'true', False: 'false' }),
  },
  example: ({ active }) =>
    html`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem :active="${active}">
      <DsfrNavigationMenuLink to="/lien" text="Libellé du lien" />
    </DsfrNavigationItem>
  </DsfrNavigation>`,
  imports,
});

// ─── Desktop / Barre de navigation - Dépliant ────────────────────────────────
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_BARRE_DE_NAVIGATION_DEPLIANT>', {
  props: {
    expandedId: figma.enum('Ouvert', { True: "'menu-dropdown'", False: "''" }),
    active: figma.enum('Courant', { True: 'true', False: 'false' }),
  },
  example: ({ expandedId, active }) =>
    html`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem :active="${active}">
      <DsfrNavigationMenu
        id="menu-dropdown"
        title="Menu déroulant"
        :expanded-id="${expandedId}"
        :links="[
          { to: '/premier', text: 'Premier lien' },
          { to: '/deuxieme', text: 'Deuxième lien' }
        ]"
      />
    </DsfrNavigationItem>
  </DsfrNavigation>`,
  imports,
});

// ─── Desktop / Barre de navigation - Complète ────────────────────────────────
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_BARRE_DE_NAVIGATION_COMPLETE>', {
  props: {
    items: figma.enum('Items', {
      '2-4': `[
      { to: '/premier', text: 'Premier lien' },
      { to: '/deuxieme', text: 'Deuxième lien' },
      { to: '/troisieme', text: 'Troisième lien' }
    ]`,
      '5-8': `[
      { to: '/premier', text: 'Premier lien' },
      { to: '/deuxieme', text: 'Deuxième lien' },
      { to: '/troisieme', text: 'Troisième lien' },
      { to: '/quatrieme', text: 'Quatrième lien' },
      { to: '/cinquieme', text: 'Cinquième lien' }
    ]`,
    }),
  },
  example: ({ items }) =>
    html`<DsfrNavigation
    label="Menu principal"
    :nav-items="${items}"
  />`,
  imports,
});

// ─── Desktop / Menu déroulant - Item ──────────────────────────────────────────
// « Rubrique » (vs « Lien direct ») n'a pas de rendu distinct côté vue-dsfr : les deux
// se déclarent comme un simple lien dans le panneau du menu.
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_MENU_DEROULANT_ITEM>', {
  props: {
    active: figma.enum('État', { Défaut: 'false', Survol: 'false', Courant: 'true' }),
  },
  example: ({ active }) =>
    html`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem>
      <DsfrNavigationMenu id="menu-dropdown" title="Menu déroulant" expanded-id="menu-dropdown">
        <DsfrNavigationMenuItem :active="${active}">
          <DsfrNavigationMenuLink to="/lien" text="Libellé du lien" />
        </DsfrNavigationMenuItem>
      </DsfrNavigationMenu>
    </DsfrNavigationItem>
  </DsfrNavigation>`,
  imports,
});

// ─── Desktop / Menu déroulant - Complet ───────────────────────────────────────
// « Rubrique » (titre de section dans le panneau) n'a pas d'équivalent dans `links`
// (simple tableau de liens, sans regroupement par titre) → non bindé.
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_MENU_DEROULANT_COMPLET>', {
  example: () =>
    html`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem>
      <DsfrNavigationMenu
        id="menu-dropdown"
        title="Menu déroulant"
        expanded-id="menu-dropdown"
        :links="[
          { to: '/premier', text: 'Premier lien' },
          { to: '/deuxieme', text: 'Deuxième lien' },
          { to: '/troisieme', text: 'Troisième lien' }
        ]"
      />
    </DsfrNavigationItem>
  </DsfrNavigation>`,
  imports,
});

// ─── Desktop / Mégamenu - Item ────────────────────────────────────────────────
// « Catégorie » (vs « Lien ») correspond à un lien à l'intérieur d'une catégorie de
// mégamenu. « État » non bindé : `DsfrNavigationMegaMenuCategory` ne propage pas de prop
// `active` sur ses liens (limitation de vue-dsfr, cf. note de tête de fichier).
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_MEGAMENU_ITEM>', {
  example: () =>
    html`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem>
      <DsfrNavigationMegaMenu
        id="mega-menu"
        title="Rubrique"
        expanded-id="mega-menu"
        :menus="[{ title: 'Catégorie', links: [{ to: '/lien', text: 'Libellé du lien' }] }]"
      />
    </DsfrNavigationItem>
  </DsfrNavigation>`,
  imports,
});

// ─── Desktop / Mégamenu - Complet ─────────────────────────────────────────────
// « Rubrique : Sans » n'est pas reproductible (le `title` du mégamenu est toujours
// affiché dans le panneau, cf. note de tête de fichier) : approximé par « Titre » (même
// rendu, `description` vide).
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__DESKTOP_MEGAMENU_COMPLET>', {
  props: {
    menus: figma.enum('Catégories', {
      True: `[
        { title: 'Première catégorie', links: [{ to: '/lien-1', text: 'Lien' }] },
        { title: 'Deuxième catégorie', links: [{ to: '/lien-2', text: 'Lien' }] }
      ]`,
      False: `[
        { title: 'Catégorie', links: [{ to: '/lien-1', text: 'Lien' }] }
      ]`,
    }),
    description: figma.enum('Rubrique', {
      Sans: '',
      Titre: '',
      'Titre + description': ' description="Texte de description de la rubrique."',
    }),
  },
  example: ({ menus, description }) =>
    html`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem>
      <DsfrNavigationMegaMenu
        id="mega-menu"
        title="Rubrique"
        expanded-id="mega-menu"${description}
        :menus="${menus}"
      />
    </DsfrNavigationItem>
  </DsfrNavigation>`,
  imports,
});

// ─── Mobile / Items de niveau 1 - Dépliant ───────────────────────────────────
// « Titre rubrique » non bindé : `DsfrNavigationMenu` (dépliant simple) n'a pas de titre
// de panneau (contrairement au mégamenu, où ce titre n'est de toute façon pas
// optionnel) → aucune configuration de vue-dsfr ne modélise ce bouton tri-état.
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__MOBILE_ITEMS_DE_NIVEAU_1_DEPLIANT>', {
  props: {
    expandedId: figma.enum('Ouvert', { True: "'menu-dropdown'", False: "''" }),
    active: figma.enum('État', { Défaut: 'false', Courant: 'true' }),
  },
  example: ({ expandedId, active }) =>
    html`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem :active="${active}">
      <DsfrNavigationMenu
        id="menu-dropdown"
        title="Menu déroulant"
        :expanded-id="${expandedId}"
        :links="[{ to: '/lien', text: 'Lien' }]"
      />
    </DsfrNavigationItem>
  </DsfrNavigation>`,
  imports,
});

// ─── Mobile / Item de niveau 2 ────────────────────────────────────────────────
// « Catégorie » (vs « Lien direct ») correspond à un lien de mégamenu ; « Dernier lien »
// est une variante de mise en page (absence de séparateur) → non bindée. Ce fragment
// utilise le dépliant simple (pas le mégamenu) : c'est le seul des deux qui expose
// `active` sur son item via `DsfrNavigationMenuItem` (cf. note de tête de fichier).
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__MOBILE_ITEM_DE_NIVEAU_2>', {
  props: {
    active: figma.enum('État', { Défaut: 'false', Courant: 'true' }),
  },
  example: ({ active }) =>
    html`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem>
      <DsfrNavigationMenu id="menu-dropdown" title="Menu déroulant" expanded-id="menu-dropdown">
        <DsfrNavigationMenuItem :active="${active}">
          <DsfrNavigationMenuLink to="/lien" text="Libellé du lien" />
        </DsfrNavigationMenuItem>
      </DsfrNavigationMenu>
    </DsfrNavigationItem>
  </DsfrNavigation>`,
  imports,
});

// ─── Mobile / Navigation - Liste de liens ────────────────────────────────────
// Panneau de mégamenu ouvert, avec ou sans regroupement par catégorie. Comme le titre de
// catégorie (`<h5>`) est obligatoire dans `DsfrNavigationMegaMenuCategory`, le cas
// « Catégorie : non » est approximé par une catégorie dont le titre reprend le libellé du
// premier lien (pas de rendu réellement « à plat » disponible côté vue-dsfr).
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__MOBILE_NAVIGATION_LISTE_DE_LIENS>', {
  props: {
    menus: figma.boolean('Catégorie', {
      true: `[{ title: 'Catégorie', links: [
        { to: '/premier', text: 'Premier lien' },
        { to: '/deuxieme', text: 'Deuxième lien' }
      ] }]`,
      false: `[{ title: 'Premier lien', links: [{ to: '/premier', text: 'Premier lien' }] }]`,
    }),
  },
  example: ({ menus }) =>
    html`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem>
      <DsfrNavigationMegaMenu
        id="mega-menu"
        title="Menu déroulant"
        expanded-id="mega-menu"
        :menus="${menus}"
      />
    </DsfrNavigationItem>
  </DsfrNavigation>`,
  imports,
});

// ─── Mobile / Items de niveau 1 - Lien direct ────────────────────────────────
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__MOBILE_ITEMS_DE_NIVEAU_1_LIEN_DIRECT>', {
  props: {
    active: figma.enum('État', { Défaut: 'false', Courant: 'true' }),
  },
  example: ({ active }) =>
    html`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem :active="${active}">
      <DsfrNavigationMenuLink to="/lien" text="Libellé du lien" />
    </DsfrNavigationItem>
  </DsfrNavigation>`,
  imports,
});

// ─── Mobile / Items de niveau 1 - Accès rapide ───────────────────────────────
// Les accès rapides (connexion, langue…) ne font pas partie de `DsfrNavigation` : ils se
// déclarent sur `DsfrHeader` via `quick-links`, dupliqués automatiquement dans le menu
// mobile.
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__MOBILE_ITEMS_DE_NIVEAU_1_ACCES_RAPIDE>', {
  example: () =>
    html`<DsfrHeader
    :quick-links="[{ label: 'Se connecter', icon: 'fr-icon-lock-line', to: '/connexion' }]"
  >
    <template #mainnav>
      <DsfrNavigation :nav-items="[{ to: '/lien', text: 'Libellé du lien' }]" />
    </template>
  </DsfrHeader>`,
  imports,
});

// ─── Mobile / Navigation - Complète ──────────────────────────────────────────
figma.connect('<FIGMA_NAVIGATION_PRINCIPALE__MOBILE_NAVIGATION_COMPLETE>', {
  props: {
    quickLinks: figma.boolean('Accès rapides', {
      true: ` :quick-links="[{ label: 'Se connecter', icon: 'fr-icon-lock-line', to: '/connexion' }]"`,
      false: '',
    }),
  },
  example: ({ quickLinks }) =>
    html`<DsfrHeader home-to="/"${quickLinks}>
    <template #mainnav>
      <DsfrNavigation
        :nav-items="[
          { to: '/premier', text: 'Premier lien' },
          { to: '/deuxieme', text: 'Deuxième lien' },
          { to: '/troisieme', text: 'Troisième lien' }
        ]"
      />
    </template>
  </DsfrHeader>`,
  imports,
});
