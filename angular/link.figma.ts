import figma, { html } from '@figma/code-connect/html';

// Lien DSFR : 1 set. Les trois composants « _🚫Éléments - Base » sont des atomes
// internes Figma → non connectés. Thème = CSS seul.
// Survol, Cliqué et Focus = pseudo-états → seul « Désactivé » modifie le markup.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-arrow-right-line.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=120-4789', {
  props: {
    size: figma.enum('Taille', { SM: ' linkSize="SM"', MD: '', LG: ' linkSize="LG"' }),
    icon: figma.enum('Icône', {
      Sans: '',
      Gauche: ' icon="fr-icon-arrow-right-line" iconPosition="left"',
      Droite: ' icon="fr-icon-arrow-right-line" iconPosition="right"',
    }),
    disabled: figma.enum('État', {
      Défaut: '', Survol: '', Cliqué: '', Focus: '', Désactivé: ' [disabled]="true"',
    }),
  },
  example: ({ size, icon, disabled }) =>
    html`<dsfr-link link="/page" label="Libellé du lien"${size}${icon}${disabled}></dsfr-link>`,
  imports: ["import { DsfrLinkComponent } from '@edugouvfr/ngx-dsfr'"],
});
