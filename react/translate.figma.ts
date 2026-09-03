import figma, { html } from '@figma/code-connect/html';

// Sélecteur de langue DSFR : 2 sets (Desktop, Mobile). Thème = CSS seul.
// « État Ouvert / Fermé » est l'état du collapse, géré en interne → non bindable.
// « Encadré » n'a pas d'équivalent dans `LanguageSelect` (pas de variante outline côté
// react-dsfr, contrairement à `[outline]` sur `dsfr-translate`) : non bindé, simplification
// documentée. `LanguageSelect` est conçu pour vivre dans le `Header` (quick access item) : même
// composant, donc même snippet, pour les rendus Desktop et Mobile (responsive en CSS).
// Le parser interdit d'interpoler une variable externe dans `html` : la liste des langues est
// donc écrite en dur dans chaque exemple.

const imports = ["import { LanguageSelect } from '@codegouvfr/react-dsfr/LanguageSelect'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=13489-190689', {
  props: {
    lang: figma.string('Langue'),
  },
  example: ({ lang }) =>
    html`<LanguageSelect
  lang="${lang}"
  setLang={(lang) => {}}
  supportedLangs={['fr', 'en', 'es']}
  fullNameByLang={{ fr: 'Français', en: 'English', es: 'Español' }}
/>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=13489-191872', {
  props: {
    lang: figma.string('Langue'),
  },
  example: ({ lang }) =>
    html`<LanguageSelect
  lang="${lang}"
  setLang={(lang) => {}}
  supportedLangs={['fr', 'en', 'es']}
  fullNameByLang={{ fr: 'Français', en: 'English', es: 'Español' }}
/>`,
  imports,
});
