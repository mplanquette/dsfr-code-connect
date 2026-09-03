import figma, { html } from '@figma/code-connect/html';

// Contenu médias DSFR : 1 set. Les trois sets « _🚫Éléments » sont des atomes
// internes Figma → non connectés. Thème et Support = CSS seul.
// « Taille média » exprime la largeur en colonnes de la grille : 6 → SM, 8 → MD,
// 10 colonnes 100% → LG.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=84-72', {
  props: {
    size: figma.enum('Taille média', {
      '6 collones': ' contentSize="SM"',
      '8 colonnes': ' contentSize="MD"',
      '10 colonnes 100%': ' contentSize="LG"',
    }),
  },
  example: ({ size }) =>
    html`<dsfr-content
  type="image"
  source="assets/img/media.jpg"
  alternate="Description de l'image"
  ratio="16:9"
  legend="Légende de l'image"${size}></dsfr-content>`,
  imports: ["import { DsfrContentComponent } from '@edugouvfr/ngx-dsfr'"],
});
