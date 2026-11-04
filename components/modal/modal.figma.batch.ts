// Modale DSFR : un template pour les sets Desktop et Mobile (`layout` dans modal.json) et les
// quatre stacks. La Surcouche, simple fond assombri, a son propre template (modal-overlay).
// Titre et texte sont lus dans les calques. Les boutons d'action sont les instances
// « ⚙️ Varier les propriétés - Bouton N » : en HTML elles sont rendues par leur propre template
// (button.figma.batch.ts) ; les portages, qui attendent un tableau d'actions, reçoivent le
// libellé de chaque instance (Bouton 1 = primaire, Bouton 2 = secondaire dans le design DSFR).
// « Contenu Personnalisé » = zone libre, non dérivable : le texte du calque reste affiché.
// Thème = CSS seul. Les composants et <dialog> gèrent nativement le piège de focus (RGAA 7.1).
import figma from 'figma'
import type { InstanceHandle } from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeJsString, escapeText } from '../_shared/text'

const instance = figma.selectedInstance
const { stack, layout } = figma.batch as { stack: string; layout: 'desktop' | 'mobile' }

// Seul le set Desktop porte la propriété Taille ; en mobile la modale occupe toute la largeur.
const size = layout === 'desktop' ? readEnum(instance, 'Taille', { SM: 'SM', MD: 'MD', LG: 'LG' } as const) : 'MD'
const hasIcon = instance.getBoolean('Icône titre')
const ICON = 'fr-icon-warning-line'

const titleLayer = instance.findText('Titre de modale')
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Titre de la modale'
const textLayer = instance.findText('Texte')
const text = escapeText(textLayer.type === 'TEXT' ? textLayer.textContent : 'Contenu de la modale.')

const buttons = instance
  .findConnectedInstances((node) => node.name.startsWith('⚙️ Varier les propriétés - Bouton'))
  .filter((node): node is InstanceHandle => node.type === 'INSTANCE')
const buttonLabels = buttons.map((button) => escapeJsString(button.getString('Libellé')))

/** Tableau d'actions des portages, une ligne par bouton, ou chaîne vide sans bouton. */
function actionsArray(attribute: string, toAction: (label: string, index: number) => string): string {
  if (!buttonLabels.length) return ''
  return `\n  ${attribute}="[\n${buttonLabels.map((label, index) => `    ${escapeAttribute(toAction(label, index))}`).join(',\n')}\n  ]"`
}

const rendered = renderFor(stack, {
  angular: () => {
    const sizeAttr = layout === 'mobile' ? '\n  [mobileTop]="true"' : { SM: ' modalSize="SM"', MD: '', LG: ' modalSize="LG"' }[size]
    const actions = actionsArray('[actions]', (label, i) =>
      `{ label: '${label}',${i === 0 ? '' : " variant: 'secondary',"} callback: onAction${i + 1} }`)
    return {
      imports: ["import { DsfrModalComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-modal
  dialogId="modal"
  titleModal="${escapeAttribute(title)}"${hasIcon ? ` icon="${ICON}"` : ''}${sizeAttr}${actions}>
  ${text}
</dsfr-modal>`,
    }
  },
  html: () => {
    const colClass = layout === 'mobile'
      ? 'fr-col-12'
      : { SM: 'fr-col-12 fr-col-md-4', MD: 'fr-col-12 fr-col-md-8 fr-col-lg-6', LG: 'fr-col-12 fr-col-md-8' }[size]
    const items = buttons.map((button) => figma.code`
              <li>${button.executeTemplate().example}</li>`)
    const footer = items.length
      ? figma.code`
          <div class="fr-modal__footer">
            <ul class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg">${items}
            </ul>
          </div>`
      : ''
    const icon = hasIcon ? `<span class="${ICON} fr-icon--lg" aria-hidden="true"></span>` : ''
    return {
      example: figma.code`<dialog id="modal" class="fr-modal${layout === 'mobile' ? ' fr-modal--top' : ''}" aria-labelledby="modal-title">
  <div class="fr-container fr-container--fluid fr-container-md">
    <div class="fr-grid-row fr-grid-row--center">
      <div class="${colClass}">
        <div class="fr-modal__body">
          <div class="fr-modal__header">
            <button type="button" class="fr-btn--close fr-btn" aria-controls="modal" title="Fermer la fenêtre de dialogue">Fermer</button>
          </div>
          <div class="fr-modal__content">
            <h1 id="modal-title" class="fr-modal__title">${icon}${escapeText(title)}</h1>
            <p>${text}</p>
          </div>${footer}
        </div>
      </div>
    </div>
  </div>
</dialog>`,
    }
  },
  react: () => {
    // react-dsfr expose la modale via createModal(), déclarée une fois hors du composant.
    const sizeProp = layout === 'mobile' ? '\n  topAnchor' : { SM: ' size="small"', MD: '', LG: ' size="large"' }[size]
    const buttonsProp = buttonLabels.length
      ? `\n  buttons={[\n${buttonLabels.map((label, i) => `    { children: '${label}'${i === 0 ? '' : ", priority: 'secondary'"}, onClick: onAction${i + 1} }`).join(',\n')}\n  ]}`
      : ''
    return {
      imports: ["import { createModal } from '@codegouvfr/react-dsfr/Modal'"],
      example: figma.code`const modal = createModal({ id: 'modal', isOpenedByDefault: false })

<modal.Component
  title="${escapeAttribute(title)}"${hasIcon ? ` iconId="${ICON}"` : ''}${sizeProp}${buttonsProp}>
  ${text}
</modal.Component>`,
    }
  },
  vue: () => {
    // DsfrModal s'appuie sur <dialog> : le rendu mobile est responsive sans prop dédiée.
    const sizeAttr = layout === 'mobile' ? '' : { SM: ' size="sm"', MD: '', LG: ' size="lg"' }[size]
    const actions = actionsArray(':actions', (label, i) =>
      `{ label: '${label}',${i === 0 ? '' : ' secondary: true,'} onClick: onAction${i + 1} }`)
    return {
      imports: ["import DsfrModal from '@gouvminint/vue-dsfr/DsfrModal.vue'"],
      example: figma.code`<DsfrModal
  modal-id="modal"
  title="${escapeAttribute(title)}"
  :opened="true"${hasIcon ? ` icon="${ICON}"` : ''}${sizeAttr}${actions}
>
  ${text}
</DsfrModal>`,
    }
  },
})

export default {
  id: `modal-${layout}`,
  ...rendered,
}
