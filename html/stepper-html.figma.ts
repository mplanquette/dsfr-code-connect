import figma, { html } from '@figma/code-connect/html';

// Indicateur d'étapes DSFR : 2 sets. Thème et Support = CSS seul.
// Le nombre d'étapes et l'étape courante sont portés par data-fr-steps et
// data-fr-current-step, exploités par le CSS DSFR.

// ─── Indicateur d'étapes ─────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=12356-77678', {
  props: {
    total: figma.enum('Étapes', {
      '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8',
    }),
  },
  example: ({ total }) =>
    html`<div class="fr-stepper">
  <h2 class="fr-stepper__title">
    Titre de l'étape courante
    <span class="fr-stepper__state">Étape 1 sur ${total}</span>
  </h2>
  <div class="fr-stepper__steps" data-fr-current-step="1" data-fr-steps="${total}"></div>
  <p class="fr-stepper__details">
    <span class="fr-text--bold">Étape suivante :</span> Titre de l'étape suivante
  </p>
</div>`,
});

// ─── Étape ───────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=12355-77053', {
  props: {
    current: figma.enum('État', { Courant: '2', Défaut: '1' }),
  },
  example: ({ current }) =>
    html`<div class="fr-stepper">
  <h2 class="fr-stepper__title">
    Titre de l'étape courante
    <span class="fr-stepper__state">Étape ${current} sur 4</span>
  </h2>
  <div class="fr-stepper__steps" data-fr-current-step="${current}" data-fr-steps="4"></div>
  <p class="fr-stepper__details">
    <span class="fr-text--bold">Étape suivante :</span> Titre de l'étape suivante
  </p>
</div>`,
});
