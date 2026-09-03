import figma, { html } from '@figma/code-connect/html';

// Bouton radio riche DSFR : 3 sets (Item, Groupe, Section).
// Focus et Survol = pseudo-états → ignorés. Thème sombre = CSS seul.
// « Illustration » est un instance-swap non code-connecté (pictogrammes DSFR) :
// placeholder `artworkFilePath` à remplacer par le chemin réel du pictogramme.

const imports = ["import { DsfrFormRadioRichComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=517-44003', {
  props: {
    checked: figma.boolean('Coché', { true: ' value="option-1"', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
    artwork: figma.boolean('Pictogramme', {
      true: `, artworkFilePath: 'assets/artwork/pictograms/system/system.svg'`,
      false: '',
    }),
    validation: figma.enum('Validation', {
      Default: '',
      Valide: ` message="Texte de validation" messageSeverity="valid"`,
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
    }),
  },
  example: ({ checked, disabled, artwork, validation }) =>
    html`<dsfr-form-radio-rich
  name="radio-rich"
  legend="Légende du champ"
  [options]="[{ label: 'Libellé bouton radio', value: 'option-1', hint: 'Texte de description'${artwork} }]"${checked}${disabled}${validation}></dsfr-form-radio-rich>`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14738-205727', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
    severity: figma.enum('État', {
      Default: '',
      Valide: ` message="Texte de validation" messageSeverity="valid"`,
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
    }),
  },
  example: ({ disabled, severity }) =>
    html`<dsfr-form-radio-rich
  name="radio-rich"
  legend="Légende du groupe"
  [inline]="true"
  [options]="[
    { label: 'Première option', value: 'option-1', hint: 'Texte de description' },
    { label: 'Deuxième option', value: 'option-2', hint: 'Texte de description' }
  ]"${disabled}${severity}></dsfr-form-radio-rich>`,
  imports,
});

// ─── Section ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14835-216167', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
  },
  example: ({ disabled }) =>
    html`<dsfr-form-radio-rich
  name="radio-rich"
  legend="Titre de section"
  [inline]="true"
  [options]="[
    { label: 'Première option', value: 'option-1', hint: 'Texte de description' },
    { label: 'Deuxième option', value: 'option-2', hint: 'Texte de description' }
  ]"${disabled}></dsfr-form-radio-rich>`,
  imports,
});
