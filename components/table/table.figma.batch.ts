// Tableau DSFR : fragments de cellule, un template pour les 4 stacks et les 6 sortes de nodes
// (`kind` dans table.json : data, column, row, toolbar-top, toolbar-bottom, zero).
//
// Pas de set « tableau complet » côté Figma : uniquement des fragments de cellule (en-tête
// colonne, en-tête ligne, cellule donnée, cellule zéro, barres d'outils). Le tableau des portages
// (`dsfr-datatable` côté ngx-dsfr, `Table` de react-dsfr) est piloté par un modèle de données sans
// notion déclarative de « type de cellule » : il n'existe donc aucun sous-composant ciblant une
// cellule isolée. Chaque snippet montre le fragment HTML DSFR exact (JSX en React, `class` →
// `className`) que `DsfrColumn.formatFunction` / `tableBodyTemplate` (Angular) ou chaque entrée de
// `data` / `headers` (React) doit produire, pas un composant autonome ni un tableau complet.
// Vue : même markup que le HTML.
//
// Pièges de nommage du design, conservés tels quels car ce sont les vrais noms :
//   - « Nb ligne par page » (barre d'outils basse) a un espace final caché dans son nom réel ;
//     sans lui, `publish` échoue (« property does not exist »).
//   - option « 4 données  la verticale » (sans « à », double espace) sur la cellule donnée SM ;
//   - option « 2 données à l'horizontales » (pluriel) sur l'en-tête de colonne MD.
//   Les correspondances ci-dessous couvrent donc ces variantes d'orthographe.
// Thème et Support = CSS seul. Survol = pseudo-état → ignoré.
//
// Écart connu repris de l'ancien code : pour la cellule donnée LG, « 2 données à la verticale »
// affiche « Titre par défaut » à la place du badge en HTML et en Vue (les autres tailles et les
// autres stacks montrent le badge). Reproduit à l'identique en attendant l'arbitrage.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, kind, size } = figma.batch as {
  stack: string
  kind: 'data' | 'column' | 'row' | 'toolbar-top' | 'toolbar-bottom' | 'zero'
  size?: 'SM' | 'MD' | 'LG'
}

const react = stack === 'react'
/** Attribut de classe selon la stack (JSX : `className`). */
const c = react ? 'className' : 'class'
/** Saut de ligne : auto-fermant en JSX. */
const br = react ? '<br/>' : '<br>'

const badge = `<span ${c}="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span>`
const badgeSuccess = `<span ${c}="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>`
const tag = `<span ${c}="fr-tag fr-tag--sm">Libellé tag</span>`

/** Contenu d'une cellule donnée. */
function dataContent(): string {
  const content = readEnum(instance, 'Contenu', {
    '1 donnée': 'one',
    "2 données à l'horizontale": 'horizontal2',
    "3 données à l'horizontale": 'horizontal3',
    '2 données à la verticale': 'vertical2',
    '3 données à la verticale': 'vertical3',
    '4 données à la verticale': 'vertical4',
    '4 données  la verticale': 'vertical4',
  } as const)
  const vertical2Second = size === 'LG' && (stack === 'html' || stack === 'vue') ? 'Titre par défaut' : badge
  return {
    one: 'Texte par défaut',
    horizontal2: `${badge} Texte par défaut`,
    horizontal3: `${badge} Texte par défaut ${tag}`,
    vertical2: `<strong>Titre par défaut</strong>${br}${vertical2Second}`,
    vertical3: `<strong>Titre par défaut</strong>${br}${badge}${br}30,00&nbsp;€`,
    vertical4: `<strong>Titre par défaut</strong>${br}${badge}${br}30,00&nbsp;€${br}<a ${c}="fr-link fr-link--sm" href="#">Libellé lien</a>`,
  }[content]
}

/** Contenu d'un en-tête de colonne. */
function columnContent(): string {
  const content = readEnum(instance, 'Contenu', {
    '1 donnée': 'one',
    "2 données à l'horizontale": 'horizontal2',
    "2 données à l'horizontales": 'horizontal2',
    "3 données à l'horizontale": 'horizontal3',
    '2 données à la verticale': 'vertical2',
  } as const)
  return {
    one: 'Titre par défaut',
    horizontal2: `Titre par défaut ${badgeSuccess}`,
    horizontal3: `Titre par défaut ${badgeSuccess} ${tag}`,
    vertical2: `<strong>Titre par défaut</strong>${br}Texte par défaut`,
  }[content]
}

/** Contenu d'un en-tête de ligne. */
function rowContent(): string {
  const content = readEnum(instance, 'Contenu', {
    '1 donnée': 'one',
    "2 données à l'horizontale": 'horizontal2',
    '2 données à la verticale': 'vertical2',
    '3 données à la verticale': 'vertical3',
  } as const)
  return {
    one: 'Titre par défaut',
    horizontal2: `Titre par défaut ${badgeSuccess}`,
    vertical2: `<strong>Titre par défaut</strong>${br}Texte par défaut`,
    vertical3: `<strong>Titre par défaut</strong>${br}Texte par défaut${br}${badgeSuccess}`,
  }[content]
}

