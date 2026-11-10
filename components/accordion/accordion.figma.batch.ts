// Accordéon DSFR : Desktop, Mobile (accordéon seul) et Groupe.
//   - État → ouvert (Angular `[expanded]`, HTML aria-expanded, React `defaultExpanded`, Vue
//     `:model-value="0"`). Défaut et Survol = fermé ; le set Mobile n'a pas de Survol.
// Thème (Clair/Sombre) = tokens CSS uniquement. Survol = pseudo-état CSS, même markup que Défaut.
// Support (Desktop/Mobile sur le Groupe) = responsive uniquement, pas de markup différent.
// React : `Accordion` existe en variante contrôlée (`expanded` + `onExpandedChange` obligatoires)
// ou non contrôlée (`defaultExpanded`) : on retient la version non contrôlée, plus proche d'un
// exemple statique. Aucun composant `AccordionsGroup` côté react-dsfr : le Groupe est un simple
// conteneur `<div className="fr-accordions-group">` autour de plusieurs `<Accordion>`.
// Vue : `DsfrAccordion` n'a PAS de prop `expanded` autonome (« uniquement avec
// DsfrAccordionsGroup ») : l'ouverture est pilotée par le v-model du groupe. L'accordéon seul est
// donc enveloppé dans un DsfrAccordionsGroup ; `:model-value="0"` ouvre le premier accordéon.
// Les snippets HTML, React (Groupe) et Angular (Groupe) commencent par un retour à la ligne, comme
// les snippets historiques.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, kind, variant } = figma.batch as { stack: string; kind: 'single' | 'group'; variant: string }

// Les sets Desktop et Mobile ne diffèrent que par l'option Survol de « État ».
const open = kind === 'single'
  ? readEnum(instance, 'État', { Défaut: false, Survol: false, Ouvert: true })
  : false

const rendered = renderFor(stack, {
  angular: () => ({
    imports: kind === 'single'
      ? ["import { DsfrAccordionComponent } from '@edugouvfr/ngx-dsfr'"]
      : ["import { DsfrAccordionComponent, DsfrAccordionsGroupComponent } from '@edugouvfr/ngx-dsfr'"],
    example: kind === 'single'
      ? figma.code`<dsfr-accordion heading="Intitulé accordéon" content="Contenu de l'accordéon"${open ? ' [expanded]="true"' : ''}></dsfr-accordion>`
      : figma.code`
<dsfr-accordions-group>
  <dsfr-accordion heading="Intitulé 1" content="Contenu de l'accordéon 1"></dsfr-accordion>
  <dsfr-accordion heading="Intitulé 2" content="Contenu de l'accordéon 2"></dsfr-accordion>
  <dsfr-accordion heading="Intitulé 3" content="Contenu de l'accordéon 3"></dsfr-accordion>
</dsfr-accordions-group>`,
  }),
  html: () => ({
    example: kind === 'single'
      ? figma.code`
<section class="fr-accordion">
  <h3 class="fr-accordion__title">
    <button class="fr-accordion__btn" aria-expanded="${String(open)}" aria-controls="accordion-1">
      Intitulé accordéon
    </button>
  </h3>
  <div class="fr-collapse" id="accordion-1">
    <p>Contenu de l'accordéon</p>
  </div>
</section>`
      : figma.code`
<div class="fr-accordions-group">
  <section class="fr-accordion">
    <h3 class="fr-accordion__title">
      <button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-1">Intitulé 1</button>
    </h3>
    <div class="fr-collapse" id="accordion-1">
      <p>Contenu de l'accordéon 1</p>
    </div>
  </section>
  <section class="fr-accordion">
    <h3 class="fr-accordion__title">
      <button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-2">Intitulé 2</button>
    </h3>
    <div class="fr-collapse" id="accordion-2">
      <p>Contenu de l'accordéon 2</p>
    </div>
  </section>
  <section class="fr-accordion">
    <h3 class="fr-accordion__title">
      <button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-3">Intitulé 3</button>
    </h3>
    <div class="fr-collapse" id="accordion-3">
      <p>Contenu de l'accordéon 3</p>
    </div>
  </section>
</div>`,
  }),
  react: () => ({
    imports: ["import { Accordion } from '@codegouvfr/react-dsfr/Accordion'"],
    example: kind === 'single'
      ? figma.code`<Accordion label="Intitulé accordéon"${open ? ' defaultExpanded' : ''}>Contenu de l'accordéon</Accordion>`
      : figma.code`
<div className="fr-accordions-group">
  <Accordion label="Intitulé 1">Contenu de l'accordéon 1</Accordion>
  <Accordion label="Intitulé 2">Contenu de l'accordéon 2</Accordion>
  <Accordion label="Intitulé 3">Contenu de l'accordéon 3</Accordion>
</div>`,
  }),
  vue: () => ({
    imports: [
      "import DsfrAccordion from '@gouvminint/vue-dsfr/DsfrAccordion.vue'",
      "import DsfrAccordionsGroup from '@gouvminint/vue-dsfr/DsfrAccordionsGroup.vue'",
    ],
    example: kind === 'single'
      ? figma.code`<DsfrAccordionsGroup id="group"${open ? ' :model-value="0"' : ''}>
  <DsfrAccordion title="Intitulé accordéon">
    Contenu de l'accordéon
  </DsfrAccordion>
</DsfrAccordionsGroup>`
      : figma.code`<DsfrAccordionsGroup v-model="selectedAccordion">
  <DsfrAccordion title="Intitulé 1">
    Contenu de l'accordéon 1
  </DsfrAccordion>
  <DsfrAccordion title="Intitulé 2">
    Contenu de l'accordéon 2
  </DsfrAccordion>
  <DsfrAccordion title="Intitulé 3">
    Contenu de l'accordéon 3
  </DsfrAccordion>
</DsfrAccordionsGroup>`,
  }),
})

export default {
  id: `accordion-${variant}`,
  ...rendered,
  metadata: { nestable: true },
}
