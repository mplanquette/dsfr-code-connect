// Bouton radio DSFR, set « Item ». Les sets « 🚫 / SM » et « 🚫 / MD » sont des atomes internes
// Figma : non connectés. Thème sombre = CSS seul. Focus = pseudo-état : ignoré.
// Angular : ngx-dsfr n'expose pas de radio unitaire, un radio isolé se déclare avec un seul
// élément dans `options`, d'où le même composant pour l'item et le groupe.
// React : RadioButtons est un wrapper de `Fieldset` (type="radio") piloté par `options[]` (voir
// src/shared/Fieldset.tsx), pas de composant radio isolé. `options[]` est déclaré en
// `const options = [...]` avant le JSX puis référencé par `options={options}`.
// Vue : vue-dsfr expose un DsfrRadioButton unitaire, mais sans message d'erreur/validation
// (uniquement porté par DsfrRadioButtonSet) : comme côté Angular, on utilise DsfrRadioButtonSet
// avec un seul élément dans `options`, afin de garder « Validation » bindable.
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const small = readEnum(instance, 'Taille', { SM: true, MD: false })
const checked = readVariantFlag(instance, 'Coché')
const disabled = readVariantFlag(instance, 'Désactivé')
const validation = readEnum(instance, 'Validation', { Aucune: 'none', Valide: 'valid', Erreur: 'error' } as const)

const rendered = renderFor(stack, {
  angular: () => {
    const message = {
      none: '',
      valid: ` message="Texte de validation" messageSeverity="valid"`,
      error: ` message="Texte d'erreur" messageSeverity="error"`,
    }[validation]
    return {
      imports: ["import { DsfrFormRadioComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-form-radio
  name="radio"
  legend="Légende du champ"
  [options]="[{ label: 'Libellé bouton radio', value: 'option-1' }]"${small ? ' [small]="true"' : ''}${checked ? ' value="option-1"' : ''}${disabled ? ' [disabled]="true"' : ''}${message}></dsfr-form-radio>`,
    }
  },
  html: () => {
    const stateClass = { none: '', valid: ' fr-fieldset--valid', error: ' fr-fieldset--error' }[validation]
    return {
      example: figma.code`<fieldset class="fr-fieldset${stateClass}" id="radio" aria-labelledby="radio-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="radio-legend">Légende du champ</legend>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group${small ? ' fr-radio-group--sm' : ''}">
      <input type="radio" id="radio-1" name="radio" value="option-1"${checked ? ' checked' : ''}${disabled ? ' disabled' : ''} />
      <label class="fr-label" for="radio-1">Libellé bouton radio</label>
    </div>
  </div>
</fieldset>`,
    }
  },
  react: () => {
    const state = {
      none: '',
      valid: ` state="success" stateRelatedMessage="Texte de validation"`,
      error: ` state="error" stateRelatedMessage="Texte d'erreur"`,
    }[validation]
    return {
      imports: ["import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons'"],
      example: figma.code`const options = [{ label: 'Libellé bouton radio', nativeInputProps: { value: 'option-1'${checked ? ', defaultChecked: true' : ''} } }];

<RadioButtons
  name="radio"
  legend="Légende du champ"
  options={options}${small ? ' small' : ''}${disabled ? ' disabled' : ''}${state}
/>`,
    }
  },
  vue: () => {
    const message = {
      none: '',
      valid: ` valid-message="Texte de validation"`,
      error: ` error-message="Texte d'erreur"`,
    }[validation]
    return {
      imports: ["import DsfrRadioButtonSet from '@gouvminint/vue-dsfr/DsfrRadioButtonSet.vue'"],
      example: figma.code`<DsfrRadioButtonSet
  name="radio"
  legend="Légende du champ"
  :options="[{ label: 'Libellé bouton radio', value: 'option-1' }]"${small ? ' small' : ''}${checked ? ' model-value="option-1"' : ''}${disabled ? ' disabled' : ''}${message}
/>`,
    }
  },
})

export default {
  id: 'radio-item',
  ...rendered,
  metadata: { nestable: true },
}
