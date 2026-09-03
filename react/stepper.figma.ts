import figma, { html } from '@figma/code-connect/html';

// Indicateur d'étapes DSFR : 2 sets (Indicateur complet, Étape unitaire).
// Thème et Support (Desktop / Mobile) = CSS seul → non bindés.

const imports = ["import { Stepper } from '@codegouvfr/react-dsfr/Stepper'"];

// ─── Indicateur d'étapes ─────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=12356-77678', {
  props: {
    total: figma.enum('Étapes', {
      '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8',
    }),
  },
  example: ({ total }) =>
    html`<Stepper
  title="Titre de l'étape courante"
  currentStep={1}
  stepCount={${total}}
  nextTitle="Titre de l'étape suivante"
/>`,
  imports,
});

// ─── Étape ───────────────────────────────────────────────────────────────────
// Une étape n'a pas de composant dédié : elle se pilote par `currentStep`.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=12355-77053', {
  props: {
    current: figma.enum('État', { Courant: '2', Défaut: '1' }),
  },
  example: ({ current }) =>
    html`<Stepper
  title="Titre de l'étape courante"
  currentStep={${current}}
  stepCount={4}
  nextTitle="Titre de l'étape suivante"
/>`,
  imports,
});
