import figma, { html } from '@figma/code-connect/html';

// Menu latéral DSFR : 9 sets utiles. Le set « _🚫Éléments - Base » est un atome interne Figma
// → non connecté. Thème = CSS seul. Survol = pseudo-état → ignoré.
// Les rendus Mobile et Desktop sont le même composant (responsive) : les sets Mobile reçoivent
// le même snippet que leur équivalent Desktop.
// react-dsfr utilise `items: { text, linkProps?, items?, isActive?, expandedByDefault? }[]`
// (top-level, pas d'objet `menu` imbriqué comme ngx-dsfr) ; `burgerMenuButtonText` est requis.
// « Position » → prop `align` ("left" par défaut, omise ; "right" sinon).
// Dès qu'un item a des sous-entrées ou que plusieurs items se répètent, le tableau `items` est
// déclaré avant le JSX : la clé `text`/`linkProps`/`href` répétée fait échouer le parser HTML
// générique avec « Duplicate attribute name » si elle reste inline sur plusieurs lignes.

const imports = ["import { SideMenu } from '@codegouvfr/react-dsfr/SideMenu'"];

// ─── Desktop / Menu latéral - Complet ────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-39098', {
  props: {
    align: figma.enum('Position', { Gauche: '', Droite: ' align="right"' }),
    title: figma.enum('Titre', { True: ' title="Titre du menu"', False: '' }),
    items: figma.enum('Éléments', {
      'Liens directs': `{ text: 'Première entrée', linkProps: { href: '/premiere' } },
  { text: 'Deuxième entrée', linkProps: { href: '/deuxieme' } },
  { text: 'Troisième entrée', linkProps: { href: '/troisieme' } }`,
      Dépliants: `{
    text: 'Première entrée',
    items: [
      { text: 'Sous-entrée 1', linkProps: { href: '/premiere/un' } },
      { text: 'Sous-entrée 2', linkProps: { href: '/premiere/deux' } }
    ]
  },
  { text: 'Deuxième entrée', linkProps: { href: '/deuxieme' } }`,
    }),
  },
  example: ({ align, title, items }) =>
    html`const items = [
  ${items}
];

<SideMenu burgerMenuButtonText="Dans cette rubrique"${align}${title} items={items} />`,
  imports,
});

// ─── Desktop / Lien direct - Item ────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-37286', {
  props: {
    active: figma.enum('État', { Défaut: '', Survol: '', Courant: ', isActive: true' }),
  },
  example: ({ active }) =>
    html`<SideMenu
  burgerMenuButtonText="Dans cette rubrique"
  items={[{ text: "Libellé de l'entrée", linkProps: { href: '/entree' }${active} }]}
/>`,
  imports,
});

// ─── Desktop / Dépliant niveau 1 - Item ──────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-38131', {
  props: {
    expanded: figma.enum('Ouvert', { True: ', expandedByDefault: true', False: '' }),
    active: figma.enum('État', { Défaut: '', Courant: ', isActive: true' }),
  },
  example: ({ expanded, active }) =>
    html`const items = [
  {
    text: 'Libellé du dépliant'${active}${expanded},
    items: [
      { text: 'Première sous-entrée', linkProps: { href: '/entree/un' } },
      { text: 'Deuxième sous-entrée', linkProps: { href: '/entree/deux' } }
    ]
  }
];

<SideMenu burgerMenuButtonText="Dans cette rubrique" items={items} />`,
  imports,
});

// ─── Desktop / Dépliant niveau 2 - Item ──────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-47377', {
  props: {
    expanded: figma.enum('Ouvert', { True: ', expandedByDefault: true', False: '' }),
    active: figma.enum('État', { Défaut: '', Courant: ', isActive: true' }),
  },
  example: ({ expanded, active }) =>
    html`const items = [
  {
    text: 'Dépliant de niveau 1',
    items: [
      {
        text: 'Dépliant de niveau 2'${active}${expanded},
        items: [
          { text: 'Première sous-entrée', linkProps: { href: '/entree/un/a' } },
          { text: 'Deuxième sous-entrée', linkProps: { href: '/entree/un/b' } }
        ]
      }
    ]
  }
];

<SideMenu burgerMenuButtonText="Dans cette rubrique" items={items} />`,
  imports,
});

// ─── Mobile / Menu latéral - Complet - Fermé ─────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=452-39179', {
  example: () =>
    html`const items = [
  { text: 'Première entrée', linkProps: { href: '/premiere' } }
];

<SideMenu burgerMenuButtonText="Dans cette rubrique" title="Titre du menu" items={items} />`,
  imports,
});

// ─── Mobile / Menu latéral - Complet - Ouvert ────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1166-4280', {
  props: {
    title: figma.enum('Titre', { True: ' title="Titre du menu"', False: '' }),
    items: figma.enum('Éléments', {
      'Liens directs': `{ text: 'Première entrée', linkProps: { href: '/premiere' } },
  { text: 'Deuxième entrée', linkProps: { href: '/deuxieme' } }`,
      Dépliants: `{
    text: 'Première entrée',
    items: [
      { text: 'Sous-entrée 1', linkProps: { href: '/premiere/un' } },
      { text: 'Sous-entrée 2', linkProps: { href: '/premiere/deux' } }
    ]
  }`,
    }),
  },
  example: ({ title, items }) =>
    html`const items = [
  ${items}
];

<SideMenu burgerMenuButtonText="Dans cette rubrique"${title} items={items} />`,
  imports,
});

// ─── Mobile / Lien direct - Item ─────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1165-58748', {
  props: {
    active: figma.enum('Courant', { False: '', True: ', isActive: true' }),
  },
  example: ({ active }) =>
    html`<SideMenu
  burgerMenuButtonText="Dans cette rubrique"
  items={[{ text: "Libellé de l'entrée", linkProps: { href: '/entree' }${active} }]}
/>`,
  imports,
});

// ─── Mobile / Dépliant niveau 1 - Item ───────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1166-888', {
  props: {
    expanded: figma.enum('Ouvert', { True: ', expandedByDefault: true', False: '' }),
    active: figma.enum('Courant', { False: '', True: ', isActive: true' }),
  },
  example: ({ expanded, active }) =>
    html`const items = [
  {
    text: 'Libellé du dépliant'${active}${expanded},
    items: [
      { text: 'Première sous-entrée', linkProps: { href: '/entree/un' } },
      { text: 'Deuxième sous-entrée', linkProps: { href: '/entree/deux' } }
    ]
  }
];

<SideMenu burgerMenuButtonText="Dans cette rubrique" items={items} />`,
  imports,
});

// ─── Mobile / Dépliant niveau 2 - Item ───────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1166-1652', {
  props: {
    expanded: figma.enum('Ouvert', { True: ', expandedByDefault: true', False: '' }),
    active: figma.enum('Courant', { False: '', True: ', isActive: true' }),
  },
  example: ({ expanded, active }) =>
    html`const items = [
  {
    text: 'Dépliant de niveau 1',
    items: [
      {
        text: 'Dépliant de niveau 2'${active}${expanded},
        items: [
          { text: 'Première sous-entrée', linkProps: { href: '/entree/un/a' } },
          { text: 'Deuxième sous-entrée', linkProps: { href: '/entree/un/b' } }
        ]
      }
    ]
  }
];

<SideMenu burgerMenuButtonText="Dans cette rubrique" items={items} />`,
  imports,
});
