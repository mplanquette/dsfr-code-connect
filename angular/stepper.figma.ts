import figma, { html } from '@figma/code-connect/html';

// Indicateur d'étapes DSFR : 2 sets (Indicateur complet, Étape unitaire).
// Thème et Support (Desktop / Mobile) = CSS seul → non bindés.

const imports = ["import { DsfrStepperComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Indicateur d'étapes ─────────────────────────────────────────────────────
figma.connect('<FIGMA_INDICATEUR_D_ETAPES__INDICATEUR_D_ETAPES>', {
  props: {
    total: figma.enum('Étapes', {
      '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8',
    }),
  },
  example: ({ total }) =>
    html`<dsfr-stepper
  [totalSteps]="${total}"
  [currentStep]="1"
  currentStepTitle="Titre de l'étape courante"
  nextStepTitle="Titre de l'étape suivante"></dsfr-stepper>`,
  imports,
});

// ─── Étape ───────────────────────────────────────────────────────────────────
// Une étape n'a pas de composant dédié : elle se pilote par `currentStep`.
figma.connect('<FIGMA_INDICATEUR_D_ETAPES__ETAPE>', {
  props: {
    current: figma.enum('État', { Courant: '2', Défaut: '1' }),
  },
  example: ({ current }) =>
    html`<dsfr-stepper
  [totalSteps]="4"
  [currentStep]="${current}"
  currentStepTitle="Titre de l'étape courante"
  nextStepTitle="Titre de l'étape suivante"></dsfr-stepper>`,
  imports,
});
