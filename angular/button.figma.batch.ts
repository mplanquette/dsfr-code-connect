// Bouton DSFR (ngx-dsfr) : un seul template pour les 9 component sets (Primaire/Secondaire/
// Tertiaire × SM/MD/LG), déclarés dans button.figma.batch.json. Chaque entrée fournit `variant`
// et `size`, exposés ici par figma.batch.
// Les sets tertiaires portent en plus « Bordure » : sans bordure → variant="tertiary-no-outline".
// État (Défaut/Survol/Cliqué) et Focus sont des pseudo-états CSS : ils ne changent pas le markup.
// L'icône concrète n'est pas encore dérivable (icônes DSFR non connectées) : placeholder
// fr-icon-arrow-right-line à remplacer par le dev. « Seule » → [labelSrOnly]="true".
import figma from 'figma'

const instance = figma.selectedInstance

const variant: string = figma.batch.variant === 'tertiary' && !instance.getBoolean('Bordure') ? 'tertiary-no-outline' : figma.batch.variant
const label = instance.getString('Libellé')
const iconAttrs = instance.getEnum('Icône', {
  Sans: '',
  Gauche: ' icon="fr-icon-arrow-right-line" iconPosition="left"',
  Droite: ' icon="fr-icon-arrow-right-line" iconPosition="right"',
  Seule: ' icon="fr-icon-arrow-right-line" [labelSrOnly]="true"',
})
const disabled = instance.getEnum('Désactivé', { True: ' [disabled]="true"', False: '' })

export default {
  id: `button-${figma.batch.variant}-${figma.batch.size}`,
  imports: ["import { DsfrButtonComponent } from '@edugouvfr/ngx-dsfr'"],
  example: figma.code`<dsfr-button label="${label}" variant="${variant}" size="${figma.batch.size}"${iconAttrs}${disabled}></dsfr-button>`,
  metadata: { nestable: true },
}
