import figma, { html } from '@figma/code-connect/html';

// Tag DSFR : composants Figma séparés par thème, mode et taille (mêmes node-ids que
// angular/tag.figma.ts et html/tag-html.figma.ts, y compris les doublons de node-id
// hérités de la fusion Thème clair/Thème sombre, cf. note de migration du CLAUDE.md).
// Thème (Clair/Sombre), État (Défaut/Survol/Cliqué) et Focus = CSS uniquement.
// L'icône concrète n'est pas dérivable du design : placeholder `fr-icon-arrow-right-line`.
// Les variantes personnalisables utilisent une classe illustrative à remplacer selon le besoin.
// react-dsfr `Tag` est un composant polymorphe (`as="p"|"span"|"button"|"a"`) : Non-cliquable
// → `as="p"` (défaut), Cliquable → `as="a"` + `linkProps`, Sélectionnable → `as="button"` +
// `pressed`, Supprimable → `as="button"` + `dismissible`. Le Désactivé d'un lien n'a pas
// d'équivalent typé (`AsAnchor` ne porte pas de `disabled`) : simulé via `aria-disabled` posé
// sur `linkProps`, comme côté html/ (`aria-disabled="true"`).
// `linkProps`, `nativeButtonProps` et `tags[]` : déclarés en `const` avant le JSX (comme
// breadcrumb.figma.ts) puis référencés en `linkProps={linkProps}` / etc., plutôt qu'en
// valeur d'attribut inline entre guillemets doubles, le parser Code Connect (HTML
// générique) interprète toute valeur d'attribut multiligne ou multi-objets comme une
// liste d'attributs HTML et lève une erreur « Duplicate attribute name ».

const imports = ["import { Tag } from '@codegouvfr/react-dsfr/Tag'"];
const groupImports = ["import { TagsGroup } from '@codegouvfr/react-dsfr/TagsGroup'"];

const iconProps = {
  label: figma.string('Libellé'),
  iconAttrs: figma.boolean('Voir icône', {
    true: ' iconId="fr-icon-arrow-right-line"',
    false: '',
  }),
};

const clickableProps = {
  ...iconProps,
  disabled: figma.enum('Désactivé', {
    False: '',
    True: ", 'aria-disabled': true",
  }),
};

const selectableProps = {
  ...iconProps,
  selected: figma.enum('Sélectionné', {
    False: ' pressed={false}',
    True: ' pressed={true}',
  }),
  disabled: figma.enum('Désactivé', {
    False: 'undefined',
    True: '{ disabled: true }',
  }),
};

const deletableProps = {
  label: figma.string('Libellé'),
  dismissible: figma.enum('Supprimable', {
    False: '',
    True: ' dismissible',
  }),
  disabled: figma.enum('Désactivé', {
    False: 'undefined',
    True: '{ disabled: true }',
  }),
};

const groupProps = {
  tag2: figma.boolean('Voir tag 2', { true: ", { children: 'Libellé tag' }", false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: ", { children: 'Libellé tag' }", false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: ", { children: 'Libellé tag' }", false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: ", { children: 'Libellé tag' }", false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: ", { children: 'Libellé tag' }", false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: ", { children: 'Libellé tag' }", false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: ", { children: 'Libellé tag' }", false: '' }),
};

const clickableGroupProps = {
  tag2: figma.boolean('Voir tag 2', { true: ", { children: 'Libellé tag', linkProps: { href: '#' } }", false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: ", { children: 'Libellé tag', linkProps: { href: '#' } }", false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: ", { children: 'Libellé tag', linkProps: { href: '#' } }", false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: ", { children: 'Libellé tag', linkProps: { href: '#' } }", false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: ", { children: 'Libellé tag', linkProps: { href: '#' } }", false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: ", { children: 'Libellé tag', linkProps: { href: '#' } }", false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: ", { children: 'Libellé tag', linkProps: { href: '#' } }", false: '' }),
};

