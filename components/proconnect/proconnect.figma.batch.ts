// Bouton ProConnect DSFR : nouveau en 1.15.0. 1 set utile. Les composants « _🚫Éléments » sont
// des atomes internes → non connectés. Thème = CSS seul (variante interne). Focus, Survol,
// Cliqué, Désactivé = pseudo-états ou sans équivalent dans les portages → ignorés. Aucune
// input variable.
// Angular : pas de composant dédié dans ngx-dsfr (vérifié jusqu'à la 1.19.3, dernière publiée
// au 26/08/2026) : markup DSFR posé directement dans le template, sur le modèle de
// `dsfr-franceconnect`. À remplacer par un composant Angular si ngx-dsfr en publie un.
// Vue : pas de composant dédié dans vue-dsfr (aucune entrée « ProConnect » dans le dépôt
// `dnum-mi/vue-dsfr`) : markup DSFR brut, à remplacer si vue-dsfr en publie un.
// React : `ProConnectButton` existe ; `url` est obligatoire (ou `onClick`), placeholder
// `/login` à adapter par le dev.
import figma from 'figma'
import { renderFor } from '../_shared/stack'

const rendered = renderFor(figma.batch.stack, {
  angular: () => ({
    example: figma.code`<div class="fr-connect-group">
  <button type="button" class="fr-connect fr-connect--proconnect">
    <span class="fr-connect__login">S'identifier avec</span>
    <span class="fr-connect__brand">ProConnect</span>
  </button>
  <p>
    <a href="https://www.proconnect.gouv.fr/" target="_blank" rel="noopener">Qu'est-ce que ProConnect ?</a>
  </p>
</div>`,
  }),
  html: () => ({
    example: figma.code`<div class="fr-connect-group">
  <button type="button" class="fr-connect fr-connect--proconnect">
    <span class="fr-connect__login">S'identifier avec</span>
    <span class="fr-connect__brand">ProConnect</span>
  </button>
  <p>
    <a href="https://www.proconnect.gouv.fr/" target="_blank" rel="noopener">Qu'est-ce que ProConnect ?</a>
  </p>
</div>`,
  }),
  react: () => ({
    imports: ["import { ProConnectButton } from '@codegouvfr/react-dsfr/ProConnectButton'"],
    example: figma.code`<ProConnectButton url="/login" />`,
  }),
  vue: () => ({
    example: figma.code`<div class="fr-connect-group">
  <button type="button" class="fr-connect fr-connect--proconnect">
    <span class="fr-connect__login">S'identifier avec</span>
    <span class="fr-connect__brand">ProConnect</span>
  </button>
  <p>
    <a href="https://www.proconnect.gouv.fr/" target="_blank" rel="noopener">Qu'est-ce que ProConnect ?</a>
  </p>
</div>`,
  }),
})

export default {
  id: 'proconnect',
  ...rendered,
  metadata: { nestable: true },
}
