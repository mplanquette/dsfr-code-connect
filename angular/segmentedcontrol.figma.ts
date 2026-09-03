import figma, { html } from '@figma/code-connect/html';

// Contrôle segmenté DSFR : 3 sets utiles, thème clair uniquement. Desktop et Mobile
// sont le même composant responsive → même snippet. Les composants préfixés « ⚙️ »
// (Élément, Desktop & Mobile, Mobile cas max) sont des atomes internes → non connectés.
// Thème sombre = CSS seul. Focus, Survol, Cliqué = pseudo-états → ignorés.

const imports = ["import { DsfrSegmentedControlComponent } from '@edugouvfr/ngx-dsfr'"];

const segments = `[
    { value: 'option-1', label: 'Première option', checked: true },
    { value: 'option-2', label: 'Deuxième option' },
    { value: 'option-3', label: 'Troisième option' }
  ]`;

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=25102-225135', {
  props: {
    inline: figma.enum('Légende', { Horizontale: ' [inline]="true"', 'Au dessus': '' }),
  },
  example: ({ inline }) =>
    html`<dsfr-segmented-control
  legend="Légende du contrôle"
  [segments]="[
    { value: 'option-1', label: 'Première option', checked: true },
    { value: 'option-2', label: 'Deuxième option' },
    { value: 'option-3', label: 'Troisième option' }
  ]"${inline}></dsfr-segmented-control>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=25126-368426', {
  props: {
    inline: figma.enum('Légende', { Horizontale: ' [inline]="true"', 'Au dessus': '' }),
  },
  example: ({ inline }) =>
    html`<dsfr-segmented-control
  legend="Légende du contrôle"
  [segments]="[
    { value: 'option-1', label: 'Première option', checked: true },
    { value: 'option-2', label: 'Deuxième option' },
    { value: 'option-3', label: 'Troisième option' }
  ]"${inline}></dsfr-segmented-control>`,
  imports,
});

// ─── Cas max (Mobile) ────────────────────────────────────────────────────────
// Illustre le comportement du composant avec un nombre élevé de segments à libellés longs.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=24757-5456', {
  example: () =>
    html`<dsfr-segmented-control
  legend="Légende du contrôle"
  [segments]="[
    { value: 'option-1', label: 'Première option avec un libellé long' },
    { value: 'option-2', label: 'Deuxième option avec un libellé long' },
    { value: 'option-3', label: 'Troisième option avec un libellé long' }
  ]"></dsfr-segmented-control>`,
  imports,
});