const selectedGroupProps = {
  tag2: figma.boolean('Voir tag 2', { true: ", { children: 'Libellé tag', as: 'button', pressed: true }", false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: ", { children: 'Libellé tag', as: 'button', pressed: true }", false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: ", { children: 'Libellé tag', as: 'button', pressed: true }", false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: ", { children: 'Libellé tag', as: 'button', pressed: true }", false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: ", { children: 'Libellé tag', as: 'button', pressed: true }", false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: ", { children: 'Libellé tag', as: 'button', pressed: true }", false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: ", { children: 'Libellé tag', as: 'button', pressed: true }", false: '' }),
};

const dismissGroupProps = {
  tag2: figma.boolean('Voir tag 2', { true: ", { children: 'Libellé tag', as: 'button', dismissible: true }", false: '' }),
  tag3: figma.boolean('Voir tag 3', { true: ", { children: 'Libellé tag', as: 'button', dismissible: true }", false: '' }),
  tag4: figma.boolean('Voir tag 4', { true: ", { children: 'Libellé tag', as: 'button', dismissible: true }", false: '' }),
  tag5: figma.boolean('Voir tag 5', { true: ", { children: 'Libellé tag', as: 'button', dismissible: true }", false: '' }),
  tag6: figma.boolean('Voir tag 6', { true: ", { children: 'Libellé tag', as: 'button', dismissible: true }", false: '' }),
  tag7: figma.boolean('Voir tag 7', { true: ", { children: 'Libellé tag', as: 'button', dismissible: true }", false: '' }),
  tag8: figma.boolean('Voir tag 8', { true: ", { children: 'Libellé tag', as: 'button', dismissible: true }", false: '' }),
};

// ─── Non-cliquable ──────────────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__NON_CLIQUABLE_MD>', {
  props: iconProps,
  example: ({ label, iconAttrs }) => html`<Tag as="p"${iconAttrs}>${label}</Tag>`,
  imports,
});

figma.connect('<FIGMA_TAG__NON_CLIQUABLE_SM>', {
  props: iconProps,
  example: ({ label, iconAttrs }) => html`<Tag as="p" small${iconAttrs}>${label}</Tag>`,
  imports,
});

// ─── Cliquable ──────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__CLIQUABLE_DEFAUT_MD>', {
  props: clickableProps,
  example: ({ label, iconAttrs, disabled }) =>
    html`const linkProps = { href: '#'${disabled} };

<Tag as="a" linkProps={linkProps}${iconAttrs}>${label}</Tag>`,
  imports,
});

figma.connect('<FIGMA_TAG__CLIQUABLE_DEFAUT_SM>', {
  props: clickableProps,
  example: ({ label, iconAttrs, disabled }) =>
    html`const linkProps = { href: '#'${disabled} };

<Tag as="a" small linkProps={linkProps}${iconAttrs}>${label}</Tag>`,
  imports,
});

// ─── Cliquable personnalisable ──────────────────────────────────────────────
figma.connect('<FIGMA_TAG__CLIQUABLE_PERSONNALISABLE_MD>', {
  props: clickableProps,
  example: ({ label, iconAttrs, disabled }) =>
    html`const linkProps = { href: '#'${disabled} };

<Tag as="a" className="fr-tag--green-emeraude" linkProps={linkProps}${iconAttrs}>${label}</Tag>`,
  imports,
});

figma.connect('<FIGMA_TAG__CLIQUABLE_PERSONNALISABLE_SM>', {
  props: clickableProps,
  example: ({ label, iconAttrs, disabled }) =>
    html`const linkProps = { href: '#'${disabled} };

<Tag as="a" small className="fr-tag--green-emeraude" linkProps={linkProps}${iconAttrs}>${label}</Tag>`,
  imports,
});

// ─── Sélectionnable ─────────────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__SELECTIONNE_MD>', {
  props: selectableProps,
  example: ({ label, iconAttrs, selected, disabled }) =>
    html`const nativeButtonProps = ${disabled};

<Tag as="button"${selected} nativeButtonProps={nativeButtonProps}${iconAttrs}>${label}</Tag>`,
  imports,
});

