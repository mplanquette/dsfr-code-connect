import figma, { html } from '@figma/code-connect/html';

// Transcription DSFR : 3 sets (Transcription, Modale Desktop, Modale Mobile).
// Le set « _🚫Éléments - Exemple de contenu » est un atome interne Figma → non connecté.
// Thème et Support = CSS seul. Survol = pseudo-état → ignoré.
// « Ouvert » est l'état du collapse, piloté au runtime par le composant → non bindable.
// Les deux sets « Modale » sont la vue agrandie interne au composant : même snippet.
// vue-dsfr a un composant dédié `DsfrTranscription` (props `title`/`content`).

const imports = ["import DsfrTranscription from '@gouvminint/vue-dsfr/DsfrTranscription.vue'"];

// ─── Transcription ───────────────────────────────────────────────────────────
figma.connect('<FIGMA_TRANSCRIPTION__TRANSCRIPTION>', {
  props: {
    heading: figma.string('Titre'),
  },
  example: ({ heading }) =>
    html`<DsfrTranscription title="${heading}" content="Texte de la transcription." />`,
  imports,
});

// ─── Modale - Desktop ────────────────────────────────────────────────────────
figma.connect('<FIGMA_TRANSCRIPTION__TRANSCRIPTION_MODALE_DESKTOP>', {
  example: () =>
    html`<DsfrTranscription title="Transcription" content="Texte de la transcription." />`,
  imports,
});

// ─── Modale - Mobile ─────────────────────────────────────────────────────────
figma.connect('<FIGMA_TRANSCRIPTION__TRANSCRIPTION_MODALE_MOBILE>', {
  example: () =>
    html`<DsfrTranscription title="Transcription" content="Texte de la transcription." />`,
  imports,
});
