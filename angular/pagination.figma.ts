import figma, { html } from '@figma/code-connect/html';

// Pagination DSFR : 3 sets (Incrément, Numéro, Complète). Thème et Support = CSS seul.
// Survol = pseudo-état → ignoré.
// Les sets Incrément et Numéro sont des sous-éléments : ils n'ont pas de composant
// dédié dans ngx-dsfr, `dsfr-pagination` génère la barre entière à partir de
// `currentPage` et `pageCount`. Les snippets illustrent la position correspondante.

const imports = ["import { DsfrPaginationComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Incrément (précédent / suivant) ─────────────────────────────────────────
figma.connect('<FIGMA_PAGINATION__PAGINATION_INCREMENT>', {
  props: {
    // Sur la première page, « Précédente » et « Extrêmes » sont automatiquement désactivés.
    current: figma.enum('Sens', { Précédente: '1', Suivante: '1' }),
  },
  example: ({ current }) =>
    html`<dsfr-pagination
  [currentPage]="${current}"
  [pageCount]="10"
  ariaLabel="Pagination des résultats"></dsfr-pagination>`,
  imports,
});

// ─── Numéro ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_PAGINATION__PAGINATION_NUMERO>', {
  props: {
    current: figma.enum('État', { Défaut: '1', Courant: '3', Survol: '1' }),
  },
  example: ({ current }) =>
    html`<dsfr-pagination
  [currentPage]="${current}"
  [pageCount]="10"
  ariaLabel="Pagination des résultats"></dsfr-pagination>`,
  imports,
});

// ─── Complète ────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_PAGINATION__PAGINATION_COMPLETE>', {
  example: () =>
    html`<dsfr-pagination
  [currentPage]="1"
  [pageCount]="10"
  [totalElements]="200"
  [rowsPerPage]="20"
  ariaLabel="Pagination des résultats"></dsfr-pagination>`,
  imports,
});
