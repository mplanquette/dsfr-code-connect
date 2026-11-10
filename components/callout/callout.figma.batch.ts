// Mise en avant DSFR : 1 set. Les deux composants « _🚫Éléments - Base » sont des atomes
// internes Figma → non connectés. Thème et Support = CSS seul.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-information-line.
// Angular, HTML : la description et le bouton éventuel se projettent en contenu.
// React : react-dsfr pose le bouton via la prop `buttonProps` (type `ButtonProps`), pas de
// children dédié pour le bouton.
// Vue : DsfrCallout reçoit le bouton via une prop objet `button` (DsfrButtonProps) plutôt
// qu'un `<DsfrButton>` imbriqué.
import figma from 'figma'
import { readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance

const hasIcon = readVariantFlag(instance, 'Icône')
const hasButton = readVariantFlag(instance, 'Bouton')
const ICON = 'fr-icon-information-line'

const rendered = renderFor(figma.batch.stack, {
  angular: () => ({
    imports: ["import { DsfrCalloutComponent, DsfrButtonComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-callout heading="Titre de la mise en avant"${hasIcon ? ` icon="${ICON}"` : ''}>
  Texte de la mise en avant.${hasButton ? `\n  <dsfr-button label="Libellé du bouton"></dsfr-button>` : ''}
</dsfr-callout>`,
  }),
  html: () => ({
    example: figma.code`<div class="fr-callout${hasIcon ? ` ${ICON}` : ''}">
  <h3 class="fr-callout__title">Titre de la mise en avant</h3>
  <p class="fr-callout__text">Texte de la mise en avant.</p>${hasButton ? `\n  <button type="button" class="fr-btn">Libellé du bouton</button>` : ''}
</div>`,
  }),
  react: () => ({
    imports: ["import { CallOut } from '@codegouvfr/react-dsfr/CallOut'"],
    example: figma.code`<CallOut title="Titre de la mise en avant"${hasIcon ? ` iconId="${ICON}"` : ''}${hasButton ? " buttonProps={{ children: 'Libellé du bouton', onClick: () => {} }}" : ''}>
  Texte de la mise en avant.
</CallOut>`,
  }),
  vue: () => ({
    imports: ["import DsfrCallout from '@gouvminint/vue-dsfr/DsfrCallout.vue'"],
    example: figma.code`<DsfrCallout title="Titre de la mise en avant" content="Texte de la mise en avant."${hasIcon ? ` icon="${ICON}"` : ''}${hasButton ? ` :button="{ label: 'Libellé du bouton' }"` : ''} />`,
  }),
})

export default {
  id: 'callout',
  ...rendered,
  metadata: { nestable: true },
}
