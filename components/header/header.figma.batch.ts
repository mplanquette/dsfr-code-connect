// En-tête DSFR : 2 sets (Desktop, Mobile), thème clair uniquement. Le composant est responsive
// (dsfr-header, markup HTML, <Header> react-dsfr, DsfrHeader) : les deux sets ne diffèrent que par
// le nom de la propriété qui porte la recherche (« Fonctionnel droite » en Desktop, « Recherche »
// en Mobile, lue via `searchProperty`). Le set Mobile a en plus « Menu », non lue.
// Les composants « Éléments » (Exemple de logo, Fonctionnel droite, Bloc marque) sont des atomes
// internes, non connectés. « Recherche ouverte » (Mobile) est un état transitoire d'interaction
// (panneau de recherche déplié), non piloté par une propriété : non connecté. Thème sombre = CSS seul.
// HTML : « Description » n'a pas de rendu dans le fragment historique, seul le nom du site est
// rendu (anomalie historique reproduite).
// React : Recherche → présence de `onSearchButtonClick` (seul déclencheur qui active la barre de
// recherche intégrée à <Header>, pas de booléen `searchBar` dédié). Le tableau `navigation` est
// déclaré en `const` avant le JSX dans le snippet.
// Vue : la navigation (mêmes 2 liens) se pose via le slot `mainnav` avec DsfrNavigation, dsfr-header
// n'ayant pas de prop `menu` contrairement à ngx-dsfr.
import figma from 'figma'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, searchProperty } = figma.batch as { stack: string; searchProperty: string; kind: string }

const hasTitle = instance.getBoolean('Nom du site')
const hasTagline = instance.getBoolean('Description')
const hasSearch = instance.getBoolean(searchProperty)

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrHeaderComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-header
  [logo]="{ label: 'République Française' }"${hasTitle ? '\n  serviceTitle="Nom du site / de l\'organisme"' : ''}${hasTagline ? '\n  serviceTagline="Baseline / accroche du site"' : ''}${hasSearch ? '\n  [searchBar]="true"' : ''}
  [menu]="[
    { label: 'Premier lien', routePath: '/premier' },
    { label: 'Deuxième lien', routePath: '/deuxieme' }
  ]"></dsfr-header>`,
  }),
  html: () => {
    const service = hasTitle
      ? `\n        <div class="fr-header__service">
          <a href="/" title="Accueil - Nom du site / de l'organisme">
            <p class="fr-header__service-title">Nom du site / de l'organisme</p>
          </a>
        </div>`
      : ''
    const search = hasSearch
      ? '<button type="button" class="fr-btn--search fr-btn" data-fr-opened="false" aria-controls="header-search" id="header-search-button" title="Rechercher">Rechercher</button>\n              '
      : ''
    return {
      example: figma.code`<header role="banner" class="fr-header">
  <div class="fr-header__body">
    <div class="fr-container">
      <div class="fr-header__body-row">
        <div class="fr-header__brand fr-enlarge-link">
          <div class="fr-header__brand-top">
            <div class="fr-header__logo">
              <p class="fr-logo">République<br />Française</p>
            </div>
            <div class="fr-header__navbar">
              ${search}<button type="button" class="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="header-menu" id="header-menu-button" title="Menu">Menu</button>
            </div>
          </div>${service}
        </div>
      </div>
    </div>
  </div>
  <div class="fr-header__menu fr-modal" id="header-menu" aria-labelledby="header-menu-button">
    <div class="fr-container">
      <nav class="fr-nav" id="header-navigation" role="navigation" aria-label="Menu principal">
        <ul class="fr-nav__list">
          <li class="fr-nav__item"><a class="fr-nav__link" href="/premier">Premier lien</a></li>
          <li class="fr-nav__item"><a class="fr-nav__link" href="/deuxieme">Deuxième lien</a></li>
        </ul>
      </nav>
    </div>
  </div>
</header>`,
    }
  },
  react: () => ({
    imports: ["import { Header } from '@codegouvfr/react-dsfr/Header'"],
    example: figma.code`const navigation = [
  { text: 'Premier lien', linkProps: { href: '/premier' } },
  { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } }
];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: "Accueil - Nom du site / de l'organisme" }}${hasTitle ? '\n  serviceTitle="Nom du site / de l\'organisme"' : ''}${hasTagline ? '\n  serviceTagline="Baseline / accroche du site"' : ''}${hasSearch ? '\n  onSearchButtonClick={(text) => console.log(text)}' : ''}
  navigation={navigation} />`,
  }),
  vue: () => ({
    imports: ["import DsfrHeader from '@gouvminint/vue-dsfr/DsfrHeader.vue'"],
    example: figma.code`<DsfrHeader home-to="/"${hasTitle ? '\n    service-title="Nom du site / de l\'organisme"' : ''}${hasTagline ? '\n    service-description="Baseline / accroche du site"' : ''}${hasSearch ? '\n    show-search' : ''}>
    <template #mainnav>
      <DsfrNavigation
        :nav-items="[
          { to: '/premier', text: 'Premier lien' },
          { to: '/deuxieme', text: 'Deuxième lien' }
        ]"
      />
    </template>
  </DsfrHeader>`,
  }),
})

export default {
  id: `header-${figma.batch.kind}`,
  ...rendered,
  metadata: { nestable: true },
}
