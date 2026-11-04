// Élément de saisie seul (input ou textarea), sans libellé ni message : c'est la brique imbriquée
// dans « Champ de saisie », qui la lit (input-field.figma.batch.ts). Les portages n'exposent pas
// d'élément sans libellé : on montre leur composant de champ avec un libellé de remplacement, le
// champ complet lisant le vrai libellé dans le design. Focus = pseudo-état CSS, ignoré.
import figma from 'figma'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeJsString } from '../_shared/text'
import { elementAttributes, readInputElement, renderHtmlField } from './input-element-model'

const model = readInputElement(figma.selectedInstance)

const rendered = renderFor(figma.batch.stack, {
  angular: () => ({
    imports: ["import { DsfrFormInputComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-form-input label="Libellé du champ" name="input"${elementAttributes.angular(model)}></dsfr-form-input>`,
  }),
  html: () => ({ example: figma.code`${renderHtmlField(model, false)}` }),
  react: () => {
    const state = { default: '', filled: '', error: ' state="error"', valid: ' state="success"' }[model.state]
    const value = model.typed ? `, defaultValue: '${escapeJsString(model.typed)}'` : ''
    const nativeProps = model.textarea ? 'nativeTextAreaProps' : 'nativeInputProps'
    return {
      imports: ["import { Input } from '@codegouvfr/react-dsfr/Input'"],
      example: figma.code`<Input label="Libellé du champ" ${nativeProps}={{ name: 'input'${value} }}${elementAttributes.react(model)}${state} />`,
    }
  },
  vue: () => ({
    imports: ["import DsfrInputGroup from '@gouvminint/vue-dsfr/DsfrInputGroup.vue'"],
    example: figma.code`<DsfrInputGroup label="Libellé du champ" name="input"${model.typed ? ` model-value="${escapeAttribute(model.typed)}"` : ''}${elementAttributes.vue(model)} />`,
  }),
})

export default {
  id: 'input-element',
  ...rendered,
  metadata: { nestable: true },
}
