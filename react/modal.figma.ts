import figma, { html } from '@figma/code-connect/html';

// Modale DSFR : 3 sets (Desktop, Mobile, Surcouche). Thème = CSS seul.
// La Surcouche est le fond assombri, indissociable de la modale → même snippet.
// Le rendu Mobile est responsive : `topAnchor` ancre la modale en haut de l'écran.
// « Contenu Défaut / Personnalisé » ne change que le contenu projeté → non bindé.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-warning-line.
// react-dsfr expose `Modal` via `createModal()` (`const modal = createModal({ id, isOpenedByDefault })`
// puis `<modal.Component title="…">…</modal.Component>`) : par souci de lisibilité en Dev Mode, le
// snippet montre directement `<modal.Component>` avec ses props, sans la déclaration `createModal`
// complète (le dev doit la créer une fois hors composant, cf. doc react-dsfr).
// `size` = "small" | "medium" | "large" (pas SM/MD/LG comme ngx-dsfr). `buttons` prend un tableau
// de `ButtonProps` (donc `priority`, pas `variant`).
// Rappel accessibilité : `Modal` gère nativement le piège de focus (RGAA 7.1).

const imports = ["import { createModal } from '@codegouvfr/react-dsfr/Modal'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_MODALE__MODALE_DESKTOP>', {
  props: {
    size: figma.enum('Taille', { SM: ' size="small"', MD: '', LG: ' size="large"' }),
    icon: figma.boolean('Icône titre', { true: ' iconId="fr-icon-warning-line"', false: '' }),
    buttons: figma.enum('Boutons', {
      Sans: 'undefined',
      '1': `{ children: 'Confirmer' }`,
      '2': `[{ children: 'Annuler', priority: 'secondary' }, { children: 'Confirmer' }]`,
    }),
  },
  example: ({ size, icon, buttons }) =>
    html`const buttons = ${buttons};

<modal.Component
  title="Titre de la modale"${icon}${size} buttons={buttons}>
  Contenu de la modale.
</modal.Component>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_MODALE__MODALE_MOBILE>', {
  props: {
    icon: figma.boolean('Icône titre', { true: ' iconId="fr-icon-warning-line"', false: '' }),
    buttons: figma.enum('Boutons', {
      Sans: 'undefined',
      '1': `{ children: 'Confirmer' }`,
      '2': `[{ children: 'Annuler', priority: 'secondary' }, { children: 'Confirmer' }]`,
    }),
  },
  example: ({ icon, buttons }) =>
    html`const buttons = ${buttons};

<modal.Component
  title="Titre de la modale"
  topAnchor${icon} buttons={buttons}>
  Contenu de la modale.
</modal.Component>`,
  imports,
});

// ─── Surcouche ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_MODALE__MODALE_SURCOUCHE>', {
  example: () =>
    html`const buttons = { children: 'Confirmer' };

<modal.Component
  title="Titre de la modale"
  buttons={buttons}>
  Contenu de la modale.
</modal.Component>`,
  imports,
});
