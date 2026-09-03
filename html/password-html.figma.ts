import figma, { html } from '@figma/code-connect/html';

// Mot de passe DSFR : 1 set. Thème sombre = CSS seul.
// Les instance-swaps « Nombre de caractère », « Caractère spéciale » et « Chiffres »
// alimentent la liste des règles de validation. Leur état (respecté / en erreur) n'est
// pas dérivable du design : rendu en fr-message--info, à basculer en --valid / --error
// selon la validation réelle.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16255-202687', {
  props: {
    autocomplete: figma.enum('Nouveau mot de passe', {
      True: 'new-password',
      False: 'current-password',
    }),
  },
  example: ({ autocomplete }) =>
    html`<div class="fr-password" id="password">
  <label class="fr-label" for="password-input">Mot de passe</label>
  <div class="fr-input-wrap">
    <input class="fr-password__input fr-input" aria-describedby="password-input-messages" autocomplete="${autocomplete}" autocapitalize="off" autocorrect="off" id="password-input" name="password" type="password" />
  </div>
  <div class="fr-messages-group" id="password-input-messages" aria-live="polite">
    <p class="fr-message">Votre mot de passe doit contenir :</p>
    <p class="fr-message fr-message--info">12 caractères minimum</p>
    <p class="fr-message fr-message--info">1 caractère spécial minimum</p>
    <p class="fr-message fr-message--info">1 chiffre minimum</p>
  </div>
  <div class="fr-password__checkbox fr-checkbox-group fr-checkbox-group--sm">
    <input aria-label="Afficher le mot de passe" id="password-show" type="checkbox" />
    <label class="fr-password__checkbox fr-label" for="password-show">Afficher</label>
  </div>
</div>`,
});
