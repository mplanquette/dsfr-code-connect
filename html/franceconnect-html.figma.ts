import figma, { html } from '@figma/code-connect/html';

// Bouton FranceConnect DSFR : 1 set. Les composants « _🚫Éléments » sont des atomes
// internes → non connectés. Thème = CSS seul (variante interne). Focus, Survol,
// Cliqué, Désactivé = pseudo-états/non représentés dans le markup → ignorés.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=11985-75836', {
  props: {
    connectClass: figma.boolean('Plus', { true: ' fr-connect--plus', false: '' }),
    linkHref: figma.boolean('Plus', {
      true: 'https://franceconnect.gouv.fr/france-connect-plus',
      false: 'https://franceconnect.gouv.fr/',
    }),
    plusLabel: figma.boolean('Plus', { true: '+', false: '' }),
  },
  example: ({ connectClass, linkHref, plusLabel }) =>
    html`<div class="fr-connect-group">
  <button type="button" class="fr-connect${connectClass}">
    <span class="fr-connect__login">S'identifier avec</span>
    <span class="fr-connect__brand">FranceConnect</span>
  </button>
  <p>
    <a href="${linkHref}" target="_blank" rel="noopener">Qu'est-ce que FranceConnect${plusLabel} ?</a>
  </p>
</div>`,
});
