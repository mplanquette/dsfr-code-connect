import figma, { html } from '@figma/code-connect/html';

// Transcription DSFR : 3 sets (Transcription, Modale Desktop, Modale Mobile).
// Le set « _🚫Éléments - Exemple de contenu » est un atome interne Figma → non connecté.
// Thème et Support = CSS seul. Survol = pseudo-état → ignoré.
// « Ouvert » est l'état du collapse, piloté au runtime par le JS DSFR → non bindable.
// Les deux sets « Modale » sont la vue agrandie interne au composant : même snippet.

const imports = ["import { DsfrTranscriptionComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Transcription ───────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14268-197280', {
  props: {
    heading: figma.string('Titre'),
  },
  example: ({ heading }) =>
    html`<dsfr-transcription heading="${heading}" content="Texte de la transcription."></dsfr-transcription>`,
  imports,
});

// ─── Modale - Desktop ────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14470-198380', {
  example: () =>
    html`<dsfr-transcription heading="Transcription" content="Texte de la transcription."></dsfr-transcription>`,
  imports,
});

// ─── Modale - Mobile ─────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14470-198401', {
  example: () =>
    html`<dsfr-transcription heading="Transcription" content="Texte de la transcription."></dsfr-transcription>`,
  imports,
});
