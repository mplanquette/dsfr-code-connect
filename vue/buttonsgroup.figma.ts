import figma, { html } from '@figma/code-connect/html';

// Groupe de boutons DSFR : 2 sets (Non hiérarchisé, Hiérarchisé). Thème = CSS seul
// (variante interne au même set) → non bindé.
// « Bouton Tertiaire » (Hiérarchisé) ajoute un 3ᵉ bouton de variante tertiaire.
// `DsfrButtonGroup` (vue-dsfr) : composant dédié (`src/components/DsfrButton/DsfrButtonGroup.vue`),
// utilisé ici avec des `<DsfrButton>` en slot par défaut, comme dans `angular/`/`html/`.

const imports = [
  "import DsfrButtonGroup from '@gouvminint/vue-dsfr/DsfrButtonGroup.vue'",
  "import DsfrButton from '@gouvminint/vue-dsfr/DsfrButton.vue'",
];

// ─── Non hiérarchisé ─────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=571-49989', {
  props: {
    inline: figma.enum('Orientation', { Horizontal: ' inline-layout-when="always"', Vertical: '' }),
    size: figma.enum('Taille', { SM: ' size="sm"', MD: '', LG: ' size="lg"' }),
  },
  example: ({ inline, size }) =>
    html`<DsfrButtonGroup id="buttons-group"${inline}${size}>
  <DsfrButton label="Premier bouton" secondary />
  <DsfrButton label="Deuxième bouton" secondary />
</DsfrButtonGroup>`,
  imports,
});

// ─── Hiérarchisé ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=571-49112', {
  props: {
    inline: figma.enum('Orientation', { Horizontal: ' inline-layout-when="always"', Vertical: '' }),
    size: figma.enum('Taille', { SM: ' size="sm"', MD: '', LG: ' size="lg"' }),
    tertiary: figma.boolean('Bouton Tertiaire', {
      true: `\n  <DsfrButton label="Troisième bouton" tertiary />`,
      false: '',
    }),
  },
  example: ({ inline, size, tertiary }) =>
    html`<DsfrButtonGroup id="buttons-group"${inline}${size}>
  <DsfrButton label="Premier bouton" />
  <DsfrButton label="Deuxième bouton" secondary />${tertiary}
</DsfrButtonGroup>`,
  imports,
});