/** Fragment de tableau à rendre pour le node courant. */
function fragment(): string {
  switch (kind) {
    case 'data': {
      const content = dataContent()
      const infoBubble = instance.getBoolean('Info-bulle')
        ? ` <button ${c}="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-information-line fr-btn--icon-left" title="Info-bulle"></button>`
        : ''
      return `<table><tbody><tr><td>${content}${infoBubble}</td></tr></tbody></table>`
    }
    case 'column': {
      const content = columnContent()
      const actions = readEnum(instance, 'Actions colonne', {
        On: ` <button ${c}="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-arrow-down-line fr-btn--icon-right" title="Trier">Trier</button>`,
        Off: '',
      })
      const selectable = instance.getBoolean('Sélectionnable')
        ? `<th scope="col"><input type="checkbox" ${c}="fr-checkbox-group" aria-label="Tout sélectionner"${react ? ' /' : ''}></th>`
        : ''
      return `<table><thead><tr>${selectable}<th scope="col">${content}${actions}</th></tr></thead></table>`
    }
    case 'row': {
      const content = rowContent()
      const selectable = readEnum(instance, 'Sélectionnable', {
        On: `<th scope="col"><span ${c}="fr-sr-only">Sélection</span></th>`,
        Off: '',
      })
      return `<table><tbody><tr>${selectable}<th scope="row">${content}</th></tr></tbody></table>`
    }
    case 'toolbar-top': {
      const groupAction = instance.getBoolean('Action de groupe')
        ? `<div ${c}="fr-btns-group fr-btns-group--inline"><button ${c}="fr-btn fr-btn--secondary">Action groupée</button><button ${c}="fr-btn fr-btn--secondary">Action groupée</button></div>`
        : ''
      const viewSwitch = instance.getBoolean('Changement de vue')
        ? react
          ? `<div className="fr-segmented fr-segmented--sm"><div className="fr-segmented__elements"><div className="fr-segmented__element"><input value="tableau" type="radio" id="view-table" name="view" defaultChecked /><label className="fr-label" htmlFor="view-table">Tableau</label></div><div className="fr-segmented__element"><input value="liste" type="radio" id="view-list" name="view" /><label className="fr-label" htmlFor="view-list">Liste</label></div></div></div>`
          : `<div class="fr-segmented fr-segmented--sm"><div class="fr-segmented__elements"><div class="fr-segmented__element"><input value="tableau" type="radio" id="view-table" name="view" checked><label class="fr-label" for="view-table">Tableau</label></div><div class="fr-segmented__element"><input value="liste" type="radio" id="view-list" name="view"><label class="fr-label" for="view-list">Liste</label></div></div></div>`
        : ''
      return `<div ${c}="fr-table__header">${groupAction}${viewSwitch}</div>`
    }
    case 'toolbar-bottom': {
      const forAttr = react ? 'htmlFor' : 'for'
      // Espace final dans le nom : c'est le vrai nom de la propriété (cf. en-tête).
      const rowsPerPage = instance.getBoolean('Nb ligne par page ')
        ? `<div ${c}="fr-select-group"><label ${c}="fr-label" ${forAttr}="rows-per-page">Nombre lignes</label><select ${c}="fr-select" id="rows-per-page"><option>10</option></select></div>`
        : ''
      const pagination = instance.getBoolean('Pagination')
        ? `<nav ${c}="fr-pagination" aria-label="Pagination"><ul ${c}="fr-pagination__list"><li><button ${c}="fr-pagination__link fr-pagination__link--first" aria-disabled="true">Première page</button></li></ul></nav>`
        : ''
      const tableAction = instance.getBoolean('Action tableau')
        ? `<div ${c}="fr-btns-group fr-btns-group--inline"><button ${c}="fr-btn fr-btn--secondary">Libellé</button><button ${c}="fr-btn">Libellé</button></div>`
        : ''
      return `<div ${c}="fr-table__footer">${rowsPerPage}${pagination}${tableAction}</div>`
    }
    case 'zero':
      return '<table><thead><tr><th scope="col"></th></tr></thead></table>'
  }
}

const example = fragment()

const rendered = renderFor(stack, {
  angular: () => ({
    imports: ["import { DsfrColumn } from '@edugouvfr/ngx-dsfr'"],
    example: figma.code`${example}`,
  }),
  html: () => ({ example: figma.code`${example}` }),
  react: () => ({ example: figma.code`${example}` }),
  vue: () => ({ example: figma.code`${example}` }),
})

export default {
  id: size ? `table-${kind}-${size.toLowerCase()}` : `table-${kind}`,
  ...rendered,
  metadata: { nestable: true },
}
