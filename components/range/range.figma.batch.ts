// Curseur DSFR : 3 sets utiles (simple, double, cranté), `kind` vient de l'entrée du set dans
// range.json. Les composants préfixés « ⚙️ » (Poignée, Piste, Plage sélectionnée, Cran, Valeur
// min-max) sont des atomes internes assemblés par ces 3 sets : non connectés individuellement.
// Coquille de design conservée telle quelle : « Défault » et « désactivé ».
// « Voir message » n'est pas lue : le message dépend de « État » (Erreur / Valide).
// Vue : DsfrRange n'a qu'un seul `message`, toujours rendu en `fr-message--error` (pas de
// variante « valide » comme messageSeverity côté Angular/HTML) : « Valide » ne produit donc
// aucun message, seule « Erreur » en affiche un. Curseur double : géré nativement par
// `modelValue` (poignée haute) + `lowerValue` (poignée basse), pas par un tableau de deux
// valeurs comme côté Angular.
// React : `nativeInputProps` est déclaré en `const` avant le JSX puis référencé par son
// identifiant.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, kind } = figma.batch as { stack: string; kind: 'simple' | 'double' | 'step' }

const state = readEnum(instance, 'État', { Défault: 'default', Erreur: 'error', Valide: 'valid', désactivé: 'disabled' } as const)

const rendered = renderFor(stack, {
  angular: () => {
    const disabled = state === 'disabled' ? ' [disabled]="true"' : ''
    const severity = { default: '', disabled: '', error: ` message="Texte d'erreur" messageSeverity="error"`, valid: ` message="Texte de validation" messageSeverity="valid"` }[state]
    const bounds = { simple: '[min]="0" [max]="100" [value]="50"', double: '[min]="0" [max]="100" [value]="[25, 75]"', step: '[min]="0" [max]="100" [step]="25" [value]="50"' }[kind]
    return {
      imports: ["import { DsfrRangeComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-range label="Libellé du curseur" ${bounds}${disabled}${severity}></dsfr-range>`,
    }
  },
  html: () => {
    const stateClass = { default: '', disabled: ' fr-range-group--disabled', error: ' fr-range-group--error', valid: ' fr-range-group--valid' }[state]
    const disabled = state === 'disabled' ? ' disabled' : ''
    const message = {
      default: '',
      disabled: '',
      error: `\n    <p class="fr-message fr-message--error" id="range-messages">Texte d'erreur</p>`,
      valid: `\n    <p class="fr-message fr-message--valid" id="range-messages">Texte de validation</p>`,
    }[state]
    const field = {
      simple: `  <label class="fr-label" id="range-label" for="range">Libellé du curseur</label>
  <div class="fr-range">
    <span class="fr-range__output">50</span>
    <input id="range" name="range" type="range" min="0" max="100" value="50"${disabled} />
    <span class="fr-range__min" aria-hidden="true">0</span>
    <span class="fr-range__max" aria-hidden="true">100</span>
  </div>`,
      double: `  <label class="fr-label" id="range-label">Libellé du curseur</label>
  <div class="fr-range fr-range--double">
    <input id="range-min" name="range-min" type="range" aria-label="Valeur minimum" min="0" max="100" value="25"${disabled} />
    <input id="range-max" name="range-max" type="range" aria-label="Valeur maximum" min="0" max="100" value="75"${disabled} />
    <span class="fr-range__min" aria-hidden="true">0</span>
    <span class="fr-range__max" aria-hidden="true">100</span>
  </div>`,
      step: `  <label class="fr-label" id="range-label" for="range">Libellé du curseur</label>
  <div class="fr-range fr-range--step">
    <span class="fr-range__output">50</span>
    <input id="range" name="range" type="range" min="0" max="100" step="25" value="50"${disabled} />
    <span class="fr-range__min" aria-hidden="true">0</span>
    <span class="fr-range__max" aria-hidden="true">100</span>
  </div>`,
    }[kind]
    return {
      example: figma.code`<div class="fr-range-group${stateClass}" id="range-group">
${field}
  <div class="fr-messages-group" id="range-messages-group" aria-live="polite">${message}
  </div>
</div>`,
    }
  },
  react: () => {
    const disabled = state === 'disabled' ? ' disabled' : ''
    const severity = {
      default: '',
      disabled: '',
      error: ` state="error" stateRelatedMessage="Texte d'erreur"`,
      valid: ` state="success" stateRelatedMessage="Texte de validation"`,
    }[state]
    const example =
      kind === 'double'
        ? figma.code`const nativeInputProps = [{ defaultValue: 25 }, { defaultValue: 75 }];

<Range
  label="Libellé du curseur"
  min={0}
  max={100}
  double
  nativeInputProps={nativeInputProps}${disabled}${severity}
/>`
        : figma.code`const nativeInputProps = { defaultValue: 50 };

<Range label="Libellé du curseur" min={0} max={100}${kind === 'step' ? ' step={25}' : ''} nativeInputProps={nativeInputProps}${disabled}${severity} />`
    return { imports: ["import { Range } from '@codegouvfr/react-dsfr/Range'"], example }
  },
  vue: () => {
    const disabled = state === 'disabled' ? ' disabled' : ''
    const message = state === 'error' ? ` message="Texte d'erreur"` : ''
    const bounds = { simple: ':min="0" :max="100" :model-value="50"', double: ':min="0" :max="100" :model-value="75" :lower-value="25"', step: ':min="0" :max="100" :step="25" :model-value="50"' }[kind]
    return {
      imports: ["import DsfrRange from '@gouvminint/vue-dsfr/DsfrRange.vue'"],
      example: figma.code`<DsfrRange label="Libellé du curseur" ${bounds}${disabled}${message} />`,
    }
  },
})

export default {
  id: `range-${kind}`,
  ...rendered,
  metadata: { nestable: true },
}
