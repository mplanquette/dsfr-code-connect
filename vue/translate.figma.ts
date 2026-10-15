import figma, { html } from '@figma/code-connect/html';

// Sélecteur de langue DSFR : 2 sets (Desktop, Mobile). Thème = CSS seul.
// « État Ouvert / Fermé » est l'état du collapse, géré en interne par le composant
// → non bindable. Le rendu Mobile est purement responsive : même composant.
// « Encadré » n'a pas d'équivalent sur `DsfrLanguageSelector` (toujours rendu en
// `fr-btn--tertiary`, contrairement à ngx-dsfr qui a un `[outline]`) → non bindable,
// limitation du composant vue-dsfr.

const imports = ["import DsfrLanguageSelector from '@gouvminint/vue-dsfr/DsfrLanguageSelector.vue'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_SELECTEUR_DE_LANGUE__SELECTEUR_DE_LANGUE_DESKTOP>', {
  props: {
    lang: figma.string('Langue'),
  },
  example: ({ lang }) =>
    html`<DsfrLanguageSelector current-language="${lang}" :languages="[
    { codeIso: 'fr', label: 'Français' },
    { codeIso: 'en', label: 'English' },
    { codeIso: 'es', label: 'Español' }
  ]" />`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_SELECTEUR_DE_LANGUE__SELECTEUR_DE_LANGUE_MOBILE>', {
  props: {
    lang: figma.string('Langue'),
  },
  example: ({ lang }) =>
    html`<DsfrLanguageSelector current-language="${lang}" :languages="[
    { codeIso: 'fr', label: 'Français' },
    { codeIso: 'en', label: 'English' }
  ]" />`,
  imports,
});
