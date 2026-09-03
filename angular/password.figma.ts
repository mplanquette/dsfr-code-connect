import figma, { html } from '@figma/code-connect/html';

// Mot de passe DSFR : 1 set. Thème sombre = CSS seul.
// « Nombre de caractère », « Caractère spéciale » et « Chiffres » sont des instance-swaps
// portant chacun une règle de validation : ils alimentent `validationRules`. Leur état
// (respecté / en erreur) n'est pas dérivable du design → `onError` laissé à undefined
// (affichage informatif), à câbler sur la logique de validation réelle.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16255-202687', {
  props: {
    autocomplete: figma.enum('Nouveau mot de passe', {
      True: ' autocomplete="new-password"',
      False: ' autocomplete="current-password"',
    }),
  },
  example: ({ autocomplete }) =>
    html`<dsfr-form-password
  label="Mot de passe"
  name="password"${autocomplete}
  [validationRules]="[
    { message: '12 caractères minimum' },
    { message: '1 caractère spécial minimum' },
    { message: '1 chiffre minimum' }
  ]"></dsfr-form-password>`,
  imports: ["import { DsfrFormPasswordComponent } from '@edugouvfr/ngx-dsfr'"],
});
