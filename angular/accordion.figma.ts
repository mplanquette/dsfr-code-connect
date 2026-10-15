import figma, { html } from '@figma/code-connect/html';

// Propriétés Figma liées dynamiquement (le code se met à jour en Dev Mode) :
//   - État → [expanded] sur l'accordéon (Ouvert = true, Défaut/Survol = false par défaut)
// Thème (Clair/Sombre) = tokens CSS uniquement, pas de markup différent.
// Survol = pseudo-état CSS : ignoré (même markup que Défaut).
// Support (Desktop/Mobile sur le Groupe) = responsive uniquement, pas de markup différent.

// ─── Desktop (État: Défaut / Survol / Ouvert) ─────────────────────────────────
const desktopProps = {
  expanded: figma.enum('État', {
    'Défaut': '',
    'Survol': '',
    'Ouvert': ' [expanded]="true"',
  }),
};

// ─── Mobile (État: Défaut / Ouvert, pas de Survol) ───────────────────────────
const mobileProps = {
  expanded: figma.enum('État', {
    'Défaut': '',
    'Ouvert': ' [expanded]="true"',
  }),
};

const accordionImports = ["import { DsfrAccordionComponent } from '@edugouvfr/ngx-dsfr'"];
const groupImports = ["import { DsfrAccordionComponent, DsfrAccordionsGroupComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Accordéon - Desktop ──────────────────────────────────────────────────────
figma.connect('<FIGMA_ACCORDEON__ACCORDEON_DESKTOP>', {
  props: desktopProps,
  example: ({ expanded }) => html`<dsfr-accordion heading="Intitulé accordéon" content="Contenu de l'accordéon"${expanded}></dsfr-accordion>`,
  imports: accordionImports,
});

// ─── Accordéon - Mobile ───────────────────────────────────────────────────────
figma.connect('<FIGMA_ACCORDEON__ACCORDEON_MOBILE>', {
  props: mobileProps,
  example: ({ expanded }) => html`<dsfr-accordion heading="Intitulé accordéon" content="Contenu de l'accordéon"${expanded}></dsfr-accordion>`,
  imports: accordionImports,
});

// ─── Accordéon - Groupe ───────────────────────────────────────────────────────
figma.connect('<FIGMA_ACCORDEON__ACCORDEON_GROUPE>', {
  example: () => html`
<dsfr-accordions-group>
  <dsfr-accordion heading="Intitulé 1" content="Contenu de l'accordéon 1"></dsfr-accordion>
  <dsfr-accordion heading="Intitulé 2" content="Contenu de l'accordéon 2"></dsfr-accordion>
  <dsfr-accordion heading="Intitulé 3" content="Contenu de l'accordéon 3"></dsfr-accordion>
</dsfr-accordions-group>`,
  imports: groupImports,
});
