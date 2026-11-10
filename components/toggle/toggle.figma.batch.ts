// Interrupteur DSFR : 2 sets utiles (Item, Groupe). Le set « 🚫 / Interrupteur » est l'atome
// interne Figma (le switch seul), non connecté. Thème sombre = CSS seul.
// « Voir message » n'est pas lu ; « Texte d'aide » (TEXT) n'est pas lu non plus : le texte d'aide
// des snippets reste figé (« Texte d'aide »), seule sa présence suit « Voir Texte d'aide ».
// « Alignement Gauche » : `labelPosition="left"` (Angular, React), `fr-toggle--label-left` (HTML),
// `label-left` (Vue). Déprécié depuis DSFR 1.14.1 pour raisons d'accessibilité : binding conservé
// pour refléter le design, le dev doit privilégier l'alignement à droite (défaut).
// React : « État » (message de validation/erreur) n'est PAS bindé, `ToggleSwitch` et
// `ToggleSwitchGroup` n'exposent aucune prop `state`/`stateRelatedMessage` contrairement à
// `dsfr-form-toggle`. `inputTitle` est obligatoire en mode non contrôlé (`defaultChecked`) côté
// TypeScript : placeholder statique. `toggles[]` est déclaré en `const` avant le JSX dans le snippet.
// Vue : « Statut » → `no-text` inversé ; sévérité = `status` ('valid'|'error') +
// `valid-message`/`error-message`.
// Anomalie historique reproduite : le fragment HTML du Groupe ne montre que 2 interrupteurs, les
// autres stacks en montrent 3.
import figma from 'figma'
import { readEnum, readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeText } from '../_shared/text'

const instance = figma.selectedInstance
const { stack, kind } = figma.batch as { stack: string; kind: 'item' | 'group' }

const leftAligned = readEnum(instance, 'Alignement', { Gauche: true, Droite: false })
const state = readEnum(instance, 'État', { Default: 'default', Valide: 'valid', Erreur: 'error' } as const)

