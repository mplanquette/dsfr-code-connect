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
figma.connect('<FIGMA_TAG__NON_CLIQUABLE_MD>', {
  props: iconProps,
  example: ({ label, iconClass }) => html`<p class="fr-tag${iconClass}">${label}</p>`,
});

figma.connect('<FIGMA_TAG__NON_CLIQUABLE_SM>', {
  props: iconProps,
  example: ({ label, iconClass }) => html`<p class="fr-tag fr-tag--sm${iconClass}">${label}</p>`,
});

// ─── Cliquable ──────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__CLIQUABLE_DEFAUT_MD>', {
  props: clickableProps,
  example: ({ label, iconClass, disabled }) => html`<a class="fr-tag${iconClass}" href="#"${disabled}>${label}</a>`,
});

figma.connect('<FIGMA_TAG__CLIQUABLE_DEFAUT_SM>', {
  props: clickableProps,
  example: ({ label, iconClass, disabled }) => html`<a class="fr-tag fr-tag--sm${iconClass}" href="#"${disabled}>${label}</a>`,
});

// ─── Cliquable personnalisable ──────────────────────────────────────────────
figma.connect('<FIGMA_TAG__CLIQUABLE_PERSONNALISABLE_MD>', {
  props: clickableProps,
  example: ({ label, iconClass, disabled }) => html`<a class="fr-tag fr-tag--green-emeraude${iconClass}" href="#"${disabled}>${label}</a>`,
});

figma.connect('<FIGMA_TAG__CLIQUABLE_PERSONNALISABLE_SM>', {
  props: clickableProps,
  example: ({ label, iconClass, disabled }) => html`<a class="fr-tag fr-tag--sm fr-tag--green-emeraude${iconClass}" href="#"${disabled}>${label}</a>`,
});

// ─── Sélectionnable ─────────────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__SELECTIONNE_MD>', {
  props: selectableProps,
  example: ({ label, iconClass, selected, disabled }) => html`<button class="fr-tag${iconClass}" type="button"${selected}${disabled}>${label}</button>`,
});

figma.connect('<FIGMA_TAG__SELECTIONNE_SM>', {
  props: selectableProps,
  example: ({ label, iconClass, selected, disabled }) => html`<button class="fr-tag fr-tag--sm${iconClass}" type="button"${selected}${disabled}>${label}</button>`,
});

// ─── Supprimable ────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__SUPPRIMABLE_MD>', {
  props: deletableProps,
  example: ({ label, dismissClass, disabled }) => html`<button class="fr-tag${dismissClass}" type="button"${disabled}>${label}</button>`,
});

figma.connect('<FIGMA_TAG__SUPPRIMABLE_SM>', {
  props: deletableProps,
  example: ({ label, dismissClass, disabled }) => html`<button class="fr-tag fr-tag--sm${dismissClass}" type="button"${disabled}>${label}</button>`,
});

// ─── Groupes ────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__GROUPE_NON_CLIQUABLE_MD>', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><p class="fr-tag">Libellé tag</p></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('<FIGMA_TAG__GROUPE_NON_CLIQUABLE_SM>', {
  props: smallGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><p class="fr-tag fr-tag--sm">Libellé tag</p></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('<FIGMA_TAG__GROUPE_CLIQUABLE_DEFAUT_MD>', {
  props: clickableGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><a class="fr-tag" href="#">Libellé tag</a></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('<FIGMA_TAG__GROUPE_CLIQUABLE_DEFAUT_SM>', {
  props: clickableSmallGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><a class="fr-tag fr-tag--sm" href="#">Libellé tag</a></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('<FIGMA_TAG__GROUPE_CLIQUABLE_PERSONNALISABLE_MD>', {
  props: {},
  example: () => html`<ul class="fr-tags-group"><li><a class="fr-tag fr-tag--green-emeraude" href="#">Libellé tag</a></li></ul>`,
});

figma.connect('<FIGMA_TAG__GROUPE_CLIQUABLE_PERSONNALISABLE_SM>', {
  props: {},
  example: () => html`<ul class="fr-tags-group"><li><a class="fr-tag fr-tag--sm fr-tag--green-emeraude" href="#">Libellé tag</a></li></ul>`,
});

figma.connect('<FIGMA_TAG__GROUPE_SELECTIONNE_MD>', {
  props: selectedGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><button class="fr-tag" type="button" aria-pressed="true">Libellé tag</button></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('<FIGMA_TAG__GROUPE_SELECTIONNE_SM>', {
  props: selectedSmallGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><button class="fr-tag fr-tag--sm" type="button" aria-pressed="true">Libellé tag</button></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('<FIGMA_TAG__GROUPE_SUPPRIMABLE_MD>', {
  props: dismissGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><button class="fr-tag fr-tag--dismiss" type="button">Libellé tag</button></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});

figma.connect('<FIGMA_TAG__GROUPE_SUPPRIMABLE_SM>', {
  props: dismissSmallGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<ul class="fr-tags-group"><li><button class="fr-tag fr-tag--sm fr-tag--dismiss" type="button">Libellé tag</button></li>${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}</ul>`,
});
