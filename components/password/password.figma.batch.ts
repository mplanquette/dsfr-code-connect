// Mot de passe DSFR : 1 set. Thème sombre = CSS seul.
// « Nombre de caractère », « Caractère spéciale » et « Chiffres » sont des instance-swaps portant
// chacun une règle de validation : ils alimentent la liste des règles (`validationRules` côté
// Angular, `messages[]` côté React, liste de fr-message en HTML et Vue). Leur état (respecté / en
// erreur) n'est pas dérivable du design : Angular laisse `onError` à undefined (affichage
// informatif), HTML, React et Vue rendent `info`, à basculer en valid/error selon la validation
// réelle.
// React : `nativeInputProps` et `messages[]` sont déclarés en `const` avant le JSX puis référencés
// par leur identifiant.
// Vue : pas de composant `DsfrPassword` dédié dans @gouvminint/vue-dsfr (vérifié : ni
// `DsfrPassword`, ni `DsfrInputPassword` dans le repo source) : markup DSFR brut, comme en HTML.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const autocomplete = readEnum(instance, 'Nouveau mot de passe', { True: 'new-password', False: 'current-password' } as const)

const markup = figma.code`<div class="fr-password" id="password">
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
</div>`

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrFormPasswordComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-form-password
  label="Mot de passe"
  name="password" autocomplete="${autocomplete}"
  [validationRules]="[
    { message: '12 caractères minimum' },
    { message: '1 caractère spécial minimum' },
    { message: '1 chiffre minimum' }
  ]"></dsfr-form-password>`,
  }),
  html: () => ({ example: markup }),
  react: () => ({
    imports: ["import { PasswordInput } from '@codegouvfr/react-dsfr/blocks/PasswordInput'"],
    example: figma.code`const nativeInputProps = { autoComplete: '${autocomplete}' };
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
  }),
  vue: () => ({ example: markup }),
})

export default {
  id: 'password',
  ...rendered,
  metadata: { nestable: true },
}
