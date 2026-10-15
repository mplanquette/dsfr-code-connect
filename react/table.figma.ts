import figma, { html } from '@figma/code-connect/html';

// `Table` (react-dsfr) est piloté par `data: ReactNode[][]` / `headers: ReactNode[]`, sans
// notion déclarative de « type de cellule » (contrairement à `dsfr-datatable` côté Angular,
// piloté via `DsfrColumn.formatFunction`) : il n'existe donc, ici comme côté Angular/HTML,
// aucun sous-composant ciblant une cellule isolée. Les fragments ci-dessous montrent le
// rendu JSX (`class` → `className`) que chaque entrée de `data`/`headers` doit produire pour
// cette famille de cellule Figma, pas un `<Table>` complet ni un composant autonome.
// Piège : la propriété Figma « Nb ligne par page » (Barre outils bas) a un espace final
// caché dans son vrai nom (visible dans sa `key` API, absent du `name` affiché), // `figma.boolean` doit être appelé avec `'Nb ligne par page '` (espace final) sous peine
// d'échec de `publish` (« property does not exist »).

// ─── Cellules données ───────────────────────────────────────────────────────
figma.connect('<FIGMA_TABLEAU__CELLULE_DONNEE_LG>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Texte par défaut',
      "2 données à l'horizontale": '<span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span> Texte par défaut',
      "3 données à l'horizontale": '<span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span> Texte par défaut <span className="fr-tag fr-tag--sm">Libellé tag</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br/><span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span>',
      '3 données à la verticale': '<strong>Titre par défaut</strong><br/><span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span><br/>30,00&nbsp;€',
      '4 données à la verticale': '<strong>Titre par défaut</strong><br/><span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span><br/>30,00&nbsp;€<br/><a className="fr-link fr-link--sm" href="#">Libellé lien</a>',
    }),
    infoBulle: figma.boolean('Info-bulle', { true: ' <button className="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-information-line fr-btn--icon-left" title="Info-bulle"></button>', false: '' }),
  },
  example: ({ contenu, infoBulle }) => html`<table><tbody><tr><td>${contenu}${infoBulle}</td></tr></tbody></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_DONNEE_MD>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Texte par défaut',
      "2 données à l'horizontale": '<span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span> Texte par défaut',
      "3 données à l'horizontale": '<span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span> Texte par défaut <span className="fr-tag fr-tag--sm">Libellé tag</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br/><span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span>',
      '3 données à la verticale': '<strong>Titre par défaut</strong><br/><span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span><br/>30,00&nbsp;€',
      '4 données à la verticale': '<strong>Titre par défaut</strong><br/><span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span><br/>30,00&nbsp;€<br/><a className="fr-link fr-link--sm" href="#">Libellé lien</a>',
    }),
    infoBulle: figma.boolean('Info-bulle', { true: ' <button className="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-information-line fr-btn--icon-left" title="Info-bulle"></button>', false: '' }),
  },
  example: ({ contenu, infoBulle }) => html`<table><tbody><tr><td>${contenu}${infoBulle}</td></tr></tbody></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_DONNEE_SM>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Texte par défaut',
      "2 données à l'horizontale": '<span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span> Texte par défaut',
      "3 données à l'horizontale": '<span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span> Texte par défaut <span className="fr-tag fr-tag--sm">Libellé tag</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br/><span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span>',
      '3 données à la verticale': '<strong>Titre par défaut</strong><br/><span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span><br/>30,00&nbsp;€',
      '4 données  la verticale': '<strong>Titre par défaut</strong><br/><span className="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span><br/>30,00&nbsp;€<br/><a className="fr-link fr-link--sm" href="#">Libellé lien</a>',
    }),
    infoBulle: figma.boolean('Info-bulle', { true: ' <button className="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-information-line fr-btn--icon-left" title="Info-bulle"></button>', false: '' }),
  },
  example: ({ contenu, infoBulle }) => html`<table><tbody><tr><td>${contenu}${infoBulle}</td></tr></tbody></table>`,
});

