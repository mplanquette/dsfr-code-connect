import figma, { html } from '@figma/code-connect/html';

// Carte DSFR : 9 sets utiles (Verticale × 3 tailles, Horizontale × 3 tailles × 2 avec/sans
// média), en thème clair uniquement. Les composants préfixés « ⚙️ » (Média, Zone d'action,
// Zone de précision, Détail, Badge ou tag, Contenu, Description) sont des atomes internes
// qui composent ces 9 sets → non connectés individuellement. Thème sombre = CSS seul.
// Focus, Survol, Cliqué = pseudo-états → ignorés. Support (Desktop/Mobile) = CSS responsive.
// « Cliquable = False » retire le lien : non représentable en un seul attribut → non bindé,
// le lien reste présent dans tous les exemples (comportement par défaut le plus courant).

// ─── Verticale / LG ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202030', {
  props: {
    media: figma.boolean('Voir Média', {
      true: `\n  <div class="fr-card__header">
    <div class="fr-card__img">
      <img class="fr-responsive-img" src="assets/img/card.jpg" alt="" />
    </div>
  </div>`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }),
  },
  example: ({ media, disabled }) =>
    html`<div class="fr-card fr-card--lg">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/page"${disabled}>Titre de la carte</a>
      </h3>
      <p class="fr-card__desc">Description de la carte.</p>
    </div>
  </div>${media}
</div>`,
});

// ─── Verticale / MD ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202061', {
  props: {
    media: figma.boolean('Voir Média', {
      true: `\n  <div class="fr-card__header">
    <div class="fr-card__img">
      <img class="fr-responsive-img" src="assets/img/card.jpg" alt="" />
    </div>
  </div>`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }),
  },
  example: ({ media, disabled }) =>
    html`<div class="fr-card">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/page"${disabled}>Titre de la carte</a>
      </h3>
      <p class="fr-card__desc">Description de la carte.</p>
    </div>
  </div>${media}
</div>`,
});

// ─── Verticale / SM ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202092', {
  props: {
    media: figma.boolean('Voir Média', {
      true: `\n  <div class="fr-card__header">
    <div class="fr-card__img">
      <img class="fr-responsive-img" src="assets/img/card.jpg" alt="" />
    </div>
  </div>`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }),
  },
  example: ({ media, disabled }) =>
    html`<div class="fr-card fr-card--sm">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/page"${disabled}>Titre de la carte</a>
      </h3>
      <p class="fr-card__desc">Description de la carte.</p>
    </div>
  </div>${media}
</div>`,
});

// ─── Horizontale / LG / Avec média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202123', {
  props: {
    proportionClass: figma.enum('Proportions', {
      '33-66': ' fr-card--horizontal-tier',
      '40-60': '',
      '50-50': ' fr-card--horizontal-half',
    }),
    disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }),
  },
  example: ({ proportionClass, disabled }) =>
    html`<div class="fr-card fr-card--horizontal fr-card--lg${proportionClass}">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/page"${disabled}>Titre de la carte</a>
      </h3>
      <p class="fr-card__desc">Description de la carte.</p>
    </div>
  </div>
  <div class="fr-card__header">
    <div class="fr-card__img">
      <img class="fr-responsive-img" src="assets/img/card.jpg" alt="" />
    </div>
  </div>
</div>`,
});

// ─── Horizontale / LG / Sans média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202178', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }),
  },
  example: ({ disabled }) =>
    html`<div class="fr-card fr-card--horizontal fr-card--lg">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/page"${disabled}>Titre de la carte</a>
      </h3>
      <p class="fr-card__desc">Description de la carte.</p>
    </div>
  </div>
</div>`,
});

// ─── Horizontale / MD / Avec média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202192', {
  props: {
    proportionClass: figma.enum('Proportions', {
      '33-66': ' fr-card--horizontal-tier',
      '40-60': '',
      '50-50': ' fr-card--horizontal-half',
    }),
    disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }),
  },
  example: ({ proportionClass, disabled }) =>
    html`<div class="fr-card fr-card--horizontal${proportionClass}">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/page"${disabled}>Titre de la carte</a>
      </h3>
      <p class="fr-card__desc">Description de la carte.</p>
    </div>
  </div>
  <div class="fr-card__header">
    <div class="fr-card__img">
      <img class="fr-responsive-img" src="assets/img/card.jpg" alt="" />
    </div>
  </div>
</div>`,
});

// ─── Horizontale / MD / Sans média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202247', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }),
  },
  example: ({ disabled }) =>
    html`<div class="fr-card fr-card--horizontal">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/page"${disabled}>Titre de la carte</a>
      </h3>
      <p class="fr-card__desc">Description de la carte.</p>
    </div>
  </div>
</div>`,
});

// ─── Horizontale / SM / Avec média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202261', {
  props: {
    proportionClass: figma.enum('Proportions', {
      '33-66': ' fr-card--horizontal-tier',
      '40-60': '',
      '50-50': ' fr-card--horizontal-half',
    }),
    disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }),
  },
  example: ({ proportionClass, disabled }) =>
    html`<div class="fr-card fr-card--horizontal fr-card--sm${proportionClass}">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/page"${disabled}>Titre de la carte</a>
      </h3>
      <p class="fr-card__desc">Description de la carte.</p>
    </div>
  </div>
  <div class="fr-card__header">
    <div class="fr-card__img">
      <img class="fr-responsive-img" src="assets/img/card.jpg" alt="" />
    </div>
  </div>
</div>`,
});

// ─── Horizontale / SM / Sans média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202316', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }),
  },
  example: ({ disabled }) =>
    html`<div class="fr-card fr-card--horizontal fr-card--sm">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/page"${disabled}>Titre de la carte</a>
      </h3>
      <p class="fr-card__desc">Description de la carte.</p>
    </div>
  </div>
</div>`,
});
