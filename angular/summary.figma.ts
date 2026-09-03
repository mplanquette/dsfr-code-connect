import figma, { html } from '@figma/code-connect/html';

// Sommaire DSFR : 2 sets (Items, Complet). Thème et Support = CSS seul.
// Survol = pseudo-état → ignoré.

const imports = ["import { DsfrSummaryComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Items ───────────────────────────────────────────────────────────────────
// « Imbriqué » indique une entrée de second niveau, portée par `subEntries`.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=583-49320', {
  props: {
    nested: figma.boolean('Imbriqué', {
      true: `,
      subEntries: [{ label: 'Sous-titre', anchor: 'sous-titre' }]`,
      false: '',
    }),
  },
  example: ({ nested }) =>
    html`<dsfr-summary
  heading="Sommaire"
  [entries]="[
    { label: 'Titre de section', anchor: 'titre-de-section'${nested} }
  ]"></dsfr-summary>`,
  imports,
});

// ─── Complet ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=583-49481', {
  example: () =>
    html`<dsfr-summary
  heading="Sommaire"
  headingLevel="H2"
  [entries]="[
    { label: 'Première section', anchor: 'premiere-section' },
    {
      label: 'Deuxième section',
      anchor: 'deuxieme-section',
      subEntries: [
        { label: 'Sous-section', anchor: 'sous-section' }
      ]
    },
    { label: 'Troisième section', anchor: 'troisieme-section' }
  ]"></dsfr-summary>`,
  imports,
});
