import figma, { html } from '@figma/code-connect/html';

// Case à cocher DSFR : 3 sets utiles (Item, Groupe, Section).
// Les sets « 🚫 / SM » et « 🚫 / MD » sont des atomes internes Figma (la case seule),
// jamais utilisés tels quels par un dev → non connectés.
// Thème sombre = CSS seul → non connecté. Focus et Survol = pseudo-états → ignorés.
// « Message d'information » (booléen Figma) est couvert par « Validation » qui porte déjà
// le message et sa sévérité → non bindé séparément.
// « Indéterminée » (DSFR 1.15) : DsfrCheckbox (vue-dsfr) n'expose PAS de prop `indeterminate`
// (propriété DOM pure, non reflétée en attribut HTML, non gérée par le composant) → non
// bindable ici, à la différence d'Angular/HTML. Non bindé, documenté en commentaire seulement.
// `modelValue` est un tableau requis par DsfrCheckbox : on bascule entre `[]` et
// `['option-1']` pour représenter Coché/Décoché plutôt que d'exposer une prop `checked`
// (déclarée dans le type mais non branchée dans le template du composant).

const imports = ["import DsfrCheckbox from '@gouvminint/vue-dsfr/DsfrCheckbox.vue'"];

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_CASE_A_COCHER__CASE_A_COCHER_ITEM>', {
  props: {
    small: figma.enum('Taille', { SM: ' small', MD: '' }),
    checked: figma.boolean('Coché', { true: ` :model-value="['option-1']"`, false: ' :model-value="[]"' }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    validation: figma.enum('Validation', {
      Aucune: '',
      Valide: ` valid-message="Texte de validation"`,
      Erreur: ` error-message="Texte d'erreur"`,
    }),
  },
  example: ({ small, checked, disabled, validation }) =>
    html`<DsfrCheckbox
  label="Libellé case à cocher"
  name="checkbox"
  value="option-1"${small}${checked}${disabled}${validation}
/>`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_CASE_A_COCHER__CASE_A_COCHER_GROUPE>', {
  props: {
    inline: figma.enum('Orientation', { Horizontal: ' inline', Vertical: '' }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    severity: figma.enum('État', {
      Défaut: '',
      Valide: ` valid-message="Texte de validation"`,
      Erreur: ` error-message="Texte d'erreur"`,
    }),
  },
  example: ({ inline, disabled, severity }) =>
    html`<DsfrCheckboxSet
  legend="Légende du groupe"
  :options="[
    { label: 'Première option', name: 'checkbox-1', value: 'option-1' },
    { label: 'Deuxième option', name: 'checkbox-2', value: 'option-2' },
    { label: 'Troisième option', name: 'checkbox-3', value: 'option-3' }
  ]"${inline}${disabled}${severity}
/>`,
  imports: ["import DsfrCheckboxSet from '@gouvminint/vue-dsfr/DsfrCheckboxSet.vue'"],
});

// ─── Section ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_CASE_A_COCHER__CASE_A_COCHER_SECTION>', {
  props: {
    legend: figma.string('Titre de section'),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
  },
  example: ({ legend, disabled }) =>
    html`<DsfrCheckboxSet
  legend="${legend}"
  :options="[
    { label: 'Première option', name: 'checkbox-1', value: 'option-1' },
    { label: 'Deuxième option', name: 'checkbox-2', value: 'option-2' }
  ]"${disabled}
/>`,
  imports: ["import DsfrCheckboxSet from '@gouvminint/vue-dsfr/DsfrCheckboxSet.vue'"],
});
