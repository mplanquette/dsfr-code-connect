// Menu latéral DSFR : 9 sets utiles, quatre stacks. Données de chaque set dans sidemenu.json :
//   `kind`   : full (menu complet), link (lien direct), folder1 / folder2 (dépliant niveau 1 / 2) ;
//   `device` : desktop ou mobile (les propriétés Figma diffèrent : « État » en desktop, « Courant »
//              en mobile) ;
//   `open`   : pour les menus complets mobiles, closed (Fermé, rendu figé) ou open (Ouvert).
// Le set « _🚫Éléments - Base » est un atome interne Figma : non connecté. Thème = CSS seul.
// Survol = pseudo-état : ignoré. « Niveau » et « Dernier » (items) n'ont pas d'effet sur le markup.
// Les rendus Mobile et Desktop sont le même composant (responsive) : mêmes snippets, aux
// différences de données de l'exemple près (nombre d'entrées de démonstration).
// Les items n'ont pas de composant dédié : ils se déclarent dans le modèle du menu.
//
// Angular : `DsfrMenu` (`items: DsfrMenuItem[]`, imbrication via `subItems`).
// HTML : « Ouvert » de l'item dépliant pilote `aria-expanded` et `fr-collapse--expanded`.
// React : `items: { text, linkProps?, items?, isActive?, expandedByDefault? }[]` (au premier niveau,
// pas d'objet `menu` imbriqué comme ngx-dsfr) ; `burgerMenuButtonText` est requis. « Position » est
// la prop `align` (« left » par défaut, omise ; « right » sinon). Dès qu'un item a des
// sous-entrées ou que plusieurs items se répètent, le tableau `items` est déclaré avant le JSX
// (les clés répétées inline faisaient échouer l'ancien parseur HTML générique).
// Vue : `menu-items` (`{ text, to, active, menuItems }[]`). « Fermé »/« Ouvert » ne sont pas
// pilotables par une prop (l'état du fr-collapse est interne) : non bindable, comme le repli du
// Fil d'Ariane. DsfrSideMenu n'a pas de prop `position` : la classe `fr-sidemenu--right` passe par
// le fallthrough de `class` (racine à nœud unique).
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, kind, device, open } = figma.batch as {
  stack: string
  kind: 'full' | 'link' | 'folder1' | 'folder2'
  device: 'desktop' | 'mobile'
  open?: 'open' | 'closed'
}

const desktop = device === 'desktop'
const closedMobileMenu = kind === 'full' && !desktop && open === 'closed'

/** Item « Courant » : variante « État » en desktop, « Courant » (True / False) en mobile. */
function readCurrent(): boolean {
  return desktop
    ? readEnum(instance, 'État', { Défaut: false, Survol: false, Courant: true })
    : readEnum(instance, 'Courant', { False: false, True: true })
}

/** Contenu du menu complet : « Éléments » (liens directs ou dépliants). */
const elements = () => readEnum(instance, 'Éléments', { 'Liens directs': 'links', Dépliants: 'folders' } as const)
const hasTitle = () => readEnum(instance, 'Titre', { True: true, False: false })

const angularItems = {
  links: desktop
    ? `{ label: 'Première entrée', routePath: '/premiere' },
      { label: 'Deuxième entrée', routePath: '/deuxieme' },
      { label: 'Troisième entrée', routePath: '/troisieme' }`
    : `{ label: 'Première entrée', routePath: '/premiere' },
      { label: 'Deuxième entrée', routePath: '/deuxieme' }`,
  folders: `{
        label: 'Première entrée',
        subItems: [
          { label: 'Sous-entrée 1', routePath: '/premiere/un' },
          { label: 'Sous-entrée 2', routePath: '/premiere/deux' }
        ]
      }${desktop ? `,\n      { label: 'Deuxième entrée', routePath: '/deuxieme' }` : ''}`,
}

const htmlItems = {
  links: `<li class="fr-sidemenu__item">
          <a class="fr-sidemenu__link" href="/premiere" target="_self">Première entrée</a>
        </li>
        <li class="fr-sidemenu__item">
          <a class="fr-sidemenu__link" href="/deuxieme" target="_self">Deuxième entrée</a>
        </li>`,
  folders: `<li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn" aria-expanded="false" aria-controls="sidemenu-item-1">Première entrée</button>
          <div class="fr-collapse" id="sidemenu-item-1">
            <ul class="fr-sidemenu__list">
              <li class="fr-sidemenu__item">
                <a class="fr-sidemenu__link" href="/premiere/un" target="_self">Sous-entrée 1</a>
              </li>
            </ul>
          </div>
        </li>`,
}

