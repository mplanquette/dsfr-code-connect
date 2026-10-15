import figma, { html } from '@figma/code-connect/html';

// Tuile de téléchargement DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, // même snippet (Desktop/Mobile ne diffèrent que par les pseudo-états CSS). Les
// composants « ⚙️ » (Contenu, Zone de précision) sont des atomes internes → non
// connectés. Thème sombre = CSS seul.
// `[download]="true"` bascule dsfr-tile vers son rendu de téléchargement.

const imports = ["import { DsfrTileComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__TUILE_DESKTOP>', {
  props: {
    size: figma.enum('Taille', { SM: '\n  panelSize="SM"', MD: '' }),
    picto: figma.boolean('Voir Picto', {
      true: `\n  artworkFilePath="assets/artwork/pictograms/system/system.svg"`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
  },
  example: ({ size, picto, disabled }) =>
    html`<dsfr-tile
  heading="Nom du fichier"
  [download]="true"
  link="/assets/fichier.pdf"
  downloadMimeType="application/pdf"
  [downloadSizeBytes]="518000"${size}${picto}${disabled}></dsfr-tile>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__TUILE_MOBILE>', {
  props: {
    size: figma.enum('Taille', { SM: '\n  panelSize="SM"', MD: '' }),
    picto: figma.boolean('Voir Picto', {
      true: `\n  artworkFilePath="assets/artwork/pictograms/system/system.svg"`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
  },
  example: ({ size, picto, disabled }) =>
    html`<dsfr-tile
  heading="Nom du fichier"
  [download]="true"
  link="/assets/fichier.pdf"
  downloadMimeType="application/pdf"
  [downloadSizeBytes]="518000"${size}${picto}${disabled}></dsfr-tile>`,
  imports,
});
