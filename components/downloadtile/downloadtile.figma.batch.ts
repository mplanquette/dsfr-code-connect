// Tuile de téléchargement DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, même snippet
// (Desktop/Mobile ne diffèrent que par les pseudo-états CSS : État, Focus). Les composants « ⚙️ »
// (Contenu, Zone de précision) sont des atomes internes, non connectés. Thème sombre = CSS seul.
// « Hauteur fixe » et « Pictogramme » (échange d'instance) ne sont pas lus : le pictogramme reste
// un placeholder (system.svg), « Voir Picto » ne décide que de sa présence.
// Angular : `[download]="true"` bascule dsfr-tile vers son rendu de téléchargement.
// HTML : `fr-tile--download` bascule la tuile vers son rendu de téléchargement.
// React : `downloadButton` bascule <Tile> (contrepartie de `[download]`) ; `disabled` est une
// vraie prop native de react-dsfr.
// Vue : `download` ; `details` porte la métadonnée déjà formatée (pas de props séparées
// mimeType/sizeBytes côté vue-dsfr) ; `small` remplace `panelSize="SM"`.
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, kind } = figma.batch as { stack: string; kind: 'desktop' | 'mobile' }

const small = readEnum(instance, 'Taille', { SM: true, MD: false })
const picto = instance.getBoolean('Voir Picto')
const disabled = readVariantFlag(instance, 'Désactivé')

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrTileComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-tile
  heading="Nom du fichier"
  [download]="true"
  link="/assets/fichier.pdf"
  downloadMimeType="application/pdf"
  [downloadSizeBytes]="518000"${small ? '\n  panelSize="SM"' : ''}${picto ? '\n  artworkFilePath="assets/artwork/pictograms/system/system.svg"' : ''}${disabled ? '\n  [disabled]="true"' : ''}></dsfr-tile>`,
  }),
  html: () => {
    const header = picto
      ? `\n  <div class="fr-tile__header">
    <div class="fr-tile__pictogram">
      <svg aria-hidden="true" class="fr-artwork" viewBox="0 0 80 80" width="80px" height="80px">
        <use class="fr-artwork-decorative" href="/artwork/pictograms/system/system.svg#artwork-decorative"></use>
        <use class="fr-artwork-minor" href="/artwork/pictograms/system/system.svg#artwork-minor"></use>
        <use class="fr-artwork-major" href="/artwork/pictograms/system/system.svg#artwork-major"></use>
      </svg>
    </div>
  </div>`
      : ''
    return {
      example: figma.code`<div class="fr-tile fr-tile--download${small ? ' fr-tile--sm' : ''}">
  <div class="fr-tile__body">
    <div class="fr-tile__content">
      <h3 class="fr-tile__title">
        <a href="/assets/fichier.pdf" download="fichier.pdf"${disabled ? ' aria-disabled="true"' : ''}>Nom du fichier</a>
      </h3>
      <p class="fr-tile__detail">PDF, 506 Ko</p>
    </div>
  </div>${header}
</div>`,
    }
  },
  react: () => ({
    imports: ["import { Tile } from '@codegouvfr/react-dsfr/Tile'"],
    example: figma.code`<Tile
  title="Nom du fichier"
  detail="PDF, 518 Ko"
  downloadButton
  linkProps={{ href: '/assets/fichier.pdf', download: true }}${small ? '\n  small' : ''}${picto ? '\n  pictogram={<img src="/assets/artwork/pictograms/system/system.svg" alt="" />}' : ''}${disabled ? '\n  disabled' : ''} />`,
  }),
  vue: () => ({
    imports: ["import DsfrTile from '@gouvminint/vue-dsfr/DsfrTile.vue'"],
    example: figma.code`<DsfrTile
    title="Nom du fichier"
    download
    to="/assets/fichier.pdf"
    details="PDF, 506 Ko"${small ? ' small' : ''}${picto ? '\n    svg-path="assets/artwork/pictograms/system/system.svg"' : ''}${disabled ? ' disabled' : ''}
  />`,
  }),
})

export default {
  id: `downloadtile-${kind}`,
  ...rendered,
  metadata: { nestable: true },
}
