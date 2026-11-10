// Mot de passe DSFR : 1 set. Thème sombre = CSS seul.
// « Nombre de caractère », « Caractère spéciale » et « Chiffres » sont des instance-swaps portant
// chacun une règle de validation : ils alimentent la liste des règles (`validationRules` côté
// Angular, `messages[]` côté React, liste de fr-message en HTML et Vue). Leur état (respecté / en
// erreur) n'est pas dérivable du design : Angular laisse `onError` à undefined (affichage
// informatif), HTML, React et Vue rendent `info`, à basculer en valid/error selon la validation
// réelle. Le libellé (atome « Label ») et le texte de chaque règle (propriété « Message » de
// l'instance échangée) sont lus dans le design. « Mot de passe en clair » n'est pas lu : c'est la
// valeur saisie affichée en clair dans la maquette, sans place dans le code.
// React : `nativeInputProps` et `messages[]` sont déclarés en `const` avant le JSX puis référencés
// par leur identifiant.
// Vue : pas de composant `DsfrPassword` dédié dans @gouvminint/vue-dsfr (vérifié : ni
// `DsfrPassword`, ni `DsfrInputPassword` dans le repo source) : markup DSFR brut, comme en HTML.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeJsString, escapeText } from '../_shared/text'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const autocomplete = readEnum(instance, 'Nouveau mot de passe', { True: 'new-password', False: 'current-password' } as const)

const labelAtom = instance.findInstance('Label')
const label = labelAtom.type === 'INSTANCE' ? labelAtom.getString('Libellé') : 'Mot de passe'

/** Règles de validation : propriété d'échange du design et texte de repli si l'instance manque. */
const RULES: [string, string][] = [
  ['Nombre de caractère', '12 caractères minimum'],
  ['Caractère spéciale', '1 caractère spécial minimum'],
  ['Chiffres', '1 chiffre minimum'],
]
const rules = RULES.map(([swapProperty, fallback]) => {
  const rule = instance.getInstanceSwap(swapProperty)
  return rule?.type === 'INSTANCE' ? rule.getString('Message') : fallback
})

const markup = figma.code`<div class="fr-password" id="password">
  <label class="fr-label" for="password-input">${escapeText(label)}</label>
  <div class="fr-input-wrap">
    <input class="fr-password__input fr-input" aria-describedby="password-input-messages" autocomplete="${autocomplete}" autocapitalize="off" autocorrect="off" id="password-input" name="password" type="password" />
  </div>
  <div class="fr-messages-group" id="password-input-messages" aria-live="polite">
    <p class="fr-message">Votre mot de passe doit contenir :</p>
${rules.map((rule) => `    <p class="fr-message fr-message--info">${escapeText(rule)}</p>\n`).join('')}  </div>
  <div class="fr-password__checkbox fr-checkbox-group fr-checkbox-group--sm">
    <input aria-label="Afficher le mot de passe" id="password-show" type="checkbox" />
    <label class="fr-password__checkbox fr-label" for="password-show">Afficher</label>
  </div>
</div>`

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrFormPasswordComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-form-password
  label="${escapeAttribute(label)}"
  name="password" autocomplete="${autocomplete}"
  [validationRules]="[
${rules.map((rule) => `    { message: '${escapeAttribute(escapeJsString(rule))}' }`).join(',\n')}
  ]"></dsfr-form-password>`,
  }),
  html: () => ({ example: markup }),
  react: () => ({
    imports: ["import { PasswordInput } from '@codegouvfr/react-dsfr/blocks/PasswordInput'"],
    example: figma.code`const nativeInputProps = { autoComplete: '${autocomplete}' };
const messages = [
${rules.map((rule) => `  { severity: 'info', message: '${escapeJsString(rule)}' }`).join(',\n')}
];

<PasswordInput
  label="${escapeAttribute(label)}"
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
