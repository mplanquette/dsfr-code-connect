// Champ de saisie complet : assemble les atomes Figma imbriqués plutôt que du texte figé.
//   - « ⚙️ Varier les propriétés - Libellé » → libellé et description ;
//   - « Champ de saisie » (Éléments - Champ de saisie) → zone de texte, icône, désactivé, valeur ;
//   - « Message de formulaire » → texte du message, affiché selon « Message d'information ».
// Le nom du calque de libellé commence par une espace dans le design : conservé tel quel.
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeJsString, escapeText } from '../_shared/text'
import { elementAttributes, readInputElement, renderHtmlField } from './input-element-model'

const instance = figma.selectedInstance

const labelAtom = instance.findInstance(' ⚙️ Varier les propriétés - Libellé')
const label = labelAtom.type === 'INSTANCE' ? labelAtom.getString('Libellé') : 'Libellé du champ'
const hint = labelAtom.type === 'INSTANCE' && labelAtom.getBoolean('Description additionnel')
  ? labelAtom.getString('Texte de description additionnel')
  : ''

const element = instance.findInstance('Champ de saisie')
const elementModel = element.type === 'INSTANCE' ? readInputElement(element) : undefined

const state = readEnum(instance, 'État', { Défaut: 'info', Rempli: 'info', Erreur: 'error', Valide: 'valid' } as const)
const messageAtom = instance.findInstance('Message de formulaire')
const message = instance.getBoolean("Message d'information") && messageAtom.type === 'INSTANCE' ? messageAtom.getString('Message') : ''
const disabled = readVariantFlag(instance, 'Désactivé')

const rendered = renderFor(figma.batch.stack, {
  angular: () => {
    const severity = { info: '', error: ' messageSeverity="error"', valid: ' messageSeverity="valid"' }[state]
    return {
      imports: ["import { DsfrFormInputComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-form-input
  label="${escapeAttribute(label)}"
  name="input"${hint ? `\n  hint="${escapeAttribute(hint)}"` : ''}${elementModel ? elementAttributes.angular(elementModel) : ''}${message ? `\n  message="${escapeAttribute(message)}"${severity}` : ''}></dsfr-form-input>`,
    }
  },
  html: () => {
    const groupState = { info: '', error: ' fr-input-group--error', valid: ' fr-input-group--valid' }[state]
    const hintSpan = hint ? `\n    <span class="fr-hint-text">${escapeText(hint)}</span>` : ''
    // Le champ est rendu depuis l'élément lu ici : `aria-describedby` ne suit que l'affichage du message.
    const field = elementModel ? renderHtmlField(elementModel, Boolean(message)) : '<input class="fr-input" type="text" id="input" name="input" />'
    const messageP = message ? `\n    <p class="fr-message fr-message--${state}" id="input-messages">${escapeText(message)}</p>` : ''
    return {
      example: figma.code`<div class="fr-input-group${groupState}${disabled ? ' fr-input-group--disabled' : ''}">
  <label class="fr-label" for="input">${escapeText(label)}${hintSpan}
  </label>
  ${field}
  <div class="fr-messages-group" id="input-messages-group" aria-live="polite">${messageP}
  </div>
</div>`,
    }
  },
  react: () => {
    // react-dsfr : `state` + `stateRelatedMessage` portent le message, `hintText` la description.
    const stateProp = message ? `\n  state="${{ info: 'info', error: 'error', valid: 'success' }[state]}"\n  stateRelatedMessage="${escapeAttribute(message)}"` : ''
    const nativeProps = elementModel?.textarea ? 'nativeTextAreaProps' : 'nativeInputProps'
    const value = elementModel?.typed ? `, defaultValue: '${escapeJsString(elementModel.typed)}'` : ''
    return {
      imports: ["import { Input } from '@codegouvfr/react-dsfr/Input'"],
      example: figma.code`<Input
  label="${escapeAttribute(label)}"${hint ? `\n  hintText="${escapeAttribute(hint)}"` : ''}
  ${nativeProps}={{ name: 'input'${value} }}${elementModel ? elementAttributes.react(elementModel) : ''}${stateProp}
/>`,
    }
  },
  vue: () => {
    // DsfrInputGroup n'affiche que les messages d'erreur et de validation : un message
    // d'information passe en description (hint).
    const description = hint || (state === 'info' ? message : '')
    const messageAttr = { info: '', error: 'error-message', valid: 'valid-message' }[state]
    return {
      imports: ["import DsfrInputGroup from '@gouvminint/vue-dsfr/DsfrInputGroup.vue'"],
      example: figma.code`<DsfrInputGroup
  label="${escapeAttribute(label)}"
  name="input"${description ? `\n  hint="${escapeAttribute(description)}"` : ''}${elementModel?.typed ? `\n  model-value="${escapeAttribute(elementModel.typed)}"` : ''}${elementModel ? elementAttributes.vue(elementModel) : ''}${message && messageAttr ? `\n  ${messageAttr}="${escapeAttribute(message)}"` : ''}
/>`,
    }
  },
})

export default {
  id: 'input-field',
  ...rendered,
  metadata: { nestable: true },
}
