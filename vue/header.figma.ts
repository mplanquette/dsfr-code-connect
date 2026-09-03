import figma, { html } from '@figma/code-connect/html';

// En-tête DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, DsfrHeader est un
// composant responsive unique. Les composants « Éléments » (Exemple de logo, Fonctionnel
// droite, Bloc marque) sont des atomes internes → non connectés. « Recherche ouverte »
// (Mobile) est un état transitoire d'interaction (panneau de recherche déplié), non
// piloté par une prop → non connecté. Thème sombre = CSS seul.
// La navigation (mêmes 2 liens que côté Angular/HTML) se pose via le slot `mainnav` avec
// DsfrNavigation, conformément à l'usage réel de vue-dsfr (dsfr-header n'a pas de prop
// `menu`, contrairement à ngx-dsfr).

const imports = ["import DsfrHeader from '@gouvminint/vue-dsfr/DsfrHeader.vue'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=148-52', {
  props: {
    serviceTitle: figma.boolean('Nom du site', { true: '\n    service-title="Nom du site / de l\'organisme"', false: '' }),
    serviceDescription: figma.boolean('Description', { true: '\n    service-description="Baseline / accroche du site"', false: '' }),
    showSearch: figma.boolean('Fonctionnel droite', { true: '\n    show-search', false: '' }),
  },
  example: ({ serviceTitle, serviceDescription, showSearch }) =>
    html`<DsfrHeader home-to="/"${serviceTitle}${serviceDescription}${showSearch}>
    <template #mainnav>
      <DsfrNavigation
        :nav-items="[
          { to: '/premier', text: 'Premier lien' },
          { to: '/deuxieme', text: 'Deuxième lien' }
        ]"
      />
    </template>
  </DsfrHeader>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=153-159413', {
  props: {
    serviceTitle: figma.boolean('Nom du site', { true: '\n    service-title="Nom du site / de l\'organisme"', false: '' }),
    serviceDescription: figma.boolean('Description', { true: '\n    service-description="Baseline / accroche du site"', false: '' }),
    showSearch: figma.boolean('Recherche', { true: '\n    show-search', false: '' }),
  },
  example: ({ serviceTitle, serviceDescription, showSearch }) =>
    html`<DsfrHeader home-to="/"${serviceTitle}${serviceDescription}${showSearch}>
    <template #mainnav>
      <DsfrNavigation
        :nav-items="[
          { to: '/premier', text: 'Premier lien' },
          { to: '/deuxieme', text: 'Deuxième lien' }
        ]"
      />
    </template>
  </DsfrHeader>`,
  imports,
});
