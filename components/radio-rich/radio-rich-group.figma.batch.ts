// Bouton radio riche DSFR, set « Groupe » (deux options, horizontal). Thème sombre = CSS seul.
// « Message d'information » n'est pas lue : le message dépend de « État » (Valide / Erreur).
// React : `options[]` est déclaré en `const options = [...]` avant le JSX puis référencé par
// `options={options}` (cf. radio-rich-item.figma.batch.ts pour la détection du mode riche).
// Vue : DsfrRadioButtonSet avec la prop `rich`.
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const state = readEnum(instance, 'État', { Default: 'none', Valide: 'valid', Erreur: 'error' } as const)
const disabled = readVariantFlag(instance, 'Désactivé')

const rendered = renderFor(stack, {
  angular: () => {
    const severity = {
      none: '',
      valid: ` message="Texte de validation" messageSeverity="valid"`,
      error: ` message="Texte d'erreur" messageSeverity="error"`,
    }[state]
    return {
      imports: ["import { DsfrFormRadioRichComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-form-radio-rich
  name="radio-rich"
  legend="Légende du groupe"
  [inline]="true"
  [options]="[
    { label: 'Première option', value: 'option-1', hint: 'Texte de description' },
    { label: 'Deuxième option', value: 'option-2', hint: 'Texte de description' }
  ]"${disabled ? ' [disabled]="true"' : ''}${severity}></dsfr-form-radio-rich>`,
    }
  },
  html: () => {
    const stateClass = { none: '', valid: ' fr-fieldset--valid', error: ' fr-fieldset--error' }[state]
    const disabledAttr = disabled ? ' disabled' : ''
    return {
      example: figma.code`<fieldset class="fr-fieldset fr-fieldset--inline${stateClass}" id="radio-rich-group" aria-labelledby="radio-rich-group-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="radio-rich-group-legend">Légende du groupe</legend>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group fr-radio-rich">
      <input type="radio" id="radio-rich-1" name="radio-rich-group" value="option-1"${disabledAttr} />
      <label class="fr-label" for="radio-rich-1">Première option
        <span class="fr-hint-text">Texte de description</span>
      </label>
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group fr-radio-rich">
      <input type="radio" id="radio-rich-2" name="radio-rich-group" value="option-2"${disabledAttr} />
      <label class="fr-label" for="radio-rich-2">Deuxième option
        <span class="fr-hint-text">Texte de description</span>
      </label>
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
  { label: 'Première option', hintText: 'Texte de description', nativeInputProps: { value: 'option-1' } },
  { label: 'Deuxième option', hintText: 'Texte de description', nativeInputProps: { value: 'option-2' } }
];

<RadioButtons
  name="radio-rich"
  legend="Légende du groupe"
  orientation="horizontal"
  options={options}${disabled ? ' disabled' : ''}${severity}
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
  name="radio-rich"
  legend="Légende du groupe"
  rich
  inline
  :options="[
    { label: 'Première option', value: 'option-1', hint: 'Texte de description' },
    { label: 'Deuxième option', value: 'option-2', hint: 'Texte de description' }
  ]"${disabled ? ' disabled' : ''}${severity}
/>`,
    }
  },
})

export default {
  id: 'radio-rich-group',
  ...rendered,
  metadata: { nestable: true },
}
