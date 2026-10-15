import figma, { html } from '@figma/code-connect/html';

// Gestionnaire de consentement DSFR : 4 sets utiles. Les composants « _🚫Éléments » sont
// des atomes internes → non connectés. Thème et Support = CSS seul/responsive (variantes
// internes au même set).
// vue-dsfr n'expose qu'un seul composant, `DsfrConsent`, qui ne couvre que le CONTENU du
// bandeau (texte + les 3 boutons Tout accepter/refuser/Personnaliser) : ni le titre `<h2>`
// du bandeau, ni la modale de gestion des finalités, ni un modèle `finalities[]` façon
// ngx-dsfr n'existent côté vue-dsfr (vérifié sur `src/components/index.ts` du dépôt
// `dnum-mi/vue-dsfr` : aucun `DsfrConsentModal`/`DsfrConsentService`).
// Simplification retenue (même esprit que côté Angular, poussée plus loin faute de
// composant dédié) : le bandeau pose `DsfrConsent` dans son wrapper `fr-consent-banner` +
// titre statique ; la modale et l'item de finalité reprennent le markup DSFR brut
// (identique à `html/consent-html.figma.ts`) puisqu'aucun composant Vue ne les couvre.
// « Service indisponible » n'a pas de composant dédié non plus : fragment statique.

// ─── Bandeau de consentement ──────────────────────────────────────────────────
figma.connect('<FIGMA_GESTIONNAIRE_DE_CONSENTEMENT__BANDEAU_DE_CONSENTEMENT>', {
  example: () =>
    html`<div class="fr-consent-banner">
    <h2 class="fr-h6">À propos des cookies sur ce site</h2>
    <DsfrConsent
      url="/donnees-personnelles"
      aria-controls-id="consent-modal"
      @accept-all="onAcceptAll"
      @refuse-all="onRefuseAll"
      @customize="onCustomize"
    />
  </div>`,
  imports: ["import DsfrConsent from '@gouvminint/vue-dsfr/DsfrConsent.vue'"],
});

// ─── Modale de consentement - Complète ────────────────────────────────────────
// Pas de composant Vue dédié à la modale de gestion des finalités : markup DSFR brut.
figma.connect('<FIGMA_GESTIONNAIRE_DE_CONSENTEMENT__MODALE_DE_CONSENTEMENT_COMPLETE>', {
  example: () =>
    html`<dialog id="consent-modal" class="fr-modal" role="dialog" aria-labelledby="consent-modal-title">
  <div class="fr-container fr-container--fluid fr-container-md">
    <div class="fr-grid-row fr-grid-row--center">
      <div class="fr-col-12 fr-col-md-10 fr-col-lg-8">
        <div class="fr-modal__body">
          <div class="fr-modal__header">
            <button type="button" class="fr-btn--close fr-btn" aria-controls="consent-modal">Fermer</button>
          </div>
          <div class="fr-modal__content">
            <h1 id="consent-modal-title" class="fr-modal__title">Panneau de gestion des cookies</h1>
            <div class="fr-consent-manager">
              <div class="fr-consent-service fr-consent-manager__header">
                <fieldset class="fr-fieldset">
                  <legend id="finality-legend" class="fr-consent-service__title">
                    Préférences pour tous les services
                    <a href="/donnees-personnelles">Données personnelles</a>
                  </legend>
                  <div class="fr-consent-service__radios">
                    <div class="fr-radio-group">
                      <input type="radio" id="consent-all-accept" name="consent-all" />
                      <label class="fr-label" for="consent-all-accept">Tout accepter</label>
                    </div>
                    <div class="fr-radio-group">
                      <input type="radio" id="consent-all-refuse" name="consent-all" />
                      <label class="fr-label" for="consent-all-refuse">Tout refuser</label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="fr-consent-manager__body">
                <div class="fr-consent-service">
                  <fieldset class="fr-fieldset" role="group" aria-labelledby="finality-0-legend">
                    <legend id="finality-0-legend" class="fr-consent-service__title">Mesure d'audience</legend>
                    <div class="fr-consent-service__radios">
                      <div class="fr-radio-group">
                        <input type="radio" id="consent-finality-0-accept" name="consent-finality-0" />
                        <label class="fr-label" for="consent-finality-0-accept">Accepter</label>
                      </div>
                      <div class="fr-radio-group">
                        <input type="radio" id="consent-finality-0-refuse" name="consent-finality-0" />
                        <label class="fr-label" for="consent-finality-0-refuse">Refuser</label>
                      </div>
                    </div>
                    <p id="finality-0-desc" class="fr-consent-service__desc">Description de la finalité.</p>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</dialog>`,
});

