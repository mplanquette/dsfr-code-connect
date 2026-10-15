import figma, { html } from '@figma/code-connect/html';

// Barre de recherche DSFR : 1 set. Thème = CSS seul.
// « État Rempli / Défaut » n'est pas dérivable en dehors d'une valeur de démonstration
// non représentative → non bindé.

figma.connect('<FIGMA_BARRE_DE_RECHERCHE__BARRE_DE_RECHERCHE>', {
  props: {
    large: figma.enum('Taille', { LG: ' large', MD: '' }),
  },
  example: ({ large }) =>
    html`<DsfrSearchBar label="Rechercher"${large} />`,
  imports: ["import DsfrSearchBar from '@gouvminint/vue-dsfr/DsfrSearchBar.vue'"],
});
