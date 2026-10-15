import figma, { html } from '@figma/code-connect/html';

// Infobulle DSFR : 8 sets (2 déclencheurs, 6 bulles). Thème = CSS seul.
// « État Initial / Active » est piloté au runtime par le JS du DSFR → non bindable.
// « DIrection » et « Alignement » sont calculés automatiquement par le DSFR
// (classe fr-placement) : ils ne se déclarent pas dans le code, d'où le même snippet
// pour les 6 variantes de bulle.

// ─── Déclenchement au clic ───────────────────────────────────────────────────
// Bouton dédié portant l'infobulle.
figma.connect('<FIGMA_INFOBULLE__DECLENCHEMENT_AU_CLICK>', {
  example: () =>
    html`<dsfr-tooltip-button tooltip="Message de l'infobulle"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});

// ─── Déclenchement au survol ─────────────────────────────────────────────────
// Directive appliquée à l'élément déclencheur.
figma.connect('<FIGMA_INFOBULLE__DECLENCHEMENT_AU_SURVOL>', {
  example: () => html`<a href="/page" tooltip="Message de l'infobulle">Libellé du lien</a>`,
  imports: ["import { DsfrTooltipDirective } from '@edugouvfr/ngx-dsfr'"],
});

// ─── Bulles ──────────────────────────────────────────────────────────────────
// Les 6 sets de bulle ne correspondent qu'à la position calculée : même code.
figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_HAUT_ALIGNEE_AU_CENTRE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<dsfr-tooltip-button tooltip="${message}"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_BAS_ALIGNEE_AU_CENTRE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<dsfr-tooltip-button tooltip="${message}"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_BAS_ALIGNEE_A_DROITE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<dsfr-tooltip-button tooltip="${message}"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_BAS_ALIGNEE_A_GAUCHE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<dsfr-tooltip-button tooltip="${message}"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_HAUT_ALIGNEE_A_GAUCHE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<dsfr-tooltip-button tooltip="${message}"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_HAUT_ALIGNEE_A_DROITE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<dsfr-tooltip-button tooltip="${message}"></dsfr-tooltip-button>`,
  imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});
