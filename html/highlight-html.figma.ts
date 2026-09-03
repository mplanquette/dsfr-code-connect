import figma, { html } from '@figma/code-connect/html';

// Mise en exergue DSFR : 1 set. Thème et Support = CSS seul.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=338-5363', {
  props: {
    sizeClass: figma.enum('Taille', { SM: ' fr-text--sm', MD: '', LG: ' fr-text--lg' }),
  },
  example: ({ sizeClass }) =>
    html`<div class="fr-highlight">
  <p class="${sizeClass}">Texte de la mise en exergue.</p>
</div>`,
});
