import figma, { html } from '@figma/code-connect/html';

// Modale DSFR : 3 sets (Desktop, Mobile, Surcouche). Thème = CSS seul.
// La Surcouche est le fond assombri, indissociable de la modale → même snippet.
// « Contenu Défaut / Personnalisé » ne change que le contenu → non bindé.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-warning-line.
// Le markup <dialog> assure nativement le piège de focus (RGAA 7.1).

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=447-7149', {
  props: {
    sizeClass: figma.enum('Taille', {
      SM: 'fr-col-12 fr-col-md-4',
      MD: 'fr-col-12 fr-col-md-8 fr-col-lg-6',
      LG: 'fr-col-12 fr-col-md-8',
    }),
    icon: figma.boolean('Icône titre', {
      true: `<span class="fr-icon-warning-line fr-icon--lg"></span>`,
      false: '',
    }),
    footer: figma.enum('Boutons', {
      Sans: '',
      '1': `\n          <div class="fr-modal__footer">
            <ul class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg">
              <li><button type="button" class="fr-btn">Confirmer</button></li>
            </ul>
          </div>`,
      '2': `\n          <div class="fr-modal__footer">
            <ul class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg">
              <li><button type="button" class="fr-btn">Confirmer</button></li>
              <li><button type="button" class="fr-btn fr-btn--secondary">Annuler</button></li>
            </ul>
          </div>`,
    }),
  },
  example: ({ sizeClass, icon, footer }) =>
    html`<dialog id="modal" class="fr-modal" aria-labelledby="modal-title">
  <div class="fr-container fr-container--fluid fr-container-md">
    <div class="fr-grid-row fr-grid-row--center">
      <div class="${sizeClass}">
        <div class="fr-modal__body">
          <div class="fr-modal__header">
            <button type="button" class="fr-btn--close fr-btn" aria-controls="modal" title="Fermer la fenêtre de dialogue">Fermer</button>
          </div>
          <div class="fr-modal__content">
            <h1 id="modal-title" class="fr-modal__title">${icon}Titre de la modale</h1>
            <p>Contenu de la modale.</p>
          </div>${footer}
        </div>
      </div>
    </div>
  </div>
</dialog>`,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=447-7150', {
  props: {
    icon: figma.boolean('Icône titre', {
      true: `<span class="fr-icon-warning-line fr-icon--lg"></span>`,
      false: '',
    }),
    footer: figma.enum('Boutons', {
      Sans: '',
      '1': `\n          <div class="fr-modal__footer">
            <ul class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg">
              <li><button type="button" class="fr-btn">Confirmer</button></li>
            </ul>
          </div>`,
      '2': `\n          <div class="fr-modal__footer">
            <ul class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg">
              <li><button type="button" class="fr-btn">Confirmer</button></li>
              <li><button type="button" class="fr-btn fr-btn--secondary">Annuler</button></li>
            </ul>
          </div>`,
    }),
  },
  example: ({ icon, footer }) =>
    html`<dialog id="modal" class="fr-modal fr-modal--top" aria-labelledby="modal-title">
  <div class="fr-container fr-container--fluid fr-container-md">
    <div class="fr-grid-row fr-grid-row--center">
      <div class="fr-col-12">
        <div class="fr-modal__body">
          <div class="fr-modal__header">
            <button type="button" class="fr-btn--close fr-btn" aria-controls="modal" title="Fermer la fenêtre de dialogue">Fermer</button>
          </div>
          <div class="fr-modal__content">
            <h1 id="modal-title" class="fr-modal__title">${icon}Titre de la modale</h1>
            <p>Contenu de la modale.</p>
          </div>${footer}
        </div>
      </div>
    </div>
  </div>
</dialog>`,
});

// ─── Surcouche ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=447-7151', {
  example: () =>
    html`<dialog id="modal" class="fr-modal" aria-labelledby="modal-title">
  <div class="fr-container fr-container--fluid fr-container-md">
    <div class="fr-grid-row fr-grid-row--center">
      <div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
        <div class="fr-modal__body">
          <div class="fr-modal__header">
            <button type="button" class="fr-btn--close fr-btn" aria-controls="modal" title="Fermer la fenêtre de dialogue">Fermer</button>
          </div>
          <div class="fr-modal__content">
            <h1 id="modal-title" class="fr-modal__title">Titre de la modale</h1>
            <p>Contenu de la modale.</p>
          </div>
          <div class="fr-modal__footer">
            <ul class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg">
              <li><button type="button" class="fr-btn">Confirmer</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</dialog>`,
});
