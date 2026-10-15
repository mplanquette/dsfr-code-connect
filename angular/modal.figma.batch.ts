// Modale DSFR (ngx-dsfr) : un template pour les sets Desktop et Mobile, déclarés dans
// modal.figma.batch.json (la Surcouche, simple fond assombri, a son propre template :
// modal-overlay.figma.ts). Le rendu Mobile est responsive : [mobileTop] ancre la modale en haut.
// Titre et texte sont lus dans les calques. Les boutons d'action passent par [actions] (pas de
// projection de <dsfr-button>) : on lit donc le libellé de chaque instance
// « ⚙️ Varier les propriétés - Bouton N » plutôt que son snippet. Bouton 1 = primaire,
// Bouton 2 = secondaire dans le design DSFR.
// « Contenu Personnalisé » = zone libre, non dérivable : texte de remplacement.
// `dsfr-modal` gère nativement le piège de focus (RGAA 7.1).
import figma from 'figma'
import type { InstanceHandle } from 'figma'

const instance = figma.selectedInstance
const layout: string = figma.batch.layout

// Seul le set Desktop porte la propriété Taille.
const size = layout === 'desktop'
  ? instance.getEnum('Taille', { SM: ' modalSize="SM"', MD: '', LG: ' modalSize="LG"' })
  : '\n  [mobileTop]="true"'
const icon = instance.getBoolean('Icône titre') ? ' icon="fr-icon-warning-line"' : ''

const titleLayer = instance.findText('Titre de modale')
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Titre de la modale'
const textLayer = instance.findText('Texte')
const text = textLayer.type === 'TEXT' ? textLayer.textContent : 'Contenu de la modale.'

const actionLines = instance
  .findConnectedInstances((node) => node.name.startsWith('⚙️ Varier les propriétés - Bouton'))
  .filter((node): node is InstanceHandle => node.type === 'INSTANCE')
  .map((button, index) => {
    const variant = index === 0 ? '' : " variant: 'secondary',"
    return `    { label: '${button.getString('Libellé').replace(/'/g, "\\'")}',${variant} callback: onAction${index + 1} }`
  })
const actions = actionLines.length ? `\n  [actions]="[\n${actionLines.join(',\n')}\n  ]"` : ''

export default {
  id: `modal-${layout}`,
  imports: ["import { DsfrModalComponent } from '@edugouvfr/ngx-dsfr'"],
  example: figma.code`<dsfr-modal
  dialogId="modal"
  titleModal="${title}"${icon}${size}${actions}>
  ${text}
</dsfr-modal>`,
}
