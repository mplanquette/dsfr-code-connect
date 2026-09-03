import figma, { html } from '@figma/code-connect/html';

// Ajout de fichier DSFR : 1 set. Thème = CSS seul.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=10366-72136', {
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
