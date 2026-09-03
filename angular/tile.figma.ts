import figma, { html } from '@figma/code-connect/html';

// Tuile DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, Desktop et Mobile ne
// diffèrent que par Focus et le nombre d'états pseudo-CSS (Survol absent au tactile) :
// même snippet. Les composants préfixés « ⚙️ » (Contenu, Corps, Zone de précision,
// Zone d'action) sont des atomes internes → non connectés. Thème sombre = CSS seul.
// Focus, Survol, Cliqué = pseudo-états → ignorés.
// « Hauteur fixe » n'a pas d'équivalent input dans `dsfr-tile` → non bindé.
// « Cliquable = False » retire le lien, non représentable en une seule input → non
// bindé, le lien reste présent (comportement par défaut le plus courant).

const imports = ["import { DsfrTileComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19187-356872', {
  props: {
    horizontal: figma.enum('Orientation', { Horizontale: '\n  [horizontal]="true"', Verticale: '' }),
    size: figma.enum('Taille', { SM: '\n  panelSize="SM"', MD: '' }),
    picto: figma.boolean('Voir Picto', {
      true: `\n  artworkFilePath="assets/artwork/pictograms/system/system.svg"`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
  },
  example: ({ horizontal, size, picto, disabled }) =>
    html`<dsfr-tile
  heading="Titre de la tuile"
  description="Description de la tuile."
  link="/page"${horizontal}${size}${picto}${disabled}></dsfr-tile>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19547-360323', {
  props: {
    horizontal: figma.enum('Orientation', { Horizontale: '\n  [horizontal]="true"', Verticale: '' }),
    size: figma.enum('Taille', { SM: '\n  panelSize="SM"', MD: '' }),
    picto: figma.boolean('Voir Picto', {
      true: `\n  artworkFilePath="assets/artwork/pictograms/system/system.svg"`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
  },
  example: ({ horizontal, size, picto, disabled }) =>
    html`<dsfr-tile
  heading="Titre de la tuile"
  description="Description de la tuile."
  link="/page"${horizontal}${size}${picto}${disabled}></dsfr-tile>`,
  imports,
});
