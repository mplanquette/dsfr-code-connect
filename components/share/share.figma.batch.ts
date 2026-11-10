// Partage DSFR : 1 set, quatre stacks. Thème = CSS seul.
// « Désactivé » traduit l'absence de consentement aux cookies tiers : les liens réseaux sociaux
// sont désactivés, le lien mail et la copie restent actifs.
// Angular : les URL de partage passent par des propriétés du composant (facebookShareUrl, etc.),
// supposées définies côté application hôte.
// HTML : markup DSFR brut.
// React : pas de composant react-dsfr dédié (pas de `Share.tsx`), markup DSFR brut identique au
// HTML traduit en JSX (`class` devient `className`).
// Vue : vue-dsfr expose un vrai composant `DsfrShare` (props `title`, `mail`, `networks`).
// `DsfrShare` n'a pas d'équivalent de `hasCookiePermissions` : « Désactivé » est approximé en
// vidant `networks` (les réseaux tiers disparaissent, mail et copie restent natifs).
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack } = figma.batch as { stack: string }

const noConsent = readEnum(instance, 'Désactivé', { True: true, False: false })

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrShareComponent, DsfrShareLinkComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-share consentManagerRoute="/gestion-des-cookies"${noConsent ? ' [hasCookiePermissions]="false"' : ' [hasCookiePermissions]="true"'}>
  <dsfr-share-link name="facebook" [link]="facebookShareUrl"></dsfr-share-link>
  <dsfr-share-link name="twitter-x" [link]="twitterShareUrl"></dsfr-share-link>
  <dsfr-share-link name="linkedin" [link]="linkedinShareUrl"></dsfr-share-link>
  <dsfr-share-link name="mail" [link]="mailShareUrl"></dsfr-share-link>
</dsfr-share>`,
  }),
  html: () => {
    const disabled = noConsent ? ' aria-disabled="true"' : ''
    const cookiesText = noConsent
      ? `\n  <p class="fr-share__text">Pour partager sur les réseaux sociaux, vous devez accepter les cookies tiers.</p>`
      : ''
    return {
      example: figma.code`<div class="fr-share">
  <p class="fr-share__title">Partager la page</p>${cookiesText}
  <ul class="fr-btns-group">
    <li><a class="fr-share__link fr-share__link--facebook" title="Partager sur Facebook" href="#"${disabled}>Partager sur Facebook</a></li>
    <li><a class="fr-share__link fr-share__link--twitter-x" title="Partager sur X" href="#"${disabled}>Partager sur X</a></li>
    <li><a class="fr-share__link fr-share__link--linkedin" title="Partager sur LinkedIn" href="#"${disabled}>Partager sur LinkedIn</a></li>
    <li><a class="fr-share__link fr-share__link--mail" title="Partager par courriel" href="#">Partager par courriel</a></li>
    <li><button type="button" class="fr-share__link fr-share__link--copy" title="Copier dans le presse-papier">Copier dans le presse-papier</button></li>
  </ul>
</div>`,
    }
  },
  react: () => {
    const disabled = noConsent ? ' aria-disabled="true"' : ''
    const cookiesText = noConsent
      ? `\n  <p className="fr-share__text">Pour partager sur les réseaux sociaux, vous devez accepter les cookies tiers.</p>`
      : ''
    return {
      example: figma.code`<div className="fr-share">
  <p className="fr-share__title">Partager la page</p>${cookiesText}
  <ul className="fr-btns-group">
    <li><a className="fr-share__link fr-share__link--facebook" title="Partager sur Facebook" href="#"${disabled}>Partager sur Facebook</a></li>
    <li><a className="fr-share__link fr-share__link--twitter-x" title="Partager sur X" href="#"${disabled}>Partager sur X</a></li>
    <li><a className="fr-share__link fr-share__link--linkedin" title="Partager sur LinkedIn" href="#"${disabled}>Partager sur LinkedIn</a></li>
    <li><a className="fr-share__link fr-share__link--mail" title="Partager par courriel" href="#">Partager par courriel</a></li>
    <li><button type="button" className="fr-share__link fr-share__link--copy" title="Copier dans le presse-papier">Copier dans le presse-papier</button></li>
  </ul>
</div>`,
    }
  },
  vue: () => {
    const networks = noConsent
      ? ' :networks="[]"'
      : ` :networks="[
    { name: 'facebook', label: 'Partager sur Facebook', url: facebookShareUrl },
    { name: 'twitter-x', label: 'Partager sur X', url: twitterShareUrl },
    { name: 'linkedin', label: 'Partager sur LinkedIn', url: linkedinShareUrl }
  ]"`
    return {
      imports: ["import DsfrShare from '@gouvminint/vue-dsfr/DsfrShare.vue'"],
      example: figma.code`<DsfrShare title="Partager la page"${networks} :mail="{ label: 'Partager par mail', to: 'mailto:contact@exemple.fr' }" />`,
    }
  },
})

export default {
  id: 'share',
  ...rendered,
  metadata: { nestable: true },
}
