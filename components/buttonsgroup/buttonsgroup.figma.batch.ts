// Groupe de boutons DSFR : 2 sets (Non hiérarchisé, Hiérarchisé). Thème = CSS seul (variante
// interne au même set), non bindé ; « Icône » (Hiérarchisé) n'est pas lue par les snippets.
//   - Orientation      → inline (Angular `[inline]="'always'"`, HTML fr-btns-group--inline,
//                        React `inlineLayoutWhen="always"`, Vue `inline-layout-when="always"`)
//   - Taille           → buttonGroupSize / fr-btns-group--sm|lg / buttonsSize / size (SM, MD, LG)
//   - Bouton Tertiaire → 3ᵉ bouton de variante tertiaire (Hiérarchisé uniquement)
// React : `ButtonsGroup` prend un tableau `buttons: ButtonProps[]` plutôt que des enfants JSX ;
// chaque bouton du design devient une entrée de ce tableau, déclaré avant la balise JSX.
// Vue : `DsfrButtonGroup` (vue-dsfr) avec des `<DsfrButton>` en slot par défaut.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, kind } = figma.batch as { stack: string; kind: 'plain' | 'hierarchical' }

const inline = readEnum(instance, 'Orientation', { Horizontal: true, Vertical: false })
const size = readEnum(instance, 'Taille', { SM: 'SM', MD: 'MD', LG: 'LG' } as const)
const tertiary = kind === 'hierarchical' && instance.getBoolean('Bouton Tertiaire')
const hierarchical = kind === 'hierarchical'

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrButtonsGroupComponent, DsfrButtonComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-buttons-group id="buttons-group"${inline ? ` [inline]="'always'"` : ''}${size === 'SM' ? '' : ` buttonGroupSize="${size}"`}>
  <dsfr-button label="Premier bouton"${hierarchical ? '' : ' variant="secondary"'}></dsfr-button>
  <dsfr-button label="Deuxième bouton" variant="secondary"></dsfr-button>${tertiary ? '\n  <dsfr-button label="Troisième bouton" variant="tertiary"></dsfr-button>' : ''}
</dsfr-buttons-group>`,
  }),
  html: () => ({
    example: figma.code`<ul class="fr-btns-group${inline ? ' fr-btns-group--inline' : ''}${{ SM: ' fr-btns-group--sm', MD: '', LG: ' fr-btns-group--lg' }[size]}">
  <li><button type="button" class="fr-btn${hierarchical ? '' : ' fr-btn--secondary'}">Premier bouton</button></li>
  <li><button type="button" class="fr-btn fr-btn--secondary">Deuxième bouton</button></li>${tertiary ? '\n  <li><button type="button" class="fr-btn fr-btn--tertiary">Troisième bouton</button></li>' : ''}
</ul>`,
  }),
  react: () => {
    const first = hierarchical ? "{ children: 'Premier bouton' }" : "{ children: 'Premier bouton', priority: 'secondary' }"
    const third = tertiary ? ", { children: 'Troisième bouton', priority: 'tertiary' }" : ''
    return {
      imports: ["import { ButtonsGroup } from '@codegouvfr/react-dsfr/ButtonsGroup'"],
      example: figma.code`const buttons = [${first}, { children: 'Deuxième bouton', priority: 'secondary' }${third}];

<ButtonsGroup
  buttons={buttons}${inline ? ' inlineLayoutWhen="always"' : ''}${{ SM: ' buttonsSize="small"', MD: '', LG: ' buttonsSize="large"' }[size]}
/>`,
    }
  },
  vue: () => ({
    imports: [
      "import DsfrButtonGroup from '@gouvminint/vue-dsfr/DsfrButtonGroup.vue'",
      "import DsfrButton from '@gouvminint/vue-dsfr/DsfrButton.vue'",
    ],
    example: figma.code`<DsfrButtonGroup id="buttons-group"${inline ? ' inline-layout-when="always"' : ''}${{ SM: ' size="sm"', MD: '', LG: ' size="lg"' }[size]}>
  <DsfrButton label="Premier bouton"${hierarchical ? '' : ' secondary'} />
  <DsfrButton label="Deuxième bouton" secondary />${tertiary ? '\n  <DsfrButton label="Troisième bouton" tertiary />' : ''}
</DsfrButtonGroup>`,
  }),
})

export default {
  id: `buttonsgroup-${kind}`,
  ...rendered,
  metadata: { nestable: true },
}
