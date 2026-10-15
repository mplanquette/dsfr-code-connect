import figma, { html } from '@figma/code-connect/html';

// Bouton ProConnect DSFR : nouveau en 1.15.0. 1 set utile. Les composants
// « _🚫Éléments » sont des atomes internes → non connectés. Thème = CSS seul
// (variante interne). Focus, Survol, Cliqué, Désactivé = pseudo-états/sans équivalent
// dans `ProConnectButtonProps` → ignorés. Aucune input variable (comme côté Angular/HTML).
// `url` est obligatoire (ou `onClick`) : placeholder `/login` à adapter par le dev.

figma.connect('<FIGMA_BOUTON_PROCONNECT__BOUTON_PROCONNECT>', {
  example: () => html`<ProConnectButton url="/login" />`,
  imports: ["import { ProConnectButton } from '@codegouvfr/react-dsfr/ProConnectButton'"],
});
