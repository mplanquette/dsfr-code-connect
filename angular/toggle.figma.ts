import figma, { html } from '@figma/code-connect/html';

// Interrupteur DSFR : 2 sets utiles (Item, Groupe).
// Le set « 🚫 / Interrupteur » est l'atome interne Figma (le switch seul) → non connecté.
// Thème sombre = CSS seul.
// « Alignement Gauche » correspond à `labelPosition="left"`, déprécié depuis 1.14.1 pour
// raisons d'accessibilité : on garde le binding pour refléter le design, mais le dev
// doit privilégier l'alignement à droite (valeur par défaut).

const imports = ["import { DsfrFormToggleComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=536-45814', {
  props: {
    label: figma.string('Libellé'),
    hint: figma.boolean('Voir Texte d\'aide', { true: ' hint="Texte d\'aide"', false: '' }),
    showStatus: figma.boolean('Statut', { true: '', false: ' [showStatusLabel]="false"' }),
    checked: figma.boolean('Coché', { true: ' [value]="true"', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
    position: figma.enum('Alignement', { Gauche: ' labelPosition="left"', Droite: '' }),
    severity: figma.enum('État', {
      Default: '',
      Valide: ` message="Texte de validation" messageSeverity="valid"`,
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
    }),
  },
  example: ({ label, hint, showStatus, checked, disabled, position, severity }) =>
    html`<dsfr-form-toggle label="${label}"${hint}${showStatus}${checked}${disabled}${position}${severity}></dsfr-form-toggle>`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=536-47172', {
  props: {
    position: figma.enum('Alignement', { Gauche: ' labelPosition="left"', Droite: '' }),
    severity: figma.enum('État', {
      Default: '',
      Valide: ` message="Texte de validation" messageSeverity="valid"`,
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
    }),
  },
  example: ({ position, severity }) =>
    html`<dsfr-form-toggles-group legend="Légende du groupe"${severity}>
  <dsfr-form-toggle label="Première option"${position}></dsfr-form-toggle>
  <dsfr-form-toggle label="Deuxième option"${position}></dsfr-form-toggle>
  <dsfr-form-toggle label="Troisième option"${position}></dsfr-form-toggle>
</dsfr-form-toggles-group>`,
  imports: [
    "import { DsfrFormToggleComponent, DsfrFormTogglesGroupComponent } from '@edugouvfr/ngx-dsfr'",
  ],
});
