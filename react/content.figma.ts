import figma, { html } from '@figma/code-connect/html';

// Contenu médias : aucun composant react-dsfr dédié (pas de `Content.tsx`) → markup DSFR
// brut porté en JSX (`class` → `className`), sur le modèle du fragment déjà utilisé côté
// html/content-html.figma.ts. 1 set. Les trois sets « _🚫Éléments » sont des atomes
// internes Figma → non connectés. Thème et Support = CSS seul.
// « Taille média » exprime la largeur en colonnes de la grille : 6 → --sm, 8 → défaut
// (aucune classe), 10 → --lg. Image décorative puisque la légende décrit déjà le contenu :
// alt vide (RGAA 1.2).

figma.connect('<FIGMA_CONTENU_MEDIAS__CONTENU_MEDIAS>', {
  props: {
    sizeClass: figma.enum('Taille média', {
      '6 collones': ' fr-content-media--sm',
      '8 colonnes': '',
      '10 colonnes 100%': ' fr-content-media--lg',
    }),
  },
  example: ({ sizeClass }) =>
    html`<figure className="fr-content-media${sizeClass}" role="group" aria-label="Légende de l'image">
  <div className="fr-content-media__img">
    <img className="fr-responsive-img fr-ratio-16x9" src="assets/img/media.jpg" alt="" />
  </div>
  <figcaption className="fr-content-media__caption">Légende de l'image</figcaption>
</figure>`,
});
