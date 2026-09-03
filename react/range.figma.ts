import figma, { html } from '@figma/code-connect/html';

// Curseur DSFR : 3 sets utiles (double, simple, cranté), même mapping que
// angular/range.figma.ts et html/range-html.figma.ts. Les composants préfixés « ⚙️ »
// (Poignée, Piste, Plage sélectionnée, Cran, Valeur min-max) sont des atomes internes
// assemblés par ces 3 sets → non connectés individuellement.
// Coquille de design conservée telle quelle : « Défault » et « désactivé ».
// `nativeInputProps` : déclaré en `const nativeInputProps = ...` avant le JSX (comme
// breadcrumb.figma.ts) puis référencé en `nativeInputProps={nativeInputProps}`, plutôt
// qu'en valeur d'attribut multiligne inline, le parser Code Connect (HTML générique)
// interprète toute valeur d'attribut multiligne contenant plusieurs objets comme une
// liste d'attributs HTML et lève une erreur « Duplicate attribute name » (côté curseur
// double où la clé `defaultValue` se répète).

const imports = ["import { Range } from '@codegouvfr/react-dsfr/Range'"];

// ─── Curseur simple ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=24571-368579', {
  props: {
    disabled: figma.enum('État', { Défault: '', Erreur: '', Valide: '', désactivé: ' disabled' }),
    severity: figma.enum('État', {
      Défault: '', désactivé: '',
      Erreur: ` state="error" stateRelatedMessage="Texte d'erreur"`,
      Valide: ` state="success" stateRelatedMessage="Texte de validation"`,
    }),
  },
  example: ({ disabled, severity }) =>
    html`const nativeInputProps = { defaultValue: 50 };

<Range label="Libellé du curseur" min={0} max={100} nativeInputProps={nativeInputProps}${disabled}${severity} />`,
  imports,
});

// ─── Curseur double ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=24474-242232', {
  props: {
    disabled: figma.enum('État', { Défault: '', Erreur: '', Valide: '', désactivé: ' disabled' }),
    severity: figma.enum('État', {
      Défault: '', désactivé: '',
      Erreur: ` state="error" stateRelatedMessage="Texte d'erreur"`,
      Valide: ` state="success" stateRelatedMessage="Texte de validation"`,
    }),
  },
  example: ({ disabled, severity }) =>
    html`const nativeInputProps = [{ defaultValue: 25 }, { defaultValue: 75 }];

<Range
  label="Libellé du curseur"
  min={0}
  max={100}
  double
  nativeInputProps={nativeInputProps}${disabled}${severity}
/>`,
  imports,
});

// ─── Curseur cranté ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=24571-368480', {
  props: {
    disabled: figma.enum('État', { Défault: '', Erreur: '', Valide: '', désactivé: ' disabled' }),
    severity: figma.enum('État', {
      Défault: '', désactivé: '',
      Erreur: ` state="error" stateRelatedMessage="Texte d'erreur"`,
      Valide: ` state="success" stateRelatedMessage="Texte de validation"`,
    }),
  },
  example: ({ disabled, severity }) =>
    html`const nativeInputProps = { defaultValue: 50 };

<Range label="Libellé du curseur" min={0} max={100} step={25} nativeInputProps={nativeInputProps}${disabled}${severity} />`,
  imports,
});
