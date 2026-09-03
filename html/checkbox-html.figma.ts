import figma, { html } from '@figma/code-connect/html';

// Case à cocher DSFR : 3 sets utiles (Item, Groupe, Section).
// Les sets « 🚫 / SM » et « 🚫 / MD » sont des atomes internes Figma → non connectés.
// Thème sombre = CSS seul. Focus = pseudo-état → ignoré.
// « Indéterminée » (ajouté en DSFR 1.15) n'a pas d'attribut HTML : `indeterminate` est
// une propriété JS pure sur l'élément, à positionner en script (`el.indeterminate = true`).

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14795-206250', {
  props: {
    sizeClass: figma.enum('Taille', { SM: ' fr-checkbox-group--sm', MD: '' }),
    stateClass: figma.enum('Validation', {
      Aucune: '',
      Valide: ' fr-checkbox-group--valid',
      Erreur: ' fr-checkbox-group--error',
    }),
    checked: figma.boolean('Coché', { true: ' checked', false: '' }),
    indeterminateComment: figma.boolean('Indéterminée', {
      true: `\n  <script>document.getElementById('checkbox').indeterminate = true;</script>`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    message: figma.enum('Validation', {
      Aucune: '',
      Valide: `\n    <p class="fr-message fr-message--valid" id="checkbox-messages">Texte de validation</p>`,
      Erreur: `\n    <p class="fr-message fr-message--error" id="checkbox-messages">Texte d'erreur</p>`,
    }),
  },
  example: ({ sizeClass, stateClass, checked, indeterminateComment, disabled, message }) =>
    html`<div class="fr-checkbox-group${sizeClass}${stateClass}">
  <input type="checkbox" id="checkbox" name="checkbox"${checked}${disabled} />
  <label class="fr-label" for="checkbox">Libellé case à cocher</label>
  <div class="fr-messages-group" id="checkbox-messages-group" aria-live="polite">${message}
  </div>
</div>${indeterminateComment}`,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=338-984', {
  props: {
    inlineClass: figma.enum('Orientation', { Horizontal: ' fr-fieldset--inline', Vertical: '' }),
    stateClass: figma.enum('État', {
      Défaut: '',
      Valide: ' fr-fieldset--valid',
      Erreur: ' fr-fieldset--error',
    }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
  },
  example: ({ inlineClass, stateClass, disabled }) =>
    html`<fieldset class="fr-fieldset${inlineClass}${stateClass}" id="checkbox-group" aria-labelledby="checkbox-group-legend"${disabled}>
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="checkbox-group-legend">Légende du groupe</legend>
  <div class="fr-fieldset__element">
    <div class="fr-checkbox-group">
      <input type="checkbox" id="checkbox-1" name="checkbox-group"${disabled} />
      <label class="fr-label" for="checkbox-1">Première option</label>
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-checkbox-group">
      <input type="checkbox" id="checkbox-2" name="checkbox-group"${disabled} />
      <label class="fr-label" for="checkbox-2">Deuxième option</label>
    </div>
  </div>
</fieldset>`,
});

// ─── Section ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14837-211503', {
  props: {
    legend: figma.string('Titre de section'),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
  },
  example: ({ legend, disabled }) =>
    html`<fieldset class="fr-fieldset" id="checkbox-section" aria-labelledby="checkbox-section-legend"${disabled}>
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="checkbox-section-legend">${legend}</legend>
  <div class="fr-fieldset__element">
    <div class="fr-checkbox-group">
      <input type="checkbox" id="checkbox-1" name="checkbox-section"${disabled} />
      <label class="fr-label" for="checkbox-1">Première option</label>
    </div>
  </div>
</fieldset>`,
});
