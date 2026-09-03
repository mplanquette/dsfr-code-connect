import figma, { html } from '@figma/code-connect/html';

// Menu latéral DSFR : 9 sets utiles. Le set « _🚫Éléments - Base » est un atome
// interne Figma → non connecté. Thème = CSS seul. Survol = pseudo-état → ignoré.
// Les rendus Mobile et Desktop sont le même composant (responsive) : les sets Mobile
// reçoivent le même snippet que leur équivalent Desktop.
// Les items n'ont pas de composant dédié : ils se déclarent dans l'objet `menu`
// (`DsfrMenu` → `items: DsfrMenuItem[]`, imbrication via `subItems`).

const imports = ["import { DsfrSidemenuComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Desktop / Menu latéral - Complet ────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-39098', {
  props: {
    position: figma.enum('Position', { Gauche: '', Droite: ' position="right"' }),
    title: figma.enum('Titre', { True: `title: 'Titre du menu',\n    `, False: '' }),
    items: figma.enum('Éléments', {
      'Liens directs': `{ label: 'Première entrée', routePath: '/premiere' },
      { label: 'Deuxième entrée', routePath: '/deuxieme' },
      { label: 'Troisième entrée', routePath: '/troisieme' }`,
      Dépliants: `{
        label: 'Première entrée',
        subItems: [
          { label: 'Sous-entrée 1', routePath: '/premiere/un' },
          { label: 'Sous-entrée 2', routePath: '/premiere/deux' }
        ]
      },
      { label: 'Deuxième entrée', routePath: '/deuxieme' }`,
    }),
  },
  example: ({ position, title, items }) =>
    html`<dsfr-sidemenu
  ariaLabel="Menu latéral"${position}
  [menu]="{
    ${title}items: [
      ${items}
    ]
  }"></dsfr-sidemenu>`,
  imports,
});

// ─── Desktop / Lien direct - Item ────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-37286', {
  props: {
    active: figma.enum('État', { Défaut: '', Survol: '', Courant: `, active: true` }),
  },
  example: ({ active }) =>
    html`<dsfr-sidemenu
  ariaLabel="Menu latéral"
  [menu]="{
    items: [
      { label: 'Libellé de l\\'entrée', routePath: '/entree'${active} }
    ]
  }"></dsfr-sidemenu>`,
  imports,
});

// ─── Desktop / Dépliant niveau 1 - Item ──────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-38131', {
  props: {
    active: figma.enum('État', { Défaut: '', Courant: `,\n        active: true` }),
  },
  example: ({ active }) =>
    html`<dsfr-sidemenu
  ariaLabel="Menu latéral"
  [menu]="{
    items: [
      {
        label: 'Libellé du dépliant'${active},
        subItems: [
          { label: 'Première sous-entrée', routePath: '/entree/un' },
          { label: 'Deuxième sous-entrée', routePath: '/entree/deux' }
        ]
      }
    ]
  }"></dsfr-sidemenu>`,
  imports,
});

// ─── Desktop / Dépliant niveau 2 - Item ──────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-47377', {
  props: {
    active: figma.enum('État', { Défaut: '', Courant: `,\n            active: true` }),
  },
  example: ({ active }) =>
    html`<dsfr-sidemenu
  ariaLabel="Menu latéral"
  [menu]="{
    items: [
      {
        label: 'Dépliant de niveau 1',
        subItems: [
          {
            label: 'Dépliant de niveau 2'${active},
            subItems: [
              { label: 'Première sous-entrée', routePath: '/entree/un/a' },
              { label: 'Deuxième sous-entrée', routePath: '/entree/un/b' }
            ]
          }
        ]
      }
    ]
  }"></dsfr-sidemenu>`,
  imports,
});

// ─── Mobile / Menu latéral - Complet - Fermé ─────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-39179', {
  example: () =>
    html`<dsfr-sidemenu
  ariaLabel="Menu latéral"
  [menu]="{
    title: 'Titre du menu',
    items: [
      { label: 'Première entrée', routePath: '/premiere' },
      { label: 'Deuxième entrée', routePath: '/deuxieme' }
    ]
  }"></dsfr-sidemenu>`,
  imports,
});

// ─── Mobile / Menu latéral - Complet - Ouvert ────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1166-4280', {
  props: {
    title: figma.enum('Titre', { True: `title: 'Titre du menu',\n    `, False: '' }),
    items: figma.enum('Éléments', {
      'Liens directs': `{ label: 'Première entrée', routePath: '/premiere' },
      { label: 'Deuxième entrée', routePath: '/deuxieme' }`,
      Dépliants: `{
        label: 'Première entrée',
        subItems: [
          { label: 'Sous-entrée 1', routePath: '/premiere/un' },
          { label: 'Sous-entrée 2', routePath: '/premiere/deux' }
        ]
      }`,
    }),
  },
  example: ({ title, items }) =>
    html`<dsfr-sidemenu
  ariaLabel="Menu latéral"
  [menu]="{
    ${title}items: [
      ${items}
    ]
  }"></dsfr-sidemenu>`,
  imports,
});

// ─── Mobile / Lien direct - Item ─────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1165-58748', {
  props: {
    active: figma.enum('Courant', { False: '', True: `, active: true` }),
  },
  example: ({ active }) =>
    html`<dsfr-sidemenu
  ariaLabel="Menu latéral"
  [menu]="{
    items: [
      { label: 'Libellé de l\\'entrée', routePath: '/entree'${active} }
    ]
  }"></dsfr-sidemenu>`,
  imports,
});

// ─── Mobile / Dépliant niveau 1 - Item ───────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1166-888', {
  props: {
    active: figma.enum('Courant', { False: '', True: `,\n        active: true` }),
  },
  example: ({ active }) =>
    html`<dsfr-sidemenu
  ariaLabel="Menu latéral"
  [menu]="{
    items: [
      {
        label: 'Libellé du dépliant'${active},
        subItems: [
          { label: 'Première sous-entrée', routePath: '/entree/un' },
          { label: 'Deuxième sous-entrée', routePath: '/entree/deux' }
        ]
      }
    ]
  }"></dsfr-sidemenu>`,
  imports,
});

// ─── Mobile / Dépliant niveau 2 - Item ───────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1166-1652', {
  props: {
    active: figma.enum('Courant', { False: '', True: `,\n            active: true` }),
  },
  example: ({ active }) =>
    html`<dsfr-sidemenu
  ariaLabel="Menu latéral"
  [menu]="{
    items: [
      {
        label: 'Dépliant de niveau 1',
        subItems: [
          {
            label: 'Dépliant de niveau 2'${active},
            subItems: [
              { label: 'Première sous-entrée', routePath: '/entree/un/a' },
              { label: 'Deuxième sous-entrée', routePath: '/entree/un/b' }
            ]
          }
        ]
      }
    ]
  }"></dsfr-sidemenu>`,
  imports,
});
