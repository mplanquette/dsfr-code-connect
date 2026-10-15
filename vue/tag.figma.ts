import figma, { html } from '@figma/code-connect/html';

// Tag DSFR : mêmes node-ids qu'angular/tag.figma.ts et react/tag.figma.ts.
// Thème (Clair/Sombre), État (Défaut/Survol/Cliqué) et Focus = CSS uniquement.
// L'icône concrète n'est pas dérivable du design : placeholder `fr-icon-arrow-right-line`.
// Les variantes personnalisables utilisent une classe illustrative à remplacer selon le besoin
// (fallthrough `class` fusionné automatiquement par Vue avec la classe `fr-tag` du composant).
// Composant de groupe vue-dsfr : `DsfrTags` (PAS `DsfrTagsGroup`, qui n'existe pas dans ce
// package, vérifié sur github.com/dnum-mi/vue-dsfr/src/components/DsfrTag/).
// `DsfrTag`/`DsfrTags` n'ont pas de mode « supprimable » (pas de bouton de suppression intégré,
// pas de classe `fr-tag--dismiss` gérée) : comme pour Lien, on retombe sur le markup DSFR brut
// pour les 4 nodes concernés (tag isolé et groupe), en forçant `tag-name="button"` + `class`
// quand un composant est tout de même utilisable (tag isolé).

const imports = ["import DsfrTag from '@gouvminint/vue-dsfr/DsfrTag.vue'"];
const groupImports = ["import DsfrTags from '@gouvminint/vue-dsfr/DsfrTags.vue'"];

const iconProps = {
  label: figma.string('Libellé'),
  icon: figma.boolean('Voir icône', { true: ' icon="fr-icon-arrow-right-line"', false: '' }),
};

const clickableProps = {
  ...iconProps,
  disabled: figma.enum('Désactivé', { False: '', True: ' disabled' }),
};

const selectableProps = {
  ...clickableProps,
  selected: figma.enum('Sélectionné', { False: '', True: ' selected' }),
};

const deletableProps = {
  label: figma.string('Libellé'),
  disabled: figma.enum('Désactivé', { False: '', True: ' disabled' }),
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

// ─── Non-cliquable ────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__NON_CLIQUABLE_MD>', {
  props: iconProps,
  example: ({ label, icon }) => html`<DsfrTag label="${label}"${icon} />`,
  imports,
});

figma.connect('<FIGMA_TAG__NON_CLIQUABLE_SM>', {
  props: iconProps,
  example: ({ label, icon }) => html`<DsfrTag label="${label}" small${icon} />`,
  imports,
});

// ─── Cliquable ────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__CLIQUABLE_DEFAUT_MD>', {
  props: clickableProps,
  example: ({ label, icon, disabled }) => html`<DsfrTag label="${label}" link="#"${icon}${disabled} />`,
  imports,
});

figma.connect('<FIGMA_TAG__CLIQUABLE_DEFAUT_SM>', {
  props: clickableProps,
  example: ({ label, icon, disabled }) => html`<DsfrTag label="${label}" link="#" small${icon}${disabled} />`,
  imports,
});

// ─── Cliquable personnalisable ────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__CLIQUABLE_PERSONNALISABLE_MD>', {
  props: clickableProps,
  example: ({ label, icon, disabled }) => html`<DsfrTag label="${label}" link="#" class="fr-tag--green-emeraude"${icon}${disabled} />`,
  imports,
});

figma.connect('<FIGMA_TAG__CLIQUABLE_PERSONNALISABLE_SM>', {
  props: clickableProps,
  example: ({ label, icon, disabled }) => html`<DsfrTag label="${label}" link="#" small class="fr-tag--green-emeraude"${icon}${disabled} />`,
  imports,
});

// ─── Sélectionnable ───────────────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__SELECTIONNE_MD>', {
  props: selectableProps,
  example: ({ label, icon, selected, disabled }) => html`<DsfrTag label="${label}" selectable value="tag-value"${icon}${selected}${disabled} />`,
  imports,
});

