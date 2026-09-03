import figma, { html } from '@figma/code-connect/html';

// Bouton FranceConnect DSFR : 1 set. Les composants « _🚫Éléments » sont des atomes
// internes → non connectés. Thème = CSS seul (variante interne). Focus, Survol,
// Cliqué = pseudo-états → ignorés (Désactivé n'a pas de prop dédiée côté `DsfrFranceConnect`,
// le bouton natif reste donc actif dans tous les exemples).
// « Plus » → prop `secure` : bascule aussi le lien « Qu'est-ce que FranceConnect(+) ? »
// (géré nativement par le composant, pas de simplification nécessaire ici).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=11985-75836', {
  props: {
    secure: figma.boolean('Plus', { true: ' secure', false: '' }),
  },
  example: ({ secure }) => html`<DsfrFranceConnect id="franceconnect"${secure} />`,
  imports: ["import DsfrFranceConnect from '@gouvminint/vue-dsfr/DsfrFranceConnect.vue'"],
});
