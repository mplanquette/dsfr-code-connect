// Gestionnaire de consentement DSFR : 4 sets utiles, quatre stacks. `kind` (consent.json) choisit
// le set : bandeau, modale complète, item de finalité (propriété « Type »), service indisponible.
// Les composants « _🚫Éléments » sont des atomes internes, non connectés. Thème et Support sont du
// CSS seul / responsive (variantes internes au même set), sans effet sur le markup.
//
// Angular : la modale est intégrée à `dsfr-consent-banner`, elle ne se pose pas seule ; un item de
// finalité n'a pas de composant dédié, il se déclare dans `finalities`. « Service indisponible »
// n'a pas de composant Angular : fragment de markup DSFR statique posé à l'emplacement d'un
// service tiers bloqué en attente de consentement.
// HTML : markup DSFR brut pour les quatre sets.
// React : react-dsfr pilote ce composant par configuration (`createConsentManagement`), pas par un
// élément JSX à quelques props : la fabrique retourne `ConsentBannerAndConsentManagement` (bandeau
// et modale) à partir d'un `finalityDescription`. Un item de finalité se déclare comme une entrée
// de `finalityDescription`. « Service indisponible » est couvert par `Placeholder`
// (`consentManagement/Placeholder.tsx`), dont `onGranted` reçoit `assumeConsent` du hook
// `useConsent` généré par `createConsentManagement`.
// Vue : vue-dsfr n'expose que `DsfrConsent`, qui ne couvre que le contenu du bandeau (texte et les
// 3 boutons) : ni le titre `<h2>`, ni la modale de gestion des finalités, ni un modèle
// `finalities[]` (vérifié sur `src/components/index.ts` du dépôt `dnum-mi/vue-dsfr`). Le bandeau
// pose donc `DsfrConsent` dans son wrapper `fr-consent-banner` avec un titre statique ; la modale
// et l'item reprennent le markup DSFR brut (identique au HTML), tout comme « Service indisponible ».
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, kind } = figma.batch as { stack: string; kind: 'banner' | 'modal' | 'item' | 'unavailable' }

const UNAVAILABLE_HTML = `<div class="fr-consent-service">
  <p>Ce contenu est hébergé par <strong>nom-du-service</strong>.</p>
  <p>
    Pour visualiser ce contenu externe, vous devez accepter la catégorie
    <strong>réseaux sociaux</strong>.
  </p>
  <button type="button" class="fr-btn fr-btn--sm">Autoriser</button>
</div>`

const RADIOS_HTML = `<div class="fr-radio-group">
        <input type="radio" id="consent-finality-0-accept" name="consent-finality-0" />
        <label class="fr-label" for="consent-finality-0-accept">Accepter</label>
      </div>
      <div class="fr-radio-group">
        <input type="radio" id="consent-finality-0-refuse" name="consent-finality-0" />
        <label class="fr-label" for="consent-finality-0-refuse">Refuser</label>
      </div>`

/** Markup brut de la modale complète (HTML et Vue). */
const MODAL_HTML = `<dialog id="consent-modal" class="fr-modal" role="dialog" aria-labelledby="consent-modal-title">
  <div class="fr-container fr-container--fluid fr-container-md">
    <div class="fr-grid-row fr-grid-row--center">
      <div class="fr-col-12 fr-col-md-10 fr-col-lg-8">
        <div class="fr-modal__body">
          <div class="fr-modal__header">
            <button type="button" class="fr-btn--close fr-btn" aria-controls="consent-modal">Fermer</button>
          </div>
          <div class="fr-modal__content">
            <h1 id="consent-modal-title" class="fr-modal__title">Panneau de gestion des cookies</h1>
            <div class="fr-consent-manager">
              <div class="fr-consent-service fr-consent-manager__header">
                <fieldset class="fr-fieldset">
                  <legend id="finality-legend" class="fr-consent-service__title">
                    Préférences pour tous les services
                    <a href="/donnees-personnelles">Données personnelles</a>
                  </legend>
                  <div class="fr-consent-service__radios">
                    <div class="fr-radio-group">
                      <input type="radio" id="consent-all-accept" name="consent-all" />
                      <label class="fr-label" for="consent-all-accept">Tout accepter</label>
                    </div>
                    <div class="fr-radio-group">
                      <input type="radio" id="consent-all-refuse" name="consent-all" />
                      <label class="fr-label" for="consent-all-refuse">Tout refuser</label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="fr-consent-manager__body">
                <div class="fr-consent-service">
                  <fieldset class="fr-fieldset" role="group" aria-labelledby="finality-0-legend">
                    <legend id="finality-0-legend" class="fr-consent-service__title">Mesure d'audience</legend>
                    <div class="fr-consent-service__radios">
                      <div class="fr-radio-group">
                        <input type="radio" id="consent-finality-0-accept" name="consent-finality-0" />
                        <label class="fr-label" for="consent-finality-0-accept">Accepter</label>
                      </div>
                      <div class="fr-radio-group">
                        <input type="radio" id="consent-finality-0-refuse" name="consent-finality-0" />
                        <label class="fr-label" for="consent-finality-0-refuse">Refuser</label>
                      </div>
                    </div>
                    <p id="finality-0-desc" class="fr-consent-service__desc">Description de la finalité.</p>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</dialog>`

