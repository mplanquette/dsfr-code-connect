import figma, { html } from '@figma/code-connect/html';

// Paramètre d'affichage DSFR : 1 set. Thème et Support = CSS seul/responsive
// (variantes internes au même set, pas de props dédiées) → snippet unique.
// <Display /> côté react-dsfr n'a aucune prop : il est monté une fois (déjà inclus
// automatiquement par <Header> sauf `disableDisplay`), la modale s'ouvre via le
// bouton `headerFooterDisplayItem` posé dans `quickAccessItems`/`bottomItems`.

figma.connect('<FIGMA_PARAMETRE_D_AFFICHAGE__PARAMETRE_D_AFFICHAGE>', {
  example: () => html`<Display />`,
  imports: ["import { Display } from '@codegouvfr/react-dsfr/Display'"],
});
