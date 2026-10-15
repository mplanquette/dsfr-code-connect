import figma, { html } from '@figma/code-connect/html';

// Champ de saisie DSFR : sets Groupe et Section. Le champ seul et son élément de saisie ont
// leurs propres templates (input-field.figma.ts, input-element.figma.ts), qui lisent les
// atomes imbriqués (libellé, message). Focus = pseudo-état → ignoré.

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_CHAMP_DE_SAISIE__CHAMP_DE_SAISIE_GROUPE>', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    stateClass: figma.enum('État', {
      Défaut: '', Rempli: '',
      Erreur: ' fr-fieldset--error',
      Valide: ' fr-fieldset--valid',
    }),
  },
  example: ({ disabled, stateClass }) =>
    html`<fieldset class="fr-fieldset${stateClass}" id="input-group" aria-labelledby="input-group-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="input-group-legend">Légende du groupe</legend>
  <div class="fr-fieldset__element">
    <div class="fr-input-group">
      <label class="fr-label" for="input-1">Premier champ</label>
      <input class="fr-input" type="text" id="input-1" name="input-1"${disabled} />
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-input-group">
      <label class="fr-label" for="input-2">Deuxième champ</label>
      <input class="fr-input" type="text" id="input-2" name="input-2"${disabled} />
    </div>
  </div>
</fieldset>`,
});

// ─── Section ─────────────────────────────────────────────────────────────────
// Propriétés Figma nommées « Tire de section » (coquille, cf. radio.figma.ts) et
// « Disable » (nom resté en anglais) : conservées telles quelles, vérifiées via
// get_design_context sur ce node (node-id=14823-199333).
figma.connect('<FIGMA_CHAMP_DE_SAISIE__CHAMP_DE_SAISIE_SECTION>', {
  props: {
    legend: figma.string('Tire de section'),
    disabled: figma.boolean('Disable', { true: ' disabled', false: '' }),
  },
  example: ({ legend, disabled }) =>
    html`<fieldset class="fr-fieldset" id="input-section" aria-labelledby="input-section-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="input-section-legend">${legend}</legend>
  <div class="fr-fieldset__element">
    <div class="fr-input-group">
      <label class="fr-label" for="input-1">Premier champ</label>
      <input class="fr-input" type="text" id="input-1" name="input-1"${disabled} />
    </div>
  </div>
</fieldset>`,
});
