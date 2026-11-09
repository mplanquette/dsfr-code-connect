// Bouton FranceConnect DSFR : 1 set. Les composants « _🚫Éléments » sont des atomes
// internes → non connectés. Thème = CSS seul (variante interne). Focus, Survol, Cliqué =
// pseudo-états → ignorés. Désactivé n'a pas d'équivalent dans les portages (ngx-dsfr,
// `FranceConnectButtonProps`, `DsfrFranceConnect`) ni dans le markup HTML : le bouton reste
// actif dans tous les exemples.
// React : `url` est obligatoire (ou `onClick`), placeholder `/login` à adapter par le dev.
// Vue : « Plus » → prop `secure`, qui bascule aussi le lien « Qu'est-ce que FranceConnect(+) ? »
// (géré nativement par le composant).
import figma from 'figma'
import { readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance

const plus = readVariantFlag(instance, 'Plus')

const rendered = renderFor(figma.batch.stack, {
  angular: () => ({
    imports: ["import { DsfrFranceConnectComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-franceconnect id="franceconnect"${plus ? ' [secure]="true"' : ''}></dsfr-franceconnect>`,
  }),
  html: () => ({
    example: figma.code`<div class="fr-connect-group">
  <button type="button" class="fr-connect${plus ? ' fr-connect--plus' : ''}">
    <span class="fr-connect__login">S'identifier avec</span>
    <span class="fr-connect__brand">FranceConnect</span>
  </button>
  <p>
    <a href="${plus ? 'https://franceconnect.gouv.fr/france-connect-plus' : 'https://franceconnect.gouv.fr/'}" target="_blank" rel="noopener">Qu'est-ce que FranceConnect${plus ? '+' : ''} ?</a>
  </p>
</div>`,
  }),
  react: () => ({
    imports: ["import { FranceConnectButton } from '@codegouvfr/react-dsfr/FranceConnectButton'"],
    example: figma.code`<FranceConnectButton url="/login"${plus ? ' plus' : ''} />`,
  }),
  vue: () => ({
    imports: ["import DsfrFranceConnect from '@gouvminint/vue-dsfr/DsfrFranceConnect.vue'"],
    example: figma.code`<DsfrFranceConnect id="franceconnect"${plus ? ' secure' : ''} />`,
  }),
})

export default {
  id: 'franceconnect',
  ...rendered,
  metadata: { nestable: true },
}
