// Barre de recherche DSFR : 1 set. Thème = CSS seul.
// « État Rempli / Défaut » n'est pas dérivable en dehors d'une valeur de démonstration
// non représentative → non bindé.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance

const large = readEnum(instance, 'Taille', { LG: true, MD: false })

const rendered = renderFor(figma.batch.stack, {
  angular: () => ({
    imports: ["import { DsfrSearchBarComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-search-bar label="Rechercher"${large ? ' [large]="true"' : ''}></dsfr-search-bar>`,
  }),
  html: () => ({
    example: figma.code`<div class="fr-search-bar${large ? ' fr-search-bar--lg' : ''}" role="search">
  <label class="fr-label" for="search">Rechercher</label>
  <input class="fr-input" type="search" id="search" name="search" placeholder="Rechercher" />
  <button class="fr-btn" title="Rechercher">Rechercher</button>
</div>`,
  }),
  react: () => ({
    imports: ["import { SearchBar } from '@codegouvfr/react-dsfr/SearchBar'"],
    example: figma.code`<SearchBar label="Rechercher"${large ? ' big' : ''} />`,
  }),
  vue: () => ({
    imports: ["import DsfrSearchBar from '@gouvminint/vue-dsfr/DsfrSearchBar.vue'"],
    example: figma.code`<DsfrSearchBar label="Rechercher"${large ? ' large' : ''} />`,
  }),
})

export default {
  id: 'searchbar',
  ...rendered,
  metadata: { nestable: true },
}
