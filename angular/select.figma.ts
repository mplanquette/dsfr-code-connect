import figma, { html } from '@figma/code-connect/html';

// Liste déroulante DSFR : 1 set. Thème sombre = CSS seul.
// L'enum « État » et le booléen « Désactivé » se recoupent (État=Désactivé duplique
// Désactivé=True) : seul « État » porte la sévérité du message, « Désactivé » porte
// l'attribut disabled.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=284-15646', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
    severity: figma.enum('État', {
      Défaut: '',
      Succès: ` message="Texte de validation" messageSeverity="valid"`,
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
      Désactivé: '',
    }),
  },
  example: ({ disabled, severity }) =>
    html`<dsfr-form-select
  label="Libellé de la liste déroulante"
  name="select"
  [options]="[
    { label: 'Première option', value: 'option-1' },
    { label: 'Deuxième option', value: 'option-2' },
    { label: 'Troisième option', value: 'option-3' }
  ]"${disabled}${severity}></dsfr-form-select>`,
  imports: ["import { DsfrFormSelectComponent } from '@edugouvfr/ngx-dsfr'"],
});
