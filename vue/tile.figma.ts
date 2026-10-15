import figma, { html } from '@figma/code-connect/html';

// Tuile DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, Desktop et Mobile ne
// diffèrent que par Focus et le nombre d'états pseudo-CSS (Survol absent au tactile) :
// même snippet. Les composants préfixés « ⚙️ » (Contenu, Corps, Zone de précision,
// Zone d'action) sont des atomes internes → non connectés. Thème sombre = CSS seul.
// Focus, Survol, Cliqué = pseudo-états → ignorés.
// « Hauteur fixe » n'a pas d'équivalent prop dans `DsfrTile` (vue-dsfr) → non bindé.
// « Cliquable = False » retire le lien, non représentable en une seule input → non
// bindé, le lien reste présent (comportement par défaut le plus courant).
// « Taille » → prop `small` (booléenne, pas d'enum SM/MD côté vue-dsfr).

const imports = ["import DsfrTile from '@gouvminint/vue-dsfr/DsfrTile.vue'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TUILE__DESKTOP>', {
  props: {
    horizontal: figma.enum('Orientation', { Horizontale: ' horizontal', Verticale: '' }),
    small: figma.enum('Taille', { SM: ' small', MD: '' }),
    picto: figma.boolean('Voir Picto', {
      true: ' svg-path="assets/artwork/pictograms/system/system.svg"',
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
  },
  example: ({ horizontal, small, picto, disabled }) =>
    html`<DsfrTile
  title="Titre de la tuile"
  description="Description de la tuile."
  to="/page"${horizontal}${small}${picto}${disabled}
/>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TUILE__MOBILE>', {
  props: {
    horizontal: figma.enum('Orientation', { Horizontale: ' horizontal', Verticale: '' }),
    small: figma.enum('Taille', { SM: ' small', MD: '' }),
    picto: figma.boolean('Voir Picto', {
      true: ' svg-path="assets/artwork/pictograms/system/system.svg"',
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
  },
  example: ({ horizontal, small, picto, disabled }) =>
    html`<DsfrTile
  title="Titre de la tuile"
  description="Description de la tuile."
  to="/page"${horizontal}${small}${picto}${disabled}
/>`,
  imports,
});
