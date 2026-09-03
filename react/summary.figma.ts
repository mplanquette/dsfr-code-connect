import figma, { html } from '@figma/code-connect/html';

// Sommaire DSFR : 2 sets (Items, Complet). Thème et Support = CSS seul.
// Survol = pseudo-état → ignoré.
// react-dsfr utilise `links: { text, linkProps, subLinks? }[]` (pas `entries`/`anchor` comme
// ngx-dsfr) : les ancres passent par `linkProps.href`.
// Le tableau `links` est déclaré avant le JSX : la clé `text` répétée (lien + sous-lien, ou
// plusieurs liens) fait échouer le parser HTML générique avec « Duplicate attribute name »
// si elle reste inline sur plusieurs lignes dans l'attribut.

const imports = ["import { Summary } from '@codegouvfr/react-dsfr/Summary'"];

// ─── Items ───────────────────────────────────────────────────────────────────
// « Imbriqué » indique une entrée de second niveau, portée par `subLinks`.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=583-49320', {
  props: {
    nested: figma.boolean('Imbriqué', {
      true: `, subLinks: [{ text: 'Sous-titre', linkProps: { href: '#sous-titre' } }]`,
      false: '',
    }),
  },
  example: ({ nested }) =>
    html`const links = [
  { text: 'Titre de section', linkProps: { href: '#titre-de-section' }${nested} }
];

<Summary links={links} />`,
  imports,
});

// ─── Complet ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=583-49481', {
  example: () =>
    html`const links = [
  { text: 'Première section', linkProps: { href: '#premiere-section' } },
  {
    text: 'Deuxième section',
    linkProps: { href: '#deuxieme-section' },
    subLinks: [{ text: 'Sous-section', linkProps: { href: '#sous-section' } }]
  },
  { text: 'Troisième section', linkProps: { href: '#troisieme-section' } }
];

<Summary as="h2" links={links} />`,
  imports,
});
