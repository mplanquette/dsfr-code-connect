import figma, { html } from '@figma/code-connect/html';

// Tag DSFR : composants Figma séparés par thème, mode et taille.
// Thème (Clair/Sombre), État (Défaut/Survol/Cliqué) et Focus = CSS uniquement.
// L'icône concrète n'est pas dérivable du design : placeholder `fr-icon-arrow-right-line`.
// Les variantes personnalisables utilisent une classe illustrative à remplacer selon le besoin.

const iconProps = {
  label: figma.string('Libellé'),
  iconClass: figma.boolean('Voir icône', {
    true: ' fr-tag--icon-left fr-icon-arrow-right-line',
    false: '',
  }),
};

const clickableProps = {
  ...iconProps,
  disabled: figma.enum('Désactivé', {
    False: '',
    True: ' aria-disabled="true"',
  }),
};

const selectableProps = {
  ...iconProps,
  selected: figma.enum('Sélectionné', {
    False: ' aria-pressed="false"',
    True: ' aria-pressed="true"',
  }),
  disabled: figma.enum('Désactivé', {
    False: '',
    True: ' disabled',
  }),
};

const deletableProps = {
  label: figma.string('Libellé'),
  dismissClass: figma.enum('Supprimable', {
    False: '',
    True: ' fr-tag--dismiss',
  }),
  disabled: figma.enum('Désactivé', {
    False: '',
    True: ' disabled',
  }),
};

const groupProps = {
  tag2: figma.boolean('Voir tag 2', { true: '<li><p class="fr-tag">Libellé tag</p></li>', false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: '<li><p class="fr-tag">Libellé tag</p></li>', false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: '<li><p class="fr-tag">Libellé tag</p></li>', false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: '<li><p class="fr-tag">Libellé tag</p></li>', false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: '<li><p class="fr-tag">Libellé tag</p></li>', false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: '<li><p class="fr-tag">Libellé tag</p></li>', false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: '<li><p class="fr-tag">Libellé tag</p></li>', false: '' }),
};

const smallGroupProps = {
  tag2: figma.boolean('Voir tag 2', { true: '<li><p class="fr-tag fr-tag--sm">Libellé tag</p></li>', false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: '<li><p class="fr-tag fr-tag--sm">Libellé tag</p></li>', false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: '<li><p class="fr-tag fr-tag--sm">Libellé tag</p></li>', false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: '<li><p class="fr-tag fr-tag--sm">Libellé tag</p></li>', false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: '<li><p class="fr-tag fr-tag--sm">Libellé tag</p></li>', false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: '<li><p class="fr-tag fr-tag--sm">Libellé tag</p></li>', false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: '<li><p class="fr-tag fr-tag--sm">Libellé tag</p></li>', false: '' }),
};

const clickableGroupProps = {
  tag2: figma.boolean('Voir tag 2', { true: '<li><a class="fr-tag" href="#">Libellé tag</a></li>', false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: '<li><a class="fr-tag" href="#">Libellé tag</a></li>', false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: '<li><a class="fr-tag" href="#">Libellé tag</a></li>', false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: '<li><a class="fr-tag" href="#">Libellé tag</a></li>', false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: '<li><a class="fr-tag" href="#">Libellé tag</a></li>', false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: '<li><a class="fr-tag" href="#">Libellé tag</a></li>', false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: '<li><a class="fr-tag" href="#">Libellé tag</a></li>', false: '' }),
};

const clickableSmallGroupProps = {
  tag2: figma.boolean('Voir tag 2', { true: '<li><a class="fr-tag fr-tag--sm" href="#">Libellé tag</a></li>', false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: '<li><a class="fr-tag fr-tag--sm" href="#">Libellé tag</a></li>', false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: '<li><a class="fr-tag fr-tag--sm" href="#">Libellé tag</a></li>', false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: '<li><a class="fr-tag fr-tag--sm" href="#">Libellé tag</a></li>', false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: '<li><a class="fr-tag fr-tag--sm" href="#">Libellé tag</a></li>', false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: '<li><a class="fr-tag fr-tag--sm" href="#">Libellé tag</a></li>', false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: '<li><a class="fr-tag fr-tag--sm" href="#">Libellé tag</a></li>', false: '' }),
};

