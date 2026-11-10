// Sommaire DSFR : 2 sets (Items, Complet), un seul template (`part` dans summary.json).
// Thème et Support = CSS seul. Survol = pseudo-état → ignoré.
// Items : « Imbriqué » indique une entrée de second niveau, portée par `subEntries` (Angular),
// `subLinks` (React) ou une liste `<ol>` (HTML).
// React : react-dsfr utilise `links: { text, linkProps, subLinks? }[]` (pas `entries`/`anchor`
// comme ngx-dsfr) : les ancres passent par `linkProps.href`. Le tableau `links` est déclaré
// avant le JSX.
// Vue : DsfrSummary n'a pas d'équivalent de `subEntries` : `anchors` est une liste plate
// `{ link, name }[]`. « Imbriqué » n'a donc aucun rendu différent côté vue-dsfr (limitation du
// composant, pas simplification).
import figma from 'figma'
import { readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, part } = figma.batch as { stack: string; part: 'items' | 'complete' }

const nested = part === 'items' ? readVariantFlag(instance, 'Imbriqué') : false

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrSummaryComponent } from '@edugouvfr/ngx-dsfr'"],
    example: part === 'items'
      ? figma.code`<dsfr-summary
  heading="Sommaire"
  [entries]="[
    { label: 'Titre de section', anchor: 'titre-de-section'${nested ? `,
      subEntries: [{ label: 'Sous-titre', anchor: 'sous-titre' }]` : ''} }
  ]"></dsfr-summary>`
      : figma.code`<dsfr-summary
  heading="Sommaire"
  headingLevel="H2"
  [entries]="[
    { label: 'Première section', anchor: 'premiere-section' },
    {
      label: 'Deuxième section',
      anchor: 'deuxieme-section',
      subEntries: [
        { label: 'Sous-section', anchor: 'sous-section' }
      ]
    },
    { label: 'Troisième section', anchor: 'troisieme-section' }
  ]"></dsfr-summary>`,
  }),
  html: () => ({
    example: part === 'items'
      ? figma.code`<li>
  <a class="fr-summary__link" href="#titre-de-section">Titre de section</a>${nested ? `\n  <ol>\n    <li><a class="fr-summary__link" href="#sous-titre">Sous-titre</a></li>\n  </ol>` : ''}
</li>`
      : figma.code`<nav class="fr-summary" role="navigation" aria-labelledby="fr-summary-title">
  <h2 class="fr-summary__title" id="fr-summary-title">Sommaire</h2>
  <ol>
    <li><a class="fr-summary__link" href="#premiere-section">Première section</a></li>
    <li>
      <a class="fr-summary__link" href="#deuxieme-section">Deuxième section</a>
      <ol>
        <li><a class="fr-summary__link" href="#sous-section">Sous-section</a></li>
      </ol>
    </li>
    <li><a class="fr-summary__link" href="#troisieme-section">Troisième section</a></li>
  </ol>
</nav>`,
  }),
  react: () => ({
    imports: ["import { Summary } from '@codegouvfr/react-dsfr/Summary'"],
    example: part === 'items'
      ? figma.code`const links = [
  { text: 'Titre de section', linkProps: { href: '#titre-de-section' }${nested ? `, subLinks: [{ text: 'Sous-titre', linkProps: { href: '#sous-titre' } }]` : ''} }
];

<Summary links={links} />`
      : figma.code`const links = [
  { text: 'Première section', linkProps: { href: '#premiere-section' } },
  {
    text: 'Deuxième section',
    linkProps: { href: '#deuxieme-section' },
    subLinks: [{ text: 'Sous-section', linkProps: { href: '#sous-section' } }]
  },
  { text: 'Troisième section', linkProps: { href: '#troisieme-section' } }
];

<Summary as="h2" links={links} />`,
  }),
  vue: () => ({
    imports: ["import DsfrSummary from '@gouvminint/vue-dsfr/DsfrSummary.vue'"],
    example: part === 'items'
      ? figma.code`<DsfrSummary title="Sommaire" :anchors="[
    { name: 'Titre de section', link: '#titre-de-section' }
  ]" />`
      : figma.code`<DsfrSummary title="Sommaire" :anchors="[
    { name: 'Première section', link: '#premiere-section' },
    { name: 'Deuxième section', link: '#deuxieme-section' },
    { name: 'Troisième section', link: '#troisieme-section' }
  ]" />`,
  }),
})

export default {
  id: `summary-${part}`,
  ...rendered,
  metadata: { nestable: true },
}
