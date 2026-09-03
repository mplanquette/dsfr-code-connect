import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement (le code se met à jour en Dev Mode) :
//   - Libellé   → prop `label`
//   - Désactivé → prop `disabled` (shorthand booléen, syntaxe de template Vue)
//   - Icône     → prop `icon` + `icon-right` / `icon-only` (Sans / Gauche / Droite / Seule)
// L'icône concrète (quelle Remix Icon) ne peut pas être dérivée du design : on pose un
// placeholder `fr-icon-arrow-right-line` que le dev remplace par l'icône voulue.
// « Seule » : `icon-only` masque le `<span>` du libellé, `label` sert alors uniquement de
// `title` accessible (géré nativement par DsfrButton, pas de simplification nécessaire ici).
// État (Défaut/Survol/Cliqué) et Focus sont des pseudo-états CSS : ils ne changent pas le markup.
// Variante (primaire/secondaire/tertiaire) et taille (SM/MD/LG) = component sets distincts.

const props = {
  label: figma.string('Libellé'),
  iconAttrs: figma.enum('Icône', {
    Sans: '',
    Gauche: ' icon="fr-icon-arrow-right-line"',
    Droite: ' icon="fr-icon-arrow-right-line" icon-right',
    Seule: ' icon="fr-icon-arrow-right-line" icon-only',
  }),
  disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
};
const imports = ["import DsfrButton from '@gouvminint/vue-dsfr/DsfrButton.vue'"];

// ─── Primaire MD ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=120-4762', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<DsfrButton label="${label}"${iconAttrs}${disabled} />`,
  imports,
});

// ─── Primaire SM ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16461-202688', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<DsfrButton label="${label}" size="sm"${iconAttrs}${disabled} />`,
  imports,
});

// ─── Primaire LG ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16461-202690', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<DsfrButton label="${label}" size="lg"${iconAttrs}${disabled} />`,
  imports,
});

// ─── Secondaire MD ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16476-239293', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<DsfrButton label="${label}" secondary${iconAttrs}${disabled} />`,
  imports,
});

// ─── Secondaire SM ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16478-193853', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<DsfrButton label="${label}" secondary size="sm"${iconAttrs}${disabled} />`,
  imports,
});

// ─── Secondaire LG ─────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16476-239295', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<DsfrButton label="${label}" secondary size="lg"${iconAttrs}${disabled} />`,
  imports,
});

// ─── Tertiaire MD ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=11119-73323', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<DsfrButton label="${label}" tertiary${iconAttrs}${disabled} />`,
  imports,
});

// ─── Tertiaire SM ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16483-192400', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<DsfrButton label="${label}" tertiary size="sm"${iconAttrs}${disabled} />`,
  imports,
});

// ─── Tertiaire LG ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=16483-192402', {
  props,
  example: ({ label, iconAttrs, disabled }) => html`<DsfrButton label="${label}" tertiary size="lg"${iconAttrs}${disabled} />`,
  imports,
});
