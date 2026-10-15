// Bouton DSFR : un seul template pour les 9 component sets (Primaire/Secondaire/Tertiaire
// × SM/MD/LG), déclarés dans button.figma.batch.json. Chaque entrée fournit `variant` et
// `size`, exposés ici par figma.batch.
// Les sets tertiaires portent en plus « Bordure » : sans bordure → fr-btn--tertiary-no-outline.
// État (Défaut/Survol/Cliqué) et Focus sont des pseudo-états CSS : ils ne changent pas le markup.
// L'icône concrète n'est pas encore dérivable (icônes DSFR non connectées) : placeholder
// fr-icon-arrow-right-line à remplacer par le dev.
import figma from 'figma'

const instance = figma.selectedInstance

const variant: string = figma.batch.variant === 'tertiary' && !instance.getBoolean('Bordure') ? 'tertiary-no-outline' : figma.batch.variant
const VARIANT_CLASSES: Record<string, string> = {
  primary: '',
  secondary: ' fr-btn--secondary',
  tertiary: ' fr-btn--tertiary',
  'tertiary-no-outline': ' fr-btn--tertiary-no-outline',
}
const SIZE_CLASSES: Record<string, string> = { SM: ' fr-btn--sm', MD: '', LG: ' fr-btn--lg' }

const label = instance.getString('Libellé')
const iconClass = instance.getEnum('Icône', {
  Sans: '',
  Gauche: ' fr-btn--icon-left fr-icon-arrow-right-line',
  Droite: ' fr-btn--icon-right fr-icon-arrow-right-line',
  Seule: ' fr-icon-arrow-right-line',
})
// L'icône seule masque le libellé visuellement : on le conserve en title pour le nom accessible.
const title = instance.getEnum('Icône', { Sans: '', Gauche: '', Droite: '', Seule: ` title="${label}"` })
const disabled = instance.getEnum('Désactivé', { True: ' disabled', False: '' })
const classes = `fr-btn${VARIANT_CLASSES[variant]}${SIZE_CLASSES[figma.batch.size]}${iconClass}`

export default {
  id: `button-${figma.batch.variant}-${figma.batch.size}`,
  example: figma.code`<button class="${classes}" type="button"${title}${disabled}>${label}</button>`,
  metadata: { nestable: true },
}
