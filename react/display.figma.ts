import figma, { html } from '@figma/code-connect/html';

// Paramètre d'affichage DSFR : 1 set. Thème et Support = CSS seul/responsive
// (variantes internes au même set, pas de props dédiées) → snippet unique.
// <Display /> côté react-dsfr n'a aucune prop : il est monté une fois (déjà inclus
// automatiquement par <Header> sauf `disableDisplay`), la modale s'ouvre via le
// bouton `headerFooterDisplayItem` posé dans `quickAccessItems`/`bottomItems`.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=583-50596', {
  example: () => html`<Display />`,
  imports: ["import { Display } from '@codegouvfr/react-dsfr/Display'"],
});
