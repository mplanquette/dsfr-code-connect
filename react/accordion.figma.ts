import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement (le code se met à jour en Dev Mode) :
//   - État → `defaultExpanded` sur l'Accordion (Ouvert = présent, Défaut/Survol = absent)
// Thème (Clair/Sombre) = tokens CSS uniquement, pas de markup différent.
// Survol = pseudo-état CSS : ignoré (même markup que Défaut).
// Support (Desktop/Mobile sur le Groupe) = responsive uniquement, pas de markup différent.
// react-dsfr expose `Accordion` en variante contrôlée (`expanded` + `onExpandedChange`
// obligatoires) ou non contrôlée (`defaultExpanded`) : on retient la version non contrôlée,
// plus proche d'un simple exemple statique, alignée sur la simplification déjà actée côté
// bouton (react/button.figma.ts). Aucun composant `AccordionsGroup` n'existe côté
// react-dsfr : le Groupe est un simple conteneur `<div className="fr-accordions-group">`
// autour de plusieurs `<Accordion>`, comme côté html/.

// ─── Desktop (État: Défaut / Survol / Ouvert) ─────────────────────────────────
const desktopProps = {
  expanded: figma.enum('État', {
    'Défaut': '',
    'Survol': '',
    'Ouvert': ' defaultExpanded',
  }),
};

// ─── Mobile (État: Défaut / Ouvert, pas de Survol) ───────────────────────────
const mobileProps = {
  expanded: figma.enum('État', {
    'Défaut': '',
    'Ouvert': ' defaultExpanded',
  }),
};

const accordionImports = ["import { Accordion } from '@codegouvfr/react-dsfr/Accordion'"];

// ─── Accordéon - Desktop ──────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=128-27', {
  props: desktopProps,
  example: ({ expanded }) => html`<Accordion label="Intitulé accordéon"${expanded}>Contenu de l'accordéon</Accordion>`,
  imports: accordionImports,
});

// ─── Accordéon - Mobile ───────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=128-110', {
  props: mobileProps,
  example: ({ expanded }) => html`<Accordion label="Intitulé accordéon"${expanded}>Contenu de l'accordéon</Accordion>`,
  imports: accordionImports,
});

// ─── Accordéon - Groupe ───────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=128-600', {
  example: () => html`
<div className="fr-accordions-group">
  <Accordion label="Intitulé 1">Contenu de l'accordéon 1</Accordion>
  <Accordion label="Intitulé 2">Contenu de l'accordéon 2</Accordion>
  <Accordion label="Intitulé 3">Contenu de l'accordéon 3</Accordion>
</div>`,
  imports: accordionImports,
});