const rendered = renderFor(stack, {
  angular: () => {
    const severity = {
      default: '',
      valid: ' message="Texte de validation" messageSeverity="valid"',
      error: ` message="Texte d'erreur" messageSeverity="error"`,
    }[state]
    const position = leftAligned ? ' labelPosition="left"' : ''
    if (kind === 'item') {
      const label = escapeAttribute(instance.getString('Libellé'))
      const hint = instance.getBoolean("Voir Texte d'aide") ? ` hint="Texte d'aide"` : ''
      const showStatus = instance.getBoolean('Statut') ? '' : ' [showStatusLabel]="false"'
      const checked = readVariantFlag(instance, 'Coché') ? ' [value]="true"' : ''
      const disabled = readVariantFlag(instance, 'Désactivé') ? ' [disabled]="true"' : ''
      return {
        imports: ["import { DsfrFormToggleComponent } from '@edugouvfr/ngx-dsfr'"],
        example: figma.code`<dsfr-form-toggle label="${label}"${hint}${showStatus}${checked}${disabled}${position}${severity}></dsfr-form-toggle>`,
      }
    }
    return {
      imports: ["import { DsfrFormToggleComponent, DsfrFormTogglesGroupComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-form-toggles-group legend="Légende du groupe"${severity}>
  <dsfr-form-toggle label="Première option"${position}></dsfr-form-toggle>
  <dsfr-form-toggle label="Deuxième option"${position}></dsfr-form-toggle>
  <dsfr-form-toggle label="Troisième option"${position}></dsfr-form-toggle>
</dsfr-form-toggles-group>`,
    }
  },
  html: () => {
    const positionClass = leftAligned ? ' fr-toggle--label-left' : ''
    if (kind === 'item') {
      const label = escapeText(instance.getString('Libellé'))
      const stateClass = { default: '', valid: ' fr-toggle--valid', error: ' fr-toggle--error' }[state]
      const checked = readVariantFlag(instance, 'Coché') ? ' checked' : ''
      const disabled = readVariantFlag(instance, 'Désactivé') ? ' disabled' : ''
      const status = instance.getBoolean('Statut') ? ' data-fr-checked-label="Activé" data-fr-unchecked-label="Désactivé"' : ''
      return {
        example: figma.code`<div class="fr-toggle${positionClass}${stateClass}">
  <input type="checkbox" class="fr-toggle__input" id="toggle" name="toggle"${checked}${disabled} />
  <label class="fr-toggle__label" for="toggle"${status}>${label}</label>
  <div class="fr-messages-group" id="toggle-messages" aria-live="polite"></div>
</div>`,
      }
    }
    const stateClass = { default: '', valid: ' fr-fieldset--valid', error: ' fr-fieldset--error' }[state]
    return {
      example: figma.code`<fieldset class="fr-fieldset${stateClass}" id="toggle-group" aria-labelledby="toggle-group-legend">
  <legend class="fr-fieldset__legend fr-fieldset__legend--regular" id="toggle-group-legend">Légende du groupe</legend>
  <div class="fr-fieldset__element">
    <ul class="fr-toggle__list">
      <li>
        <div class="fr-toggle${positionClass} fr-toggle--border-bottom">
          <input type="checkbox" class="fr-toggle__input" id="toggle-1" />
          <label class="fr-toggle__label" for="toggle-1" data-fr-checked-label="Activé" data-fr-unchecked-label="Désactivé">Première option</label>
        </div>
      </li>
      <li>
        <div class="fr-toggle${positionClass} fr-toggle--border-bottom">
          <input type="checkbox" class="fr-toggle__input" id="toggle-2" />
          <label class="fr-toggle__label" for="toggle-2" data-fr-checked-label="Activé" data-fr-unchecked-label="Désactivé">Deuxième option</label>
        </div>
      </li>
    </ul>
  </div>
</fieldset>`,
    }
  },
  react: () => {
    const position = leftAligned ? ' labelPosition="left"' : ''
    if (kind === 'item') {
      const label = escapeAttribute(instance.getString('Libellé'))
      const hint = instance.getBoolean("Voir Texte d'aide") ? ` helperText="Texte d'aide"` : ''
      const showStatus = instance.getBoolean('Statut') ? '' : ' showCheckedHint={false}'
      const checked = readVariantFlag(instance, 'Coché') ? ' defaultChecked' : ''
      const disabled = readVariantFlag(instance, 'Désactivé') ? ' disabled' : ''
      return {
        imports: ["import { ToggleSwitch } from '@codegouvfr/react-dsfr/ToggleSwitch'"],
        example: figma.code`<ToggleSwitch label="${label}" inputTitle="Interrupteur"${hint}${showStatus}${checked}${disabled}${position} />`,
      }
    }
    return {
      imports: ["import { ToggleSwitchGroup } from '@codegouvfr/react-dsfr/ToggleSwitchGroup'"],
      example: figma.code`const toggles = [
  { label: 'Première option', inputTitle: 'Interrupteur 1' },
  { label: 'Deuxième option', inputTitle: 'Interrupteur 2' },
  { label: 'Troisième option', inputTitle: 'Interrupteur 3' }
];

<ToggleSwitchGroup
  toggles={toggles}${position}
/>`,
    }
  },
  vue: () => {
    const severity = {
      default: '',
      valid: ' status="valid" valid-message="Texte de validation"',
      error: ` status="error" error-message="Texte d'erreur"`,
    }[state]
    if (kind === 'item') {
      const label = escapeAttribute(instance.getString('Libellé'))
      const hint = instance.getBoolean("Voir Texte d'aide") ? ` hint="Texte d'aide"` : ''
      const showStatus = instance.getBoolean('Statut') ? '' : ' no-text'
      const checked = readVariantFlag(instance, 'Coché') ? ' :model-value="true"' : ''
      const disabled = readVariantFlag(instance, 'Désactivé') ? ' disabled' : ''
      return {
        imports: ["import DsfrToggleSwitch from '@gouvminint/vue-dsfr/DsfrToggleSwitch.vue'"],
        example: figma.code`<DsfrToggleSwitch label="${label}"${hint}${showStatus}${checked}${disabled}${leftAligned ? ' label-left' : ''}${severity} />`,
      }
    }
    const position = leftAligned ? ', labelLeft: true' : ''
    return {
      imports: ["import DsfrToggleSwitchGroup from '@gouvminint/vue-dsfr/DsfrToggleSwitchGroup.vue'"],
      example: figma.code`<DsfrToggleSwitchGroup
  legend="Légende du groupe"
  :toggle-switches="[
    { label: 'Première option'${position} },
    { label: 'Deuxième option'${position} },
    { label: 'Troisième option'${position} }
  ]"${severity}
/>`,
    }
  },
})

export default {
  id: `toggle-${kind}`,
  ...rendered,
  metadata: { nestable: true },
}
