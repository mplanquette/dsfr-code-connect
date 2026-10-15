import figma, { html } from '@figma/code-connect/html';

// Carte DSFR : 9 sets utiles (Verticale × 3 tailles, Horizontale × 3 tailles × 2 avec/sans
// média), en thème clair uniquement. Les composants préfixés « ⚙️ » (Média, Zone d'action,
// Zone de précision, Détail, Badge ou tag, Contenu, Description) sont des atomes internes
// qui composent ces 9 sets → non connectés individuellement. Thème sombre = CSS seul.
// Focus, Survol, Cliqué = pseudo-états → ignorés. Support (Desktop/Mobile) = CSS responsive.
// « Cliquable = False » retire le lien : la carte devient un simple panneau d'information,
// non représentable en une seule input → non bindé, le lien reste présent dans tous les
// exemples (comportement par défaut le plus courant).

const imports = ["import { DsfrCardComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Verticale / LG ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_CARTE__VERTICALE_LG>', {
  props: {
    media: figma.boolean('Voir Média', {
      true: `\n  imagePath="assets/img/card.jpg"\n  imageAlt=""`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
  },
  example: ({ media, disabled }) =>
    html`<dsfr-card
  heading="Titre de la carte"
  description="Description de la carte."
  link="/page"
  panelSize="LG"${media}${disabled}></dsfr-card>`,
  imports,
});

// ─── Verticale / MD ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_CARTE__VERTICALE_MD>', {
  props: {
    media: figma.boolean('Voir Média', {
      true: `\n  imagePath="assets/img/card.jpg"\n  imageAlt=""`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
  },
  example: ({ media, disabled }) =>
    html`<dsfr-card
  heading="Titre de la carte"
  description="Description de la carte."
  link="/page"${media}${disabled}></dsfr-card>`,
  imports,
});

// ─── Verticale / SM ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_CARTE__VERTICALE_SM>', {
  props: {
    media: figma.boolean('Voir Média', {
      true: `\n  imagePath="assets/img/card.jpg"\n  imageAlt=""`,
      false: '',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
  },
  example: ({ media, disabled }) =>
    html`<dsfr-card
  heading="Titre de la carte"
  description="Description de la carte."
  link="/page"
  panelSize="SM"${media}${disabled}></dsfr-card>`,
  imports,
});

// ─── Horizontale / LG / Avec média ───────────────────────────────────────────
figma.connect('<FIGMA_CARTE__HORIZONTALE_LG_AVEC_MEDIA>', {
  props: {
    proportion: figma.enum('Proportions', {
      '33-66': ' horizontalProportion="1tier/2tier"',
      '40-60': '',
      '50-50': ' horizontalProportion="moitié/moitié"',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
  },
  example: ({ proportion, disabled }) =>
    html`<dsfr-card
  heading="Titre de la carte"
  description="Description de la carte."
  link="/page"
  imagePath="assets/img/card.jpg"
  imageAlt=""
  [horizontal]="true"
  panelSize="LG"${proportion}${disabled}></dsfr-card>`,
  imports,
});

// ─── Horizontale / LG / Sans média ───────────────────────────────────────────
figma.connect('<FIGMA_CARTE__HORIZONTALE_LG_SANS_MEDIA>', {
  props: {
    disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
  },
  example: ({ disabled }) =>
    html`<dsfr-card
  heading="Titre de la carte"
  description="Description de la carte."
  link="/page"
  [horizontal]="true"
  panelSize="LG"${disabled}></dsfr-card>`,
  imports,
});

// ─── Horizontale / MD / Avec média ───────────────────────────────────────────
figma.connect('<FIGMA_CARTE__HORIZONTALE_MD_AVEC_MEDIA>', {
  props: {
    proportion: figma.enum('Proportions', {
      '33-66': ' horizontalProportion="1tier/2tier"',
      '40-60': '',
      '50-50': ' horizontalProportion="moitié/moitié"',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
  },
  example: ({ proportion, disabled }) =>
    html`<dsfr-card
  heading="Titre de la carte"
  description="Description de la carte."
  link="/page"
  imagePath="assets/img/card.jpg"
  imageAlt=""
  [horizontal]="true"${proportion}${disabled}></dsfr-card>`,
  imports,
});

// ─── Horizontale / MD / Sans média ───────────────────────────────────────────
figma.connect('<FIGMA_CARTE__HORIZONTALE_MD_SANS_MEDIA>', {
  props: {
    disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
  },
  example: ({ disabled }) =>
    html`<dsfr-card
  heading="Titre de la carte"
  description="Description de la carte."
  link="/page"
  [horizontal]="true"${disabled}></dsfr-card>`,
  imports,
});

// ─── Horizontale / SM / Avec média ───────────────────────────────────────────
figma.connect('<FIGMA_CARTE__HORIZONTALE_SM_AVEC_MEDIA>', {
  props: {
    proportion: figma.enum('Proportions', {
      '33-66': ' horizontalProportion="1tier/2tier"',
      '40-60': '',
      '50-50': ' horizontalProportion="moitié/moitié"',
    }),
    disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
  },
  example: ({ proportion, disabled }) =>
    html`<dsfr-card
  heading="Titre de la carte"
  description="Description de la carte."
  link="/page"
  imagePath="assets/img/card.jpg"
  imageAlt=""
  [horizontal]="true"
  panelSize="SM"${proportion}${disabled}></dsfr-card>`,
  imports,
});

// ─── Horizontale / SM / Sans média ───────────────────────────────────────────
figma.connect('<FIGMA_CARTE__HORIZONTALE_SM_SANS_MEDIA>', {
  props: {
    disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
  },
  example: ({ disabled }) =>
    html`<dsfr-card
  heading="Titre de la carte"
  description="Description de la carte."
  link="/page"
  [horizontal]="true"
  panelSize="SM"${disabled}></dsfr-card>`,
  imports,
});
