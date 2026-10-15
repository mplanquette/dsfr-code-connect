import figma, { html } from '@figma/code-connect/html';

// Mise en avant DSFR : 1 set. Les deux composants « _🚫Éléments - Base » sont des
// atomes internes Figma → non connectés. Thème et Support = CSS seul.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-information-line.
// Contrairement à ngx-dsfr (bouton projeté en contenu), DsfrCallout reçoit le bouton via
// une prop objet `button` (DsfrButtonProps) plutôt qu'un `<DsfrButton>` imbriqué.

figma.connect('<FIGMA_MISE_EN_AVANT__MISE_EN_AVANT>', {
  props: {
    icon: figma.enum('Icône', { True: ' icon="fr-icon-information-line"', False: '' }),
    button: figma.enum('Bouton', {
      True: ` :button="{ label: 'Libellé du bouton' }"`,
      False: '',
    }),
  },
  example: ({ icon, button }) =>
    html`<DsfrCallout title="Titre de la mise en avant" content="Texte de la mise en avant."${icon}${button} />`,
  imports: ["import DsfrCallout from '@gouvminint/vue-dsfr/DsfrCallout.vue'"],
});
