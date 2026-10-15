// url=<FIGMA_CHAMP_DE_SAISIE__CHAMP_DE_SAISIE>
// Champ de saisie complet : assemble les atomes Figma imbriqués plutôt que du texte figé.
//   - « ⚙️ Varier les propriétés - Libellé » → libellé et description (fr-hint-text) ;
//   - « Champ de saisie » (Éléments - Champ de saisie) → rendu par son propre template ;
//   - « Message de formulaire » → texte du message, affiché selon « Message d'information ».
// Le nom du calque de libellé commence par une espace dans le design : conservé tel quel.
import figma from 'figma'

const instance = figma.selectedInstance

const labelAtom = instance.findInstance(' ⚙️ Varier les propriétés - Libellé')
const label = labelAtom.type === 'INSTANCE' ? labelAtom.getString('Libellé') : 'Libellé du champ'
const hint = labelAtom.type === 'INSTANCE' && labelAtom.getBoolean('Description additionnel')
  ? `\n    <span class="fr-hint-text">${labelAtom.getString('Texte de description additionnel')}</span>`
  : ''

const element = instance.findInstance('Champ de saisie')
const field = element.type === 'INSTANCE'
  ? element.executeTemplate().example
  : figma.code`<input class="fr-input" type="text" id="input" name="input" />`

const stateClass = instance.getEnum('État', {
  Défaut: '',
  Rempli: '',
  Erreur: ' fr-input-group--error',
  Valide: ' fr-input-group--valid',
})
const messageClass = instance.getEnum('État', {
  Défaut: 'fr-message--info',
  Rempli: 'fr-message--info',
  Erreur: 'fr-message--error',
  Valide: 'fr-message--valid',
})
const messageAtom = instance.findInstance('Message de formulaire')
const message = instance.getBoolean("Message d'information") && messageAtom.type === 'INSTANCE'
  ? `\n    <p class="fr-message ${messageClass}" id="input-messages">${messageAtom.getString('Message')}</p>`
  : ''
const disabledClass = instance.getEnum('Désactivé', { True: ' fr-input-group--disabled', False: '' })

export default {
  id: 'input-field',
  example: figma.code`<div class="fr-input-group${stateClass}${disabledClass}">
  <label class="fr-label" for="input">${label}${hint}
  </label>
  ${field}
  <div class="fr-messages-group" id="input-messages-group" aria-live="polite">${message}
  </div>
</div>`,
  metadata: { nestable: true },
}
