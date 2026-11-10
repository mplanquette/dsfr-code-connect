// Case à cocher DSFR, set « Item ». Les sets « 🚫 / SM » et « 🚫 / MD » sont des atomes internes
// Figma (la case seule), jamais utilisés tels quels par un dev : non connectés.
// Thème sombre = CSS seul : non connecté. Focus et Survol = pseudo-états : ignorés.
// « Message d'information » (booléen Figma) est couvert par « Validation » qui porte déjà le
// message et sa sévérité : non bindé séparément pour ne pas dupliquer l'attribut.
// « Indéterminée » (ajouté en DSFR 1.15) :
//   - Angular : input [indeterminate], disponible depuis ngx-dsfr 1.4 ;
//   - HTML : pas d'attribut, `indeterminate` est une propriété JS pure sur l'élément, à
//     positionner en script (`el.indeterminate = true`) ;
//   - React : react-dsfr ne l'expose pas nativement (propriété DOM pure, il faudrait un ref
//     callback `nativeInputProps={{ ref: el => { if (el) el.indeterminate = true } }}`) : non
//     bindé pour rester lisible en Dev Mode, à câbler par le dev si besoin ;
//   - Vue : DsfrCheckbox n'expose pas de prop `indeterminate` : non bindable.
// React : Checkbox est un wrapper de `Fieldset` piloté par `options[]` (voir
// src/shared/Fieldset.tsx), pas de composant « case isolée » : `options[]` est déclaré en
// `const options = [...]` avant le JSX puis référencé par `options={options}`.
// Vue : `modelValue` est un tableau requis par DsfrCheckbox : on bascule entre `[]` et
// `['option-1']` pour représenter Coché/Décoché plutôt que d'exposer une prop `checked`
// (déclarée dans le type mais non branchée dans le template du composant).
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const small = readEnum(instance, 'Taille', { SM: true, MD: false })
const checked = readVariantFlag(instance, 'Coché')
const indeterminate = readVariantFlag(instance, 'Indéterminée')
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
      imports: ["import { DsfrFormCheckboxComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-form-checkbox label="Libellé case à cocher"${small ? ' [small]="true"' : ''}${checked ? ' [value]="true"' : ''}${indeterminate ? ' [indeterminate]="true"' : ''}${disabled ? ' [disabled]="true"' : ''}${message}></dsfr-form-checkbox>`,
    }
  },
  html: () => {
    const stateClass = { none: '', valid: ' fr-checkbox-group--valid', error: ' fr-checkbox-group--error' }[validation]
    const message = {
      none: '',
      valid: `\n    <p class="fr-message fr-message--valid" id="checkbox-messages">Texte de validation</p>`,
      error: `\n    <p class="fr-message fr-message--error" id="checkbox-messages">Texte d'erreur</p>`,
    }[validation]
    const script = indeterminate ? `\n  <script>document.getElementById('checkbox').indeterminate = true;</script>` : ''
    return {
      example: figma.code`<div class="fr-checkbox-group${small ? ' fr-checkbox-group--sm' : ''}${stateClass}">
  <input type="checkbox" id="checkbox" name="checkbox"${checked ? ' checked' : ''}${disabled ? ' disabled' : ''} />
  <label class="fr-label" for="checkbox">Libellé case à cocher</label>
  <div class="fr-messages-group" id="checkbox-messages-group" aria-live="polite">${message}
  </div>
</div>${script}`,
    }
  },
  react: () => {
    const state = {
      none: '',
      valid: ` state="success" stateRelatedMessage="Texte de validation"`,
      error: ` state="error" stateRelatedMessage="Texte d'erreur"`,
    }[validation]
    return {
      imports: ["import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox'"],
      example: figma.code`const options = [{ label: 'Libellé case à cocher', nativeInputProps: { name: 'checkbox'${checked ? ', defaultChecked: true' : ''} } }];

<Checkbox
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
      imports: ["import DsfrCheckbox from '@gouvminint/vue-dsfr/DsfrCheckbox.vue'"],
      example: figma.code`<DsfrCheckbox
  label="Libellé case à cocher"
  name="checkbox"
  value="option-1"${small ? ' small' : ''}${checked ? ` :model-value="['option-1']"` : ' :model-value="[]"'}${disabled ? ' disabled' : ''}${message}
/>`,
    }
  },
})

export default {
  id: 'checkbox-item',
  ...rendered,
  metadata: { nestable: true },
}
