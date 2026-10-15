import figma, { html } from '@figma/code-connect/html';

// Ajout de fichier DSFR : 1 set. Thème = CSS seul.

figma.connect('<FIGMA_AJOUT_DE_FICHIER__AJOUT_DE_FICHIER>', {
  props: {
    disabled: figma.enum('État', { Défaut: '', Erreur: '', Désactivé: ' [disabled]="true"' }),
    error: figma.enum('État', {
      Défaut: '', Désactivé: '',
      Erreur: ` error="Texte d'erreur"`,
    }),
  },
  example: ({ disabled, error }) =>
    html`<dsfr-form-upload label="Ajouter un fichier" hint="Taille maximale : 5 Mo. Formats supportés : jpg, png, pdf."${disabled}${error}></dsfr-form-upload>`,
  imports: ["import { DsfrUploadComponent } from '@edugouvfr/ngx-dsfr'"],
});
