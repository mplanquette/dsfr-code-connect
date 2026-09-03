import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement :
//   - Voir Média  → imageUrl / imageAlt (sets verticaux uniquement, la carte horizontale
//                   « Sans média » n'a pas d'équivalent média à afficher)
//   - Proportions → ratio="33/66" | (rien, défaut 40/60) | ratio="50/50" (sets horizontaux)
//   - Taille      → size="small" | (rien, défaut medium) | size="large"
// Carte DSFR : 9 sets utiles (Verticale × 3 tailles, Horizontale × 3 tailles × 2 avec/sans
// média), en thème clair uniquement. Les composants préfixés « ⚙️ » (Média, Zone d'action,
// Zone de précision, Détail, Badge ou tag, Contenu, Description) sont des atomes internes
// qui composent ces 9 sets → non connectés individuellement. Thème sombre = CSS seul.
// Focus, Survol, Cliqué = pseudo-états → ignorés. Support (Desktop/Mobile) = CSS responsive.
// « Cliquable = False » retire le lien : la carte devient un simple panneau d'information,
// non représentable en une seule input → non bindé, le lien reste présent dans tous les
// exemples (comportement par défaut le plus courant).
// « Désactivé » n'a pas d'équivalent dans `CardProps` de react-dsfr (pas de prop `disabled`,
// contrairement à `dsfr-card` côté Angular) : non bindé pour ce framework.

const imports = ["import { Card } from '@codegouvfr/react-dsfr/Card'"];

// ─── Verticale / LG ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202030', {
  props: {
    media: figma.boolean('Voir Média', {
      true: `\n  imageUrl="assets/img/card.jpg"\n  imageAlt=""`,
      false: '',
    }),
  },
  example: ({ media }) =>
    html`<Card
  title="Titre de la carte"
  desc="Description de la carte."
  linkProps={{ to: '/page' }}
  size="large"${media}
/>`,
  imports,
});

// ─── Verticale / MD ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202061', {
  props: {
    media: figma.boolean('Voir Média', {
      true: `\n  imageUrl="assets/img/card.jpg"\n  imageAlt=""`,
      false: '',
    }),
  },
  example: ({ media }) =>
    html`<Card
  title="Titre de la carte"
  desc="Description de la carte."
  linkProps={{ to: '/page' }}${media}
/>`,
  imports,
});

// ─── Verticale / SM ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202092', {
  props: {
    media: figma.boolean('Voir Média', {
      true: `\n  imageUrl="assets/img/card.jpg"\n  imageAlt=""`,
      false: '',
    }),
  },
  example: ({ media }) =>
    html`<Card
  title="Titre de la carte"
  desc="Description de la carte."
  linkProps={{ to: '/page' }}
  size="small"${media}
/>`,
  imports,
});

// ─── Horizontale / LG / Avec média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202123', {
  props: {
    ratio: figma.enum('Proportions', {
      '33-66': ' ratio="33/66"',
      '40-60': '',
      '50-50': ' ratio="50/50"',
    }),
  },
  example: ({ ratio }) =>
    html`<Card
  title="Titre de la carte"
  desc="Description de la carte."
  linkProps={{ to: '/page' }}
  imageUrl="assets/img/card.jpg"
  imageAlt=""
  horizontal
  size="large"${ratio}
/>`,
  imports,
});

// ─── Horizontale / LG / Sans média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202178', {
  example: () =>
    html`<Card
  title="Titre de la carte"
  desc="Description de la carte."
  linkProps={{ to: '/page' }}
  horizontal
  size="large"
/>`,
  imports,
});

// ─── Horizontale / MD / Avec média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202192', {
  props: {
    ratio: figma.enum('Proportions', {
      '33-66': ' ratio="33/66"',
      '40-60': '',
      '50-50': ' ratio="50/50"',
    }),
  },
  example: ({ ratio }) =>
    html`<Card
  title="Titre de la carte"
  desc="Description de la carte."
  linkProps={{ to: '/page' }}
  imageUrl="assets/img/card.jpg"
  imageAlt=""
  horizontal${ratio}
/>`,
  imports,
});

// ─── Horizontale / MD / Sans média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202247', {
  example: () =>
    html`<Card
  title="Titre de la carte"
  desc="Description de la carte."
  linkProps={{ to: '/page' }}
  horizontal
/>`,
  imports,
});

// ─── Horizontale / SM / Avec média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202261', {
  props: {
    ratio: figma.enum('Proportions', {
      '33-66': ' ratio="33/66"',
      '40-60': '',
      '50-50': ' ratio="50/50"',
    }),
  },
  example: ({ ratio }) =>
    html`<Card
  title="Titre de la carte"
  desc="Description de la carte."
  linkProps={{ to: '/page' }}
  imageUrl="assets/img/card.jpg"
  imageAlt=""
  horizontal
  size="small"${ratio}
/>`,
  imports,
});

// ─── Horizontale / SM / Sans média ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=21809-202316', {
  example: () =>
    html`<Card
  title="Titre de la carte"
  desc="Description de la carte."
  linkProps={{ to: '/page' }}
  horizontal
  size="small"
/>`,
  imports,
});
