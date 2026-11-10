// Tag DSFR (tag isolé) : 10 component sets séparés par mode et taille, quatre stacks. Données de
// chaque set dans tag.json : `mode` (plain, clickable, custom, selectable, deletable) et `size`
// (SM / MD). Les groupes de tags ont leur propre template (tag-group.figma.batch.ts).
// Thème (Clair/Sombre), État (Défaut/Survol/Cliqué) et Focus = CSS uniquement.
// L'icône concrète n'est pas dérivable du design (« Icône » n'est pas lue) : placeholder
// `fr-icon-arrow-right-line`. Les variantes personnalisables utilisent une classe illustrative
// (`fr-tag--green-emeraude`) à remplacer selon le besoin.
// React : `Tag` est polymorphe (`as="p"|"span"|"button"|"a"`) : Non-cliquable = `as="p"` (défaut),
// Cliquable = `as="a"` + `linkProps`, Sélectionnable = `as="button"` + `pressed`, Supprimable =
// `as="button"` + `dismissible`. Le Désactivé d'un lien n'a pas d'équivalent typé (`AsAnchor` ne
// porte pas de `disabled`) : simulé via `aria-disabled` dans `linkProps`, comme en HTML.
// `linkProps` et `nativeButtonProps` sont déclarés en `const` avant le JSX.
// Écart assumé avec l'ancien code : hors état désactivé, `nativeButtonProps` valait `undefined`
// (texte littéral du snippet), ce que les tests de rendu rejettent ; il vaut désormais `{}`.
// Vue : `DsfrTag` n'a pas de mode « supprimable » (ni bouton de suppression, ni classe
// `fr-tag--dismiss` gérée) : on force `tag-name="button"` et `class="fr-tag--dismiss"`. Le fallthrough
// `class` est fusionné par Vue avec la classe `fr-tag` du composant. « Supprimable » n'est pas lue
// côté Vue (le snippet est le même quelle que soit sa valeur).
import figma from 'figma'
import { readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeText } from '../_shared/text'

const instance = figma.selectedInstance
const { stack, mode, size } = figma.batch as {
  stack: string
  mode: 'plain' | 'clickable' | 'custom' | 'selectable' | 'deletable'
  size: 'SM' | 'MD'
}

const small = size === 'SM'
const label = instance.getString('Libellé')
const hasIcon = mode !== 'deletable' && instance.getBoolean('Voir icône')
const disabled = mode === 'plain' ? false : readVariantFlag(instance, 'Désactivé')
const selected = mode === 'selectable' ? readVariantFlag(instance, 'Sélectionné') : false
const deletable = mode === 'deletable' && stack !== 'vue' ? readVariantFlag(instance, 'Supprimable') : false

