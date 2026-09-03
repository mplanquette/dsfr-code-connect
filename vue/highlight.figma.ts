import figma, { html } from '@figma/code-connect/html';

// Mise en exergue DSFR : 1 set. Thème et Support = CSS seul.
// `DsfrHighlight` n'a que deux booléens `small`/`large` (pas de `textSize` à 3 valeurs) : MD =
// aucun des deux (ni small ni large).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=338-5363', {
  props: {
    size: figma.enum('Taille', { SM: ' small', MD: '', LG: ' large' }),
  },
  example: ({ size }) =>
    html`<DsfrHighlight text="Texte de la mise en exergue."${size} />`,
  imports: ["import DsfrHighlight from '@gouvminint/vue-dsfr/DsfrHighlight.vue'"],
});
