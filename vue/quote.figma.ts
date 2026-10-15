import figma, { html } from '@figma/code-connect/html';

// Citation DSFR : 1 set. Les deux composants « _🚫Éléments - Base » sont des atomes internes
// Figma → non connectés. Thème et Support = CSS seul.
// `DsfrQuote` a une forme de props différente d'Angular : pas de `[details]` en `{ text, isTitle }`,
// mais `source`/`source-url` (la référence citée, en <cite>) + `details` en `{ label, url }[]`
// (liens complémentaires). Le prop Figma « Détail » (booléen) est donc mappé sur `source` +
// `details` ensemble plutôt que sur `details` seul.
// L'image d'illustration est décorative : `DsfrQuote` ne pose pas d'`alt` (géré nativement, vide).

figma.connect('<FIGMA_CITATION__CITATION>', {
  props: {
    image: figma.enum('Illustration', {
      True: ' quote-image="assets/img/illustration.jpg"',
      False: '',
    }),
    author: figma.enum('Auteur', { True: ' author="Prénom Nom"', False: '' }),
    details: figma.enum('Détail', {
      True: ` source="Titre de l'ouvrage" source-url="#" :details="[{ label: 'Éditeur, 2026', url: '#' }]"`,
      False: '',
    }),
  },
  example: ({ image, author, details }) =>
    html`<DsfrQuote quote="Texte de la citation."${author}${details}${image} />`,
  imports: ["import DsfrQuote from '@gouvminint/vue-dsfr/DsfrQuote.vue'"],
});
