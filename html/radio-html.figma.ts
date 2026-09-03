import figma, { html } from '@figma/code-connect/html';

// Bouton radio DSFR : 3 sets utiles (Item, Groupe, Section).
// Les sets « 🚫 / SM » et « 🚫 / MD » sont des atomes internes Figma → non connectés.
// Thème sombre = CSS seul. Focus = pseudo-état → ignoré.

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=311-24508', {
  props: {
    sizeClass: figma.enum('Taille', { SM: ' fr-radio-group--sm', MD: '' }),
    checked: figma.boolean('Coché', { true: ' checked', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    stateClass: figma.enum('Validation', {
      Aucune: '',
      Valide: ' fr-fieldset--valid',
      Erreur: ' fr-fieldset--error',
    }),
  },
  example: ({ sizeClass, checked, disabled, stateClass }) =>
    html`<fieldset class="fr-fieldset${stateClass}" id="radio" aria-labelledby="radio-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="radio-legend">Légende du champ</legend>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group${sizeClass}">
      <input type="radio" id="radio-1" name="radio" value="option-1"${checked}${disabled} />
      <label class="fr-label" for="radio-1">Libellé bouton radio</label>
    </div>
  </div>
</fieldset>`,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=314-25444', {
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
    html`<fieldset class="fr-fieldset${inlineClass}${stateClass}" id="radio-group" aria-labelledby="radio-group-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="radio-group-legend">Légende du groupe</legend>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group">
      <input type="radio" id="radio-1" name="radio-group" value="option-1"${disabled} />
      <label class="fr-label" for="radio-1">Première option</label>
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group">
      <input type="radio" id="radio-2" name="radio-group" value="option-2"${disabled} />
      <label class="fr-label" for="radio-2">Deuxième option</label>
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group">
      <input type="radio" id="radio-3" name="radio-group" value="option-3"${disabled} />
      <label class="fr-label" for="radio-3">Troisième option</label>
    </div>
  </div>
</fieldset>`,
});

// ─── Section ─────────────────────────────────────────────────────────────────
// La propriété Figma est nommée « Tire de section » (coquille côté design, conservée telle quelle).
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14835-206001', {
  props: {
    legend: figma.string('Tire de section'),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
  },
  example: ({ legend, disabled }) =>
    html`<fieldset class="fr-fieldset" id="radio-section" aria-labelledby="radio-section-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="radio-section-legend">${legend}</legend>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group">
      <input type="radio" id="radio-1" name="radio-section" value="option-1"${disabled} />
      <label class="fr-label" for="radio-1">Première option</label>
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group">
      <input type="radio" id="radio-2" name="radio-section" value="option-2"${disabled} />
      <label class="fr-label" for="radio-2">Deuxième option</label>
    </div>
  </div>
</fieldset>`,
});
