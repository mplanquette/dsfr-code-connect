import figma, { html } from '@figma/code-connect/html';

// Sélecteur de langue DSFR : 2 sets (Desktop, Mobile). Thème = CSS seul.
// « État Ouvert / Fermé » est l'état du collapse, géré en interne par le composant
// → non bindable. Le rendu Mobile est purement responsive : même snippet.
// Le parser interdit d'interpoler une variable externe dans `html` : la liste des
// langues est donc écrite en dur dans chaque exemple.

const imports = ["import { DsfrTranslateComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_SELECTEUR_DE_LANGUE__SELECTEUR_DE_LANGUE_DESKTOP>', {
  props: {
    lang: figma.string('Langue'),
    outline: figma.enum('Encadré', { True: '', False: ' [outline]="false"' }),
  },
  example: ({ lang, outline }) =>
    html`<dsfr-translate
  currentLangCode="${lang}"
  [languages]="[
    { value: 'fr', label: 'FR', description: 'Français' },
    { value: 'en', label: 'EN', description: 'English' },
    { value: 'es', label: 'ES', description: 'Español' }
  ]"${outline}></dsfr-translate>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_SELECTEUR_DE_LANGUE__SELECTEUR_DE_LANGUE_MOBILE>', {
  props: {
    lang: figma.string('Langue'),
  },
  example: ({ lang }) =>
    html`<dsfr-translate
  currentLangCode="${lang}"
  [languages]="[
    { value: 'fr', label: 'FR', description: 'Français' },
    { value: 'en', label: 'EN', description: 'English' },
    { value: 'es', label: 'ES', description: 'Español' }
  ]"></dsfr-translate>`,
  imports,
});
