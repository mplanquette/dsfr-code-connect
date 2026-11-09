// Fil d'Ariane DSFR : 2 sets (Complet, Item). Thème = CSS seul, non bindé.
// « État Déployé / Condensé » est l'état de repli du composant (collapse DSFR, JS) : non
// pilotable par une propriété, le markup est identique.
// Un item de fil d'Ariane n'a pas de composant dédié : le set Item montre le composant parent
// configuré pour produire l'item demandé (`items`, `segments` + `currentPageLabel`, `links`) ;
// côté HTML, le fragment <li> exact. « Type En cours » = dernier item, sans lien.
// React : pas de sous-composant item, « En cours » = currentPageLabel seul.
// Vue : DsfrBreadcrumb attend `links: { text, to }[]` ; un item sans `to` est la page courante.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, kind } = figma.batch as { stack: string; kind: 'full' | 'item' }

const current = kind === 'item' ? readEnum(instance, 'Type', { Parent: false, 'En cours': true }) : false

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrBreadcrumbComponent } from '@edugouvfr/ngx-dsfr'"],
    example: kind === 'full'
      ? figma.code`<dsfr-breadcrumb
  [items]="[
    { label: 'Accueil', routePath: '/' },
    { label: 'Rubrique', routePath: '/rubrique' },
    { label: 'Sous-rubrique', routePath: '/rubrique/sous-rubrique' },
    { label: 'Page courante' }
  ]"></dsfr-breadcrumb>`
      : figma.code`<dsfr-breadcrumb [items]="[${current ? "{ label: 'Page courante' }" : "{ label: 'Rubrique', routePath: '/rubrique' }"}]"></dsfr-breadcrumb>`,
  }),
  html: () => ({
    example: kind === 'full'
      ? figma.code`<nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
  <button type="button" class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">Voir le fil d'Ariane</button>
  <div class="fr-collapse" id="breadcrumb">
    <ol class="fr-breadcrumb__list">
      <li><a class="fr-breadcrumb__link" href="/">Accueil</a></li>
      <li><a class="fr-breadcrumb__link" href="/rubrique">Rubrique</a></li>
      <li><a class="fr-breadcrumb__link" aria-current="page">Page courante</a></li>
    </ol>
  </div>
</nav>`
      : figma.code`<li>${current ? '<a class="fr-breadcrumb__link" aria-current="page">Page courante</a>' : '<a class="fr-breadcrumb__link" href="/rubrique">Rubrique</a>'}</li>`,
  }),
  react: () => ({
    imports: ["import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'"],
    // Le tableau de segments est déclaré avant le JSX dans le snippet (valeur multiligne).
    example: kind === 'full'
      ? figma.code`const segments = [
  { label: 'Rubrique', linkProps: { href: '/rubrique' } },
  { label: 'Sous-rubrique', linkProps: { href: '/rubrique/sous-rubrique' } }
];

<Breadcrumb homeLinkProps={{ href: '/accueil' }} segments={segments} currentPageLabel="Page courante" />`
      : figma.code`<Breadcrumb segments={[${current ? '' : "{ label: 'Rubrique', linkProps: { href: '/rubrique' } }"}]} currentPageLabel="Page courante" />`,
  }),
  vue: () => ({
    imports: ["import DsfrBreadcrumb from '@gouvminint/vue-dsfr/DsfrBreadcrumb.vue'"],
    example: kind === 'full'
      ? figma.code`<DsfrBreadcrumb :links="[
    { text: 'Accueil', to: '/' },
    { text: 'Rubrique', to: '/rubrique' },
    { text: 'Sous-rubrique', to: '/rubrique/sous-rubrique' },
    { text: 'Page courante' }
  ]" />`
      : figma.code`<DsfrBreadcrumb :links="[${current ? "{ text: 'Page courante' }" : "{ text: 'Rubrique', to: '/rubrique' }"}]" />`,
  }),
})

export default {
  id: `breadcrumb-${kind}`,
  ...rendered,
  metadata: { nestable: true },
}
