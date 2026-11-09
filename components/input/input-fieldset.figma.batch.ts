// Champ de saisie DSFR : sets Groupe et Section (jeu de champs dans un fieldset). Le champ seul et
// son élément de saisie ont leurs propres templates (input-field.figma.batch.ts,
// input-element.figma.batch.ts), qui lisent les atomes imbriqués (libellé, message).
// Focus = pseudo-état, ignoré. « Rempli » ne porte pas de sévérité de message. « Message
// d'information » (Groupe) n'est pas lu.
// Section : propriétés Figma nommées « Tire de section » (coquille) et « Disable » (nom resté en
// anglais), conservées telles quelles, vérifiées via get_design_context sur ce node
// (node-id=14823-199333). Le Groupe ne montre que deux champs, la Section n'en montre qu'un côté
// HTML et React.
// React : `Input` n'a pas de composant Fieldset générique pour grouper des <Input> : Groupe et
// Section utilisent un <fieldset> HTML brut avec des <Input /> react-dsfr à l'intérieur (même
// simplification que <dsfr-fieldset> de ngx-dsfr).
// Vue : DsfrFieldset (Groupe/Section) ne porte ni `disabled` ni classe d'état dédiés : ce sont des
// attributs HTML natifs qui retombent (fallthrough) sur la balise `<fieldset>` racine, y compris
// une classe `fr-fieldset--error`/`--valid` qui se fusionne avec la classe interne.
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeText } from '../_shared/text'

const instance = figma.selectedInstance
const { stack, kind } = figma.batch as { stack: string; kind: 'group' | 'section' }

const state = kind === 'group'
  ? readEnum(instance, 'État', { Défaut: 'none', Rempli: 'none', Erreur: 'error', Valide: 'valid' } as const)
  : 'none'
const disabled = kind === 'group' ? readVariantFlag(instance, 'Désactivé') : readVariantFlag(instance, 'Disable')
const legend = kind === 'section' ? instance.getString('Tire de section') : 'Légende du groupe'

const rendered = renderFor(stack, {
  angular: () => {
    const severity = { none: '', error: ' messageSeverity="error"', valid: ' messageSeverity="valid"' }[state]
    return {
      imports: ["import { DsfrFormInputComponent, DsfrFormFieldsetComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-fieldset legend="${escapeAttribute(legend)}"${disabled ? ' [disabled]="true"' : ''}${severity}>
  <dsfr-form-input *fieldsetElement label="Premier champ" name="input-1"></dsfr-form-input>
  <dsfr-form-input *fieldsetElement label="Deuxième champ" name="input-2"></dsfr-form-input>
</dsfr-fieldset>`,
    }
  },
  html: () => {
    const stateClass = { none: '', error: ' fr-fieldset--error', valid: ' fr-fieldset--valid' }[state]
    const dis = disabled ? ' disabled' : ''
    const second = kind === 'group'
      ? `
  <div class="fr-fieldset__element">
    <div class="fr-input-group">
      <label class="fr-label" for="input-2">Deuxième champ</label>
      <input class="fr-input" type="text" id="input-2" name="input-2"${dis} />
    </div>
  </div>`
      : ''
    return {
      example: figma.code`<fieldset class="fr-fieldset${stateClass}" id="input-${kind}" aria-labelledby="input-${kind}-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="input-${kind}-legend">${escapeText(legend)}</legend>
  <div class="fr-fieldset__element">
    <div class="fr-input-group">
      <label class="fr-label" for="input-1">Premier champ</label>
      <input class="fr-input" type="text" id="input-1" name="input-1"${dis} />
    </div>
  </div>${second}
</fieldset>`,
    }
  },
  react: () => {
    const stateClass = { none: '', error: ' fr-fieldset--error', valid: ' fr-fieldset--valid' }[state]
    const dis = disabled ? ' disabled' : ''
    const second = kind === 'group'
      ? `
  <div className="fr-fieldset__element">
    <Input label="Deuxième champ" nativeInputProps={{ name: 'input-2' }}${dis} />
  </div>`
      : ''
    return {
      imports: ["import { Input } from '@codegouvfr/react-dsfr/Input'"],
      example: figma.code`<fieldset className="fr-fieldset${stateClass}" id="input-${kind}" aria-labelledby="input-${kind}-legend">
  <legend className="fr-fieldset__legend fr-fieldset__legend--regular" id="input-${kind}-legend">${escapeText(legend)}</legend>
  <div className="fr-fieldset__element">
    <Input label="Premier champ" nativeInputProps={{ name: 'input-1' }}${dis} />
  </div>${second}
</fieldset>`,
    }
  },
  vue: () => {
    const severityClass = { none: '', error: ' class="fr-fieldset--error"', valid: ' class="fr-fieldset--valid"' }[state]
    return {
      imports: [
        "import DsfrInput from '@gouvminint/vue-dsfr/DsfrInput.vue'",
        "import DsfrFieldset from '@gouvminint/vue-dsfr/DsfrFieldset.vue'",
      ],
      example: figma.code`<DsfrFieldset legend="${escapeAttribute(legend)}"${disabled ? ' disabled' : ''}${severityClass}>
  <DsfrInput label="Premier champ" name="input-1" />
  <DsfrInput label="Deuxième champ" name="input-2" />
</DsfrFieldset>`,
    }
  },
})

export default {
  id: `input-${kind}`,
  ...rendered,
  metadata: { nestable: true },
}
