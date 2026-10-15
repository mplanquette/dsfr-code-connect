import figma, { html } from '@figma/code-connect/html';

// Retour en haut de page DSFR : 1 set.
// Survol, Cliqué, Focus et Désactivé = pseudo-états → snippet unique.

figma.connect('<FIGMA_RETOUR_EN_HAUT_DE_PAGE__>', {
  example: () =>
    html`<a class="fr-link fr-icon-arrow-up-fill fr-link--icon-left" href="#top">Haut de page</a>`,
});
