import figma, { html } from '@figma/code-connect/html';

// Retour en haut de page DSFR : 1 set, sans aucune input.
// Survol, Cliqué, Focus et Désactivé = pseudo-états → snippet unique.
// Contrairement à react-dsfr (pas de composant dédié, markup brut), vue-dsfr fournit un
// composant `DsfrBackToTop` (props `label`/`position`, non bindées ici car sans Figma prop
// correspondante) : on l'utilise plutôt que de reprendre le markup DSFR brut.

figma.connect('<FIGMA_RETOUR_EN_HAUT_DE_PAGE__>', {
  example: () => html`<DsfrBackToTop />`,
  imports: ["import DsfrBackToTop from '@gouvminint/vue-dsfr/DsfrBackToTop.vue'"],
});
