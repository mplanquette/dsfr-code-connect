import figma, { html } from '@figma/code-connect/html';

// Citation DSFR : 1 set. Les deux composants « _🚫Éléments - Base » sont des atomes
// internes Figma → non connectés. Thème et Support = CSS seul.
// L'image d'illustration est décorative : son `imageAlt` doit rester vide (RGAA 1.2).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=3539-147529', {
  props: {
    image: figma.enum('Illustration', {
      True: `\n  imagePath="assets/img/illustration.jpg"\n  imageAlt=""`,
      False: '',
    }),
    author: figma.enum('Auteur', { True: `\n  author="Prénom Nom"`, False: '' }),
    details: figma.enum('Détail', {
      True: `\n  [details]="[
    { text: 'Titre de l\\'ouvrage', isTitle: true },
    { text: 'Éditeur, 2026' }
  ]"`,
      False: '',
    }),
  },
  example: ({ image, author, details }) =>
    html`<dsfr-quote
  text="Texte de la citation."${author}${details}${image}></dsfr-quote>`,
  imports: ["import { DsfrQuoteComponent } from '@edugouvfr/ngx-dsfr'"],
});
