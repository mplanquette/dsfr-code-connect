import figma, { html } from '@figma/code-connect/html';

// Interrupteur DSFR : 2 sets utiles (Item, Groupe).
// Le set « 🚫 / Interrupteur » est l'atome interne Figma → non connecté.
// Thème sombre = CSS seul.
// « Alignement Gauche » (fr-toggle--label-left) est déprécié depuis DSFR 1.14.1 pour
// raisons d'accessibilité : binding conservé pour refléter le design existant.

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=536-45814', {
  props: {
    label: figma.string('Libellé'),
    positionClass: figma.enum('Alignement', { Gauche: ' fr-toggle--label-left', Droite: '' }),
    stateClass: figma.enum('État', {
      Default: '',
      Valide: ' fr-toggle--valid',
      Erreur: ' fr-toggle--error',
    }),
    checked: figma.boolean('Coché', { true: ' checked', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    status: figma.boolean('Statut', {
      true: ' data-fr-checked-label="Activé" data-fr-unchecked-label="Désactivé"',
      false: '',
    }),
  },
  example: ({ label, positionClass, stateClass, checked, disabled, status }) =>
    html`<div class="fr-toggle${positionClass}${stateClass}">
  <input type="checkbox" class="fr-toggle__input" id="toggle" name="toggle"${checked}${disabled} />
  <label class="fr-toggle__label" for="toggle"${status}>${label}</label>
  <div class="fr-messages-group" id="toggle-messages" aria-live="polite"></div>
</div>`,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=536-47172', {
  props: {
    positionClass: figma.enum('Alignement', { Gauche: ' fr-toggle--label-left', Droite: '' }),
    stateClass: figma.enum('État', {
      Default: '',
      Valide: ' fr-fieldset--valid',
      Erreur: ' fr-fieldset--error',
    }),
  },
  example: ({ positionClass, stateClass }) =>
    html`<fieldset class="fr-fieldset${stateClass}" id="toggle-group" aria-labelledby="toggle-group-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="toggle-group-legend">Légende du groupe</legend>
  <div class="fr-fieldset__element">
    <ul class="fr-toggle__list">
      <li>
        <div class="fr-toggle${positionClass} fr-toggle--border-bottom">
          <input type="checkbox" class="fr-toggle__input" id="toggle-1" />
          <label class="fr-toggle__label" for="toggle-1" data-fr-checked-label="Activé" data-fr-unchecked-label="Désactivé">Première option</label>
        </div>
      </li>
      <li>
        <div class="fr-toggle${positionClass} fr-toggle--border-bottom">
          <input type="checkbox" class="fr-toggle__input" id="toggle-2" />
          <label class="fr-toggle__label" for="toggle-2" data-fr-checked-label="Activé" data-fr-unchecked-label="Désactivé">Deuxième option</label>
        </div>
      </li>
    </ul>
  </div>
</fieldset>`,
});