/** Item de finalité en markup brut (HTML et Vue), selon la variante « Type ». */
function itemHtml(): string {
  const type = readEnum(instance, 'Type', {
    Simple: 'simple',
    Description: 'description',
    Obligatoire: 'required',
    Ouvert: 'open',
    Fermé: 'closed',
  } as const)
  const description =
    type === 'description' ? `\n    <p id="finality-0-desc" class="fr-consent-service__desc">Description de la finalité.</p>` : ''
  const radios = type === 'required' ? `<p>Ce service est nécessaire au fonctionnement du site.</p>` : RADIOS_HTML
  const collapse =
    type === 'open'
      ? `\n    <div class="fr-consent-service__collapse">
      <button type="button" class="fr-consent-service__collapse-btn" aria-expanded="true" aria-controls="finality-0-collapse">Voir le détail</button>
    </div>
    <div class="fr-consent-services fr-collapse fr-collapse--expanded" id="finality-0-collapse"></div>`
      : type === 'closed'
        ? `\n    <div class="fr-consent-service__collapse">
      <button type="button" class="fr-consent-service__collapse-btn" aria-expanded="false" aria-controls="finality-0-collapse">Voir le détail</button>
    </div>
    <div class="fr-consent-services fr-collapse" id="finality-0-collapse"></div>`
        : ''
  return `<div class="fr-consent-service">
  <fieldset class="fr-fieldset" aria-labelledby="finality-0-legend">
    <legend id="finality-0-legend" class="fr-consent-service__title">Mesure d'audience</legend>
    <div class="fr-consent-service__radios">
      ${radios}
    </div>${description}${collapse}
  </fieldset>
</div>`
}

const ANGULAR_IMPORTS = ["import { DsfrConsentBannerComponent } from '@edugouvfr/ngx-dsfr'"]
const REACT_IMPORTS = ["import { createConsentManagement } from '@codegouvfr/react-dsfr/consentManagement'"]

/** Squelette Angular : `dsfr-consent-banner` avec la liste de finalités fournie. */
const angularBanner = (finalities: string) => figma.code`<dsfr-consent-banner
  heading="À propos des cookies sur ce site"
  rgpdLink="/donnees-personnelles"
  [finalities]="[${finalities}]"></dsfr-consent-banner>`

/** Squelette React : `createConsentManagement` avec le `finalityDescription` fourni. */
const reactBanner = (finalityDescription: string) => figma.code`const { ConsentBannerAndConsentManagement } = createConsentManagement({
  finalityDescription: {${finalityDescription}},
  personalDataPolicyLinkProps: { href: '/donnees-personnelles' }
});

<ConsentBannerAndConsentManagement />`

