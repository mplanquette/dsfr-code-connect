// Bouton radio DSFR, set « Section » (légende + deux options). Thème sombre = CSS seul.
// La propriété Figma est nommée « Tire de section » (coquille côté design, conservée telle
// quelle : c'est le vrai nom de la propriété).
// React : `options[]` est déclaré en `const options = [...]` avant le JSX puis référencé par
// `options={options}`.
import figma from 'figma'
import { readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeText } from '../_shared/text'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const legend = instance.getString('Tire de section')
const disabled = readVariantFlag(instance, 'Désactivé')

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrFormRadioComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-form-radio
  name="radio"
  legend="${escapeAttribute(legend)}"
  [options]="[
    { label: 'Première option', value: 'option-1' },
    { label: 'Deuxième option', value: 'option-2' }
  ]"${disabled ? ' [disabled]="true"' : ''}></dsfr-form-radio>`,
  }),
  html: () => {
    const disabledAttr = disabled ? ' disabled' : ''
    return {
      example: figma.code`<fieldset class="fr-fieldset" id="radio-section" aria-labelledby="radio-section-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="radio-section-legend">${escapeText(legend)}</legend>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group">
      <input type="radio" id="radio-1" name="radio-section" value="option-1"${disabledAttr} />
      <label class="fr-label" for="radio-1">Première option</label>
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group">
      <input type="radio" id="radio-2" name="radio-section" value="option-2"${disabledAttr} />
      <label class="fr-label" for="radio-2">Deuxième option</label>
    </div>
  </div>
</fieldset>`,
    }
  },
  react: () => ({
    imports: ["import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons'"],
    example: figma.code`const options = [
  { label: 'Première option', nativeInputProps: { value: 'option-1' } },
  { label: 'Deuxième option', nativeInputProps: { value: 'option-2' } }
];

<RadioButtons
  name="radio"
  legend="${escapeAttribute(legend)}"
  options={options}${disabled ? ' disabled' : ''}
/>`,
  }),
  vue: () => ({
    imports: ["import DsfrRadioButtonSet from '@gouvminint/vue-dsfr/DsfrRadioButtonSet.vue'"],
    example: figma.code`<DsfrRadioButtonSet
  name="radio"
  legend="${escapeAttribute(legend)}"
  :options="[
    { label: 'Première option', value: 'option-1' },
    { label: 'Deuxième option', value: 'option-2' }
  ]"${disabled ? ' disabled' : ''}
/>`,
  }),
})

export default {
  id: 'radio-section',
  ...rendered,
  metadata: { nestable: true },
}
