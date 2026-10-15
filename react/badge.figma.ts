import figma, { html } from '@figma/code-connect/html';

// Badge DSFR : 12 composants Figma standalone (6 couleurs × 2 tailles, Thème clair uniquement).
// Thème (Clair/Sombre) = CSS uniquement → seuls les nodes Thème clair sont connectés.
// noIcon = override d'instance Figma non bindable → icône de sévérité affichée par défaut
// (`noIcon` react-dsfr non posé).
// Badge Personnalisable → `severity` absent, `className` à remplacer par la classe couleur voulue.
// `severity="new"` est un cas spécial accepté par `BadgeProps` (`AlertProps.Severity | "new"`).

const imports = ["import { Badge } from '@codegouvfr/react-dsfr/Badge'"];

// ─── Information MD ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__INFORMATION_MD>', {
  example: () => html`<Badge severity="info">Information</Badge>`,
  imports,
});

// ─── Succès MD ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__SUCCES_MD>', {
  example: () => html`<Badge severity="success">Succès</Badge>`,
  imports,
});

// ─── Avertissement MD ────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__AVERTISSEMENT_MD>', {
  example: () => html`<Badge severity="warning">Avertissement</Badge>`,
  imports,
});

// ─── Erreur MD ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__ERREUR_MD>', {
  example: () => html`<Badge severity="error">Erreur</Badge>`,
  imports,
});

// ─── Nouveau MD ──────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__NOUVEAU_MD>', {
  example: () => html`<Badge severity="new">Nouveau</Badge>`,
  imports,
});

// ─── Personnalisable MD ──────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__PERSONNALISABLE_MD>', {
  example: () => html`<Badge className="fr-badge--blue-cumulus">Personnalisable</Badge>`,
  imports,
});

// ─── Information SM ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__INFORMATION_SM>', {
  example: () => html`<Badge severity="info" small>Information</Badge>`,
  imports,
});

// ─── Succès SM ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__SUCCES_SM>', {
  example: () => html`<Badge severity="success" small>Succès</Badge>`,
  imports,
});

// ─── Avertissement SM ────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__AVERTISSEMENT_SM>', {
  example: () => html`<Badge severity="warning" small>Avertissement</Badge>`,
  imports,
});

// ─── Erreur SM ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__ERREUR_SM>', {
  example: () => html`<Badge severity="error" small>Erreur</Badge>`,
  imports,
});

// ─── Nouveau SM ──────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__NOUVEAU_SM>', {
  example: () => html`<Badge severity="new" small>Nouveau</Badge>`,
  imports,
});

// ─── Personnalisable SM ──────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__PERSONNALISABLE_SM>', {
  example: () => html`<Badge className="fr-badge--blue-cumulus" small>Personnalisable</Badge>`,
  imports,
});
