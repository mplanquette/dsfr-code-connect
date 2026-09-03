import figma, { html } from '@figma/code-connect/html';

// Champ de saisie DSFR : 4 sets (Item, Groupe, Section, champ simple).
// « Éléments - Champ de saisie » est le champ complet (icône, bascule zone de texte) ;
// « Champ de saisie » est la variante simple sans ces options. Les composants
// « Éléments / Label », « Éléments / Légende », « Éléments / Message de formulaire »
// et « Éléments / Titre de section » sont des atomes internes → non connectés.
// Focus = pseudo-état → ignoré. « Rempli » ne porte pas de sévérité de message.

// ─── Éléments - Champ de saisie (Item complet) ───────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14819-199027', {
  props: {
    stateClass: figma.enum('État', {
      Défaut: '', Rempli: '',
      Erreur: ' fr-input-group--error',
      Valide: ' fr-input-group--valid',
    }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    icon: figma.boolean('Icône', { true: ' fr-input-wrap fr-icon-search-line', false: '' }),
    message: figma.enum('État', {
      Défaut: '', Rempli: '',
      Erreur: `\n  <p class="fr-message fr-message--error" id="input-messages">Texte d'erreur</p>`,
      Valide: `\n  <p class="fr-message fr-message--valid" id="input-messages">Texte de validation</p>`,
    }),
    field: figma.boolean('Texte Area', {
      true: `<textarea class="fr-input" id="input" name="input" rows="4"></textarea>`,
      false: `<input class="fr-input" type="text" id="input" name="input" />`,
    }),
  },
  example: ({ stateClass, disabled, icon, message, field }) =>
    html`<div class="fr-input-group${stateClass}">
  <label class="fr-label" for="input">Libellé du champ</label>
  <div class="${icon}">
    ${field}
  </div>
  <div class="fr-messages-group" id="input-messages-group" aria-live="polite">${message}
  </div>
</div>`,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14820-199166', {
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
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14823-199333', {
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

// ─── Champ de saisie (simple) ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=14819-199148', {
  props: {
    stateClass: figma.enum('État', {
      Défaut: '', Rempli: '',
      Erreur: ' fr-input-group--error',
      Valide: ' fr-input-group--valid',
    }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    message: figma.enum('État', {
      Défaut: '', Rempli: '',
      Erreur: `\n  <p class="fr-message fr-message--error" id="input-messages">Texte d'erreur</p>`,
      Valide: `\n  <p class="fr-message fr-message--valid" id="input-messages">Texte de validation</p>`,
    }),
  },
  example: ({ stateClass, disabled, message }) =>
    html`<div class="fr-input-group${stateClass}">
  <label class="fr-label" for="input">Libellé du champ</label>
  <input class="fr-input" type="text" id="input" name="input"${disabled} />
  <div class="fr-messages-group" id="input-messages-group" aria-live="polite">${message}
  </div>
</div>`,
});
