import figma, { html } from '@figma/code-connect/html';

// Pied de page DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, <Footer> de
// react-dsfr est un composant responsive unique. Les composants préfixés « 🚫Éléments »
// (Liste de liens, Logo partenaire, Partenaires, Liens, Mentions, Bloc marque) sont des
// atomes internes → non connectés. Thème sombre = CSS seul.
// `accessibility` est une prop obligatoire côté react-dsfr (absente de l'équivalent
// ngx-dsfr) : posée à "non compliant" par défaut, à ajuster par le dev.
// « Liens » pilote `linkList` (liens de réorientation), « Partenaires » pilote
// `partnersLogos.main`. Les liens institutionnels/légaux par défaut du DSFR sont gérés
// nativement par le composant (pas de prop à fournir).

const imports = ["import { Footer } from '@codegouvfr/react-dsfr/Footer'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=166-771', {
  props: {
    links: figma.boolean('Liens', {
      true: `\n  linkList={[{
    categoryName: 'Liens de réorientation',
    links: [
      { text: 'Premier lien', linkProps: { href: '/premier' } },
      { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } }
    ]
  }]}`,
      false: '',
    }),
    partners: figma.boolean('Partenaires', {
      true: `\n  partnersLogos={{ main: { alt: 'Partenaire', imgUrl: '/assets/img/partner.png' } }}`,
      false: '',
    }),
  },
  example: ({ links, partners }) =>
    html`<Footer
  accessibility="non compliant"
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}${links}${partners} />`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=177-11734', {
  props: {
    links: figma.boolean('Liens', {
      true: `\n  linkList={[{
    categoryName: 'Liens de réorientation',
    links: [
      { text: 'Premier lien', linkProps: { href: '/premier' } },
      { text: 'Deuxième lien', linkProps: { href: '/deuxieme' } }
    ]
  }]}`,
      false: '',
    }),
    partners: figma.boolean('Partenaires', {
      true: `\n  partnersLogos={{ main: { alt: 'Partenaire', imgUrl: '/assets/img/partner.png' } }}`,
      false: '',
    }),
  },
  example: ({ links, partners }) =>
    html`<Footer
  accessibility="non compliant"
  brandTop="République Française"
  homeLinkProps={{ href: '/', title: 'Accueil' }}${links}${partners} />`,
  imports,
});
