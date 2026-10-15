import figma, { html } from '@figma/code-connect/html';

// Barre de recherche DSFR : 1 set, même mapping que angular/searchbar.figma.ts et
// html/searchbar-html.figma.ts. Thème = CSS seul.
// « État Rempli / Défaut » n'est pas dérivable en dehors d'une valeur de démonstration
// non représentative → non bindé.

figma.connect('<FIGMA_BARRE_DE_RECHERCHE__BARRE_DE_RECHERCHE>', {
  props: {
    large: figma.enum('Taille', { LG: ' big', MD: '' }),
  },
  example: ({ large }) =>
    html`<SearchBar label="Rechercher"${large} />`,
  imports: ["import { SearchBar } from '@codegouvfr/react-dsfr/SearchBar'"],
});
