import figma, { html } from '@figma/code-connect/html';

// Champ de saisie DSFR : 4 sets (Item, Groupe, Section, champ simple).
// « Éléments - Champ de saisie » est le champ complet (icône, bascule zone de texte) ;
// « Champ de saisie » est la variante simple sans ces options. Les composants
// « Éléments / Label », « Éléments / Légende », « Éléments / Message de formulaire »
// et « Éléments / Titre de section » sont des atomes internes qui composent ces
// 4 sets → non connectés individuellement.
// Focus = pseudo-état → ignoré. « Rempli » ne porte pas de sévérité de message.
// « Texte saisi » est un texte de démonstration Figma, non représentatif d'une
// valeur réelle → non bindé.

const imports = ["import { DsfrFormInputComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Éléments - Champ de saisie (Item complet) ───────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14819-199027', {
  props: {
    textarea: figma.boolean('Texte Area', { true: ' [textarea]="true" [rows]="4"', false: '' }),
    icon: figma.boolean('Icône', { true: ' icon="fr-icon-search-line"', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
    severity: figma.enum('État', {
      Défaut: '', Rempli: '',
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
      Valide: ` message="Texte de validation" messageSeverity="valid"`,
    }),
  },
  example: ({ textarea, icon, disabled, severity }) =>
    html`<dsfr-form-input
  label="Libellé du champ"
  name="input"${textarea}${icon}${disabled}${severity}></dsfr-form-input>`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14820-199166', {
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
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14823-199333', {
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

// ─── Champ de saisie (simple) ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14819-199148', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
    severity: figma.enum('État', {
      Défaut: '', Rempli: '',
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
      Valide: ` message="Texte de validation" messageSeverity="valid"`,
    }),
  },
  example: ({ disabled, severity }) =>
    html`<dsfr-form-input label="Libellé du champ" name="input"${disabled}${severity}></dsfr-form-input>`,
  imports,
});
