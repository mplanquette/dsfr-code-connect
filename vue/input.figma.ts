import figma, { html } from '@figma/code-connect/html';

// Champ de saisie DSFR : 4 sets (Item complet, Groupe, Section, champ simple).
// « Éléments - Champ de saisie » est le champ complet (icône, bascule zone de texte) ;
// « Champ de saisie » est la variante simple sans ces options. Les composants
// « Éléments / Label », « Éléments / Légende », « Éléments / Message de formulaire »
// et « Éléments / Titre de section » sont des atomes internes → non connectés.
// Focus = pseudo-état → ignoré. « Rempli » ne porte pas de sévérité de message.
// « Texte saisi » est un texte de démonstration Figma → non bindé.
//
// DsfrInputGroup (vue-dsfr) porte le label + le hint + les messages d'erreur/validation
// (errorMessage/validMessage) et relaie les attrs non typés (isTextarea, isWithWrapper,
// wrapperClass) au DsfrInput sous-jacent : c'est le composant retenu pour Item et Simple.
// Icône : pas de prop `icon` dédiée côté vue-dsfr → on pose `isWithWrapper` +
// `wrapperClass="fr-icon-search-line"` (classe DSFR native), comme pour le HTML brut.
// DsfrFieldset (Groupe/Section) ne porte ni `disabled` ni classe d'état dédiés : ce sont
// des attributs HTML natifs qui retombent (fallthrough) sur la balise `<fieldset>` racine,
// y compris une classe `fr-fieldset--error`/`--valid` qui se fusionne avec la classe interne.

const imports = ["import DsfrInputGroup from '@gouvminint/vue-dsfr/DsfrInputGroup.vue'"];

// ─── Éléments - Champ de saisie (Item complet) ───────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14819-199027', {
  props: {
    textarea: figma.boolean('Texte Area', { true: ' is-textarea :rows="4"', false: '' }),
    icon: figma.boolean('Icône', { true: ' is-with-wrapper wrapper-class="fr-icon-search-line"', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    severity: figma.enum('État', {
      Défaut: '', Rempli: '',
      Erreur: ` error-message="Texte d'erreur"`,
      Valide: ` valid-message="Texte de validation"`,
    }),
  },
  example: ({ textarea, icon, disabled, severity }) =>
    html`<DsfrInputGroup
  label="Libellé du champ"
  name="input"${textarea}${icon}${disabled}${severity}
/>`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14820-199166', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    severityClass: figma.enum('État', {
      Défaut: '', Rempli: '',
      Erreur: ' class="fr-fieldset--error"',
      Valide: ' class="fr-fieldset--valid"',
    }),
  },
  example: ({ disabled, severityClass }) =>
    html`<DsfrFieldset legend="Légende du groupe"${disabled}${severityClass}>
  <DsfrInput label="Premier champ" name="input-1" />
  <DsfrInput label="Deuxième champ" name="input-2" />
</DsfrFieldset>`,
  imports: [
    "import DsfrInput from '@gouvminint/vue-dsfr/DsfrInput.vue'",
    "import DsfrFieldset from '@gouvminint/vue-dsfr/DsfrFieldset.vue'",
  ],
});

// ─── Section ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14823-199333', {
  props: {
    legend: figma.string('Tire de section'),
    disabled: figma.boolean('Disable', { true: ' disabled', false: '' }),
  },
  example: ({ legend, disabled }) =>
    html`<DsfrFieldset legend="${legend}"${disabled}>
  <DsfrInput label="Premier champ" name="input-1" />
  <DsfrInput label="Deuxième champ" name="input-2" />
</DsfrFieldset>`,
  imports: [
    "import DsfrInput from '@gouvminint/vue-dsfr/DsfrInput.vue'",
    "import DsfrFieldset from '@gouvminint/vue-dsfr/DsfrFieldset.vue'",
  ],
});

// ─── Champ de saisie (simple) ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14819-199148', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    severity: figma.enum('État', {
      Défaut: '', Rempli: '',
      Erreur: ` error-message="Texte d'erreur"`,
      Valide: ` valid-message="Texte de validation"`,
    }),
  },
  example: ({ disabled, severity }) =>
    html`<DsfrInputGroup label="Libellé du champ" name="input"${disabled}${severity} />`,
  imports,
});
