import figma, { html } from '@figma/code-connect/html';

// Liens d'évitement DSFR : 1 set. Thème et Support = CSS seul → snippet unique.
// Le composant n'est visible qu'à la prise de focus clavier (RGAA 12.7).
// Le tableau `links` est déclaré avant le JSX : le parser Code Connect (HTML générique)
// interprète toute valeur d'attribut contenant plusieurs objets comme une liste
// d'attributs HTML et lève une erreur « Duplicate attribute name » (label répété).

figma.connect('<FIGMA_LIEN_D_EVITEMENT__LIENS_D_EVITEMENT>', {
  example: () =>
    html`const links = [
  { label: 'Contenu', anchor: '#contenu' },
  { label: 'Menu', anchor: '#menu' },
  { label: 'Pied de page', anchor: '#footer' }
];

<SkipLinks links={links} />`,
  imports: ["import { SkipLinks } from '@codegouvfr/react-dsfr/SkipLinks'"],
});
