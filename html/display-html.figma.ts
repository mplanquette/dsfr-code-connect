import figma, { html } from '@figma/code-connect/html';

// Paramètre d'affichage DSFR : 1 set. Thème et Support = CSS seul/responsive → snippet
// unique.

figma.connect('<FIGMA_PARAMETRE_D_AFFICHAGE__PARAMETRE_D_AFFICHAGE>', {
  example: () =>
    html`<dialog id="theme-modal" class="fr-modal" role="dialog" aria-labelledby="theme-modal-title">
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
</dialog>`,
});
