import figma, { html } from '@figma/code-connect/html';

// Bouton radio riche DSFR : 3 sets (Item, Groupe, Section), même mapping que
// angular/radio-rich.figma.ts et html/radio-rich-html.figma.ts.
// Focus et Survol = pseudo-états → ignorés. Thème sombre = CSS seul.
// react-dsfr n'a pas de composant radio riche dédié : `RadioButtons` (wrapper de
// `Fieldset`, voir src/shared/Fieldset.tsx) détecte automatiquement la variante riche
// dès qu'au moins une `option` porte une prop `illustration` (ReactNode), pas de prop
// de mode explicite, contrairement à `dsfr-form-radio-rich` (ngx-dsfr) qui est un
// composant à part entière.
// « Illustration » est un instance-swap non code-connecté (pictogrammes DSFR) :
// placeholder `<img src='/artwork/pictograms/system/system.svg' .../>` à remplacer par
// le pictogramme réel.
// `options[]` : déclaré en `const options = [...]` avant le JSX (comme
// breadcrumb.figma.ts) puis référencé en `options={options}`, plutôt qu'en valeur
// d'attribut multiligne inline, le parser Code Connect (HTML générique) interprète
// toute valeur d'attribut multiligne contenant plusieurs objets comme une liste
// d'attributs HTML et lève une erreur « Duplicate attribute name ».

const imports = ["import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons'"];

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BOUTON_RADIO_RICHE__BOUTON_RADIO_RICHE>', {
  props: {
    checked: figma.boolean('Coché', { true: ', defaultChecked: true', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    illustration: figma.boolean('Pictogramme', {
      true: `, illustration: <img src='/artwork/pictograms/system/system.svg' alt='' aria-hidden='true' />`,
      false: '',
    }),
    validation: figma.enum('Validation', {
      Default: '',
      Valide: ` state="success" stateRelatedMessage="Texte de validation"`,
      Erreur: ` state="error" stateRelatedMessage="Texte d'erreur"`,
    }),
  },
  example: ({ checked, disabled, illustration, validation }) =>
    html`const options = [{ label: 'Libellé bouton radio', hintText: 'Texte de description', nativeInputProps: { value: 'option-1'${checked} }${illustration} }];

<RadioButtons
  name="radio-rich"
  legend="Légende du champ"
  options={options}${disabled}${validation}
/>`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BOUTON_RADIO_RICHE__BOUTON_RADIO_RICHE_GROUPE>', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    severity: figma.enum('État', {
      Default: '',
      Valide: ` state="success" stateRelatedMessage="Texte de validation"`,
      Erreur: ` state="error" stateRelatedMessage="Texte d'erreur"`,
    }),
  },
  example: ({ disabled, severity }) =>
    html`const options = [
  { label: 'Première option', hintText: 'Texte de description', nativeInputProps: { value: 'option-1' } },
  { label: 'Deuxième option', hintText: 'Texte de description', nativeInputProps: { value: 'option-2' } }
];

<RadioButtons
  name="radio-rich"
  legend="Légende du groupe"
  orientation="horizontal"
  options={options}${disabled}${severity}
/>`,
  imports,
});

// ─── Section ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BOUTON_RADIO_RICHE__BOUTON_RADIO_RICHE_SECTION>', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
  },
  example: ({ disabled }) =>
    html`const options = [
  { label: 'Première option', hintText: 'Texte de description', nativeInputProps: { value: 'option-1' } },
  { label: 'Deuxième option', hintText: 'Texte de description', nativeInputProps: { value: 'option-2' } }
];

<RadioButtons
  name="radio-rich"
  legend="Titre de section"
  orientation="horizontal"
  options={options}${disabled}
/>`,
  imports,
});
