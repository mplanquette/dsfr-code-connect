import figma, { html } from '@figma/code-connect/html';

// Contenu médias DSFR : 1 set. Les trois sets « _🚫Éléments » sont des atomes
// internes Figma → non connectés. Thème et Support = CSS seul.
// « Taille média » exprime la largeur en colonnes : 6 → --sm, 8 → défaut, 10 → --lg.
// L'image est décorative si la légende la décrit déjà : alt vide (RGAA 1.2).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=84-72', {
  props: {
    sizeClass: figma.enum('Taille média', {
      '6 collones': ' fr-content-media--sm',
      '8 colonnes': '',
      '10 colonnes 100%': ' fr-content-media--lg',
    }),
  },
  example: ({ sizeClass }) =>
    html`<figure class="fr-content-media${sizeClass}" role="group" aria-label="Légende de l'image">
  <div class="fr-content-media__img">
    <img class="fr-responsive-img fr-ratio-16x9" src="assets/img/media.jpg" alt="" />
  </div>
  <figcaption class="fr-content-media__caption">Légende de l'image</figcaption>
</figure>`,
});
