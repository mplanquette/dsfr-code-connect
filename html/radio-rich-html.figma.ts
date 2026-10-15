import figma, { html } from '@figma/code-connect/html';

// Bouton radio riche DSFR : 3 sets (Item, Groupe, Section).
// Focus et Survol = pseudo-états → ignorés. Thème sombre = CSS seul.
// « Illustration » est un instance-swap non code-connecté : placeholder de chemin
// de pictogramme à remplacer par l'asset réel.

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BOUTON_RADIO_RICHE__BOUTON_RADIO_RICHE>', {
  props: {
    checked: figma.boolean('Coché', { true: ' checked', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    stateClass: figma.enum('Validation', {
      Default: '',
      Valide: ' fr-fieldset--valid',
      Erreur: ' fr-fieldset--error',
    }),
    pictogram: figma.boolean('Pictogramme', {
      true: `\n      <div class="fr-radio-rich__pictogram">\n        <svg aria-hidden="true" class="fr-artwork" viewBox="0 0 80 80" width="80px" height="80px">\n          <use class="fr-artwork-decorative" href="/artwork/pictograms/system/system.svg#artwork-decorative"></use>\n          <use class="fr-artwork-minor" href="/artwork/pictograms/system/system.svg#artwork-minor"></use>\n          <use class="fr-artwork-major" href="/artwork/pictograms/system/system.svg#artwork-major"></use>\n        </svg>\n      </div>`,
      false: '',
    }),
  },
  example: ({ checked, disabled, stateClass, pictogram }) =>
    html`<fieldset class="fr-fieldset${stateClass}" id="radio-rich" aria-labelledby="radio-rich-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="radio-rich-legend">Légende du champ</legend>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group fr-radio-rich">
      <input type="radio" id="radio-rich-1" name="radio-rich" value="option-1"${checked}${disabled} />
      <label class="fr-label" for="radio-rich-1">Libellé bouton radio
        <span class="fr-hint-text">Texte de description</span>
      </label>${pictogram}
    </div>
  </div>
</fieldset>`,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BOUTON_RADIO_RICHE__BOUTON_RADIO_RICHE_GROUPE>', {
  props: {
    stateClass: figma.enum('État', {
      Default: '',
      Valide: ' fr-fieldset--valid',
      Erreur: ' fr-fieldset--error',
    }),
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
  },
  example: ({ stateClass, disabled }) =>
    html`<fieldset class="fr-fieldset fr-fieldset--inline${stateClass}" id="radio-rich-group" aria-labelledby="radio-rich-group-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="radio-rich-group-legend">Légende du groupe</legend>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group fr-radio-rich">
      <input type="radio" id="radio-rich-1" name="radio-rich-group" value="option-1"${disabled} />
      <label class="fr-label" for="radio-rich-1">Première option
        <span class="fr-hint-text">Texte de description</span>
      </label>
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group fr-radio-rich">
      <input type="radio" id="radio-rich-2" name="radio-rich-group" value="option-2"${disabled} />
      <label class="fr-label" for="radio-rich-2">Deuxième option
        <span class="fr-hint-text">Texte de description</span>
      </label>
    </div>
  </div>
</fieldset>`,
});

// ─── Section ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BOUTON_RADIO_RICHE__BOUTON_RADIO_RICHE_SECTION>', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
  },
  example: ({ disabled }) =>
    html`<fieldset class="fr-fieldset fr-fieldset--inline" id="radio-rich-section" aria-labelledby="radio-rich-section-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="radio-rich-section-legend">Titre de section</legend>
  <div class="fr-fieldset__element">
    <div class="fr-radio-group fr-radio-rich">
      <input type="radio" id="radio-rich-1" name="radio-rich-section" value="option-1"${disabled} />
      <label class="fr-label" for="radio-rich-1">Première option
        <span class="fr-hint-text">Texte de description</span>
      </label>
    </div>
  </div>
</fieldset>`,
});
