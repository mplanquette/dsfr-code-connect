import figma, { html } from '@figma/code-connect/html';

// Mise en exergue DSFR : 1 set. Thème et Support = CSS seul.
// `DsfrHighlight` n'a que deux booléens `small`/`large` (pas de `textSize` à 3 valeurs) : MD =
// aucun des deux (ni small ni large).

figma.connect('<FIGMA_MISE_EN_EXERGUE__MISE_EN_EXERGUE>', {
  props: {
    size: figma.enum('Taille', { SM: ' small', MD: '', LG: ' large' }),
  },
  example: ({ size }) =>
    html`<DsfrHighlight text="Texte de la mise en exergue."${size} />`,
  imports: ["import DsfrHighlight from '@gouvminint/vue-dsfr/DsfrHighlight.vue'"],
});
