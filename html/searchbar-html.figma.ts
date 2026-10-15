import figma, { html } from '@figma/code-connect/html';

// Barre de recherche DSFR : 1 set. Thème = CSS seul.
// « État Rempli / Défaut » n'est pas dérivable en dehors d'une valeur de démonstration
// non représentative → non bindé.

figma.connect('<FIGMA_BARRE_DE_RECHERCHE__BARRE_DE_RECHERCHE>', {
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
