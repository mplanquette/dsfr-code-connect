import figma, { html } from '@figma/code-connect/html';

// Modale DSFR : 3 sets (Desktop, Mobile, Surcouche). Thème = CSS seul.
// `DsfrModal` s'appuie sur l'élément natif <dialog> : contrairement à `dsfr-modal` (Angular) qui
// expose une prop `mobileTop`, le rendu Vue est responsive nativement sans variante de markup
// dédiée → Desktop et Mobile partagent le même snippet (comme les sets Mobile/Desktop du DSFR).
// La Surcouche (fond assombri) est également inhérente à <dialog>, indissociable de la modale →
// même snippet, ici illustré avec un jeu d'actions.
// « Contenu Défaut / Personnalisé » ne change que le contenu projeté → non bindé.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-warning-line.
// `:opened="true"` est ajouté en statique pour refléter l'état visible du design (pas de prop
// Figma dédiée côté Angular non plus, la visibilité étant pilotée par l'appli hôte).
// Rappel accessibilité : `DsfrModal` gère nativement le piège de focus (RGAA 7.1).

const imports = ["import DsfrModal from '@gouvminint/vue-dsfr/DsfrModal.vue'"];

const actionsProp = figma.enum('Boutons', {
  Sans: '',
  '1': ` :actions="[{ label: 'Confirmer', onClick: onConfirm }]"`,
  '2': ` :actions="[
    { label: 'Annuler', secondary: true, onClick: onCancel },
    { label: 'Confirmer', onClick: onConfirm }
  ]"`,
});

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_MODALE__MODALE_DESKTOP>', {
  props: {
    size: figma.enum('Taille', { SM: ' size="sm"', MD: '', LG: ' size="lg"' }),
    icon: figma.boolean('Icône titre', { true: ' icon="fr-icon-warning-line"', false: '' }),
    actions: actionsProp,
  },
  example: ({ size, icon, actions }) =>
    html`<DsfrModal
  modal-id="modal"
  title="Titre de la modale"
  :opened="true"${icon}${size}${actions}
>
  Contenu de la modale.
</DsfrModal>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_MODALE__MODALE_MOBILE>', {
  props: {
    icon: figma.boolean('Icône titre', { true: ' icon="fr-icon-warning-line"', false: '' }),
    actions: actionsProp,
  },
  example: ({ icon, actions }) =>
    html`<DsfrModal
  modal-id="modal"
  title="Titre de la modale"
  :opened="true"${icon}${actions}
>
  Contenu de la modale.
</DsfrModal>`,
  imports,
});

// ─── Surcouche ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_MODALE__MODALE_SURCOUCHE>', {
  example: () =>
    html`<DsfrModal
  modal-id="modal"
  title="Titre de la modale"
  :opened="true"
  :actions="[{ label: 'Confirmer', onClick: onConfirm }]"
>
  Contenu de la modale.
</DsfrModal>`,
  imports,
});
