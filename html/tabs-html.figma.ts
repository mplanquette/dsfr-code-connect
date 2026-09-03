import figma, { html } from '@figma/code-connect/html';

// Onglet DSFR : 3 sets (Item, Groupe, Complet). Thème et Support = CSS seul.
// Survol = pseudo-état → ignoré.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-checkbox-line.

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=502-145', {
  props: {
    iconClass: figma.boolean('Icône', {
      true: ' fr-icon-checkbox-line fr-tabs__tab--icon-left',
      false: '',
    }),
    selected: figma.enum('État', { Défaut: 'false', Courant: 'true', Survol: 'false' }),
    tabindex: figma.enum('État', { Défaut: '-1', Courant: '0', Survol: '-1' }),
  },
  example: ({ iconClass, selected, tabindex }) =>
    html`<li role="presentation">
  <button id="tab-1" class="fr-tabs__tab${iconClass}" tabindex="${tabindex}" role="tab" aria-selected="${selected}" aria-controls="tabpanel-1">Libellé de l'onglet</button>
</li>`,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=502-340', {
  props: {
    iconClass: figma.boolean('Icône', {
      true: ' fr-icon-checkbox-line fr-tabs__tab--icon-left',
      false: '',
    }),
  },
  example: ({ iconClass }) =>
    html`<ul class="fr-tabs__list" role="tablist" aria-label="Libellé du groupe d'onglets">
  <li role="presentation">
    <button id="tab-1" class="fr-tabs__tab${iconClass}" tabindex="0" role="tab" aria-selected="true" aria-controls="tabpanel-1">Premier onglet</button>
  </li>
  <li role="presentation">
    <button id="tab-2" class="fr-tabs__tab${iconClass}" tabindex="-1" role="tab" aria-selected="false" aria-controls="tabpanel-2">Deuxième onglet</button>
  </li>
  <li role="presentation">
    <button id="tab-3" class="fr-tabs__tab${iconClass}" tabindex="-1" role="tab" aria-selected="false" aria-controls="tabpanel-3">Troisième onglet</button>
  </li>
</ul>`,
});

// ─── Complet ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=505-90', {
  example: () =>
    html`<div class="fr-tabs">
  <ul class="fr-tabs__list" role="tablist" aria-label="Libellé du groupe d'onglets">
    <li role="presentation">
      <button id="tab-1" class="fr-tabs__tab" tabindex="0" role="tab" aria-selected="true" aria-controls="tabpanel-1">Premier onglet</button>
    </li>
    <li role="presentation">
      <button id="tab-2" class="fr-tabs__tab" tabindex="-1" role="tab" aria-selected="false" aria-controls="tabpanel-2">Deuxième onglet</button>
    </li>
  </ul>
  <div id="tabpanel-1" class="fr-tabs__panel fr-tabs__panel--selected" role="tabpanel" aria-labelledby="tab-1" tabindex="0">
    Contenu du premier onglet
  </div>
  <div id="tabpanel-2" class="fr-tabs__panel" role="tabpanel" aria-labelledby="tab-2" tabindex="0">
    Contenu du deuxième onglet
  </div>
</div>`,
});
