// Icônes DSFR (bibliothèque Fondamentaux, page « Icônes fonctionnelles »). Un template pour
// toutes les icônes, déclarées dans icon.json par scripts/generate-icons.mjs. Chaque entrée
// indique comment obtenir la classe `fr-icon-*` :
//   - `version` : set Contour/Pleine → `fr-icon-<base>-line` / `fr-icon-<base>-fill` ;
//   - `direction` : set Haut/Droite/Bas/Gauche → direction insérée après « arrow » ;
//   - `fixed` : composant seul, classe déjà connue.
// La classe est aussi exposée dans `metadata.props.iconClass` : les familles qui placent une
// icône (bouton, champ...) la lisent via executeTemplate() (cf. _shared/icon.ts).
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const entry = figma.batch as { stack: string; kind: 'version' | 'direction' | 'fixed'; base: string; iconClass?: string }

function resolveIconClass(): string {
  if (entry.kind === 'version') {
    return `fr-icon-${entry.base}-${readEnum(instance, 'Version', { Contour: 'line', Pleine: 'fill' })}`
  }
  if (entry.kind === 'direction') {
    const direction = readEnum(instance, 'Direction', { Haut: 'up', Droite: 'right', Bas: 'down', Gauche: 'left' })
    return `fr-icon-${entry.base.replace(/^arrow/, `arrow-${direction}`)}`
  }
  return entry.iconClass ?? ''
}

const iconClass = resolveIconClass()

const rendered = renderFor(entry.stack, {
  // Une icône seule est décorative : aria-hidden, le nom accessible est porté par son contexte.
  angular: () => ({ example: figma.code`<span class="${iconClass}" aria-hidden="true"></span>` }),
  html: () => ({ example: figma.code`<span class="${iconClass}" aria-hidden="true"></span>` }),
  react: () => ({ example: figma.code`<span className="${iconClass}" aria-hidden="true" />` }),
  vue: () => ({ example: figma.code`<span class="${iconClass}" aria-hidden="true" />` }),
})

export default {
  id: iconClass,
  ...rendered,
  metadata: { nestable: true, props: { iconClass } },
}
