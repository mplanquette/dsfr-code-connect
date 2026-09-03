import figma, { html } from '@figma/code-connect/html';

// Lien DSFR : 1 set. Les trois composants « _🚫Éléments - Base » sont des atomes
// internes Figma → non connectés. Thème = CSS seul.
// Survol, Cliqué et Focus = pseudo-états → seul « Désactivé » modifie le markup.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-arrow-right-line.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=120-4789', {
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
