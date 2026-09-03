import figma, { html } from '@figma/code-connect/html';

// Tag DSFR : composants Figma séparés par thème, mode et taille.
// Thème (Clair/Sombre), État (Défaut/Survol/Cliqué) et Focus = CSS uniquement.
// L'icône concrète n'est pas dérivable du design : placeholder `fr-icon-arrow-right-line`.
// Les variantes personnalisables utilisent une classe illustrative à remplacer selon le besoin.

const imports = ["import { DsfrTagComponent, DsfrTagsGroupComponent } from '@edugouvfr/ngx-dsfr'"];

const iconProps = {
  label: figma.string('Libellé'),
  iconAttr: figma.boolean('Voir icône', {
    true: ' icon="fr-icon-arrow-right-line"',
    false: '',
  }),
};

const clickableProps = {
  ...iconProps,
  disabled: figma.enum('Désactivé', {
    False: '',
    True: ' [disabled]="true"',
  }),
};

const selectableProps = {
  ...clickableProps,
  selected: figma.enum('Sélectionné', {
    False: '',
    True: ' [selected]="true"',
  }),
};

const deletableProps = {
  label: figma.string('Libellé'),
  mode: figma.enum('Supprimable', {
    False: '',
    True: ' mode="deletable"',
  }),
  disabled: figma.enum('Désactivé', {
    False: '',
    True: ' [disabled]="true"',
  }),
};

const groupProps = {
  tag2: figma.boolean('Voir tag 2', { true: ", { label: 'Libellé tag' }", false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: ", { label: 'Libellé tag' }", false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: ", { label: 'Libellé tag' }", false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: ", { label: 'Libellé tag' }", false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: ", { label: 'Libellé tag' }", false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: ", { label: 'Libellé tag' }", false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: ", { label: 'Libellé tag' }", false: '' }),
};

const customGroupProps = {
  tag2: figma.boolean('Voir tag 2', { true: ", { label: 'Libellé tag', customClass: 'fr-tag--green-emeraude' }", false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: ", { label: 'Libellé tag', customClass: 'fr-tag--green-emeraude' }", false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: ", { label: 'Libellé tag', customClass: 'fr-tag--green-emeraude' }", false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: ", { label: 'Libellé tag', customClass: 'fr-tag--green-emeraude' }", false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: ", { label: 'Libellé tag', customClass: 'fr-tag--green-emeraude' }", false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: ", { label: 'Libellé tag', customClass: 'fr-tag--green-emeraude' }", false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: ", { label: 'Libellé tag', customClass: 'fr-tag--green-emeraude' }", false: '' }),
};

// ─── Non-cliquable ──────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482890', {
  props: iconProps,
  example: ({ label, iconAttr }) => html`<dsfr-tag label="${label}"${iconAttr}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482894', {
  props: iconProps,
  example: ({ label, iconAttr }) => html`<dsfr-tag label="${label}" [small]="true"${iconAttr}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482890', {
  props: iconProps,
  example: ({ label, iconAttr }) => html`<dsfr-tag label="${label}"${iconAttr}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482894', {
  props: iconProps,
  example: ({ label, iconAttr }) => html`<dsfr-tag label="${label}" [small]="true"${iconAttr}></dsfr-tag>`,
  imports,
});

// ─── Cliquable ──────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482688', {
  props: clickableProps,
  example: ({ label, iconAttr, disabled }) => html`<dsfr-tag label="${label}" mode="clickable" link="#"${iconAttr}${disabled}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482709', {
  props: clickableProps,
  example: ({ label, iconAttr, disabled }) => html`<dsfr-tag label="${label}" mode="clickable" link="#" [small]="true"${iconAttr}${disabled}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482688', {
  props: clickableProps,
  example: ({ label, iconAttr, disabled }) => html`<dsfr-tag label="${label}" mode="clickable" link="#"${iconAttr}${disabled}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482709', {
  props: clickableProps,
  example: ({ label, iconAttr, disabled }) => html`<dsfr-tag label="${label}" mode="clickable" link="#" [small]="true"${iconAttr}${disabled}></dsfr-tag>`,
  imports,
});

