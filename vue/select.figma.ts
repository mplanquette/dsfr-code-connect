import figma, { html } from '@figma/code-connect/html';

// Liste déroulante DSFR : 1 set. Thème sombre = CSS seul.
// L'enum « État » et le booléen « Désactivé » se recoupent (État=Désactivé duplique
// Désactivé=True) : seul « État » porte la sévérité du message, « Désactivé » porte
// l'attribut `disabled`. DsfrSelect utilise `success-message`/`error-message` (pas de
// `messageSeverity` unique côté vue-dsfr).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=284-15646', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    severity: figma.enum('État', {
      Défaut: '',
      Succès: ` success-message="Texte de validation"`,
      Erreur: ` error-message="Texte d'erreur"`,
      Désactivé: '',
    }),
  },
  example: ({ disabled, severity }) =>
    html`<DsfrSelect
  label="Libellé de la liste déroulante"
  name="select"
  :options="[
    { text: 'Première option', value: 'option-1' },
    { text: 'Deuxième option', value: 'option-2' },
    { text: 'Troisième option', value: 'option-3' }
  ]"${disabled}${severity}
/>`,
  imports: ["import DsfrSelect from '@gouvminint/vue-dsfr/DsfrSelect.vue'"],
});
