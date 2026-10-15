import figma, { html } from '@figma/code-connect/html';

// Lien de téléchargement DSFR : 2 sets (lien seul, groupe). Thème et Support = CSS
// seul/responsive. « Puce » et « 2 lignes » illustrent des variations de longueur de
// texte de démonstration Figma, non pilotables par une classe → non bindées.

// ─── Lien de téléchargement (seul) ───────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__LIEN_LIEN_DE_TELECHARGEMENT>', {
  example: () =>
    html`<a class="fr-link fr-link--download" href="/assets/fichier.pdf" download="fichier.pdf">
  Télécharger
  <span class="fr-link__detail">Nom du fichier, PDF, 506 Ko</span>
</a>`,
});

// ─── Lien de téléchargement - Groupe ──────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__LIEN_LIEN_DE_TELECHARGEMENT_GROUPE>', {
  props: {
    title: figma.boolean('Titre', {
      true: `\n  <h4 class="fr-downloads-group__title">Titre du groupe</h4>`,
      false: '',
    }),
  },
  example: ({ title }) =>
    html`<div class="fr-downloads-group">${title}
  <ul class="fr-links-group">
    <li>
      <a class="fr-link fr-link--download" href="/assets/fichier-1.pdf" download="fichier-1.pdf">
        Télécharger
        <span class="fr-link__detail">Premier fichier, PDF, 506 Ko</span>
      </a>
    </li>
    <li>
      <a class="fr-link fr-link--download" href="/assets/fichier-2.docx" download="fichier-2.docx">
        Télécharger
        <span class="fr-link__detail">Deuxième fichier, DOCX, 214 Ko</span>
      </a>
    </li>
  </ul>
</div>`,
});
