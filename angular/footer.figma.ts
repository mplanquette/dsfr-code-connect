import figma, { html } from '@figma/code-connect/html';

// Pied de page DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, dsfr-footer
// est un composant responsive unique. Les composants préfixés « 🚫Éléments » (Liste
// de liens, Logo partenaire, Partenaires, Liens, Mentions, Bloc marque) sont des
// atomes internes → non connectés. Thème sombre = CSS seul.
// Les liens institutionnels et légaux ont des valeurs par défaut dans le composant
// (DEF_INSTITUTIONAL_LINKS, DEF_MANDATORY_LINKS) : « Liens » pilote les liens de
// réorientation (reboundLinks), « Partenaires » le partenaire principal.

const imports = ["import { DsfrFooterComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=166-771', {
  props: {
    links: figma.boolean('Liens', {
      true: `\n  [reboundLinks]="[
    { title: 'Liens de réorientation', links: [{ label: 'Premier lien', routePath: '/premier' }, { label: 'Deuxième lien', routePath: '/deuxieme' }] }
  ]"`,
      false: '',
    }),
    partners: figma.boolean('Partenaires', {
      true: `\n  [partnerMain]="{ imagePath: 'assets/img/partner.png', imageAlt: 'Partenaire' }"`,
      false: '',
    }),
  },
  example: ({ links, partners }) =>
    html`<dsfr-footer
  [logo]="{ label: 'République Française' }"${links}${partners}></dsfr-footer>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=177-11734', {
  props: {
    links: figma.boolean('Liens', {
      true: `\n  [reboundLinks]="[
    { title: 'Liens de réorientation', links: [{ label: 'Premier lien', routePath: '/premier' }, { label: 'Deuxième lien', routePath: '/deuxieme' }] }
  ]"`,
      false: '',
    }),
    partners: figma.boolean('Partenaires', {
      true: `\n  [partnerMain]="{ imagePath: 'assets/img/partner.png', imageAlt: 'Partenaire' }"`,
      false: '',
    }),
  },
  example: ({ links, partners }) =>
    html`<dsfr-footer
  [logo]="{ label: 'République Française' }"${links}${partners}></dsfr-footer>`,
  imports,
});
