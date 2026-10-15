import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement :
//   - Plus → plus
// Bouton FranceConnect DSFR : 1 set. Les composants « _🚫Éléments » sont des atomes
// internes → non connectés. Thème = CSS seul (variante interne). Focus, Survol,
// Cliqué = pseudo-états → ignorés. Désactivé n'a pas d'équivalent dans
// `FranceConnectButtonProps` → ignoré, le bouton reste actif dans tous les exemples.
// `url` est obligatoire (ou `onClick`) : placeholder `/login` à adapter par le dev.

figma.connect('<FIGMA_BOUTON_FRANCECONNECT__BOUTON_FRANCECONNECT>', {
  props: {
    plus: figma.boolean('Plus', { true: ' plus', false: '' }),
  },
  example: ({ plus }) => html`<FranceConnectButton url="/login"${plus} />`,
  imports: ["import { FranceConnectButton } from '@codegouvfr/react-dsfr/FranceConnectButton'"],
});
