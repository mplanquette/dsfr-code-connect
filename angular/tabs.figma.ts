import figma, { html } from '@figma/code-connect/html';

// Onglet DSFR : 3 sets (Item, Groupe, Complet). Thème et Support = CSS seul.
// Survol = pseudo-état → ignoré.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-checkbox-line.

const imports = [
  "import { DsfrTabsComponent, DsfrTabComponent } from '@edugouvfr/ngx-dsfr'",
];

// ─── Item ────────────────────────────────────────────────────────────────────
// Un onglet seul se déclare avec <dsfr-tab> dans un <dsfr-tabs>.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=502-145', {
  props: {
    icon: figma.boolean('Icône', { true: ' icon="fr-icon-checkbox-line"', false: '' }),
    selected: figma.enum('État', { Défaut: '1', Courant: '0', Survol: '1' }),
  },
  example: ({ icon, selected }) =>
    html`<dsfr-tabs tabsAriaLabel="Libellé du groupe d'onglets" [selectedTabIndex]="${selected}">
  <dsfr-tab tabId="tab-1" label="Libellé de l'onglet"${icon}>Contenu de l'onglet</dsfr-tab>
</dsfr-tabs>`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=502-340', {
  props: {
    icon: figma.boolean('Icône', { true: ' icon="fr-icon-checkbox-line"', false: '' }),
  },
  example: ({ icon }) =>
    html`<dsfr-tabs tabsAriaLabel="Libellé du groupe d'onglets">
  <dsfr-tab tabId="tab-1" label="Premier onglet"${icon}>Contenu du premier onglet</dsfr-tab>
  <dsfr-tab tabId="tab-2" label="Deuxième onglet"${icon}>Contenu du deuxième onglet</dsfr-tab>
  <dsfr-tab tabId="tab-3" label="Troisième onglet"${icon}>Contenu du troisième onglet</dsfr-tab>
</dsfr-tabs>`,
  imports,
});

// ─── Complet ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=505-90', {
  example: () =>
    html`<dsfr-tabs tabsAriaLabel="Libellé du groupe d'onglets">
  <dsfr-tab tabId="tab-1" label="Premier onglet">Contenu du premier onglet</dsfr-tab>
  <dsfr-tab tabId="tab-2" label="Deuxième onglet">Contenu du deuxième onglet</dsfr-tab>
  <dsfr-tab tabId="tab-3" label="Troisième onglet">Contenu du troisième onglet</dsfr-tab>
</dsfr-tabs>`,
  imports,
});
