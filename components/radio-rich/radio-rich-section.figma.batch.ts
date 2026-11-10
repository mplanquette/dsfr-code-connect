// Bouton radio riche DSFR, set « Section » (légende « Titre de section » figée, horizontal). Le
// design ne porte aucune propriété texte pour la légende : elle reste un placeholder. Thème
// sombre = CSS seul.
// React : `options[]` est déclaré en `const options = [...]` avant le JSX puis référencé par
// `options={options}`. Vue : DsfrRadioButtonSet avec la prop `rich`.
import figma from 'figma'
import { readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const disabled = readVariantFlag(instance, 'Désactivé')

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrFormRadioRichComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-form-radio-rich
  name="radio-rich"
  legend="Titre de section"
  [inline]="true"
  [options]="[
    { label: 'Première option', value: 'option-1', hint: 'Texte de description' },
    { label: 'Deuxième option', value: 'option-2', hint: 'Texte de description' }
  ]"${disabled ? ' [disabled]="true"' : ''}></dsfr-form-radio-rich>`,
  }),
  html: () => ({
    example: figma.code`<fieldset class="fr-fieldset fr-fieldset--inline" id="radio-rich-section" aria-labelledby="radio-rich-section-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="radio-rich-section-legend">Titre de section</legend>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group fr-radio-rich">
      <input type="radio" id="radio-rich-1" name="radio-rich-section" value="option-1"${disabled ? ' disabled' : ''} />
      <label class="fr-label" for="radio-rich-1">Première option
        <span class="fr-hint-text">Texte de description</span>
      </label>
    </div>
  </div>
</fieldset>`,
  }),
  react: () => ({
    imports: ["import { RadioButtons } from '@codegouvfr/react-dsfr/RadioButtons'"],
    example: figma.code`const options = [
  { label: 'Première option', hintText: 'Texte de description', nativeInputProps: { value: 'option-1' } },
  { label: 'Deuxième option', hintText: 'Texte de description', nativeInputProps: { value: 'option-2' } }
];

<RadioButtons
  name="radio-rich"
  legend="Titre de section"
  orientation="horizontal"
  options={options}${disabled ? ' disabled' : ''}
/>`,
  }),
  vue: () => ({
    imports: ["import DsfrRadioButtonSet from '@gouvminint/vue-dsfr/DsfrRadioButtonSet.vue'"],
    example: figma.code`<DsfrRadioButtonSet
  name="radio-rich"
  legend="Titre de section"
  rich
  inline
  :options="[
    { label: 'Première option', value: 'option-1', hint: 'Texte de description' },
    { label: 'Deuxième option', value: 'option-2', hint: 'Texte de description' }
  ]"${disabled ? ' disabled' : ''}
/>`,
  }),
})

export default {
  id: 'radio-rich-section',
  ...rendered,
  metadata: { nestable: true },
}
