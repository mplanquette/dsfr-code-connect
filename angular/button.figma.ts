import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement (le code se met à jour en Dev Mode) :
//   - Libellé   → texte / input label
//   - Désactivé → input [disabled]
//   - Icône     → position de l'icône (Sans / Gauche / Droite / Seule)
// L'icône concrète (quelle Remix Icon) ne peut pas être dérivée du design : on pose un
// placeholder `fr-icon-arrow-right-line` que le dev remplace par l'icône voulue.
// « Seule » = bouton icône seule → libellé masqué visuellement mais accessible ([labelSrOnly]).
// État (Défaut/Survol/Cliqué) et Focus sont des pseudo-états CSS : ils ne changent pas le markup.
// Variante (primaire/secondaire/tertiaire) et taille (SM/MD/LG) = component sets distincts.

const props = {
  label: figma.string('Libellé'),
  iconAttrs: figma.enum('Icône', {
    Sans: '',
    Gauche: ' icon="fr-icon-arrow-right-line" iconPosition="left"',
    Droite: ' icon="fr-icon-arrow-right-line" iconPosition="right"',
    Seule: ' icon="fr-icon-arrow-right-line" [labelSrOnly]="true"',
  }),
  disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
};
const imports = ["import { DsfrButtonComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Primaire MD ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=120-4762', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<dsfr-button label="${label}" variant="primary" size="MD"${iconAttrs}${disabled}></dsfr-button>`,
  imports,
});

// ─── Primaire SM ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16461-202688', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<dsfr-button label="${label}" variant="primary" size="SM"${iconAttrs}${disabled}></dsfr-button>`,
  imports,
});

// ─── Primaire LG ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16461-202690', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<dsfr-button label="${label}" variant="primary" size="LG"${iconAttrs}${disabled}></dsfr-button>`,
  imports,
});

// ─── Secondaire MD ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16476-239293', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<dsfr-button label="${label}" variant="secondary" size="MD"${iconAttrs}${disabled}></dsfr-button>`,
  imports,
});

// ─── Secondaire SM ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16478-193853', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<dsfr-button label="${label}" variant="secondary" size="SM"${iconAttrs}${disabled}></dsfr-button>`,
  imports,
});

// ─── Secondaire LG ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16476-239295', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<dsfr-button label="${label}" variant="secondary" size="LG"${iconAttrs}${disabled}></dsfr-button>`,
  imports,
});

// ─── Tertiaire MD ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=11119-73323', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<dsfr-button label="${label}" variant="tertiary" size="MD"${iconAttrs}${disabled}></dsfr-button>`,
  imports,
});

// ─── Tertiaire SM ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16483-192400', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<dsfr-button label="${label}" variant="tertiary" size="SM"${iconAttrs}${disabled}></dsfr-button>`,
  imports,
});

// ─── Tertiaire LG ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16483-192402', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<dsfr-button label="${label}" variant="tertiary" size="LG"${iconAttrs}${disabled}></dsfr-button>`,
  imports,
});
