// Case à cocher DSFR, set « Groupe » (trois options). Thème sombre = CSS seul.
// « Message d'information » et « Description » ne sont pas lues : le message dépend de « État »
// (Valide / Erreur).
// Angular : `dsfr-fieldset` projette des `dsfr-form-checkbox` via `*fieldsetElement`.
// React : `options[]` est déclaré en `const options = [...]` avant le JSX puis référencé par
// `options={options}` (Checkbox est un wrapper de `Fieldset` piloté par `options[]`).
// Vue : DsfrCheckboxSet (autre composant que DsfrCheckbox de l'item).
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const horizontal = readEnum(instance, 'Orientation', { Horizontal: true, Vertical: false })
const disabled = readVariantFlag(instance, 'Désactivé')
const state = readEnum(instance, 'État', { Défaut: 'none', Valide: 'valid', Erreur: 'error' } as const)

const rendered = renderFor(stack, {
  angular: () => {
    const severity = {
      none: '',
      valid: ` message="Texte de validation" messageSeverity="valid"`,
      error: ` message="Texte d'erreur" messageSeverity="error"`,
    }[state]
    return {
      imports: ["import { DsfrFormCheckboxComponent, DsfrFormFieldsetComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-fieldset legend="Légende du groupe"${horizontal ? ' [inline]="true"' : ''}${disabled ? ' [disabled]="true"' : ''}${severity}>
  <dsfr-form-checkbox *fieldsetElement label="Première option"></dsfr-form-checkbox>
  <dsfr-form-checkbox *fieldsetElement label="Deuxième option"></dsfr-form-checkbox>
  <dsfr-form-checkbox *fieldsetElement label="Troisième option"></dsfr-form-checkbox>
</dsfr-fieldset>`,
    }
  },
  html: () => {
    const stateClass = { none: '', valid: ' fr-fieldset--valid', error: ' fr-fieldset--error' }[state]
    const disabledAttr = disabled ? ' disabled' : ''
    return {
      example: figma.code`<fieldset class="fr-fieldset${horizontal ? ' fr-fieldset--inline' : ''}${stateClass}" id="checkbox-group" aria-labelledby="checkbox-group-legend"${disabledAttr}>
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="checkbox-group-legend">Légende du groupe</legend>
  <div class="fr-fieldset__element">
    <div class="fr-checkbox-group">
      <input type="checkbox" id="checkbox-1" name="checkbox-group"${disabledAttr} />
      <label class="fr-label" for="checkbox-1">Première option</label>
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-checkbox-group">
      <input type="checkbox" id="checkbox-2" name="checkbox-group"${disabledAttr} />
      <label class="fr-label" for="checkbox-2">Deuxième option</label>
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
      imports: ["import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox'"],
      example: figma.code`const options = [
  { label: 'Première option', nativeInputProps: { name: 'checkbox-group' } },
  { label: 'Deuxième option', nativeInputProps: { name: 'checkbox-group' } },
  { label: 'Troisième option', nativeInputProps: { name: 'checkbox-group' } }
];

<Checkbox
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
      imports: ["import DsfrCheckboxSet from '@gouvminint/vue-dsfr/DsfrCheckboxSet.vue'"],
      example: figma.code`<DsfrCheckboxSet
  legend="Légende du groupe"
  :options="[
    { label: 'Première option', name: 'checkbox-1', value: 'option-1' },
    { label: 'Deuxième option', name: 'checkbox-2', value: 'option-2' },
    { label: 'Troisième option', name: 'checkbox-3', value: 'option-3' }
  ]"${horizontal ? ' inline' : ''}${disabled ? ' disabled' : ''}${severity}
/>`,
    }
  },
})

export default {
  id: 'checkbox-group',
  ...rendered,
  metadata: { nestable: true },
}
