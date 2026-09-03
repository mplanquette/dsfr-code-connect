import figma, { html } from '@figma/code-connect/html';

// Tuile de téléchargement DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, // même snippet (Desktop/Mobile ne diffèrent que par les pseudo-états CSS). Les
// composants « ⚙️ » (Contenu, Zone de précision) sont des atomes internes → non
// connectés. Thème sombre = CSS seul.
// `downloadButton` bascule <Tile> vers son rendu de téléchargement (contrepartie de
// `[download]="true"` sur `dsfr-tile`) ; `disabled` est ici une vraie prop native de
// react-dsfr (contrairement à <Card>, cf. `downloadcard.figma.ts`).

const imports = ["import { Tile } from '@codegouvfr/react-dsfr/Tile'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506852', {
  props: {
    small: figma.enum('Taille', { SM: '\n  small', MD: '' }),
    picto: figma.boolean('Voir Picto', {
      true: `\n  pictogram={<img src="/assets/artwork/pictograms/system/system.svg" alt="" />}`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  disabled', false: '' }),
  },
  example: ({ small, picto, disabled }) =>
    html`<Tile
  title="Nom du fichier"
  detail="PDF, 518 Ko"
  downloadButton
  linkProps={{ href: '/assets/fichier.pdf', download: true }}${small}${picto}${disabled} />`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506949', {
  props: {
    small: figma.enum('Taille', { SM: '\n  small', MD: '' }),
    picto: figma.boolean('Voir Picto', {
      true: `\n  pictogram={<img src="/assets/artwork/pictograms/system/system.svg" alt="" />}`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  disabled', false: '' }),
  },
  example: ({ small, picto, disabled }) =>
    html`<Tile
  title="Nom du fichier"
  detail="PDF, 518 Ko"
  downloadButton
  linkProps={{ href: '/assets/fichier.pdf', download: true }}${small}${picto}${disabled} />`,
  imports,
});
