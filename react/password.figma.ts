import figma, { html } from '@figma/code-connect/html';

// Mot de passe DSFR : 1 set, même mapping que angular/password.figma.ts et
// html/password-html.figma.ts. Thème sombre = CSS seul.
// Les instance-swaps « Nombre de caractère », « Caractère spéciale » et « Chiffres »
// alimentent `messages[]`. Leur état (respecté / en erreur) n'est pas dérivable du
// design : rendu en `severity: 'info'`, à basculer en 'valid'/'error' selon la
// validation réelle (même simplification que html/).
// `nativeInputProps` et `messages[]` : déclarés en `const` avant le JSX (comme
// breadcrumb.figma.ts) puis référencés en `nativeInputProps={nativeInputProps}` /
// `messages={messages}`, plutôt qu'en valeur d'attribut multiligne inline, le parser
// Code Connect (HTML générique) interprète toute valeur d'attribut multiligne
// contenant plusieurs objets comme une liste d'attributs HTML et lève une erreur
// « Duplicate attribute name » (severity/message se répètent entre les 3 objets).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16255-202687', {
  props: {
    autocomplete: figma.enum('Nouveau mot de passe', {
      True: `{ autoComplete: 'new-password' }`,
      False: `{ autoComplete: 'current-password' }`,
    }),
  },
  example: ({ autocomplete }) =>
    html`const nativeInputProps = ${autocomplete};
const messages = [
  { severity: 'info', message: '12 caractères minimum' },
  { severity: 'info', message: '1 caractère spécial minimum' },
  { severity: 'info', message: '1 chiffre minimum' }
];

<PasswordInput
  label="Mot de passe"
  nativeInputProps={nativeInputProps}
  messages={messages}
/>`,
  imports: ["import { PasswordInput } from '@codegouvfr/react-dsfr/blocks/PasswordInput'"],
});
