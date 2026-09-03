import figma, { html } from '@figma/code-connect/html';

// Onglet DSFR : 3 sets (Item, Groupe, Complet). Thème et Support = CSS seul.
// Survol = pseudo-état → ignoré.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-checkbox-line.
// `Tabs` (react-dsfr) prend `tabs: { label, content, iconId?, isDefault? }[]` (variante non
// contrôlée) : pas de sous-composant "Tab" comme `dsfr-tab` côté Angular.
// Groupe/Complet : le tableau `tabs` est déclaré avant le JSX (plusieurs objets partageant les
// clés label/content font échouer le parser HTML générique avec « Duplicate attribute name »
// s'ils restent inline sur plusieurs lignes dans l'attribut).

const imports = ["import { Tabs } from '@codegouvfr/react-dsfr/Tabs'"];

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=502-145', {
  props: {
    icon: figma.boolean('Icône', { true: ", iconId: 'fr-icon-checkbox-line'", false: '' }),
    selected: figma.enum('État', { Défaut: 'false', Courant: 'true', Survol: 'false' }),
  },
  example: ({ icon, selected }) =>
    html`const tabs = [
  { label: "Libellé de l'onglet", content: "Contenu de l'onglet", isDefault: ${selected}${icon} }
];

<Tabs label="Libellé du groupe d'onglets" tabs={tabs} />`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=502-340', {
  props: {
    icon: figma.boolean('Icône', { true: ", iconId: 'fr-icon-checkbox-line'", false: '' }),
  },
  example: ({ icon }) =>
    html`const tabs = [
  { label: 'Premier onglet', content: 'Contenu du premier onglet', isDefault: true${icon} },
  { label: 'Deuxième onglet', content: 'Contenu du deuxième onglet'${icon} },
  { label: 'Troisième onglet', content: 'Contenu du troisième onglet'${icon} }
];

<Tabs label="Libellé du groupe d'onglets" tabs={tabs} />`,
  imports,
});

// ─── Complet ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=505-90', {
  example: () =>
    html`const tabs = [
  { label: 'Premier onglet', content: 'Contenu du premier onglet', isDefault: true },
  { label: 'Deuxième onglet', content: 'Contenu du deuxième onglet' }
];

<Tabs label="Libellé du groupe d'onglets" tabs={tabs} />`,
  imports,
});
