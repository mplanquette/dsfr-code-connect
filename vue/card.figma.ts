import figma, { html } from '@figma/code-connect/html';

// Carte DSFR : 9 sets utiles (Verticale × 3 tailles, Horizontale × 3 tailles × 2 avec/sans
// média), en thème clair uniquement. Les composants préfixés « ⚙️ » (Média, Zone d'action,
// Zone de précision, Détail, Badge ou tag, Contenu, Description) sont des atomes internes
// qui composent ces 9 sets → non connectés individuellement. Thème sombre = CSS seul.
// Focus, Survol, Cliqué = pseudo-états → ignorés. Support (Desktop/Mobile) = CSS responsive.
// « Cliquable = False » retire le lien : la carte devient un simple panneau d'information,
// non représentable en une seule input → non bindé, le lien reste présent dans tous les
// exemples (comportement par défaut le plus courant).
// « Désactivé » : `DsfrCard` (vue-dsfr) n'a pas de prop dédiée → non bindable côté Vue
// (contrairement à Angular/HTML), non repris ici.
// « Proportions » (cartes horizontales) → prop `imgRatio` de `DsfrCard` : sm (33-66),
// rien = md par défaut (40-60), lg (50-50).

const imports = ["import DsfrCard from '@gouvminint/vue-dsfr/DsfrCard.vue'"];

// ─── Verticale / LG ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202030', {
  props: {
    media: figma.boolean('Voir Média', {
      true: `\n  img-src="assets/img/card.jpg"\n  alt-img=""`,
      false: '',
    }),
  },
  example: ({ media }) =>
    html`<DsfrCard
  title="Titre de la carte"
  description="Description de la carte."
  link="/page"
  size="lg"${media}
/>`,
  imports,
});

// ─── Verticale / MD ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202061', {
  props: {
    media: figma.boolean('Voir Média', {
      true: `\n  img-src="assets/img/card.jpg"\n  alt-img=""`,
      false: '',
    }),
  },
  example: ({ media }) =>
    html`<DsfrCard
  title="Titre de la carte"
  description="Description de la carte."
  link="/page"${media}
/>`,
  imports,
});

// ─── Verticale / SM ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202092', {
  props: {
    media: figma.boolean('Voir Média', {
      true: `\n  img-src="assets/img/card.jpg"\n  alt-img=""`,
      false: '',
    }),
  },
  example: ({ media }) =>
    html`<DsfrCard
  title="Titre de la carte"
  description="Description de la carte."
  link="/page"
  size="sm"${media}
/>`,
  imports,
});

// ─── Horizontale / LG / Avec média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202123', {
  props: {
    proportion: figma.enum('Proportions', {
      '33-66': ' img-ratio="sm"',
      '40-60': '',
      '50-50': ' img-ratio="lg"',
    }),
  },
  example: ({ proportion }) =>
    html`<DsfrCard
  title="Titre de la carte"
  description="Description de la carte."
  link="/page"
  img-src="assets/img/card.jpg"
  alt-img=""
  horizontal
  size="lg"${proportion}
/>`,
  imports,
});

// ─── Horizontale / LG / Sans média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202178', {
  example: () =>
    html`<DsfrCard
  title="Titre de la carte"
  description="Description de la carte."
  link="/page"
  horizontal
  size="lg"
/>`,
  imports,
});

// ─── Horizontale / MD / Avec média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202192', {
  props: {
    proportion: figma.enum('Proportions', {
      '33-66': ' img-ratio="sm"',
      '40-60': '',
      '50-50': ' img-ratio="lg"',
    }),
  },
  example: ({ proportion }) =>
    html`<DsfrCard
  title="Titre de la carte"
  description="Description de la carte."
  link="/page"
  img-src="assets/img/card.jpg"
  alt-img=""
  horizontal${proportion}
/>`,
  imports,
});

// ─── Horizontale / MD / Sans média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202247', {
  example: () =>
    html`<DsfrCard
  title="Titre de la carte"
  description="Description de la carte."
  link="/page"
  horizontal
/>`,
  imports,
});

// ─── Horizontale / SM / Avec média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202261', {
  props: {
    proportion: figma.enum('Proportions', {
      '33-66': ' img-ratio="sm"',
      '40-60': '',
      '50-50': ' img-ratio="lg"',
    }),
  },
  example: ({ proportion }) =>
    html`<DsfrCard
  title="Titre de la carte"
  description="Description de la carte."
  link="/page"
  img-src="assets/img/card.jpg"
  alt-img=""
  horizontal
  size="sm"${proportion}
/>`,
  imports,
});

// ─── Horizontale / SM / Sans média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202316', {
  example: () =>
    html`<DsfrCard
  title="Titre de la carte"
  description="Description de la carte."
  link="/page"
  horizontal
  size="sm"
/>`,
  imports,
});
