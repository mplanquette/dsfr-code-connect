// Carte de téléchargement DSFR : 8 sets (Desktop/Mobile × MD/SM × Avec/Sans média), thème clair
// uniquement. `size` (SM/MD) et `media` (avec ou sans média) viennent de l'entrée du set dans
// downloadcard.json. Desktop et Mobile ne diffèrent que par Focus et le nombre d'états
// pseudo-CSS : même snippet. Les composants « ⚙️ » (Contenu, Corps, Zone de précision, Zone
// d'action, Média) sont des atomes internes : non connectés. Thème sombre = CSS seul. Focus,
// Survol, Cliqué = pseudo-états : ignorés.
//   - Angular : `[download]="true"` bascule dsfr-card vers son rendu de téléchargement.
//   - HTML : `fr-card--download` (titre = nom du fichier, zone de fin = métadonnées).
//   - React : <Card> n'a pas de mode « téléchargement » dédié : approximé avec
//     `linkProps={{ href, download: true }}` + `enlargeLink` (carte entièrement cliquable) et
//     `detail` pour le type/poids du fichier, solution à valider par le dev. « Désactivé » n'a
//     pas non plus de prop dédiée sur <Card> : approximé via `nativeDivProps={{ "aria-disabled":
//     true }}`, sans le traitement visuel complet (à compléter par CSS côté dev si besoin).
//   - Vue : `download` bascule DsfrCard vers son rendu de téléchargement, pas de props dédiées
//     `downloadMimeType`/`downloadSizeBytes` côté vue-dsfr : la métadonnée se pose via `detail`.
//     « Désactivé » n'a pas d'équivalent dans `DsfrCardProps` : non bindé.
import figma from 'figma'
import { readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, size, media } = figma.batch as { stack: string; size: 'SM' | 'MD'; media: boolean }
const small = size === 'SM'

// Vue ne lit pas « Désactivé » : la propriété n'est lue que par les trois autres stacks.
const readDisabled = () => readVariantFlag(instance, 'Désactivé')

const rendered = renderFor(stack, {
  angular: () => {
    const disabled = readDisabled() ? '\n  [disabled]="true"' : ''
    const image = media ? '\n  imagePath="assets/img/card.jpg"\n  imageAlt=""' : ''
    const panelSize = small ? '\n  panelSize="SM"' : ''
    return {
      imports: ["import { DsfrCardComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-card
  heading="Nom du fichier"
  [download]="true"
  link="/assets/fichier.pdf"
  downloadMimeType="application/pdf"
  [downloadSizeBytes]="518000"${image}${panelSize}${disabled}></dsfr-card>`,
    }
  },
  html: () => {
    const disabled = readDisabled() ? ' aria-disabled="true"' : ''
    const header = media
      ? `
  <div class="fr-card__header">
    <div class="fr-card__img">
      <img class="fr-responsive-img" src="assets/img/card.jpg" alt="" />
    </div>
  </div>`
      : ''
    return {
      example: figma.code`<div class="fr-card fr-card--download${small ? ' fr-card--sm' : ''}">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/assets/fichier.pdf" download="fichier.pdf"${disabled}>Nom du fichier</a>
      </h3>
      <div class="fr-card__end">
        <p class="fr-card__detail">PDF, 506 Ko</p>
      </div>
    </div>
  </div>${header}
</div>`,
    }
  },
  react: () => {
    const disabled = readDisabled() ? '\n  nativeDivProps={{ "aria-disabled": true }}' : ''
    const image = media ? '\n  imageUrl="/assets/img/card.jpg"\n  imageAlt=""' : ''
    const sizeProp = small ? '\n  size="small"' : ''
    return {
      imports: ["import { Card } from '@codegouvfr/react-dsfr/Card'"],
      example: figma.code`<Card
  title="Nom du fichier"
  detail="PDF, 518 Ko"${image}${sizeProp}
  enlargeLink
  linkProps={{ href: '/assets/fichier.pdf', download: true }}${disabled} />`,
    }
  },
  vue: () => {
    const image = media ? '\n    img-src="assets/img/card.jpg"\n    alt-img=""' : ''
    const sizeProp = small ? '\n    size="sm"' : ''
    return {
      imports: ["import DsfrCard from '@gouvminint/vue-dsfr/DsfrCard.vue'"],
      example: figma.code`<DsfrCard
    title="Nom du fichier"
    download
    link="/assets/fichier.pdf"
    detail="PDF, 506 Ko"${image}${sizeProp}
  />`,
    }
  },
})

export default {
  id: `downloadcard-${small ? 'sm' : 'md'}-${media ? 'media' : 'no-media'}`,
  ...rendered,
  metadata: { nestable: true },
}
