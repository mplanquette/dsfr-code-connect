// Citation DSFR : 1 set. Les deux composants « _🚫Éléments - Base » sont des atomes internes
// Figma → non connectés. Thème et Support = CSS seul.
// L'image d'illustration est décorative : son alt doit rester vide (RGAA 1.2).
// React : `Quote` n'a pas de tableau de détails structuré comme `[details]` côté ngx-dsfr :
// `source` est un simple `ReactNode` (le composant l'enveloppe déjà dans un
// `<ul class="fr-quote__source">`). Simplification : `source` reçoit ici une chaîne, à remplacer
// par le JSX voulu (plusieurs `<li>`) si un détail multi-lignes est nécessaire. `imageUrl`
// remplace `imagePath`/`imageAlt`, l'alt vide est géré nativement par le composant.
// Vue : `DsfrQuote` a des props différentes d'Angular : pas de `[details]` en `{ text, isTitle }`,
// mais `source`/`source-url` (la référence citée, en <cite>) + `details` en `{ label, url }[]`
// (liens complémentaires). La propriété Figma « Détail » (booléen) est donc mappée sur `source` +
// `details` ensemble. `DsfrQuote` ne pose pas d'`alt` (géré nativement, vide).
import figma from 'figma'
import { readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance

const hasImage = readVariantFlag(instance, 'Illustration')
const hasAuthor = readVariantFlag(instance, 'Auteur')
const hasDetails = readVariantFlag(instance, 'Détail')

const rendered = renderFor(figma.batch.stack, {
  angular: () => {
    const image = hasImage ? `\n  imagePath="assets/img/illustration.jpg"\n  imageAlt=""` : ''
    const author = hasAuthor ? `\n  author="Prénom Nom"` : ''
    const details = hasDetails
      ? `\n  [details]="[
    { text: 'Titre de l\\'ouvrage', isTitle: true },
    { text: 'Éditeur, 2026' }
  ]"`
      : ''
    return {
      imports: ["import { DsfrQuoteComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-quote
  text="Texte de la citation."${author}${details}${image}></dsfr-quote>`,
    }
  },
  html: () => {
    const image = hasImage
      ? `\n    <div class="fr-quote__image">\n      <img src="assets/img/illustration.jpg" class="fr-responsive-img" alt="" />\n    </div>`
      : ''
    const author = hasAuthor ? `\n    <p class="fr-quote__author">Prénom Nom</p>` : ''
    const details = hasDetails
      ? `\n    <ul class="fr-quote__source">\n      <li><cite>Titre de l'ouvrage</cite></li>\n      <li>Éditeur, 2026</li>\n    </ul>`
      : ''
    return {
      example: figma.code`<figure class="fr-quote${hasImage ? ' fr-quote--column' : ''}">
  <blockquote>
    <p>Texte de la citation.</p>
  </blockquote>
  <figcaption>${author}${details}${image}
  </figcaption>
</figure>`,
    }
  },
  react: () => ({
    imports: ["import { Quote } from '@codegouvfr/react-dsfr/Quote'"],
    example: figma.code`<Quote
  text="Texte de la citation."${hasAuthor ? ` author="Prénom Nom"` : ''}${hasDetails ? ` source="Titre de l'ouvrage, Éditeur, 2026"` : ''}${hasImage ? ` imageUrl="assets/img/illustration.jpg"` : ''}
/>`,
  }),
  vue: () => ({
    imports: ["import DsfrQuote from '@gouvminint/vue-dsfr/DsfrQuote.vue'"],
    example: figma.code`<DsfrQuote quote="Texte de la citation."${hasAuthor ? ' author="Prénom Nom"' : ''}${
      hasDetails ? ` source="Titre de l'ouvrage" source-url="#" :details="[{ label: 'Éditeur, 2026', url: '#' }]"` : ''
    }${hasImage ? ' quote-image="assets/img/illustration.jpg"' : ''} />`,
  }),
})

export default {
  id: 'quote',
  ...rendered,
  metadata: { nestable: true },
}