// ─── Modale de consentement - Item ────────────────────────────────────────────
// Un item de finalité n'a pas de composant dédié : fragment `fr-consent-service` brut.
figma.connect('<FIGMA_GESTIONNAIRE_DE_CONSENTEMENT__MODALE_DE_CONSENTEMENT_ITEM>', {
  props: {
    description: figma.enum('Type', {
      Simple: '',
      Description: `\n    <p id="finality-0-desc" class="fr-consent-service__desc">Description de la finalité.</p>`,
      Obligatoire: '',
      Ouvert: '',
      Fermé: '',
    }),
    radios: figma.enum('Type', {
      Simple: `<div class="fr-radio-group">
        <input type="radio" id="consent-finality-0-accept" name="consent-finality-0" />
        <label class="fr-label" for="consent-finality-0-accept">Accepter</label>
      </div>
      <div class="fr-radio-group">
        <input type="radio" id="consent-finality-0-refuse" name="consent-finality-0" />
        <label class="fr-label" for="consent-finality-0-refuse">Refuser</label>
      </div>`,
      Description: `<div class="fr-radio-group">
        <input type="radio" id="consent-finality-0-accept" name="consent-finality-0" />
        <label class="fr-label" for="consent-finality-0-accept">Accepter</label>
      </div>
      <div class="fr-radio-group">
        <input type="radio" id="consent-finality-0-refuse" name="consent-finality-0" />
        <label class="fr-label" for="consent-finality-0-refuse">Refuser</label>
      </div>`,
      Obligatoire: `<p>Ce service est nécessaire au fonctionnement du site.</p>`,
      Ouvert: `<div class="fr-radio-group">
        <input type="radio" id="consent-finality-0-accept" name="consent-finality-0" />
        <label class="fr-label" for="consent-finality-0-accept">Accepter</label>
      </div>
      <div class="fr-radio-group">
        <input type="radio" id="consent-finality-0-refuse" name="consent-finality-0" />
        <label class="fr-label" for="consent-finality-0-refuse">Refuser</label>
      </div>`,
      Fermé: `<div class="fr-radio-group">
        <input type="radio" id="consent-finality-0-accept" name="consent-finality-0" />
        <label class="fr-label" for="consent-finality-0-accept">Accepter</label>
      </div>
      <div class="fr-radio-group">
        <input type="radio" id="consent-finality-0-refuse" name="consent-finality-0" />
        <label class="fr-label" for="consent-finality-0-refuse">Refuser</label>
      </div>`,
    }),
    collapse: figma.enum('Type', {
      Simple: '', Description: '', Obligatoire: '',
      Ouvert: `\n    <div class="fr-consent-service__collapse">
      <button type="button" class="fr-consent-service__collapse-btn" aria-expanded="true" aria-controls="finality-0-collapse">Voir le détail</button>
    </div>
    <div class="fr-consent-services fr-collapse fr-collapse--expanded" id="finality-0-collapse"></div>`,
      Fermé: `\n    <div class="fr-consent-service__collapse">
      <button type="button" class="fr-consent-service__collapse-btn" aria-expanded="false" aria-controls="finality-0-collapse">Voir le détail</button>
    </div>
    <div class="fr-consent-services fr-collapse" id="finality-0-collapse"></div>`,
    }),
  },
  example: ({ description, radios, collapse }) =>
    html`<div class="fr-consent-service">
  <fieldset class="fr-fieldset" aria-labelledby="finality-0-legend">
    <legend id="finality-0-legend" class="fr-consent-service__title">Mesure d'audience</legend>
    <div class="fr-consent-service__radios">
      ${radios}
    </div>${description}${collapse}
  </fieldset>
</div>`,
});

// ─── Service indisponible ─────────────────────────────────────────────────────
// Pas de composant dédié : fragment de markup DSFR statique.
figma.connect('<FIGMA_GESTIONNAIRE_DE_CONSENTEMENT__SERVICE_INDISPONIBLE>', {
  example: () =>
    html`<div class="fr-consent-service">
  <p>Ce contenu est hébergé par <strong>nom-du-service</strong>.</p>
  <p>
    Pour visualiser ce contenu externe, vous devez accepter la catégorie
    <strong>réseaux sociaux</strong>.
  </p>
  <button type="button" class="fr-btn fr-btn--sm">Autoriser</button>
</div>`,
});
