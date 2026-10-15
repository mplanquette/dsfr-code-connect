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
figma.connect('<FIGMA_CONTROLE_SEGMENTE__DESKTOP_CONTROLE_SEGMENTE>', {
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
figma.connect('<FIGMA_CONTROLE_SEGMENTE__MOBILE_CONTROLE_SEGMENTE>', {
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
figma.connect('<FIGMA_CONTROLE_SEGMENTE__MOBILE_CONTROLE_SEGMENTE_CAS_MAX>', {
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
