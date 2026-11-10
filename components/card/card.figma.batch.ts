// Carte DSFR : 9 sets utiles (Verticale x 3 tailles, Horizontale x 3 tailles x avec/sans média), en
// thème clair uniquement, rendus par un seul template. Données de chaque set dans card.json :
// `layout` (vertical / horizontal), `size` (SM / MD / LG) et, pour l'horizontale, `hasMedia`.
// Les composants préfixés « ⚙️ » (Média, Zone d'action, Zone de précision, Détail, Badge ou tag,
// Contenu, Description) sont des atomes internes qui composent ces 9 sets : non connectés.
// Thème sombre = CSS seul. Focus, Survol, Cliqué = pseudo-états : ignorés. Support
// (Desktop/Mobile) = CSS responsive.
// « Cliquable = False » retire le lien : la carte devient un simple panneau d'information, non
// représentable en une seule input : non bindé, le lien reste présent dans tous les exemples
// (comportement par défaut le plus courant).
// « Voir Média » : sets verticaux uniquement ; la carte horizontale « Sans média » n'a pas
// d'équivalent média à afficher.
// « Désactivé » : lu pour Angular (`[disabled]`) et HTML (`aria-disabled`) seulement. `CardProps`
// de react-dsfr n'a pas de prop `disabled`, `DsfrCard` (vue-dsfr) non plus : non bindé.
// « Proportions » (horizontales avec média) : Angular `horizontalProportion`, HTML classe
// `fr-card--horizontal-tier|half`, React `ratio="33/66|50/50"`, Vue `img-ratio="sm|lg"`
// (40-60 = défaut, rien).
// Anomalie de l'ancien code Vue : la clé '33-66' était dupliquée dans le mapping de la carte
// horizontale LG avec média (sans effet, même valeur) ; non reproduite car sans conséquence.
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, layout, size, hasMedia } = figma.batch as {
  stack: string
  layout: 'vertical' | 'horizontal'
  size: 'SM' | 'MD' | 'LG'
  hasMedia?: boolean
}

const horizontal = layout === 'horizontal'
const media = horizontal ? Boolean(hasMedia) : instance.getBoolean('Voir Média')
const proportion = horizontal && media ? readEnum(instance, 'Proportions', { '33-66': 'tier', '40-60': 'default', '50-50': 'half' } as const) : 'default'
const disabled = readVariantFlag(instance, 'Désactivé')

const rendered = renderFor(stack, {
  angular: () => {
    const sizeAttr = { SM: '\n  panelSize="SM"', MD: '', LG: '\n  panelSize="LG"' }[size]
    const mediaAttrs = media ? `\n  imagePath="assets/img/card.jpg"\n  imageAlt=""` : ''
    const proportionAttr = { tier: ' horizontalProportion="1tier/2tier"', default: '', half: ' horizontalProportion="moitié/moitié"' }[proportion]
    const disabledAttr = disabled ? '\n  [disabled]="true"' : ''
    const attrs = horizontal
      ? `${mediaAttrs}\n  [horizontal]="true"${sizeAttr}${proportionAttr}${disabledAttr}`
      : `${sizeAttr}${mediaAttrs}${disabledAttr}`
    return {
      imports: ["import { DsfrCardComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-card
  heading="Titre de la carte"
  description="Description de la carte."
  link="/page"${attrs}></dsfr-card>`,
    }
  },
  html: () => {
    const classes = `fr-card${horizontal ? ' fr-card--horizontal' : ''}${{ SM: ' fr-card--sm', MD: '', LG: ' fr-card--lg' }[size]}${{ tier: ' fr-card--horizontal-tier', default: '', half: ' fr-card--horizontal-half' }[proportion]}`
    const disabledAttr = disabled ? ' aria-disabled="true"' : ''
    const header = media
      ? `\n  <div class="fr-card__header">
    <div class="fr-card__img">
      <img class="fr-responsive-img" src="assets/img/card.jpg" alt="" />
    </div>
  </div>`
      : ''
    return {
      example: figma.code`<div class="${classes}">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/page"${disabledAttr}>Titre de la carte</a>
      </h3>
      <p class="fr-card__desc">Description de la carte.</p>
    </div>
  </div>${header}
</div>`,
    }
  },
  react: () => {
    const sizeAttr = { SM: '\n  size="small"', MD: '', LG: '\n  size="large"' }[size]
    const mediaAttrs = media ? `\n  imageUrl="assets/img/card.jpg"\n  imageAlt=""` : ''
    const ratio = { tier: ' ratio="33/66"', default: '', half: ' ratio="50/50"' }[proportion]
    const attrs = horizontal ? `${mediaAttrs}\n  horizontal${sizeAttr}${ratio}` : `${sizeAttr}${mediaAttrs}`
    return {
      imports: ["import { Card } from '@codegouvfr/react-dsfr/Card'"],
      example: figma.code`<Card
  title="Titre de la carte"
  desc="Description de la carte."
  linkProps={{ to: '/page' }}${attrs}
/>`,
    }
  },
  vue: () => {
    const sizeAttr = { SM: '\n  size="sm"', MD: '', LG: '\n  size="lg"' }[size]
    const mediaAttrs = media ? `\n  img-src="assets/img/card.jpg"\n  alt-img=""` : ''
    const ratio = { tier: ' img-ratio="sm"', default: '', half: ' img-ratio="lg"' }[proportion]
    const attrs = horizontal ? `${mediaAttrs}\n  horizontal${sizeAttr}${ratio}` : `${sizeAttr}${mediaAttrs}`
    return {
      imports: ["import DsfrCard from '@gouvminint/vue-dsfr/DsfrCard.vue'"],
      example: figma.code`<DsfrCard
  title="Titre de la carte"
  description="Description de la carte."
  link="/page"${attrs}
/>`,
    }
  },
})

export default {
  id: `card-${layout}-${size}${horizontal ? (media ? '-media' : '-sans-media') : ''}`,
  ...rendered,
  metadata: { nestable: true },
}
