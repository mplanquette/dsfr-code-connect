import figma, { html } from '@figma/code-connect/html';

// Curseur DSFR : 3 sets utiles (simple, double, cranté). Les composants préfixés
// « ⚙️ » (Poignée, Piste, Plage sélectionnée, Cran, Valeur min-max) sont des atomes
// internes assemblés par ces 3 sets → non connectés individuellement.
// Coquille de design conservée telle quelle : « Défault » et « désactivé ».
// DsfrRange (vue-dsfr) n'a qu'un seul `message`, toujours rendu en `fr-message--error`
// (pas de variante "valide" comme messageSeverity côté Angular/HTML) : « Valide » ne
// produit donc aucun message, seule « Erreur » en affiche un.
// Curseur double : géré nativement par `modelValue` (poignée haute) + `lowerValue`
// (poignée basse), pas par un tableau de deux valeurs comme côté Angular.

const imports = ["import DsfrRange from '@gouvminint/vue-dsfr/DsfrRange.vue'"];

// ─── Curseur simple ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_CURSEUR__CURSEUR_SIMPLE>', {
  props: {
    disabled: figma.enum('État', { Défault: '', Erreur: '', Valide: '', désactivé: ' disabled' }),
    message: figma.enum('État', {
      Défault: '', désactivé: '', Valide: '',
      Erreur: ` message="Texte d'erreur"`,
    }),
  },
  example: ({ disabled, message }) =>
    html`<DsfrRange label="Libellé du curseur" :min="0" :max="100" :model-value="50"${disabled}${message} />`,
  imports,
});

// ─── Curseur double ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_CURSEUR__CURSEUR_DOUBLE>', {
  props: {
    disabled: figma.enum('État', { Défault: '', Erreur: '', Valide: '', désactivé: ' disabled' }),
    message: figma.enum('État', {
      Défault: '', désactivé: '', Valide: '',
      Erreur: ` message="Texte d'erreur"`,
    }),
  },
  example: ({ disabled, message }) =>
    html`<DsfrRange label="Libellé du curseur" :min="0" :max="100" :model-value="75" :lower-value="25"${disabled}${message} />`,
  imports,
});

// ─── Curseur cranté ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_CURSEUR__CURSEUR_CRANTE>', {
  props: {
    disabled: figma.enum('État', { Défault: '', Erreur: '', Valide: '', désactivé: ' disabled' }),
    message: figma.enum('État', {
      Défault: '', désactivé: '', Valide: '',
      Erreur: ` message="Texte d'erreur"`,
    }),
  },
  example: ({ disabled, message }) =>
    html`<DsfrRange label="Libellé du curseur" :min="0" :max="100" :step="25" :model-value="50"${disabled}${message} />`,
  imports,
});
