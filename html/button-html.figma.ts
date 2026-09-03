import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement (le code se met à jour en Dev Mode) :
//   - Libellé   → texte du bouton
//   - Désactivé → attribut disabled
//   - Icône     → position de l'icône (Sans / Gauche / Droite / Seule)
// L'icône concrète (quelle Remix Icon) ne peut pas être dérivée du design : on pose un
// placeholder `fr-icon-arrow-right-line` que le dev remplace par l'icône voulue.
// État (Défaut/Survol/Cliqué) et Focus sont des pseudo-états CSS : ils ne changent pas le markup.
// Variante (primaire/secondaire/tertiaire) et taille (sm/md/lg) = component sets distincts.

const props = {
  label: figma.string('Libellé'),
  iconClass: figma.enum('Icône', {
    Sans: '',
    Gauche: ' fr-btn--icon-left fr-icon-arrow-right-line',
    Droite: ' fr-btn--icon-right fr-icon-arrow-right-line',
    Seule: ' fr-icon-arrow-right-line',
  }),
  disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
};

// ─── Primaire MD ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=120-4762', {
  props,
  example: ({ label, iconClass, disabled }) => html`<button class="fr-btn${iconClass}" type="button"${disabled}>${label}</button>`,
});

// ─── Primaire SM ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16461-202688', {
  props,
  example: ({ label, iconClass, disabled }) => html`<button class="fr-btn fr-btn--sm${iconClass}" type="button"${disabled}>${label}</button>`,
});

// ─── Primaire LG ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16461-202690', {
  props,
  example: ({ label, iconClass, disabled }) => html`<button class="fr-btn fr-btn--lg${iconClass}" type="button"${disabled}>${label}</button>`,
});

// ─── Secondaire MD ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16476-239293', {
  props,
  example: ({ label, iconClass, disabled }) => html`<button class="fr-btn fr-btn--secondary${iconClass}" type="button"${disabled}>${label}</button>`,
});

// ─── Secondaire SM ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16478-193853', {
  props,
  example: ({ label, iconClass, disabled }) => html`<button class="fr-btn fr-btn--secondary fr-btn--sm${iconClass}" type="button"${disabled}>${label}</button>`,
});

// ─── Secondaire LG ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16476-239295', {
  props,
  example: ({ label, iconClass, disabled }) => html`<button class="fr-btn fr-btn--secondary fr-btn--lg${iconClass}" type="button"${disabled}>${label}</button>`,
});

// ─── Tertiaire MD ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=11119-73323', {
  props,
  example: ({ label, iconClass, disabled }) => html`<button class="fr-btn fr-btn--tertiary${iconClass}" type="button"${disabled}>${label}</button>`,
});

// ─── Tertiaire SM ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16483-192400', {
  props,
  example: ({ label, iconClass, disabled }) => html`<button class="fr-btn fr-btn--tertiary fr-btn--sm${iconClass}" type="button"${disabled}>${label}</button>`,
});

// ─── Tertiaire LG ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16483-192402', {
  props,
  example: ({ label, iconClass, disabled }) => html`<button class="fr-btn fr-btn--tertiary fr-btn--lg${iconClass}" type="button"${disabled}>${label}</button>`,
});
