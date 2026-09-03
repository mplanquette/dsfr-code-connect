import figma, { html } from '@figma/code-connect/html';

// Liens d'évitement DSFR : 1 set. Thème et Support = CSS seul → snippet unique.
// Le composant n'est visible qu'à la prise de focus clavier (RGAA 12.7).
// DsfrSkipLinks attend `links: { id, text }[]` (pas `anchor`/`label` comme côté ngx-dsfr).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=509-157', {
  example: () =>
    html`<DsfrSkipLinks
    :links="[
      { id: 'contenu', text: 'Contenu' },
      { id: 'menu', text: 'Menu' },
      { id: 'footer', text: 'Pied de page' }
    ]"
  />`,
  imports: ["import DsfrSkipLinks from '@gouvminint/vue-dsfr/DsfrSkipLinks.vue'"],
});
