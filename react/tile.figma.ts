import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement :
//   - Orientation → orientation="horizontal" (rien = vertical, défaut)
//   - Taille      → small (rien = medium, défaut)
//   - Voir Picto  → pictogram (ReactNode, pas une URL, icône concrète non dérivable du
//                   design, placeholder sur le modèle du pictogramme « système »)
//   - Désactivé   → disabled
// Tuile DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, Desktop et Mobile ne
// diffèrent que par Focus et le nombre d'états pseudo-CSS (Survol absent au tactile) :
// même snippet. Les composants préfixés « ⚙️ » (Contenu, Corps, Zone de précision,
// Zone d'action) sont des atomes internes → non connectés. Thème sombre = CSS seul.
// Focus, Survol, Cliqué = pseudo-états → ignorés.
// « Hauteur fixe » n'a pas d'équivalent input dans `TileProps` → non bindé.
// « Cliquable = False » retire le lien, non représentable en une seule input → non
// bindé, le lien reste présent (comportement par défaut le plus courant).

const imports = ["import { Tile } from '@codegouvfr/react-dsfr/Tile'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19187-356872', {
  props: {
    horizontal: figma.enum('Orientation', { Horizontale: '\n  orientation="horizontal"', Verticale: '' }),
    small: figma.enum('Taille', { SM: '\n  small', MD: '' }),
    picto: figma.boolean('Voir Picto', {
      true: `\n  pictogram={<img src="/artwork/pictograms/system/system.svg" alt="" />}`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  disabled', false: '' }),
  },
  example: ({ horizontal, small, picto, disabled }) =>
    html`<Tile
  title="Titre de la tuile"
  desc="Description de la tuile."
  linkProps={{ to: '/page' }}${horizontal}${small}${picto}${disabled}
/>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19547-360323', {
  props: {
    horizontal: figma.enum('Orientation', { Horizontale: '\n  orientation="horizontal"', Verticale: '' }),
    small: figma.enum('Taille', { SM: '\n  small', MD: '' }),
    picto: figma.boolean('Voir Picto', {
      true: `\n  pictogram={<img src="/artwork/pictograms/system/system.svg" alt="" />}`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  disabled', false: '' }),
  },
  example: ({ horizontal, small, picto, disabled }) =>
    html`<Tile
  title="Titre de la tuile"
  desc="Description de la tuile."
  linkProps={{ to: '/page' }}${horizontal}${small}${picto}${disabled}
/>`,
  imports,
});
