import figma, { html } from '@figma/code-connect/html';

// Fil d'Ariane DSFR : 2 sets (Complet, Item). Thème = CSS seul → non bindé.
// « État Déployé / Condensé » est géré en interne par `Breadcrumb` (collapse) → snippet identique.
// react-dsfr n'a pas de sous-composant "item" dédié : le set Item montre le composant parent
// configuré pour produire l'item demandé (`segments[]` + `currentPageLabel`), comme côté Angular.

const imports = ["import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'"];

// ─── Complet ─────────────────────────────────────────────────────────────────
// Le tableau de segments est déclaré avant le JSX : le parser Code Connect (HTML générique)
// interprète toute valeur d'attribut multiligne contenant plusieurs objets comme une liste
// d'attributs HTML et lève une erreur « Duplicate attribute name » (label/href répétés).
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=139-115', {
  example: () =>
    html`const segments = [
  { label: 'Rubrique', linkProps: { href: '/rubrique' } },
  { label: 'Sous-rubrique', linkProps: { href: '/rubrique/sous-rubrique' } }
];

<Breadcrumb homeLinkProps={{ href: '/accueil' }} segments={segments} currentPageLabel="Page courante" />`,
  imports,
});

// ─── Item ────────────────────────────────────────────────────────────────────
// « Type Parent » = un segment ; « Type En cours » = currentPageLabel seul (dernier item, sans lien).
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=139-77', {
  props: {
    segment: figma.enum('Type', {
      Parent: `{ label: 'Rubrique', linkProps: { href: '/rubrique' } }`,
      'En cours': '',
    }),
  },
  example: ({ segment }) =>
    html`<Breadcrumb segments={[${segment}]} currentPageLabel="Page courante" />`,
  imports,
});
