import figma, { html } from '@figma/code-connect/html';

// Case à cocher DSFR : 3 sets utiles (Item, Groupe, Section), même mapping que
// angular/checkbox.figma.ts et html/checkbox-html.figma.ts. Les sets « 🚫 / SM » et
// « 🚫 / MD » sont des atomes internes Figma → non connectés.
// Thème sombre = CSS seul. Focus et Survol = pseudo-états → ignorés.
// react-dsfr expose Checkbox comme un wrapper de `Fieldset` piloté par `options[]`
// (voir src/shared/Fieldset.tsx) : pas de composant "case isolée", d'où le même
// composant pour l'item et le groupe (comme côté ngx-dsfr).
// « Indéterminée » (DSFR 1.15) : `nativeInputProps` accepte du HTML natif mais
// `indeterminate` n'est pas un attribut HTML déclaratif (propriété DOM pure), react-dsfr
// ne l'expose pas nativement, il faut passer par un ref callback
// (`nativeInputProps={{ ref: el => { if (el) el.indeterminate = true } }}`) → non bindé
// ici pour rester lisible en Dev Mode, à câbler par le dev si besoin.
// `options[]` : déclaré en `const options = [...]` avant le JSX (comme
// breadcrumb.figma.ts) puis référencé en `options={options}`, plutôt qu'en valeur
// d'attribut multiligne inline, le parser Code Connect (HTML générique) interprète
// toute valeur d'attribut multiligne contenant plusieurs objets comme une liste
// d'attributs HTML et lève une erreur « Duplicate attribute name ».

const imports = ["import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox'"];

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_CASE_A_COCHER__CASE_A_COCHER_ITEM>', {
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
    html`const options = [{ label: 'Libellé case à cocher', nativeInputProps: { name: 'checkbox'${checked} } }];

<Checkbox
  options={options}${small}${disabled}${validation}
/>`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_CASE_A_COCHER__CASE_A_COCHER_GROUPE>', {
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
  { label: 'Première option', nativeInputProps: { name: 'checkbox-group' } },
  { label: 'Deuxième option', nativeInputProps: { name: 'checkbox-group' } },
  { label: 'Troisième option', nativeInputProps: { name: 'checkbox-group' } }
];

<Checkbox
  legend="Légende du groupe"
  options={options}${inline}${disabled}${severity}
/>`,
  imports,
});

// ─── Section ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_CASE_A_COCHER__CASE_A_COCHER_SECTION>', {
  props: {
    legend: figma.string('Titre de section'),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
  },
  example: ({ legend, disabled }) =>
    html`const options = [
  { label: 'Première option', nativeInputProps: { name: 'checkbox-section' } },
  { label: 'Deuxième option', nativeInputProps: { name: 'checkbox-section' } }
];

<Checkbox
  legend="${legend}"
  options={options}${disabled}
/>`,
  imports,
});
