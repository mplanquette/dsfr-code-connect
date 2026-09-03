import figma, { html } from '@figma/code-connect/html';

// Indicateur d'étapes DSFR : 2 sets (Indicateur complet, Étape unitaire).
// Thème et Support (Desktop / Mobile) = CSS seul → non bindés.
// API très différente de ngx-dsfr : DsfrStepper n'a pas de `totalSteps`/`currentStepTitle`/
// `nextStepTitle` séparés, il déduit tout de `steps: string[]` (titre de chaque étape) et
// `current-step` (1-indexé) : `steps[currentStep-1]` = titre courant, `steps[currentStep]`
// = titre suivant. Le tableau `steps` est donc généré en dur pour chaque valeur de « Étapes ».

const imports = ["import DsfrStepper from '@gouvminint/vue-dsfr/DsfrStepper.vue'"];

// ─── Indicateur d'étapes ─────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=12356-77678', {
  props: {
    steps: figma.enum('Étapes', {
      '2': `['Titre de l\\'étape 1', 'Titre de l\\'étape 2']`,
      '3': `['Titre de l\\'étape 1', 'Titre de l\\'étape 2', 'Titre de l\\'étape 3']`,
      '4': `['Titre de l\\'étape 1', 'Titre de l\\'étape 2', 'Titre de l\\'étape 3', 'Titre de l\\'étape 4']`,
      '5': `['Titre de l\\'étape 1', 'Titre de l\\'étape 2', 'Titre de l\\'étape 3', 'Titre de l\\'étape 4', 'Titre de l\\'étape 5']`,
      '6': `['Titre de l\\'étape 1', 'Titre de l\\'étape 2', 'Titre de l\\'étape 3', 'Titre de l\\'étape 4', 'Titre de l\\'étape 5', 'Titre de l\\'étape 6']`,
      '7': `['Titre de l\\'étape 1', 'Titre de l\\'étape 2', 'Titre de l\\'étape 3', 'Titre de l\\'étape 4', 'Titre de l\\'étape 5', 'Titre de l\\'étape 6', 'Titre de l\\'étape 7']`,
      '8': `['Titre de l\\'étape 1', 'Titre de l\\'étape 2', 'Titre de l\\'étape 3', 'Titre de l\\'étape 4', 'Titre de l\\'étape 5', 'Titre de l\\'étape 6', 'Titre de l\\'étape 7', 'Titre de l\\'étape 8']`,
    }),
  },
  example: ({ steps }) => html`<DsfrStepper :current-step="1" :steps="${steps}" />`,
  imports,
});

// ─── Étape ───────────────────────────────────────────────────────────────────
// Une étape n'a pas de composant dédié : elle se pilote par `current-step`.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=12355-77053', {
  props: {
    current: figma.enum('État', { Courant: '2', Défaut: '1' }),
  },
  example: ({ current }) =>
    html`<DsfrStepper :current-step="${current}" :steps="['Titre de l\\'étape 1', 'Titre de l\\'étape 2', 'Titre de l\\'étape 3', 'Titre de l\\'étape 4']" />`,
  imports,
});
