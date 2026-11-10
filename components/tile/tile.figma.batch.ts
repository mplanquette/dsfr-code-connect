// Tuile DSFR : 2 sets (Desktop, Mobile), thème clair uniquement. Desktop et Mobile ne diffèrent
// que par Focus et le nombre d'états pseudo-CSS (Survol absent au tactile) : même snippet.
// Les composants préfixés « ⚙️ » (Contenu, Corps, Zone de précision, Zone d'action) sont des
// atomes internes, non connectés. Thème sombre = CSS seul. Focus, Survol, Cliqué = pseudo-états.
// « Hauteur fixe » n'a pas d'équivalent dans les portages ni de classe DSFR : non bindé.
// « Cliquable = False » retire le lien, non représentable en une seule input : non bindé, le lien
// reste présent (comportement par défaut le plus courant). « Pictogramme » (échange d'instance)
// n'est pas lu : « Voir Picto » ne décide que de la présence d'un pictogramme placeholder.
// Angular : Orientation → [horizontal], Taille → panelSize="SM".
// React : Orientation → orientation="horizontal" (rien = vertical), Taille → small ; `pictogram`
// est un ReactNode (pas une URL), placeholder sur le modèle du pictogramme « système ».
// Vue : « Taille » → prop `small` (booléenne, pas d'enum SM/MD côté vue-dsfr).
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, kind } = figma.batch as { stack: string; kind: 'desktop' | 'mobile' }

const horizontal = readEnum(instance, 'Orientation', { Horizontale: true, Verticale: false })
const small = readEnum(instance, 'Taille', { SM: true, MD: false })
const picto = instance.getBoolean('Voir Picto')
const disabled = readVariantFlag(instance, 'Désactivé')

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrTileComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-tile
  heading="Titre de la tuile"
  description="Description de la tuile."
  link="/page"${horizontal ? '\n  [horizontal]="true"' : ''}${small ? '\n  panelSize="SM"' : ''}${picto ? '\n  artworkFilePath="assets/artwork/pictograms/system/system.svg"' : ''}${disabled ? '\n  [disabled]="true"' : ''}></dsfr-tile>`,
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
      example: figma.code`<div class="fr-tile${horizontal ? ' fr-tile--horizontal' : ''}${small ? ' fr-tile--sm' : ''}">
  <div class="fr-tile__body">
    <div class="fr-tile__content">
      <h3 class="fr-tile__title">
        <a href="/page"${disabled ? ' aria-disabled="true"' : ''}>Titre de la tuile</a>
      </h3>
      <p class="fr-tile__desc">Description de la tuile.</p>
    </div>
  </div>${header}
</div>`,
    }
  },
  react: () => ({
    imports: ["import { Tile } from '@codegouvfr/react-dsfr/Tile'"],
    example: figma.code`<Tile
  title="Titre de la tuile"
  desc="Description de la tuile."
  linkProps={{ to: '/page' }}${horizontal ? '\n  orientation="horizontal"' : ''}${small ? '\n  small' : ''}${picto ? '\n  pictogram={<img src="/artwork/pictograms/system/system.svg" alt="" />}' : ''}${disabled ? '\n  disabled' : ''}
/>`,
  }),
  vue: () => ({
    imports: ["import DsfrTile from '@gouvminint/vue-dsfr/DsfrTile.vue'"],
    example: figma.code`<DsfrTile
  title="Titre de la tuile"
  description="Description de la tuile."
  to="/page"${horizontal ? ' horizontal' : ''}${small ? ' small' : ''}${picto ? ' svg-path="assets/artwork/pictograms/system/system.svg"' : ''}${disabled ? ' disabled' : ''}
/>`,
  }),
})

export default {
  id: `tile-${kind}`,
  ...rendered,
  metadata: { nestable: true },
}
