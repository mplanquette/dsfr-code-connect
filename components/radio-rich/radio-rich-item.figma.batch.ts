// Bouton radio riche DSFR, set « Item ». Focus et Survol = pseudo-états : ignorés. Thème sombre =
// CSS seul. « Illustration » est un instance-swap non code-connecté (pictogrammes DSFR) : on ne
// le lit pas, un placeholder de chemin de pictogramme (system.svg) est posé quand « Pictogramme »
// est actif, à remplacer par l'asset réel.
// React : pas de composant radio riche dédié, `RadioButtons` (wrapper de `Fieldset`, voir
// src/shared/Fieldset.tsx) détecte automatiquement la variante riche dès qu'une `option` porte
// une prop `illustration` (ReactNode), sans prop de mode explicite. `options[]` est déclaré en
// `const options = [...]` avant le JSX puis référencé par `options={options}`.
// Vue : DsfrRadioButtonSet expose une prop `rich` qui bascule l'ensemble en mode riche, les
// pictogrammes étant portés par `img`/`svgPath`/`imgTitle` sur chaque option.
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const checked = readVariantFlag(instance, 'Coché')
const disabled = readVariantFlag(instance, 'Désactivé')
const pictogram = instance.getBoolean('Pictogramme')
const validation = readEnum(instance, 'Validation', { Default: 'none', Valide: 'valid', Erreur: 'error' } as const)

const rendered = renderFor(stack, {
  angular: () => {
    const artwork = pictogram ? `, artworkFilePath: 'assets/artwork/pictograms/system/system.svg'` : ''
    const message = {
      none: '',
      valid: ` message="Texte de validation" messageSeverity="valid"`,
      error: ` message="Texte d'erreur" messageSeverity="error"`,
    }[validation]
    return {
      imports: ["import { DsfrFormRadioRichComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-form-radio-rich
  name="radio-rich"
  legend="Légende du champ"
  [options]="[{ label: 'Libellé bouton radio', value: 'option-1', hint: 'Texte de description'${artwork} }]"${checked ? ' value="option-1"' : ''}${disabled ? ' [disabled]="true"' : ''}${message}></dsfr-form-radio-rich>`,
    }
  },
  html: () => {
    const stateClass = { none: '', valid: ' fr-fieldset--valid', error: ' fr-fieldset--error' }[validation]
    const pictogramBlock = pictogram
      ? `\n      <div class="fr-radio-rich__pictogram">\n        <svg aria-hidden="true" class="fr-artwork" viewBox="0 0 80 80" width="80px" height="80px">\n          <use class="fr-artwork-decorative" href="/artwork/pictograms/system/system.svg#artwork-decorative"></use>\n          <use class="fr-artwork-minor" href="/artwork/pictograms/system/system.svg#artwork-minor"></use>\n          <use class="fr-artwork-major" href="/artwork/pictograms/system/system.svg#artwork-major"></use>\n        </svg>\n      </div>`
      : ''
    return {
      example: figma.code`<fieldset class="fr-fieldset${stateClass}" id="radio-rich" aria-labelledby="radio-rich-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="radio-rich-legend">Légende du champ</legend>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group fr-radio-rich">
      <input type="radio" id="radio-rich-1" name="radio-rich" value="option-1"${checked ? ' checked' : ''}${disabled ? ' disabled' : ''} />
      <label class="fr-label" for="radio-rich-1">Libellé bouton radio
        <span class="fr-hint-text">Texte de description</span>
      </label>${pictogramBlock}
    </div>
  </div>
</fieldset>`,
    }
  },
  react: () => {
    const illustration = pictogram ? `, illustration: <img src='/artwork/pictograms/system/system.svg' alt='' aria-hidden='true' />` : ''
    const state = {
      none: '',
      valid: ` state="success" stateRelatedMessage="Texte de validation"`,
      error: ` state="error" stateRelatedMessage="Texte d'erreur"`,
    }[validation]
    return {
      imports: ["import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons'"],
      example: figma.code`const options = [{ label: 'Libellé bouton radio', hintText: 'Texte de description', nativeInputProps: { value: 'option-1'${checked ? ', defaultChecked: true' : ''} }${illustration} }];

<RadioButtons
  name="radio-rich"
  legend="Légende du champ"
  options={options}${disabled ? ' disabled' : ''}${state}
/>`,
    }
  },
  vue: () => {
    const artwork = pictogram ? `, img: '/pictograms/system/system.svg', imgTitle: 'Illustration'` : ''
    const message = {
      none: '',
      valid: ` valid-message="Texte de validation"`,
      error: ` error-message="Texte d'erreur"`,
    }[validation]
    return {
      imports: ["import DsfrRadioButtonSet from '@gouvminint/vue-dsfr/DsfrRadioButtonSet.vue'"],
      example: figma.code`<DsfrRadioButtonSet
  name="radio-rich"
  legend="Légende du champ"
  rich
  :options="[{ label: 'Libellé bouton radio', value: 'option-1', hint: 'Texte de description'${artwork} }]"${checked ? ' model-value="option-1"' : ''}${disabled ? ' disabled' : ''}${message}
/>`,
    }
  },
})

export default {
  id: 'radio-rich-item',
  ...rendered,
  metadata: { nestable: true },
}
