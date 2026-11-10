// Groupe de tags DSFR : 10 component sets (mode x taille), quatre stacks. Données de chaque set dans
// tag.json : `mode` (plain, clickable, custom, selectable, deletable) et `size` (SM / MD).
// Le premier tag est toujours présent ; « Voir tag 2 » à « Voir tag 8 » ajoutent les suivants.
// « Cliquable personnalisable » n'a aucune propriété dans le design : snippet à un seul tag.
// Angular : les tags supplémentaires sont simplifiés en `{ label: 'Libellé tag' }` quel que soit
// le mode (le mode du groupe s'applique via `mode`).
// React : `smallTags` pour la taille SM. Les tags supplémentaires reprennent la forme du premier.
// Vue : le composant de groupe est `DsfrTags` (PAS `DsfrTagsGroup`, qui n'existe pas dans ce
// package, vérifié sur github.com/dnum-mi/vue-dsfr/src/components/DsfrTag/). Les tags
// supplémentaires sont simplifiés en `{ label: 'Libellé tag' }`. `DsfrTags` ne transmet pas de
// `class` par item (pas d'équivalent pour « personnalisable ») et n'a pas de mode supprimable :
// ces deux sets retombent sur le markup DSFR brut (un seul tag, propriétés « Voir tag N » non
// lues), sans imports.
import figma from 'figma'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, mode, size } = figma.batch as {
  stack: string
  mode: 'plain' | 'clickable' | 'custom' | 'selectable' | 'deletable'
  size: 'SM' | 'MD'
}

const small = size === 'SM'

/** Visibilité des tags supplémentaires (propriétés « Voir tag 2 » à « Voir tag 8 »). */
function readExtraTags(): boolean[] {
  return [2, 3, 4, 5, 6, 7, 8].map((index) => instance.getBoolean(`Voir tag ${index}`))
}

/** Concatène `fragment` pour chaque tag supplémentaire visible. */
function repeatExtras(fragment: string): string {
  return readExtraTags().map((visible) => (visible ? fragment : '')).join('')
}

const rendered = renderFor(stack, {
  angular: () => {
    const sm = small ? ', small: true' : ''
    const body = {
      plain: `<dsfr-tags-group [tags]="[{ label: 'Libellé tag'${sm} }`,
      clickable: `<dsfr-tags-group mode="clickable" [tags]="[{ label: 'Libellé tag', link: '#'${sm} }`,
      custom: `<dsfr-tags-group mode="clickable" [tags]="[{ label: 'Libellé tag', link: '#', customClass: 'fr-tag--green-emeraude'${sm} }]"></dsfr-tags-group>`,
      selectable: `<dsfr-tags-group mode="selectable" [tags]="[{ label: 'Libellé tag', selected: true${sm} }`,
      deletable: `<dsfr-tags-group mode="deletable" [tags]="[{ label: 'Libellé tag'${sm} }`,
    }[mode]
    const example =
      mode === 'custom'
        ? figma.code`${body}`
        : figma.code`${body}${repeatExtras(", { label: 'Libellé tag' }")}]"></dsfr-tags-group>`
    return { imports: ["import { DsfrTagComponent, DsfrTagsGroupComponent } from '@edugouvfr/ngx-dsfr'"], example }
  },
  html: () => {
    const sm = small ? ' fr-tag--sm' : ''
    const item = {
      plain: `<li><p class="fr-tag${sm}">Libellé tag</p></li>`,
      clickable: `<li><a class="fr-tag${sm}" href="#">Libellé tag</a></li>`,
      custom: `<li><a class="fr-tag${sm} fr-tag--green-emeraude" href="#">Libellé tag</a></li>`,
      selectable: `<li><button class="fr-tag${sm}" type="button" aria-pressed="true">Libellé tag</button></li>`,
      deletable: `<li><button class="fr-tag${sm} fr-tag--dismiss" type="button">Libellé tag</button></li>`,
    }[mode]
    const extras = mode === 'custom' ? '' : repeatExtras(item)
    return { example: figma.code`<ul class="fr-tags-group">${item}${extras}</ul>` }
  },
  react: () => {
    const item = {
      plain: `{ children: 'Libellé tag' }`,
      clickable: `{ children: 'Libellé tag', linkProps: { href: '#' } }`,
      custom: `{ children: 'Libellé tag', className: 'fr-tag--green-emeraude', linkProps: { href: '#' } }`,
      selectable: `{ children: 'Libellé tag', as: 'button', pressed: true }`,
      deletable: `{ children: 'Libellé tag', as: 'button', dismissible: true }`,
    }[mode]
    const extras = mode === 'custom' ? '' : repeatExtras(`, ${item}`)
    return {
      imports: ["import { TagsGroup } from '@codegouvfr/react-dsfr/TagsGroup'"],
      example: figma.code`const tags = [${item}${extras}];

<TagsGroup${small ? ' smallTags' : ''} tags={tags} />`,
    }
  },
  vue: () => {
    const sm = small ? ', small: true' : ''
    if (mode === 'custom' || mode === 'deletable') {
      const smClass = small ? ' fr-tag--sm' : ''
      const item =
        mode === 'custom'
          ? `<li><a class="fr-tag${smClass} fr-tag--green-emeraude" href="#">Libellé tag</a></li>`
          : `<li><button class="fr-tag${smClass} fr-tag--dismiss" type="button">Libellé tag</button></li>`
      return { example: figma.code`<ul class="fr-tags-group">${item}</ul>` }
    }
    const first = {
      plain: `{ label: 'Libellé tag'${sm} }`,
      clickable: `{ label: 'Libellé tag', link: '#'${sm} }`,
      selectable: `{ label: 'Libellé tag', selectable: true, selected: true, value: 'tag-value'${sm} }`,
    }[mode]
    return {
      imports: ["import DsfrTags from '@gouvminint/vue-dsfr/DsfrTags.vue'"],
      example: figma.code`<DsfrTags :tags="[${first}${repeatExtras(", { label: 'Libellé tag' }")}]" />`,
    }
  },
})

export default {
  id: `tag-group-${mode}-${size}`,
  ...rendered,
  metadata: { nestable: true },
}
