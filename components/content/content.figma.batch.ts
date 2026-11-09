// Contenu médias DSFR : 1 set. Les trois sets « _🚫Éléments » sont des atomes internes Figma →
// non connectés. Thème et Support = CSS seul.
// « Taille média » exprime la largeur en colonnes de la grille : 6 → SM, 8 → MD,
// 10 colonnes 100% → LG. Le nom de l'option « 6 collones » est la vraie valeur du design.
// HTML, React : l'image est décorative si la légende la décrit déjà : alt vide (RGAA 1.2).
// React : aucun composant react-dsfr dédié (pas de `Content.tsx`) → markup DSFR brut porté en
// JSX (`class` → `className`), comme côté HTML.
// Vue : taille → prop `size` de `DsfrPicture` (small, medium, large), composant dédié.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance

const size = readEnum(instance, 'Taille média', {
  '6 collones': 'SM',
  '8 colonnes': 'MD',
  '10 colonnes 100%': 'LG',
} as const)

const rendered = renderFor(figma.batch.stack, {
  angular: () => ({
    imports: ["import { DsfrContentComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-content
  type="image"
  source="assets/img/media.jpg"
  alternate="Description de l'image"
  ratio="16:9"
  legend="Légende de l'image"${` contentSize="${size}"`}></dsfr-content>`,
  }),
  html: () => ({
    example: figma.code`<figure class="fr-content-media${{ SM: ' fr-content-media--sm', MD: '', LG: ' fr-content-media--lg' }[size]}" role="group" aria-label="Légende de l'image">
  <div class="fr-content-media__img">
    <img class="fr-responsive-img fr-ratio-16x9" src="assets/img/media.jpg" alt="" />
  </div>
  <figcaption class="fr-content-media__caption">Légende de l'image</figcaption>
</figure>`,
  }),
  react: () => ({
    example: figma.code`<figure className="fr-content-media${{ SM: ' fr-content-media--sm', MD: '', LG: ' fr-content-media--lg' }[size]}" role="group" aria-label="Légende de l'image">
  <div className="fr-content-media__img">
    <img className="fr-responsive-img fr-ratio-16x9" src="assets/img/media.jpg" alt="" />
  </div>
  <figcaption className="fr-content-media__caption">Légende de l'image</figcaption>
</figure>`,
  }),
  vue: () => ({
    imports: ["import DsfrPicture from '@gouvminint/vue-dsfr/DsfrPicture.vue'"],
    example: figma.code`<DsfrPicture
  src="assets/img/media.jpg"
  alt="Description de l'image"
  ratio="16x9"
  legend="Légende de l'image"${{ SM: ' size="small"', MD: ' size="medium"', LG: ' size="large"' }[size]}
/>`,
  }),
})

export default {
  id: 'content',
  ...rendered,
  metadata: { nestable: true },
}
