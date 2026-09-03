import figma, { html } from '@figma/code-connect/html';

// Gestionnaire de consentement DSFR : 4 sets utiles. Les composants « _🚫Éléments »
// sont des atomes internes → non connectés. Thème et Support = CSS seul/responsive
// (variantes internes au même set). « Service indisponible » n'a pas de composant
// Angular dédié : c'est un fragment de markup statique DSFR posé manuellement à
// l'emplacement d'un service tiers bloqué en attente de consentement.

// ─── Bandeau de consentement ──────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=630-158', {
  example: () =>
    html`<dsfr-consent-banner
  heading="À propos des cookies sur ce site"
  rgpdLink="/donnees-personnelles"
  [finalities]="[
    { name: 'Mesure d\\'audience', accept: false },
    { name: 'Réseaux sociaux', accept: false }
  ]"></dsfr-consent-banner>`,
  imports: ["import { DsfrConsentBannerComponent } from '@edugouvfr/ngx-dsfr'"],
});

// ─── Modale de consentement - Complète ────────────────────────────────────────
// La modale est intégrée à dsfr-consent-banner, elle ne se pose pas seule.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=679-1138', {
  example: () =>
    html`<dsfr-consent-banner
  heading="À propos des cookies sur ce site"
  rgpdLink="/donnees-personnelles"
  [finalities]="[
    { name: 'Mesure d\\'audience', accept: false, description: 'Description de la finalité.' },
    { name: 'Réseaux sociaux', accept: false }
  ]"></dsfr-consent-banner>`,
  imports: ["import { DsfrConsentBannerComponent } from '@edugouvfr/ngx-dsfr'"],
});

// ─── Modale de consentement - Item ────────────────────────────────────────────
// Un item de finalité n'a pas de composant dédié : il se déclare dans `finalities`.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=644-54579', {
  props: {
    finality: figma.enum('Type', {
      Simple: `{ name: 'Mesure d\\'audience', accept: false }`,
      Description: `{ name: 'Mesure d\\'audience', accept: false, description: 'Description de la finalité.' }`,
      Obligatoire: `{ name: 'Fonctionnement du site', accept: true, exempt: true }`,
      Ouvert: `{ name: 'Réseaux sociaux', accept: false, subFinalities: [{ name: 'X', accept: false }, { name: 'LinkedIn', accept: false }] }`,
      Fermé: `{ name: 'Réseaux sociaux', accept: false, subFinalities: [{ name: 'X', accept: false }, { name: 'LinkedIn', accept: false }] }`,
    }),
  },
  example: ({ finality }) =>
    html`<dsfr-consent-banner
  heading="À propos des cookies sur ce site"
  rgpdLink="/donnees-personnelles"
  [finalities]="[${finality}]"></dsfr-consent-banner>`,
  imports: ["import { DsfrConsentBannerComponent } from '@edugouvfr/ngx-dsfr'"],
});

// ─── Service indisponible ─────────────────────────────────────────────────────
// Pas de composant Angular : fragment de markup DSFR statique.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=703-55173', {
  example: () =>
    html`<div class="fr-consent-service">
  <p>Ce contenu est hébergé par <strong>nom-du-service</strong>.</p>
  <p>
    Pour visualiser ce contenu externe, vous devez accepter la catégorie
    <strong>réseaux sociaux</strong>.
  </p>
  <button type="button" class="fr-btn fr-btn--sm">Autoriser</button>
</div>`,
});
