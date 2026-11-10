// Navigation principale DSFR : 13 sets, un seul template pour les 4 stacks (`part` dans
// mainnav.json). Contrairement aux autres familles, le thème (Clair/Sombre) est ici une variante
// interne à chaque set, pas une duplication de page : les 13 sets couvrent déjà tout le périmètre
// utile. Survol = pseudo-état → ignoré. « >1200px » et « Dernier lien » sont des variantes de mise
// en page CSS, non pilotables par une input → ignorées. « Rubrique » (vs « Lien direct ») d'un menu
// déroulant simple n'a pas de rendu distinct → non bindé.
//
// Angular : aucun composant dédié par fragment : `dsfr-header` génère toute la navigation (desktop
// ET mobile, de façon responsive) à partir d'une seule entrée `[menu]` (`DsfrHeaderMenuItem[]`).
// Chaque exemple montre la configuration de `menu` qui produit le fragment sélectionné dans Figma.
// Les accès rapides mobiles viennent de `headerToolsLinks`, hors de `menu`. « Rubrique » (titre de
// section d'un menu déroulant) n'a pas d'équivalent dans `subItems` (simple tableau de liens).
//
// HTML : la navigation desktop ET mobile provient du même bloc `fr-header__menu` (responsive) :
// chaque exemple montre le fragment de markup `fr-nav` qui produit l'état sélectionné. Les accès
// rapides viennent du bloc `fr-header__tools-links`, dupliqué dans le menu mobile.
//
// React : tous les sets sont rattachés à `<Header>` (pas de composant dédié par fragment) via la
// prop `navigation` (`MainNavigationProps.Item[]`). « Ouvert » n'a PAS d'équivalent en prop
// contrôlée côté react-dsfr (`aria-expanded` géré en interne) → non bindé. « Rubrique » utilise
// `categoryMainText` / `categoryMainLink` de façon interchangeable. `leader.paragraph` est
// obligatoire côté react-dsfr : chaîne vide posée pour le cas « Titre » seul. Le tableau
// `navigation` est déclaré en `const` avant le JSX. Les accès rapides passent par
// `quickAccessItems`.
//
// Vue : vue-dsfr isole la navigation dans `DsfrNavigation` (rend directement un `<nav
// class="fr-nav">`), posé en général dans le slot `mainnav` de `DsfrHeader` ; seuls les 2
// derniers sets (accès rapides) impliquent `DsfrHeader` (prop `quick-links`). Deux façons
// d'utiliser `DsfrNavigation` : le raccourci `:nav-items` (ne propage PAS `active`) et la
// composition manuelle du slot (expose `active`). Là où « Courant » / « État » doit être visible,
// on utilise la composition manuelle ; `:nav-items` n'est gardé que pour les sets sans état actif.
// « Ouvert » SE bind, via `expanded-id` de `DsfrNavigationMenu` / `DsfrNavigationMegaMenu`.
// « État » d'un lien de catégorie de mégamenu n'a PAS d'équivalent (non bindé sur « Mégamenu -
// Item »). « Rubrique » (leader) : `DsfrNavigationMegaMenuProps` n'a pas de `leader` séparé du
// `title` du bouton, toujours rendu dans le panneau : « Sans » est approximé par « Titre » ; seule
// `description` distingue « Titre + description ». « Titre rubrique » (mobile, dépliant) non bindé :
// `DsfrNavigationMenu` n'a pas de titre de panneau. « Navigation - Liste de liens » sans catégorie :
// approximé par une catégorie dont le titre reprend le premier lien. « Item de niveau 2 » utilise
// le dépliant simple, seul à exposer `active` via `DsfrNavigationMenuItem`.
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeJsString, escapeText } from '../_shared/text'

const instance = figma.selectedInstance
const { stack, part } = figma.batch as {
  stack: string
  part:
    | 'bar-link'
    | 'bar-dropdown'
    | 'bar-full'
    | 'dropdown-item'
    | 'dropdown-full'
    | 'mega-item'
    | 'mega-full'
    | 'mobile-dropdown'
    | 'mobile-level2'
    | 'mobile-links'
    | 'mobile-link'
    | 'mobile-quick'
    | 'mobile-full'
}

const bool = (value: boolean): string => (value ? 'true' : 'false')

