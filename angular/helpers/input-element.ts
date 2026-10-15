import type { InstanceHandle } from 'figma'

/**
 * Attributs <dsfr-form-input> dérivés d'une instance « Éléments - Champ de saisie » :
 * zone de texte, icône et état désactivé. Partagé par input-element.figma.ts (élément seul)
 * et input-field.figma.ts (élément imbriqué dans le champ complet).
 * L'icône concrète n'est pas encore dérivable (icônes DSFR non connectées) : placeholder
 * fr-icon-search-line.
 */
export function inputElementAttrs(element: InstanceHandle): string {
  const textarea = element.getEnum('Texte Area', { True: ' [textarea]="true" [rows]="4"', False: '' })
  const icon = element.getBoolean('Icône') ? ' icon="fr-icon-search-line"' : ''
  const disabled = element.getEnum('Désactivé', { True: ' [disabled]="true"', False: '' })
  return `${textarea}${icon}${disabled}`
}
