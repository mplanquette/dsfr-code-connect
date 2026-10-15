import figma, { html } from '@figma/code-connect/html';

// Retour en haut de page DSFR : 1 set, sans aucune input.
// Survol, Cliqué, Focus et Désactivé = pseudo-états → snippet unique.

figma.connect('<FIGMA_RETOUR_EN_HAUT_DE_PAGE__>', {
  example: () => html`<dsfr-backtotop></dsfr-backtotop>`,
  imports: ["import { DsfrBackToTopComponent } from '@edugouvfr/ngx-dsfr'"],
});
