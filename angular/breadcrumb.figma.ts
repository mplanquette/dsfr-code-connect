import figma, { html } from '@figma/code-connect/html';

// Fil d'Ariane DSFR : 2 sets (Complet, Item). Thème = CSS seul → non bindé.
// « État Déployé / Condensé » est l'état de repli du composant, géré en interne par
// `dsfr-breadcrumb` (collapse DSFR) : non pilotable par une input → snippet identique.

const imports = ["import { DsfrBreadcrumbComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Complet ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_FIL_D_ARIANE__FIL_D_ARIANE_COMPLET>', {
  example: () =>
    html`<dsfr-breadcrumb
  [items]="[
    { label: 'Accueil', routePath: '/' },
    { label: 'Rubrique', routePath: '/rubrique' },
    { label: 'Sous-rubrique', routePath: '/rubrique/sous-rubrique' },
    { label: 'Page courante' }
  ]"></dsfr-breadcrumb>`,
  imports,
});

// ─── Item ────────────────────────────────────────────────────────────────────
// Un item de fil d'Ariane n'a pas de composant dédié : il se déclare dans `items`.
// « Type En cours » = dernier item, sans lien (rendu en <a aria-current="page">).
figma.connect('<FIGMA_FIL_D_ARIANE__FIL_D_ARIANE_ITEM>', {
  props: {
    item: figma.enum('Type', {
      Parent: `{ label: 'Rubrique', routePath: '/rubrique' }`,
      'En cours': `{ label: 'Page courante' }`,
    }),
  },
  example: ({ item }) => html`<dsfr-breadcrumb [items]="[${item}]"></dsfr-breadcrumb>`,
  imports,
});
