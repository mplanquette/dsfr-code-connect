import figma, { html } from '@figma/code-connect/html';

// Pagination DSFR : 3 sets (Incrément, Numéro, Complète). Thème et Support = CSS seul.
// Survol = pseudo-état → ignoré.
// DsfrPagination attend un tableau `pages` explicite (pas de `pageCount`/`totalElements`
// comme ngx-dsfr) et un `current-page` 0-indexé. Les sets Incrément et Numéro sont des
// sous-éléments sans composant dédié : le snippet illustre la pagination complète dans
// l'état correspondant, comme côté Angular. Le littéral `pages` est répété dans chaque
// `example` (pas de const externe : seules les props sont interpolables dans `html``).

const imports = ["import DsfrPagination from '@gouvminint/vue-dsfr/DsfrPagination.vue'"];

// ─── Incrément (précédent / suivant) ─────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=577-177', {
  props: {
    // Sur la première page (index 0), « Précédente » et « Extrêmes » sont désactivés.
    current: figma.enum('Sens', { Précédente: '0', Suivante: '0' }),
  },
  example: ({ current }) =>
    html`<DsfrPagination :pages="[
    { label: '1', title: 'Page 1' },
    { label: '2', title: 'Page 2' },
    { label: '3', title: 'Page 3' },
    { label: '4', title: 'Page 4' },
    { label: '5', title: 'Page 5' },
    { label: '6', title: 'Page 6' },
    { label: '7', title: 'Page 7' },
    { label: '8', title: 'Page 8' },
    { label: '9', title: 'Page 9' },
    { label: '10', title: 'Page 10' }
  ]" :current-page="${current}" aria-label="Pagination des résultats" />`,
  imports,
});

// ─── Numéro ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=577-349', {
  props: {
    current: figma.enum('État', { Défaut: '0', Courant: '2', Survol: '0' }),
  },
  example: ({ current }) =>
    html`<DsfrPagination :pages="[
    { label: '1', title: 'Page 1' },
    { label: '2', title: 'Page 2' },
    { label: '3', title: 'Page 3' },
    { label: '4', title: 'Page 4' },
    { label: '5', title: 'Page 5' },
    { label: '6', title: 'Page 6' },
    { label: '7', title: 'Page 7' },
    { label: '8', title: 'Page 8' },
    { label: '9', title: 'Page 9' },
    { label: '10', title: 'Page 10' }
  ]" :current-page="${current}" aria-label="Pagination des résultats" />`,
  imports,
});

// ─── Complète ────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=577-482', {
  example: () =>
    html`<DsfrPagination :pages="[
    { label: '1', title: 'Page 1' },
    { label: '2', title: 'Page 2' },
    { label: '3', title: 'Page 3' },
    { label: '4', title: 'Page 4' },
    { label: '5', title: 'Page 5' },
    { label: '6', title: 'Page 6' },
    { label: '7', title: 'Page 7' },
    { label: '8', title: 'Page 8' },
    { label: '9', title: 'Page 9' },
    { label: '10', title: 'Page 10' }
  ]" :current-page="0" aria-label="Pagination des résultats" />`,
  imports,
});