const reactItems = {
  links: desktop
    ? `{ text: 'Première entrée', linkProps: { href: '/premiere' } },
  { text: 'Deuxième entrée', linkProps: { href: '/deuxieme' } },
  { text: 'Troisième entrée', linkProps: { href: '/troisieme' } }`
    : `{ text: 'Première entrée', linkProps: { href: '/premiere' } },
  { text: 'Deuxième entrée', linkProps: { href: '/deuxieme' } }`,
  folders: `{
    text: 'Première entrée',
    items: [
      { text: 'Sous-entrée 1', linkProps: { href: '/premiere/un' } },
      { text: 'Sous-entrée 2', linkProps: { href: '/premiere/deux' } }
    ]
  }${desktop ? `,\n  { text: 'Deuxième entrée', linkProps: { href: '/deuxieme' } }` : ''}`,
}

const vueItems = {
  links: desktop
    ? `{ text: 'Première entrée', to: '/premiere' },
    { text: 'Deuxième entrée', to: '/deuxieme' },
    { text: 'Troisième entrée', to: '/troisieme' }`
    : `{ text: 'Première entrée', to: '/premiere' },
    { text: 'Deuxième entrée', to: '/deuxieme' }`,
  folders: `{
      text: 'Première entrée',
      menuItems: [
        { text: 'Sous-entrée 1', to: '/premiere/un' },
        { text: 'Sous-entrée 2', to: '/premiere/deux' }
      ]
    }${desktop ? `,\n    { text: 'Deuxième entrée', to: '/deuxieme' }` : ''}`,
}

