import figma, { html } from '@figma/code-connect/html';

// Mise en exergue DSFR : 1 set. Thème et Support = CSS seul.

figma.connect('<FIGMA_MISE_EN_EXERGUE__MISE_EN_EXERGUE>', {
  props: {
    sizeClass: figma.enum('Taille', { SM: ' fr-text--sm', MD: '', LG: ' fr-text--lg' }),
  },
  example: ({ sizeClass }) =>
    html`<div class="fr-highlight">
  <p class="${sizeClass}">Texte de la mise en exergue.</p>
</div>`,
});
