import figma, { html } from '@figma/code-connect/html';

// Lien de téléchargement DSFR : 2 sets (lien seul, groupe). Thème et Support = CSS
// seul/responsive. « Puce » et « 2 lignes » illustrent des variations de longueur de
// texte de démonstration Figma, non pilotables par une input → non bindées.

// ─── Lien de téléchargement (seul) ───────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__LIEN_LIEN_DE_TELECHARGEMENT>', {
  example: () =>
    html`<dsfr-download
  fileName="Nom du fichier"
  link="/assets/fichier.pdf"
  mimeType="application/pdf"
  [sizeBytes]="518000"></dsfr-download>`,
  imports: ["import { DsfrDownloadComponent } from '@edugouvfr/ngx-dsfr'"],
});

// ─── Lien de téléchargement - Groupe ──────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__LIEN_LIEN_DE_TELECHARGEMENT_GROUPE>', {
  props: {
    heading: figma.boolean('Titre', { true: ' heading="Titre du groupe"', false: '' }),
  },
  example: ({ heading }) =>
    html`<dsfr-downloads-group aria-label="Groupe de téléchargements"${heading}
  [downloads]="[
    { fileName: 'Premier fichier', link: '/assets/fichier-1.pdf', mimeType: 'application/pdf', sizeBytes: 518000 },
    { fileName: 'Deuxième fichier', link: '/assets/fichier-2.docx', mimeType: 'application/msword', sizeBytes: 214000 }
  ]"></dsfr-downloads-group>`,
  imports: ["import { DsfrDownloadsGroupComponent } from '@edugouvfr/ngx-dsfr'"],
});
