import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement :
//   - État      → severity (error/info/success/warning)
//   - Taille    → alertSize (MD/SM)
//   - Fermeture → [closeable] + closeControlLabel
// Thème (Clair/Sombre) et Support (Desktop/Mobile) = CSS/responsive uniquement → pas de binding.
// 'success' est deprecated depuis ngx-dsfr 1.13.0 ; successeur = 'valid'. Le composant Figma
// utilise encore "Succès" → on garde 'success' en attendant une mise à jour du portage.

const props = {
  severity: figma.enum('État', {
    Erreur: 'error',
    Information: 'info',
    Succès: 'success',
    Avertissement: 'warning',
  }),
  alertSize: figma.enum('Taille', { MD: 'MD', SM: 'SM' }),
  closeable: figma.boolean('Fermeture', {
    true: ' [closeable]="true" closeControlLabel="Masquer le message"',
    false: '',
  }),
};
const imports = ["import { DsfrAlertComponent } from '@edugouvfr/ngx-dsfr'"];

figma.connect('<FIGMA_ALERTE__ALERTE>', {
  props,
  example: ({ severity, alertSize, closeable }) => html`<dsfr-alert heading="Titre du message" message="Description de l'alerte" severity="${severity}" alertSize="${alertSize}"${closeable}></dsfr-alert>`,
  imports,
});
