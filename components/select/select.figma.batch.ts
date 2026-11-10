// Liste déroulante DSFR : 1 set, quatre stacks. Thème sombre = CSS seul.
// « État » et « Désactivé » se recoupent (État=Désactivé duplique Désactivé=True) : « État » porte
// la sévérité du message (et la classe de groupe en HTML), « Désactivé » porte l'attribut disabled.
// « Message d'information » et « Description » ne sont pas lues (aucun effet sur le markup).
// React : composant stable `Select` retenu plutôt que `SelectNext` (variante plus récente mais non
// désignée comme remplacement recommandé dans le README react-dsfr à ce jour). `nativeSelectProps`
// est déclaré en constante avant le JSX.
// Vue : DsfrSelect utilise `success-message` / `error-message` (pas de `messageSeverity` unique).
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const disabled = readVariantFlag(instance, 'Désactivé')
const state = readEnum(instance, 'État', {
  Défaut: 'default',
  Succès: 'valid',
  Erreur: 'error',
  Désactivé: 'disabled',
} as const)

const rendered = renderFor(stack, {
  angular: () => {
    const message = { default: '', disabled: '', valid: ` message="Texte de validation" messageSeverity="valid"`, error: ` message="Texte d'erreur" messageSeverity="error"` }[state]
    return {
      imports: ["import { DsfrFormSelectComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-form-select
  label="Libellé de la liste déroulante"
  name="select"
  [options]="[
    { label: 'Première option', value: 'option-1' },
    { label: 'Deuxième option', value: 'option-2' },
    { label: 'Troisième option', value: 'option-3' }
  ]"${disabled ? ' [disabled]="true"' : ''}${message}></dsfr-form-select>`,
    }
  },
  html: () => {
    const stateClass = { default: '', valid: ' fr-select-group--valid', error: ' fr-select-group--error', disabled: ' fr-select-group--disabled' }[state]
    const message = {
      default: '',
      disabled: '',
      valid: `\n    <p class="fr-message fr-message--valid" id="select-message">Texte de validation</p>`,
      error: `\n    <p class="fr-message fr-message--error" id="select-message">Texte d'erreur</p>`,
    }[state]
    return {
      example: figma.code`<div class="fr-select-group${stateClass}">
  <label class="fr-label" for="select">Libellé de la liste déroulante</label>
  <select class="fr-select" id="select" name="select"${disabled ? ' disabled' : ''}>
    <option value="" selected disabled hidden>Sélectionner une option</option>
    <option value="option-1">Première option</option>
    <option value="option-2">Deuxième option</option>
    <option value="option-3">Troisième option</option>
  </select>
  <div class="fr-messages-group" id="select-messages" aria-live="polite">${message}
  </div>
</div>`,
    }
  },
  react: () => {
    const severity = { default: '', disabled: '', valid: ` state="success" stateRelatedMessage="Texte de validation"`, error: ` state="error" stateRelatedMessage="Texte d'erreur"` }[state]
    return {
      imports: ["import { Select } from '@codegouvfr/react-dsfr/Select'"],
      example: figma.code`const nativeSelectProps = { name: 'select' };

<Select
  label="Libellé de la liste déroulante"
  nativeSelectProps={nativeSelectProps}${disabled ? ' disabled' : ''}${severity}
>
  <option value="" selected disabled hidden>Sélectionner une option</option>
  <option value="option-1">Première option</option>
  <option value="option-2">Deuxième option</option>
  <option value="option-3">Troisième option</option>
</Select>`,
    }
  },
  vue: () => {
    const severity = { default: '', disabled: '', valid: ` success-message="Texte de validation"`, error: ` error-message="Texte d'erreur"` }[state]
    return {
      imports: ["import DsfrSelect from '@gouvminint/vue-dsfr/DsfrSelect.vue'"],
      example: figma.code`<DsfrSelect
  label="Libellé de la liste déroulante"
  name="select"
  :options="[
    { text: 'Première option', value: 'option-1' },
    { text: 'Deuxième option', value: 'option-2' },
    { text: 'Troisième option', value: 'option-3' }
  ]"${disabled ? ' disabled' : ''}${severity}
/>`,
    }
  },
})

export default {
  id: 'select',
  ...rendered,
  metadata: { nestable: true },
}
