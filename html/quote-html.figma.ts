import figma, { html } from '@figma/code-connect/html';

// Citation DSFR : 1 set. Les deux composants « _🚫Éléments - Base » sont des atomes
// internes Figma → non connectés. Thème et Support = CSS seul.
// L'image d'illustration est décorative : son alt doit rester vide (RGAA 1.2).

figma.connect('<FIGMA_CITATION__CITATION>', {
  props: {
    columnClass: figma.enum('Illustration', { True: ' fr-quote--column', False: '' }),
    image: figma.enum('Illustration', {
      True: `\n    <div class="fr-quote__image">\n      <img src="assets/img/illustration.jpg" class="fr-responsive-img" alt="" />\n    </div>`,
      False: '',
    }),
    author: figma.enum('Auteur', {
      True: `\n    <p class="fr-quote__author">Prénom Nom</p>`,
      False: '',
    }),
    details: figma.enum('Détail', {
      True: `\n    <ul class="fr-quote__source">\n      <li><cite>Titre de l'ouvrage</cite></li>\n      <li>Éditeur, 2026</li>\n    </ul>`,
      False: '',
    }),
  },
  example: ({ columnClass, image, author, details }) =>
    html`<figure class="fr-quote${columnClass}">
  <blockquote>
    <p>Texte de la citation.</p>
  </blockquote>
  <figcaption>${author}${details}${image}
  </figcaption>
</figure>`,
});
