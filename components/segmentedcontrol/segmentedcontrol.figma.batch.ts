// Contrôle segmenté DSFR : 3 sets utiles, thème clair uniquement. Desktop et Mobile sont le même
// composant responsive : même snippet. Les composants préfixés « ⚙️ » (Élément, Desktop & Mobile,
// Mobile cas max) sont des atomes internes, non connectés. Thème sombre = CSS seul. Focus,
// Survol, Cliqué = pseudo-états, ignorés.
// Le set « cas max » (Mobile) illustre le comportement avec des libellés longs : libellés plus
// longs, aucun segment coché, légende au-dessus, sans propriété à lire.
// « Légende Horizontale » : `[inline]` (Angular), fr-segmented__legend--inline (HTML),
// `inlineLegend` (React), `inline` (Vue).
// React : `SegmentedControl` sélectionne un segment via `nativeInputProps={{ defaultChecked: true }}`
// (pas de prop `checked` de haut niveau comme `dsfr-segmented-control`) ; le tableau `segments`
// est déclaré en `const` avant le JSX dans le snippet.
// Vue : le composant de groupe vue-dsfr s'appelle `DsfrSegmentedSet` (pas `DsfrSegmented`, qui est
// l'option individuelle rendue en interne par le set via la prop `options`).
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, kind, variant } = figma.batch as { stack: string; kind: 'standard' | 'max'; variant: string }

const inline = kind === 'standard' ? readEnum(instance, 'Légende', { Horizontale: true, 'Au dessus': false }) : false
const max = kind === 'max'

// Libellés des trois segments.
const labels = max
  ? ['Première option avec un libellé long', 'Deuxième option avec un libellé long', 'Troisième option avec un libellé long']
  : ['Première option', 'Deuxième option', 'Troisième option']

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrSegmentedControlComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-segmented-control
  legend="Légende du contrôle"
  [segments]="[
    { value: 'option-1', label: '${labels[0]}'${max ? '' : ', checked: true'} },
    { value: 'option-2', label: '${labels[1]}' },
    { value: 'option-3', label: '${labels[2]}' }
  ]"${inline ? ' [inline]="true"' : ''}></dsfr-segmented-control>`,
  }),
  html: () => ({
    example: figma.code`<fieldset class="fr-segmented">
  <legend class="fr-segmented__legend${inline ? ' fr-segmented__legend--inline' : ''}">Légende du contrôle</legend>
  <div class="fr-segmented__elements">
    <div class="fr-segmented__element">
      <input value="option-1" type="radio"${max ? '' : ' checked'} id="segmented-1" name="segmented" />
      <label class="fr-label" for="segmented-1">${labels[0]}</label>
    </div>
    <div class="fr-segmented__element">
      <input value="option-2" type="radio" id="segmented-2" name="segmented" />
      <label class="fr-label" for="segmented-2">${labels[1]}</label>
    </div>
    <div class="fr-segmented__element">
      <input value="option-3" type="radio" id="segmented-3" name="segmented" />
      <label class="fr-label" for="segmented-3">${labels[2]}</label>
    </div>
  </div>
</fieldset>`,
  }),
  react: () => ({
    imports: ["import { SegmentedControl } from '@codegouvfr/react-dsfr/SegmentedControl'"],
    example: figma.code`const segments = [
  { label: '${labels[0]}'${max ? '' : ', nativeInputProps: { defaultChecked: true }'} },
  { label: '${labels[1]}' },
  { label: '${labels[2]}' }
];

<SegmentedControl
  legend="Légende du contrôle"${inline ? ' inlineLegend' : ''}
  segments={segments}
/>`,
  }),
  vue: () => ({
    imports: ["import DsfrSegmentedSet from '@gouvminint/vue-dsfr/DsfrSegmentedSet.vue'"],
    example: figma.code`<DsfrSegmentedSet
  legend="Légende du contrôle"
  model-value="option-1"
  :options="[
    { value: 'option-1', label: '${labels[0]}' },
    { value: 'option-2', label: '${labels[1]}' },
    { value: 'option-3', label: '${labels[2]}' }
  ]"${inline ? ' inline' : ''}
/>`,
  }),
})

export default {
  id: `segmentedcontrol-${variant}`,
  ...rendered,
  metadata: { nestable: true },
}