figma.connect('<FIGMA_TAG__SELECTIONNE_SM>', {
  props: selectableProps,
  example: ({ label, iconAttrs, selected, disabled }) =>
    html`const nativeButtonProps = ${disabled};

<Tag as="button" small${selected} nativeButtonProps={nativeButtonProps}${iconAttrs}>${label}</Tag>`,
  imports,
});

// ─── Supprimable ────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__SUPPRIMABLE_MD>', {
  props: deletableProps,
  example: ({ label, dismissible, disabled }) =>
    html`const nativeButtonProps = ${disabled};

<Tag as="button"${dismissible} nativeButtonProps={nativeButtonProps}>${label}</Tag>`,
  imports,
});

figma.connect('<FIGMA_TAG__SUPPRIMABLE_SM>', {
  props: deletableProps,
  example: ({ label, dismissible, disabled }) =>
    html`const nativeButtonProps = ${disabled};

<Tag as="button" small${dismissible} nativeButtonProps={nativeButtonProps}>${label}</Tag>`,
  imports,
});

// ─── Groupes ────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__GROUPE_NON_CLIQUABLE_MD>', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) =>
    html`const tags = [{ children: 'Libellé tag' }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}];

<TagsGroup tags={tags} />`,
  imports: groupImports,
});

figma.connect('<FIGMA_TAG__GROUPE_NON_CLIQUABLE_SM>', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) =>
    html`const tags = [{ children: 'Libellé tag' }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}];

<TagsGroup smallTags tags={tags} />`,
  imports: groupImports,
});

figma.connect('<FIGMA_TAG__GROUPE_CLIQUABLE_DEFAUT_MD>', {
  props: clickableGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) =>
    html`const tags = [{ children: 'Libellé tag', linkProps: { href: '#' } }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}];

<TagsGroup tags={tags} />`,
  imports: groupImports,
});

figma.connect('<FIGMA_TAG__GROUPE_CLIQUABLE_DEFAUT_SM>', {
  props: clickableGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) =>
    html`const tags = [{ children: 'Libellé tag', linkProps: { href: '#' } }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}];

<TagsGroup smallTags tags={tags} />`,
  imports: groupImports,
});

figma.connect('<FIGMA_TAG__GROUPE_CLIQUABLE_PERSONNALISABLE_MD>', {
  props: {},
  example: () =>
    html`const tags = [{ children: 'Libellé tag', className: 'fr-tag--green-emeraude', linkProps: { href: '#' } }];

<TagsGroup tags={tags} />`,
  imports: groupImports,
});

figma.connect('<FIGMA_TAG__GROUPE_CLIQUABLE_PERSONNALISABLE_SM>', {
  props: {},
  example: () =>
    html`const tags = [{ children: 'Libellé tag', className: 'fr-tag--green-emeraude', linkProps: { href: '#' } }];

<TagsGroup smallTags tags={tags} />`,
  imports: groupImports,
});

figma.connect('<FIGMA_TAG__GROUPE_SELECTIONNE_MD>', {
  props: selectedGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) =>
    html`const tags = [{ children: 'Libellé tag', as: 'button', pressed: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}];

<TagsGroup tags={tags} />`,
  imports: groupImports,
});

figma.connect('<FIGMA_TAG__GROUPE_SELECTIONNE_SM>', {
  props: selectedGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) =>
    html`const tags = [{ children: 'Libellé tag', as: 'button', pressed: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}];

<TagsGroup smallTags tags={tags} />`,
  imports: groupImports,
});

figma.connect('<FIGMA_TAG__GROUPE_SUPPRIMABLE_MD>', {
  props: dismissGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) =>
    html`const tags = [{ children: 'Libellé tag', as: 'button', dismissible: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}];

<TagsGroup tags={tags} />`,
  imports: groupImports,
});

figma.connect('<FIGMA_TAG__GROUPE_SUPPRIMABLE_SM>', {
  props: dismissGroupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) =>
    html`const tags = [{ children: 'Libellé tag', as: 'button', dismissible: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}];

<TagsGroup smallTags tags={tags} />`,
  imports: groupImports,
});
