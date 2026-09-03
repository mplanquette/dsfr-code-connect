import figma, { html } from '@figma/code-connect/html';

// Paramètre d'affichage DSFR : 1 set. Thème et Support = CSS seul/responsive
// (variantes internes au même set, pas de props dédiées) → snippet unique.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=583-50596', {
  example: () => html`<dsfr-display displayId="theme-modal"></dsfr-display>`,
  imports: ["import { DsfrDisplayComponent } from '@edugouvfr/ngx-dsfr'"],
});