/** Liens d'exemple : 3 pour « Items 2-4 », 5 pour « Items 5-8 ». */
const LINKS = [
  { label: 'Premier lien', path: 'premier' },
  { label: 'Deuxième lien', path: 'deuxieme' },
  { label: 'Troisième lien', path: 'troisieme' },
  { label: 'Quatrième lien', path: 'quatrieme' },
  { label: 'Cinquième lien', path: 'cinquieme' },
]

// Lecture du design, une seule fois pour les 4 stacks (seules les propriétés du set courant sont
// lues). Les sets de la barre desktop portent « Courant », les autres « État ».
const current = part === 'bar-link' || part === 'bar-dropdown'
  ? readVariantFlag(instance, 'Courant')
  : ['dropdown-item', 'mega-item', 'mobile-dropdown', 'mobile-level2', 'mobile-link'].includes(part)
    ? readEnum(instance, 'État', { Défaut: false, Survol: false, Courant: true })
    : false
const expanded = part === 'bar-dropdown' || part === 'mobile-dropdown' ? readVariantFlag(instance, 'Ouvert') : false
const linkCount = part === 'bar-full' ? readEnum(instance, 'Items', { '2-4': 3, '5-8': 5 }) : 0
const links = LINKS.slice(0, linkCount)
const manyCategories = part === 'mega-full' ? readVariantFlag(instance, 'Catégories') : false
const leader = part === 'mega-full'
  ? readEnum(instance, 'Rubrique', { Sans: 'none', Titre: 'title', 'Titre + description': 'description' } as const)
  : 'none'
const withTitle = part === 'mobile-dropdown' ? readVariantFlag(instance, 'Titre rubrique') : false
const withCategory = part === 'mobile-links' ? readVariantFlag(instance, 'Catégorie') : false
// Set « Accès rapide » (mobile) : le libellé du lien est lu dans l'atome du design ; l'icône
// `fr-icon-lock-line` et la cible `/connexion` restent des exemples.
const quickAtom = part === 'mobile-quick' ? instance.findInstance('⚙️ Varier les propriétés - Accès rapide') : undefined
const quickLabel = quickAtom?.type === 'INSTANCE' ? quickAtom.getString('Libellé') : 'Se connecter'
const quickLabelJs = escapeJsString(quickLabel)
const quickLabelAttribute = escapeAttribute(quickLabelJs)
const quickLabelText = escapeText(quickLabel)

const withQuickAccess = part === 'mobile-full' ? readVariantFlag(instance, 'Accès rapides') : false

