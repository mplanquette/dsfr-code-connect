// Sélecteur de langue DSFR : 2 sets (Desktop, Mobile). Thème = CSS seul, non bindé.
// « État Ouvert / Fermé » est l'état du collapse (JS du DSFR, fr-collapse) : le markup est
// identique, seul aria-expanded change au runtime, non bindable.
// Le rendu Mobile est responsive ; les snippets historiques du set Mobile sont conservés tels
// quels (HTML : bouton toujours encadré et deux langues seulement ; Vue : deux langues).
// Angular : « Encadré » → [outline] (Desktop seul).
// React : « Encadré » n'a pas d'équivalent dans `LanguageSelect` (pas de variante outline côté
// react-dsfr), simplification documentée. `LanguageSelect` est conçu pour vivre dans le `Header`.
// Vue : `DsfrLanguageSelector` est toujours rendu en `fr-btn--tertiary` (pas de `[outline]`),
// limitation du composant vue-dsfr.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeText } from '../_shared/text'

const instance = figma.selectedInstance
const { stack, kind } = figma.batch as { stack: string; kind: 'desktop' | 'mobile' }

const lang = instance.getString('Langue')
const outlined = kind === 'desktop' ? readEnum(instance, 'Encadré', { True: true, False: false }) : true

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrTranslateComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-translate
  currentLangCode="${escapeAttribute(lang)}"
  [languages]="[
    { value: 'fr', label: 'FR', description: 'Français' },
    { value: 'en', label: 'EN', description: 'English' },
    { value: 'es', label: 'ES', description: 'Español' }
  ]"${outlined ? '' : ' [outline]="false"'}></dsfr-translate>`,
  }),
  html: () => {
    const outlineClass = outlined ? ' fr-btn fr-btn--tertiary' : ' fr-btn--tertiary-no-outline'
    const spanish = kind === 'desktop'
      ? '\n        <li><a class="fr-translate__language fr-nav__link" hreflang="es" lang="es" href="#">ES&nbsp;- Español</a></li>'
      : ''
    return {
      example: figma.code`<div class="fr-translate fr-nav">
  <div class="fr-nav__item">
    <button type="button" class="fr-translate__btn${outlineClass}" aria-controls="translate-menu" aria-expanded="false" title="Sélectionner une langue">
      ${escapeText(lang)}<span class="fr-hidden-lg">&nbsp;- Français</span>
    </button>
    <div class="fr-collapse fr-translate__menu fr-menu" id="translate-menu">
      <ul class="fr-menu__list">
        <li><a class="fr-translate__language fr-nav__link" hreflang="fr" lang="fr" href="#" aria-current="true">FR&nbsp;- Français</a></li>
        <li><a class="fr-translate__language fr-nav__link" hreflang="en" lang="en" href="#">EN&nbsp;- English</a></li>${spanish}
      </ul>
    </div>
  </div>
</div>`,
    }
  },
  react: () => ({
    imports: ["import { LanguageSelect } from '@codegouvfr/react-dsfr/LanguageSelect'"],
    example: figma.code`<LanguageSelect
  lang="${escapeAttribute(lang)}"
  setLang={(lang) => {}}
  supportedLangs={['fr', 'en', 'es']}
  fullNameByLang={{ fr: 'Français', en: 'English', es: 'Español' }}
/>`,
  }),
  vue: () => {
    const spanish = kind === 'desktop' ? ",\n    { codeIso: 'es', label: 'Español' }" : ''
    return {
      imports: ["import DsfrLanguageSelector from '@gouvminint/vue-dsfr/DsfrLanguageSelector.vue'"],
      example: figma.code`<DsfrLanguageSelector current-language="${escapeAttribute(lang)}" :languages="[
    { codeIso: 'fr', label: 'Français' },
    { codeIso: 'en', label: 'English' }${spanish}
  ]" />`,
    }
  },
})

export default {
  id: `translate-${kind}`,
  ...rendered,
  metadata: { nestable: true },
}
