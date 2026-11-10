// Retour en haut de page DSFR : 1 set, sans aucune input.
// Survol, Cliqué, Focus et Désactivé = pseudo-états → snippet unique.
// React : aucun composant react-dsfr dédié (pas de `BackToTop.tsx` dans le repo codegouvfr/react-dsfr) :
// on reprend le markup DSFR brut déjà utilisé côté HTML, traduit en JSX (class → className).
// Vue : vue-dsfr fournit `DsfrBackToTop` (props `label`/`position`, non bindées ici car sans
// propriété Figma correspondante) : on l'utilise plutôt que le markup DSFR brut.
import figma from 'figma'
import { renderFor } from '../_shared/stack'

const rendered = renderFor(figma.batch.stack, {
  angular: () => ({
    imports: ["import { DsfrBackToTopComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-backtotop></dsfr-backtotop>`,
  }),
  html: () => ({
    example: figma.code`<a class="fr-link fr-icon-arrow-up-fill fr-link--icon-left" href="#top">Haut de page</a>`,
  }),
  react: () => ({
    example: figma.code`<a className="fr-link fr-icon-arrow-up-fill fr-link--icon-left" href="#top">Haut de page</a>`,
  }),
  vue: () => ({
    imports: ["import DsfrBackToTop from '@gouvminint/vue-dsfr/DsfrBackToTop.vue'"],
    example: figma.code`<DsfrBackToTop />`,
  }),
})

export default {
  id: 'backtotop',
  ...rendered,
  metadata: { nestable: true },
}
