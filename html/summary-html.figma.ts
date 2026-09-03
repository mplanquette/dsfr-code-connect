import figma, { html } from '@figma/code-connect/html';

// Sommaire DSFR : 2 sets (Items, Complet). Thème et Support = CSS seul.
// Survol = pseudo-état → ignoré.

// ─── Items ───────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=583-49320', {
  props: {
    nested: figma.boolean('Imbriqué', {
      true: `\n  <ol>\n    <li><a class="fr-summary__link" href="#sous-titre">Sous-titre</a></li>\n  </ol>`,
      false: '',
    }),
  },
  example: ({ nested }) =>
    html`<li>
  <a class="fr-summary__link" href="#titre-de-section">Titre de section</a>${nested}
</li>`,
});

// ─── Complet ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=583-49481', {
  example: () =>
    html`<nav class="fr-summary" role="navigation" aria-labelledby="fr-summary-title">
  <h2 class="fr-summary__title" id="fr-summary-title">Sommaire</h2>
  <ol>
    <li><a class="fr-summary__link" href="#premiere-section">Première section</a></li>
    <li>
      <a class="fr-summary__link" href="#deuxieme-section">Deuxième section</a>
      <ol>
        <li><a class="fr-summary__link" href="#sous-section">Sous-section</a></li>
      </ol>
    </li>
    <li><a class="fr-summary__link" href="#troisieme-section">Troisième section</a></li>
  </ol>
</nav>`,
});
