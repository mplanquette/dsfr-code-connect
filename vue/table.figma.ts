import figma, { html } from '@figma/code-connect/html';

// Pas de set "tableau complet" côté Figma : uniquement des fragments de cellule (en-tête colonne,
// en-tête ligne, cellule donnée, cellules zéro, barres d'outils). Chaque fragment ci-dessous
// correspond au markup DSFR exact attendu dans un `<table class="fr-table">`.

// ─── Cellules données ───────────────────────────────────────────────────────
figma.connect('<FIGMA_TABLEAU__CELLULE_DONNEE_LG>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Texte par défaut',
      "2 données à l'horizontale": '<span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span> Texte par défaut',
      "3 données à l'horizontale": '<span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span> Texte par défaut <span class="fr-tag fr-tag--sm">Libellé tag</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br>Titre par défaut',
      '3 données à la verticale': '<strong>Titre par défaut</strong><br><span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span><br>30,00&nbsp;€',
      '4 données à la verticale': '<strong>Titre par défaut</strong><br><span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span><br>30,00&nbsp;€<br><a class="fr-link fr-link--sm" href="#">Libellé lien</a>',
    }),
    infoBulle: figma.boolean('Info-bulle', { true: ' <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-information-line fr-btn--icon-left" title="Info-bulle"></button>', false: '' }),
  },
  example: ({ contenu, infoBulle }) => html`<table><tbody><tr><td>${contenu}${infoBulle}</td></tr></tbody></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_DONNEE_MD>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Texte par défaut',
      "2 données à l'horizontale": '<span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span> Texte par défaut',
      "3 données à l'horizontale": '<span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span> Texte par défaut <span class="fr-tag fr-tag--sm">Libellé tag</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br><span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span>',
      '3 données à la verticale': '<strong>Titre par défaut</strong><br><span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span><br>30,00&nbsp;€',
      '4 données à la verticale': '<strong>Titre par défaut</strong><br><span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span><br>30,00&nbsp;€<br><a class="fr-link fr-link--sm" href="#">Libellé lien</a>',
    }),
    infoBulle: figma.boolean('Info-bulle', { true: ' <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-information-line fr-btn--icon-left" title="Info-bulle"></button>', false: '' }),
  },
  example: ({ contenu, infoBulle }) => html`<table><tbody><tr><td>${contenu}${infoBulle}</td></tr></tbody></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_DONNEE_SM>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Texte par défaut',
      "2 données à l'horizontale": '<span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span> Texte par défaut',
      "3 données à l'horizontale": '<span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span> Texte par défaut <span class="fr-tag fr-tag--sm">Libellé tag</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br><span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span>',
      '3 données à la verticale': '<strong>Titre par défaut</strong><br><span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span><br>30,00&nbsp;€',
      '4 données  la verticale': '<strong>Titre par défaut</strong><br><span class="fr-badge fr-badge--sm fr-badge--no-icon">Badge</span><br>30,00&nbsp;€<br><a class="fr-link fr-link--sm" href="#">Libellé lien</a>',
    }),
    infoBulle: figma.boolean('Info-bulle', { true: ' <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-information-line fr-btn--icon-left" title="Info-bulle"></button>', false: '' }),
  },
  example: ({ contenu, infoBulle }) => html`<table><tbody><tr><td>${contenu}${infoBulle}</td></tr></tbody></table>`,
});

// ─── Cellules en-tête de colonne ────────────────────────────────────────────
figma.connect('<FIGMA_TABLEAU__CELLULE_EN_TETE_COLONNE_MD>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Titre par défaut',
      "2 données à l'horizontales": 'Titre par défaut <span class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
      "3 données à l'horizontale": 'Titre par défaut <span class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span> <span class="fr-tag fr-tag--sm">Libellé tag</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br>Texte par défaut',
    }),
    actionsColonne: figma.enum('Actions colonne', { On: ' <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-arrow-down-line fr-btn--icon-right" title="Trier">Trier</button>', Off: '' }),
    selectionnable: figma.boolean('Sélectionnable', { true: '<th scope="col"><input type="checkbox" class="fr-checkbox-group" aria-label="Tout sélectionner"></th>', false: '' }),
  },
  example: ({ contenu, actionsColonne, selectionnable }) => html`<table><thead><tr>${selectionnable}<th scope="col">${contenu}${actionsColonne}</th></tr></thead></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_EN_TETE_COLONNE_SM>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Titre par défaut',
      "2 données à l'horizontale": 'Titre par défaut <span class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
      "3 données à l'horizontale": 'Titre par défaut <span class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span> <span class="fr-tag fr-tag--sm">Libellé tag</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br>Texte par défaut',
    }),
    actionsColonne: figma.enum('Actions colonne', { On: ' <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-arrow-down-line fr-btn--icon-right" title="Trier">Trier</button>', Off: '' }),
    selectionnable: figma.boolean('Sélectionnable', { true: '<th scope="col"><input type="checkbox" class="fr-checkbox-group" aria-label="Tout sélectionner"></th>', false: '' }),
  },
  example: ({ contenu, actionsColonne, selectionnable }) => html`<table><thead><tr>${selectionnable}<th scope="col">${contenu}${actionsColonne}</th></tr></thead></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_EN_TETE_COLONNE_LG>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Titre par défaut',
      "2 données à l'horizontale": 'Titre par défaut <span class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
      "3 données à l'horizontale": 'Titre par défaut <span class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span> <span class="fr-tag fr-tag--sm">Libellé tag</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br>Texte par défaut',
    }),
    actionsColonne: figma.enum('Actions colonne', { On: ' <button class="fr-btn fr-btn--tertiary-no-outline fr-btn--sm fr-icon-arrow-down-line fr-btn--icon-right" title="Trier">Trier</button>', Off: '' }),
    selectionnable: figma.boolean('Sélectionnable', { true: '<th scope="col"><input type="checkbox" class="fr-checkbox-group" aria-label="Tout sélectionner"></th>', false: '' }),
  },
  example: ({ contenu, actionsColonne, selectionnable }) => html`<table><thead><tr>${selectionnable}<th scope="col">${contenu}${actionsColonne}</th></tr></thead></table>`,
});

