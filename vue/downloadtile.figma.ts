import figma, { html } from '@figma/code-connect/html';

// Tuile de téléchargement DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, même
// snippet (Desktop/Mobile ne diffèrent que par les pseudo-états CSS). Les composants « ⚙️ »
// (Contenu, Zone de précision) sont des atomes internes → non connectés. Thème sombre = CSS
// seul.
// `download` bascule DsfrTile vers son rendu de téléchargement ; `details` porte la
// métadonnée déjà formatée (pas de props séparées mimeType/sizeBytes côté vue-dsfr).
// `small` remplace `panelSize="SM"` (booléen plutôt qu'enum de taille).
// « Désactivé » pilote la prop `disabled` (présente dans `DsfrTileProps`, contrairement à
// `DsfrCardProps`).

const imports = ["import DsfrTile from '@gouvminint/vue-dsfr/DsfrTile.vue'"];

const props = {
  small: figma.enum('Taille', { SM: ' small', MD: '' }),
  picto: figma.boolean('Voir Picto', {
    true: `\n    svg-path="assets/artwork/pictograms/system/system.svg"`,
    false: '',
  }),
  disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
};

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506852', {
  props,
  example: ({ small, picto, disabled }) =>
    html`<DsfrTile
    title="Nom du fichier"
    download
    to="/assets/fichier.pdf"
    details="PDF, 506 Ko"${small}${picto}${disabled}
  />`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506949', {
  props,
  example: ({ small, picto, disabled }) =>
    html`<DsfrTile
    title="Nom du fichier"
    download
    to="/assets/fichier.pdf"
    details="PDF, 506 Ko"${small}${picto}${disabled}
  />`,
  imports,
});
