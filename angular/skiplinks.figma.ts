import figma, { html } from '@figma/code-connect/html';

// Liens d'évitement DSFR : 1 set. Thème et Support = CSS seul → snippet unique.
// Le composant n'est visible qu'à la prise de focus clavier (RGAA 12.7).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=509-157', {
  example: () =>
    html`<dsfr-skiplinks
  [links]="[
    { label: 'Contenu', anchor: 'contenu' },
    { label: 'Menu', anchor: 'menu' },
    { label: 'Pied de page', anchor: 'footer' }
  ]"></dsfr-skiplinks>`,
  imports: ["import { DsfrSkipLinksComponent } from '@edugouvfr/ngx-dsfr'"],
});
