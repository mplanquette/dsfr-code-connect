// url=<FIGMA_MODALE__MODALE_SURCOUCHE>
// Surcouche de modale : fond assombri sans contenu propre, produit par la classe fr-modal.
// Elle est imbriquée dans les sets Desktop et Mobile : non imbricable pour ne pas dupliquer
// le snippet de la modale parente.
import figma from 'figma'

export default {
  id: 'modal-overlay',
  example: figma.code`<!-- Le fond assombri est rendu par le DSFR autour de toute modale -->
<dialog id="modal" class="fr-modal" aria-labelledby="modal-title">
  …
</dialog>`,
  metadata: { nestable: false },
}
