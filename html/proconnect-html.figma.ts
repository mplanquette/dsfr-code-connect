import figma, { html } from '@figma/code-connect/html';

// Bouton ProConnect DSFR : nouveau en 1.15.0. 1 set utile. Les composants
// « _🚫Éléments » sont des atomes internes → non connectés. Thème = CSS seul
// (variante interne). Focus, Survol, Cliqué, Désactivé = pseudo-états → ignorés.

figma.connect('<FIGMA_BOUTON_PROCONNECT__BOUTON_PROCONNECT>', {
  example: () =>
    html`<div class="fr-connect-group">
  <button type="button" class="fr-connect fr-connect--proconnect">
    <span class="fr-connect__login">S'identifier avec</span>
    <span class="fr-connect__brand">ProConnect</span>
  </button>
  <p>
    <a href="https://www.proconnect.gouv.fr/" target="_blank" rel="noopener">Qu'est-ce que ProConnect ?</a>
  </p>
</div>`,
});
