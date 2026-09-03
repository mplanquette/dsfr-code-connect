import figma, { html } from '@figma/code-connect/html';

// Badge DSFR : 12 composants Figma standalone (6 couleurs × 2 tailles, Thème clair uniquement).
// Thème (Clair/Sombre) = CSS uniquement → seuls les nodes Thème clair sont connectés.
// noIcon = override d'instance non bindable → fr-badge--no-icon non inclus (icône par défaut).
// Badge Personnalisable → classe couleur fr-badge--blue-cumulus à remplacer par le token voulu.

// ─── Information MD ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510838', {
  example: () => html`<p class="fr-badge fr-badge--info">Information</p>`,
});

// ─── Succès MD ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510850', {
  example: () => html`<p class="fr-badge fr-badge--success">Succès</p>`,
});

// ─── Avertissement MD ────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510842', {
  example: () => html`<p class="fr-badge fr-badge--warning">Avertissement</p>`,
});

// ─── Erreur MD ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510846', {
  example: () => html`<p class="fr-badge fr-badge--error">Erreur</p>`,
});

// ─── Nouveau MD ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510834', {
  example: () => html`<p class="fr-badge fr-badge--new">Nouveau</p>`,
});

// ─── Personnalisable MD ──────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510832', {
  example: () => html`<p class="fr-badge fr-badge--blue-cumulus">Personnalisable</p>`,
});

// ─── Information SM ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510860', {
  example: () => html`<p class="fr-badge fr-badge--sm fr-badge--info">Information</p>`,
});

// ─── Succès SM ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510872', {
  example: () => html`<p class="fr-badge fr-badge--sm fr-badge--success">Succès</p>`,
});

// ─── Avertissement SM ────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510864', {
  example: () => html`<p class="fr-badge fr-badge--sm fr-badge--warning">Avertissement</p>`,
});

// ─── Erreur SM ───────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510868', {
  example: () => html`<p class="fr-badge fr-badge--sm fr-badge--error">Erreur</p>`,
});

// ─── Nouveau SM ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510856', {
  example: () => html`<p class="fr-badge fr-badge--sm fr-badge--new">Nouveau</p>`,
});

// ─── Personnalisable SM ──────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-510854', {
  example: () => html`<p class="fr-badge fr-badge--sm fr-badge--blue-cumulus">Personnalisable</p>`,
});
