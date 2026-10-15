import figma, { html } from '@figma/code-connect/html';

// Pagination DSFR : 3 sets (Incrément, Numéro, Complète). Thème et Support = CSS seul.
// Survol = pseudo-état → ignoré.
// Les sets Incrément et Numéro sont des sous-éléments sans composant dédié : `Pagination`
// génère la barre entière depuis `count`/`defaultPage`/`getPageLinkProps`. Les snippets illustrent
// la position correspondante (page 1 désactive automatiquement Précédente et Première page).

const imports = ["import { Pagination } from '@codegouvfr/react-dsfr/Pagination'"];

// ─── Incrément (précédent / suivant) ─────────────────────────────────────────
figma.connect('<FIGMA_PAGINATION__PAGINATION_INCREMENT>', {
  props: {
    current: figma.enum('Sens', { Précédente: '1', Suivante: '1' }),
  },
  example: ({ current }) =>
    html`<Pagination count={10} defaultPage={${current}} getPageLinkProps={(pageNumber) => ({ href: '/page/' + pageNumber })} />`,
  imports,
});

// ─── Numéro ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_PAGINATION__PAGINATION_NUMERO>', {
  props: {
    current: figma.enum('État', { Défaut: '1', Courant: '3', Survol: '1' }),
  },
  example: ({ current }) =>
    html`<Pagination count={10} defaultPage={${current}} getPageLinkProps={(pageNumber) => ({ href: '/page/' + pageNumber })} />`,
  imports,
});

// ─── Complète ────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_PAGINATION__PAGINATION_COMPLETE>', {
  example: () =>
    html`<Pagination count={10} defaultPage={1} getPageLinkProps={(pageNumber) => ({ href: '/page/' + pageNumber })} />`,
  imports,
});
