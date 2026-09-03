import figma, { html } from '@figma/code-connect/html';

// Contrôle segmenté DSFR : 3 sets utiles, thème clair uniquement. Desktop et Mobile
// sont le même composant responsive → même snippet. Les composants préfixés « ⚙️ »
// (Élément, Desktop & Mobile, Mobile cas max) sont des atomes internes → non connectés.
// Thème sombre = CSS seul. Focus, Survol, Cliqué = pseudo-états → ignorés.
// react-dsfr `SegmentedControl` sélectionne un segment via `nativeInputProps={{ defaultChecked: true }}`
// (pas de prop `checked` de haut niveau comme `dsfr-segmented-control`). « Légende » horizontale
// → `inlineLegend`.

const imports = ["import { SegmentedControl } from '@codegouvfr/react-dsfr/SegmentedControl'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=25102-225135', {
  props: {
    inline: figma.enum('Légende', { Horizontale: ' inlineLegend', 'Au dessus': '' }),
  },
  example: ({ inline }) =>
    html`const segments = [
  { label: 'Première option', nativeInputProps: { defaultChecked: true } },
  { label: 'Deuxième option' },
  { label: 'Troisième option' }
];

<SegmentedControl
  legend="Légende du contrôle"${inline}
  segments={segments}
/>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=25126-368426', {
  props: {
    inline: figma.enum('Légende', { Horizontale: ' inlineLegend', 'Au dessus': '' }),
  },
  example: ({ inline }) =>
    html`const segments = [
  { label: 'Première option', nativeInputProps: { defaultChecked: true } },
  { label: 'Deuxième option' },
  { label: 'Troisième option' }
];

<SegmentedControl
  legend="Légende du contrôle"${inline}
  segments={segments}
/>`,
  imports,
});

// ─── Cas max (Mobile) ────────────────────────────────────────────────────────
// Illustre le comportement du composant avec un nombre élevé de segments à libellés longs.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=24757-5456', {
  example: () =>
    html`const segments = [
  { label: 'Première option avec un libellé long' },
  { label: 'Deuxième option avec un libellé long' },
  { label: 'Troisième option avec un libellé long' }
];

<SegmentedControl
  legend="Légende du contrôle"
  segments={segments}
/>`,
  imports,
});
