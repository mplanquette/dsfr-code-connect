import figma, { html } from '@figma/code-connect/html';

// Champ de saisie DSFR : 4 sets (Item, Groupe, Section, champ simple), même mapping
// que angular/input.figma.ts et html/input-html.figma.ts. « Éléments - Champ de saisie »
// est le champ complet (icône, bascule zone de texte) ; « Champ de saisie » est la
// variante simple. Les atomes internes (Label, Légende, Message, Titre de section) ne
// sont pas connectés individuellement.
// Focus = pseudo-état → ignoré. « Rempli » ne porte pas de sévérité de message.
// react-dsfr Input n'a pas de composant Fieldset générique pour grouper des <Input> :
// Groupe/Section utilisent un <fieldset> HTML brut (comme html/), avec des <Input />
// react-dsfr à l'intérieur, c'est la même simplification que ngx-dsfr <dsfr-fieldset>.

const imports = ["import { Input } from '@codegouvfr/react-dsfr/Input'"];

// ─── Groupe ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_CHAMP_DE_SAISIE__CHAMP_DE_SAISIE_GROUPE>', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    stateClass: figma.enum('État', {
      Défaut: '', Rempli: '',
      Erreur: ' fr-fieldset--error',
      Valide: ' fr-fieldset--valid',
    }),
  },
  example: ({ disabled, stateClass }) =>
    html`<fieldset className="fr-fieldset${stateClass}" id="input-group" aria-labelledby="input-group-legend">
  <legend className="fr-fieldset__legend fr-fieldset__legend--regular" id="input-group-legend">Légende du groupe</legend>
  <div className="fr-fieldset__element">
    <Input label="Premier champ" nativeInputProps={{ name: 'input-1' }}${disabled} />
  </div>
  <div className="fr-fieldset__element">
    <Input label="Deuxième champ" nativeInputProps={{ name: 'input-2' }}${disabled} />
  </div>
</fieldset>`,
  imports,
});

// ─── Section ─────────────────────────────────────────────────────────────────
// Propriétés Figma nommées « Tire de section » (coquille, cf. radio.figma.ts) et
// « Disable » (nom resté en anglais) : conservées telles quelles, vérifiées via
// get_design_context sur ce node (node-id=14823-199333).
figma.connect('<FIGMA_CHAMP_DE_SAISIE__CHAMP_DE_SAISIE_SECTION>', {
  props: {
    legend: figma.string('Tire de section'),
    disabled: figma.boolean('Disable', { true: ' disabled', false: '' }),
  },
  example: ({ legend, disabled }) =>
    html`<fieldset className="fr-fieldset" id="input-section" aria-labelledby="input-section-legend">
  <legend className="fr-fieldset__legend fr-fieldset__legend--regular" id="input-section-legend">${legend}</legend>
  <div className="fr-fieldset__element">
    <Input label="Premier champ" nativeInputProps={{ name: 'input-1' }}${disabled} />
  </div>
</fieldset>`,
  imports,
});
