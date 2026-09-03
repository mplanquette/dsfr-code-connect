import figma, { html } from '@figma/code-connect/html';

// Fil d'Ariane DSFR : 2 sets (Complet, Item). Thème = CSS seul → non bindé.
// « État Déployé / Condensé » est piloté par le JS du DSFR (fr-collapse) : le markup
// est identique, seul aria-expanded change au runtime.

// ─── Complet ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=139-115', {
  example: () =>
    html`<nav role="navigation" class="fr-breadcrumb" aria-label="vous êtes ici :">
  <button type="button" class="fr-breadcrumb__button" aria-expanded="false" aria-controls="breadcrumb">Voir le fil d'Ariane</button>
  <div class="fr-collapse" id="breadcrumb">
    <ol class="fr-breadcrumb__list">
      <li><a class="fr-breadcrumb__link" href="/">Accueil</a></li>
      <li><a class="fr-breadcrumb__link" href="/rubrique">Rubrique</a></li>
      <li><a class="fr-breadcrumb__link" aria-current="page">Page courante</a></li>
    </ol>
  </div>
</nav>`,
});

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=139-77', {
  props: {
    item: figma.enum('Type', {
      Parent: `<a class="fr-breadcrumb__link" href="/rubrique">Rubrique</a>`,
      'En cours': `<a class="fr-breadcrumb__link" aria-current="page">Page courante</a>`,
    }),
  },
  example: ({ item }) => html`<li>${item}</li>`,
});
