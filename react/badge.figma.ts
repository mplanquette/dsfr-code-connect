import figma, { html } from '@figma/code-connect/html';

// Badge DSFR : 12 composants Figma standalone (6 couleurs × 2 tailles, Thème clair uniquement).
// Thème (Clair/Sombre) = CSS uniquement → seuls les nodes Thème clair sont connectés.
// noIcon = override d'instance Figma non bindable → icône de sévérité affichée par défaut
// (`noIcon` react-dsfr non posé).
// Badge Personnalisable → `severity` absent, `className` à remplacer par la classe couleur voulue.
// `severity="new"` est un cas spécial accepté par `BadgeProps` (`AlertProps.Severity | "new"`).

const imports = ["import { Badge } from '@codegouvfr/react-dsfr/Badge'"];

// ─── Information MD ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510838', {
  example: () => html`<Badge severity="info">Information</Badge>`,
  imports,
});

// ─── Succès MD ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510850', {
  example: () => html`<Badge severity="success">Succès</Badge>`,
  imports,
});

// ─── Avertissement MD ────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510842', {
  example: () => html`<Badge severity="warning">Avertissement</Badge>`,
  imports,
});

// ─── Erreur MD ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510846', {
  example: () => html`<Badge severity="error">Erreur</Badge>`,
  imports,
});

// ─── Nouveau MD ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510834', {
  example: () => html`<Badge severity="new">Nouveau</Badge>`,
  imports,
});

// ─── Personnalisable MD ──────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510832', {
  example: () => html`<Badge className="fr-badge--blue-cumulus">Personnalisable</Badge>`,
  imports,
});

// ─── Information SM ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510860', {
  example: () => html`<Badge severity="info" small>Information</Badge>`,
  imports,
});

// ─── Succès SM ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510872', {
  example: () => html`<Badge severity="success" small>Succès</Badge>`,
  imports,
});

// ─── Avertissement SM ────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510864', {
  example: () => html`<Badge severity="warning" small>Avertissement</Badge>`,
  imports,
});

// ─── Erreur SM ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510868', {
  example: () => html`<Badge severity="error" small>Erreur</Badge>`,
  imports,
});

// ─── Nouveau SM ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510856', {
  example: () => html`<Badge severity="new" small>Nouveau</Badge>`,
  imports,
});

// ─── Personnalisable SM ──────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510854', {
  example: () => html`<Badge className="fr-badge--blue-cumulus" small>Personnalisable</Badge>`,
  imports,
});
