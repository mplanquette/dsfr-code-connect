import figma, { html } from '@figma/code-connect/html';

// Retour en haut de page DSFR : 1 set.
// Survol, Cliqué, Focus et Désactivé = pseudo-états → snippet unique.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16302-202695', {
  example: () =>
    html`<a class="fr-link fr-icon-arrow-up-fill fr-link--icon-left" href="#top">Haut de page</a>`,
});