const rendered = renderFor(stack, {
  angular: () => {
    if (kind === 'unavailable') return { example: figma.code`${UNAVAILABLE_HTML}` }
    if (kind === 'banner') {
      return {
        imports: ANGULAR_IMPORTS,
        example: angularBanner(`
    { name: 'Mesure d\\'audience', accept: false },
    { name: 'Réseaux sociaux', accept: false }
  `),
      }
    }
    if (kind === 'modal') {
      return {
        imports: ANGULAR_IMPORTS,
        example: angularBanner(`
    { name: 'Mesure d\\'audience', accept: false, description: 'Description de la finalité.' },
    { name: 'Réseaux sociaux', accept: false }
  `),
      }
    }
    const finality = readEnum(instance, 'Type', {
      Simple: `{ name: 'Mesure d\\'audience', accept: false }`,
      Description: `{ name: 'Mesure d\\'audience', accept: false, description: 'Description de la finalité.' }`,
      Obligatoire: `{ name: 'Fonctionnement du site', accept: true, exempt: true }`,
      Ouvert: `{ name: 'Réseaux sociaux', accept: false, subFinalities: [{ name: 'X', accept: false }, { name: 'LinkedIn', accept: false }] }`,
      Fermé: `{ name: 'Réseaux sociaux', accept: false, subFinalities: [{ name: 'X', accept: false }, { name: 'LinkedIn', accept: false }] }`,
    })
    return { imports: ANGULAR_IMPORTS, example: angularBanner(finality) }
  },
  html: () => {
    if (kind === 'unavailable') return { example: figma.code`${UNAVAILABLE_HTML}` }
    if (kind === 'item') return { example: figma.code`${itemHtml()}` }
    if (kind === 'modal') return { example: figma.code`${MODAL_HTML}` }
    return {
      example: figma.code`<div class="fr-consent-banner">
  <h2 class="fr-h6">À propos des cookies sur ce site</h2>
  <div class="fr-consent-banner__content">
    <p class="fr-text--sm">
      Sur nos sites, nous utilisons des cookies et données personnelles pour améliorer votre expérience.
      <a href="/donnees-personnelles">Personnaliser</a>
    </p>
  </div>
  <ul class="fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm">
    <li><button type="button" class="fr-btn" title="Autoriser tous les cookies">Tout accepter</button></li>
    <li><button type="button" class="fr-btn" title="Refuser tous les cookies">Tout refuser</button></li>
    <li><button type="button" class="fr-btn fr-btn--secondary" aria-controls="consent-modal" title="Personnaliser les cookies">Personnaliser</button></li>
  </ul>
</div>`,
    }
  },
  react: () => {
    if (kind === 'unavailable') {
      return {
        imports: ["import { Placeholder } from '@codegouvfr/react-dsfr/consentManagement/Placeholder'"],
        example: figma.code`<Placeholder
  title="Contenu bloqué"
  description="Ce contenu est hébergé par nom-du-service. Pour le visualiser, vous devez accepter la catégorie réseaux sociaux."
  onGranted={() => assumeConsent('reseauxSociaux')} />`,
      }
    }
    if (kind === 'banner') {
      return {
        imports: REACT_IMPORTS,
        example: reactBanner(`
    mesureAudience: { title: "Mesure d'audience" },
    reseauxSociaux: { title: 'Réseaux sociaux' }
  `),
      }
    }
    if (kind === 'modal') {
      return {
        imports: REACT_IMPORTS,
        example: reactBanner(`
    mesureAudience: { title: "Mesure d'audience", description: 'Description de la finalité.' },
    reseauxSociaux: { title: 'Réseaux sociaux' }
  `),
      }
    }
    const finality = readEnum(instance, 'Type', {
      Simple: `mesureAudience: { title: "Mesure d'audience" }`,
      Description: `mesureAudience: { title: "Mesure d'audience", description: 'Description de la finalité.' }`,
      Obligatoire: `fonctionnement: { title: 'Fonctionnement du site' } /* finalité exemptée : à traiter hors bandeau, toujours accept: true côté DSFR */`,
      Ouvert: `reseauxSociaux: {
      title: 'Réseaux sociaux',
      subFinalities: { x: { title: 'X' }, linkedin: { title: 'LinkedIn' } }
    }`,
      Fermé: `reseauxSociaux: {
      title: 'Réseaux sociaux',
      subFinalities: { x: { title: 'X' }, linkedin: { title: 'LinkedIn' } }
    }`,
    })
    return { imports: REACT_IMPORTS, example: reactBanner(`\n    ${finality}\n  `) }
  },
  vue: () => {
    if (kind === 'unavailable') return { example: figma.code`${UNAVAILABLE_HTML}` }
    if (kind === 'item') return { example: figma.code`${itemHtml()}` }
    if (kind === 'modal') return { example: figma.code`${MODAL_HTML}` }
    return {
      imports: ["import DsfrConsent from '@gouvminint/vue-dsfr/DsfrConsent.vue'"],
      example: figma.code`<div class="fr-consent-banner">
    <h2 class="fr-h6">À propos des cookies sur ce site</h2>
    <DsfrConsent
      url="/donnees-personnelles"
      aria-controls-id="consent-modal"
      @accept-all="onAcceptAll"
      @refuse-all="onRefuseAll"
      @customize="onCustomize"
    />
  </div>`,
    }
  },
})

export default {
  id: `consent-${kind}`,
  ...rendered,
  metadata: { nestable: true },
}
