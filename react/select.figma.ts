import figma, { html } from '@figma/code-connect/html';

// Liste déroulante DSFR : 1 set, même mapping que angular/select.figma.ts et
// html/select-html.figma.ts. Thème sombre = CSS seul.
// « État » porte la sévérité du message (`state`/`stateRelatedMessage`), « Désactivé »
// porte la prop `disabled` (top-level, distincte de `nativeSelectProps`).
// Composant stable `Select` retenu plutôt que `SelectNext` (variante plus récente mais
// non désignée comme remplacement recommandé dans le README react-dsfr à ce jour).
// `nativeSelectProps` : déclaré en `const nativeSelectProps = ...` avant le JSX (comme
// breadcrumb.figma.ts) puis référencé en `nativeSelectProps={nativeSelectProps}`, plutôt
// qu'en valeur d'attribut inline entre guillemets doubles.

figma.connect('<FIGMA_LISTE_DEROULANTE__LISTE_DEROULANTE>', {
  props: {
    disabled: figma.boolean('Désactivé', { true: ' disabled', false: '' }),
    severity: figma.enum('État', {
      Défaut: '',
      Succès: ` state="success" stateRelatedMessage="Texte de validation"`,
      Erreur: ` state="error" stateRelatedMessage="Texte d'erreur"`,
      Désactivé: '',
    }),
  },
  example: ({ disabled, severity }) =>
    html`const nativeSelectProps = { name: 'select' };

<Select
  label="Libellé de la liste déroulante"
  nativeSelectProps={nativeSelectProps}${disabled}${severity}
>
  <option value="" selected disabled hidden>Sélectionner une option</option>
  <option value="option-1">Première option</option>
  <option value="option-2">Deuxième option</option>
  <option value="option-3">Troisième option</option>
</Select>`,
  imports: ["import { Select } from '@codegouvfr/react-dsfr/Select'"],
});
