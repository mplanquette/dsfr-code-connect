// Alerte DSFR : un set, quatre stacks.
// État → sévérité, Taille → SM/MD, Fermeture → bouton de fermeture.
// Thème (Clair/Sombre) et Support (Desktop/Mobile) : CSS et responsive uniquement, pas de binding.
// Angular : 'success' est déprécié depuis ngx-dsfr 1.13.0 (successeur 'valid') mais le design
// utilise encore « Succès » : on garde 'success' en attendant une mise à jour du portage.
// HTML : la taille SM supprime aussi le titre <h3>.
// Vue : DsfrAlert n'a pas de prop `alertSize` (contrairement à ngx-dsfr), la taille SM est le
// booléen `small`.
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const severity = readEnum(instance, 'État', {
  Erreur: 'error',
  Information: 'info',
  Succès: 'success',
  Avertissement: 'warning',
} as const)
const small = readEnum(instance, 'Taille', { MD: false, SM: true })
const closeable = readVariantFlag(instance, 'Fermeture')

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrAlertComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-alert heading="Titre du message" message="Description de l'alerte" severity="${severity}" alertSize="${small ? 'SM' : 'MD'}"${closeable ? ' [closeable]="true" closeControlLabel="Masquer le message"' : ''}></dsfr-alert>`,
  }),
  html: () => {
    const title = small ? '' : '\n  <h3 class="fr-alert__title">Titre du message</h3>'
    const closeButton = closeable
      ? '\n  <button class="fr-btn--close fr-btn" title="Masquer le message" type="button">Masquer le message</button>'
      : ''
    return {
      example: figma.code`<div role="alert" class="fr-alert fr-alert--${severity}${small ? ' fr-alert--sm' : ''}">${title}
  <p>Description de l'alerte</p>${closeButton}
</div>`,
    }
  },
  react: () => ({
    imports: ["import { Alert } from '@codegouvfr/react-dsfr/Alert'"],
    example: figma.code`<Alert severity="${severity}" title="Titre du message" description="Description de l'alerte"${small ? ' small' : ''}${closeable ? ' closable' : ''} />`,
  }),
  vue: () => ({
    imports: ["import DsfrAlert from '@gouvminint/vue-dsfr/DsfrAlert.vue'"],
    example: figma.code`<DsfrAlert type="${severity}" title="Titre du message" description="Description de l'alerte"${small ? ' small' : ''}${closeable ? ' closeable close-button-label="Masquer le message"' : ''} />`,
  }),
})

export default {
  id: 'alert',
  ...rendered,
  metadata: { nestable: true },
}
