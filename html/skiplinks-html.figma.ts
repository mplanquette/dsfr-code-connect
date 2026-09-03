import figma, { html } from '@figma/code-connect/html';

// Liens d'évitement DSFR : 1 set. Thème et Support = CSS seul → snippet unique.
// Le composant n'est visible qu'à la prise de focus clavier (RGAA 12.7).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=509-157', {
  example: () =>
    html`<div class="fr-skiplinks">
  <nav class="fr-container" role="navigation" aria-label="Accès rapide">
    <ul class="fr-skiplinks__list">
      <li><a class="fr-link" href="#contenu">Contenu</a></li>
      <li><a class="fr-link" href="#menu">Menu</a></li>
      <li><a class="fr-link" href="#footer">Pied de page</a></li>
    </ul>
  </nav>
</div>`,
});
