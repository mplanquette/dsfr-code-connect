import figma, { html } from '@figma/code-connect/html';

// Liste déroulante DSFR : 1 set. Thème sombre = CSS seul.
// « État » porte la sévérité du message, « Désactivé » porte l'attribut disabled.

figma.connect('<FIGMA_LISTE_DEROULANTE__LISTE_DEROULANTE>', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    stateClass: figma.enum('État', {
      Défaut: '',
      Succès: ' fr-select-group--valid',
      Erreur: ' fr-select-group--error',
      Désactivé: ' fr-select-group--disabled',
    }),
    message: figma.enum('État', {
      Défaut: '',
      Succès: `\n    <p class="fr-message fr-message--valid" id="select-message">Texte de validation</p>`,
      Erreur: `\n    <p class="fr-message fr-message--error" id="select-message">Texte d'erreur</p>`,
      Désactivé: '',
    }),
  },
  example: ({ disabled, stateClass, message }) =>
    html`<div class="fr-select-group${stateClass}">
  <label class="fr-label" for="select">Libellé de la liste déroulante</label>
  <select class="fr-select" id="select" name="select"${disabled}>
    <option value="" selected disabled hidden>Sélectionner une option</option>
    <option value="option-1">Première option</option>
    <option value="option-2">Deuxième option</option>
    <option value="option-3">Troisième option</option>
  </select>
  <div class="fr-messages-group" id="select-messages" aria-live="polite">${message}
  </div>
</div>`,
});
