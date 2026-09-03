import figma, { html } from '@figma/code-connect/html';

// Bandeau d'information importante DSFR : 1 set. Thème et Support = CSS seul.
// « Type » est redondant avec « Niveau d'alerte », qui porte seul la classe modificatrice.
// « Voir le lien » n'est pas bindé : le lien s'ajoute dans le fr-notice__body.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=11706-73752', {
  props: {
    heading: figma.string('Titre'),
    description: figma.string('Description'),
    showDescription: figma.boolean('Voir description', { true: 'show', false: '' }),
    noIconClass: figma.boolean('Voir icône', { true: '', false: ' fr-notice--no-icon' }),
    typeClass: figma.enum("Niveau d'alerte", {
      Information: ' fr-notice--info',
      Alerte: ' fr-notice--alert',
      Avertissement: ' fr-notice--warning',
      'Vigilance orange': ' fr-notice--weather-orange',
      'Vigilance rouge': ' fr-notice--weather-red',
      'Vigilance violette': ' fr-notice--weather-purple',
      'Appel à témoins': ' fr-notice--witness',
      'Alerte technologique': ' fr-notice--cyberattack',
      'Alerte attentat': ' fr-notice--attack',
    }),
  },
  example: ({ heading, description, noIconClass, typeClass }) =>
    html`<div class="fr-notice${typeClass}${noIconClass}">
  <div class="fr-container">
    <div class="fr-notice__body">
      <p>
        <span class="fr-notice__title">${heading}</span>
        <span class="fr-notice__desc">${description}</span>
      </p>
      <button type="button" class="fr-btn--close fr-btn" title="Masquer le message">Masquer le message</button>
    </div>
  </div>
</div>`,
});
