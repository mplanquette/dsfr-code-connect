import figma, { html } from '@figma/code-connect/html';

// Carte de téléchargement DSFR : 8 sets (Desktop/Mobile × MD/SM × Avec/Sans média), thème
// clair uniquement. Desktop et Mobile ne diffèrent que par les pseudo-états CSS : même
// snippet. Les composants « ⚙️ » (Contenu, Corps, Zone de précision, Zone d'action, Média)
// sont des atomes internes → non connectés. Thème sombre = CSS seul.
// `download` bascule DsfrCard vers son rendu de téléchargement ; pas de props dédiées
// `downloadMimeType`/`downloadSizeBytes` côté vue-dsfr : la métadonnée se pose via `detail`
// (texte déjà formaté par le dev, ex. « PDF, 506 Ko »).
// « Désactivé » n'a pas d'équivalent dans `DsfrCardProps` (pas de prop `disabled`) → non
// bindé (contrairement à ngx-dsfr `[disabled]`).

const imports = ["import DsfrCard from '@gouvminint/vue-dsfr/DsfrCard.vue'"];

// ─── Desktop / MD / Sans média ───────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506467', {
  example: () =>
    html`<DsfrCard
    title="Nom du fichier"
    download
    link="/assets/fichier.pdf"
    detail="PDF, 506 Ko"
  />`,
  imports,
});

// ─── Desktop / SM / Sans média ───────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506480', {
  example: () =>
    html`<DsfrCard
    title="Nom du fichier"
    download
    link="/assets/fichier.pdf"
    detail="PDF, 506 Ko"
    size="sm"
  />`,
  imports,
});

// ─── Desktop / MD / Avec média ───────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506493', {
  example: () =>
    html`<DsfrCard
    title="Nom du fichier"
    download
    link="/assets/fichier.pdf"
    detail="PDF, 506 Ko"
    img-src="assets/img/card.jpg"
    alt-img=""
  />`,
  imports,
});

// ─── Desktop / SM / Avec média ───────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506511', {
  example: () =>
    html`<DsfrCard
    title="Nom du fichier"
    download
    link="/assets/fichier.pdf"
    detail="PDF, 506 Ko"
    img-src="assets/img/card.jpg"
    alt-img=""
    size="sm"
  />`,
  imports,
});

// ─── Mobile / SM / Sans média ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506618', {
  example: () =>
    html`<DsfrCard
    title="Nom du fichier"
    download
    link="/assets/fichier.pdf"
    detail="PDF, 506 Ko"
    size="sm"
  />`,
  imports,
});

// ─── Mobile / SM / Avec média ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506625', {
  example: () =>
    html`<DsfrCard
    title="Nom du fichier"
    download
    link="/assets/fichier.pdf"
    detail="PDF, 506 Ko"
    img-src="assets/img/card.jpg"
    alt-img=""
    size="sm"
  />`,
  imports,
});

// ─── Mobile / MD / Sans média ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506635', {
  example: () =>
    html`<DsfrCard
    title="Nom du fichier"
    download
    link="/assets/fichier.pdf"
    detail="PDF, 506 Ko"
  />`,
  imports,
});

// ─── Mobile / MD / Avec média ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506642', {
  example: () =>
    html`<DsfrCard
    title="Nom du fichier"
    download
    link="/assets/fichier.pdf"
    detail="PDF, 506 Ko"
    img-src="assets/img/card.jpg"
    alt-img=""
  />`,
  imports,
});
