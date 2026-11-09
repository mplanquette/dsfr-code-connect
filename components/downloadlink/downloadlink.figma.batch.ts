// Lien de téléchargement DSFR : 2 sets (lien seul, groupe), un seul template (`part` dans
// downloadlink.json). Thème et Support = CSS seul/responsive. « Puce » et « 2 lignes » illustrent
// des variations de longueur de texte de démonstration Figma, non pilotables par une input →
// non bindées.
// React : react-dsfr n'a pas de composant « groupe de téléchargements » dédié (pas d'équivalent à
// `dsfr-downloads-group`) : le groupe est reconstitué en juxtaposant plusieurs `<Download>` sous
// un titre optionnel, à ajuster par le dev selon le layout voulu.
// Vue : vue-dsfr n'a pas de props `mimeType`/`sizeBytes` séparées : `format` et `size` sont de
// simples chaînes affichées telles quelles (déjà formatées par le dev).
import figma from 'figma'
import { readVariantFlag } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, part } = figma.batch as { stack: string; part: 'single' | 'group' }

const hasTitle = part === 'group' ? readVariantFlag(instance, 'Titre') : false

const rendered = renderFor(stack, {
  angular: () =>
    part === 'single'
      ? {
          imports: ["import { DsfrDownloadComponent } from '@edugouvfr/ngx-dsfr'"],
          example: figma.code`<dsfr-download
  fileName="Nom du fichier"
  link="/assets/fichier.pdf"
  mimeType="application/pdf"
  [sizeBytes]="518000"></dsfr-download>`,
        }
      : {
          imports: ["import { DsfrDownloadsGroupComponent } from '@edugouvfr/ngx-dsfr'"],
          example: figma.code`<dsfr-downloads-group aria-label="Groupe de téléchargements"${hasTitle ? ' heading="Titre du groupe"' : ''}
  [downloads]="[
    { fileName: 'Premier fichier', link: '/assets/fichier-1.pdf', mimeType: 'application/pdf', sizeBytes: 518000 },
    { fileName: 'Deuxième fichier', link: '/assets/fichier-2.docx', mimeType: 'application/msword', sizeBytes: 214000 }
  ]"></dsfr-downloads-group>`,
        },
  html: () => ({
    example: part === 'single'
      ? figma.code`<a class="fr-link fr-link--download" href="/assets/fichier.pdf" download="fichier.pdf">
  Télécharger
  <span class="fr-link__detail">Nom du fichier, PDF, 506 Ko</span>
</a>`
      : figma.code`<div class="fr-downloads-group">${hasTitle ? `\n  <h4 class="fr-downloads-group__title">Titre du groupe</h4>` : ''}
  <ul class="fr-links-group">
    <li>
      <a class="fr-link fr-link--download" href="/assets/fichier-1.pdf" download="fichier-1.pdf">
        Télécharger
        <span class="fr-link__detail">Premier fichier, PDF, 506 Ko</span>
      </a>
    </li>
    <li>
      <a class="fr-link fr-link--download" href="/assets/fichier-2.docx" download="fichier-2.docx">
        Télécharger
        <span class="fr-link__detail">Deuxième fichier, DOCX, 214 Ko</span>
      </a>
    </li>
  </ul>
</div>`,
  }),
  react: () => ({
    imports: ["import { Download } from '@codegouvfr/react-dsfr/Download'"],
    example: part === 'single'
      ? figma.code`<Download
  label="Nom du fichier"
  details="PDF, 518 Ko"
  linkProps={{ href: '/assets/fichier.pdf' }} />`
      : figma.code`<div role="group" aria-label="Groupe de téléchargements">
    ${hasTitle ? '<p className="fr-h6">Titre du groupe</p>\n    ' : ''}<Download label="Premier fichier" details="PDF, 518 Ko" linkProps={{ href: '/assets/fichier-1.pdf' }} />
    <Download label="Deuxième fichier" details="DOCX, 214 Ko" linkProps={{ href: '/assets/fichier-2.docx' }} />
  </div>`,
  }),
  vue: () =>
    part === 'single'
      ? {
          imports: ["import DsfrFileDownload from '@gouvminint/vue-dsfr/DsfrFileDownload.vue'"],
          example: figma.code`<DsfrFileDownload
    title="Nom du fichier"
    format="PDF"
    size="506 Ko"
    href="/assets/fichier.pdf"
    download="fichier.pdf"
  />`,
        }
      : {
          imports: ["import DsfrFileDownloadList from '@gouvminint/vue-dsfr/DsfrFileDownloadList.vue'"],
          example: figma.code`<DsfrFileDownloadList
    title="${hasTitle ? 'Titre du groupe' : ''}"
    :files="[
      { title: 'Premier fichier', format: 'PDF', size: '506 Ko', href: '/assets/fichier-1.pdf', download: 'fichier-1.pdf' },
      { title: 'Deuxième fichier', format: 'DOCX', size: '214 Ko', href: '/assets/fichier-2.docx', download: 'fichier-2.docx' }
    ]"
  />`,
        },
})

export default {
  id: `downloadlink-${part}`,
  ...rendered,
  metadata: { nestable: true },
}
