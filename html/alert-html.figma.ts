import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement :
//   - État      → classe fr-alert--{type}
//   - Taille    → fr-alert--sm (SM) / vide (MD) ; SM supprime aussi le titre <h3>
//   - Fermeture → bouton fr-btn--close
// Thème (Clair/Sombre) et Support (Desktop/Mobile) = CSS/responsive uniquement → pas de binding.

const props = {
  typeClass: figma.enum('État', {
    Erreur: 'fr-alert--error',
    Information: 'fr-alert--info',
    Succès: 'fr-alert--success',
    Avertissement: 'fr-alert--warning',
  }),
  sizeClass: figma.enum('Taille', { MD: '', SM: ' fr-alert--sm' }),
  titleSection: figma.enum('Taille', {
    MD: '\n  <h3 class="fr-alert__title">Titre du message</h3>',
    SM: '',
  }),
  closeBtn: figma.boolean('Fermeture', {
    true: '\n  <button class="fr-btn--close fr-btn" title="Masquer le message" type="button">Masquer le message</button>',
    false: '',
  }),
};

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1935-224', {
  props,
  example: ({ typeClass, sizeClass, titleSection, closeBtn }) => html`<div role="alert" class="fr-alert ${typeClass}${sizeClass}">${titleSection}
  <p>Description de l'alerte</p>${closeBtn}
</div>`,
});
