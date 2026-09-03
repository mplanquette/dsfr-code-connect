import figma, { html } from '@figma/code-connect/html';

// Ajout de fichier DSFR : 1 set. Thème = CSS seul.
// DsfrFileUpload : `error` porte le message d'erreur (pas de `messageSeverity` unique),
// `validMessage` existe côté type mais n'a pas d'équivalent Figma testé ici.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=10366-72136', {
  props: {
    disabled: figma.enum('État', { Défaut: '', Erreur: '', Désactivé: ' disabled' }),
    error: figma.enum('État', {
      Défaut: '', Désactivé: '',
      Erreur: ` error="Texte d'erreur"`,
    }),
  },
  example: ({ disabled, error }) =>
    html`<DsfrFileUpload label="Ajouter un fichier" hint="Taille maximale : 5 Mo. Formats supportés : jpg, png, pdf."${disabled}${error} />`,
  imports: ["import DsfrFileUpload from '@gouvminint/vue-dsfr/DsfrFileUpload.vue'"],
});