const selectedGroupProps = {
  tag2: figma.boolean('Voir tag 2', { true: '<li><button class="fr-tag" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: '<li><button class="fr-tag" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: '<li><button class="fr-tag" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: '<li><button class="fr-tag" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: '<li><button class="fr-tag" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: '<li><button class="fr-tag" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: '<li><button class="fr-tag" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
};

const selectedSmallGroupProps = {
  tag2: figma.boolean('Voir tag 2', { true: '<li><button class="fr-tag fr-tag--sm" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: '<li><button class="fr-tag fr-tag--sm" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: '<li><button class="fr-tag fr-tag--sm" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: '<li><button class="fr-tag fr-tag--sm" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: '<li><button class="fr-tag fr-tag--sm" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: '<li><button class="fr-tag fr-tag--sm" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: '<li><button class="fr-tag fr-tag--sm" type="button" aria-pressed="true">Libellé tag</button></li>', false: '' }),
};

const dismissGroupProps = {
  tag2: figma.boolean('Voir tag 2', { true: '<li><button class="fr-tag fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: '<li><button class="fr-tag fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: '<li><button class="fr-tag fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: '<li><button class="fr-tag fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: '<li><button class="fr-tag fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: '<li><button class="fr-tag fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: '<li><button class="fr-tag fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
};

const dismissSmallGroupProps = {
  tag2: figma.boolean('Voir tag 2', { true: '<li><button class="fr-tag fr-tag--sm fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: '<li><button class="fr-tag fr-tag--sm fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: '<li><button class="fr-tag fr-tag--sm fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: '<li><button class="fr-tag fr-tag--sm fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: '<li><button class="fr-tag fr-tag--sm fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: '<li><button class="fr-tag fr-tag--sm fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: '<li><button class="fr-tag fr-tag--sm fr-tag--dismiss" type="button">Libellé tag</button></li>', false: '' }),
};

// ─── Non-cliquable ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482890', {
  props: iconProps,
  example: ({ label, iconClass }) => html`<p class="fr-tag${iconClass}">${label}</p>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482894', {
  props: iconProps,
  example: ({ label, iconClass }) => html`<p class="fr-tag fr-tag--sm${iconClass}">${label}</p>`,
});

// ─── Cliquable ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482688', {
  props: clickableProps,
  example: ({ label, iconClass, disabled }) => html`<a class="fr-tag${iconClass}" href="#"${disabled}>${label}</a>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482709', {
  props: clickableProps,
  example: ({ label, iconClass, disabled }) => html`<a class="fr-tag fr-tag--sm${iconClass}" href="#"${disabled}>${label}</a>`,
});

// ─── Cliquable personnalisable ──────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19386-359002', {
  props: clickableProps,
  example: ({ label, iconClass, disabled }) => html`<a class="fr-tag fr-tag--green-emeraude${iconClass}" href="#"${disabled}>${label}</a>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19386-359246', {
  props: clickableProps,
  example: ({ label, iconClass, disabled }) => html`<a class="fr-tag fr-tag--sm fr-tag--green-emeraude${iconClass}" href="#"${disabled}>${label}</a>`,
});

// ─── Sélectionnable ─────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482726', {
  props: selectableProps,
  example: ({ label, iconClass, selected, disabled }) => html`<button class="fr-tag${iconClass}" type="button"${selected}${disabled}>${label}</button>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482783', {
  props: selectableProps,
  example: ({ label, iconClass, selected, disabled }) => html`<button class="fr-tag fr-tag--sm${iconClass}" type="button"${selected}${disabled}>${label}</button>`,
});

// ─── Supprimable ────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482832', {
  props: deletableProps,
  example: ({ label, dismissClass, disabled }) => html`<button class="fr-tag${dismissClass}" type="button"${disabled}>${label}</button>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482861', {
  props: deletableProps,
  example: ({ label, dismissClass, disabled }) => html`<button class="fr-tag fr-tag--sm${dismissClass}" type="button"${disabled}>${label}</button>`,
});

// ─── Groupes ────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482616', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><p class="fr-tag">Libellé tag</p></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482625', {
  props: smallGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><p class="fr-tag fr-tag--sm">Libellé tag</p></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482634', {
  props: clickableGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><a class="fr-tag" href="#">Libellé tag</a></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482643', {
  props: clickableSmallGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><a class="fr-tag fr-tag--sm" href="#">Libellé tag</a></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19386-359118', {
  props: {},
  example: () => html`<ul class="fr-tags-group"><li><a class="fr-tag fr-tag--green-emeraude" href="#">Libellé tag</a></li></ul>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19386-359217', {
  props: {},
  example: () => html`<ul class="fr-tags-group"><li><a class="fr-tag fr-tag--sm fr-tag--green-emeraude" href="#">Libellé tag</a></li></ul>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482652', {
  props: selectedGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><button class="fr-tag" type="button" aria-pressed="true">Libellé tag</button></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482661', {
  props: selectedSmallGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><button class="fr-tag fr-tag--sm" type="button" aria-pressed="true">Libellé tag</button></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482670', {
  props: dismissGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><button class="fr-tag fr-tag--dismiss" type="button">Libellé tag</button></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482679', {
  props: dismissSmallGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><button class="fr-tag fr-tag--sm fr-tag--dismiss" type="button">Libellé tag</button></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});
