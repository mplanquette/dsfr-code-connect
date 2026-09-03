import figma, { html } from '@figma/code-connect/html';

// Badge DSFR : 12 composants Figma standalone (6 couleurs × 2 tailles, Thème clair uniquement).
// Thème (Clair/Sombre) = CSS uniquement → seuls les nodes Thème clair sont connectés.
// noIcon = override d'instance Figma non bindable → icône de sévérité affichée par défaut.
// Badge Personnalisable : DsfrBadge n'a pas de prop `customClass` (uniquement `type` parmi les
// 5 sévérités fixes) → on passe la classe couleur en `class` statique sur le composant : Vue
// fusionne automatiquement cet attribut de fallthrough avec la classe `fr-badge` du template
// racine (comportement par défaut, pas besoin de `customClass`).

const imports = ["import DsfrBadge from '@gouvminint/vue-dsfr/DsfrBadge.vue'"];

// ─── Information MD ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510838', {
  example: () => html`<DsfrBadge label="Information" type="info" />`,
  imports,
});

// ─── Succès MD ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510850', {
  example: () => html`<DsfrBadge label="Succès" type="success" />`,
  imports,
});

// ─── Avertissement MD ────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510842', {
  example: () => html`<DsfrBadge label="Avertissement" type="warning" />`,
  imports,
});

// ─── Erreur MD ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510846', {
  example: () => html`<DsfrBadge label="Erreur" type="error" />`,
  imports,
});

// ─── Nouveau MD ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510834', {
  example: () => html`<DsfrBadge label="Nouveau" type="new" />`,
  imports,
});

// ─── Personnalisable MD ──────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510832', {
  example: () => html`<DsfrBadge label="Personnalisable" class="fr-badge--blue-cumulus" />`,
  imports,
});

// ─── Information SM ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510860', {
  example: () => html`<DsfrBadge label="Information" type="info" small />`,
  imports,
});

// ─── Succès SM ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510872', {
  example: () => html`<DsfrBadge label="Succès" type="success" small />`,
  imports,
});

// ─── Avertissement SM ────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510864', {
  example: () => html`<DsfrBadge label="Avertissement" type="warning" small />`,
  imports,
});

// ─── Erreur SM ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510868', {
  example: () => html`<DsfrBadge label="Erreur" type="error" small />`,
  imports,
});

// ─── Nouveau SM ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510856', {
  example: () => html`<DsfrBadge label="Nouveau" type="new" small />`,
  imports,
});

// ─── Personnalisable SM ──────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510854', {
  example: () => html`<DsfrBadge label="Personnalisable" class="fr-badge--blue-cumulus" small />`,
  imports,
});
