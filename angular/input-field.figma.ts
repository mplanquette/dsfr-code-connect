// url=<FIGMA_CHAMP_DE_SAISIE__CHAMP_DE_SAISIE>
// Champ de saisie complet : les entrées de <dsfr-form-input> sont lues dans les atomes Figma
// imbriqués plutôt que figées.
//   - « ⚙️ Varier les propriétés - Libellé » → label et hint ;
//   - « Champ de saisie » (Éléments - Champ de saisie) → textarea, icône, désactivé ;
//   - « Message de formulaire » → message, affiché selon « Message d'information ».
// Le nom du calque de libellé commence par une espace dans le design : conservé tel quel.
import figma from 'figma'
import { inputElementAttrs } from './helpers/input-element'

const instance = figma.selectedInstance
const escape = (text: string) => text.replace(/"/g, '&quot;')

const labelAtom = instance.findInstance(' ⚙️ Varier les propriétés - Libellé')
const label = labelAtom.type === 'INSTANCE' ? labelAtom.getString('Libellé') : 'Libellé du champ'
const hint = labelAtom.type === 'INSTANCE' && labelAtom.getBoolean('Description additionnel')
  ? `\n  hint="${escape(labelAtom.getString('Texte de description additionnel'))}"`
  : ''

const element = instance.findInstance('Champ de saisie')
const elementAttrs = element.type === 'INSTANCE' ? inputElementAttrs(element) : ''

const severity = instance.getEnum('État', {
  Défaut: '',
  Rempli: '',
  Erreur: ' messageSeverity="error"',
  Valide: ' messageSeverity="valid"',
})
const messageAtom = instance.findInstance('Message de formulaire')
const message = instance.getBoolean("Message d'information") && messageAtom.type === 'INSTANCE'
  ? `\n  message="${escape(messageAtom.getString('Message'))}"${severity}`
  : ''

export default {
  id: 'input-field',
  imports: ["import { DsfrFormInputComponent } from '@edugouvfr/ngx-dsfr'"],
  example: figma.code`<dsfr-form-input
  label="${escape(label)}"
  name="input"${hint}${elementAttrs}${message}></dsfr-form-input>`,
  metadata: { nestable: true },
}
