import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement (le code se met à jour en Dev Mode) :
//   - État → aria-expanded sur le bouton (Ouvert = "true", Défaut/Survol = "false")
// Thème (Clair/Sombre) = tokens CSS uniquement, pas de markup différent.
// Survol = pseudo-état CSS : ignoré (même markup que Défaut).
// Support (Desktop/Mobile sur le Groupe) = responsive uniquement, pas de markup différent.

// ─── Desktop (État: Défaut / Survol / Ouvert) ─────────────────────────────────
const desktopProps = {
  expanded: figma.enum('État', {
    'Défaut': 'false',
    'Survol': 'false',
    'Ouvert': 'true',
  }),
};

// ─── Mobile (État: Défaut / Ouvert, pas de Survol) ───────────────────────────
const mobileProps = {
  expanded: figma.enum('État', {
    'Défaut': 'false',
    'Ouvert': 'true',
  }),
};

// ─── Accordéon - Desktop ──────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=128-27', {
  props: desktopProps,
  example: ({ expanded }) => html`
<section class="fr-accordion">
  <h3 class="fr-accordion__title">
    <button class="fr-accordion__btn" aria-expanded="${expanded}" aria-controls="accordion-1">
      Intitulé accordéon
    </button>
  </h3>
  <div class="fr-collapse" id="accordion-1">
    <p>Contenu de l'accordéon</p>
  </div>
</section>`,
});

// ─── Accordéon - Mobile ───────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=128-110', {
  props: mobileProps,
  example: ({ expanded }) => html`
<section class="fr-accordion">
  <h3 class="fr-accordion__title">
    <button class="fr-accordion__btn" aria-expanded="${expanded}" aria-controls="accordion-1">
      Intitulé accordéon
    </button>
  </h3>
  <div class="fr-collapse" id="accordion-1">
    <p>Contenu de l'accordéon</p>
  </div>
</section>`,
});

// ─── Accordéon - Groupe ───────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=128-600', {
  example: () => html`
<div class="fr-accordions-group">
  <section class="fr-accordion">
    <h3 class="fr-accordion__title">
      <button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-1">Intitulé 1</button>
    </h3>
    <div class="fr-collapse" id="accordion-1">
      <p>Contenu de l'accordéon 1</p>
    </div>
  </section>
  <section class="fr-accordion">
    <h3 class="fr-accordion__title">
      <button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-2">Intitulé 2</button>
    </h3>
    <div class="fr-collapse" id="accordion-2">
      <p>Contenu de l'accordéon 2</p>
    </div>
  </section>
  <section class="fr-accordion">
    <h3 class="fr-accordion__title">
      <button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-3">Intitulé 3</button>
    </h3>
    <div class="fr-collapse" id="accordion-3">
      <p>Contenu de l'accordéon 3</p>
    </div>
  </section>
</div>`,
});
