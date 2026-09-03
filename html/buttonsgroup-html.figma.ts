import figma, { html } from '@figma/code-connect/html';

// Groupe de boutons DSFR : 2 sets (Non hiérarchisé, Hiérarchisé). Thème = CSS seul
// (variante interne) → non bindé.

// ─── Non hiérarchisé ─────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=571-49989', {
  props: {
    inlineClass: figma.enum('Orientation', { Horizontal: ' fr-btns-group--inline', Vertical: '' }),
    sizeClass: figma.enum('Taille', { SM: ' fr-btns-group--sm', MD: '', LG: ' fr-btns-group--lg' }),
  },
  example: ({ inlineClass, sizeClass }) =>
    html`<ul class="fr-btns-group${inlineClass}${sizeClass}">
  <li><button type="button" class="fr-btn fr-btn--secondary">Premier bouton</button></li>
  <li><button type="button" class="fr-btn fr-btn--secondary">Deuxième bouton</button></li>
</ul>`,
});

// ─── Hiérarchisé ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=571-49112', {
  props: {
    inlineClass: figma.enum('Orientation', { Horizontal: ' fr-btns-group--inline', Vertical: '' }),
    sizeClass: figma.enum('Taille', { SM: ' fr-btns-group--sm', MD: '', LG: ' fr-btns-group--lg' }),
    tertiary: figma.boolean('Bouton Tertiaire', {
      true: `\n  <li><button type="button" class="fr-btn fr-btn--tertiary">Troisième bouton</button></li>`,
      false: '',
    }),
  },
  example: ({ inlineClass, sizeClass, tertiary }) =>
    html`<ul class="fr-btns-group${inlineClass}${sizeClass}">
  <li><button type="button" class="fr-btn">Premier bouton</button></li>
  <li><button type="button" class="fr-btn fr-btn--secondary">Deuxième bouton</button></li>${tertiary}
</ul>`,
});
