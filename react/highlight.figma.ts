import figma, { html } from '@figma/code-connect/html';

// Mise en exergue DSFR : 1 set. Thème et Support = CSS seul.
// react-dsfr `Highlight.size` = "sm" | "lg" (pas de valeur pour MD, qui est l'absence de prop).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=338-5363', {
  props: {
    size: figma.enum('Taille', { SM: ' size="sm"', MD: '', LG: ' size="lg"' }),
  },
  example: ({ size }) =>
    html`<Highlight bodyAs="p"${size}>Texte de la mise en exergue.</Highlight>`,
  imports: ["import { Highlight } from '@codegouvfr/react-dsfr/Highlight'"],
});
