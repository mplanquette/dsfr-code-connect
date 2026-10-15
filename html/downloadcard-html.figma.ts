import figma, { html } from '@figma/code-connect/html';

// Carte de téléchargement DSFR : 8 sets (Desktop/Mobile × MD/SM × Avec/Sans média),
// thème clair uniquement. Desktop et Mobile ne diffèrent que par les pseudo-états CSS :
// même snippet. Les composants « ⚙️ » (Contenu, Corps, Zone de précision, Zone d'action,
// Média) sont des atomes internes → non connectés. Thème sombre = CSS seul.
// `fr-card--download` bascule la carte vers son rendu de téléchargement
// (titre = nom du fichier, zone de fin = métadonnées).

// ─── Desktop / MD / Sans média ───────────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_DESKTOP_MD_SANS_MEDIA>', {
  props: { disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<div class="fr-card fr-card--download">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/assets/fichier.pdf" download="fichier.pdf"${disabled}>Nom du fichier</a>
      </h3>
      <div class="fr-card__end">
        <p class="fr-card__detail">PDF, 506 Ko</p>
      </div>
    </div>
  </div>
</div>`,
});

// ─── Desktop / SM / Sans média ───────────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_DESKTOP_SM_SANS_MEDIA>', {
  props: { disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<div class="fr-card fr-card--download fr-card--sm">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/assets/fichier.pdf" download="fichier.pdf"${disabled}>Nom du fichier</a>
      </h3>
      <div class="fr-card__end">
        <p class="fr-card__detail">PDF, 506 Ko</p>
      </div>
    </div>
  </div>
</div>`,
});

// ─── Desktop / MD / Avec média ───────────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_DESKTOP_MD_AVEC_MEDIA>', {
  props: { disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<div class="fr-card fr-card--download">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/assets/fichier.pdf" download="fichier.pdf"${disabled}>Nom du fichier</a>
      </h3>
      <div class="fr-card__end">
        <p class="fr-card__detail">PDF, 506 Ko</p>
      </div>
    </div>
  </div>
  <div class="fr-card__header">
    <div class="fr-card__img">
      <img class="fr-responsive-img" src="assets/img/card.jpg" alt="" />
    </div>
  </div>
</div>`,
});

// ─── Desktop / SM / Avec média ───────────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_DESKTOP_SM_AVEC_MEDIA>', {
  props: { disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<div class="fr-card fr-card--download fr-card--sm">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/assets/fichier.pdf" download="fichier.pdf"${disabled}>Nom du fichier</a>
      </h3>
      <div class="fr-card__end">
        <p class="fr-card__detail">PDF, 506 Ko</p>
      </div>
    </div>
  </div>
  <div class="fr-card__header">
    <div class="fr-card__img">
      <img class="fr-responsive-img" src="assets/img/card.jpg" alt="" />
    </div>
  </div>
</div>`,
});

// ─── Mobile / SM / Sans média ────────────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_MOBILE_SM_SANS_MEDIA>', {
  props: { disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<div class="fr-card fr-card--download fr-card--sm">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/assets/fichier.pdf" download="fichier.pdf"${disabled}>Nom du fichier</a>
      </h3>
      <div class="fr-card__end">
        <p class="fr-card__detail">PDF, 506 Ko</p>
      </div>
    </div>
  </div>
</div>`,
});

// ─── Mobile / SM / Avec média ────────────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_MOBILE_SM_AVEC_MEDIA>', {
  props: { disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<div class="fr-card fr-card--download fr-card--sm">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/assets/fichier.pdf" download="fichier.pdf"${disabled}>Nom du fichier</a>
      </h3>
      <div class="fr-card__end">
        <p class="fr-card__detail">PDF, 506 Ko</p>
      </div>
    </div>
  </div>
  <div class="fr-card__header">
    <div class="fr-card__img">
      <img class="fr-responsive-img" src="assets/img/card.jpg" alt="" />
    </div>
  </div>
</div>`,
});

// ─── Mobile / MD / Sans média ────────────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_MOBILE_MD_SANS_MEDIA>', {
  props: { disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<div class="fr-card fr-card--download">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/assets/fichier.pdf" download="fichier.pdf"${disabled}>Nom du fichier</a>
      </h3>
      <div class="fr-card__end">
        <p class="fr-card__detail">PDF, 506 Ko</p>
      </div>
    </div>
  </div>
</div>`,
});

// ─── Mobile / MD / Avec média ────────────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_MOBILE_MD_AVEC_MEDIA>', {
  props: { disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<div class="fr-card fr-card--download">
  <div class="fr-card__body">
    <div class="fr-card__content">
      <h3 class="fr-card__title">
        <a href="/assets/fichier.pdf" download="fichier.pdf"${disabled}>Nom du fichier</a>
      </h3>
      <div class="fr-card__end">
        <p class="fr-card__detail">PDF, 506 Ko</p>
      </div>
    </div>
  </div>
  <div class="fr-card__header">
    <div class="fr-card__img">
      <img class="fr-responsive-img" src="assets/img/card.jpg" alt="" />
    </div>
  </div>
</div>`,
});
