import figma, { html } from '@figma/code-connect/html';

// Infobulle DSFR : 8 sets (2 déclencheurs, 6 bulles). Thème = CSS seul.
// « État Initial / Active » est piloté au runtime par le JS du DSFR → non bindable.
// « DIrection » et « Alignement » sont calculés automatiquement par le DSFR
// (classe fr-placement) : ils ne se déclarent pas dans le code, d'où le même snippet
// pour les 6 variantes de bulle.

// ─── Déclenchement au clic ───────────────────────────────────────────────────
// Bouton dédié portant l'infobulle.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359535', {
  example: () =>
    html`<dsfr-tooltip-button tooltip="Message de l'infobulle"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});

// ─── Déclenchement au survol ─────────────────────────────────────────────────
// Directive appliquée à l'élément déclencheur.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359572', {
  example: () => html`<a href="/page" tooltip="Message de l'infobulle">Libellé du lien</a>`,
  imports: ["import { DsfrTooltipDirective } from '@edugouvfr/ngx-dsfr'"],
});

// ─── Bulles ──────────────────────────────────────────────────────────────────
// Les 6 sets de bulle ne correspondent qu'à la position calculée : même code.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359683', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<dsfr-tooltip-button tooltip="${message}"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359945', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<dsfr-tooltip-button tooltip="${message}"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359964', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<dsfr-tooltip-button tooltip="${message}"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359983', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<dsfr-tooltip-button tooltip="${message}"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-360002', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<dsfr-tooltip-button tooltip="${message}"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-360021', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<dsfr-tooltip-button tooltip="${message}"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});
