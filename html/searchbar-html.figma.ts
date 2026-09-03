import figma, { html } from '@figma/code-connect/html';

// Barre de recherche DSFR : 1 set. Thème = CSS seul.
// « État Rempli / Défaut » n'est pas dérivable en dehors d'une valeur de démonstration
// non représentative → non bindé.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=92-1978', {
  props: {
    sizeClass: figma.enum('Taille', { LG: ' fr-search-bar--lg', MD: '' }),
  },
  example: ({ sizeClass }) =>
    html`<div class="fr-search-bar${sizeClass}" role="search">
  <label class="fr-label" for="search">Rechercher</label>
  <input class="fr-input" type="search" id="search" name="search" placeholder="Rechercher" />
  <button class="fr-btn" title="Rechercher">Rechercher</button>
</div>`,
});
