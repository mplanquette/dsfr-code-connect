// Ajout de fichier DSFR : 1 set. Thème = CSS seul.
// Vue : `DsfrFileUpload` porte le message d'erreur dans `error` (pas de `messageSeverity` unique) ;
// `validMessage` existe côté type mais n'a pas d'équivalent Figma testé ici.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance

const state = readEnum(instance, 'État', { Défaut: 'default', Erreur: 'error', Désactivé: 'disabled' } as const)
const disabled = state === 'disabled'
const error = state === 'error'
const stateClass = { default: '', disabled: ' fr-upload-group--disabled', error: ' fr-upload-group--error' }[state]

const rendered = renderFor(figma.batch.stack, {
  angular: () => ({
    imports: ["import { DsfrUploadComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-form-upload label="Ajouter un fichier" hint="Taille maximale : 5 Mo. Formats supportés : jpg, png, pdf."${disabled ? ' [disabled]="true"' : ''}${error ? ` error="Texte d'erreur"` : ''}></dsfr-form-upload>`,
  }),
  html: () => ({
    example: figma.code`<div class="fr-upload-group${stateClass}">
  <label class="fr-label" for="upload">
    Ajouter un fichier
    <span class="fr-hint-text">Taille maximale : 5 Mo. Formats supportés : jpg, png, pdf.</span>
  </label>
  <input class="fr-upload" type="file" id="upload" name="upload"${disabled ? ' disabled' : ''} />${error ? `\n  <p class="fr-error-text" id="upload-messages">Texte d'erreur</p>` : ''}
</div>`,
  }),
  react: () => ({
    imports: ["import { Upload } from '@codegouvfr/react-dsfr/Upload'"],
    example: figma.code`<Upload label="Ajouter un fichier" hint="Taille maximale : 5 Mo. Formats supportés : jpg, png, pdf."${disabled ? ' disabled' : ''}${error ? ` state="error" stateRelatedMessage="Texte d'erreur"` : ''} />`,
  }),
  vue: () => ({
    imports: ["import DsfrFileUpload from '@gouvminint/vue-dsfr/DsfrFileUpload.vue'"],
    example: figma.code`<DsfrFileUpload label="Ajouter un fichier" hint="Taille maximale : 5 Mo. Formats supportés : jpg, png, pdf."${disabled ? ' disabled' : ''}${error ? ` error="Texte d'erreur"` : ''} />`,
  }),
})

export default {
  id: 'upload',
  ...rendered,
  metadata: { nestable: true },
}
