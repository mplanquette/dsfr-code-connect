import figma, { html } from '@figma/code-connect/html';

// Bouton ProConnect DSFR : nouveau en 1.15.0. 1 set utile. Les composants
// « _🚫Éléments » sont des atomes internes → non connectés. Thème = CSS seul
// (variante interne). Focus, Survol, Cliqué, Désactivé = pseudo-états/sans équivalent
// dans `ProConnectButtonProps` → ignorés. Aucune input variable (comme côté Angular/HTML).
// `url` est obligatoire (ou `onClick`) : placeholder `/login` à adapter par le dev.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=34014-794', {
  example: () => html`<ProConnectButton url="/login" />`,
  imports: ["import { ProConnectButton } from '@codegouvfr/react-dsfr/ProConnectButton'"],
});
