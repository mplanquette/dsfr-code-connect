import figma, { html } from '@figma/code-connect/html';

// Barre de recherche DSFR : 1 set, même mapping que angular/searchbar.figma.ts et
// html/searchbar-html.figma.ts. Thème = CSS seul.
// « État Rempli / Défaut » n'est pas dérivable en dehors d'une valeur de démonstration
// non représentative → non bindé.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=92-1978', {
  props: {
    large: figma.enum('Taille', { LG: ' big', MD: '' }),
  },
  example: ({ large }) =>
    html`<SearchBar label="Rechercher"${large} />`,
  imports: ["import { SearchBar } from '@codegouvfr/react-dsfr/SearchBar'"],
});
