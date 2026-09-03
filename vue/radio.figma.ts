import figma, { html } from '@figma/code-connect/html';

// Bouton radio DSFR : 3 sets utiles (Item, Groupe, Section).
// Les sets « 🚫 / SM » et « 🚫 / MD » sont des atomes internes Figma → non connectés.
// Thème sombre = CSS seul. Focus = pseudo-état → ignoré.
// vue-dsfr expose un DsfrRadioButton unitaire, mais sans message d'erreur/validation
// (uniquement porté par DsfrRadioButtonSet) : comme côté Angular (qui n'a pas non plus de
// radio unitaire), on utilise DsfrRadioButtonSet avec un seul élément dans `options` pour
// l'Item, afin de garder la prop « Validation » bindable.

const imports = ["import DsfrRadioButtonSet from '@gouvminint/vue-dsfr/DsfrRadioButtonSet.vue'"];

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=311-24508', {
  props: {
    small: figma.enum('Taille', { SM: ' small', MD: '' }),
    checked: figma.boolean('Coché', { true: ' model-value="option-1"', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    validation: figma.enum('Validation', {
      Aucune: '',
      Valide: ` valid-message="Texte de validation"`,
      Erreur: ` error-message="Texte d'erreur"`,
    }),
  },
  example: ({ small, checked, disabled, validation }) =>
    html`<DsfrRadioButtonSet
  name="radio"
  legend="Légende du champ"
  :options="[{ label: 'Libellé bouton radio', value: 'option-1' }]"${small}${checked}${disabled}${validation}
/>`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=314-25444', {
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
    html`<DsfrRadioButtonSet
  name="radio"
  legend="Légende du groupe"
  :options="[
    { label: 'Première option', value: 'option-1' },
    { label: 'Deuxième option', value: 'option-2' },
    { label: 'Troisième option', value: 'option-3' }
  ]"${inline}${disabled}${severity}
/>`,
  imports,
});

// ─── Section ─────────────────────────────────────────────────────────────────
// La propriété Figma est nommée « Tire de section » (coquille côté design, conservée telle quelle).
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14835-206001', {
  props: {
    legend: figma.string('Tire de section'),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
  },
  example: ({ legend, disabled }) =>
    html`<DsfrRadioButtonSet
  name="radio"
  legend="${legend}"
  :options="[
    { label: 'Première option', value: 'option-1' },
    { label: 'Deuxième option', value: 'option-2' }
  ]"${disabled}
/>`,
  imports,
});
