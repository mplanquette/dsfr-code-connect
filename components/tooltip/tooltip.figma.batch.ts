// Infobulle DSFR : 8 sets (2 déclencheurs, 6 bulles). Thème = CSS seul.
// « État Initial / Active » est piloté au runtime par le JS du DSFR : non bindable.
// « DIrection » (sic, nom réel de la propriété) et « Alignement » sont calculés automatiquement
// par le DSFR (classe fr-placement) : ils ne s'écrivent pas dans le code, d'où le même snippet
// pour les 6 variantes de bulle. « Taille » des bulles n'est pas lue. « Composant » (échange
// d'instance du déclencheur au survol) n'est pas lue non plus.
// Déclenchement au clic : bouton dédié portant l'infobulle. Au survol : directive (Angular) ou
// lien (HTML) appliqué à l'élément déclencheur.
// Les bulles lisent leur « Message ».
// React : pas de directive séparée comme ngx-dsfr, `Tooltip` est un composant unique ;
// `kind="click"` pose le bouton dédié, `kind="hover"` (défaut) avec `children` pose le
// déclencheur au survol, sans `children` il affiche l'icône par défaut (les 6 bulles).
// Vue : DsfrTooltip enveloppe son déclencheur (slot par défaut) et sa bulle (`content`) ;
// `on-hover` bascule du déclenchement au clic (bouton, défaut) au survol (lien).
import figma from 'figma'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeText } from '../_shared/text'

const instance = figma.selectedInstance
const { stack, kind, variant } = figma.batch as { stack: string; kind: 'click' | 'hover' | 'bubble'; variant: string }

const message = kind === 'bubble' ? instance.getString('Message') : "Message de l'infobulle"

const rendered = renderFor(stack, {
  angular: () => {
    if (kind === 'hover') {
      return {
        imports: ["import { DsfrTooltipDirective } from '@edugouvfr/ngx-dsfr'"],
        example: figma.code`<a href="/page" tooltip="Message de l'infobulle">Libellé du lien</a>`,
      }
    }
    return {
      imports: ["import { DsfrTooltipButtonComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-tooltip-button tooltip="${escapeAttribute(message)}"></dsfr-tooltip-button>`,
    }
  },
  html: () => {
    if (kind === 'click') {
      return {
        example: figma.code`<button type="button" class="fr-btn--tooltip fr-btn" aria-describedby="tooltip">Information contextuelle</button>
<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">Message de l'infobulle</span>`,
      }
    }
    if (kind === 'hover') {
      return {
        example: figma.code`<a href="/page" id="tooltip-trigger" aria-describedby="tooltip">Libellé du lien</a>
<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">Message de l'infobulle</span>`,
      }
    }
    return {
      example: figma.code`<span class="fr-tooltip fr-placement" id="tooltip" role="tooltip" aria-hidden="true">${escapeText(message)}</span>`,
    }
  },
  react: () => {
    const imports = ["import { Tooltip } from '@codegouvfr/react-dsfr/Tooltip'"]
    if (kind === 'click') return { imports, example: figma.code`<Tooltip kind="click" title="Message de l'infobulle" />` }
    if (kind === 'hover') return { imports, example: figma.code`<Tooltip title="Message de l'infobulle">Libellé du lien</Tooltip>` }
    return { imports, example: figma.code`<Tooltip title="${escapeAttribute(message)}" />` }
  },
  vue: () => {
    const imports = ["import DsfrTooltip from '@gouvminint/vue-dsfr/DsfrTooltip.vue'"]
    if (kind === 'hover') return { imports, example: figma.code`<DsfrTooltip content="Message de l'infobulle" on-hover>Libellé du lien</DsfrTooltip>` }
    return { imports, example: figma.code`<DsfrTooltip content="${escapeAttribute(message)}">Information contextuelle</DsfrTooltip>` }
  },
})

export default {
  id: `tooltip-${variant}`,
  ...rendered,
  metadata: { nestable: true },
}
