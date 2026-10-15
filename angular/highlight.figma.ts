import figma, { html } from '@figma/code-connect/html';

// Mise en exergue DSFR : 1 set. Thème et Support = CSS seul.

figma.connect('<FIGMA_MISE_EN_EXERGUE__MISE_EN_EXERGUE>', {
  props: {
    size: figma.enum('Taille', { SM: ' textSize="SM"', MD: '', LG: ' textSize="LG"' }),
  },
  example: ({ size }) =>
    html`<dsfr-highlight text="Texte de la mise en exergue."${size}></dsfr-highlight>`,
  imports: ["import { DsfrHighlightComponent } from '@edugouvfr/ngx-dsfr'"],
});
