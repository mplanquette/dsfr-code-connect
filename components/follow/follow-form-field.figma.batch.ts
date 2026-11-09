// Champ email du formulaire newsletter (« Element / Formulaire » desktop et mobile : même
// snippet des deux côtés, `layout` ne sert qu'à l'identifiant). « Etat » est le vrai nom de la
// propriété Figma (sans accent), conservé tel quel.
//   - Angular : `dsfr-form-email` ;
//   - HTML : groupe de champ DSFR ;
//   - React : pas de composant email dédié, on utilise <Input> générique ;
//   - Vue : le champ email est interne au formulaire de DsfrNewsLetter, non exposé comme
//     composant séparé, approximé avec le champ générique DsfrInputGroup (valid/error).
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, layout } = figma.batch as { stack: string; layout: 'desktop' | 'mobile' }

const state = readEnum(instance, 'Etat', { Default: 'none', Valide: 'valid', Erreur: 'error' } as const)

const rendered = renderFor(stack, {
  angular: () => {
    const severity = {
      none: '',
      valid: ' messageSeverity="valid" message="Texte de validation"',
      error: ` messageSeverity="error" message="Texte d'erreur"`,
    }[state]
    return {
      imports: ["import { DsfrFormEmailComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-form-email label="Adresse email" name="email"${severity}></dsfr-form-email>`,
    }
  },
  html: () => {
    const stateClass = { none: '', valid: ' fr-input-group--valid', error: ' fr-input-group--error' }[state]
    const message = {
      none: '',
      valid: `\n  <p class="fr-message fr-message--valid">Texte de validation</p>`,
      error: `\n  <p class="fr-message fr-message--error">Texte d'erreur</p>`,
    }[state]
    return {
      example: figma.code`<div class="fr-input-group${stateClass}">
  <label class="fr-label" for="newsletter-email">Adresse email</label>
  <input class="fr-input" type="email" id="newsletter-email" name="newsletter-email" />${message}
</div>`,
    }
  },
  react: () => {
    const stateProps = {
      none: '',
      valid: '\n  state="success"\n  stateRelatedMessage="Texte de validation"',
      error: `\n  state="error"\n  stateRelatedMessage="Texte d'erreur"`,
    }[state]
    return {
      imports: ["import { Input } from '@codegouvfr/react-dsfr/Input'"],
      example: figma.code`<Input
  label="Adresse email"
  nativeInputProps={{ type: 'email', name: 'email' }}${stateProps} />`,
    }
  },
  vue: () => {
    const messages = {
      none: '',
      valid: ' valid-message="Texte de validation"',
      error: ` error-message="Texte d'erreur"`,
    }[state]
    return {
      imports: ["import DsfrInputGroup from '@gouvminint/vue-dsfr/DsfrInputGroup.vue'"],
      example: figma.code`<DsfrInputGroup label="Adresse email" type="email" v-model="email"${messages} />`,
    }
  },
})

export default {
  id: `follow-form-field-${layout}`,
  ...rendered,
  metadata: { nestable: true },
}
