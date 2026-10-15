// Modale DSFR : un template pour les sets Desktop et Mobile, déclarés dans modal.figma.batch.json
// (la Surcouche, simple fond assombri, a son propre template : modal-overlay.figma.ts).
// Titre et texte sont lus dans les calques ; les boutons d'action sont les instances
// « ⚙️ Varier les propriétés - Bouton N », rendues par leur propre template (button.figma.batch.ts) :
// libellé, variante, icône et état désactivé suivent donc le design.
// « Contenu Personnalisé » = zone libre, non dérivable : paragraphe de remplacement.
// Thème = CSS seul. Le markup <dialog> assure nativement le piège de focus (RGAA 7.1).
import figma from 'figma'
import type { InstanceHandle } from 'figma'

const instance = figma.selectedInstance
const layout: string = figma.batch.layout

// Seul le set Desktop porte la propriété Taille ; en mobile, la modale occupe toute la largeur.
const sizeClass = layout === 'desktop'
  ? instance.getEnum('Taille', {
      SM: 'fr-col-12 fr-col-md-4',
      MD: 'fr-col-12 fr-col-md-8 fr-col-lg-6',
      LG: 'fr-col-12 fr-col-md-8',
    })
  : 'fr-col-12'
const topClass = layout === 'mobile' ? ' fr-modal--top' : ''
const icon = instance.getBoolean('Icône titre')
  ? '<span class="fr-icon-warning-line fr-icon--lg" aria-hidden="true"></span>'
  : ''

const titleLayer = instance.findText('Titre de modale')
const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Titre de la modale'
const textLayer = instance.findText('Texte')
const text = textLayer.type === 'TEXT' ? textLayer.textContent : 'Contenu de la modale.'

const buttons = instance
  .findConnectedInstances((node) => node.name.startsWith('⚙️ Varier les propriétés - Bouton'))
  .filter((node): node is InstanceHandle => node.type === 'INSTANCE')
  .map((button) => figma.code`
              <li>${button.executeTemplate().example}</li>`)
const footer = buttons.length
  ? figma.code`
          <div class="fr-modal__footer">
            <ul class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg">${buttons}
            </ul>
          </div>`
  : ''

export default {
  id: `modal-${layout}`,
  example: figma.code`<dialog id="modal" class="fr-modal${topClass}" aria-labelledby="modal-title">
  <div class="fr-container fr-container--fluid fr-container-md">
    <div class="fr-grid-row fr-grid-row--center">
      <div class="${sizeClass}">
        <div class="fr-modal__body">
          <div class="fr-modal__header">
            <button type="button" class="fr-btn--close fr-btn" aria-controls="modal" title="Fermer la fenêtre de dialogue">Fermer</button>
          </div>
          <div class="fr-modal__content">
            <h1 id="modal-title" class="fr-modal__title">${icon}${title}</h1>
            <p>${text}</p>
          </div>${footer}
        </div>
      </div>
    </div>
  </div>
</dialog>`,
}
