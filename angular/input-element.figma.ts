// url=<FIGMA_CHAMP_DE_SAISIE__ELEMENTS_CHAMP_DE_SAISIE>
// Élément de saisie seul. ngx-dsfr n'expose pas d'input sans libellé : on montre
// <dsfr-form-input> avec un libellé de remplacement, le champ complet (input-field.figma.ts)
// lisant le vrai libellé dans le design.
import figma from 'figma'
import { inputElementAttrs } from './helpers/input-element'

export default {
  id: 'input-element',
  imports: ["import { DsfrFormInputComponent } from '@edugouvfr/ngx-dsfr'"],
  example: figma.code`<dsfr-form-input label="Libellé du champ" name="input"${inputElementAttrs(figma.selectedInstance)}></dsfr-form-input>`,
}
