// Pagination DSFR : 3 sets (Incrément, Numéro, Complète). Thème et Support = CSS seul, non bindés.
// Survol = pseudo-état, ignoré (mais l'option doit rester couverte par les mappings).
// Les sets Incrément et Numéro sont des sous-éléments sans composant dédié côté portages :
// `dsfr-pagination` / `Pagination` / `DsfrPagination` génèrent la barre entière, les snippets
// illustrent la position correspondante (sur la première page, « Précédente » et « Extrêmes »
// sont automatiquement désactivés). Côté HTML, le fragment <li> exact ; les liens désactivés
// utilisent aria-disabled + role="link" (pas d'attribut href), conformément au DSFR : ils
// restent focusables (RGAA 7.3).
// Vue : DsfrPagination attend un tableau `pages` explicite (pas de `pageCount`/`totalElements`
// comme ngx-dsfr) et un `current-page` 0-indexé.
// Angular : le set Complète ajoute [totalElements] et [rowsPerPage]. Les autres stacks n'ont pas
// d'équivalent dans leur snippet historique.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, kind } = figma.batch as { stack: string; kind: 'increment' | 'number' | 'full' }

// Page courante illustrée (1-indexée) : Numéro « Courant » → page 3, tout le reste → page 1.
let current = '1'
if (kind === 'number') current = readEnum(instance, 'État', { Défaut: '1', Courant: '3', Survol: '1' } as const)
// Le set Incrément lit « Sens » pour le HTML ; les portages montrent la première page dans tous les cas.
const incrementSens = kind === 'increment' ? readEnum(instance, 'Sens', { Précédente: 'prev', Suivante: 'next' } as const) : 'prev'
const incrementLabelClass = kind === 'increment' ? readEnum(instance, 'Label', { True: ' fr-pagination__link--lg-label', False: '' }) : ''
const incrementState = kind === 'increment'
  ? readEnum(instance, 'État', { Défaut: ' href="#"', Survol: ' href="#"', Désactivé: ' aria-disabled="true" role="link"' })
  : ''
const numberState = kind === 'number'
  ? readEnum(instance, 'État', { Défaut: ' href="#"', Courant: ' aria-current="page" href="#"', Survol: ' href="#"' })
  : ''

const vuePages = Array.from({ length: 10 }, (_, i) => `    { label: '${i + 1}', title: 'Page ${i + 1}' }`).join(',\n')

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrPaginationComponent } from '@edugouvfr/ngx-dsfr'"],
    example: kind === 'full'
      ? figma.code`<dsfr-pagination
  [currentPage]="1"
  [pageCount]="10"
  [totalElements]="200"
  [rowsPerPage]="20"
  ariaLabel="Pagination des résultats"></dsfr-pagination>`
      : figma.code`<dsfr-pagination
  [currentPage]="${current}"
  [pageCount]="10"
  ariaLabel="Pagination des résultats"></dsfr-pagination>`,
  }),
  html: () => {
    if (kind === 'increment') {
      const directionClass = incrementSens === 'prev' ? ' fr-pagination__link--prev' : ' fr-pagination__link--next'
      const label = incrementSens === 'prev' ? 'Page précédente' : 'Page suivante'
      return {
        example: figma.code`<li>
  <a class="fr-pagination__link${directionClass}${incrementLabelClass}"${incrementState}>${label}</a>
</li>`,
      }
    }
    if (kind === 'number') {
      return {
        example: figma.code`<li>
  <a class="fr-pagination__link" title="Page 2"${numberState}>2</a>
</li>`,
      }
    }
    return {
      example: figma.code`<nav role="navigation" class="fr-pagination" aria-label="Pagination des résultats">
  <ul class="fr-pagination__list">
    <li>
      <a class="fr-pagination__link fr-pagination__link--first" aria-disabled="true" role="link">Première page</a>
    </li>
    <li>
      <a class="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label" aria-disabled="true" role="link">Page précédente</a>
    </li>
    <li><a class="fr-pagination__link" aria-current="page" title="Page 1" href="#">1</a></li>
    <li><a class="fr-pagination__link" title="Page 2" href="#">2</a></li>
    <li><a class="fr-pagination__link" title="Page 3" href="#">3</a></li>
    <li>
      <a class="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label" href="#">Page suivante</a>
    </li>
    <li>
      <a class="fr-pagination__link fr-pagination__link--last" href="#">Dernière page</a>
    </li>
  </ul>
</nav>`,
    }
  },
  react: () => ({
    imports: ["import { Pagination } from '@codegouvfr/react-dsfr/Pagination'"],
    example: figma.code`<Pagination count={10} defaultPage={${current}} getPageLinkProps={(pageNumber) => ({ href: '/page/' + pageNumber })} />`,
  }),
  vue: () => ({
    imports: ["import DsfrPagination from '@gouvminint/vue-dsfr/DsfrPagination.vue'"],
    // current-page 0-indexé : page 3 → 2, page 1 → 0.
    example: figma.code`<DsfrPagination :pages="[
${vuePages}
  ]" :current-page="${String(Number(current) - 1)}" aria-label="Pagination des résultats" />`,
  }),
})

export default {
  id: `pagination-${kind}`,
  ...rendered,
  metadata: { nestable: true },
}
