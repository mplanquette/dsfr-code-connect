import figma, { html } from '@figma/code-connect/html';

// Champ de saisie DSFR : sets Groupe et Section. Le champ seul et son élément de saisie ont
// leurs propres templates (input-field.figma.ts, input-element.figma.ts), qui lisent les
// atomes imbriqués (libellé, message). Focus = pseudo-état → ignoré.

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_CHAMP_DE_SAISIE__CHAMP_DE_SAISIE_GROUPE>', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
    severity: figma.enum('État', {
      Défaut: '', Rempli: '',
      Erreur: ` messageSeverity="error"`,
      Valide: ` messageSeverity="valid"`,
    }),
  },
  example: ({ disabled, severity }) =>
    html`<dsfr-fieldset legend="Légende du groupe"${disabled}${severity}>
  <dsfr-form-input *fieldsetElement label="Premier champ" name="input-1"></dsfr-form-input>
  <dsfr-form-input *fieldsetElement label="Deuxième champ" name="input-2"></dsfr-form-input>
</dsfr-fieldset>`,
  imports: [
    "import { DsfrFormInputComponent, DsfrFormFieldsetComponent } from '@edugouvfr/ngx-dsfr'",
  ],
});

// ─── Section ─────────────────────────────────────────────────────────────────
// Propriétés Figma nommées « Tire de section » (coquille, cf. radio.figma.ts) et
// « Disable » (nom resté en anglais) : conservées telles quelles, vérifiées via
// get_design_context sur ce node (node-id=14823-199333).
figma.connect('<FIGMA_CHAMP_DE_SAISIE__CHAMP_DE_SAISIE_SECTION>', {
  props: {
    legend: figma.string('Tire de section'),
    disabled: figma.boolean('Disable', { true: ' [disabled]="true"', false: '' }),
  },
  example: ({ legend, disabled }) =>
    html`<dsfr-fieldset legend="${legend}"${disabled}>
  <dsfr-form-input *fieldsetElement label="Premier champ" name="input-1"></dsfr-form-input>
  <dsfr-form-input *fieldsetElement label="Deuxième champ" name="input-2"></dsfr-form-input>
</dsfr-fieldset>`,
  imports: [
    "import { DsfrFormInputComponent, DsfrFormFieldsetComponent } from '@edugouvfr/ngx-dsfr'",
  ],
});
