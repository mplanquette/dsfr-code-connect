import figma, { html } from '@figma/code-connect/html';

// Sommaire DSFR : 2 sets (Items, Complet). Thème et Support = CSS seul.
// Survol = pseudo-état → ignoré.
// DsfrSummary n'a pas d'équivalent de `subEntries` (contrairement à ngx-dsfr) : `anchors`
// est une liste plate `{ link, name }[]`. « Imbriqué » n'a donc aucun rendu différent côté
// vue-dsfr → non bindable, snippet identique (limitation du composant, pas simplification
// de notre part).

const imports = ["import DsfrSummary from '@gouvminint/vue-dsfr/DsfrSummary.vue'"];

// ─── Items ───────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=583-49320', {
  example: () =>
    html`<DsfrSummary title="Sommaire" :anchors="[
    { name: 'Titre de section', link: '#titre-de-section' }
  ]" />`,
  imports,
});

// ─── Complet ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=583-49481', {
  example: () =>
    html`<DsfrSummary title="Sommaire" :anchors="[
    { name: 'Première section', link: '#premiere-section' },
    { name: 'Deuxième section', link: '#deuxieme-section' },
    { name: 'Troisième section', link: '#troisieme-section' }
  ]" />`,
  imports,
});
