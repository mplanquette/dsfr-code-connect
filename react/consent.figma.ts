import figma, { html } from '@figma/code-connect/html';

// Gestionnaire de consentement DSFR : 4 sets utiles. Les composants « _🚫Éléments »
// sont des atomes internes → non connectés. Thème et Support = CSS seul/responsive
// (variantes internes au même set).
// react-dsfr pilote ce composant par configuration (`createConsentManagement`), pas
// par un simple élément JSX avec quelques props : la fabrique retourne le composant
// `ConsentBannerAndConsentManagement` (bandeau + modale) à partir d'un
// `finalityDescription`. Simplification retenue (même esprit que côté Angular avec
// `finalities[]`) : un objet `finalityDescription` à 2 entrées reflète Bandeau et
// Modale ; l'item de finalité n'a pas de composant dédié, il se déclare comme une
// entrée de `finalityDescription`. « Service indisponible » est couvert nativement
// par `Placeholder` (`consentManagement/Placeholder.tsx`), sans équivalent ngx-dsfr.

// ─── Bandeau de consentement ──────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=630-158', {
  example: () =>
    html`const { ConsentBannerAndConsentManagement } = createConsentManagement({
  finalityDescription: {
    mesureAudience: { title: "Mesure d'audience" },
    reseauxSociaux: { title: 'Réseaux sociaux' }
  },
  personalDataPolicyLinkProps: { href: '/donnees-personnelles' }
});

<ConsentBannerAndConsentManagement />`,
  imports: ["import { createConsentManagement } from '@codegouvfr/react-dsfr/consentManagement'"],
});

// ─── Modale de consentement - Complète ────────────────────────────────────────
// La modale est intégrée à `ConsentBannerAndConsentManagement`, elle ne se pose pas seule.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=679-1138', {
  example: () =>
    html`const { ConsentBannerAndConsentManagement } = createConsentManagement({
  finalityDescription: {
    mesureAudience: { title: "Mesure d'audience", description: 'Description de la finalité.' },
    reseauxSociaux: { title: 'Réseaux sociaux' }
  },
  personalDataPolicyLinkProps: { href: '/donnees-personnelles' }
});

<ConsentBannerAndConsentManagement />`,
  imports: ["import { createConsentManagement } from '@codegouvfr/react-dsfr/consentManagement'"],
});

// ─── Modale de consentement - Item ────────────────────────────────────────────
// Un item de finalité n'a pas de composant dédié : il se déclare comme entrée de
// `finalityDescription` (clé + `title`/`description`/`subFinalities`).
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=644-54579', {
  props: {
    finality: figma.enum('Type', {
      Simple: `mesureAudience: { title: "Mesure d'audience" }`,
      Description: `mesureAudience: { title: "Mesure d'audience", description: 'Description de la finalité.' }`,
      Obligatoire: `fonctionnement: { title: 'Fonctionnement du site' } /* finalité exemptée : à traiter hors bandeau, toujours accept: true côté DSFR */`,
      Ouvert: `reseauxSociaux: {
      title: 'Réseaux sociaux',
      subFinalities: { x: { title: 'X' }, linkedin: { title: 'LinkedIn' } }
    }`,
      Fermé: `reseauxSociaux: {
      title: 'Réseaux sociaux',
      subFinalities: { x: { title: 'X' }, linkedin: { title: 'LinkedIn' } }
    }`,
    }),
  },
  example: ({ finality }) =>
    html`const { ConsentBannerAndConsentManagement } = createConsentManagement({
  finalityDescription: {
    ${finality}
  },
  personalDataPolicyLinkProps: { href: '/donnees-personnelles' }
});

<ConsentBannerAndConsentManagement />`,
  imports: ["import { createConsentManagement } from '@codegouvfr/react-dsfr/consentManagement'"],
});

// ─── Service indisponible ─────────────────────────────────────────────────────
// `onGranted` reçoit `assumeConsent`, retourné par le hook `useConsent` généré par
// `createConsentManagement` (cf. sets ci-dessus).
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=703-55173', {
  example: () =>
    html`<Placeholder
  title="Contenu bloqué"
  description="Ce contenu est hébergé par nom-du-service. Pour le visualiser, vous devez accepter la catégorie réseaux sociaux."
  onGranted={() => assumeConsent('reseauxSociaux')} />`,
  imports: ["import { Placeholder } from '@codegouvfr/react-dsfr/consentManagement/Placeholder'"],
});
