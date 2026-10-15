import figma, { html } from '@figma/code-connect/html';

// Bouton radio riche DSFR : 3 sets (Item, Groupe, Section).
// Focus et Survol = pseudo-états → ignorés. Thème sombre = CSS seul.
// vue-dsfr ne distingue pas un composant "riche" séparé : DsfrRadioButtonSet expose une
// prop `rich` (bool) qui bascule l'ensemble en mode riche (classe `fr-radio-rich`), les
// pictogrammes étant portés par `img`/`svgPath`/`imgTitle` sur chaque option, mêmes
// composants que `radio.figma.ts`, juste avec `rich` activé.
// « Illustration » est un instance-swap non code-connecté (pictogrammes DSFR) :
// placeholder `img` à remplacer par le chemin réel du pictogramme.

const imports = ["import DsfrRadioButtonSet from '@gouvminint/vue-dsfr/DsfrRadioButtonSet.vue'"];

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BOUTON_RADIO_RICHE__BOUTON_RADIO_RICHE>', {
  props: {
    checked: figma.boolean('Coché', { true: ' model-value="option-1"', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    artwork: figma.boolean('Pictogramme', {
      true: `, img: '/pictograms/system/system.svg', imgTitle: 'Illustration'`,
      false: '',
    }),
    validation: figma.enum('Validation', {
      Default: '',
      Valide: ` valid-message="Texte de validation"`,
      Erreur: ` error-message="Texte d'erreur"`,
    }),
  },
  example: ({ checked, disabled, artwork, validation }) =>
    html`<DsfrRadioButtonSet
  name="radio-rich"
  legend="Légende du champ"
  rich
  :options="[{ label: 'Libellé bouton radio', value: 'option-1', hint: 'Texte de description'${artwork} }]"${checked}${disabled}${validation}
/>`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BOUTON_RADIO_RICHE__BOUTON_RADIO_RICHE_GROUPE>', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    severity: figma.enum('État', {
      Default: '',
      Valide: ` valid-message="Texte de validation"`,
      Erreur: ` error-message="Texte d'erreur"`,
    }),
  },
  example: ({ disabled, severity }) =>
    html`<DsfrRadioButtonSet
  name="radio-rich"
  legend="Légende du groupe"
  rich
  inline
  :options="[
    { label: 'Première option', value: 'option-1', hint: 'Texte de description' },
    { label: 'Deuxième option', value: 'option-2', hint: 'Texte de description' }
  ]"${disabled}${severity}
/>`,
  imports,
});

// ─── Section ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BOUTON_RADIO_RICHE__BOUTON_RADIO_RICHE_SECTION>', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
  },
  example: ({ disabled }) =>
    html`<DsfrRadioButtonSet
  name="radio-rich"
  legend="Titre de section"
  rich
  inline
  :options="[
    { label: 'Première option', value: 'option-1', hint: 'Texte de description' },
    { label: 'Deuxième option', value: 'option-2', hint: 'Texte de description' }
  ]"${disabled}
/>`,
  imports,
});
