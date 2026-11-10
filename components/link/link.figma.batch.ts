// Lien DSFR : 1 set. Les trois composants « _🚫Éléments - Base » sont des atomes internes
// Figma → non connectés. Thème = CSS seul.
// Survol, Cliqué et Focus = pseudo-états → seul « Désactivé » modifie le markup.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-arrow-right-line.
// React : pas de composant react-dsfr dédié pour un lien simple de style « fr-link » (le seul
// `link.tsx` du package est l'utilitaire de routing interne) → markup DSFR brut en JSX.
// Vue : pas de composant `DsfrLink` dans @gouvminint/vue-dsfr → markup DSFR brut.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance

const size = readEnum(instance, 'Taille', { SM: 'SM', MD: 'MD', LG: 'LG' } as const)
const iconPosition = readEnum(instance, 'Icône', { Sans: 'none', Gauche: 'left', Droite: 'right' } as const)
const disabled = readEnum(instance, 'État', {
  Défaut: false,
  Survol: false,
  Cliqué: false,
  Focus: false,
  Désactivé: true,
})
const ICON = 'fr-icon-arrow-right-line'

const sizeClass = { SM: ' fr-link--sm', MD: '', LG: ' fr-link--lg' }[size]
const iconClass = {
  none: '',
  left: ` ${ICON} fr-link--icon-left`,
  right: ` ${ICON} fr-link--icon-right`,
}[iconPosition]
const ariaDisabled = disabled ? ' aria-disabled="true"' : ''

const rendered = renderFor(figma.batch.stack, {
  angular: () => ({
    imports: ["import { DsfrLinkComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-link link="/page" label="Libellé du lien"${{ SM: ' linkSize="SM"', MD: '', LG: ' linkSize="LG"' }[size]}${
      iconPosition === 'none' ? '' : ` icon="${ICON}" iconPosition="${iconPosition}"`
    }${disabled ? ' [disabled]="true"' : ''}></dsfr-link>`,
  }),
  html: () => ({
    example: figma.code`<a class="fr-link${sizeClass}${iconClass}" href="/page"${ariaDisabled}>Libellé du lien</a>`,
  }),
  react: () => ({
    example: figma.code`<a className="fr-link${sizeClass}${iconClass}" href="/page"${ariaDisabled}>Libellé du lien</a>`,
  }),
  vue: () => ({
    example: figma.code`<a class="fr-link${sizeClass}${iconClass}" href="/page"${ariaDisabled}>Libellé du lien</a>`,
  }),
})

export default {
  id: 'link',
  ...rendered,
  metadata: { nestable: true },
}
