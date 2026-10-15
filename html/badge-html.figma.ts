import figma, { html } from '@figma/code-connect/html';

// Badge DSFR : 12 composants Figma standalone (6 couleurs × 2 tailles, Thème clair uniquement).
// Thème (Clair/Sombre) = CSS uniquement → seuls les nodes Thème clair sont connectés.
// noIcon = override d'instance non bindable → fr-badge--no-icon non inclus (icône par défaut).
// Badge Personnalisable → classe couleur fr-badge--blue-cumulus à remplacer par le token voulu.

// ─── Information MD ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__INFORMATION_MD>', {
  example: () => html`<p class="fr-badge fr-badge--info">Information</p>`,
});

// ─── Succès MD ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__SUCCES_MD>', {
  example: () => html`<p class="fr-badge fr-badge--success">Succès</p>`,
});

// ─── Avertissement MD ────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__AVERTISSEMENT_MD>', {
  example: () => html`<p class="fr-badge fr-badge--warning">Avertissement</p>`,
});

// ─── Erreur MD ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__ERREUR_MD>', {
  example: () => html`<p class="fr-badge fr-badge--error">Erreur</p>`,
});

// ─── Nouveau MD ──────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__NOUVEAU_MD>', {
  example: () => html`<p class="fr-badge fr-badge--new">Nouveau</p>`,
});

// ─── Personnalisable MD ──────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__PERSONNALISABLE_MD>', {
  example: () => html`<p class="fr-badge fr-badge--blue-cumulus">Personnalisable</p>`,
});

// ─── Information SM ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__INFORMATION_SM>', {
  example: () => html`<p class="fr-badge fr-badge--sm fr-badge--info">Information</p>`,
});

// ─── Succès SM ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__SUCCES_SM>', {
  example: () => html`<p class="fr-badge fr-badge--sm fr-badge--success">Succès</p>`,
});

// ─── Avertissement SM ────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__AVERTISSEMENT_SM>', {
  example: () => html`<p class="fr-badge fr-badge--sm fr-badge--warning">Avertissement</p>`,
});

// ─── Erreur SM ───────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__ERREUR_SM>', {
  example: () => html`<p class="fr-badge fr-badge--sm fr-badge--error">Erreur</p>`,
});

// ─── Nouveau SM ──────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__NOUVEAU_SM>', {
  example: () => html`<p class="fr-badge fr-badge--sm fr-badge--new">Nouveau</p>`,
});

// ─── Personnalisable SM ──────────────────────────────────────────────────────
figma.connect('<FIGMA_BADGE__PERSONNALISABLE_SM>', {
  example: () => html`<p class="fr-badge fr-badge--sm fr-badge--blue-cumulus">Personnalisable</p>`,
});