const rendered = renderFor(stack, {
  angular: () => {
    const imports = ["import { DsfrSidemenuComponent } from '@edugouvfr/ngx-dsfr'"]
    if (closedMobileMenu) {
      return {
        imports,
        example: figma.code`<dsfr-sidemenu
  ariaLabel="Menu latéral"
  [menu]="{
    title: 'Titre du menu',
    items: [
      { label: 'Première entrée', routePath: '/premiere' },
      { label: 'Deuxième entrée', routePath: '/deuxieme' }
    ]
  }"></dsfr-sidemenu>`,
      }
    }
    if (kind === 'full') {
      const position = desktop ? readEnum(instance, 'Position', { Gauche: '', Droite: ' position="right"' }) : ''
      const title = hasTitle() ? `title: 'Titre du menu',\n    ` : ''
      const items = angularItems[elements()]
      return {
        imports,
        example: figma.code`<dsfr-sidemenu
  ariaLabel="Menu latéral"${position}
  [menu]="{
    ${title}items: [
      ${items}
    ]
  }"></dsfr-sidemenu>`,
      }
    }
    const current = readCurrent()
    if (kind === 'link') {
      return {
        imports,
        example: figma.code`<dsfr-sidemenu
  ariaLabel="Menu latéral"
  [menu]="{
    items: [
      { label: 'Libellé de l\\'entrée', routePath: '/entree'${current ? ', active: true' : ''} }
    ]
  }"></dsfr-sidemenu>`,
      }
    }
    if (kind === 'folder1') {
      return {
        imports,
        example: figma.code`<dsfr-sidemenu
  ariaLabel="Menu latéral"
  [menu]="{
    items: [
      {
        label: 'Libellé du dépliant'${current ? ',\n        active: true' : ''},
        subItems: [
          { label: 'Première sous-entrée', routePath: '/entree/un' },
          { label: 'Deuxième sous-entrée', routePath: '/entree/deux' }
        ]
      }
    ]
  }"></dsfr-sidemenu>`,
      }
    }
    return {
      imports,
      example: figma.code`<dsfr-sidemenu
  ariaLabel="Menu latéral"
  [menu]="{
    items: [
      {
        label: 'Dépliant de niveau 1',
        subItems: [
          {
            label: 'Dépliant de niveau 2'${current ? ',\n            active: true' : ''},
            subItems: [
              { label: 'Première sous-entrée', routePath: '/entree/un/a' },
              { label: 'Deuxième sous-entrée', routePath: '/entree/un/b' }
            ]
          }
        ]
      }
    ]
  }"></dsfr-sidemenu>`,
    }
  },
  html: () => {
    if (closedMobileMenu) {
      return {
        example: figma.code`<nav class="fr-sidemenu" role="navigation" aria-labelledby="sidemenu-title">
  <div class="fr-sidemenu__inner">
    <button type="button" class="fr-sidemenu__btn" aria-controls="sidemenu" aria-expanded="false">Dans cette rubrique</button>
    <div class="fr-collapse" id="sidemenu">
      <p class="fr-sidemenu__title" id="sidemenu-title">Titre du menu</p>
      <ul class="fr-sidemenu__list">
        <li class="fr-sidemenu__item">
          <a class="fr-sidemenu__link" href="/premiere" target="_self">Première entrée</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`,
      }
    }
    if (kind === 'full') {
      const positionClass = desktop ? readEnum(instance, 'Position', { Gauche: '', Droite: ' fr-sidemenu--right' }) : ''
      const title = hasTitle() ? `\n      <p class="fr-sidemenu__title" id="sidemenu-title">Titre du menu</p>` : ''
      const items = htmlItems[elements()]
      // Desktop : menu replié ; mobile « Ouvert » : menu déplié.
      const expanded = desktop ? 'false' : 'true'
      const collapseClass = desktop ? '' : ' fr-collapse--expanded'
      return {
        example: figma.code`<nav class="fr-sidemenu${positionClass}" role="navigation" aria-labelledby="sidemenu-title">
  <div class="fr-sidemenu__inner">
    <button type="button" class="fr-sidemenu__btn" aria-controls="sidemenu" aria-expanded="${expanded}">Dans cette rubrique</button>
    <div class="fr-collapse${collapseClass}" id="sidemenu">${title}
      <ul class="fr-sidemenu__list">
        ${items}
      </ul>
    </div>
  </div>
</nav>`,
      }
    }
    const current = readCurrent()
    if (kind === 'link') {
      return {
        example: figma.code`<li class="fr-sidemenu__item"${current ? ' aria-current="page"' : ''}>
  <a class="fr-sidemenu__link" href="/entree" target="_self">Libellé de l'entrée</a>
</li>`,
      }
    }
    const isOpen = readEnum(instance, 'Ouvert', { True: true, False: false })
    const expanded = isOpen ? 'true' : 'false'
    const collapseClass = isOpen ? ' fr-collapse--expanded' : ''
    const itemClass = current ? ' fr-sidemenu__item--active' : ''
    if (kind === 'folder1') {
      // Le dépliant mobile n'a qu'une sous-entrée d'exemple (seconde sous-entrée en desktop).
      const secondEntry = desktop
        ? `\n      <li class="fr-sidemenu__item">
        <a class="fr-sidemenu__link" href="/entree/deux" target="_self">Deuxième sous-entrée</a>
      </li>`
        : ''
      return {
        example: figma.code`<li class="fr-sidemenu__item${itemClass}">
  <button class="fr-sidemenu__btn" aria-expanded="${expanded}" aria-controls="sidemenu-item-1">Libellé du dépliant</button>
  <div class="fr-collapse${collapseClass}" id="sidemenu-item-1">
    <ul class="fr-sidemenu__list">
      <li class="fr-sidemenu__item">
        <a class="fr-sidemenu__link" href="/entree/un" target="_self">Première sous-entrée</a>
      </li>${secondEntry}
    </ul>
  </div>
</li>`,
      }
    }
    return {
      example: figma.code`<li class="fr-sidemenu__item${itemClass}">
  <button class="fr-sidemenu__btn" aria-expanded="${expanded}" aria-controls="sidemenu-item-1-1">Dépliant de niveau 2</button>
  <div class="fr-collapse${collapseClass}" id="sidemenu-item-1-1">
    <ul class="fr-sidemenu__list">
      <li class="fr-sidemenu__item">
        <a class="fr-sidemenu__link" href="/entree/un/a" target="_self">Première sous-entrée</a>
      </li>
    </ul>
  </div>
</li>`,
    }
  },
  react: () => {
    const imports = ["import { SideMenu } from '@codegouvfr/react-dsfr/SideMenu'"]
    if (closedMobileMenu) {
      return {
        imports,
        example: figma.code`const items = [
  { text: 'Première entrée', linkProps: { href: '/premiere' } }
];

<SideMenu burgerMenuButtonText="Dans cette rubrique" title="Titre du menu" items={items} />`,
      }
    }
    if (kind === 'full') {
      const align = desktop ? readEnum(instance, 'Position', { Gauche: '', Droite: ' align="right"' }) : ''
      const title = hasTitle() ? ' title="Titre du menu"' : ''
      const items = reactItems[elements()]
      return {
        imports,
        example: figma.code`const items = [
  ${items}
];

<SideMenu burgerMenuButtonText="Dans cette rubrique"${align}${title} items={items} />`,
      }
    }
    const current = readCurrent()
    const active = current ? ', isActive: true' : ''
    if (kind === 'link') {
      return {
        imports,
        example: figma.code`<SideMenu
  burgerMenuButtonText="Dans cette rubrique"
  items={[{ text: "Libellé de l'entrée", linkProps: { href: '/entree' }${active} }]}
/>`,
      }
    }
    const expanded = readEnum(instance, 'Ouvert', { True: ', expandedByDefault: true', False: '' })
    if (kind === 'folder1') {
      return {
        imports,
        example: figma.code`const items = [
  {
    text: 'Libellé du dépliant'${active}${expanded},
    items: [
      { text: 'Première sous-entrée', linkProps: { href: '/entree/un' } },
      { text: 'Deuxième sous-entrée', linkProps: { href: '/entree/deux' } }
    ]
  }
];

<SideMenu burgerMenuButtonText="Dans cette rubrique" items={items} />`,
      }
    }
    return {
      imports,
      example: figma.code`const items = [
  {
    text: 'Dépliant de niveau 1',
    items: [
      {
        text: 'Dépliant de niveau 2'${active}${expanded},
        items: [
          { text: 'Première sous-entrée', linkProps: { href: '/entree/un/a' } },
          { text: 'Deuxième sous-entrée', linkProps: { href: '/entree/un/b' } }
        ]
      }
    ]
  }
];

<SideMenu burgerMenuButtonText="Dans cette rubrique" items={items} />`,
    }
  },
  vue: () => {
    const imports = ["import DsfrSideMenu from '@gouvminint/vue-dsfr/DsfrSideMenu.vue'"]
    if (closedMobileMenu) {
      return {
        imports,
        example: figma.code`<DsfrSideMenu id="sidemenu" heading-title="Titre du menu" :menu-items="[
    { text: 'Première entrée', to: '/premiere' },
    { text: 'Deuxième entrée', to: '/deuxieme' }
  ]" />`,
      }
    }
    if (kind === 'full') {
      const position = desktop ? readEnum(instance, 'Position', { Gauche: '', Droite: ' class="fr-sidemenu--right"' }) : ''
      const title = hasTitle() ? ' heading-title="Titre du menu"' : ''
      const items = vueItems[elements()]
      return {
        imports,
        example: figma.code`<DsfrSideMenu id="sidemenu"${position}${title} :menu-items="[
    ${items}
  ]" />`,
      }
    }
    const current = readCurrent()
    const active = current ? ', active: true' : ''
    if (kind === 'link') {
      return {
        imports,
        example: figma.code`<DsfrSideMenu id="sidemenu" :menu-items="[
    { text: 'Libellé de l\\'entrée', to: '/entree'${active} }
  ]" />`,
      }
    }
    if (kind === 'folder1') {
      return {
        imports,
        example: figma.code`<DsfrSideMenu id="sidemenu" :menu-items="[
    {
      text: 'Libellé du dépliant'${active},
      menuItems: [
        { text: 'Première sous-entrée', to: '/entree/un' },
        { text: 'Deuxième sous-entrée', to: '/entree/deux' }
      ]
    }
  ]" />`,
      }
    }
    return {
      imports,
      example: figma.code`<DsfrSideMenu id="sidemenu" :menu-items="[
    {
      text: 'Dépliant de niveau 1',
      menuItems: [
        {
          text: 'Dépliant de niveau 2'${active},
          menuItems: [
            { text: 'Première sous-entrée', to: '/entree/un/a' },
            { text: 'Deuxième sous-entrée', to: '/entree/un/b' }
          ]
        }
      ]
    }
  ]" />`,
    }
  },
})

export default {
  id: `sidemenu-${device}-${kind}${kind === 'full' && !desktop ? `-${open}` : ''}`,
  ...rendered,
  metadata: { nestable: true },
}