figma.connect('<FIGMA_TAG__SELECTIONNE_SM>', {
  props: selectableProps,
  example: ({ label, icon, selected, disabled }) => html`<DsfrTag label="${label}" selectable value="tag-value" small${icon}${selected}${disabled} />`,
  imports,
});

// ─── Supprimable (pas de mode dédié : tag-name="button" + classe fr-tag--dismiss) ─────────────
figma.connect('<FIGMA_TAG__SUPPRIMABLE_MD>', {
  props: deletableProps,
  example: ({ label, disabled }) => html`<DsfrTag label="${label}" tag-name="button" class="fr-tag--dismiss"${disabled} />`,
  imports,
});

figma.connect('<FIGMA_TAG__SUPPRIMABLE_SM>', {
  props: deletableProps,
  example: ({ label, disabled }) => html`<DsfrTag label="${label}" tag-name="button" small class="fr-tag--dismiss"${disabled} />`,
  imports,
});

// ─── Groupes ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_TAG__GROUPE_NON_CLIQUABLE_MD>', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<DsfrTags :tags="[{ label: 'Libellé tag' }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]" />`,
  imports: groupImports,
});

figma.connect('<FIGMA_TAG__GROUPE_NON_CLIQUABLE_SM>', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<DsfrTags :tags="[{ label: 'Libellé tag', small: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]" />`,
  imports: groupImports,
});

figma.connect('<FIGMA_TAG__GROUPE_CLIQUABLE_DEFAUT_MD>', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<DsfrTags :tags="[{ label: 'Libellé tag', link: '#' }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]" />`,
  imports: groupImports,
});

figma.connect('<FIGMA_TAG__GROUPE_CLIQUABLE_DEFAUT_SM>', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<DsfrTags :tags="[{ label: 'Libellé tag', link: '#', small: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]" />`,
  imports: groupImports,
});

// « Cliquable personnalisable » (groupe) : DsfrTags ne transmet pas de `class` par item du
// tableau `tags` → pas d'équivalent composant, markup DSFR brut comme pour Lien.
figma.connect('<FIGMA_TAG__GROUPE_CLIQUABLE_PERSONNALISABLE_MD>', {
  example: () => html`<ul class="fr-tags-group"><li><a class="fr-tag fr-tag--green-emeraude" href="#">Libellé tag</a></li></ul>`,
});

figma.connect('<FIGMA_TAG__GROUPE_CLIQUABLE_PERSONNALISABLE_SM>', {
  example: () => html`<ul class="fr-tags-group"><li><a class="fr-tag fr-tag--sm fr-tag--green-emeraude" href="#">Libellé tag</a></li></ul>`,
});

figma.connect('<FIGMA_TAG__GROUPE_SELECTIONNE_MD>', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<DsfrTags :tags="[{ label: 'Libellé tag', selectable: true, selected: true, value: 'tag-value' }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]" />`,
  imports: groupImports,
});

figma.connect('<FIGMA_TAG__GROUPE_SELECTIONNE_SM>', {
  props: groupProps,
  example: ({ tag2, tag3, tag4, tag5, tag6, tag7, tag8 }) => html`<DsfrTags :tags="[{ label: 'Libellé tag', selectable: true, selected: true, value: 'tag-value', small: true }${tag2}${tag3}${tag4}${tag5}${tag6}${tag7}${tag8}]" />`,
  imports: groupImports,
});

// « Supprimable » (groupe) : pas de mode dédié côté DsfrTags → markup DSFR brut.
figma.connect('<FIGMA_TAG__GROUPE_SUPPRIMABLE_MD>', {
  example: () => html`<ul class="fr-tags-group"><li><button class="fr-tag fr-tag--dismiss" type="button">Libellé tag</button></li></ul>`,
});

figma.connect('<FIGMA_TAG__GROUPE_SUPPRIMABLE_SM>', {
  example: () => html`<ul class="fr-tags-group"><li><button class="fr-tag fr-tag--sm fr-tag--dismiss" type="button">Libellé tag</button></li></ul>`,
});