// ─── Cellules en-tête de colonne ────────────────────────────────────────────
figma.connect('<FIGMA_TABLEAU__CELLULE_EN_TETE_COLONNE_MD>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Titre par défaut',
      "2 données à l'horizontales": 'Titre par défaut <span className="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
      "3 données à l'horizontale": 'Titre par défaut <span className="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span> <span className="fr-tag fr-tag--sm">Libellé tag</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br/>Texte par défaut',
    }),
    actionsColonne: figma.enum('Actions colonne', { On: ' <button className="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-arrow-down-line fr-btn--icon-right" title="Trier">Trier</button>', Off: '' }),
    selectionnable: figma.boolean('Sélectionnable', { true: '<th scope="col"><input type="checkbox" className="fr-checkbox-group" aria-label="Tout sélectionner" /></th>', false: '' }),
  },
  example: ({ contenu, actionsColonne, selectionnable }) => html`<table><thead><tr>${selectionnable}<th scope="col">${contenu}${actionsColonne}</th></tr></thead></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_EN_TETE_COLONNE_SM>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Titre par défaut',
      "2 données à l'horizontale": 'Titre par défaut <span className="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
      "3 données à l'horizontale": 'Titre par défaut <span className="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span> <span className="fr-tag fr-tag--sm">Libellé tag</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br/>Texte par défaut',
    }),
    actionsColonne: figma.enum('Actions colonne', { On: ' <button className="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-arrow-down-line fr-btn--icon-right" title="Trier">Trier</button>', Off: '' }),
    selectionnable: figma.boolean('Sélectionnable', { true: '<th scope="col"><input type="checkbox" className="fr-checkbox-group" aria-label="Tout sélectionner" /></th>', false: '' }),
  },
  example: ({ contenu, actionsColonne, selectionnable }) => html`<table><thead><tr>${selectionnable}<th scope="col">${contenu}${actionsColonne}</th></tr></thead></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_EN_TETE_COLONNE_LG>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Titre par défaut',
      "2 données à l'horizontale": 'Titre par défaut <span className="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
      "3 données à l'horizontale": 'Titre par défaut <span className="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span> <span className="fr-tag fr-tag--sm">Libellé tag</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br/>Texte par défaut',
    }),
    actionsColonne: figma.enum('Actions colonne', { On: ' <button className="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-arrow-down-line fr-btn--icon-right" title="Trier">Trier</button>', Off: '' }),
    selectionnable: figma.boolean('Sélectionnable', { true: '<th scope="col"><input type="checkbox" className="fr-checkbox-group" aria-label="Tout sélectionner" /></th>', false: '' }),
  },
  example: ({ contenu, actionsColonne, selectionnable }) => html`<table><thead><tr>${selectionnable}<th scope="col">${contenu}${actionsColonne}</th></tr></thead></table>`,
});

