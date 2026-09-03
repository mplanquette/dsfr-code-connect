import figma, { html } from '@figma/code-connect/html';

// Bandeau d'information importante DSFR : 1 set. Thème et Support = CSS seul.
// « Type » (Bandeau générique / vigilance météo / alerte) est redondant avec
// « Niveau d'alerte », qui porte seul la valeur de `type` → non bindé.
// « Voir le lien » n'est pas bindable : le lien se projette en contenu ([link]).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=11706-73752', {
  props: {
    heading: figma.string('Titre'),
    description: figma.string('Description'),
    showDescription: figma.boolean('Voir description', { true: 'show', false: '' }),
    noIcon: figma.boolean('Voir icône', { true: '', false: ' [noIcon]="true"' }),
    type: figma.enum("Niveau d'alerte", {
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
  example: ({ heading, description, noIcon, type }) =>
    html`<dsfr-notice
  type="${type}"
  heading="${heading}"
  description="${description}"${noIcon}
  [closeable]="true"></dsfr-notice>`,
  imports: ["import { DsfrNoticeComponent } from '@edugouvfr/ngx-dsfr'"],
});
