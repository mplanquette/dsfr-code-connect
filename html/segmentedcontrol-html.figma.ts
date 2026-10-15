import figma, { html } from '@figma/code-connect/html';

// Contrôle segmenté DSFR : 3 sets utiles, thème clair uniquement. Desktop et Mobile
// sont le même composant responsive → même snippet. Les composants préfixés « ⚙️ »
// (Élément, Desktop & Mobile, Mobile cas max) sont des atomes internes → non connectés.
// Thème sombre = CSS seul. Focus, Survol, Cliqué = pseudo-états → ignorés.

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_CONTROLE_SEGMENTE__DESKTOP_CONTROLE_SEGMENTE>', {
  props: {
    legendClass: figma.enum('Légende', { Horizontale: ' fr-segmented__legend--inline', 'Au dessus': '' }),
  },
  example: ({ legendClass }) =>
    html`<fieldset class="fr-segmented">
  <legend class="fr-segmented__legend${legendClass}">Légende du contrôle</legend>
  <div class="fr-segmented__elements">
    <div class="fr-segmented__element">
      <input value="option-1" type="radio" checked id="segmented-1" name="segmented" />
      <label class="fr-label" for="segmented-1">Première option</label>
    </div>
    <div class="fr-segmented__element">
      <input value="option-2" type="radio" id="segmented-2" name="segmented" />
      <label class="fr-label" for="segmented-2">Deuxième option</label>
    </div>
    <div class="fr-segmented__element">
      <input value="option-3" type="radio" id="segmented-3" name="segmented" />
      <label class="fr-label" for="segmented-3">Troisième option</label>
    </div>
  </div>
</fieldset>`,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_CONTROLE_SEGMENTE__MOBILE_CONTROLE_SEGMENTE>', {
  props: {
    legendClass: figma.enum('Légende', { Horizontale: ' fr-segmented__legend--inline', 'Au dessus': '' }),
  },
  example: ({ legendClass }) =>
    html`<fieldset class="fr-segmented">
  <legend class="fr-segmented__legend${legendClass}">Légende du contrôle</legend>
  <div class="fr-segmented__elements">
    <div class="fr-segmented__element">
      <input value="option-1" type="radio" checked id="segmented-1" name="segmented" />
      <label class="fr-label" for="segmented-1">Première option</label>
    </div>
    <div class="fr-segmented__element">
      <input value="option-2" type="radio" id="segmented-2" name="segmented" />
      <label class="fr-label" for="segmented-2">Deuxième option</label>
    </div>
    <div class="fr-segmented__element">
      <input value="option-3" type="radio" id="segmented-3" name="segmented" />
      <label class="fr-label" for="segmented-3">Troisième option</label>
    </div>
  </div>
</fieldset>`,
});

// ─── Cas max (Mobile) ────────────────────────────────────────────────────────
figma.connect('<FIGMA_CONTROLE_SEGMENTE__MOBILE_CONTROLE_SEGMENTE_CAS_MAX>', {
  example: () =>
    html`<fieldset class="fr-segmented">
  <legend class="fr-segmented__legend">Légende du contrôle</legend>
  <div class="fr-segmented__elements">
    <div class="fr-segmented__element">
      <input value="option-1" type="radio" id="segmented-1" name="segmented" />
      <label class="fr-label" for="segmented-1">Première option avec un libellé long</label>
    </div>
    <div class="fr-segmented__element">
      <input value="option-2" type="radio" id="segmented-2" name="segmented" />
      <label class="fr-label" for="segmented-2">Deuxième option avec un libellé long</label>
    </div>
    <div class="fr-segmented__element">
      <input value="option-3" type="radio" id="segmented-3" name="segmented" />
      <label class="fr-label" for="segmented-3">Troisième option avec un libellé long</label>
    </div>
  </div>
</fieldset>`,
});
