import figma, { html } from '@figma/code-connect/html';

// Retour en haut de page DSFR : 1 set, sans aucune input.
// Survol, Cliqué, Focus et Désactivé = pseudo-états → snippet unique.
// Aucun composant react-dsfr dédié (pas de `BackToTop.tsx` dans le repo codegouvfr/react-dsfr) :
// on reprend le markup DSFR brut déjà utilisé côté html/, traduit en JSX (class → className).

figma.connect('<FIGMA_RETOUR_EN_HAUT_DE_PAGE__>', {
  example: () =>
    html`<a className="fr-link fr-icon-arrow-up-fill fr-link--icon-left" href="#top">Haut de page</a>`,
});
