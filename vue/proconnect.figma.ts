import figma, { html } from '@figma/code-connect/html';

// Bouton ProConnect DSFR : nouveau en 1.15.0. 1 set utile. Les composants
// « _🚫Éléments » sont des atomes internes → non connectés. Thème = CSS seul
// (variante interne). Focus, Survol, Cliqué, Désactivé = pseudo-états → ignorés.
// Pas de composant dédié dans vue-dsfr (vérifié : 404 sur
// `src/components/DsfrProConnect/DsfrProConnect.vue` et aucune entrée « ProConnect »
// dans l'arborescence du dépôt `dnum-mi/vue-dsfr`, comme côté `html/`) : markup DSFR
// brut posé directement dans le template, sur le modèle de `DsfrFranceConnect` qu'il
// remplace progressivement. À remplacer par un composant Vue si/quand vue-dsfr en publie un.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=34014-794', {
  example: () =>
    html`<div class="fr-connect-group">
  <button type="button" class="fr-connect fr-connect--proconnect">
    <span class="fr-connect__login">S'identifier avec</span>
    <span class="fr-connect__brand">ProConnect</span>
  </button>
  <p>
    <a href="https://www.proconnect.gouv.fr/" target="_blank" rel="noopener">Qu'est-ce que ProConnect ?</a>
  </p>
</div>`,
});
