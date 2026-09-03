import figma, { html } from '@figma/code-connect/html';

// Pied de page DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, DsfrFooter est
// un composant responsive unique. Les composants préfixés « 🚫Éléments » (Liste de liens,
// Logo partenaire, Partenaires, Liens, Mentions, Bloc marque) sont des atomes internes →
// non connectés. Thème sombre = CSS seul.
// « Liens » (reboundLinks côté Angular) n'a pas d'équivalent en prop simple : vue-dsfr
// expose un slot `footer-link-lists` dans lequel poser un ou plusieurs
// `<DsfrFooterLinkList>`. « Partenaires » pilote la prop `partners` (mainPartner).

const imports = [
  "import DsfrFooter from '@gouvminint/vue-dsfr/DsfrFooter.vue'",
  "import DsfrFooterLinkList from '@gouvminint/vue-dsfr/DsfrFooterLinkList.vue'",
];

const props = {
  partners: figma.boolean('Partenaires', {
    true: `:partners="{ mainPartner: { href: '#', logo: 'assets/img/partner.png', name: 'Partenaire' } }"`,
    false: '',
  }),
  links: figma.boolean('Liens', {
    true: `\n    <template #footer-link-lists>
      <DsfrFooterLinkList
        category-name="Liens de réorientation"
        :links="[
          { label: 'Premier lien', to: '/premier' },
          { label: 'Deuxième lien', to: '/deuxieme' }
        ]"
      />
    </template>\n  `,
    false: '',
  }),
};

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=166-771', {
  props,
  example: ({ partners, links }) => html`<DsfrFooter ${partners}>${links}</DsfrFooter>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=177-11734', {
  props,
  example: ({ partners, links }) => html`<DsfrFooter ${partners}>${links}</DsfrFooter>`,
  imports,
});
