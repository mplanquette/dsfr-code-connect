import figma, { html } from '@figma/code-connect/html';

// Alerte DSFR : 1 set. Thème (Clair/Sombre) et Support (Desktop/Mobile) = CSS/responsive
// uniquement → pas de binding.
// Propriétés Figma liées dynamiquement :
//   - État      → prop `type` (error/info/success/warning)
//   - Taille    → shorthand booléen `small` (MD = absent, SM = présent)
//   - Fermeture → shorthand booléen `closeable` + `close-button-label`
// DsfrAlert n'a pas de prop `alertSize` (contrairement à ngx-dsfr) : la taille SM est un
// booléen `small`.

const props = {
  severity: figma.enum('État', {
    Erreur: 'error',
    Information: 'info',
    Succès: 'success',
    Avertissement: 'warning',
  }),
  small: figma.enum('Taille', { MD: '', SM: ' small' }),
  closeable: figma.boolean('Fermeture', {
    true: ' closeable close-button-label="Masquer le message"',
    false: '',
  }),
};
const imports = ["import DsfrAlert from '@gouvminint/vue-dsfr/DsfrAlert.vue'"];

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=1935-224', {
  props,
  example: ({ severity, small, closeable }) =>
    html`<DsfrAlert type="${severity}" title="Titre du message" description="Description de l'alerte"${small}${closeable} />`,
  imports,
});
