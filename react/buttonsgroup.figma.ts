import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement :
//   - Orientation      → inlineLayoutWhen="always" (rien = "never", empilé, défaut)
//   - Taille           → buttonsSize="small" | (rien, défaut medium) | buttonsSize="large"
//   - Bouton Tertiaire → 3ᵉ entrée du tableau `buttons` (variant Hiérarchisé uniquement)
// Groupe de boutons DSFR : 2 sets (Non hiérarchisé, Hiérarchisé). Thème = CSS seul
// (variante interne au même set) → non bindé.
// `ButtonsGroup` prend un tableau `buttons: ButtonProps[]` plutôt que des enfants JSX :
// chaque bouton du design devient une entrée de ce tableau. Le tableau est rendu comme
// une seule valeur d'attribut entre guillemets (`buttons="[...]"`) plutôt qu'en
// `buttons={[...]}` multi-ligne : le parser Code Connect (HTML) tokenise le texte de
// l'exemple comme des attributs HTML, et deux entrées `children: '...'` distinctes y
// seraient lues comme un attribut `children` dupliqué (`Duplicate attribute name`).

const imports = ["import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup'"];

// ─── Non hiérarchisé ─────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=571-49989', {
  props: {
    inline: figma.enum('Orientation', { Horizontal: ' inlineLayoutWhen="always"', Vertical: '' }),
    size: figma.enum('Taille', { SM: ' buttonsSize="small"', MD: '', LG: ' buttonsSize="large"' }),
  },
  example: ({ inline, size }) =>
    html`<ButtonsGroup
  buttons="[{ children: 'Premier bouton', priority: 'secondary' }, { children: 'Deuxième bouton', priority: 'secondary' }]"${inline}${size}
/>`,
  imports,
});

// ─── Hiérarchisé ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=571-49112', {
  props: {
    inline: figma.enum('Orientation', { Horizontal: ' inlineLayoutWhen="always"', Vertical: '' }),
    size: figma.enum('Taille', { SM: ' buttonsSize="small"', MD: '', LG: ' buttonsSize="large"' }),
    tertiary: figma.boolean('Bouton Tertiaire', {
      true: `, { children: 'Troisième bouton', priority: 'tertiary' }`,
      false: '',
    }),
  },
  example: ({ inline, size, tertiary }) =>
    html`<ButtonsGroup
  buttons="[{ children: 'Premier bouton' }, { children: 'Deuxième bouton', priority: 'secondary' }${tertiary}]"${inline}${size}
/>`,
  imports,
});
