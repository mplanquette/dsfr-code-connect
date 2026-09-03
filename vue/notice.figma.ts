import figma, { html } from '@figma/code-connect/html';

// Bandeau d'information importante DSFR : 1 set. Thème et Support = CSS seul.
// « Type » est redondant avec « Niveau d'alerte », qui porte seul la valeur de `type`.
// « Voir le lien » n'est pas bindable : le lien s'ajoute via le slot par défaut.
// Fermeture : DsfrNotice affiche toujours un bouton de fermeture (`closeable` non lié à un
// booléen Figma, comme côté Angular/HTML) → toujours présent dans le snippet.
// « Voir icône » n'a pas de prop dédiée sur DsfrNotice : la classe `fr-notice--no-icon` se
// passe par le fallthrough de `class` (racine à nœud unique), comme le fait Vue nativement.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=11706-73752', {
  props: {
    heading: figma.string('Titre'),
    description: figma.string('Description'),
    noIconClass: figma.boolean('Voir icône', { true: '', false: ' class="fr-notice--no-icon"' }),
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
  example: ({ heading, description, noIconClass, type }) =>
    html`<DsfrNotice type="${type}" title="${heading}" desc="${description}" closeable${noIconClass} />`,
  imports: ["import DsfrNotice from '@gouvminint/vue-dsfr/DsfrNotice.vue'"],
});
