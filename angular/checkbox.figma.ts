import figma, { html } from '@figma/code-connect/html';

// Case à cocher DSFR : 3 sets utiles (Item, Groupe, Section).
// Les sets « 🚫 / SM » et « 🚫 / MD » sont des atomes internes Figma (la case seule),
// jamais utilisés tels quels par un dev → non connectés.
// Thème sombre = CSS seul → non connecté. Focus et Survol = pseudo-états → ignorés.
// « Message d'information » (booléen Figma) est couvert par « Validation » qui porte déjà
// le message et sa sévérité → non bindé séparément pour ne pas dupliquer l'attribut.
// « Indéterminée » (ajouté en DSFR 1.15) → input [indeterminate], disponible depuis
// ngx-dsfr 1.4.

const imports = ["import { DsfrFormCheckboxComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14795-206250', {
  props: {
    small: figma.enum('Taille', { SM: ' [small]="true"', MD: '' }),
    checked: figma.boolean('Coché', { true: ' [value]="true"', false: '' }),
    indeterminate: figma.boolean('Indéterminée', { true: ' [indeterminate]="true"', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
    validation: figma.enum('Validation', {
      Aucune: '',
      Valide: ` message="Texte de validation" messageSeverity="valid"`,
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
    }),
  },
  example: ({ small, checked, indeterminate, disabled, validation }) =>
    html`<dsfr-form-checkbox label="Libellé case à cocher"${small}${checked}${indeterminate}${disabled}${validation}></dsfr-form-checkbox>`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=338-984', {
  props: {
    inline: figma.enum('Orientation', { Horizontal: ' [inline]="true"', Vertical: '' }),
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
    severity: figma.enum('État', {
      Défaut: '',
      Valide: ` message="Texte de validation" messageSeverity="valid"`,
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
    }),
  },
  example: ({ inline, disabled, severity }) =>
    html`<dsfr-fieldset legend="Légende du groupe"${inline}${disabled}${severity}>
  <dsfr-form-checkbox *fieldsetElement label="Première option"></dsfr-form-checkbox>
  <dsfr-form-checkbox *fieldsetElement label="Deuxième option"></dsfr-form-checkbox>
  <dsfr-form-checkbox *fieldsetElement label="Troisième option"></dsfr-form-checkbox>
</dsfr-fieldset>`,
  imports: [
    "import { DsfrFormCheckboxComponent, DsfrFormFieldsetComponent } from '@edugouvfr/ngx-dsfr'",
  ],
});

// ─── Section ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14837-211503', {
  props: {
    legend: figma.string('Titre de section'),
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
  },
  example: ({ legend, disabled }) =>
    html`<dsfr-fieldset legend="${legend}"${disabled}>
  <dsfr-form-checkbox *fieldsetElement label="Première option"></dsfr-form-checkbox>
  <dsfr-form-checkbox *fieldsetElement label="Deuxième option"></dsfr-form-checkbox>
</dsfr-fieldset>`,
  imports: [
    "import { DsfrFormCheckboxComponent, DsfrFormFieldsetComponent } from '@edugouvfr/ngx-dsfr'",
  ],
});
