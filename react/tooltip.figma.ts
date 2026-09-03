import figma, { html } from '@figma/code-connect/html';

// Infobulle DSFR : 8 sets (2 déclencheurs, 6 bulles). Thème = CSS seul.
// « État Initial / Active » est piloté au runtime par le JS du DSFR → non bindable.
// « Direction » et « Alignement » sont calculés automatiquement par le DSFR (classe
// fr-placement) : ils ne changent pas le markup, d'où le même snippet pour les 6 bulles.
// react-dsfr n'a pas de directive séparée pour le déclenchement au survol comme ngx-dsfr :
// `Tooltip` est un composant unique, `kind="click"` pose le bouton dédié, `kind="hover"`
// (valeur par défaut) avec `children` pose le déclencheur au survol ; sans `children`, il
// affiche l'icône par défaut (utilisé pour les 6 sets « Bulle »).

const imports = ["import { Tooltip } from '@codegouvfr/react-dsfr/Tooltip'"];

// ─── Déclenchement au clic ───────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359535', {
  example: () => html`<Tooltip kind="click" title="Message de l'infobulle" />`,
  imports,
});

// ─── Déclenchement au survol ─────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359572', {
  example: () => html`<Tooltip title="Message de l'infobulle">Libellé du lien</Tooltip>`,
  imports,
});

// ─── Bulles ──────────────────────────────────────────────────────────────────
// Les 6 sets de bulle ne correspondent qu'à la position calculée : même code.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359683', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<Tooltip title="${message}" />`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359945', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<Tooltip title="${message}" />`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359964', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<Tooltip title="${message}" />`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-359983', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<Tooltip title="${message}" />`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-360002', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<Tooltip title="${message}" />`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20430-360021', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<Tooltip title="${message}" />`,
  imports,
});
