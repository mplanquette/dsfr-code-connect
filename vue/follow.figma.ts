import figma, { html } from '@figma/code-connect/html';

// Lettre d'information et réseaux sociaux DSFR : 4 sets, thème clair uniquement
// (Desktop/Mobile responsive, même snippet). DsfrFollow n'a pas de prop `type` façon
// ngx-dsfr : la lettre d'info se pilote via `newsletter-data` (objet `DsfrNewsLetterProps`,
// avec `onlyCallout` pour la variante « Bouton seul ») et les réseaux via `networks`.
// « Newsletter Aucun » est approximé par l'absence de `newsletter-data` (réseaux seuls) :
// l'API ne modélise pas indépendamment les 6 combinaisons de « Newsletter »×« Liens
// réseaux » → « Liens réseaux » n'est donc pas bindé séparément dans les cas Newsletter ≠
// Aucun (mêmes limites que côté Angular/HTML).

const imports = ["import DsfrFollow from '@gouvminint/vue-dsfr/DsfrFollow.vue'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_LETTRE_D_INFORMATION_ET_RESEAUX_SOCIAUX__DESKTOP>', {
  props: {
    newsletterData: figma.enum('Newsletter', {
      Formulaire: ` :newsletter-data="{ title: 'S\\'abonner à notre lettre d\\'information', description: 'Texte de description.' }"`,
      'Bouton seul': ` :newsletter-data="{ title: 'S\\'abonner à notre lettre d\\'information', description: 'Texte de description.', onlyCallout: true }"`,
      Aucun: '',
    }),
  },
  example: ({ newsletterData }) =>
    html`<DsfrFollow id="follow"${newsletterData}
    :networks="[
      { type: 'facebook', name: 'Facebook', href: 'https://www.facebook.com' },
      { type: 'twitter-x', name: 'X', href: 'https://twitter.com' },
      { type: 'linkedin', name: 'LinkedIn', href: 'https://www.linkedin.com' }
    ]"
  />`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_LETTRE_D_INFORMATION_ET_RESEAUX_SOCIAUX__MOBILE>', {
  props: {
    newsletterData: figma.enum('Newsletter', {
      Aucun: '',
      'Bouton seul': ` :newsletter-data="{ title: 'S\\'abonner à notre lettre d\\'information', onlyCallout: true }"`,
      Formulaire: ` :newsletter-data="{ title: 'S\\'abonner à notre lettre d\\'information' }"`,
    }),
  },
  example: ({ newsletterData }) =>
    html`<DsfrFollow id="follow"${newsletterData}
    :networks="[
      { type: 'facebook', name: 'Facebook', href: 'https://www.facebook.com' },
      { type: 'twitter-x', name: 'X', href: 'https://twitter.com' },
      { type: 'linkedin', name: 'LinkedIn', href: 'https://www.linkedin.com' }
    ]"
  />`,
  imports,
});

// ─── Formulaire (élément desktop) ─────────────────────────────────────────────
// Champ email interne au formulaire newsletter de DsfrNewsLetter, non exposé comme
// composant séparé : approximé avec le champ générique DsfrInputGroup (valid/error).
figma.connect('<FIGMA_LETTRE_D_INFORMATION_ET_RESEAUX_SOCIAUX__ELEMENT_FORMULAIRE_DESKTOP>', {
  props: {
    messages: figma.enum('Etat', {
      Default: '',
      Valide: ' valid-message="Texte de validation"',
      Erreur: ' error-message="Texte d\'erreur"',
    }),
  },
  example: ({ messages }) =>
    html`<DsfrInputGroup label="Adresse email" type="email" v-model="email"${messages} />`,
  imports: ["import DsfrInputGroup from '@gouvminint/vue-dsfr/DsfrInputGroup.vue'"],
});

// ─── Formulaire (élément mobile) ──────────────────────────────────────────────
figma.connect('<FIGMA_LETTRE_D_INFORMATION_ET_RESEAUX_SOCIAUX__ELEMENT_FORMULAIRE_MOBILE>', {
  props: {
    messages: figma.enum('Etat', {
      Default: '',
      Valide: ' valid-message="Texte de validation"',
      Erreur: ' error-message="Texte d\'erreur"',
    }),
  },
  example: ({ messages }) =>
    html`<DsfrInputGroup label="Adresse email" type="email" v-model="email"${messages} />`,
  imports: ["import DsfrInputGroup from '@gouvminint/vue-dsfr/DsfrInputGroup.vue'"],
});
