import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement :
//   - État      → severity (error/info/success/warning)
//   - Taille    → prop `small` (MD = omise, SM = présente)
//   - Fermeture → prop `closable`
// Thème (Clair/Sombre) et Support (Desktop/Mobile) = CSS/responsive uniquement → pas de binding.

const props = {
  severity: figma.enum('État', {
    Erreur: 'error',
    Information: 'info',
    Succès: 'success',
    Avertissement: 'warning',
  }),
  small: figma.enum('Taille', { MD: '', SM: ' small' }),
  closable: figma.boolean('Fermeture', { true: ' closable', false: '' }),
};
const imports = ["import { Alert } from '@codegouvfr/react-dsfr/Alert'"];

figma.connect('<FIGMA_ALERTE__ALERTE>', {
  props,
  example: ({ severity, small, closable }) =>
    html`<Alert severity="${severity}" title="Titre du message" description="Description de l'alerte"${small}${closable} />`,
  imports,
});
