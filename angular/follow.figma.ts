import figma, { html } from '@figma/code-connect/html';

// Lettre d'information et réseaux sociaux DSFR : 4 sets, thème clair uniquement
// (Desktop/Mobile responsive, même snippet). « Newsletter Aucun » est approximé par
// le type le plus proche disponible dans `DsfrFollowType` (« networks » si Liens
// réseaux est actif, sinon « newsletter ») : l'API ne modélise pas indépendamment
// les 6 combinaisons de « Newsletter »×« Liens réseaux » → « Liens réseaux » n'est
// donc pas bindé séparément dans les cas Newsletter ≠ Aucun.

const imports = [
  "import { DsfrFollowComponent, DsfrFollowLinkComponent } from '@edugouvfr/ngx-dsfr'",
];

const socialLinks = `<dsfr-follow-link name="facebook" link="https://www.facebook.com"></dsfr-follow-link>
    <dsfr-follow-link name="twitter-x" link="https://twitter.com"></dsfr-follow-link>
    <dsfr-follow-link name="linkedin" link="https://www.linkedin.com"></dsfr-follow-link>`;

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=3539-186707', {
  props: {
    description: figma.boolean('Description', { true: ' description="Texte de description."', false: '' }),
    type: figma.enum('Newsletter', {
      Formulaire: ' type="newsletter-mail"',
      'Bouton seul': ' type="newsletter"',
      Aucun: ' type="networks"',
    }),
  },
  example: ({ description, type }) =>
    html`<dsfr-follow id="follow"${type}${description}>
  <dsfr-follow-link name="facebook" link="https://www.facebook.com"></dsfr-follow-link>
  <dsfr-follow-link name="twitter-x" link="https://twitter.com"></dsfr-follow-link>
  <dsfr-follow-link name="linkedin" link="https://www.linkedin.com"></dsfr-follow-link>
</dsfr-follow>`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=23636-10146', {
  props: {
    description: figma.boolean('Description', { true: ' description="Texte de description."', false: '' }),
    type: figma.enum('Newsletter', {
      Aucun: ' type="networks"',
      'Bouton seul': ' type="newsletter"',
      Formulaire: ' type="newsletter-mail"',
    }),
  },
  example: ({ description, type }) =>
    html`<dsfr-follow id="follow"${type}${description}>
  <dsfr-follow-link name="facebook" link="https://www.facebook.com"></dsfr-follow-link>
  <dsfr-follow-link name="twitter-x" link="https://twitter.com"></dsfr-follow-link>
  <dsfr-follow-link name="linkedin" link="https://www.linkedin.com"></dsfr-follow-link>
</dsfr-follow>`,
  imports,
});

// ─── Formulaire (élément desktop) ─────────────────────────────────────────────
// Champ email du formulaire newsletter, atteint via le type « newsletter-mail ».
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=23649-3349', {
  props: {
    severity: figma.enum('Etat', {
      Default: '', Valide: ' messageSeverity="valid" message="Texte de validation"',
      Erreur: ' messageSeverity="error" message="Texte d\'erreur"',
    }),
  },
  example: ({ severity }) =>
    html`<dsfr-form-email label="Adresse email" name="email"${severity}></dsfr-form-email>`,
  imports: ["import { DsfrFormEmailComponent } from '@edugouvfr/ngx-dsfr'"],
});

// ─── Formulaire (élément mobile) ──────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=23652-29190', {
  props: {
    severity: figma.enum('Etat', {
      Default: '', Valide: ' messageSeverity="valid" message="Texte de validation"',
      Erreur: ' messageSeverity="error" message="Texte d\'erreur"',
    }),
  },
  example: ({ severity }) =>
    html`<dsfr-form-email label="Adresse email" name="email"${severity}></dsfr-form-email>`,
  imports: ["import { DsfrFormEmailComponent } from '@edugouvfr/ngx-dsfr'"],
});
