import figma, { html } from '@figma/code-connect/html';

// Contrôle segmenté DSFR : 3 sets utiles, thème clair uniquement. Desktop et Mobile sont le même
// composant responsive → même snippet. Les composants préfixés « ⚙️ » (Élément, Desktop & Mobile,
// Mobile cas max) sont des atomes internes → non connectés. Thème sombre = CSS seul. Focus, Survol,
// Cliqué = pseudo-états → ignorés.
// Le composant de groupe vue-dsfr s'appelle `DsfrSegmentedSet` (pas `DsfrSegmented`, qui est
// l'option individuelle rendue en interne par le set via la prop `options`).

const imports = ["import DsfrSegmentedSet from '@gouvminint/vue-dsfr/DsfrSegmentedSet.vue'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_CONTROLE_SEGMENTE__DESKTOP_CONTROLE_SEGMENTE>', {
  props: {
    inline: figma.enum('Légende', { Horizontale: ' inline', 'Au dessus': '' }),
  },
  example: ({ inline }) =>
    html`<DsfrSegmentedSet
  legend="Légende du contrôle"
  model-value="option-1"
  :options="[
    { value: 'option-1', label: 'Première option' },
    { value: 'option-2', label: 'Deuxième option' },
    { value: 'option-3', label: 'Troisième option' }
  ]"${inline}
/>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_CONTROLE_SEGMENTE__MOBILE_CONTROLE_SEGMENTE>', {
  props: {
    inline: figma.enum('Légende', { Horizontale: ' inline', 'Au dessus': '' }),
  },
  example: ({ inline }) =>
    html`<DsfrSegmentedSet
  legend="Légende du contrôle"
  model-value="option-1"
  :options="[
    { value: 'option-1', label: 'Première option' },
    { value: 'option-2', label: 'Deuxième option' },
    { value: 'option-3', label: 'Troisième option' }
  ]"${inline}
/>`,
  imports,
});

// ─── Cas max (Mobile) ────────────────────────────────────────────────────────
// Illustre le comportement du composant avec un nombre élevé de segments à libellés longs.
figma.connect('<FIGMA_CONTROLE_SEGMENTE__MOBILE_CONTROLE_SEGMENTE_CAS_MAX>', {
  example: () =>
    html`<DsfrSegmentedSet
  legend="Légende du contrôle"
  model-value="option-1"
  :options="[
    { value: 'option-1', label: 'Première option avec un libellé long' },
    { value: 'option-2', label: 'Deuxième option avec un libellé long' },
    { value: 'option-3', label: 'Troisième option avec un libellé long' }
  ]"
/>`,
  imports,
});
