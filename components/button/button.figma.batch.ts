// Bouton DSFR : un template pour les 9 component sets (Primaire/Secondaire/Tertiaire × SM/MD/LG)
// et les quatre stacks. `variant` et `size` viennent de l'entrée du set dans button.json.
// Les sets tertiaires portent en plus « Bordure » : sans bordure → variante « sans contour ».
// État (Défaut/Survol/Cliqué) et Focus sont des pseudo-états CSS : ils ne changent pas le markup.
// L'icône vient de « 🔄 Icône » (cf. _shared/icon.ts) ; tant qu'elle n'est pas code-connectée,
// placeholder fr-icon-arrow-right-line à remplacer par le dev.
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { readIconClass } from '../_shared/icon'
import { renderFor } from '../_shared/stack'
import { escapeAttribute } from '../_shared/text'

const instance = figma.selectedInstance
const { stack, size } = figma.batch as { stack: string; size: 'SM' | 'MD' | 'LG' }

const variant: string =
  figma.batch.variant === 'tertiary' && !instance.getBoolean('Bordure') ? 'tertiary-no-outline' : figma.batch.variant
const label = escapeAttribute(instance.getString('Libellé'))
const icon = readEnum(instance, 'Icône', { Sans: 'none', Gauche: 'left', Droite: 'right', Seule: 'only' } as const)
const disabled = readVariantFlag(instance, 'Désactivé')
const ICON = icon === 'none' ? '' : readIconClass(instance, '🔄 Icône', 'fr-icon-arrow-right-line')

const rendered = renderFor(stack, {
  angular: () => {
    const iconAttrs = {
      none: '',
      left: ` icon="${ICON}" iconPosition="left"`,
      right: ` icon="${ICON}" iconPosition="right"`,
      only: ` icon="${ICON}" [labelSrOnly]="true"`,
    }[icon]
    return {
      imports: ["import { DsfrButtonComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-button label="${label}" variant="${variant}" size="${size}"${iconAttrs}${disabled ? ' [disabled]="true"' : ''}></dsfr-button>`,
    }
  },
  html: () => {
    const classes = [
      'fr-btn',
      { primary: '', secondary: 'fr-btn--secondary', tertiary: 'fr-btn--tertiary', 'tertiary-no-outline': 'fr-btn--tertiary-no-outline' }[variant],
      { SM: 'fr-btn--sm', MD: '', LG: 'fr-btn--lg' }[size],
      { none: '', left: `fr-btn--icon-left ${ICON}`, right: `fr-btn--icon-right ${ICON}`, only: ICON }[icon],
    ].filter(Boolean).join(' ')
    // Icône seule : le libellé reste dans le bouton pour le nom accessible et passe en title.
    const title = icon === 'only' ? ` title="${label}"` : ''
    return {
      example: figma.code`<button class="${classes}" type="button"${title}${disabled ? ' disabled' : ''}>${label}</button>`,
    }
  },
  react: () => {
    const priority = { primary: '', secondary: ' priority="secondary"', tertiary: ' priority="tertiary"', 'tertiary-no-outline': ' priority="tertiary no outline"' }[variant]
    const sizeProp = { SM: ' size="small"', MD: '', LG: ' size="large"' }[size]
    const disabledProp = disabled ? ' disabled' : ''
    // Icône seule : react-dsfr attend `title` et aucun enfant (type IconOnly).
    const example = icon === 'only'
      ? figma.code`<Button iconId="${ICON}" title="${label}"${priority}${sizeProp}${disabledProp} />`
      : figma.code`<Button${priority}${sizeProp}${icon === 'none' ? '' : ` iconId="${ICON}" iconPosition="${icon}"`}${disabledProp}>${label}</Button>`
    return { imports: ["import { Button } from '@codegouvfr/react-dsfr/Button'"], example }
  },
  vue: () => {
    const variantAttrs = { primary: '', secondary: ' secondary', tertiary: ' tertiary', 'tertiary-no-outline': ' tertiary no-outline' }[variant]
    const sizeAttr = { SM: ' size="sm"', MD: '', LG: ' size="lg"' }[size]
    const iconAttrs = { none: '', left: ` icon="${ICON}"`, right: ` icon="${ICON}" icon-right`, only: ` icon="${ICON}" icon-only` }[icon]
    return {
      imports: ["import DsfrButton from '@gouvminint/vue-dsfr/DsfrButton.vue'"],
      example: figma.code`<DsfrButton label="${label}"${variantAttrs}${sizeAttr}${iconAttrs}${disabled ? ' disabled' : ''} />`,
    }
  },
})

export default {
  id: `button-${figma.batch.variant}-${size}`,
  ...rendered,
  metadata: { nestable: true },
}
