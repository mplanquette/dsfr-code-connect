import figma, { html } from '@figma/code-connect/html';

// Onglet DSFR : 3 sets (Item, Groupe, Complet). Thème et Support = CSS seul.
// Survol = pseudo-état → ignoré.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-checkbox-line.
// DsfrTabs pilote titres (`tab-titles`) et contenus (`tab-contents`) par tableaux
// parallèles indexés, `model-value` étant l'index (0-based) de l'onglet sélectionné.

const imports = ["import DsfrTabs from '@gouvminint/vue-dsfr/DsfrTabs.vue'"];

// ─── Item ────────────────────────────────────────────────────────────────────
// Un onglet seul se déclare comme unique entrée de `tab-titles`/`tab-contents`.
figma.connect('<FIGMA_ONGLET__ONGLET_ITEM>', {
  props: {
    iconAttr: figma.boolean('Icône', { true: `, icon: 'fr-icon-checkbox-line'`, false: '' }),
    selected: figma.enum('État', { Défaut: '1', Courant: '0', Survol: '1' }),
  },
  example: ({ iconAttr, selected }) =>
    html`<DsfrTabs tab-list-name="Libellé du groupe d'onglets" :model-value="${selected}" :tab-titles="[
    { title: 'Libellé de l\\'onglet'${iconAttr} }
  ]" :tab-contents="['Contenu de l\\'onglet']" />`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_ONGLET__ONGLET_GROUPE>', {
  props: {
    iconAttr: figma.boolean('Icône', { true: `, icon: 'fr-icon-checkbox-line'`, false: '' }),
  },
  example: ({ iconAttr }) =>
    html`<DsfrTabs tab-list-name="Libellé du groupe d'onglets" :tab-titles="[
    { title: 'Premier onglet'${iconAttr} },
    { title: 'Deuxième onglet'${iconAttr} },
    { title: 'Troisième onglet'${iconAttr} }
  ]" :tab-contents="['Contenu du premier onglet', 'Contenu du deuxième onglet', 'Contenu du troisième onglet']" />`,
  imports,
});

// ─── Complet ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_ONGLET__ONGLET_COMPLET>', {
  example: () =>
    html`<DsfrTabs tab-list-name="Libellé du groupe d'onglets" :tab-titles="[
    { title: 'Premier onglet' },
    { title: 'Deuxième onglet' },
    { title: 'Troisième onglet' }
  ]" :tab-contents="['Contenu du premier onglet', 'Contenu du deuxième onglet', 'Contenu du troisième onglet']" />`,
  imports,
});
