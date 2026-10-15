import figma, { html } from '@figma/code-connect/html';

// Ajout de fichier DSFR : 1 set. Thème = CSS seul.

figma.connect('<FIGMA_AJOUT_DE_FICHIER__AJOUT_DE_FICHIER>', {
  props: {
    stateClass: figma.enum('État', {
      Défaut: '', Désactivé: ' fr-upload-group--disabled', Erreur: ' fr-upload-group--error',
    }),
    disabled: figma.enum('État', { Défaut: '', Erreur: '', Désactivé: ' disabled' }),
    error: figma.enum('État', {
      Défaut: '', Désactivé: '',
      Erreur: `\n  <p class="fr-error-text" id="upload-messages">Texte d'erreur</p>`,
    }),
  },
  example: ({ stateClass, disabled, error }) =>
    html`<div class="fr-upload-group${stateClass}">
  <label class="fr-label" for="upload">
    Ajouter un fichier
    <span class="fr-hint-text">Taille maximale : 5 Mo. Formats supportés : jpg, png, pdf.</span>
  </label>
  <input class="fr-upload" type="file" id="upload" name="upload"${disabled} />${error}
</div>`,
});
