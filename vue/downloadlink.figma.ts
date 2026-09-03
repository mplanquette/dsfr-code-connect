import figma, { html } from '@figma/code-connect/html';

// Lien de téléchargement DSFR : 2 sets (lien seul, groupe). Thème et Support = CSS
// seul/responsive. « Puce » et « 2 lignes » illustrent des variations de longueur de
// texte de démonstration Figma, non pilotables par une prop → non bindées.
// vue-dsfr n'a pas de props `mimeType`/`sizeBytes` séparées : `format` et `size` sont de
// simples chaînes affichées telles quelles (déjà formatées par le dev, ex. « PDF, 506 Ko »
// devient `format="PDF"` + `size="506 Ko"`).

// ─── Lien de téléchargement (seul) ───────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506422', {
  example: () =>
    html`<DsfrFileDownload
    title="Nom du fichier"
    format="PDF"
    size="506 Ko"
    href="/assets/fichier.pdf"
    download="fichier.pdf"
  />`,
  imports: ["import DsfrFileDownload from '@gouvminint/vue-dsfr/DsfrFileDownload.vue'"],
});

// ─── Lien de téléchargement - Groupe ──────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506343', {
  props: {
    title: figma.boolean('Titre', { true: 'Titre du groupe', false: '' }),
  },
  example: ({ title }) =>
    html`<DsfrFileDownloadList
    title="${title}"
    :files="[
      { title: 'Premier fichier', format: 'PDF', size: '506 Ko', href: '/assets/fichier-1.pdf', download: 'fichier-1.pdf' },
      { title: 'Deuxième fichier', format: 'DOCX', size: '214 Ko', href: '/assets/fichier-2.docx', download: 'fichier-2.docx' }
    ]"
  />`,
  imports: ["import DsfrFileDownloadList from '@gouvminint/vue-dsfr/DsfrFileDownloadList.vue'"],
});