// ─── Cliquable personnalisable ──────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19386-359002', {
  props: clickableProps,
  example: ({ label, iconAttr, disabled }) => html`<dsfr-tag label="${label}" mode="clickable" link="#" customClass="fr-tag--green-emeraude"${iconAttr}${disabled}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19386-359246', {
  props: clickableProps,
  example: ({ label, iconAttr, disabled }) => html`<dsfr-tag label="${label}" mode="clickable" link="#" customClass="fr-tag--green-emeraude" [small]="true"${iconAttr}${disabled}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19386-359002', {
  props: clickableProps,
  example: ({ label, iconAttr, disabled }) => html`<dsfr-tag label="${label}" mode="clickable" link="#" customClass="fr-tag--green-emeraude"${iconAttr}${disabled}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19386-359246', {
  props: clickableProps,
  example: ({ label, iconAttr, disabled }) => html`<dsfr-tag label="${label}" mode="clickable" link="#" customClass="fr-tag--green-emeraude" [small]="true"${iconAttr}${disabled}></dsfr-tag>`,
  imports,
});

// ─── Sélectionnable ─────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482726', {
  props: selectableProps,
  example: ({ label, iconAttr, selected, disabled }) => html`<dsfr-tag label="${label}" mode="selectable"${iconAttr}${selected}${disabled}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482783', {
  props: selectableProps,
  example: ({ label, iconAttr, selected, disabled }) => html`<dsfr-tag label="${label}" mode="selectable" [small]="true"${iconAttr}${selected}${disabled}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482726', {
  props: selectableProps,
  example: ({ label, iconAttr, selected, disabled }) => html`<dsfr-tag label="${label}" mode="selectable"${iconAttr}${selected}${disabled}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482783', {
  props: selectableProps,
  example: ({ label, iconAttr, selected, disabled }) => html`<dsfr-tag label="${label}" mode="selectable" [small]="true"${iconAttr}${selected}${disabled}></dsfr-tag>`,
  imports,
});

// ─── Supprimable ────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482832', {
  props: deletableProps,
  example: ({ label, mode, disabled }) => html`<dsfr-tag label="${label}"${mode}${disabled}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482861', {
  props: deletableProps,
  example: ({ label, mode, disabled }) => html`<dsfr-tag label="${label}" [small]="true"${mode}${disabled}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482832', {
  props: deletableProps,
  example: ({ label, mode, disabled }) => html`<dsfr-tag label="${label}"${mode}${disabled}></dsfr-tag>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482861', {
  props: deletableProps,
  example: ({ label, mode, disabled }) => html`<dsfr-tag label="${label}" [small]="true"${mode}${disabled}></dsfr-tag>`,
  imports,
});

// ─── Groupes ────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482616', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<dsfr-tags-group [tags]="[{ label: 'Libellé tag' }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482625', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<dsfr-tags-group [tags]="[{ label: 'Libellé tag', small: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482634', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<dsfr-tags-group mode="clickable" [tags]="[{ label: 'Libellé tag', link: '#' }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482643', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<dsfr-tags-group mode="clickable" [tags]="[{ label: 'Libellé tag', link: '#', small: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19386-359118', {
  props: {},
  example: () => html`<dsfr-tags-group mode="clickable" [tags]="[{ label: 'Libellé tag', link: '#', customClass: 'fr-tag--green-emeraude' }]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19386-359217', {
  props: {},
  example: () => html`<dsfr-tags-group mode="clickable" [tags]="[{ label: 'Libellé tag', link: '#', customClass: 'fr-tag--green-emeraude', small: true }]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482652', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<dsfr-tags-group mode="selectable" [tags]="[{ label: 'Libellé tag', selected: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482661', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<dsfr-tags-group mode="selectable" [tags]="[{ label: 'Libellé tag', selected: true, small: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482670', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<dsfr-tags-group mode="deletable" [tags]="[{ label: 'Libellé tag' }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482679', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<dsfr-tags-group mode="deletable" [tags]="[{ label: 'Libellé tag', small: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482616', {
  props: {},
  example: () => html`<dsfr-tags-group [tags]="[{ label: 'Libellé tag' }]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482625', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<dsfr-tags-group [tags]="[{ label: 'Libellé tag', small: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482634', {
  props: {},
  example: () => html`<dsfr-tags-group mode="clickable" [tags]="[{ label: 'Libellé tag', link: '#' }]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482643', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<dsfr-tags-group mode="clickable" [tags]="[{ label: 'Libellé tag', link: '#', small: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19386-359118', {
  props: {},
  example: () => html`<dsfr-tags-group mode="clickable" [tags]="[{ label: 'Libellé tag', link: '#', customClass: 'fr-tag--green-emeraude' }]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19386-359217', {
  props: {},
  example: () => html`<dsfr-tags-group mode="clickable" [tags]="[{ label: 'Libellé tag', link: '#', customClass: 'fr-tag--green-emeraude', small: true }]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482652', {
  props: {},
  example: () => html`<dsfr-tags-group mode="selectable" [tags]="[{ label: 'Libellé tag', selected: true }]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482661', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<dsfr-tags-group mode="selectable" [tags]="[{ label: 'Libellé tag', selected: true, small: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482670', {
  props: {},
  example: () => html`<dsfr-tags-group mode="deletable" [tags]="[{ label: 'Libellé tag' }]"></dsfr-tags-group>`,
  imports,
});

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=19121-482679', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<dsfr-tags-group mode="deletable" [tags]="[{ label: 'Libellé tag', small: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]"></dsfr-tags-group>`,
  imports,
});
