import figma, { html } from '@figma/code-connect/html';

// Curseur DSFR : 3 sets utiles (double, simple, cranté). Les composants préfixés
// « ⚙️ » (Poignée, Piste, Plage sélectionnée, Cran, Valeur min-max) sont des atomes
// internes assemblés par ces 3 sets → non connectés individuellement.
// Coquille de design conservée telle quelle : « Défault » et « désactivé ».

const imports = ["import { DsfrRangeComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Curseur simple ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_CURSEUR__CURSEUR_SIMPLE>', {
  props: {
    disabled: figma.enum('État', { Défault: '', Erreur: '', Valide: '', désactivé: ' [disabled]="true"' }),
    severity: figma.enum('État', {
      Défault: '', désactivé: '',
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
      Valide: ` message="Texte de validation" messageSeverity="valid"`,
    }),
  },
  example: ({ disabled, severity }) =>
    html`<dsfr-range label="Libellé du curseur" [min]="0" [max]="100" [value]="50"${disabled}${severity}></dsfr-range>`,
  imports,
});

// ─── Curseur double ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_CURSEUR__CURSEUR_DOUBLE>', {
  props: {
    disabled: figma.enum('État', { Défault: '', Erreur: '', Valide: '', désactivé: ' [disabled]="true"' }),
    severity: figma.enum('État', {
      Défault: '', désactivé: '',
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
      Valide: ` message="Texte de validation" messageSeverity="valid"`,
    }),
  },
  example: ({ disabled, severity }) =>
    html`<dsfr-range label="Libellé du curseur" [min]="0" [max]="100" [value]="[25, 75]"${disabled}${severity}></dsfr-range>`,
  imports,
});

// ─── Curseur cranté ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_CURSEUR__CURSEUR_CRANTE>', {
  props: {
    disabled: figma.enum('État', { Défault: '', Erreur: '', Valide: '', désactivé: ' [disabled]="true"' }),
    severity: figma.enum('État', {
      Défault: '', désactivé: '',
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
      Valide: ` message="Texte de validation" messageSeverity="valid"`,
    }),
  },
  example: ({ disabled, severity }) =>
    html`<dsfr-range label="Libellé du curseur" [min]="0" [max]="100" [step]="25" [value]="50"${disabled}${severity}></dsfr-range>`,
  imports,
});
