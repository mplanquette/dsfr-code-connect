// Badge DSFR : 12 composants Figma standalone (6 couleurs × 2 tailles, Thème clair uniquement).
// `severity` (info, success, warning, error, new, ou absent pour Personnalisable) et `size`
// viennent de l'entrée du node dans badge.json ; le libellé est lu dans la propriété « Libellé ».
// Thème (Clair/Sombre) = CSS uniquement : seuls les nodes Thème clair sont connectés.
// noIcon = override d'instance Figma non bindable : icône de sévérité affichée par défaut
// (`fr-badge--no-icon` / `noIcon` non posés).
// Badge Personnalisable : pas de sévérité, la classe couleur `fr-badge--blue-cumulus` est un
// placeholder à remplacer par le token voulu (Angular `customClass`, React `className`).
// React : `severity="new"` est un cas spécial accepté par `BadgeProps` (`AlertProps.Severity |
// "new"`).
// Vue : DsfrBadge n'a pas de prop `customClass` (uniquement `type` parmi les sévérités fixes) :
// la classe couleur passe en `class` statique sur le composant, Vue la fusionne avec la classe
// `fr-badge` du template racine.
import figma from 'figma'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeText } from '../_shared/text'

const { stack, size, severity } = figma.batch as {
  stack: string
  size: 'SM' | 'MD'
  severity?: string
}
const small = size === 'SM'
const libelle = figma.selectedInstance.getString('Libellé')
/** Libellé dans un attribut (Angular, Vue) ou entre balises (HTML, React). */
const label = escapeAttribute(libelle)
const text = escapeText(libelle)

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrBadgeComponent } from '@edugouvfr/ngx-dsfr'"],
    example: severity
      ? figma.code`<dsfr-badge label="${label}" severity="${severity}" badgeSize="${size}"></dsfr-badge>`
      : figma.code`<dsfr-badge label="${label}" badgeSize="${size}" customClass="fr-badge--blue-cumulus"></dsfr-badge>`,
  }),
  html: () => ({
    example: figma.code`<p class="fr-badge${small ? ' fr-badge--sm' : ''} fr-badge--${severity ?? 'blue-cumulus'}">${text}</p>`,
  }),
  react: () => ({
    imports: ["import { Badge } from '@codegouvfr/react-dsfr/Badge'"],
    example: severity
      ? figma.code`<Badge severity="${severity}"${small ? ' small' : ''}>${text}</Badge>`
      : figma.code`<Badge className="fr-badge--blue-cumulus"${small ? ' small' : ''}>${text}</Badge>`,
  }),
  vue: () => ({
    imports: ["import DsfrBadge from '@gouvminint/vue-dsfr/DsfrBadge.vue'"],
    example: severity
      ? figma.code`<DsfrBadge label="${label}" type="${severity}"${small ? ' small' : ''} />`
      : figma.code`<DsfrBadge label="${label}" class="fr-badge--blue-cumulus"${small ? ' small' : ''} />`,
  }),
})

export default {
  id: `badge-${severity ?? 'custom'}-${size}`,
  ...rendered,
  metadata: { nestable: true },
}
