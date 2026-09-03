import figma, { html } from '@figma/code-connect/html';

// Interrupteur DSFR : 2 sets utiles (Item, Groupe).
// Le set « 🚫 / Interrupteur » est l'atome interne Figma (le switch seul) → non connecté.
// Thème sombre = CSS seul.
// « Statut » (afficher le texte Activé/Désactivé) → prop `noText` inversée côté vue-dsfr.
// « Alignement Gauche » → prop `labelLeft`. Contrairement à ngx-dsfr, pas de dépréciation
// documentée côté vue-dsfr : binding conservé tel quel.
// Sévérité : DsfrToggleSwitch combine `status` ('valid'|'error') + `validMessage`/`errorMessage`.

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=536-45814', {
  props: {
    label: figma.string('Libellé'),
    hint: figma.boolean('Voir Texte d\'aide', { true: ' hint="Texte d\'aide"', false: '' }),
    showStatus: figma.boolean('Statut', { true: '', false: ' no-text' }),
    checked: figma.boolean('Coché', { true: ' :model-value="true"', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    position: figma.enum('Alignement', { Gauche: ' label-left', Droite: '' }),
    severity: figma.enum('État', {
      Default: '',
      Valide: ` status="valid" valid-message="Texte de validation"`,
      Erreur: ` status="error" error-message="Texte d'erreur"`,
    }),
  },
  example: ({ label, hint, showStatus, checked, disabled, position, severity }) =>
    html`<DsfrToggleSwitch label="${label}"${hint}${showStatus}${checked}${disabled}${position}${severity} />`,
  imports: ["import DsfrToggleSwitch from '@gouvminint/vue-dsfr/DsfrToggleSwitch.vue'"],
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=536-47172', {
  props: {
    position: figma.enum('Alignement', { Gauche: `, labelLeft: true`, Droite: '' }),
    severity: figma.enum('État', {
      Default: '',
      Valide: ` status="valid" valid-message="Texte de validation"`,
      Erreur: ` status="error" error-message="Texte d'erreur"`,
    }),
  },
  example: ({ position, severity }) =>
    html`<DsfrToggleSwitchGroup
  legend="Légende du groupe"
  :toggle-switches="[
    { label: 'Première option'${position} },
    { label: 'Deuxième option'${position} },
    { label: 'Troisième option'${position} }
  ]"${severity}
/>`,
  imports: ["import DsfrToggleSwitchGroup from '@gouvminint/vue-dsfr/DsfrToggleSwitchGroup.vue'"],
});
