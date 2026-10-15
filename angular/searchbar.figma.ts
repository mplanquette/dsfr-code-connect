import figma, { html } from '@figma/code-connect/html';

// Barre de recherche DSFR : 1 set. Thème = CSS seul.
// « État Rempli / Défaut » n'est pas dérivable en dehors d'une valeur de démonstration
// non représentative → non bindé.

figma.connect('<FIGMA_BARRE_DE_RECHERCHE__BARRE_DE_RECHERCHE>', {
  props: {
    large: figma.enum('Taille', { LG: ' [large]="true"', MD: '' }),
  },
  example: ({ large }) =>
    html`<dsfr-search-bar label="Rechercher"${large}></dsfr-search-bar>`,
  imports: ["import { DsfrSearchBarComponent } from '@edugouvfr/ngx-dsfr'"],
});
