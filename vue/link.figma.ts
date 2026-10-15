import figma, { html } from '@figma/code-connect/html';

// Lien DSFR : 1 set. Pas de composant `DsfrLink` dédié dans @gouvminint/vue-dsfr
// (vérifié : github.com/dnum-mi/vue-dsfr/src/components/DsfrLink → 404) → markup DSFR brut,
// la syntaxe Vue étant proche du HTML classique (voir html/link-html.figma.ts).
// Les trois composants « _🚫Éléments - Base » sont des atomes internes Figma → non connectés.
// Thème = CSS seul. Survol, Cliqué et Focus = pseudo-états → seul « Désactivé » modifie le markup.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-arrow-right-line.

figma.connect('<FIGMA_LIEN__LIEN>', {
  props: {
    sizeClass: figma.enum('Taille', { SM: ' fr-link--sm', MD: '', LG: ' fr-link--lg' }),
    iconClass: figma.enum('Icône', {
      Sans: '',
      Gauche: ' fr-icon-arrow-right-line fr-link--icon-left',
      Droite: ' fr-icon-arrow-right-line fr-link--icon-right',
    }),
    disabled: figma.enum('État', {
      Défaut: '', Survol: '', Cliqué: '', Focus: '', Désactivé: ' aria-disabled="true"',
    }),
  },
  example: ({ sizeClass, iconClass, disabled }) =>
    html`<a class="fr-link${sizeClass}${iconClass}" href="/page"${disabled}>Libellé du lien</a>`,
});
