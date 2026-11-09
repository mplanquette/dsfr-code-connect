// Mise en exergue DSFR : 1 set. Thème et Support = CSS seul.
// React : `Highlight.size` = "sm" | "lg" (pas de valeur pour MD, qui est l'absence de prop).
// Vue : `DsfrHighlight` n'a que deux booléens `small`/`large` (pas de `textSize` à 3 valeurs) :
// MD = aucun des deux.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance

const size = readEnum(instance, 'Taille', { SM: 'SM', MD: 'MD', LG: 'LG' } as const)

const rendered = renderFor(figma.batch.stack, {
  angular: () => ({
    imports: ["import { DsfrHighlightComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-highlight text="Texte de la mise en exergue."${{ SM: ' textSize="SM"', MD: '', LG: ' textSize="LG"' }[size]}></dsfr-highlight>`,
  }),
  html: () => ({
    example: figma.code`<div class="fr-highlight">
  <p class="${{ SM: ' fr-text--sm', MD: '', LG: ' fr-text--lg' }[size]}">Texte de la mise en exergue.</p>
</div>`,
  }),
  react: () => ({
    imports: ["import { Highlight } from '@codegouvfr/react-dsfr/Highlight'"],
    example: figma.code`<Highlight bodyAs="p"${{ SM: ' size="sm"', MD: '', LG: ' size="lg"' }[size]}>Texte de la mise en exergue.</Highlight>`,
  }),
  vue: () => ({
    imports: ["import DsfrHighlight from '@gouvminint/vue-dsfr/DsfrHighlight.vue'"],
    example: figma.code`<DsfrHighlight text="Texte de la mise en exergue."${{ SM: ' small', MD: '', LG: ' large' }[size]} />`,
  }),
})

export default {
  id: 'highlight',
  ...rendered,
  metadata: { nestable: true },
}
