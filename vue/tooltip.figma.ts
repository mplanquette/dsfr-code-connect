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
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359535', {
  example: () => html`<DsfrTooltip content="Message de l'infobulle">Information contextuelle</DsfrTooltip>`,
  imports,
});

// ─── Déclenchement au survol ─────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359572', {
  example: () => html`<DsfrTooltip content="Message de l'infobulle" on-hover>Libellé du lien</DsfrTooltip>`,
  imports,
});

// ─── Bulles ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359683', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<DsfrTooltip content="${message}">Information contextuelle</DsfrTooltip>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359945', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<DsfrTooltip content="${message}">Information contextuelle</DsfrTooltip>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359964', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<DsfrTooltip content="${message}">Information contextuelle</DsfrTooltip>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359983', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<DsfrTooltip content="${message}">Information contextuelle</DsfrTooltip>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-360002', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<DsfrTooltip content="${message}">Information contextuelle</DsfrTooltip>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-360021', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<DsfrTooltip content="${message}">Information contextuelle</DsfrTooltip>`,
  imports,
});
