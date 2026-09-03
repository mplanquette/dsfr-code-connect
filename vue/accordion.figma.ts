import figma, { html } from '@figma/code-connect/html';

// Accordéon DSFR : Desktop, Mobile, Groupe (mêmes node-ids qu'angular/accordion.figma.ts).
// Différence structurelle Vue vs Angular/HTML : `DsfrAccordion` (@gouvminint/vue-dsfr) n'a PAS
// de prop `expanded`/`opened` autonome, la doc officielle du composant est explicite : « Ce
// composant peut être utilisé uniquement avec DsfrAccordionsGroup ». L'ouverture est pilotée par
// le v-model (index de l'accordéon actif) du groupe, pas par une prop sur l'accordéon lui-même.
// On enveloppe donc systématiquement l'accordéon dans un DsfrAccordionsGroup, y compris pour les
// sets Desktop/Mobile qui représentent un accordéon isolé côté Figma : `:model-value="0"` force
// le premier (et unique) accordéon du groupe à l'état ouvert pour « Ouvert », rien pour Défaut/Survol.
// Thème (Clair/Sombre) = tokens CSS uniquement. Survol = pseudo-état CSS ignoré.
// Support (Desktop/Mobile sur le Groupe) = responsive uniquement, pas de markup différent.

const groupImports = [
  "import DsfrAccordion from '@gouvminint/vue-dsfr/DsfrAccordion.vue'",
  "import DsfrAccordionsGroup from '@gouvminint/vue-dsfr/DsfrAccordionsGroup.vue'",
];

// ─── Desktop (État : Défaut / Survol / Ouvert) ────────────────────────────────
const desktopProps = {
  expanded: figma.enum('État', {
    'Défaut': '',
    'Survol': '',
    'Ouvert': ' :model-value="0"',
  }),
};

// ─── Mobile (État : Défaut / Ouvert, pas de Survol) ──────────────────────────
const mobileProps = {
  expanded: figma.enum('État', {
    'Défaut': '',
    'Ouvert': ' :model-value="0"',
  }),
};

// ─── Accordéon - Desktop ───────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=128-27', {
  props: desktopProps,
  example: ({ expanded }) => html`<DsfrAccordionsGroup id="group"${expanded}>
  <DsfrAccordion title="Intitulé accordéon">
    Contenu de l'accordéon
  </DsfrAccordion>
</DsfrAccordionsGroup>`,
  imports: groupImports,
});

// ─── Accordéon - Mobile ─────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=128-110', {
  props: mobileProps,
  example: ({ expanded }) => html`<DsfrAccordionsGroup id="group"${expanded}>
  <DsfrAccordion title="Intitulé accordéon">
    Contenu de l'accordéon
  </DsfrAccordion>
</DsfrAccordionsGroup>`,
  imports: groupImports,
});

// ─── Accordéon - Groupe ─────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=128-600', {
  example: () => html`<DsfrAccordionsGroup v-model="selectedAccordion">
  <DsfrAccordion title="Intitulé 1">
    Contenu de l'accordéon 1
  </DsfrAccordion>
  <DsfrAccordion title="Intitulé 2">
    Contenu de l'accordéon 2
  </DsfrAccordion>
  <DsfrAccordion title="Intitulé 3">
    Contenu de l'accordéon 3
  </DsfrAccordion>
</DsfrAccordionsGroup>`,
  imports: groupImports,
});
