import figma, { html } from '@figma/code-connect/html';

// Ajout de fichier DSFR : 1 set. Thème = CSS seul.
// DsfrFileUpload : `error` porte le message d'erreur (pas de `messageSeverity` unique),
// `validMessage` existe côté type mais n'a pas d'équivalent Figma testé ici.

figma.connect('<FIGMA_AJOUT_DE_FICHIER__AJOUT_DE_FICHIER>', {
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
