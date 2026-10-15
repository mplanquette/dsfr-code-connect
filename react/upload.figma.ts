import figma, { html } from '@figma/code-connect/html';

// Ajout de fichier DSFR : 1 set, même mapping que angular/upload.figma.ts et
// html/upload-html.figma.ts. Thème = CSS seul.

figma.connect('<FIGMA_AJOUT_DE_FICHIER__AJOUT_DE_FICHIER>', {
  props: {
    disabled: figma.enum('État', { Défaut: '', Erreur: '', Désactivé: ' disabled' }),
    error: figma.enum('État', {
      Défaut: '', Désactivé: '',
      Erreur: ` state="error" stateRelatedMessage="Texte d'erreur"`,
    }),
  },
  example: ({ disabled, error }) =>
    html`<Upload label="Ajouter un fichier" hint="Taille maximale : 5 Mo. Formats supportés : jpg, png, pdf."${disabled}${error} />`,
  imports: ["import { Upload } from '@codegouvfr/react-dsfr/Upload'"],
});
