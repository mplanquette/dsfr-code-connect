// Groupe de tags DSFR : 10 component sets (mode x taille), quatre stacks. Données de chaque set dans
// tag.json : `mode` (plain, clickable, custom, selectable, deletable) et `size` (SM / MD).
// Le premier tag est toujours présent ; « Voir tag 2 » à « Voir tag 8 » ajoutent les suivants.
// Chaque libellé est lu dans l'instance imbriquée du tag (« ⚙️ Varier les propriétés - Tag N »,
// « 🎨 … » dans le set personnalisable MD) : le snippet reprend les libellés saisis dans le design.
// « Cliquable personnalisable » n'a aucune propriété de visibilité : snippet à un seul tag.
// Angular : les tags supplémentaires sont simplifiés en `{ label }` quel que soit le mode (le mode
// du groupe s'applique via `mode`).
// React : `smallTags` pour la taille SM. Les tags supplémentaires reprennent la forme du premier.
// Vue : le composant de groupe est `DsfrTags` (PAS `DsfrTagsGroup`, qui n'existe pas dans ce
// package, vérifié sur github.com/dnum-mi/vue-dsfr/src/components/DsfrTag/). Les tags
// supplémentaires sont simplifiés en `{ label }`. `DsfrTags` ne transmet pas de `class` par item
// (pas d'équivalent pour « personnalisable ») et n'a pas de mode supprimable : ces deux sets
// retombent sur le markup DSFR brut (un seul tag, propriétés « Voir tag N » non lues), sans imports.
import figma from 'figma'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeJsString, escapeText } from '../_shared/text'

const instance = figma.selectedInstance
const { stack, mode, size } = figma.batch as {
  stack: string
  mode: 'plain' | 'clickable' | 'custom' | 'selectable' | 'deletable'
  size: 'SM' | 'MD'
}

const small = size === 'SM'
const TAG_PREFIXES = ['⚙️ Varier les propriétés', '🎨 Varier les propriétés']

/** Libellé du tag `index`, lu dans son instance imbriquée. */
function readLabel(index: number): string {
  for (const prefix of TAG_PREFIXES) {
    const tag = instance.findInstance(`${prefix} - Tag ${index}`)
    if (tag.type === 'INSTANCE') return tag.getString('Libellé')
  }
  return 'Libellé tag'
}

/** Libellés des tags affichés : le premier toujours, les suivants selon « Voir tag 2 » à « Voir tag 8 ». */
function readLabels(): string[] {
  if (mode === 'custom') return [readLabel(1)]
  return [1, 2, 3, 4, 5, 6, 7, 8].filter((index) => index === 1 || instance.getBoolean(`Voir tag ${index}`)).map(readLabel)
}

const labels = readLabels()
/** Libellé placé dans une chaîne JavaScript elle-même dans un attribut (Angular, Vue). */
const inAttribute = (label: string) => escapeAttribute(escapeJsString(label))

const rendered = renderFor(stack, {
  angular: () => {
    const sm = small ? ', small: true' : ''
    const [first, ...extras] = labels.map(inAttribute)
    const body = {
      plain: `<dsfr-tags-group [tags]="[{ label: '${first}'${sm} }`,
      clickable: `<dsfr-tags-group mode="clickable" [tags]="[{ label: '${first}', link: '#'${sm} }`,
      custom: `<dsfr-tags-group mode="clickable" [tags]="[{ label: '${first}', link: '#', customClass: 'fr-tag--green-emeraude'${sm} }]"></dsfr-tags-group>`,
      selectable: `<dsfr-tags-group mode="selectable" [tags]="[{ label: '${first}', selected: true${sm} }`,
      deletable: `<dsfr-tags-group mode="deletable" [tags]="[{ label: '${first}'${sm} }`,
    }[mode]
    const example =
      mode === 'custom'
        ? figma.code`${body}`
        : figma.code`${body}${extras.map((label) => `, { label: '${label}' }`).join('')}]"></dsfr-tags-group>`
    return { imports: ["import { DsfrTagComponent, DsfrTagsGroupComponent } from '@edugouvfr/ngx-dsfr'"], example }
  },
  html: () => {
    const sm = small ? ' fr-tag--sm' : ''
    const item = (label: string) => ({
      plain: `<li><p class="fr-tag${sm}">${label}</p></li>`,
      clickable: `<li><a class="fr-tag${sm}" href="#">${label}</a></li>`,
      custom: `<li><a class="fr-tag${sm} fr-tag--green-emeraude" href="#">${label}</a></li>`,
      selectable: `<li><button class="fr-tag${sm}" type="button" aria-pressed="true">${label}</button></li>`,
      deletable: `<li><button class="fr-tag${sm} fr-tag--dismiss" type="button">${label}</button></li>`,
    })[mode]
    return { example: figma.code`<ul class="fr-tags-group">${labels.map((label) => item(escapeText(label))).join('')}</ul>` }
  },
  react: () => {
    const item = (label: string) => ({
      plain: `{ children: '${label}' }`,
      clickable: `{ children: '${label}', linkProps: { href: '#' } }`,
      custom: `{ children: '${label}', className: 'fr-tag--green-emeraude', linkProps: { href: '#' } }`,
      selectable: `{ children: '${label}', as: 'button', pressed: true }`,
      deletable: `{ children: '${label}', as: 'button', dismissible: true }`,
    })[mode]
    return {
      imports: ["import { TagsGroup } from '@codegouvfr/react-dsfr/TagsGroup'"],
      example: figma.code`const tags = [${labels.map((label) => item(escapeJsString(label))).join(', ')}];

<TagsGroup${small ? ' smallTags' : ''} tags={tags} />`,
    }
  },
  vue: () => {
    const sm = small ? ', small: true' : ''
    if (mode === 'custom' || mode === 'deletable') {
      const smClass = small ? ' fr-tag--sm' : ''
      const label = escapeText(labels[0])
      const item =
        mode === 'custom'
          ? `<li><a class="fr-tag${smClass} fr-tag--green-emeraude" href="#">${label}</a></li>`
          : `<li><button class="fr-tag${smClass} fr-tag--dismiss" type="button">${label}</button></li>`
      return { example: figma.code`<ul class="fr-tags-group">${item}</ul>` }
    }
    const [first, ...extras] = labels.map(inAttribute)
    const head = {
      plain: `{ label: '${first}'${sm} }`,
      clickable: `{ label: '${first}', link: '#'${sm} }`,
      selectable: `{ label: '${first}', selectable: true, selected: true, value: 'tag-value'${sm} }`,
    }[mode]
    return {
      imports: ["import DsfrTags from '@gouvminint/vue-dsfr/DsfrTags.vue'"],
      example: figma.code`<DsfrTags :tags="[${head}${extras.map((label) => `, { label: '${label}' }`).join('')}]" />`,
    }
  },
})

export default {
  id: `tag-group-${mode}-${size}`,
  ...rendered,
  metadata: { nestable: true },
}
