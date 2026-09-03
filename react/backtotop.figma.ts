import figma, { html } from '@figma/code-connect/html';

// Retour en haut de page DSFR : 1 set, sans aucune input.
// Survol, Cliqué, Focus et Désactivé = pseudo-états → snippet unique.
// Aucun composant react-dsfr dédié (pas de `BackToTop.tsx` dans le repo codegouvfr/react-dsfr) :
// on reprend le markup DSFR brut déjà utilisé côté html/, traduit en JSX (class → className).

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16302-202695', {
  example: () =>
    html`<a className="fr-link fr-icon-arrow-up-fill fr-link--icon-left" href="#top">Haut de page</a>`,
});
