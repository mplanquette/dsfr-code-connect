// Pied de page DSFR : 2 sets (Desktop, Mobile), thème clair uniquement. Le pied de page est un
// composant responsive unique sur les quatre stacks : un seul rendu pour les deux sets.
// Les composants préfixés « 🚫Éléments » (Liste de liens, Logo partenaire, Partenaires, Liens,
// Mentions, Bloc marque) sont des atomes internes : non connectés. Thème sombre = CSS seul.
// « Liens » pilote les liens de réorientation (reboundLinks en Angular, linkList en React, slot
// `footer-link-lists` en Vue) et « Partenaires » le partenaire principal.
// Angular : les liens institutionnels et légaux ont des valeurs par défaut dans le composant
// (DEF_INSTITUTIONAL_LINKS, DEF_MANDATORY_LINKS).
// React : `accessibility` est une prop obligatoire côté react-dsfr (absente de l'équivalent
// ngx-dsfr), posée à "non compliant" par défaut, à ajuster par le dev. Les liens
// institutionnels et légaux par défaut du DSFR sont gérés nativement par le composant.
// Vue : « Liens » n'a pas d'équivalent en prop simple, vue-dsfr expose un slot
// `footer-link-lists` dans lequel poser un ou plusieurs `<DsfrFooterLinkList>`.
import figma from 'figma'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, layout } = figma.batch as { stack: string; layout: 'desktop' | 'mobile' }

const links = instance.getBoolean('Liens')
const partners = instance.getBoolean('Partenaires')

const rendered = renderFor(stack, {
  angular: () => {
    const linksAttr = links
      ? `\n  [reboundLinks]="[
    { title: 'Liens de réorientation', links: [{ label: 'Premier lien', routePath: '/premier' }, { label: 'Deuxième lien', routePath: '/deuxieme' }] }
  ]"`
      : ''
    const partnersAttr = partners ? `\n  [partnerMain]="{ imagePath: 'assets/img/partner.png', imageAlt: 'Partenaire' }"` : ''
    return {
      imports: ["import { DsfrFooterComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-footer
  [logo]="{ label: 'République Française' }"${linksAttr}${partnersAttr}></dsfr-footer>`,
    }
  },
  html: () => {
    const reboundLinks = links
      ? `\n    <div class="fr-footer__top">
      <div class="fr-grid-row fr-grid-row--start fr-grid-row--gutters">
        <div class="fr-col-6 fr-col-sm-3 fr-col-md-2">
          <h3 class="fr-footer__top-cat">Liens de réorientation</h3>
          <ul class="fr-footer__top-list">
            <li><a class="fr-footer__top-link" href="/premier">Premier lien</a></li>
            <li><a class="fr-footer__top-link" href="/deuxieme">Deuxième lien</a></li>
          </ul>
        </div>
      </div>
    </div>`
      : ''
    const partnersBlock = partners
      ? `\n    <div class="fr-footer__partners">
      <h4 class="fr-footer__partners-title">Nos partenaires</h4>
      <div class="fr-footer__partners-logos">
        <div class="fr-footer__partners-main">
          <a class="fr-footer__partners-link" href="#" title="Partenaire">
            <img class="fr-footer__partners-img" src="assets/img/partner.png" alt="Partenaire" />
          </a>
        </div>
      </div>
    </div>`
      : ''
    return {
      example: figma.code`<footer class="fr-footer" role="contentinfo">
  <div class="fr-container">${reboundLinks}${partnersBlock}
    <div class="fr-footer__body">
      <div class="fr-footer__brand fr-enlarge-link">
        <p class="fr-logo">République<br />Française</p>
      </div>
      <div class="fr-footer__content">
        <ul class="fr-footer__content-list">
          <li class="fr-footer__content-item">
            <a class="fr-footer__content-link" href="https://legifrance.gouv.fr" target="_blank" rel="noopener external">legifrance.gouv.fr</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="fr-footer__bottom">
      <ul class="fr-footer__bottom-list">
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/accessibilite">Accessibilité : non conforme</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/mentions-legales">Mentions légales</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/donnees-personnelles">Données personnelles</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/cookies">Gestion des cookies</a></li>
      </ul>
      <div class="fr-footer__bottom-copy">
        <p>
          Sauf mention contraire, tous les contenus de ce site sont sous
          <a href="https://etalab.gouv.fr" target="_blank" rel="noopener external">licence etalab-2.0</a>
        </p>
      </div>
    </div>
  </div>
</footer>`,
    }
  },
  react: () => {
    const linkList = links
      ? `\n  linkList={[{
    categoryName: 'Liens de réorientation',
    links: [
      { text: 'Premier lien', linkProps: { href: '/premier' } },
      { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } }
    ]
  }]}`
      : ''
    const partnersLogos = partners ? `\n  partnersLogos={{ main: { alt: 'Partenaire', imgUrl: '/assets/img/partner.png' } }}` : ''
    return {
      imports: ["import { Footer } from '@codegouvfr/react-dsfr/Footer'"],
      example: figma.code`<Footer
  accessibility="non compliant"
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}${linkList}${partnersLogos} />`,
    }
  },
  vue: () => {
    const partnersProp = partners ? `:partners="{ mainPartner: { href: '#', logo: 'assets/img/partner.png', name: 'Partenaire' } }"` : ''
    const linkLists = links
      ? `\n    <template #footer-link-lists>
      <DsfrFooterLinkList
        category-name="Liens de réorientation"
        :links="[
          { label: 'Premier lien', to: '/premier' },
          { label: 'Deuxième lien', to: '/deuxieme' }
        ]"
      />
    </template>\n  `
      : ''
    return {
      imports: [
        "import DsfrFooter from '@gouvminint/vue-dsfr/DsfrFooter.vue'",
        "import DsfrFooterLinkList from '@gouvminint/vue-dsfr/DsfrFooterLinkList.vue'",
      ],
      example: figma.code`<DsfrFooter ${partnersProp}>${linkLists}</DsfrFooter>`,
    }
  },
})

export default {
  id: `footer-${layout}`,
  ...rendered,
  metadata: { nestable: true },
}
