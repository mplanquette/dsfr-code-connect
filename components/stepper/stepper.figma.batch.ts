// Indicateur d'étapes DSFR : 2 sets (Indicateur complet, Étape unitaire).
// Thème et Support (Desktop / Mobile) = CSS seul, non bindés.
// Une étape n'a pas de composant dédié : elle se pilote par `currentStep` (4 étapes au total).
// HTML : le nombre d'étapes et l'étape courante sont portés par data-fr-steps et
// data-fr-current-step, exploités par le CSS DSFR.
// Vue : API très différente de ngx-dsfr, DsfrStepper n'a pas de `totalSteps`/`currentStepTitle`/
// `nextStepTitle` séparés, il déduit tout de `steps: string[]` (titre de chaque étape) et
// `current-step` (1-indexé) : `steps[currentStep-1]` = titre courant, `steps[currentStep]` = titre
// suivant. Le tableau `steps` est donc généré pour chaque valeur de « Étapes ».
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'
import { escapeJsString } from '../_shared/text'

const instance = figma.selectedInstance
const { stack, kind } = figma.batch as { stack: string; kind: 'steps' | 'step' }

// Nombre total d'étapes et étape courante, selon le set.
const total = kind === 'steps'
  ? readEnum(instance, 'Étapes', { '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8' } as const)
  : '4'
const current = kind === 'steps' ? '1' : readEnum(instance, 'État', { Courant: '2', Défaut: '1' } as const)

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrStepperComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-stepper
  [totalSteps]="${total}"
  [currentStep]="${current}"
  currentStepTitle="Titre de l'étape courante"
  nextStepTitle="Titre de l'étape suivante"></dsfr-stepper>`,
  }),
  html: () => ({
    example: figma.code`<div class="fr-stepper">
  <h2 class="fr-stepper__title">
    Titre de l'étape courante
    <span class="fr-stepper__state">Étape ${current} sur ${total}</span>
  </h2>
  <div class="fr-stepper__steps" data-fr-current-step="${current}" data-fr-steps="${total}"></div>
  <p class="fr-stepper__details">
    <span class="fr-text--bold">Étape suivante :</span> Titre de l'étape suivante
  </p>
</div>`,
  }),
  react: () => ({
    imports: ["import { Stepper } from '@codegouvfr/react-dsfr/Stepper'"],
    example: figma.code`<Stepper
  title="Titre de l'étape courante"
  currentStep={${current}}
  stepCount={${total}}
  nextTitle="Titre de l'étape suivante"
/>`,
  }),
  vue: () => {
    const steps = Array.from({ length: Number(total) }, (_, i) => `'${escapeJsString(`Titre de l'étape ${i + 1}`)}'`).join(', ')
    return {
      imports: ["import DsfrStepper from '@gouvminint/vue-dsfr/DsfrStepper.vue'"],
      example: figma.code`<DsfrStepper :current-step="${current}" :steps="[${steps}]" />`,
    }
  },
})

export default {
  id: `stepper-${kind}`,
  ...rendered,
  metadata: { nestable: true },
}
