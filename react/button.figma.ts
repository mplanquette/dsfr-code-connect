import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement (le code se met à jour en Dev Mode) :
//   - Libellé   → children (texte du bouton)
//   - Désactivé → prop [disabled]
//   - Icône     → iconId / iconPosition (Sans / Gauche / Droite / Seule)
// L'icône concrète (quelle Remix Icon) ne peut pas être dérivée du design : on pose un
// placeholder `fr-icon-arrow-right-line` que le dev remplace par l'icône voulue.
// « Seule » : react-dsfr n'accepte pas `children` avec un bouton icône seule (type `IconOnly`,
// le libellé passe alors par `title`), simplification alignée sur le pattern déjà retenu pour
// html/ (le libellé reste affiché en children), à adapter par le dev si un vrai bouton icône
// seule est nécessaire.
// État (Défaut/Survol/Cliqué) et Focus sont des pseudo-états CSS : ils ne changent pas le markup.
// Priorité (primary/secondary/tertiary) et taille (small/medium/large) = component sets distincts.

const props = {
  label: figma.string('Libellé'),
  iconAttrs: figma.enum('Icône', {
    Sans: '',
    Gauche: ' iconId="fr-icon-arrow-right-line" iconPosition="left"',
    Droite: ' iconId="fr-icon-arrow-right-line" iconPosition="right"',
    Seule: ' iconId="fr-icon-arrow-right-line"',
  }),
  disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
};
const imports = ["import { Button } from '@codegouvfr/react-dsfr/Button'"];

// ─── Primaire MD ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=120-4762', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<Button type="button"${iconAttrs}${disabled}>${label}</Button>`,
  imports,
});

// ─── Primaire SM ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16461-202688', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<Button size="small"${iconAttrs}${disabled}>${label}</Button>`,
  imports,
});

// ─── Primaire LG ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16461-202690', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<Button size="large"${iconAttrs}${disabled}>${label}</Button>`,
  imports,
});

// ─── Secondaire MD ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16476-239293', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<Button priority="secondary"${iconAttrs}${disabled}>${label}</Button>`,
  imports,
});

// ─── Secondaire SM ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16478-193853', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<Button priority="secondary" size="small"${iconAttrs}${disabled}>${label}</Button>`,
  imports,
});

// ─── Secondaire LG ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16476-239295', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<Button priority="secondary" size="large"${iconAttrs}${disabled}>${label}</Button>`,
  imports,
});

// ─── Tertiaire MD ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=11119-73323', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<Button priority="tertiary"${iconAttrs}${disabled}>${label}</Button>`,
  imports,
});

// ─── Tertiaire SM ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16483-192400', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<Button priority="tertiary" size="small"${iconAttrs}${disabled}>${label}</Button>`,
  imports,
});

// ─── Tertiaire LG ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16483-192402', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<Button priority="tertiary" size="large"${iconAttrs}${disabled}>${label}</Button>`,
  imports,
});
