// Surcouche de modale : fond assombri sans contenu propre, rendu par le DSFR autour de toute
// modale. Elle est imbriquée dans les sets Desktop et Mobile : non imbricable, pour ne pas
// dupliquer le snippet de la modale parente.
import figma from 'figma'
import { renderFor } from '../_shared/stack'

const rendered = renderFor(figma.batch.stack, {
  angular: () => ({
    imports: ["import { DsfrModalComponent } from '@edugouvfr/ngx-dsfr'"],
    // [concealingBackdrop] règle le comportement de la surcouche au clic.
    example: figma.code`<dsfr-modal dialogId="modal" titleModal="Titre de la modale" [concealingBackdrop]="true">
  Contenu de la modale.
</dsfr-modal>`,
  }),
  html: () => ({
    example: figma.code`<!-- La surcouche est rendue par le DSFR autour de toute modale fr-modal -->
<dialog id="modal" class="fr-modal" aria-labelledby="modal-title"></dialog>`,
  }),
  react: () => ({
    imports: ["import { createModal } from '@codegouvfr/react-dsfr/Modal'"],
    example: figma.code`// La surcouche est rendue par react-dsfr autour de toute modale
const modal = createModal({ id: 'modal', isOpenedByDefault: false })`,
  }),
  vue: () => ({
    imports: ["import DsfrModal from '@gouvminint/vue-dsfr/DsfrModal.vue'"],
    example: figma.code`<!-- La surcouche est rendue par DsfrModal (élément <dialog>) -->
<DsfrModal modal-id="modal" title="Titre de la modale" :opened="true" />`,
  }),
})

export default {
  id: 'modal-overlay',
  ...rendered,
  metadata: { nestable: false },
}
