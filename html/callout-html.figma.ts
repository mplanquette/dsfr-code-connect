import figma, { html } from '@figma/code-connect/html';

// Mise en avant DSFR : 1 set. Les deux composants « _🚫Éléments - Base » sont des
// atomes internes Figma → non connectés. Thème et Support = CSS seul.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-information-line.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=338-7145', {
  props: {
    iconClass: figma.enum('Icône', { True: ' fr-icon-information-line', False: '' }),
    button: figma.enum('Bouton', {
      True: `\n  <button type="button" class="fr-btn">Libellé du bouton</button>`,
      False: '',
    }),
  },
  example: ({ iconClass, button }) =>
    html`<div class="fr-callout${iconClass}">
  <h3 class="fr-callout__title">Titre de la mise en avant</h3>
  <p class="fr-callout__text">Texte de la mise en avant.</p>${button}
</div>`,
});
