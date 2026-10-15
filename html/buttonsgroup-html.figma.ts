import figma, { html } from '@figma/code-connect/html';

// Groupe de boutons DSFR : 2 sets (Non hiérarchisé, Hiérarchisé). Thème = CSS seul
// (variante interne) → non bindé.

// ─── Non hiérarchisé ─────────────────────────────────────────────────────────
figma.connect('<FIGMA_GROUPE_DE_BOUTONS__GROUPE_DE_BOUTONS_NON_HIERARCHISE>', {
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
figma.connect('<FIGMA_GROUPE_DE_BOUTONS__GROUPE_DE_BOUTONS_HIERARCHISE>', {
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
