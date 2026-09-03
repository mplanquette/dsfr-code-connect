import figma, { html } from '@figma/code-connect/html';

// Pagination DSFR : 3 sets (Incrément, Numéro, Complète). Thème et Support = CSS seul.
// Survol = pseudo-état → ignoré.
// Les liens désactivés utilisent aria-disabled + role="link" (pas d'attribut href),
// conformément au DSFR : ils restent focusables (RGAA 7.3).

// ─── Incrément (précédent / suivant) ─────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=577-177', {
  props: {
    directionClass: figma.enum('Sens', {
      Précédente: ' fr-pagination__link--prev',
      Suivante: ' fr-pagination__link--next',
    }),
    labelClass: figma.enum('Label', { True: ' fr-pagination__link--lg-label', False: '' }),
    label: figma.enum('Sens', { Précédente: 'Page précédente', Suivante: 'Page suivante' }),
    state: figma.enum('État', {
      Défaut: ' href="#"',
      Survol: ' href="#"',
      Désactivé: ' aria-disabled="true" role="link"',
    }),
  },
  example: ({ directionClass, labelClass, label, state }) =>
    html`<li>
  <a class="fr-pagination__link${directionClass}${labelClass}"${state}>${label}</a>
</li>`,
});

// ─── Numéro ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=577-349', {
  props: {
    current: figma.enum('État', {
      Défaut: ' href="#"',
      Courant: ' aria-current="page" href="#"',
      Survol: ' href="#"',
    }),
  },
  example: ({ current }) =>
    html`<li>
  <a class="fr-pagination__link" title="Page 2"${current}>2</a>
</li>`,
});

// ─── Complète ────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=577-482', {
  example: () =>
    html`<nav role="navigation" class="fr-pagination" aria-label="Pagination des résultats">
  <ul class="fr-pagination__list">
    <li>
      <a class="fr-pagination__link fr-pagination__link--first" aria-disabled="true" role="link">Première page</a>
    </li>
    <li>
      <a class="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label" aria-disabled="true" role="link">Page précédente</a>
    </li>
    <li><a class="fr-pagination__link" aria-current="page" title="Page 1" href="#">1</a></li>
    <li><a class="fr-pagination__link" title="Page 2" href="#">2</a></li>
    <li><a class="fr-pagination__link" title="Page 3" href="#">3</a></li>
    <li>
      <a class="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label" href="#">Page suivante</a>
    </li>
    <li>
      <a class="fr-pagination__link fr-pagination__link--last" href="#">Dernière page</a>
    </li>
  </ul>
</nav>`,
});
