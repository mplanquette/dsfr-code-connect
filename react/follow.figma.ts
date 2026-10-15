import figma, { html } from '@figma/code-connect/html';

// Lettre d'information et réseaux sociaux DSFR : 4 sets, thème clair uniquement
// (Desktop/Mobile responsive, même snippet).
// « Description » n'est pas bindable en tant que prop indépendante côté react-dsfr
// (contrairement à `dsfr-follow` qui expose un attribut `description` au niveau du
// composant) : `<Follow>` ne porte le texte de description que niché dans
// `newsletter.desc`, donc affiché tel quel uniquement dans les branches
// Newsletter ≠ Aucun, non piloté par le toggle Figma.
// « Newsletter Aucun » est approximé en omettant complètement la prop `newsletter`
// (seul `social` est fourni) : react-dsfr ne modélise pas de variante « type networks »
// comme ngx-dsfr, l'axe Newsletter est une prop présente/absente plutôt qu'un enum.
// `social` (3 boutons) est déclaré en `const` avant le JSX : le parser Code Connect
// (HTML générique) interprète toute valeur d'attribut contenant plusieurs objets
// comme une liste d'attributs HTML et lève « Duplicate attribute name » (type/href
// répétés), même piège que côté `mainnav.figma.ts`. Ce texte est réécrit dans
// chaque `example` (pas de const de module partagée entre plusieurs `figma.connect`,
// qui casse le parse, cf. note `mainnav.figma.ts`).

const imports = ["import { Follow } from '@codegouvfr/react-dsfr/Follow'"];

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_LETTRE_D_INFORMATION_ET_RESEAUX_SOCIAUX__DESKTOP>', {
  props: {
    newsletter: figma.enum('Newsletter', {
      Formulaire: `const newsletter = {
  desc: 'Texte de description.',
  buttonProps: { type: 'submit', children: "S'abonner" },
  form: {
    formComponent: ({ children }) => <form action="/abonnement">{children}</form>,
    success: false
  }
};
`,
      'Bouton seul': `const newsletter = {
  desc: 'Texte de description.',
  buttonProps: { linkProps: { href: '/abonnement' }, children: "S'abonner" }
};
`,
      Aucun: '',
    }),
    newsletterAttr: figma.enum('Newsletter', {
      Formulaire: '\n  newsletter={newsletter}',
      'Bouton seul': '\n  newsletter={newsletter}',
      Aucun: '',
    }),
  },
  example: ({ newsletter, newsletterAttr }) =>
    html`${newsletter}const social = {
  buttons: [
    { type: 'facebook', linkProps: { href: 'https://www.facebook.com' } },
    { type: 'twitter-x', linkProps: { href: 'https://twitter.com' } },
    { type: 'linkedin', linkProps: { href: 'https://www.linkedin.com' } }
  ]
};

<Follow id="follow"${newsletterAttr}
  social={social} />`,
  imports,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_LETTRE_D_INFORMATION_ET_RESEAUX_SOCIAUX__MOBILE>', {
  props: {
    newsletter: figma.enum('Newsletter', {
      Aucun: '',
      'Bouton seul': `const newsletter = {
  desc: 'Texte de description.',
  buttonProps: { linkProps: { href: '/abonnement' }, children: "S'abonner" }
};
`,
      Formulaire: `const newsletter = {
  desc: 'Texte de description.',
  buttonProps: { type: 'submit', children: "S'abonner" },
  form: {
    formComponent: ({ children }) => <form action="/abonnement">{children}</form>,
    success: false
  }
};
`,
    }),
    newsletterAttr: figma.enum('Newsletter', {
      Aucun: '',
      'Bouton seul': '\n  newsletter={newsletter}',
      Formulaire: '\n  newsletter={newsletter}',
    }),
  },
  example: ({ newsletter, newsletterAttr }) =>
    html`${newsletter}const social = {
  buttons: [
    { type: 'facebook', linkProps: { href: 'https://www.facebook.com' } },
    { type: 'twitter-x', linkProps: { href: 'https://twitter.com' } },
    { type: 'linkedin', linkProps: { href: 'https://www.linkedin.com' } }
  ]
};

<Follow id="follow"${newsletterAttr}
  social={social} />`,
  imports,
});

// ─── Formulaire (élément desktop) ─────────────────────────────────────────────
// Champ email du formulaire newsletter : react-dsfr n'a pas de composant email
// dédié (contrairement à `dsfr-form-email`), on utilise <Input> générique.
figma.connect('<FIGMA_LETTRE_D_INFORMATION_ET_RESEAUX_SOCIAUX__ELEMENT_FORMULAIRE_DESKTOP>', {
  props: {
    state: figma.enum('Etat', {
      Default: '',
      Valide: '\n  state="success"\n  stateRelatedMessage="Texte de validation"',
      Erreur: '\n  state="error"\n  stateRelatedMessage="Texte d\'erreur"',
    }),
  },
  example: ({ state }) =>
    html`<Input
  label="Adresse email"
  nativeInputProps={{ type: 'email', name: 'email' }}${state} />`,
  imports: ["import { Input } from '@codegouvfr/react-dsfr/Input'"],
});

// ─── Formulaire (élément mobile) ──────────────────────────────────────────────
figma.connect('<FIGMA_LETTRE_D_INFORMATION_ET_RESEAUX_SOCIAUX__ELEMENT_FORMULAIRE_MOBILE>', {
  props: {
    state: figma.enum('Etat', {
      Default: '',
      Valide: '\n  state="success"\n  stateRelatedMessage="Texte de validation"',
      Erreur: '\n  state="error"\n  stateRelatedMessage="Texte d\'erreur"',
    }),
  },
  example: ({ state }) =>
    html`<Input
  label="Adresse email"
  nativeInputProps={{ type: 'email', name: 'email' }}${state} />`,
  imports: ["import { Input } from '@codegouvfr/react-dsfr/Input'"],
});
