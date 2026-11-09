// Onglet DSFR : 3 sets (Item, Groupe, Complet). Thème et Support = CSS seul, non bindés.
// Survol = pseudo-état, ignoré (traité comme Défaut).
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-checkbox-line.
// Angular : un onglet seul se déclare avec <dsfr-tab> dans un <dsfr-tabs> ; « Courant » →
// selectedTabIndex 0, sinon 1.
// React : `Tabs` prend `tabs: { label, content, iconId?, isDefault? }[]` (variante non
// contrôlée), pas de sous-composant « Tab ». Le tableau `tabs` est déclaré avant le JSX dans le
// snippet.
// Vue : DsfrTabs pilote titres (`tab-titles`) et contenus (`tab-contents`) par tableaux
// parallèles indexés, `model-value` est l'index (0-based) de l'onglet sélectionné.
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, kind } = figma.batch as { stack: string; kind: 'item' | 'group' | 'full' }

const hasIcon = kind === 'full' ? false : readVariantFlag(instance, 'Icône')
// Item : onglet courant (true) ou non.
const selected = kind === 'item' ? readEnum(instance, 'État', { Défaut: false, Courant: true, Survol: false }) : false

const rendered = renderFor(stack, {
  angular: () => {
    const icon = hasIcon ? ' icon="fr-icon-checkbox-line"' : ''
    const tabsImports = ["import { DsfrTabsComponent, DsfrTabComponent } from '@edugouvfr/ngx-dsfr'"]
    if (kind === 'item') {
      return {
        imports: tabsImports,
        example: figma.code`<dsfr-tabs tabsAriaLabel="Libellé du groupe d'onglets" [selectedTabIndex]="${selected ? '0' : '1'}">
  <dsfr-tab tabId="tab-1" label="Libellé de l'onglet"${icon}>Contenu de l'onglet</dsfr-tab>
</dsfr-tabs>`,
      }
    }
    return {
      imports: tabsImports,
      example: figma.code`<dsfr-tabs tabsAriaLabel="Libellé du groupe d'onglets">
  <dsfr-tab tabId="tab-1" label="Premier onglet"${icon}>Contenu du premier onglet</dsfr-tab>
  <dsfr-tab tabId="tab-2" label="Deuxième onglet"${icon}>Contenu du deuxième onglet</dsfr-tab>
  <dsfr-tab tabId="tab-3" label="Troisième onglet"${icon}>Contenu du troisième onglet</dsfr-tab>
</dsfr-tabs>`,
    }
  },
  html: () => {
    const iconClass = hasIcon ? ' fr-icon-checkbox-line fr-tabs__tab--icon-left' : ''
    if (kind === 'item') {
      return {
        example: figma.code`<li role="presentation">
  <button id="tab-1" class="fr-tabs__tab${iconClass}" tabindex="${selected ? '0' : '-1'}" role="tab" aria-selected="${String(selected)}" aria-controls="tabpanel-1">Libellé de l'onglet</button>
</li>`,
      }
    }
    if (kind === 'group') {
      return {
        example: figma.code`<ul class="fr-tabs__list" role="tablist" aria-label="Libellé du groupe d'onglets">
  <li role="presentation">
    <button id="tab-1" class="fr-tabs__tab${iconClass}" tabindex="0" role="tab" aria-selected="true" aria-controls="tabpanel-1">Premier onglet</button>
  </li>
  <li role="presentation">
    <button id="tab-2" class="fr-tabs__tab${iconClass}" tabindex="-1" role="tab" aria-selected="false" aria-controls="tabpanel-2">Deuxième onglet</button>
  </li>
  <li role="presentation">
    <button id="tab-3" class="fr-tabs__tab${iconClass}" tabindex="-1" role="tab" aria-selected="false" aria-controls="tabpanel-3">Troisième onglet</button>
  </li>
</ul>`,
      }
    }
    return {
      example: figma.code`<div class="fr-tabs">
  <ul class="fr-tabs__list" role="tablist" aria-label="Libellé du groupe d'onglets">
    <li role="presentation">
      <button id="tab-1" class="fr-tabs__tab" tabindex="0" role="tab" aria-selected="true" aria-controls="tabpanel-1">Premier onglet</button>
    </li>
    <li role="presentation">
      <button id="tab-2" class="fr-tabs__tab" tabindex="-1" role="tab" aria-selected="false" aria-controls="tabpanel-2">Deuxième onglet</button>
    </li>
  </ul>
  <div id="tabpanel-1" class="fr-tabs__panel fr-tabs__panel--selected" role="tabpanel" aria-labelledby="tab-1" tabindex="0">
    Contenu du premier onglet
  </div>
  <div id="tabpanel-2" class="fr-tabs__panel" role="tabpanel" aria-labelledby="tab-2" tabindex="0">
    Contenu du deuxième onglet
  </div>
</div>`,
    }
  },
  react: () => {
    const icon = hasIcon ? ", iconId: 'fr-icon-checkbox-line'" : ''
    const imports = ["import { Tabs } from '@codegouvfr/react-dsfr/Tabs'"]
    if (kind === 'item') {
      return {
        imports,
        example: figma.code`const tabs = [
  { label: "Libellé de l'onglet", content: "Contenu de l'onglet", isDefault: ${String(selected)}${icon} }
];

<Tabs label="Libellé du groupe d'onglets" tabs={tabs} />`,
      }
    }
    if (kind === 'group') {
      return {
        imports,
        example: figma.code`const tabs = [
  { label: 'Premier onglet', content: 'Contenu du premier onglet', isDefault: true${icon} },
  { label: 'Deuxième onglet', content: 'Contenu du deuxième onglet'${icon} },
  { label: 'Troisième onglet', content: 'Contenu du troisième onglet'${icon} }
];

<Tabs label="Libellé du groupe d'onglets" tabs={tabs} />`,
      }
    }
    return {
      imports,
      example: figma.code`const tabs = [
  { label: 'Premier onglet', content: 'Contenu du premier onglet', isDefault: true },
  { label: 'Deuxième onglet', content: 'Contenu du deuxième onglet' }
];

<Tabs label="Libellé du groupe d'onglets" tabs={tabs} />`,
    }
  },
  vue: () => {
    const icon = hasIcon ? ", icon: 'fr-icon-checkbox-line'" : ''
    const imports = ["import DsfrTabs from '@gouvminint/vue-dsfr/DsfrTabs.vue'"]
    if (kind === 'item') {
      return {
        imports,
        example: figma.code`<DsfrTabs tab-list-name="Libellé du groupe d'onglets" :model-value="${selected ? '0' : '1'}" :tab-titles="[
    { title: 'Libellé de l\\'onglet'${icon} }
  ]" :tab-contents="['Contenu de l\\'onglet']" />`,
      }
    }
    return {
      imports,
      example: figma.code`<DsfrTabs tab-list-name="Libellé du groupe d'onglets" :tab-titles="[
    { title: 'Premier onglet'${icon} },
    { title: 'Deuxième onglet'${icon} },
    { title: 'Troisième onglet'${icon} }
  ]" :tab-contents="['Contenu du premier onglet', 'Contenu du deuxième onglet', 'Contenu du troisième onglet']" />`,
    }
  },
})

export default {
  id: `tabs-${kind}`,
  ...rendered,
  metadata: { nestable: true },
}
