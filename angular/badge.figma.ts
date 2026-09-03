import figma, { html } from '@figma/code-connect/html';

// Badge DSFR : 12 composants Figma standalone (6 couleurs × 2 tailles, Thème clair uniquement).
// Thème (Clair/Sombre) = CSS uniquement → seuls les nodes Thème clair sont connectés.
// noIcon = override d'instance Figma non bindable → icône de sévérité affichée par défaut.
// Badge Personnalisable → severity absent, customClass à remplacer par la classe couleur voulue.

const imports = ["import { DsfrBadgeComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Information MD ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510838', {
  example: () => html`<dsfr-badge label="Information" severity="info" badgeSize="MD"></dsfr-badge>`,
  imports,
});

// ─── Succès MD ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510850', {
  example: () => html`<dsfr-badge label="Succès" severity="success" badgeSize="MD"></dsfr-badge>`,
  imports,
});

// ─── Avertissement MD ────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510842', {
  example: () => html`<dsfr-badge label="Avertissement" severity="warning" badgeSize="MD"></dsfr-badge>`,
  imports,
});

// ─── Erreur MD ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510846', {
  example: () => html`<dsfr-badge label="Erreur" severity="error" badgeSize="MD"></dsfr-badge>`,
  imports,
});

// ─── Nouveau MD ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510834', {
  example: () => html`<dsfr-badge label="Nouveau" severity="new" badgeSize="MD"></dsfr-badge>`,
  imports,
});

// ─── Personnalisable MD ──────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510832', {
  example: () => html`<dsfr-badge label="Personnalisable" badgeSize="MD" customClass="fr-badge--blue-cumulus"></dsfr-badge>`,
  imports,
});

// ─── Information SM ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510860', {
  example: () => html`<dsfr-badge label="Information" severity="info" badgeSize="SM"></dsfr-badge>`,
  imports,
});

// ─── Succès SM ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510872', {
  example: () => html`<dsfr-badge label="Succès" severity="success" badgeSize="SM"></dsfr-badge>`,
  imports,
});

// ─── Avertissement SM ────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510864', {
  example: () => html`<dsfr-badge label="Avertissement" severity="warning" badgeSize="SM"></dsfr-badge>`,
  imports,
});

// ─── Erreur SM ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510868', {
  example: () => html`<dsfr-badge label="Erreur" severity="error" badgeSize="SM"></dsfr-badge>`,
  imports,
});

// ─── Nouveau SM ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510856', {
  example: () => html`<dsfr-badge label="Nouveau" severity="new" badgeSize="SM"></dsfr-badge>`,
  imports,
});

// ─── Personnalisable SM ──────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510854', {
  example: () => html`<dsfr-badge label="Personnalisable" badgeSize="SM" customClass="fr-badge--blue-cumulus"></dsfr-badge>`,
  imports,
});
