// Bandeau d'information importante DSFR : 1 set. Thème et Support = CSS seul.
// « Type » (Bandeau générique / vigilance météo / alerte) est redondant avec « Niveau d'alerte »,
// qui porte seul la valeur de `type` (ou la classe modificatrice en HTML) → non bindé.
// « Voir le lien » n'est pas bindable : le lien se projette en contenu (Angular `[link]`, slot
// par défaut en Vue, `fr-notice__body` en HTML).
// « Voir description » n'est pas bindée : la description reste toujours affichée.
// Fermeture : « Fermeture » n'est pas une propriété Figma de ce node ; le bandeau DSFR est toujours
// fermable, donc `[closeable]="true"` / `closeable` / `isClosable` / bouton de fermeture sont
// posés en dur.
// React : pour les sévérités « Vigilance / Appel à témoins / Alerte technologique / Alerte
// attentat », le type `MandatoryIcon` interdit `iconDisplayed={false}` (icône obligatoire) ;
// `iconDisplayed={false}` n'est valable que pour info/alert/warning, non vérifiable dans ce
// snippet texte, à corriger par le dev si besoin.
// Vue : « Voir icône » n'a pas de prop dédiée sur DsfrNotice : la classe `fr-notice--no-icon` se
// passe par le fallthrough de `class` (racine à nœud unique).
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeText } from '../_shared/text'

const instance = figma.selectedInstance

const heading = instance.getString('Titre')
const description = instance.getString('Description')
const showIcon = instance.getBoolean('Voir icône')
const type = readEnum(instance, "Niveau d'alerte", {
  Information: 'info',
  Alerte: 'alert',
  Avertissement: 'warning',
  'Vigilance orange': 'weather-orange',
  'Vigilance rouge': 'weather-red',
  'Vigilance violette': 'weather-purple',
  'Appel à témoins': 'witness',
  'Alerte technologique': 'cyberattack',
  'Alerte attentat': 'attack',
} as const)

const headingAttr = escapeAttribute(heading)
const descriptionAttr = escapeAttribute(description)

const rendered = renderFor(figma.batch.stack, {
  angular: () => ({
    imports: ["import { DsfrNoticeComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-notice
  type="${type}"
  heading="${headingAttr}"
  description="${descriptionAttr}"${showIcon ? '' : ' [noIcon]="true"'}
  [closeable]="true"></dsfr-notice>`,
  }),
  html: () => ({
    example: figma.code`<div class="fr-notice fr-notice--${type}${showIcon ? '' : ' fr-notice--no-icon'}">
  <div class="fr-container">
    <div class="fr-notice__body">
      <p>
        <span class="fr-notice__title">${escapeText(heading)}</span>
        <span class="fr-notice__desc">${escapeText(description)}</span>
      </p>
      <button type="button" class="fr-btn--close fr-btn" title="Masquer le message">Masquer le message</button>
    </div>
  </div>
</div>`,
  }),
  react: () => ({
    imports: ["import { Notice } from '@codegouvfr/react-dsfr/Notice'"],
    example: figma.code`<Notice
  severity="${type}"
  title="${headingAttr}"
  description="${descriptionAttr}"${showIcon ? '' : ' iconDisplayed={false}'}
  isClosable
  onClose={() => {}}
/>`,
  }),
  vue: () => ({
    imports: ["import DsfrNotice from '@gouvminint/vue-dsfr/DsfrNotice.vue'"],
    example: figma.code`<DsfrNotice type="${type}" title="${headingAttr}" desc="${descriptionAttr}" closeable${showIcon ? '' : ' class="fr-notice--no-icon"'} />`,
  }),
})

export default {
  id: 'notice',
  ...rendered,
  metadata: { nestable: true },
}
