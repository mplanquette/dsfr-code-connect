// Paramètre d'affichage DSFR : 1 set, un snippet unique par stack.
// Thème et Support = CSS seul/responsive (variantes internes au même set, pas de props dédiées).
// React : <Display /> n'a aucune prop, il est monté une fois (déjà inclus automatiquement par
// <Header> sauf `disableDisplay`), la modale s'ouvre via le bouton `headerFooterDisplayItem` posé
// dans `quickAccessItems`/`bottomItems`.
// Vue : pas de composant dédié dans vue-dsfr (ni `DsfrDisplay` ni `DsfrTheme*`, vérifié sur
// `src/components/index.ts` du dépôt `dnum-mi/vue-dsfr`) : markup DSFR brut, identique au
// fragment HTML (le composant est un simple fieldset de radios, piloté par le script `theme.js`
// du cœur DSFR, sans état Vue à modéliser ici).
import figma from 'figma'
import { renderFor } from '../_shared/stack'

const { stack } = figma.batch as { stack: string }

const markup = figma.code`<dialog id="theme-modal" class="fr-modal" role="dialog" aria-labelledby="theme-modal-title">
  <div class="fr-container fr-container--fluid fr-container-md">
    <div class="fr-grid-row fr-grid-row--center">
      <div class="fr-col-12 fr-col-md-6 fr-col-lg-4">
        <div class="fr-modal__body">
          <div class="fr-modal__header">
            <button type="button" class="fr-btn--close fr-btn" aria-controls="theme-modal" title="Fermer la fenêtre de dialogue">Fermer</button>
          </div>
          <div class="fr-modal__content">
            <h1 id="theme-modal-title" class="fr-modal__title">Paramètres d'affichage</h1>
            <fieldset class="fr-fieldset" id="theme-fieldset" aria-labelledby="theme-fieldset-legend">
              <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="theme-fieldset-legend">
                Choisissez un thème pour personnaliser l'apparence du site.
              </legend>
              <div class="fr-fieldset__element">
                <div class="fr-radio-group fr-radio-rich">
                  <input type="radio" id="theme-light" name="theme" value="light" />
                  <label class="fr-label" for="theme-light">Thème clair</label>
                </div>
              </div>
              <div class="fr-fieldset__element">
                <div class="fr-radio-group fr-radio-rich">
                  <input type="radio" id="theme-dark" name="theme" value="dark" />
                  <label class="fr-label" for="theme-dark">Thème sombre</label>
                </div>
              </div>
              <div class="fr-fieldset__element">
                <div class="fr-radio-group fr-radio-rich">
                  <input type="radio" id="theme-system" name="theme" value="system" checked />
                  <label class="fr-label" for="theme-system">Système</label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>
</dialog>`

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrDisplayComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-display displayId="theme-modal"></dsfr-display>`,
  }),
  html: () => ({ example: markup }),
  react: () => ({
    imports: ["import { Display } from '@codegouvfr/react-dsfr/Display'"],
    example: figma.code`<Display />`,
  }),
  vue: () => ({ example: markup }),
})

export default {
  id: 'display',
  ...rendered,
  metadata: { nestable: true },
}
