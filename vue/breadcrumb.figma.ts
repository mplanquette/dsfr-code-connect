import figma, { html } from '@figma/code-connect/html';

// Fil d'Ariane DSFR : 2 sets (Complet, Item). Thème = CSS seul → non bindé.
// « État Déployé / Condensé » est l'état de repli du composant, géré en interne par
// `DsfrBreadcrumb` (collapse DSFR) : non pilotable par une prop → snippet identique.
// DsfrBreadcrumb attend `links: { text, to }[]` ; un item sans `to` est rendu comme la
// page courante (dernier lien, sans lien cliquable, aria-current="page").

const imports = ["import DsfrBreadcrumb from '@gouvminint/vue-dsfr/DsfrBreadcrumb.vue'"];

// ─── Complet ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=139-115', {
  example: () =>
    html`<DsfrBreadcrumb :links="[
    { text: 'Accueil', to: '/' },
    { text: 'Rubrique', to: '/rubrique' },
    { text: 'Sous-rubrique', to: '/rubrique/sous-rubrique' },
    { text: 'Page courante' }
  ]" />`,
  imports,
});

// ─── Item ────────────────────────────────────────────────────────────────────
// Un item de fil d'Ariane n'a pas de composant dédié : il se déclare dans `links`.
// « Type En cours » = dernier item, sans lien (rendu sans `to`, aria-current="page").
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=139-77', {
  props: {
    item: figma.enum('Type', {
      Parent: `{ text: 'Rubrique', to: '/rubrique' }`,
      'En cours': `{ text: 'Page courante' }`,
    }),
  },
  example: ({ item }) => html`<DsfrBreadcrumb :links="[${item}]" />`,
  imports,
});
