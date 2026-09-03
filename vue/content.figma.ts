import figma, { html } from '@figma/code-connect/html';

// Contenu médias DSFR : 1 set. Les trois sets « _🚫Éléments » sont des atomes
// internes Figma → non connectés. Thème et Support = CSS seul.
// « Taille média » exprime la largeur en colonnes de la grille : 6 → small, 8 → medium,
// 10 colonnes 100% → large (prop `size` de DsfrPicture, vue-dsfr).
// Variante « image » : composant dédié `DsfrPicture` (vue-dsfr a un composant dédié,
// contrairement à React qui reprend le markup brut).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=84-72', {
  props: {
    size: figma.enum('Taille média', {
      '6 collones': ' size="small"',
      '8 colonnes': ' size="medium"',
      '10 colonnes 100%': ' size="large"',
    }),
  },
  example: ({ size }) =>
    html`<DsfrPicture
  src="assets/img/media.jpg"
  alt="Description de l'image"
  ratio="16x9"
  legend="Légende de l'image"${size}
/>`,
  imports: ["import DsfrPicture from '@gouvminint/vue-dsfr/DsfrPicture.vue'"],
});
