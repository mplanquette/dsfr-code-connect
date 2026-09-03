import figma, { html } from '@figma/code-connect/html';

// Curseur DSFR : 3 sets utiles (double, simple, cranté). Les composants préfixés
// « ⚙️ » (Poignée, Piste, Plage sélectionnée, Cran, Valeur min-max) sont des atomes
// internes assemblés par ces 3 sets → non connectés individuellement.
// Coquille de design conservée telle quelle : « Défault » et « désactivé ».

// ─── Curseur simple ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=24571-368579', {
  props: {
    stateClass: figma.enum('État', {
      Défault: '', désactivé: ' fr-range-group--disabled',
      Erreur: ' fr-range-group--error', Valide: ' fr-range-group--valid',
    }),
    disabled: figma.enum('État', { Défault: '', Erreur: '', Valide: '', désactivé: ' disabled' }),
    message: figma.enum('État', {
      Défault: '', désactivé: '',
      Erreur: `\n    <p class="fr-message fr-message--error" id="range-messages">Texte d'erreur</p>`,
      Valide: `\n    <p class="fr-message fr-message--valid" id="range-messages">Texte de validation</p>`,
    }),
  },
  example: ({ stateClass, disabled, message }) =>
    html`<div class="fr-range-group${stateClass}" id="range-group">
  <label class="fr-label" id="range-label" for="range">Libellé du curseur</label>
  <div class="fr-range">
    <span class="fr-range__output">50</span>
    <input id="range" name="range" type="range" min="0" max="100" value="50"${disabled} />
    <span class="fr-range__min" aria-hidden="true">0</span>
    <span class="fr-range__max" aria-hidden="true">100</span>
  </div>
  <div class="fr-messages-group" id="range-messages-group" aria-live="polite">${message}
  </div>
</div>`,
});

// ─── Curseur double ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=24474-242232', {
  props: {
    stateClass: figma.enum('État', {
      Défault: '', désactivé: ' fr-range-group--disabled',
      Erreur: ' fr-range-group--error', Valide: ' fr-range-group--valid',
    }),
    disabled: figma.enum('État', { Défault: '', Erreur: '', Valide: '', désactivé: ' disabled' }),
    message: figma.enum('État', {
      Défault: '', désactivé: '',
      Erreur: `\n    <p class="fr-message fr-message--error" id="range-messages">Texte d'erreur</p>`,
      Valide: `\n    <p class="fr-message fr-message--valid" id="range-messages">Texte de validation</p>`,
    }),
  },
  example: ({ stateClass, disabled, message }) =>
    html`<div class="fr-range-group${stateClass}" id="range-group">
  <label class="fr-label" id="range-label">Libellé du curseur</label>
  <div class="fr-range fr-range--double">
    <input id="range-min" name="range-min" type="range" aria-label="Valeur minimum" min="0" max="100" value="25"${disabled} />
    <input id="range-max" name="range-max" type="range" aria-label="Valeur maximum" min="0" max="100" value="75"${disabled} />
    <span class="fr-range__min" aria-hidden="true">0</span>
    <span class="fr-range__max" aria-hidden="true">100</span>
  </div>
  <div class="fr-messages-group" id="range-messages-group" aria-live="polite">${message}
  </div>
</div>`,
});

// ─── Curseur cranté ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=24571-368480', {
  props: {
    stateClass: figma.enum('État', {
      Défault: '', désactivé: ' fr-range-group--disabled',
      Erreur: ' fr-range-group--error', Valide: ' fr-range-group--valid',
    }),
    disabled: figma.enum('État', { Défault: '', Erreur: '', Valide: '', désactivé: ' disabled' }),
    message: figma.enum('État', {
      Défault: '', désactivé: '',
      Erreur: `\n    <p class="fr-message fr-message--error" id="range-messages">Texte d'erreur</p>`,
      Valide: `\n    <p class="fr-message fr-message--valid" id="range-messages">Texte de validation</p>`,
    }),
  },
  example: ({ stateClass, disabled, message }) =>
    html`<div class="fr-range-group${stateClass}" id="range-group">
  <label class="fr-label" id="range-label" for="range">Libellé du curseur</label>
  <div class="fr-range fr-range--step">
    <span class="fr-range__output">50</span>
    <input id="range" name="range" type="range" min="0" max="100" step="25" value="50"${disabled} />
    <span class="fr-range__min" aria-hidden="true">0</span>
    <span class="fr-range__max" aria-hidden="true">100</span>
  </div>
  <div class="fr-messages-group" id="range-messages-group" aria-live="polite">${message}
  </div>
</div>`,
});
