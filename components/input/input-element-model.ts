// Lecture partagée d'une instance « Éléments - Champ de saisie » : utilisée par le template de
// l'élément seul et par celui du champ complet, qui lit l'élément imbriqué.
import type { InstanceHandle } from 'figma'
import { readIconClass } from '../_shared/icon'
import { readEnum, readVariantFlag } from '../_shared/read'
import { escapeAttribute, escapeText } from '../_shared/text'

export interface InputElementModel {
  textarea: boolean
  icon: boolean
  disabled: boolean
  /** Texte saisi, vide tant que l'état est « Défaut » (le design montre alors un champ vide). */
  typed: string
  state: 'default' | 'filled' | 'error' | 'valid'
  /** Classe de l'icône (« Instance icône »), placeholder tant qu'elle n'est pas connectée. */
  iconClass: string
}

/** Lit les propriétés de l'élément de saisie. */
export function readInputElement(element: InstanceHandle): InputElementModel {
  const state = readEnum(element, 'État', { Défaut: 'default', Rempli: 'filled', Erreur: 'error', Valide: 'valid' } as const)
  return {
    textarea: readVariantFlag(element, 'Texte Area'),
    icon: element.getBoolean('Icône'),
    disabled: readVariantFlag(element, 'Désactivé'),
    typed: state === 'default' ? '' : element.getString('Texte saisi'),
    state,
    iconClass: readIconClass(element, 'Instance icône', 'fr-icon-search-line'),
  }
}

/**
 * Balisage HTML du champ seul. `describedBy` n'est vrai que si le champ parent affiche son message :
 * sinon `aria-describedby` pointerait vers un id absent du DOM.
 */
export function renderHtmlField(model: InputElementModel, describedBy: boolean): string {
  const attrs = `class="fr-input" id="input" name="input"${describedBy ? ' aria-describedby="input-messages"' : ''}${model.disabled ? ' disabled' : ''}`
  const field = model.textarea
    ? `<textarea ${attrs} rows="4">${escapeText(model.typed)}</textarea>`
    : `<input ${attrs} type="text"${model.typed ? ` value="${escapeAttribute(model.typed)}"` : ''} />`
  return model.icon ? `<div class="fr-input-wrap ${model.iconClass}">${field}</div>` : field
}

/** Attributs de l'élément pour chaque portage (zone de texte, icône, désactivé). */
export const elementAttributes = {
  angular: (m: InputElementModel) =>
    `${m.textarea ? ' [textarea]="true" [rows]="4"' : ''}${m.icon ? ` icon="${m.iconClass}"` : ''}${m.disabled ? ' [disabled]="true"' : ''}`,
  react: (m: InputElementModel) =>
    `${m.textarea ? ' textArea' : ''}${m.icon ? ` iconId="${m.iconClass}"` : ''}${m.disabled ? ' disabled' : ''}`,
  vue: (m: InputElementModel) =>
    `${m.textarea ? ' is-textarea :rows="4"' : ''}${m.icon ? ` is-with-wrapper wrapper-class="${m.iconClass}"` : ''}${m.disabled ? ' disabled' : ''}`,
}