// ─── Cellules en-tête de ligne ──────────────────────────────────────────────
figma.connect('<FIGMA_TABLEAU__CELLULE_EN_TETE_LIGNE_SM>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Titre par défaut',
      "2 données à l'horizontale": 'Titre par défaut <span className="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br/>Texte par défaut',
      '3 données à la verticale': '<strong>Titre par défaut</strong><br/>Texte par défaut<br/><span className="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
    }),
    selectionnable: figma.enum('Sélectionnable', { On: '<th scope="col"><span className="fr-sr-only">Sélection</span></th>', Off: '' }),
  },
  example: ({ contenu, selectionnable }) => html`<table><tbody><tr>${selectionnable}<th scope="row">${contenu}</th></tr></tbody></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_EN_TETE_LIGNE_MD>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Titre par défaut',
      "2 données à l'horizontale": 'Titre par défaut <span className="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br/>Texte par défaut',
      '3 données à la verticale': '<strong>Titre par défaut</strong><br/>Texte par défaut<br/><span className="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
    }),
    selectionnable: figma.enum('Sélectionnable', { On: '<th scope="col"><span className="fr-sr-only">Sélection</span></th>', Off: '' }),
  },
  example: ({ contenu, selectionnable }) => html`<table><tbody><tr>${selectionnable}<th scope="row">${contenu}</th></tr></tbody></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_EN_TETE_LIGNE_LG>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Titre par défaut',
      "2 données à l'horizontale": 'Titre par défaut <span className="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br/>Texte par défaut',
      '3 données à la verticale': '<strong>Titre par défaut</strong><br/>Texte par défaut<br/><span className="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
    }),
    selectionnable: figma.enum('Sélectionnable', { On: '<th scope="col"><span className="fr-sr-only">Sélection</span></th>', Off: '' }),
  },
  example: ({ contenu, selectionnable }) => html`<table><tbody><tr>${selectionnable}<th scope="row">${contenu}</th></tr></tbody></table>`,
});

// ─── Barres d'outils ────────────────────────────────────────────────────────
figma.connect('<FIGMA_TABLEAU__BARRE_OUTILS_HAUT>', {
  props: {
    actionDeGroupe: figma.boolean('Action de groupe', {
      true: '<div className="fr-btns-group fr-btns-group--inline"><button className="fr-btn fr-btn--secondary">Action groupée</button><button className="fr-btn fr-btn--secondary">Action groupée</button></div>',
      false: '',
    }),
    changementDeVue: figma.boolean('Changement de vue', {
      true: '<div className="fr-segmented fr-segmented--sm"><div className="fr-segmented__elements"><div className="fr-segmented__element"><input value="tableau" type="radio" id="view-table" name="view" defaultChecked /><label className="fr-label" htmlFor="view-table">Tableau</label></div><div className="fr-segmented__element"><input value="liste" type="radio" id="view-list" name="view" /><label className="fr-label" htmlFor="view-list">Liste</label></div></div></div>',
      false: '',
    }),
  },
  example: ({ actionDeGroupe, changementDeVue }) => html`<div className="fr-table__header">${actionDeGroupe}${changementDeVue}</div>`,
});

// ─── Barre d'outils basse ───────────────────────────────────────────────────
figma.connect('<FIGMA_TABLEAU__BARRE_OUTILS_BAS>', {
  props: {
    nbLignesParPage: figma.boolean('Nb ligne par page ', {
      true: '<div className="fr-select-group"><label className="fr-label" htmlFor="rows-per-page">Nombre lignes</label><select className="fr-select" id="rows-per-page"><option>10</option></select></div>',
      false: '',
    }),
    pagination: figma.boolean('Pagination', {
      true: '<nav className="fr-pagination" aria-label="Pagination"><ul className="fr-pagination__list"><li><button className="fr-pagination__link fr-pagination__link--first" aria-disabled="true">Première page</button></li></ul></nav>',
      false: '',
    }),
    actionTableau: figma.boolean('Action tableau', {
      true: '<div className="fr-btns-group fr-btns-group--inline"><button className="fr-btn fr-btn--secondary">Libellé</button><button className="fr-btn">Libellé</button></div>',
      false: '',
    }),
  },
  example: ({ nbLignesParPage, pagination, actionTableau }) => html`<div className="fr-table__footer">${nbLignesParPage}${pagination}${actionTableau}</div>`,
});

// ─── Cellule zéro (coin haut-gauche) ────────────────────────────────────────
figma.connect('<FIGMA_TABLEAU__CELLULE_ZERO_SM>', {
  example: () => html`<table><thead><tr><th scope="col"></th></tr></thead></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_ZERO_MD>', {
  example: () => html`<table><thead><tr><th scope="col"></th></tr></thead></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_ZERO_LG>', {
  example: () => html`<table><thead><tr><th scope="col"></th></tr></thead></table>`,
});
