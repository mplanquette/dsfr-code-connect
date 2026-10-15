import figma, { html } from '@figma/code-connect/html';

// Sommaire DSFR : 2 sets (Items, Complet). Thème et Support = CSS seul.
// Survol = pseudo-état → ignoré.
// DsfrSummary n'a pas d'équivalent de `subEntries` (contrairement à ngx-dsfr) : `anchors`
// est une liste plate `{ link, name }[]`. « Imbriqué » n'a donc aucun rendu différent côté
// vue-dsfr → non bindable, snippet identique (limitation du composant, pas simplification
// de notre part).

const imports = ["import DsfrSummary from '@gouvminint/vue-dsfr/DsfrSummary.vue'"];

// ─── Items ───────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_SOMMAIRE__SOMMAIRE_ITEMS>', {
  example: () =>
    html`<DsfrSummary title="Sommaire" :anchors="[
    { name: 'Titre de section', link: '#titre-de-section' }
  ]" />`,
  imports,
});

// ─── Complet ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_SOMMAIRE__SOMMAIRE_COMPLET>', {
  example: () =>
    html`<DsfrSummary title="Sommaire" :anchors="[
    { name: 'Première section', link: '#premiere-section' },
    { name: 'Deuxième section', link: '#deuxieme-section' },
    { name: 'Troisième section', link: '#troisieme-section' }
  ]" />`,
  imports,
});
