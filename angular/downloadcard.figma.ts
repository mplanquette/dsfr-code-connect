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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_DESKTOP_MD_SANS_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_DESKTOP_SM_SANS_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_DESKTOP_MD_AVEC_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_DESKTOP_SM_AVEC_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_MOBILE_SM_SANS_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_MOBILE_SM_AVEC_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_MOBILE_MD_SANS_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_MOBILE_MD_AVEC_MEDIA>', {
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
