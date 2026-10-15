import figma, { html } from '@figma/code-connect/html';

// Paramètre d'affichage DSFR : 1 set. Thème et Support = CSS seul/responsive
// (variantes internes au même set, pas de props dédiées) → snippet unique.

figma.connect('<FIGMA_PARAMETRE_D_AFFICHAGE__PARAMETRE_D_AFFICHAGE>', {
  example: () => html`<dsfr-display displayId="theme-modal"></dsfr-display>`,
  imports: ["import { DsfrDisplayComponent } from '@edugouvfr/ngx-dsfr'"],
});
