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
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-39098', {
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
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-37286', {
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
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-38131', {
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
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-47377', {
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
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-39179', {
  example: () =>
    html`<DsfrSideMenu id="sidemenu" heading-title="Titre du menu" :menu-items="[
    { text: 'Première entrée', to: '/premiere' },
    { text: 'Deuxième entrée', to: '/deuxieme' }
  ]" />`,
  imports,
});

// ─── Mobile / Menu latéral - Complet - Ouvert ────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1166-4280', {
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
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1165-58748', {
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
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1166-888', {
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
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1166-1652', {
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