// ─── Cellules en-tête de ligne ──────────────────────────────────────────────
figma.connect('<FIGMA_TABLEAU__CELLULE_EN_TETE_LIGNE_SM>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Titre par défaut',
      "2 données à l'horizontale": 'Titre par défaut <span class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br>Texte par défaut',
      '3 données à la verticale': '<strong>Titre par défaut</strong><br>Texte par défaut<br><span class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
    }),
    selectionnable: figma.enum('Sélectionnable', { On: '<th scope="col"><span class="fr-sr-only">Sélection</span></th>', Off: '' }),
  },
  example: ({ contenu, selectionnable }) => html`<table><tbody><tr>${selectionnable}<th scope="row">${contenu}</th></tr></tbody></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_EN_TETE_LIGNE_MD>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Titre par défaut',
      "2 données à l'horizontale": 'Titre par défaut <span class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br>Texte par défaut',
      '3 données à la verticale': '<strong>Titre par défaut</strong><br>Texte par défaut<br><span class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
    }),
    selectionnable: figma.enum('Sélectionnable', { On: '<th scope="col"><span class="fr-sr-only">Sélection</span></th>', Off: '' }),
  },
  example: ({ contenu, selectionnable }) => html`<table><tbody><tr>${selectionnable}<th scope="row">${contenu}</th></tr></tbody></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_EN_TETE_LIGNE_LG>', {
  props: {
    contenu: figma.enum('Contenu', {
      '1 donnée': 'Titre par défaut',
      "2 données à l'horizontale": 'Titre par défaut <span class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
      '2 données à la verticale': '<strong>Titre par défaut</strong><br>Texte par défaut',
      '3 données à la verticale': '<strong>Titre par défaut</strong><br>Texte par défaut<br><span class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Badge</span>',
    }),
    selectionnable: figma.enum('Sélectionnable', { On: '<th scope="col"><span class="fr-sr-only">Sélection</span></th>', Off: '' }),
  },
  example: ({ contenu, selectionnable }) => html`<table><tbody><tr>${selectionnable}<th scope="row">${contenu}</th></tr></tbody></table>`,
});

// ─── Barre d'outils haute ───────────────────────────────────────────────────
figma.connect('<FIGMA_TABLEAU__BARRE_OUTILS_HAUT>', {
  props: {
    actionDeGroupe: figma.boolean('Action de groupe', {
      true: '<div class="fr-btns-group fr-btns-group--inline"><button class="fr-btn fr-btn--secondary">Action groupée</button><button class="fr-btn fr-btn--secondary">Action groupée</button></div>',
      false: '',
    }),
    changementDeVue: figma.boolean('Changement de vue', {
      true: '<div class="fr-segmented fr-segmented--sm"><div class="fr-segmented__elements"><div class="fr-segmented__element"><input value="tableau" type="radio" id="view-table" name="view" checked><label class="fr-label" for="view-table">Tableau</label></div><div class="fr-segmented__element"><input value="liste" type="radio" id="view-list" name="view"><label class="fr-label" for="view-list">Liste</label></div></div></div>',
      false: '',
    }),
  },
  example: ({ actionDeGroupe, changementDeVue }) => html`<div class="fr-table__header">${actionDeGroupe}${changementDeVue}</div>`,
});

// ─── Barre d'outils basse ───────────────────────────────────────────────────
figma.connect('<FIGMA_TABLEAU__BARRE_OUTILS_BAS>', {
  props: {
    nbLignesParPage: figma.boolean('Nb ligne par page ', {
      true: '<div class="fr-select-group"><label class="fr-label" for="rows-per-page">Nombre lignes</label><select class="fr-select" id="rows-per-page"><option>10</option></select></div>',
      false: '',
    }),
    pagination: figma.boolean('Pagination', {
      true: '<nav class="fr-pagination" aria-label="Pagination"><ul class="fr-pagination__list"><li><button class="fr-pagination__link fr-pagination__link--first" aria-disabled="true">Première page</button></li></ul></nav>',
      false: '',
    }),
    actionTableau: figma.boolean('Action tableau', {
      true: '<div class="fr-btns-group fr-btns-group--inline"><button class="fr-btn fr-btn--secondary">Libellé</button><button class="fr-btn">Libellé</button></div>',
      false: '',
    }),
  },
  example: ({ nbLignesParPage, pagination, actionTableau }) => html`<div class="fr-table__footer">${nbLignesParPage}${pagination}${actionTableau}</div>`,
});

// ─── Cellule zéro (coin haut-gauche) ────────────────────────────────────────
figma.connect('<FIGMA_TABLEAU__CELLULE_ZERO_SM>', {
  props: {},
  example: () => html`<table><thead><tr><th scope="col"></th></tr></thead></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_ZERO_MD>', {
  props: {},
  example: () => html`<table><thead><tr><th scope="col"></th></tr></thead></table>`,
});

figma.connect('<FIGMA_TABLEAU__CELLULE_ZERO_LG>', {
  props: {},
  example: () => html`<table><thead><tr><th scope="col"></th></tr></thead></table>`,
});