const rendered = renderFor(stack, {
  angular: () => {
    const text = escapeAttribute(label)
    const smallAttr = small ? ' [small]="true"' : ''
    const iconAttr = hasIcon ? ' icon="fr-icon-arrow-right-line"' : ''
    const disabledAttr = disabled ? ' [disabled]="true"' : ''
    const attrs = {
      plain: `${smallAttr}${iconAttr}`,
      clickable: ` mode="clickable" link="#"${smallAttr}${iconAttr}${disabledAttr}`,
      custom: ` mode="clickable" link="#" customClass="fr-tag--green-emeraude"${smallAttr}${iconAttr}${disabledAttr}`,
      selectable: ` mode="selectable"${smallAttr}${iconAttr}${selected ? ' [selected]="true"' : ''}${disabledAttr}`,
      deletable: `${smallAttr}${deletable ? ' mode="deletable"' : ''}${disabledAttr}`,
    }[mode]
    return {
      imports: ["import { DsfrTagComponent, DsfrTagsGroupComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-tag label="${text}"${attrs}></dsfr-tag>`,
    }
  },
  html: () => {
    const text = escapeText(label)
    const sm = small ? ' fr-tag--sm' : ''
    const iconClass = hasIcon ? ' fr-tag--icon-left fr-icon-arrow-right-line' : ''
    const ariaDisabled = disabled ? ' aria-disabled="true"' : ''
    const nativeDisabled = disabled ? ' disabled' : ''
    const example = {
      plain: figma.code`<p class="fr-tag${sm}${iconClass}">${text}</p>`,
      clickable: figma.code`<a class="fr-tag${sm}${iconClass}" href="#"${ariaDisabled}>${text}</a>`,
      custom: figma.code`<a class="fr-tag${sm} fr-tag--green-emeraude${iconClass}" href="#"${ariaDisabled}>${text}</a>`,
      selectable: figma.code`<button class="fr-tag${sm}${iconClass}" type="button" aria-pressed="${selected ? 'true' : 'false'}"${nativeDisabled}>${text}</button>`,
      deletable: figma.code`<button class="fr-tag${sm}${deletable ? ' fr-tag--dismiss' : ''}" type="button"${nativeDisabled}>${text}</button>`,
    }[mode]
    return { example }
  },
  react: () => {
    const text = escapeText(label)
    const smallAttr = small ? ' small' : ''
    const iconAttrs = hasIcon ? ' iconId="fr-icon-arrow-right-line"' : ''
    const linkProps = `const linkProps = { href: '#'${disabled ? ", 'aria-disabled': true" : ''} };`
    const nativeButtonProps = `const nativeButtonProps = ${disabled ? '{ disabled: true }' : '{}'};`
    const example = {
      plain: figma.code`<Tag as="p"${smallAttr}${iconAttrs}>${text}</Tag>`,
      clickable: figma.code`${linkProps}

<Tag as="a"${smallAttr} linkProps={linkProps}${iconAttrs}>${text}</Tag>`,
      custom: figma.code`${linkProps}

<Tag as="a"${smallAttr} className="fr-tag--green-emeraude" linkProps={linkProps}${iconAttrs}>${text}</Tag>`,
      selectable: figma.code`${nativeButtonProps}

<Tag as="button"${smallAttr}${selected ? ' pressed={true}' : ' pressed={false}'} nativeButtonProps={nativeButtonProps}${iconAttrs}>${text}</Tag>`,
      deletable: figma.code`${nativeButtonProps}

<Tag as="button"${smallAttr}${deletable ? ' dismissible' : ''} nativeButtonProps={nativeButtonProps}>${text}</Tag>`,
    }[mode]
    return { imports: ["import { Tag } from '@codegouvfr/react-dsfr/Tag'"], example }
  },
  vue: () => {
    const text = escapeAttribute(label)
    const smallAttr = small ? ' small' : ''
    const iconAttr = hasIcon ? ' icon="fr-icon-arrow-right-line"' : ''
    const disabledAttr = disabled ? ' disabled' : ''
    const example = {
      plain: figma.code`<DsfrTag label="${text}"${smallAttr}${iconAttr} />`,
      clickable: figma.code`<DsfrTag label="${text}" link="#"${smallAttr}${iconAttr}${disabledAttr} />`,
      custom: figma.code`<DsfrTag label="${text}" link="#"${smallAttr} class="fr-tag--green-emeraude"${iconAttr}${disabledAttr} />`,
      selectable: figma.code`<DsfrTag label="${text}" selectable value="tag-value"${smallAttr}${iconAttr}${selected ? ' selected' : ''}${disabledAttr} />`,
      deletable: figma.code`<DsfrTag label="${text}" tag-name="button"${smallAttr} class="fr-tag--dismiss"${disabledAttr} />`,
    }[mode]
    return { imports: ["import DsfrTag from '@gouvminint/vue-dsfr/DsfrTag.vue'"], example }
  },
})

export default {
  id: `tag-${mode}-${size}`,
  ...rendered,
  metadata: { nestable: true },
}
