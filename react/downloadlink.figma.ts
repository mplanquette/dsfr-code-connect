import figma, { html } from '@figma/code-connect/html';

// Lien de téléchargement DSFR : 2 sets (lien seul, groupe). Thème et Support = CSS
// seul/responsive. « Puce » et « 2 lignes » illustrent des variations de longueur de
// texte de démonstration Figma, non pilotables par une prop → non bindées.
// react-dsfr n'a pas de composant « groupe de téléchargements » dédié (pas
// d'équivalent à `dsfr-downloads-group`) : le groupe est reconstitué en juxtaposant
// plusieurs `<Download>` sous un titre optionnel, structure la plus proche du rendu
// DSFR attendu (à ajuster par le dev selon le layout réel voulu).

// ─── Lien de téléchargement (seul) ───────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__LIEN_LIEN_DE_TELECHARGEMENT>', {
  example: () =>
    html`<Download
  label="Nom du fichier"
  details="PDF, 518 Ko"
  linkProps={{ href: '/assets/fichier.pdf' }} />`,
  imports: ["import { Download } from '@codegouvfr/react-dsfr/Download'"],
});

// ─── Lien de téléchargement - Groupe ──────────────────────────────────────────
figma.connect('<FIGMA_TELECHARGEMENT_DE_FICHIER__LIEN_LIEN_DE_TELECHARGEMENT_GROUPE>', {
  props: {
    heading: figma.boolean('Titre', { true: '<p className="fr-h6">Titre du groupe</p>\n    ', false: '' }),
  },
  example: ({ heading }) =>
    html`<div role="group" aria-label="Groupe de téléchargements">
    ${heading}<Download label="Premier fichier" details="PDF, 518 Ko" linkProps={{ href: '/assets/fichier-1.pdf' }} />
    <Download label="Deuxième fichier" details="DOCX, 214 Ko" linkProps={{ href: '/assets/fichier-2.docx' }} />
  </div>`,
  imports: ["import { Download } from '@codegouvfr/react-dsfr/Download'"],
});
