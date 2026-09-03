import figma, { html } from '@figma/code-connect/html';

// Mise en exergue DSFR : 1 set. Thème et Support = CSS seul.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=338-5363', {
  props: {
    size: figma.enum('Taille', { SM: ' textSize="SM"', MD: '', LG: ' textSize="LG"' }),
  },
  example: ({ size }) =>
    html`<dsfr-highlight text="Texte de la mise en exergue."${size}></dsfr-highlight>`,
  imports: ["import { DsfrHighlightComponent } from '@edugouvfr/ngx-dsfr'"],
});
