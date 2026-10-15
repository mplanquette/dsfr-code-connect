import figma, { html } from '@figma/code-connect/html';

// Menu latéral DSFR : 9 sets utiles. Le set « _🚫Éléments - Base » est un atome
// interne Figma → non connecté. Thème = CSS seul. Survol = pseudo-état → ignoré.
// Les rendus Mobile et Desktop sont le même composant (responsive) : les sets Mobile
// reçoivent le même snippet que leur équivalent Desktop, sauf « Fermé »/« Ouvert » qui ne
// sont pas pilotables par une prop (l'état ouvert/fermé du fr-collapse est interne au
// composant) → non bindable, comme le repli du Fil d'Ariane.
// Les items n'ont pas de composant dédié : ils se déclarent dans `menu-items`
// (`{ text, to, active, menuItems }[]`, imbrication via `menuItems`).
// DsfrSideMenu n'a pas de prop `position` (contrairement à ngx-dsfr) : la classe
// `fr-sidemenu--right` se passe via le fallthrough de `class` (racine à nœud unique).

const imports = ["import DsfrSideMenu from '@gouvminint/vue-dsfr/DsfrSideMenu.vue'"];

// ─── Desktop / Menu latéral - Complet ────────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__DESKTOP_MENU_LATERAL_COMPLET>', {
  props: {
    position: figma.enum('Position', { Gauche: '', Droite: ' class="fr-sidemenu--right"' }),
    title: figma.enum('Titre', { True: ' heading-title="Titre du menu"', False: '' }),
    items: figma.enum('Éléments', {
      'Liens directs': `{ text: 'Première entrée', to: '/premiere' },
    { text: 'Deuxième entrée', to: '/deuxieme' },
    { text: 'Troisième entrée', to: '/troisieme' }`,
      Dépliants: `{
      text: 'Première entrée',
      menuItems: [
        { text: 'Sous-entrée 1', to: '/premiere/un' },
        { text: 'Sous-entrée 2', to: '/premiere/deux' }
      ]
    },
    { text: 'Deuxième entrée', to: '/deuxieme' }`,
    }),
  },
  example: ({ position, title, items }) =>
    html`<DsfrSideMenu id="sidemenu"${position}${title} :menu-items="[
    ${items}
  ]" />`,
  imports,
});

// ─── Desktop / Lien direct - Item ────────────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__DESKTOP_LIEN_DIRECT_ITEM>', {
  props: {
    active: figma.enum('État', { Défaut: '', Survol: '', Courant: `, active: true` }),
  },
  example: ({ active }) =>
    html`<DsfrSideMenu id="sidemenu" :menu-items="[
    { text: 'Libellé de l\\'entrée', to: '/entree'${active} }
  ]" />`,
  imports,
});

// ─── Desktop / Dépliant niveau 1 - Item ──────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__DESKTOP_DEPLIANT_NIVEAU_1_ITEM>', {
  props: {
    active: figma.enum('État', { Défaut: '', Courant: `, active: true` }),
  },
  example: ({ active }) =>
    html`<DsfrSideMenu id="sidemenu" :menu-items="[
    {
      text: 'Libellé du dépliant'${active},
      menuItems: [
        { text: 'Première sous-entrée', to: '/entree/un' },
        { text: 'Deuxième sous-entrée', to: '/entree/deux' }
      ]
    }
  ]" />`,
  imports,
});

// ─── Desktop / Dépliant niveau 2 - Item ──────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__DESKTOP_DEPLIANT_NIVEAU_2_ITEM>', {
  props: {
    active: figma.enum('État', { Défaut: '', Courant: `, active: true` }),
  },
  example: ({ active }) =>
    html`<DsfrSideMenu id="sidemenu" :menu-items="[
    {
      text: 'Dépliant de niveau 1',
      menuItems: [
        {
          text: 'Dépliant de niveau 2'${active},
          menuItems: [
            { text: 'Première sous-entrée', to: '/entree/un/a' },
            { text: 'Deuxième sous-entrée', to: '/entree/un/b' }
          ]
        }
      ]
    }
  ]" />`,
  imports,
});

// ─── Mobile / Menu latéral - Complet - Fermé ─────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__MOBILE_MENU_LATERAL_COMPLET_FERME>', {
  example: () =>
    html`<DsfrSideMenu id="sidemenu" heading-title="Titre du menu" :menu-items="[
    { text: 'Première entrée', to: '/premiere' },
    { text: 'Deuxième entrée', to: '/deuxieme' }
  ]" />`,
  imports,
});

// ─── Mobile / Menu latéral - Complet - Ouvert ────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__MOBILE_MENU_LATERAL_COMPLET_OUVERT>', {
  props: {
    title: figma.enum('Titre', { True: ' heading-title="Titre du menu"', False: '' }),
    items: figma.enum('Éléments', {
      'Liens directs': `{ text: 'Première entrée', to: '/premiere' },
    { text: 'Deuxième entrée', to: '/deuxieme' }`,
      Dépliants: `{
      text: 'Première entrée',
      menuItems: [
        { text: 'Sous-entrée 1', to: '/premiere/un' },
        { text: 'Sous-entrée 2', to: '/premiere/deux' }
      ]
    }`,
    }),
  },
  example: ({ title, items }) =>
    html`<DsfrSideMenu id="sidemenu"${title} :menu-items="[
    ${items}
  ]" />`,
  imports,
});

// ─── Mobile / Lien direct - Item ─────────────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__MOBILE_LIEN_DIRECT_ITEM>', {
  props: {
    active: figma.enum('Courant', { False: '', True: `, active: true` }),
  },
  example: ({ active }) =>
    html`<DsfrSideMenu id="sidemenu" :menu-items="[
    { text: 'Libellé de l\\'entrée', to: '/entree'${active} }
  ]" />`,
  imports,
});

// ─── Mobile / Dépliant niveau 1 - Item ───────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__MOBILE_DEPLIANT_NIVEAU_1_ITEM>', {
  props: {
    active: figma.enum('Courant', { False: '', True: `, active: true` }),
  },
  example: ({ active }) =>
    html`<DsfrSideMenu id="sidemenu" :menu-items="[
    {
      text: 'Libellé du dépliant'${active},
      menuItems: [
        { text: 'Première sous-entrée', to: '/entree/un' },
        { text: 'Deuxième sous-entrée', to: '/entree/deux' }
      ]
    }
  ]" />`,
  imports,
});

// ─── Mobile / Dépliant niveau 2 - Item ───────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__MOBILE_DEPLIANT_NIVEAU_2_ITEM>', {
  props: {
    active: figma.enum('Courant', { False: '', True: `, active: true` }),
  },
  example: ({ active }) =>
    html`<DsfrSideMenu id="sidemenu" :menu-items="[
    {
      text: 'Dépliant de niveau 1',
      menuItems: [
        {
          text: 'Dépliant de niveau 2'${active},
          menuItems: [
            { text: 'Première sous-entrée', to: '/entree/un/a' },
            { text: 'Deuxième sous-entrée', to: '/entree/un/b' }
          ]
        }
      ]
    }
  ]" />`,
  imports,
});
