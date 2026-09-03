import figma, { html } from '@figma/code-connect/html';

// Carte de téléchargement DSFR : 8 sets (Desktop/Mobile × MD/SM × Avec/Sans média),
// thème clair uniquement. Desktop et Mobile ne diffèrent que par Focus et le nombre
// d'états pseudo-CSS : même snippet. Les composants « ⚙️ » (Contenu, Corps, Zone de
// précision, Zone d'action, Média) sont des atomes internes → non connectés.
// Thème sombre = CSS seul. Focus, Survol, Cliqué = pseudo-états → ignorés.
// `[download]="true"` bascule dsfr-card vers son rendu de téléchargement.

const imports = ["import { DsfrCardComponent } from '@edugouvfr/ngx-dsfr'"];

const props = {
  media: figma.boolean('Voir Média', {
    true: `\n  imagePath="assets/img/card.jpg"\n  imageAlt=""`,
    false: '',
  }),
  disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }),
};

// ─── Desktop / MD / Sans média ───────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506467', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<dsfr-card
  heading="Nom du fichier"
  [download]="true"
  link="/assets/fichier.pdf"
  downloadMimeType="application/pdf"
  [downloadSizeBytes]="518000"${disabled}></dsfr-card>`,
  imports,
});

// ─── Desktop / SM / Sans média ───────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506480', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<dsfr-card
  heading="Nom du fichier"
  [download]="true"
  link="/assets/fichier.pdf"
  downloadMimeType="application/pdf"
  [downloadSizeBytes]="518000"
  panelSize="SM"${disabled}></dsfr-card>`,
  imports,
});

// ─── Desktop / MD / Avec média ───────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506493', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<dsfr-card
  heading="Nom du fichier"
  [download]="true"
  link="/assets/fichier.pdf"
  downloadMimeType="application/pdf"
  [downloadSizeBytes]="518000"
  imagePath="assets/img/card.jpg"
  imageAlt=""${disabled}></dsfr-card>`,
  imports,
});

// ─── Desktop / SM / Avec média ───────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506511', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<dsfr-card
  heading="Nom du fichier"
  [download]="true"
  link="/assets/fichier.pdf"
  downloadMimeType="application/pdf"
  [downloadSizeBytes]="518000"
  imagePath="assets/img/card.jpg"
  imageAlt=""
  panelSize="SM"${disabled}></dsfr-card>`,
  imports,
});

// ─── Mobile / SM / Sans média ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506618', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<dsfr-card
  heading="Nom du fichier"
  [download]="true"
  link="/assets/fichier.pdf"
  downloadMimeType="application/pdf"
  [downloadSizeBytes]="518000"
  panelSize="SM"${disabled}></dsfr-card>`,
  imports,
});

// ─── Mobile / SM / Avec média ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506625', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<dsfr-card
  heading="Nom du fichier"
  [download]="true"
  link="/assets/fichier.pdf"
  downloadMimeType="application/pdf"
  [downloadSizeBytes]="518000"
  imagePath="assets/img/card.jpg"
  imageAlt=""
  panelSize="SM"${disabled}></dsfr-card>`,
  imports,
});

// ─── Mobile / MD / Sans média ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506635', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<dsfr-card
  heading="Nom du fichier"
  [download]="true"
  link="/assets/fichier.pdf"
  downloadMimeType="application/pdf"
  [downloadSizeBytes]="518000"${disabled}></dsfr-card>`,
  imports,
});

// ─── Mobile / MD / Avec média ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506642', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  [disabled]="true"', false: '' }) },
  example: ({ disabled }) =>
    html`<dsfr-card
  heading="Nom du fichier"
  [download]="true"
  link="/assets/fichier.pdf"
  downloadMimeType="application/pdf"
  [downloadSizeBytes]="518000"
  imagePath="assets/img/card.jpg"
  imageAlt=""${disabled}></dsfr-card>`,
  imports,
});
