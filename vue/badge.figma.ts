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
figma.connect('<FIGMA_BADGE__INFORMATION_MD>', {
  example: () => html`<DsfrBadge label="Information" type="info" />`,
  imports,
});

// ─── Succès MD ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__SUCCES_MD>', {
  example: () => html`<DsfrBadge label="Succès" type="success" />`,
  imports,
});

// ─── Avertissement MD ────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__AVERTISSEMENT_MD>', {
  example: () => html`<DsfrBadge label="Avertissement" type="warning" />`,
  imports,
});

// ─── Erreur MD ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__ERREUR_MD>', {
  example: () => html`<DsfrBadge label="Erreur" type="error" />`,
  imports,
});

// ─── Nouveau MD ──────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__NOUVEAU_MD>', {
  example: () => html`<DsfrBadge label="Nouveau" type="new" />`,
  imports,
});

// ─── Personnalisable MD ──────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__PERSONNALISABLE_MD>', {
  example: () => html`<DsfrBadge label="Personnalisable" class="fr-badge--blue-cumulus" />`,
  imports,
});

// ─── Information SM ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__INFORMATION_SM>', {
  example: () => html`<DsfrBadge label="Information" type="info" small />`,
  imports,
});

// ─── Succès SM ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__SUCCES_SM>', {
  example: () => html`<DsfrBadge label="Succès" type="success" small />`,
  imports,
});

// ─── Avertissement SM ────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__AVERTISSEMENT_SM>', {
  example: () => html`<DsfrBadge label="Avertissement" type="warning" small />`,
  imports,
});

// ─── Erreur SM ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__ERREUR_SM>', {
  example: () => html`<DsfrBadge label="Erreur" type="error" small />`,
  imports,
});

// ─── Nouveau SM ──────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__NOUVEAU_SM>', {
  example: () => html`<DsfrBadge label="Nouveau" type="new" small />`,
  imports,
});

// ─── Personnalisable SM ──────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__PERSONNALISABLE_SM>', {
  example: () => html`<DsfrBadge label="Personnalisable" class="fr-badge--blue-cumulus" small />`,
  imports,
});