const rendered = renderFor(stack, {
  angular: () => {
    const example = ((): unknown => {
      switch (part) {
        case 'bar-link':
        case 'mobile-link':
          return figma.code`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{ label: 'Libellé du lien', routePath: '/lien', active: ${bool(current)} }]"></dsfr-header>`
        case 'bar-dropdown':
          return figma.code`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Menu déroulant',
    expanded: ${bool(expanded)},
    active: ${bool(current)},
    subItems: [
      { label: 'Premier lien', routePath: '/premier' },
      { label: 'Deuxième lien', routePath: '/deuxieme' }
    ]
  }]"></dsfr-header>`
        case 'bar-full':
          return figma.code`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[
${links.map((link) => `    { label: '${link.label}', routePath: '/${link.path}' }`).join(',\n')}
  ]"></dsfr-header>`
        case 'dropdown-item':
        case 'mobile-level2':
          return figma.code`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Menu déroulant',
    expanded: true,
    subItems: [{ label: 'Libellé du lien', routePath: '/lien', active: ${bool(current)} }]
  }]"></dsfr-header>`
        case 'dropdown-full':
          return figma.code`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Menu déroulant',
    expanded: true,
    subItems: [
      { label: 'Premier lien', routePath: '/premier' },
      { label: 'Deuxième lien', routePath: '/deuxieme' },
      { label: 'Troisième lien', routePath: '/troisieme' }
    ]
  }]"></dsfr-header>`
        case 'mega-item':
          return figma.code`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Rubrique',
    megaMenu: {
      categories: [{
        label: 'Catégorie',
        subItems: [{ label: 'Libellé du lien', routePath: '/lien', active: ${bool(current)} }]
      }]
    }
  }]"></dsfr-header>`
        case 'mega-full': {
          const categories = manyCategories
            ? `[
        { label: 'Première catégorie', subItems: [{ label: 'Lien', routePath: '/lien-1' }] },
        { label: 'Deuxième catégorie', subItems: [{ label: 'Lien', routePath: '/lien-2' }] }
      ]`
            : `[
        { label: 'Catégorie', subItems: [{ label: 'Lien', routePath: '/lien-1' }] }
      ]`
          const leaderProp = {
            none: '',
            title: `,
      leader: { title: 'Titre de la rubrique' }`,
            description: `,
      leader: { title: 'Titre de la rubrique', text: 'Texte de description de la rubrique.' }`,
          }[leader]
          return figma.code`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Rubrique',
    megaMenu: {
      categories: ${categories}${leaderProp}
    }
  }]"></dsfr-header>`
        }
        case 'mobile-dropdown': {
          const title = withTitle
            ? `,
      leader: { title: 'Titre de la rubrique' }`
            : ''
          return figma.code`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Menu déroulant',
    expanded: ${bool(expanded)},
    active: ${bool(current)},
    megaMenu: {
      categories: [{ label: 'Catégorie', subItems: [{ label: 'Lien', routePath: '/lien' }] }]${title}
    }
  }]"></dsfr-header>`
        }
        case 'mobile-links': {
          const category = withCategory
            ? `[{ label: 'Catégorie', subItems: [
      { label: 'Premier lien', routePath: '/premier' },
      { label: 'Deuxième lien', routePath: '/deuxieme' }
    ] }]`
            : `[{ label: 'Premier lien', routePath: '/premier' }]`
          return figma.code`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [menu]="[{
    label: 'Menu déroulant',
    expanded: true,
    megaMenu: { categories: ${category} }
  }]"></dsfr-header>`
        }
        case 'mobile-quick':
          return figma.code`<dsfr-header
  [logo]="{ label: 'République Française' }"
  [headerToolsLinks]="[
    { label: '${quickLabelAttribute}', icon: 'fr-icon-lock-line', routePath: '/connexion' }
  ]"
  [menu]="[{ label: 'Libellé du lien', routePath: '/lien' }]"></dsfr-header>`
        case 'mobile-full':
          return figma.code`<dsfr-header
  [logo]="{ label: 'République Française' }"${withQuickAccess ? `\n  [headerToolsLinks]="[{ label: 'Se connecter', icon: 'fr-icon-lock-line', routePath: '/connexion' }]"` : ''}
  [menu]="[
    { label: 'Premier lien', routePath: '/premier' },
    { label: 'Deuxième lien', routePath: '/deuxieme' },
    { label: 'Troisième lien', routePath: '/troisieme' }
  ]"></dsfr-header>`
      }
    })()
    return {
      imports: ["import { DsfrHeaderComponent } from '@edugouvfr/ngx-dsfr'"],
      example,
    }
  },
  html: () => {
    const ariaCurrent = current ? ' aria-current="page"' : ''
    const example = ((): unknown => {
      switch (part) {
        case 'bar-link':
          return figma.code`<nav class="fr-nav" role="navigation" aria-label="Menu principal">
  <ul class="fr-nav__list">
    <li class="fr-nav__item">
      <a class="fr-nav__link" href="/lien"${ariaCurrent}>Libellé du lien</a>
    </li>
  </ul>
</nav>`
        case 'bar-dropdown':
          return figma.code`<nav class="fr-nav" role="navigation" aria-label="Menu principal">
  <ul class="fr-nav__list">
    <li class="fr-nav__item">
      <button class="fr-nav__btn" aria-expanded="${bool(expanded)}" aria-controls="menu-1"${ariaCurrent}>Menu déroulant</button>
      <div class="fr-collapse fr-menu${expanded ? ' fr-collapse--expanded' : ''}" id="menu-1">
        <ul class="fr-menu__list">
          <li><a class="fr-nav__link" href="/premier">Premier lien</a></li>
          <li><a class="fr-nav__link" href="/deuxieme">Deuxième lien</a></li>
        </ul>
      </div>
    </li>
  </ul>
</nav>`
        case 'bar-full':
          return figma.code`<nav class="fr-nav" role="navigation" aria-label="Menu principal">
  <ul class="fr-nav__list">
    ${links.map((link) => `<li class="fr-nav__item"><a class="fr-nav__link" href="/${link.path}">${link.label}</a></li>`).join('\n    ')}
  </ul>
</nav>`
        case 'dropdown-item':
          return figma.code`<div class="fr-collapse fr-menu fr-collapse--expanded" id="menu-1">
  <ul class="fr-menu__list">
    <li><a class="fr-nav__link" href="/lien"${ariaCurrent}>Libellé du lien</a></li>
  </ul>
</div>`
        case 'dropdown-full':
          return figma.code`<div class="fr-collapse fr-menu fr-collapse--expanded" id="menu-1">
  <ul class="fr-menu__list">
    <li><a class="fr-nav__link" href="/premier">Premier lien</a></li>
    <li><a class="fr-nav__link" href="/deuxieme">Deuxième lien</a></li>
    <li><a class="fr-nav__link" href="/troisieme">Troisième lien</a></li>
  </ul>
</div>`
        case 'mega-item':
          return figma.code`<div class="fr-col-12 fr-col-lg-3">
  <h5 class="fr-mega-menu__category"><span class="fr-nav__link">Catégorie</span></h5>
  <ul class="fr-mega-menu__list">
    <li><a class="fr-nav__link" href="/lien"${ariaCurrent}>Libellé du lien</a></li>
  </ul>
</div>`
        case 'mega-full': {
          const categories = manyCategories
            ? `<div class="fr-col-12 fr-col-lg-3">
      <h5 class="fr-mega-menu__category"><span class="fr-nav__link">Première catégorie</span></h5>
      <ul class="fr-mega-menu__list">
        <li><a class="fr-nav__link" href="/lien-1">Lien</a></li>
      </ul>
    </div>
    <div class="fr-col-12 fr-col-lg-3">
      <h5 class="fr-mega-menu__category"><span class="fr-nav__link">Deuxième catégorie</span></h5>
      <ul class="fr-mega-menu__list">
        <li><a class="fr-nav__link" href="/lien-2">Lien</a></li>
      </ul>
    </div>`
            : `<div class="fr-col-12 fr-col-lg-3">
      <h5 class="fr-mega-menu__category"><span class="fr-nav__link">Catégorie</span></h5>
      <ul class="fr-mega-menu__list">
        <li><a class="fr-nav__link" href="/lien-1">Lien</a></li>
      </ul>
    </div>`
          const leaderBlock = {
            none: '',
            title: `\n    <div class="fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right">
      <div class="fr-mega-menu__leader">
        <h4 class="fr-h4 fr-mb-2v">Titre de la rubrique</h4>
      </div>
    </div>`,
            description: `\n    <div class="fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right">
      <div class="fr-mega-menu__leader">
        <h4 class="fr-h4 fr-mb-2v">Titre de la rubrique</h4>
        <p>Texte de description de la rubrique.</p>
      </div>
    </div>`,
          }[leader]
          return figma.code`<div class="fr-container fr-container--fluid fr-container-lg">
  <div class="fr-grid-row fr-grid-row-lg--gutters">
    <div class="fr-col-12 fr-mb-n3v">
      <button type="button" class="fr-btn--close fr-btn" aria-controls="mega-menu-1">Fermer</button>
    </div>${leaderBlock}
    ${categories}
  </div>
</div>`
        }
        case 'mobile-dropdown':
          return figma.code`<li class="fr-nav__item">
  <button class="fr-nav__btn" aria-expanded="${bool(expanded)}" aria-controls="mega-menu-1"${ariaCurrent}>Menu déroulant</button>
  <div class="fr-collapse fr-mega-menu${expanded ? ' fr-collapse--expanded' : ''}" id="mega-menu-1">${withTitle ? `\n    <h4 class="fr-h4 fr-mb-2v">Titre de la rubrique</h4>` : ''}
    <div class="fr-col-12 fr-col-lg-3">
      <h5 class="fr-mega-menu__category"><span class="fr-nav__link">Catégorie</span></h5>
      <ul class="fr-mega-menu__list">
        <li><a class="fr-nav__link" href="/lien">Lien</a></li>
      </ul>
    </div>
  </div>
</li>`
        case 'mobile-level2':
          return figma.code`<li><a class="fr-nav__link" href="/lien"${ariaCurrent}>Libellé du lien</a></li>`
        case 'mobile-links': {
          const category = withCategory
            ? `<h5 class="fr-mega-menu__category"><span class="fr-nav__link">Catégorie</span></h5>
  <ul class="fr-mega-menu__list">
    <li><a class="fr-nav__link" href="/premier">Premier lien</a></li>
    <li><a class="fr-nav__link" href="/deuxieme">Deuxième lien</a></li>
  </ul>`
            : `<ul class="fr-mega-menu__list">
    <li><a class="fr-nav__link" href="/premier">Premier lien</a></li>
  </ul>`
          return figma.code`<div class="fr-col-12 fr-col-lg-3">
  ${category}
</div>`
        }
        case 'mobile-link':
          return figma.code`<li class="fr-nav__item">
  <a class="fr-nav__link" href="/lien"${ariaCurrent}>Libellé du lien</a>
</li>`
        case 'mobile-quick':
          return figma.code`<div class="fr-header__menu-links">
  <ul class="fr-btns-group">
    <li><a class="fr-btn fr-icon-lock-line fr-btn--tertiary" href="/connexion">${quickLabelText}</a></li>
  </ul>
</div>`
        case 'mobile-full': {
          const quickAccess = withQuickAccess
            ? `\n  <div class="fr-header__menu-links">
    <ul class="fr-btns-group">
      <li><a class="fr-btn fr-icon-lock-line fr-btn--tertiary" href="/connexion">Se connecter</a></li>
    </ul>
  </div>`
            : ''
          return figma.code`<div class="fr-header__menu fr-modal fr-modal--opened" id="header-menu">
  <div class="fr-container">
    <button type="button" class="fr-btn--close fr-btn" aria-controls="header-menu">Fermer</button>${quickAccess}
    <nav class="fr-nav" id="header-navigation" role="navigation" aria-label="Menu principal">
      <ul class="fr-nav__list">
        <li class="fr-nav__item"><a class="fr-nav__link" href="/premier">Premier lien</a></li>
        <li class="fr-nav__item"><a class="fr-nav__link" href="/deuxieme">Deuxième lien</a></li>
        <li class="fr-nav__item"><a class="fr-nav__link" href="/troisieme">Troisième lien</a></li>
      </ul>
    </nav>
  </div>
</div>`
        }
      }
    })()
    return { example }
  },
  react: () => {
    const footer = `

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  navigation={navigation} />`
    const example = ((): unknown => {
      switch (part) {
        case 'bar-link':
        case 'mobile-link':
          return figma.code`const navigation = [
  { text: 'Libellé du lien', linkProps: { href: '/lien' }, isActive: ${bool(current)} }
];${footer}`
        case 'bar-dropdown':
          return figma.code`const navigation = [{
  text: 'Menu déroulant',
  isActive: ${bool(current)},
  menuLinks: [
    { text: 'Premier lien', linkProps: { href: '/premier' } },
    { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } }
  ]
}];${footer}`
        case 'bar-full':
          return figma.code`const navigation = [
${links.map((link) => `  { text: '${link.label}', linkProps: { href: '/${link.path}' } }`).join(',\n')}
];${footer}`
        case 'dropdown-item':
          return figma.code`const navigation = [{
  text: 'Menu déroulant',
  menuLinks: [{ text: 'Libellé du lien', linkProps: { href: '/lien' }, isActive: ${bool(current)} }]
}];${footer}`
        case 'dropdown-full':
          return figma.code`const navigation = [{
  text: 'Menu déroulant',
  menuLinks: [
    { text: 'Premier lien', linkProps: { href: '/premier' } },
    { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } },
    { text: 'Troisième lien', linkProps: { href: '/troisieme' } }
  ]
}];${footer}`
        case 'mega-item':
        case 'mobile-level2':
          return figma.code`const navigation = [{
  text: '${part === 'mega-item' ? 'Rubrique' : 'Menu déroulant'}',
  megaMenu: {
    categories: [{
      categoryMainText: 'Catégorie',
      links: [{ text: 'Libellé du lien', linkProps: { href: '/lien' }, isActive: ${bool(current)} }]
    }]
  }
}];${footer}`
        case 'mega-full': {
          const categories = manyCategories
            ? `[
    { categoryMainText: 'Première catégorie', links: [{ text: 'Lien', linkProps: { href: '/lien-1' } }] },
    { categoryMainText: 'Deuxième catégorie', links: [{ text: 'Lien', linkProps: { href: '/lien-2' } }] }
  ]`
            : `[
    { categoryMainText: 'Catégorie', links: [{ text: 'Lien', linkProps: { href: '/lien-1' } }] }
  ]`
          const leaderProp = {
            none: '',
            title: `,
  leader: { title: 'Titre de la rubrique', paragraph: '' }`,
            description: `,
  leader: { title: 'Titre de la rubrique', paragraph: 'Texte de description de la rubrique.' }`,
          }[leader]
          return figma.code`const navigation = [{
  text: 'Rubrique',
  megaMenu: {
    categories: ${categories}${leaderProp}
  }
}];${footer}`
        }
        case 'mobile-dropdown': {
          const title = withTitle
            ? `,
    leader: { title: 'Titre de la rubrique', paragraph: '' }`
            : ''
          return figma.code`const navigation = [{
  text: 'Menu déroulant',
  isActive: ${bool(current)},
  megaMenu: {
    categories: [{ categoryMainText: 'Catégorie', links: [{ text: 'Lien', linkProps: { href: '/lien' } }] }]${title}
  }
}];${footer}`
        }
        case 'mobile-links': {
          const category = withCategory
            ? `[{
    categoryMainText: 'Catégorie',
    links: [
      { text: 'Premier lien', linkProps: { href: '/premier' } },
      { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } }
    ]
  }]`
            : `[{
    categoryMainLink: { text: 'Premier lien', linkProps: { href: '/premier' } },
    links: []
  }]`
          return figma.code`const navigation = [{
  text: 'Menu déroulant',
  megaMenu: { categories: ${category} }
}];${footer}`
        }
        case 'mobile-quick':
          return figma.code`const navigation = [{ text: 'Libellé du lien', linkProps: { href: '/lien' } }];
const quickAccessItems = [
  { iconId: 'fr-icon-lock-line', text: '${quickLabelJs}', linkProps: { href: '/connexion' } }
];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}
  quickAccessItems={quickAccessItems}
  navigation={navigation} />`
        case 'mobile-full':
          return figma.code`${withQuickAccess ? `const quickAccessItems = [
  { iconId: 'fr-icon-lock-line', text: 'Se connecter', linkProps: { href: '/connexion' } }
];

` : ''}const navigation = [
  { text: 'Premier lien', linkProps: { href: '/premier' } },
  { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } },
  { text: 'Troisième lien', linkProps: { href: '/troisieme' } }
];

<Header
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}${withQuickAccess ? '\n  quickAccessItems={quickAccessItems}' : ''}
  navigation={navigation} />`
      }
    })()
    return {
      imports: ["import { Header } from '@codegouvfr/react-dsfr/Header'"],
      example,
    }
  },
  vue: () => {
    const expandedId = expanded ? "'menu-dropdown'" : "''"
    const example = ((): unknown => {
      switch (part) {
        case 'bar-link':
        case 'mobile-link':
          return figma.code`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem :active="${bool(current)}">
      <DsfrNavigationMenuLink to="/lien" text="Libellé du lien" />
    </DsfrNavigationItem>
  </DsfrNavigation>`
        case 'bar-dropdown':
          return figma.code`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem :active="${bool(current)}">
      <DsfrNavigationMenu
        id="menu-dropdown"
        title="Menu déroulant"
        :expanded-id="${expandedId}"
        :links="[
          { to: '/premier', text: 'Premier lien' },
          { to: '/deuxieme', text: 'Deuxième lien' }
        ]"
      />
    </DsfrNavigationItem>
  </DsfrNavigation>`
        case 'bar-full':
          return figma.code`<DsfrNavigation
    label="Menu principal"
    :nav-items="[
${links.map((link) => `      { to: '/${link.path}', text: '${link.label}' }`).join(',\n')}
    ]"
  />`
        case 'dropdown-item':
        case 'mobile-level2':
          return figma.code`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem>
      <DsfrNavigationMenu id="menu-dropdown" title="Menu déroulant" expanded-id="menu-dropdown">
        <DsfrNavigationMenuItem :active="${bool(current)}">
          <DsfrNavigationMenuLink to="/lien" text="Libellé du lien" />
        </DsfrNavigationMenuItem>
      </DsfrNavigationMenu>
    </DsfrNavigationItem>
  </DsfrNavigation>`
        case 'dropdown-full':
          return figma.code`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem>
      <DsfrNavigationMenu
        id="menu-dropdown"
        title="Menu déroulant"
        expanded-id="menu-dropdown"
        :links="[
          { to: '/premier', text: 'Premier lien' },
          { to: '/deuxieme', text: 'Deuxième lien' },
          { to: '/troisieme', text: 'Troisième lien' }
        ]"
      />
    </DsfrNavigationItem>
  </DsfrNavigation>`
        case 'mega-item':
          return figma.code`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem>
      <DsfrNavigationMegaMenu
        id="mega-menu"
        title="Rubrique"
        expanded-id="mega-menu"
        :menus="[{ title: 'Catégorie', links: [{ to: '/lien', text: 'Libellé du lien' }] }]"
      />
    </DsfrNavigationItem>
  </DsfrNavigation>`
        case 'mega-full': {
          const menus = manyCategories
            ? `[
        { title: 'Première catégorie', links: [{ to: '/lien-1', text: 'Lien' }] },
        { title: 'Deuxième catégorie', links: [{ to: '/lien-2', text: 'Lien' }] }
      ]`
            : `[
        { title: 'Catégorie', links: [{ to: '/lien-1', text: 'Lien' }] }
      ]`
          const description = leader === 'description' ? ' description="Texte de description de la rubrique."' : ''
          return figma.code`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem>
      <DsfrNavigationMegaMenu
        id="mega-menu"
        title="Rubrique"
        expanded-id="mega-menu"${description}
        :menus="${menus}"
      />
    </DsfrNavigationItem>
  </DsfrNavigation>`
        }
        case 'mobile-dropdown':
          return figma.code`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem :active="${bool(current)}">
      <DsfrNavigationMenu
        id="menu-dropdown"
        title="Menu déroulant"
        :expanded-id="${expandedId}"
        :links="[{ to: '/lien', text: 'Lien' }]"
      />
    </DsfrNavigationItem>
  </DsfrNavigation>`
        case 'mobile-links': {
          const menus = withCategory
            ? `[{ title: 'Catégorie', links: [
        { to: '/premier', text: 'Premier lien' },
        { to: '/deuxieme', text: 'Deuxième lien' }
      ] }]`
            : `[{ title: 'Premier lien', links: [{ to: '/premier', text: 'Premier lien' }] }]`
          return figma.code`<DsfrNavigation label="Menu principal">
    <DsfrNavigationItem>
      <DsfrNavigationMegaMenu
        id="mega-menu"
        title="Menu déroulant"
        expanded-id="mega-menu"
        :menus="${menus}"
      />
    </DsfrNavigationItem>
  </DsfrNavigation>`
        }
        case 'mobile-quick':
          return figma.code`<DsfrHeader
    :quick-links="[{ label: '${quickLabelAttribute}', icon: 'fr-icon-lock-line', to: '/connexion' }]"
  >
    <template #mainnav>
      <DsfrNavigation :nav-items="[{ to: '/lien', text: 'Libellé du lien' }]" />
    </template>
  </DsfrHeader>`
        case 'mobile-full':
          return figma.code`<DsfrHeader home-to="/"${withQuickAccess ? ` :quick-links="[{ label: 'Se connecter', icon: 'fr-icon-lock-line', to: '/connexion' }]"` : ''}>
    <template #mainnav>
      <DsfrNavigation
        :nav-items="[
          { to: '/premier', text: 'Premier lien' },
          { to: '/deuxieme', text: 'Deuxième lien' },
          { to: '/troisieme', text: 'Troisième lien' }
        ]"
      />
    </template>
  </DsfrHeader>`
      }
    })()
    return {
      imports: [
        "import DsfrNavigation from '@gouvminint/vue-dsfr/DsfrNavigation.vue'",
        "import DsfrHeader from '@gouvminint/vue-dsfr/DsfrHeader.vue'",
      ],
      example,
    }
  },
})

export default {
  id: `mainnav-${part}`,
  ...rendered,
  metadata: { nestable: true },
}
