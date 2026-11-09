// Case à cocher DSFR, set « Section » (légende « Titre de section » + deux options). Thème
// sombre = CSS seul.
// Angular : `dsfr-fieldset` projette des `dsfr-form-checkbox` via `*fieldsetElement`.
// React : `options[]` est déclaré en `const options = [...]` avant le JSX puis référencé par
// `options={options}`. Vue : DsfrCheckboxSet.
import figma from 'figma'
import { readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeText } from '../_shared/text'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const legend = instance.getString('Titre de section')
const disabled = readVariantFlag(instance, 'Désactivé')

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrFormCheckboxComponent, DsfrFormFieldsetComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-fieldset legend="${escapeAttribute(legend)}"${disabled ? ' [disabled]="true"' : ''}>
  <dsfr-form-checkbox *fieldsetElement label="Première option"></dsfr-form-checkbox>
  <dsfr-form-checkbox *fieldsetElement label="Deuxième option"></dsfr-form-checkbox>
</dsfr-fieldset>`,
  }),
  html: () => {
    const disabledAttr = disabled ? ' disabled' : ''
    return {
      example: figma.code`<fieldset class="fr-fieldset" id="checkbox-section" aria-labelledby="checkbox-section-legend"${disabledAttr}>
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="checkbox-section-legend">${escapeText(legend)}</legend>
  <div class="fr-fieldset__element">
    <div class="fr-checkbox-group">
      <input type="checkbox" id="checkbox-1" name="checkbox-section"${disabledAttr} />
      <label class="fr-label" for="checkbox-1">Première option</label>
    </div>
  </div>
</fieldset>`,
    }
  },
  react: () => ({
    imports: ["import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox'"],
    example: figma.code`const options = [
  { label: 'Première option', nativeInputProps: { name: 'checkbox-section' } },
  { label: 'Deuxième option', nativeInputProps: { name: 'checkbox-section' } }
];

<Checkbox
  legend="${escapeAttribute(legend)}"
  options={options}${disabled ? ' disabled' : ''}
/>`,
  }),
  vue: () => ({
    imports: ["import DsfrCheckboxSet from '@gouvminint/vue-dsfr/DsfrCheckboxSet.vue'"],
    example: figma.code`<DsfrCheckboxSet
  legend="${escapeAttribute(legend)}"
  :options="[
    { label: 'Première option', name: 'checkbox-1', value: 'option-1' },
    { label: 'Deuxième option', name: 'checkbox-2', value: 'option-2' }
  ]"${disabled ? ' disabled' : ''}
/>`,
  }),
})

export default {
  id: 'checkbox-section',
  ...rendered,
  metadata: { nestable: true },
}
