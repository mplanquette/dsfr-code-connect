import figma, { html } from '@figma/code-connect/html';

// Bouton FranceConnect DSFR : 1 set. Les composants « _🚫Éléments » sont des atomes
// internes → non connectés. Thème = CSS seul (variante interne). Focus, Survol,
// Cliqué = pseudo-états → ignorés (seul Désactivé n'a pas d'input dédiée côté ngx-dsfr,
// le bouton natif reste donc actif dans tous les exemples).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=11985-75836', {
  props: {
    secure: figma.boolean('Plus', { true: ' [secure]="true"', false: '' }),
  },
  example: ({ secure }) => html`<dsfr-franceconnect id="franceconnect"${secure}></dsfr-franceconnect>`,
  imports: ["import { DsfrFranceConnectComponent } from '@edugouvfr/ngx-dsfr'"],
});
