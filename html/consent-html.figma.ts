import figma, { html } from '@figma/code-connect/html';

// Gestionnaire de consentement DSFR : 4 sets utiles. Les composants « _🚫Éléments »
// sont des atomes internes → non connectés. Thème et Support = CSS seul/responsive.
// « Service indisponible » n'a pas de composant dédié : fragment de markup statique
// posé manuellement à l'emplacement d'un service tiers bloqué en attente de consentement.

// ─── Bandeau de consentement ──────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=630-158', {
  example: () =>
    html`<div class="fr-consent-banner">
  <h2 class="fr-h6">À propos des cookies sur ce site</h2>
  <div class="fr-consent-banner__content">
    <p class="fr-text--sm">
      Sur nos sites, nous utilisons des cookies et données personnelles pour améliorer votre expérience.
      <a href="/donnees-personnelles">Personnaliser</a>
    </p>
  </div>
  <ul class="fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm">
    <li><button type="button" class="fr-btn" title="Autoriser tous les cookies">Tout accepter</button></li>
    <li><button type="button" class="fr-btn" title="Refuser tous les cookies">Tout refuser</button></li>
    <li><button type="button" class="fr-btn fr-btn--secondary" aria-controls="consent-modal" title="Personnaliser les cookies">Personnaliser</button></li>
  </ul>
</div>`,
});

// ─── Modale de consentement - Complète ────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=679-1138', {
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
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=644-54579', {
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
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=703-55173', {
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
