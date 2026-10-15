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
figma.connect('<FIGMA_ONGLET__ONGLET_ITEM>', {
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
figma.connect('<FIGMA_ONGLET__ONGLET_GROUPE>', {
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
figma.connect('<FIGMA_ONGLET__ONGLET_COMPLET>', {
  example: () =>
    html`const tabs = [
  { label: 'Premier onglet', content: 'Contenu du premier onglet', isDefault: true },
  { label: 'Deuxième onglet', content: 'Contenu du deuxième onglet' }
];

<Tabs label="Libellé du groupe d'onglets" tabs={tabs} />`,
  imports,
});
