// Transcription DSFR : 3 sets (Transcription, Modale Desktop, Modale Mobile).
// Le set « _🚫Éléments - Exemple de contenu » est un atome interne Figma, non connecté.
// Thème et Support = CSS seul. Survol / Active = pseudo-états, ignorés. Les propriétés
// « Contenu (thème clair / sombre) » (échange d'instance) ne sont pas lues.
// « Ouvert » est l'état du collapse, piloté au runtime par le JS DSFR : seul le HTML le reflète
// (aria-expanded et fr-collapse--expanded) ; Angular, React et Vue ne le lient pas.
// Les deux sets « Modale » sont la vue agrandie interne au composant : même snippet, avec le titre
// figé « Transcription ».
// React : aucun composant react-dsfr dédié (pas de `Transcription.tsx`), markup DSFR brut porté en
// JSX (`class` → `className`), sur le modèle du fragment HTML.
// Vue : `DsfrTranscription` (props `title` / `content`).
import figma from 'figma'
import { readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'
import { escapeAttribute, escapeText } from '../_shared/text'

const instance = figma.selectedInstance
const { stack, kind, variant } = figma.batch as { stack: string; kind: 'main' | 'modal'; variant: string }

const heading = kind === 'main' ? instance.getString('Titre') : 'Transcription'
const open = kind === 'main' ? readVariantFlag(instance, 'Ouvert') : false

// Fragment de modale HTML ; React reprend le même markup avec className.
function modalMarkup(className: string, indent: string): string {
  const lines = `<div id="transcription-modal" ${className}="fr-modal" role="dialog" aria-labelledby="transcription-title">
  <div ${className}="fr-container--fluid">
    <div ${className}="fr-modal__body">
      <div ${className}="fr-modal__header">
        <button type="button" ${className}="fr-btn--close fr-btn" aria-controls="transcription-modal" title="Fermer la fenêtre de dialogue">Fermer</button>
      </div>
      <div ${className}="fr-modal__content">
        <h1 id="transcription-title" ${className}="fr-modal__title">${escapeText(heading)}</h1>
        <p>Texte de la transcription.</p>
      </div>
    </div>
  </div>
</div>`
  return lines.split('\n').map((line, i) => (i === 0 ? line : indent + line)).join('\n')
}

function mainMarkup(className: string): string {
  return `<div ${className}="fr-transcription">
  <button type="button" ${className}="fr-transcription__btn" aria-expanded="${open}" aria-controls="transcription">Transcription</button>
  <div ${className}="fr-collapse${open ? ' fr-collapse--expanded' : ''}" id="transcription">
    <div ${className}="fr-transcription__footer">
      <div ${className}="fr-transcription__actions-group">
        <button type="button" ${className}="fr-btn fr-btn--fullscreen" aria-controls="transcription-modal" data-fr-opened="false">Agrandir</button>
      </div>
    </div>
    ${modalMarkup(className, '    ')}
  </div>
</div>`
}

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrTranscriptionComponent } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`<dsfr-transcription heading="${escapeAttribute(heading)}" content="Texte de la transcription."></dsfr-transcription>`,
  }),
  html: () => ({ example: figma.code`${kind === 'main' ? mainMarkup('class') : modalMarkup('class', '')}` }),
  react: () => ({ example: figma.code`${kind === 'main' ? mainMarkup('className') : modalMarkup('className', '')}` }),
  vue: () => ({
    imports: ["import DsfrTranscription from '@gouvminint/vue-dsfr/DsfrTranscription.vue'"],
    example: figma.code`<DsfrTranscription title="${escapeAttribute(heading)}" content="Texte de la transcription." />`,
  }),
})

export default {
  id: `transcription-${variant}`,
  ...rendered,
  metadata: { nestable: true },
}
