// Constantes partagées stacks/labels, portage JS de scripts/lib-select-stacks.sh + le mapping
// stack->label en dur dans scripts/publish.sh.
const STACKS = [
  { id: 'angular', label: 'Angular', description: '@edugouvfr/ngx-dsfr' },
  { id: 'html', label: 'HTML', description: 'DSFR vanilla (classes fr-*)' },
  { id: 'react', label: 'React', description: '@codegouvfr/react-dsfr' },
  { id: 'vue', label: 'Vue', description: '@gouvminint/vue-dsfr' },
];

module.exports = { STACKS };
