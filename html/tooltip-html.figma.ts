import figma, { html } from '@figma/code-connect/html';

// Infobulle DSFR : 8 sets (2 déclencheurs, 6 bulles). Thème = CSS seul.
// « État Initial / Active » est piloté au runtime par le JS du DSFR.
// « DIrection » et « Alignement » sont calculés automatiquement par le DSFR
// (classe fr-placement) : ils ne s'écrivent pas dans le markup, d'où le même snippet
// pour les 6 variantes de bulle.

// ─── Déclenchement au clic ───────────────────────────────────────────────────
figma.connect('<FIGMA_INFOBULLE__DECLENCHEMENT_AU_CLICK>', {
  example: () =>
    html`<button type="button" class="fr-btn--tooltip fr-btn" aria-describedby="tooltip">Information contextuelle</button>
<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">Message de l'infobulle</span>`,
});

// ─── Déclenchement au survol ─────────────────────────────────────────────────
figma.connect('<FIGMA_INFOBULLE__DECLENCHEMENT_AU_SURVOL>', {
  example: () =>
    html`<a href="/page" id="tooltip-trigger" aria-describedby="tooltip">Libellé du lien</a>
<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">Message de l'infobulle</span>`,
});

// ─── Bulles ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_HAUT_ALIGNEE_AU_CENTRE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) =>
    html`<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">${message}</span>`,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_BAS_ALIGNEE_AU_CENTRE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) =>
    html`<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">${message}</span>`,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_BAS_ALIGNEE_A_DROITE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) =>
    html`<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">${message}</span>`,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_BAS_ALIGNEE_A_GAUCHE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) =>
    html`<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">${message}</span>`,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_HAUT_ALIGNEE_A_GAUCHE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) =>
    html`<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">${message}</span>`,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_HAUT_ALIGNEE_A_DROITE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) =>
    html`<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">${message}</span>`,
});
