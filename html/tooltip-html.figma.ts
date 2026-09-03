import figma, { html } from '@figma/code-connect/html';

// Infobulle DSFR : 8 sets (2 déclencheurs, 6 bulles). Thème = CSS seul.
// « État Initial / Active » est piloté au runtime par le JS du DSFR.
// « DIrection » et « Alignement » sont calculés automatiquement par le DSFR
// (classe fr-placement) : ils ne s'écrivent pas dans le markup, d'où le même snippet
// pour les 6 variantes de bulle.

// ─── Déclenchement au clic ───────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359535', {
  example: () =>
    html`<button type="button" class="fr-btn--tooltip fr-btn" aria-describedby="tooltip">Information contextuelle</button>
<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">Message de l'infobulle</span>`,
});

// ─── Déclenchement au survol ─────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359572', {
  example: () =>
    html`<a href="/page" id="tooltip-trigger" aria-describedby="tooltip">Libellé du lien</a>
<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">Message de l'infobulle</span>`,
});

// ─── Bulles ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359683', {
  props: { message: figma.string('Message') },
  example: ({ message }) =>
    html`<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">${message}</span>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359945', {
  props: { message: figma.string('Message') },
  example: ({ message }) =>
    html`<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">${message}</span>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359964', {
  props: { message: figma.string('Message') },
  example: ({ message }) =>
    html`<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">${message}</span>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359983', {
  props: { message: figma.string('Message') },
  example: ({ message }) =>
    html`<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">${message}</span>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-360002', {
  props: { message: figma.string('Message') },
  example: ({ message }) =>
    html`<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">${message}</span>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-360021', {
  props: { message: figma.string('Message') },
  example: ({ message }) =>
    html`<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">${message}</span>`,
});
