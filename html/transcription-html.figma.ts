import figma, { html } from '@figma/code-connect/html';

// Transcription DSFR : 3 sets (Transcription, Modale Desktop, Modale Mobile).
// Le set « _🚫Éléments - Exemple de contenu » est un atome interne Figma → non connecté.
// Thème et Support = CSS seul. Survol = pseudo-état → ignoré.
// « Ouvert » est l'état du collapse, piloté au runtime par le JS DSFR.
// Les deux sets « Modale » sont la vue agrandie interne au composant : même snippet.

// ─── Transcription ───────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14268-197280', {
  props: {
    heading: figma.string('Titre'),
    expandedClass: figma.enum('Ouvert', { True: ' fr-collapse--expanded', False: '' }),
    expanded: figma.enum('Ouvert', { True: 'true', False: 'false' }),
  },
  example: ({ heading, expandedClass, expanded }) =>
    html`<div class="fr-transcription">
  <button type="button" class="fr-transcription__btn" aria-expanded="${expanded}" aria-controls="transcription">Transcription</button>
  <div class="fr-collapse${expandedClass}" id="transcription">
    <div class="fr-transcription__footer">
      <div class="fr-transcription__actions-group">
        <button type="button" class="fr-btn fr-btn--fullscreen" aria-controls="transcription-modal" data-fr-opened="false">Agrandir</button>
      </div>
    </div>
    <div id="transcription-modal" class="fr-modal" role="dialog" aria-labelledby="transcription-title">
      <div class="fr-container--fluid">
        <div class="fr-modal__body">
          <div class="fr-modal__header">
            <button type="button" class="fr-btn--close fr-btn" aria-controls="transcription-modal" title="Fermer la fenêtre de dialogue">Fermer</button>
          </div>
          <div class="fr-modal__content">
            <h1 id="transcription-title" class="fr-modal__title">${heading}</h1>
            <p>Texte de la transcription.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
});

// ─── Modale - Desktop ────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14470-198380', {
  example: () =>
    html`<div id="transcription-modal" class="fr-modal" role="dialog" aria-labelledby="transcription-title">
  <div class="fr-container--fluid">
    <div class="fr-modal__body">
      <div class="fr-modal__header">
        <button type="button" class="fr-btn--close fr-btn" aria-controls="transcription-modal" title="Fermer la fenêtre de dialogue">Fermer</button>
      </div>
      <div class="fr-modal__content">
        <h1 id="transcription-title" class="fr-modal__title">Transcription</h1>
        <p>Texte de la transcription.</p>
      </div>
    </div>
  </div>
</div>`,
});

// ─── Modale - Mobile ─────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14470-198401', {
  example: () =>
    html`<div id="transcription-modal" class="fr-modal" role="dialog" aria-labelledby="transcription-title">
  <div class="fr-container--fluid">
    <div class="fr-modal__body">
      <div class="fr-modal__header">
        <button type="button" class="fr-btn--close fr-btn" aria-controls="transcription-modal" title="Fermer la fenêtre de dialogue">Fermer</button>
      </div>
      <div class="fr-modal__content">
        <h1 id="transcription-title" class="fr-modal__title">Transcription</h1>
        <p>Texte de la transcription.</p>
      </div>
    </div>
  </div>
</div>`,
});
