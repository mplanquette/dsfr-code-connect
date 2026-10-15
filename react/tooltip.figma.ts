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
figma.connect('<FIGMA_INFOBULLE__DECLENCHEMENT_AU_CLICK>', {
  example: () => html`<Tooltip kind="click" title="Message de l'infobulle" />`,
  imports,
});

// ─── Déclenchement au survol ─────────────────────────────────────────────────
figma.connect('<FIGMA_INFOBULLE__DECLENCHEMENT_AU_SURVOL>', {
  example: () => html`<Tooltip title="Message de l'infobulle">Libellé du lien</Tooltip>`,
  imports,
});

// ─── Bulles ──────────────────────────────────────────────────────────────────
// Les 6 sets de bulle ne correspondent qu'à la position calculée : même code.
figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_HAUT_ALIGNEE_AU_CENTRE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<Tooltip title="${message}" />`,
  imports,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_BAS_ALIGNEE_AU_CENTRE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<Tooltip title="${message}" />`,
  imports,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_BAS_ALIGNEE_A_DROITE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<Tooltip title="${message}" />`,
  imports,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_BAS_ALIGNEE_A_GAUCHE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<Tooltip title="${message}" />`,
  imports,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_HAUT_ALIGNEE_A_GAUCHE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<Tooltip title="${message}" />`,
  imports,
});

figma.connect('<FIGMA_INFOBULLE__BULLE_VERS_LE_HAUT_ALIGNEE_A_DROITE>', {
  props: { message: figma.string('Message') },
  example: ({ message }) => html`<Tooltip title="${message}" />`,
  imports,
});
