import figma, { html } from '@figma/code-connect/html';

// Groupe de boutons DSFR : 2 sets (Non hiérarchisé, Hiérarchisé). Thème = CSS seul
// (variante interne au même set) → non bindé.
// « Bouton Tertiaire » (Hiérarchisé) ajoute un 3ᵉ bouton de variante tertiaire.

const imports = [
  "import { DsfrButtonsGroupComponent, DsfrButtonComponent } from '@edugouvfr/ngx-dsfr'",
];

// ─── Non hiérarchisé ─────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=571-49989', {
  props: {
    inline: figma.enum('Orientation', { Horizontal: ' [inline]="\'always\'"', Vertical: '' }),
    size: figma.enum('Taille', { SM: '', MD: ' buttonGroupSize="MD"', LG: ' buttonGroupSize="LG"' }),
  },
  example: ({ inline, size }) =>
    html`<dsfr-buttons-group id="buttons-group"${inline}${size}>
  <dsfr-button label="Premier bouton" variant="secondary"></dsfr-button>
  <dsfr-button label="Deuxième bouton" variant="secondary"></dsfr-button>
</dsfr-buttons-group>`,
  imports,
});

// ─── Hiérarchisé ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=571-49112', {
  props: {
    inline: figma.enum('Orientation', { Horizontal: ' [inline]="\'always\'"', Vertical: '' }),
    size: figma.enum('Taille', { SM: '', MD: ' buttonGroupSize="MD"', LG: ' buttonGroupSize="LG"' }),
    tertiary: figma.boolean('Bouton Tertiaire', {
      true: `\n  <dsfr-button label="Troisième bouton" variant="tertiary"></dsfr-button>`,
      false: '',
    }),
  },
  example: ({ inline, size, tertiary }) =>
    html`<dsfr-buttons-group id="buttons-group"${inline}${size}>
  <dsfr-button label="Premier bouton"></dsfr-button>
  <dsfr-button label="Deuxième bouton" variant="secondary"></dsfr-button>${tertiary}
</dsfr-buttons-group>`,
  imports,
});
