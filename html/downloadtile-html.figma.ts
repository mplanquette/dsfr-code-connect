import figma, { html } from '@figma/code-connect/html';

// Tuile de téléchargement DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, // même snippet. Les composants « ⚙️ » (Contenu, Zone de précision) sont des atomes
// internes → non connectés. Thème sombre = CSS seul.
// `fr-tile--download` bascule la tuile vers son rendu de téléchargement.

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__TUILE_DESKTOP>', {
  props: {
    sizeClass: figma.enum('Taille', { SM: ' fr-tile--sm', MD: '' }),
    picto: figma.boolean('Voir Picto', {
      true: `\n  <div class="fr-tile__header">
    <div class="fr-tile__pictogram">
      <svg aria-hidden="true" class="fr-artwork" viewBox="0 0 80 80" width="80px" height="80px">
        <use class="fr-artwork-decorative" href="/artwork/pictograms/system/system.svg#artwork-decorative"></use>
        <use class="fr-artwork-minor" href="/artwork/pictograms/system/system.svg#artwork-minor"></use>
        <use class="fr-artwork-major" href="/artwork/pictograms/system/system.svg#artwork-major"></use>
      </svg>
    </div>
  </div>`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }),
  },
  example: ({ sizeClass, picto, disabled }) =>
    html`<div class="fr-tile fr-tile--download${sizeClass}">
  <div class="fr-tile__body">
    <div class="fr-tile__content">
      <h3 class="fr-tile__title">
        <a href="/assets/fichier.pdf" download="fichier.pdf"${disabled}>Nom du fichier</a>
      </h3>
      <p class="fr-tile__detail">PDF, 506 Ko</p>
    </div>
  </div>${picto}
</div>`,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__TUILE_MOBILE>', {
  props: {
    sizeClass: figma.enum('Taille', { SM: ' fr-tile--sm', MD: '' }),
    picto: figma.boolean('Voir Picto', {
      true: `\n  <div class="fr-tile__header">
    <div class="fr-tile__pictogram">
      <svg aria-hidden="true" class="fr-artwork" viewBox="0 0 80 80" width="80px" height="80px">
        <use class="fr-artwork-decorative" href="/artwork/pictograms/system/system.svg#artwork-decorative"></use>
        <use class="fr-artwork-minor" href="/artwork/pictograms/system/system.svg#artwork-minor"></use>
        <use class="fr-artwork-major" href="/artwork/pictograms/system/system.svg#artwork-major"></use>
      </svg>
    </div>
  </div>`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: ' aria-disabled="true"', false: '' }),
  },
  example: ({ sizeClass, picto, disabled }) =>
    html`<div class="fr-tile fr-tile--download${sizeClass}">
  <div class="fr-tile__body">
    <div class="fr-tile__content">
      <h3 class="fr-tile__title">
        <a href="/assets/fichier.pdf" download="fichier.pdf"${disabled}>Nom du fichier</a>
      </h3>
      <p class="fr-tile__detail">PDF, 506 Ko</p>
    </div>
  </div>${picto}
</div>`,
});
