import figma, { html } from '@figma/code-connect/html';

// Mise en avant DSFR : 1 set. Les deux composants « _🚫Éléments - Base » sont des atomes
// internes Figma → non connectés. Thème et Support = CSS seul.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-information-line.
// Contrairement à Angular/HTML (bouton projeté en contenu du composant), react-dsfr pose le
// bouton via la prop `buttonProps` (type `ButtonProps`) : pas de children dédié pour le bouton.

const props = {
  icon: figma.enum('Icône', { True: ' iconId="fr-icon-information-line"', False: '' }),
  button: figma.enum('Bouton', {
    True: " buttonProps={{ children: 'Libellé du bouton', onClick: () => {} }}",
    False: '',
  }),
};
const imports = ["import { CallOut } from '@codegouvfr/react-dsfr/CallOut'"];

figma.connect('<FIGMA_MISE_EN_AVANT__MISE_EN_AVANT>', {
  props,
  example: ({ icon, button }) =>
    html`<CallOut title="Titre de la mise en avant"${icon}${button}>
  Texte de la mise en avant.
</CallOut>`,
  imports,
});
