import figma, { html } from '@figma/code-connect/html';

// Transcription : aucun composant react-dsfr dédié (pas de `Transcription.tsx`) → markup
// DSFR brut porté en JSX (`class` → `className`), sur le modèle du fragment déjà utilisé
// côté html/transcription-html.figma.ts. 3 sets (Transcription, Modale Desktop, Modale
// Mobile). Le set « _🚫Éléments - Exemple de contenu » est un atome interne Figma → non
// connecté. Thème et Support = CSS seul. Survol = pseudo-état → ignoré.
// « Ouvert » est l'état du collapse, piloté au runtime par le JS DSFR → non bindable.
// Les deux sets « Modale » sont la vue agrandie interne au composant : même snippet.

// ─── Transcription ───────────────────────────────────────────────────────────
figma.connect('<FIGMA_TRANSCRIPTION__TRANSCRIPTION>', {
  props: {
    heading: figma.string('Titre'),
    expandedClass: figma.enum('Ouvert', { True: ' fr-collapse--expanded', False: '' }),
    expanded: figma.enum('Ouvert', { True: 'true', False: 'false' }),
  },
  example: ({ heading, expandedClass, expanded }) =>
    html`<div className="fr-transcription">
  <button type="button" className="fr-transcription__btn" aria-expanded="${expanded}" aria-controls="transcription">Transcription</button>
  <div className="fr-collapse${expandedClass}" id="transcription">
    <div className="fr-transcription__footer">
      <div className="fr-transcription__actions-group">
        <button type="button" className="fr-btn fr-btn--fullscreen" aria-controls="transcription-modal" data-fr-opened="false">Agrandir</button>
      </div>
    </div>
    <div id="transcription-modal" className="fr-modal" role="dialog" aria-labelledby="transcription-title">
      <div className="fr-container--fluid">
        <div className="fr-modal__body">
          <div className="fr-modal__header">
            <button type="button" className="fr-btn--close fr-btn" aria-controls="transcription-modal" title="Fermer la fenêtre de dialogue">Fermer</button>
          </div>
          <div className="fr-modal__content">
            <h1 id="transcription-title" className="fr-modal__title">${heading}</h1>
            <p>Texte de la transcription.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
});

// ─── Modale - Desktop ────────────────────────────────────────────────────────
figma.connect('<FIGMA_TRANSCRIPTION__TRANSCRIPTION_MODALE_DESKTOP>', {
  example: () =>
    html`<div id="transcription-modal" className="fr-modal" role="dialog" aria-labelledby="transcription-title">
  <div className="fr-container--fluid">
    <div className="fr-modal__body">
      <div className="fr-modal__header">
        <button type="button" className="fr-btn--close fr-btn" aria-controls="transcription-modal" title="Fermer la fenêtre de dialogue">Fermer</button>
      </div>
      <div className="fr-modal__content">
        <h1 id="transcription-title" className="fr-modal__title">Transcription</h1>
        <p>Texte de la transcription.</p>
      </div>
    </div>
  </div>
</div>`,
});

// ─── Modale - Mobile ─────────────────────────────────────────────────────────
figma.connect('<FIGMA_TRANSCRIPTION__TRANSCRIPTION_MODALE_MOBILE>', {
  example: () =>
    html`<div id="transcription-modal" className="fr-modal" role="dialog" aria-labelledby="transcription-title">
  <div className="fr-container--fluid">
    <div className="fr-modal__body">
      <div className="fr-modal__header">
        <button type="button" className="fr-btn--close fr-btn" aria-controls="transcription-modal" title="Fermer la fenêtre de dialogue">Fermer</button>
      </div>
      <div className="fr-modal__content">
        <h1 id="transcription-title" className="fr-modal__title">Transcription</h1>
        <p>Texte de la transcription.</p>
      </div>
    </div>
  </div>
</div>`,
});
