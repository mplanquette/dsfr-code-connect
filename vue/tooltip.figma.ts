import figma, { html } from '@figma/code-connect/html';

// Infobulle DSFR : 8 sets (2 déclencheurs, 6 bulles). Thème = CSS seul.
// « État Initial / Active » est piloté au runtime par le composant → non bindable.
// « Direction » et « Alignement » sont calculés automatiquement (classe fr-placement) :
// ils ne se déclarent pas dans le code, d'où le même snippet pour les 6 variantes de bulle.
// DsfrTooltip est un composant unique qui enveloppe son déclencheur (slot par défaut) et sa
// bulle (`content`) : `onHover` bascule entre déclenchement au clic (bouton, par défaut) et
// au survol (lien). Les 6 sets de bulle réutilisent ce même composant en variant `content`,
// comme côté Angular avec `dsfr-tooltip-button`.

const imports = ["import DsfrTooltip from '@gouvminint/vue-dsfr/DsfrTooltip.vue'"];

// ─── Déclenchement au clic ───────────────────────────────────────────────────
figma.connect('<FIGMA_INFOBULLE__DECLENCHEMENT_AU_CLICK>', {
  example: () => html`<DsfrTooltip content="Message de l'infobulle">Information contextuelle</DsfrTooltip>`,
  imports,
});

// ─── Déclenchement au survol ─────────────────────────────────────────────────
figma.connect('<FIGMA_INFOBULLE__DECLENCHEMENT_AU_SURVOL>', {
  example: () => html`<DsfrTooltip content="Message de l'infobulle" on-hover>Libellé du lien</DsfrTooltip>`,
  imports,
});

// ─── Bulles ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_HAUT_ALIGNEE_AU_CENTRE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<DsfrTooltip content="${message}">Information contextuelle</DsfrTooltip>`,
  imports,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_BAS_ALIGNEE_AU_CENTRE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<DsfrTooltip content="${message}">Information contextuelle</DsfrTooltip>`,
  imports,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_BAS_ALIGNEE_A_DROITE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<DsfrTooltip content="${message}">Information contextuelle</DsfrTooltip>`,
  imports,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_BAS_ALIGNEE_A_GAUCHE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<DsfrTooltip content="${message}">Information contextuelle</DsfrTooltip>`,
  imports,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_HAUT_ALIGNEE_A_GAUCHE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<DsfrTooltip content="${message}">Information contextuelle</DsfrTooltip>`,
  imports,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_HAUT_ALIGNEE_A_DROITE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<DsfrTooltip content="${message}">Information contextuelle</DsfrTooltip>`,
  imports,
});
