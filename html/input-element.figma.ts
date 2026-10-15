// url=<FIGMA_CHAMP_DE_SAISIE__ELEMENTS_CHAMP_DE_SAISIE>
// Élément de saisie seul (input ou textarea), sans libellé ni message : c'est la brique
// imbriquée dans « Champ de saisie », qui l'affiche via executeTemplate (input-field.figma.ts).
// Le texte saisi devient la valeur du champ dès que l'état n'est plus « Défaut ».
// L'icône concrète n'est pas encore dérivable (icônes DSFR non connectées) : placeholder
// fr-icon-search-line. Focus = pseudo-état CSS, ignoré.
import figma from 'figma'

const instance = figma.selectedInstance

const typedText = instance.getString('Texte saisi')
const typed = instance.getEnum('État', { Défaut: '', Rempli: typedText, Erreur: typedText, Valide: typedText })
const describedBy = instance.getEnum('État', {
  Défaut: '',
  Rempli: '',
  Erreur: ' aria-describedby="input-messages"',
  Valide: ' aria-describedby="input-messages"',
})
const disabled = instance.getEnum('Désactivé', { True: ' disabled', False: '' })
const attrs = `class="fr-input" id="input" name="input"${describedBy}${disabled}`
const field = instance.getEnum('Texte Area', {
  True: `<textarea ${attrs} rows="4">${typed}</textarea>`,
  False: `<input ${attrs} type="text"${typed ? ` value="${typed}"` : ''} />`,
})

export default {
  id: 'input-element',
  example: instance.getBoolean('Icône')
    ? figma.code`<div class="fr-input-wrap fr-icon-search-line">
  ${field}
</div>`
    : figma.code`${field}`,
  metadata: { nestable: true },
}
