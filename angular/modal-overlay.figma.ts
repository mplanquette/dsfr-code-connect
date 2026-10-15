// url=<FIGMA_MODALE__MODALE_SURCOUCHE>
// Surcouche de modale : fond assombri sans contenu propre. [concealingBackdrop] règle son
// comportement au clic. Non imbricable pour ne pas dupliquer le snippet de la modale parente.
import figma from 'figma'

export default {
  id: 'modal-overlay',
  imports: ["import { DsfrModalComponent } from '@edugouvfr/ngx-dsfr'"],
  example: figma.code`<dsfr-modal dialogId="modal" titleModal="Titre de la modale" [concealingBackdrop]="true">
  Contenu de la modale.
</dsfr-modal>`,
  metadata: { nestable: false },
}
