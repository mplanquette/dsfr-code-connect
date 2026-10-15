import figma, { html } from '@figma/code-connect/html';

// Mise en avant DSFR : 1 set. Les deux composants « _🚫Éléments - Base » sont des
// atomes internes Figma → non connectés. Thème et Support = CSS seul.
// La description et le bouton éventuel se projettent en contenu (ng-content).
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-information-line.

figma.connect('<FIGMA_MISE_EN_AVANT__MISE_EN_AVANT>', {
  props: {
    icon: figma.enum('Icône', { True: ' icon="fr-icon-information-line"', False: '' }),
    button: figma.enum('Bouton', {
      True: `\n  <dsfr-button label="Libellé du bouton"></dsfr-button>`,
      False: '',
    }),
  },
  example: ({ icon, button }) =>
    html`<dsfr-callout heading="Titre de la mise en avant"${icon}>
  Texte de la mise en avant.${button}
</dsfr-callout>`,
  imports: ["import { DsfrCalloutComponent, DsfrButtonComponent } from '@edugouvfr/ngx-dsfr'"],
});
