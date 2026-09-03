import figma, { html } from '@figma/code-connect/html';

// Modale DSFR : 3 sets (Desktop, Mobile, Surcouche). Thème = CSS seul.
// La Surcouche est le fond assombri, indissociable de la modale → même snippet.
// Le rendu Mobile est responsive : `mobileTop` ancre la modale en haut de l'écran.
// « Contenu Défaut / Personnalisé » ne change que le contenu projeté → non bindé.
// L'icône concrète n'est pas dérivable du design : placeholder fr-icon-warning-line.
// Rappel accessibilité : `dsfr-modal` gère nativement le piège de focus (RGAA 7.1).

const imports = ["import { DsfrModalComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=447-7149', {
  props: {
    size: figma.enum('Taille', { SM: ' modalSize="SM"', MD: '', LG: ' modalSize="LG"' }),
    icon: figma.boolean('Icône titre', { true: ' icon="fr-icon-warning-line"', false: '' }),
    actions: figma.enum('Boutons', {
      Sans: '',
      '1': `\n  [actions]="[{ label: 'Confirmer', callback: onConfirm }]"`,
      '2': `\n  [actions]="[
    { label: 'Annuler', variant: 'secondary', callback: onCancel },
    { label: 'Confirmer', callback: onConfirm }
  ]"`,
    }),
  },
  example: ({ size, icon, actions }) =>
    html`<dsfr-modal
  dialogId="modal"
  titleModal="Titre de la modale"${icon}${size}${actions}>
  Contenu de la modale.
</dsfr-modal>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=447-7150', {
  props: {
    icon: figma.boolean('Icône titre', { true: ' icon="fr-icon-warning-line"', false: '' }),
    actions: figma.enum('Boutons', {
      Sans: '',
      '1': `\n  [actions]="[{ label: 'Confirmer', callback: onConfirm }]"`,
      '2': `\n  [actions]="[
    { label: 'Annuler', variant: 'secondary', callback: onCancel },
    { label: 'Confirmer', callback: onConfirm }
  ]"`,
    }),
  },
  example: ({ icon, actions }) =>
    html`<dsfr-modal
  dialogId="modal"
  titleModal="Titre de la modale"
  [mobileTop]="true"${icon}${actions}>
  Contenu de la modale.
</dsfr-modal>`,
  imports,
});

// ─── Surcouche ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=447-7151', {
  example: () =>
    html`<dsfr-modal
  dialogId="modal"
  titleModal="Titre de la modale"
  [concealingBackdrop]="true"
  [actions]="[{ label: 'Confirmer', callback: onConfirm }]">
  Contenu de la modale.
</dsfr-modal>`,
  imports,
});
