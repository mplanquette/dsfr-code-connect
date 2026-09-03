import figma, { html } from '@figma/code-connect/html';

// Citation DSFR : 1 set. Les deux composants « _🚫Éléments - Base » sont des atomes
// internes Figma → non connectés. Thème et Support = CSS seul.
// react-dsfr `Quote` n'a pas de tableau de détails structuré comme `[details]` côté ngx-dsfr :
// `source` est un simple `ReactNode` (le composant l'enveloppe déjà dans un `<ul class="fr-quote__source">`).
// Simplification : `source` reçoit ici une chaîne, à remplacer par le JSX voulu
// (ex. plusieurs `<li>`) si un détail multi-lignes est nécessaire. `imageUrl` remplace
// `imagePath`/`imageAlt`, l'alt vide (RGAA 1.2) est géré nativement par le composant.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=3539-147529', {
  props: {
    image: figma.enum('Illustration', {
      True: ` imageUrl="assets/img/illustration.jpg"`,
      False: '',
    }),
    author: figma.enum('Auteur', { True: ` author="Prénom Nom"`, False: '' }),
    details: figma.enum('Détail', {
      True: ` source="Titre de l'ouvrage, Éditeur, 2026"`,
      False: '',
    }),
  },
  example: ({ image, author, details }) =>
    html`<Quote
  text="Texte de la citation."${author}${details}${image}
/>`,
  imports: ["import { Quote } from '@codegouvfr/react-dsfr/Quote'"],
});
