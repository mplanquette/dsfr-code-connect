import figma, { html } from '@figma/code-connect/html';

// Bouton radio DSFR : 3 sets utiles (Item, Groupe, Section).
// Les sets « 🚫 / SM » et « 🚫 / MD » sont des atomes internes Figma → non connectés.
// Thème sombre = CSS seul. Focus = pseudo-état → ignoré.
// ngx-dsfr n'expose pas de radio unitaire : un radio isolé se déclare avec un seul
// élément dans `options`, d'où le même composant pour l'item et le groupe.

const imports = ["import { DsfrFormRadioComponent } from '@edugouvfr/ngx-dsfr'"];

// ─── Item ────────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BOUTON_RADIO__BOUTON_RADIO_ITEM>', {
  props: {
    small: figma.enum('Taille', { SM: ' [small]="true"', MD: '' }),
    checked: figma.boolean('Coché', { true: ' value="option-1"', false: '' }),
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
    validation: figma.enum('Validation', {
      Aucune: '',
      Valide: ` message="Texte de validation" messageSeverity="valid"`,
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
    }),
  },
  example: ({ small, checked, disabled, validation }) =>
    html`<dsfr-form-radio
  name="radio"
  legend="Légende du champ"
  [options]="[{ label: 'Libellé bouton radio', value: 'option-1' }]"${small}${checked}${disabled}${validation}></dsfr-form-radio>`,
  imports,
});

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_BOUTON_RADIO__BOUTON_RADIO_GROUPE>', {
  props: {
    inline: figma.enum('Orientation', { Horizontal: ' [inline]="true"', Vertical: '' }),
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
    severity: figma.enum('État', {
      Défaut: '',
      Valide: ` message="Texte de validation" messageSeverity="valid"`,
      Erreur: ` message="Texte d'erreur" messageSeverity="error"`,
    }),
  },
  example: ({ inline, disabled, severity }) =>
    html`<dsfr-form-radio
  name="radio"
  legend="Légende du groupe"
  [options]="[
    { label: 'Première option', value: 'option-1' },
    { label: 'Deuxième option', value: 'option-2' },
    { label: 'Troisième option', value: 'option-3' }
  ]"${inline}${disabled}${severity}></dsfr-form-radio>`,
  imports,
});

// ─── Section ─────────────────────────────────────────────────────────────────
// La propriété Figma est nommée « Tire de section » (coquille côté design, conservée telle quelle).
figma.connect('<FIGMA_BOUTON_RADIO__BOUTON_RADIO_SECTION>', {
  props: {
    legend: figma.string('Tire de section'),
    disabled: figma.boolean('Désactivé', { true: ' [disabled]="true"', false: '' }),
  },
  example: ({ legend, disabled }) =>
    html`<dsfr-form-radio
  name="radio"
  legend="${legend}"
  [options]="[
    { label: 'Première option', value: 'option-1' },
    { label: 'Deuxième option', value: 'option-2' }
  ]"${disabled}></dsfr-form-radio>`,
  imports,
});
