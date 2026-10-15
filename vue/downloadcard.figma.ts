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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_DESKTOP_MD_SANS_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_DESKTOP_SM_SANS_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_DESKTOP_MD_AVEC_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_DESKTOP_SM_AVEC_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_MOBILE_SM_SANS_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_MOBILE_SM_AVEC_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_MOBILE_MD_SANS_MEDIA>', {
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
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__CARTE_MOBILE_MD_AVEC_MEDIA>', {
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
