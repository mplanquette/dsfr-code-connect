import figma, { html } from '@figma/code-connect/html';

// Bandeau d'information importante DSFR : 1 set. Thème et Support = CSS seul.
// « Type » est redondant avec « Niveau d'alerte », qui porte seule la valeur de `severity`.
// « Voir description » n'est pas bindée (déjà non exploitée côté Angular/HTML : la prop y est
// déclarée mais jamais interpolée dans le template) : la description reste toujours affichée.
// « Fermeture » n'est pas une propriété Figma sur ce node : le bandeau DSFR est toujours
// fermable, `isClosable` est donc posé en dur (comme `[closeable]="true"` côté Angular et le
// bouton de fermeture systématique côté HTML).
// Piège react-dsfr : pour les sévérités « Vigilance / Appel à témoins / Alerte technologique /
// Alerte attentat », le type `MandatoryIcon` interdit `iconDisplayed={false}` (icône obligatoire) ;
// `iconDisplayed={false}` n'est valable que pour info/alert/warning, non vérifiable dans ce
// snippet texte, à corriger par le dev si besoin.

figma.connect('<FIGMA_BANDEAUX_D_INFORMATIONS_IMPORTANTES__BANDEAUX_D_INFORMATIONS_IMPORTANTES>', {
  props: {
    title: figma.string('Titre'),
    description: figma.string('Description'),
    noIcon: figma.boolean('Voir icône', { true: '', false: ' iconDisplayed={false}' }),
    severity: figma.enum("Niveau d'alerte", {
      Information: 'info',
      Alerte: 'alert',
      Avertissement: 'warning',
      'Vigilance orange': 'weather-orange',
      'Vigilance rouge': 'weather-red',
      'Vigilance violette': 'weather-purple',
      'Appel à témoins': 'witness',
      'Alerte technologique': 'cyberattack',
      'Alerte attentat': 'attack',
    }),
  },
  example: ({ title, description, noIcon, severity }) =>
    html`<Notice
  severity="${severity}"
  title="${title}"
  description="${description}"${noIcon}
  isClosable
  onClose={() => {}}
/>`,
  imports: ["import { Notice } from '@codegouvfr/react-dsfr/Notice'"],
});
