import figma, { html } from '@figma/code-connect/html';

// Tuile DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, Desktop et Mobile ne
// diffèrent que par Focus et le nombre d'états pseudo-CSS (Survol absent au tactile) :
// même snippet. Les composants préfixés « ⚙️ » (Contenu, Corps, Zone de précision,
// Zone d'action) sont des atomes internes → non connectés. Thème sombre = CSS seul.
// Focus, Survol, Cliqué = pseudo-états → ignorés.
// « Hauteur fixe » n'a pas de classe DSFR correspondante dans le composant → non bindé.
// « Cliquable = False » retire le lien, non représentable en un seul attribut → non
// bindé, le lien reste présent (comportement par défaut le plus courant).

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19187-356872', {
  props: {
    horizontalClass: figma.enum('Orientation', { Horizontale: ' fr-tile--horizontal', Verticale: '' }),
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
  example: ({ horizontalClass, sizeClass, picto, disabled }) =>
    html`<div class="fr-tile${horizontalClass}${sizeClass}">
  <div class="fr-tile__body">
    <div class="fr-tile__content">
      <h3 class="fr-tile__title">
        <a href="/page"${disabled}>Titre de la tuile</a>
      </h3>
      <p class="fr-tile__desc">Description de la tuile.</p>
    </div>
  </div>${picto}
</div>`,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19547-360323', {
  props: {
    horizontalClass: figma.enum('Orientation', { Horizontale: ' fr-tile--horizontal', Verticale: '' }),
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
  example: ({ horizontalClass, sizeClass, picto, disabled }) =>
    html`<div class="fr-tile${horizontalClass}${sizeClass}">
  <div class="fr-tile__body">
    <div class="fr-tile__content">
      <h3 class="fr-tile__title">
        <a href="/page"${disabled}>Titre de la tuile</a>
      </h3>
      <p class="fr-tile__desc">Description de la tuile.</p>
    </div>
  </div>${picto}
</div>`,
});
