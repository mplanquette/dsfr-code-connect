import figma, { html } from '@figma/code-connect/html';

// Bouton radio DSFR : 3 sets utiles (Item, Groupe, Section), même mapping que
// angular/radio.figma.ts et html/radio-html.figma.ts. Les sets « 🚫 / SM » et
// « 🚫 / MD » sont des atomes internes Figma → non connectés.
// Thème sombre = CSS seul. Focus = pseudo-état → ignoré.
// react-dsfr expose RadioButtons comme un wrapper de `Fieldset` (type="radio") piloté
// par `options[]` (voir src/shared/Fieldset.tsx) : pas de composant radio isolé, d'où
// le même composant pour l'item et le groupe. `name` se déclare au niveau du composant.
// `options[]` : déclaré en `const options = [...]` avant le JSX (comme
// breadcrumb.figma.ts) puis référencé en `options={options}`, plutôt qu'en valeur
// d'attribut multiligne inline, le parser Code Connect (HTML générique) interprète
// toute valeur d'attribut multiligne contenant plusieurs objets comme une liste
// d'attributs HTML et lève une erreur « Duplicate attribute name ».

const imports = ["import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons'"];

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=311-24508', {
  props: {
    small: figma.enum('Taille', { SM: ' small', MD: '' }),
    checked: figma.boolean('Coché', { true: ', defaultChecked: true', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    validation: figma.enum('Validation', {
      Aucune: '',
      Valide: ` state="success" stateRelatedMessage="Texte de validation"`,
      Erreur: ` state="error" stateRelatedMessage="Texte d'erreur"`,
    }),
  },
  example: ({ small, checked, disabled, validation }) =>
    html`const options = [{ label: 'Libellé bouton radio', nativeInputProps: { value: 'option-1'${checked} } }];

<RadioButtons
  name="radio"
  legend="Légende du champ"
  options={options}${small}${disabled}${validation}
/>`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=314-25444', {
  props: {
    inline: figma.enum('Orientation', { Horizontal: ' orientation="horizontal"', Vertical: '' }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    severity: figma.enum('État', {
      Défaut: '',
      Valide: ` state="success" stateRelatedMessage="Texte de validation"`,
      Erreur: ` state="error" stateRelatedMessage="Texte d'erreur"`,
    }),
  },
  example: ({ inline, disabled, severity }) =>
    html`const options = [
  { label: 'Première option', nativeInputProps: { value: 'option-1' } },
  { label: 'Deuxième option', nativeInputProps: { value: 'option-2' } },
  { label: 'Troisième option', nativeInputProps: { value: 'option-3' } }
];

<RadioButtons
  name="radio"
  legend="Légende du groupe"
  options={options}${inline}${disabled}${severity}
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
    html`const options = [
  { label: 'Première option', nativeInputProps: { value: 'option-1' } },
  { label: 'Deuxième option', nativeInputProps: { value: 'option-2' } }
];

<RadioButtons
  name="radio"
  legend="${legend}"
  options={options}${disabled}
/>`,
  imports,
});
