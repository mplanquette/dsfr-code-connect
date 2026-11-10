// Bouton radio DSFR, set « Groupe » (trois options). Thème sombre = CSS seul.
// « Message d'information » n'est pas lue : le message dépend de « État » (Valide / Erreur).
// React : `options[]` est déclaré en `const options = [...]` avant le JSX puis référencé par
// `options={options}` (RadioButtons est un wrapper de `Fieldset` piloté par `options[]`).
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const horizontal = readEnum(instance, 'Orientation', { Horizontal: true, Vertical: false })
const state = readEnum(instance, 'État', { Défaut: 'none', Valide: 'valid', Erreur: 'error' } as const)
const disabled = readVariantFlag(instance, 'Désactivé')

const rendered = renderFor(stack, {
  angular: () => {
    const severity = {
      none: '',
      valid: ` message="Texte de validation" messageSeverity="valid"`,
      error: ` message="Texte d'erreur" messageSeverity="error"`,
    }[state]
    return {
      imports: ["import { DsfrFormRadioComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-form-radio
  name="radio"
  legend="Légende du groupe"
  [options]="[
    { label: 'Première option', value: 'option-1' },
    { label: 'Deuxième option', value: 'option-2' },
    { label: 'Troisième option', value: 'option-3' }
  ]"${horizontal ? ' [inline]="true"' : ''}${disabled ? ' [disabled]="true"' : ''}${severity}></dsfr-form-radio>`,
    }
  },
  html: () => {
    const stateClass = { none: '', valid: ' fr-fieldset--valid', error: ' fr-fieldset--error' }[state]
    const disabledAttr = disabled ? ' disabled' : ''
    return {
      example: figma.code`<fieldset class="fr-fieldset${horizontal ? ' fr-fieldset--inline' : ''}${stateClass}" id="radio-group" aria-labelledby="radio-group-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="radio-group-legend">Légende du groupe</legend>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group">
      <input type="radio" id="radio-1" name="radio-group" value="option-1"${disabledAttr} />
      <label class="fr-label" for="radio-1">Première option</label>
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group">
      <input type="radio" id="radio-2" name="radio-group" value="option-2"${disabledAttr} />
      <label class="fr-label" for="radio-2">Deuxième option</label>
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group">
      <input type="radio" id="radio-3" name="radio-group" value="option-3"${disabledAttr} />
      <label class="fr-label" for="radio-3">Troisième option</label>
    </div>
  </div>
</fieldset>`,
    }
  },
  react: () => {
    const severity = {
      none: '',
      valid: ` state="success" stateRelatedMessage="Texte de validation"`,
      error: ` state="error" stateRelatedMessage="Texte d'erreur"`,
    }[state]
    return {
      imports: ["import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons'"],
      example: figma.code`const options = [
  { label: 'Première option', nativeInputProps: { value: 'option-1' } },
  { label: 'Deuxième option', nativeInputProps: { value: 'option-2' } },
  { label: 'Troisième option', nativeInputProps: { value: 'option-3' } }
];

<RadioButtons
  name="radio"
  legend="Légende du groupe"
  options={options}${horizontal ? ' orientation="horizontal"' : ''}${disabled ? ' disabled' : ''}${severity}
/>`,
    }
  },
  vue: () => {
    const severity = {
      none: '',
      valid: ` valid-message="Texte de validation"`,
      error: ` error-message="Texte d'erreur"`,
    }[state]
    return {
      imports: ["import DsfrRadioButtonSet from '@gouvminint/vue-dsfr/DsfrRadioButtonSet.vue'"],
      example: figma.code`<DsfrRadioButtonSet
  name="radio"
  legend="Légende du groupe"
  :options="[
    { label: 'Première option', value: 'option-1' },
    { label: 'Deuxième option', value: 'option-2' },
    { label: 'Troisième option', value: 'option-3' }
  ]"${horizontal ? ' inline' : ''}${disabled ? ' disabled' : ''}${severity}
/>`,
    }
  },
})

export default {
  id: 'radio-group',
  ...rendered,
  metadata: { nestable: true },
}
