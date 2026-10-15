import figma, { html } from '@figma/code-connect/html';

// Interrupteur DSFR : 2 sets utiles (Item, Groupe), même mapping que
// angular/toggle.figma.ts et html/toggle-html.figma.ts. Le set « 🚫 / Interrupteur »
// est l'atome interne Figma → non connecté. Thème sombre = CSS seul.
// « Alignement Gauche » → `labelPosition="left"`, déprécié depuis DSFR 1.14.1 pour
// raisons d'accessibilité : binding conservé pour refléter le design existant.
// « État » (message de validation/erreur) n'est PAS bindé côté React : `ToggleSwitch`
// et `ToggleSwitchGroup` (react-dsfr) n'exposent aucune prop `state`/`stateRelatedMessage`
// contrairement à `dsfr-form-toggle` (ngx-dsfr), simplification imposée par l'API réelle.
// `inputTitle` est obligatoire en mode non contrôlé (`defaultChecked`) côté TypeScript :
// placeholder statique posé pour rester valide.
// `toggles[]` : déclaré en `const toggles = [...]` avant le JSX (comme
// breadcrumb.figma.ts) puis référencé en `toggles={toggles}`, plutôt qu'en valeur
// d'attribut multiligne inline, le parser Code Connect (HTML générique) interprète
// toute valeur d'attribut multiligne contenant plusieurs objets comme une liste
// d'attributs HTML et lève une erreur « Duplicate attribute name ».

const imports = ["import { ToggleSwitch } from '@codegouvfr/react-dsfr/ToggleSwitch'"];

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_INTERRUPTEUR__ITEM>', {
  props: {
    label: figma.string('Libellé'),
    hint: figma.boolean('Voir Texte d\'aide', { true: ' helperText="Texte d\'aide"', false: '' }),
    showStatus: figma.boolean('Statut', { true: '', false: ' showCheckedHint={false}' }),
    checked: figma.boolean('Coché', { true: ' defaultChecked', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    position: figma.enum('Alignement', { Gauche: ' labelPosition="left"', Droite: '' }),
  },
  example: ({ label, hint, showStatus, checked, disabled, position }) =>
    html`<ToggleSwitch label="${label}" inputTitle="Interrupteur"${hint}${showStatus}${checked}${disabled}${position} />`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_INTERRUPTEUR__GROUPE>', {
  props: {
    position: figma.enum('Alignement', { Gauche: ' labelPosition="left"', Droite: '' }),
  },
  example: ({ position }) =>
    html`const toggles = [
  { label: 'Première option', inputTitle: 'Interrupteur 1' },
  { label: 'Deuxième option', inputTitle: 'Interrupteur 2' },
  { label: 'Troisième option', inputTitle: 'Interrupteur 3' }
];

<ToggleSwitchGroup
  toggles={toggles}${position}
/>`,
  imports: ["import { ToggleSwitchGroup } from '@codegouvfr/react-dsfr/ToggleSwitchGroup'"],
});
