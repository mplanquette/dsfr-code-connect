// Liens d'évitement DSFR : 1 set. Thème et Support = CSS seul → snippet unique.
// Le composant n'est visible qu'à la prise de focus clavier (RGAA 12.7).
// React : le tableau `links` est déclaré avant le JSX (le snippet reste lisible).
// Vue : DsfrSkipLinks attend `links: { id, text }[]` (pas `anchor`/`label` comme côté ngx-dsfr).
import figma from 'figma'
import { renderFor } from '../_shared/stack'

const rendered = renderFor(figma.batch.stack, {
  angular: () => ({
    imports: ["import { DsfrSkipLinksComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-skiplinks
  [links]="[
    { label: 'Contenu', anchor: 'contenu' },
    { label: 'Menu', anchor: 'menu' },
    { label: 'Pied de page', anchor: 'footer' }
  ]"></dsfr-skiplinks>`,
  }),
  html: () => ({
    example: figma.code`<div class="fr-skiplinks">
  <nav class="fr-container" role="navigation" aria-label="Accès rapide">
    <ul class="fr-skiplinks__list">
      <li><a class="fr-link" href="#contenu">Contenu</a></li>
      <li><a class="fr-link" href="#menu">Menu</a></li>
      <li><a class="fr-link" href="#footer">Pied de page</a></li>
    </ul>
  </nav>
</div>`,
  }),
  react: () => ({
    imports: ["import { SkipLinks } from '@codegouvfr/react-dsfr/SkipLinks'"],
    example: figma.code`const links = [
  { label: 'Contenu', anchor: '#contenu' },
  { label: 'Menu', anchor: '#menu' },
  { label: 'Pied de page', anchor: '#footer' }
];

<SkipLinks links={links} />`,
  }),
  vue: () => ({
    imports: ["import DsfrSkipLinks from '@gouvminint/vue-dsfr/DsfrSkipLinks.vue'"],
    example: figma.code`<DsfrSkipLinks
    :links="[
      { id: 'contenu', text: 'Contenu' },
      { id: 'menu', text: 'Menu' },
      { id: 'footer', text: 'Pied de page' }
    ]"
  />`,
  }),
})

export default {
  id: 'skiplinks',
  ...rendered,
  metadata: { nestable: true },
}
