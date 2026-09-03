import figma, { html } from '@figma/code-connect/html';

// Barre de recherche DSFR : 1 set. Thème = CSS seul.
// « État Rempli / Défaut » n'est pas dérivable en dehors d'une valeur de démonstration
// non représentative → non bindé.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=92-1978', {
  props: {
    large: figma.enum('Taille', { LG: ' [large]="true"', MD: '' }),
  },
  example: ({ large }) =>
    html`<dsfr-search-bar label="Rechercher"${large}></dsfr-search-bar>`,
  imports: ["import { DsfrSearchBarComponent } from '@edugouvfr/ngx-dsfr'"],
});
