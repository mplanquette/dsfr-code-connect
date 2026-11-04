// Icônes DSFR : résolution de l'icône choisie dans le design.
//
// Une propriété d'échange d'instance (ex. « 🔄 Icône » du bouton) pointe vers une icône de la
// bibliothèque Fondamentaux. Quand cette icône est code-connectée (famille components/icon), son
// template expose sa classe dans `metadata.props.iconClass` : on la lit via executeTemplate().
// Sinon (icône non connectée, propriété absente), on garde un placeholder à remplacer par le dev.
import type { InstanceHandle } from 'figma'

/**
 * Classe `fr-icon-*` de l'icône placée dans `swapProperty`, ou `placeholder` si elle n'est pas
 * connectée.
 */
export function readIconClass(instance: InstanceHandle, swapProperty: string, placeholder: string): string {
  const swap = instance.getInstanceSwap(swapProperty)
  if (!swap || swap.type !== 'INSTANCE') return placeholder
  const iconClass = swap.executeTemplate().metadata?.props?.iconClass
  return typeof iconClass === 'string' && iconClass !== '' ? iconClass : placeholder
}
