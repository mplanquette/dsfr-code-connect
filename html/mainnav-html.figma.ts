import figma, { html } from '@figma/code-connect/html';

// Navigation principale DSFR : 13 sets. Contrairement aux autres familles, le thème
// (Clair/Sombre) est ici une variante interne à chaque set, pas une duplication de
// page : les 13 sets couvrent déjà tout le périmètre utile.
// La navigation desktop ET mobile provient du même bloc `fr-header__menu`
// (responsive) : chaque exemple montre le fragment de markup `fr-nav` qui produit
// l'état sélectionné dans Figma. Survol = pseudo-état → ignoré. « >1200px » et
// « Dernier lien » sont des variantes de mise en page CSS → ignorées.

// ─── Desktop / Barre de navigation - Lien seul ───────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-15930', {
  props: {
    current: figma.enum('Courant', { True: ' aria-current="page"', False: '' }),
  },
  example: ({ current }) =>
    html`<nav class="fr-nav" role="navigation" aria-label="Menu principal">
  <ul class="fr-nav__list">
    <li class="fr-nav__item">
      <a class="fr-nav__link" href="/lien"${current}>Libellé du lien</a>
    </li>
  </ul>
</nav>`,
});

// ─── Desktop / Barre de navigation - Dépliant ────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-15981', {
  props: {
    expanded: figma.enum('Ouvert', { True: 'true', False: 'false' }),
    collapseClass: figma.enum('Ouvert', { True: ' fr-collapse--expanded', False: '' }),
    current: figma.enum('Courant', { True: ' aria-current="page"', False: '' }),
  },
  example: ({ expanded, collapseClass, current }) =>
    html`<nav class="fr-nav" role="navigation" aria-label="Menu principal">
  <ul class="fr-nav__list">
    <li class="fr-nav__item">
      <button class="fr-nav__btn" aria-expanded="${expanded}" aria-controls="menu-1"${current}>Menu déroulant</button>
      <div class="fr-collapse fr-menu${collapseClass}" id="menu-1">
        <ul class="fr-menu__list">
          <li><a class="fr-nav__link" href="/premier">Premier lien</a></li>
          <li><a class="fr-nav__link" href="/deuxieme">Deuxième lien</a></li>
        </ul>
      </div>
    </li>
  </ul>
</nav>`,
});

// ─── Desktop / Barre de navigation - Complète ────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-18621', {
  props: {
    items: figma.enum('Items', {
      '2-4': `<li class="fr-nav__item"><a class="fr-nav__link" href="/premier">Premier lien</a></li>
    <li class="fr-nav__item"><a class="fr-nav__link" href="/deuxieme">Deuxième lien</a></li>
    <li class="fr-nav__item"><a class="fr-nav__link" href="/troisieme">Troisième lien</a></li>`,
      '5-8': `<li class="fr-nav__item"><a class="fr-nav__link" href="/premier">Premier lien</a></li>
    <li class="fr-nav__item"><a class="fr-nav__link" href="/deuxieme">Deuxième lien</a></li>
    <li class="fr-nav__item"><a class="fr-nav__link" href="/troisieme">Troisième lien</a></li>
    <li class="fr-nav__item"><a class="fr-nav__link" href="/quatrieme">Quatrième lien</a></li>
    <li class="fr-nav__item"><a class="fr-nav__link" href="/cinquieme">Cinquième lien</a></li>`,
    }),
  },
  example: ({ items }) =>
    html`<nav class="fr-nav" role="navigation" aria-label="Menu principal">
  <ul class="fr-nav__list">
    ${items}
  </ul>
</nav>`,
});

// ─── Desktop / Menu déroulant - Item ──────────────────────────────────────────
// « Rubrique » (vs « Lien direct ») n'a pas de rendu distinct côté DSFR : les deux
// sont un simple `<a class="fr-nav__link">`.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-18731', {
  props: {
    current: figma.enum('État', { Défaut: '', Survol: '', Courant: ' aria-current="page"' }),
  },
  example: ({ current }) =>
    html`<div class="fr-collapse fr-menu fr-collapse--expanded" id="menu-1">
  <ul class="fr-menu__list">
    <li><a class="fr-nav__link" href="/lien"${current}>Libellé du lien</a></li>
  </ul>
</div>`,
});

// ─── Desktop / Menu déroulant - Complet ───────────────────────────────────────
// « Rubrique » (titre de section) n'a pas d'équivalent dans le menu déroulant
// simple (réservé au mégamenu) → non bindé.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-18976', {
  example: () =>
    html`<div class="fr-collapse fr-menu fr-collapse--expanded" id="menu-1">
  <ul class="fr-menu__list">
    <li><a class="fr-nav__link" href="/premier">Premier lien</a></li>
    <li><a class="fr-nav__link" href="/deuxieme">Deuxième lien</a></li>
    <li><a class="fr-nav__link" href="/troisieme">Troisième lien</a></li>
  </ul>
</div>`,
});

// ─── Desktop / Mégamenu - Item ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-19335', {
  props: {
    current: figma.enum('État', { Défaut: '', Survol: '', Courant: ' aria-current="page"' }),
  },
  example: ({ current }) =>
    html`<div class="fr-col-12 fr-col-lg-3">
  <h5 class="fr-mega-menu__category"><span class="fr-nav__link">Catégorie</span></h5>
  <ul class="fr-mega-menu__list">
    <li><a class="fr-nav__link" href="/lien"${current}>Libellé du lien</a></li>
  </ul>
</div>`,
});

// ─── Desktop / Mégamenu - Complet ─────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=220-23176', {
  props: {
    categories: figma.enum('Catégories', {
      True: `<div class="fr-col-12 fr-col-lg-3">
      <h5 class="fr-mega-menu__category"><span class="fr-nav__link">Première catégorie</span></h5>
      <ul class="fr-mega-menu__list">
        <li><a class="fr-nav__link" href="/lien-1">Lien</a></li>
      </ul>
    </div>
    <div class="fr-col-12 fr-col-lg-3">
      <h5 class="fr-mega-menu__category"><span class="fr-nav__link">Deuxième catégorie</span></h5>
      <ul class="fr-mega-menu__list">
        <li><a class="fr-nav__link" href="/lien-2">Lien</a></li>
      </ul>
    </div>`,
      False: `<div class="fr-col-12 fr-col-lg-3">
      <h5 class="fr-mega-menu__category"><span class="fr-nav__link">Catégorie</span></h5>
      <ul class="fr-mega-menu__list">
        <li><a class="fr-nav__link" href="/lien-1">Lien</a></li>
      </ul>
    </div>`,
    }),
    leader: figma.enum('Rubrique', {
      Sans: '',
      Titre: `\n    <div class="fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right">
      <div class="fr-mega-menu__leader">
        <h4 class="fr-h4 fr-mb-2v">Titre de la rubrique</h4>
      </div>
    </div>`,
      'Titre + description': `\n    <div class="fr-col-12 fr-col-lg-8 fr-col-offset-lg-4--right">
      <div class="fr-mega-menu__leader">
        <h4 class="fr-h4 fr-mb-2v">Titre de la rubrique</h4>
        <p>Texte de description de la rubrique.</p>
      </div>
    </div>`,
    }),
  },
  example: ({ categories, leader }) =>
    html`<div class="fr-container fr-container--fluid fr-container-lg">
  <div class="fr-grid-row fr-grid-row-lg--gutters">
    <div class="fr-col-12 fr-mb-n3v">
      <button type="button" class="fr-btn--close fr-btn" aria-controls="mega-menu-1">Fermer</button>
    </div>${leader}
    ${categories}
  </div>
</div>`,
});

// ─── Mobile / Items de niveau 1 - Dépliant ───────────────────────────────────
// « Titre rubrique » ajoute un titre de section au panneau mégamenu (leader.title),
// non disponible sur un simple menu déroulant → bindé côté mégamenu.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=251-16916', {
  props: {
    expanded: figma.enum('Ouvert', { True: 'true', False: 'false' }),
    collapseClass: figma.enum('Ouvert', { True: ' fr-collapse--expanded', False: '' }),
    current: figma.enum('État', { Défaut: '', Courant: ' aria-current="page"' }),
    title: figma.boolean('Titre rubrique', {
      true: `\n    <h4 class="fr-h4 fr-mb-2v">Titre de la rubrique</h4>`,
      false: '',
    }),
  },
  example: ({ expanded, collapseClass, current, title }) =>
    html`<li class="fr-nav__item">
  <button class="fr-nav__btn" aria-expanded="${expanded}" aria-controls="mega-menu-1"${current}>Menu déroulant</button>
  <div class="fr-collapse fr-mega-menu${collapseClass}" id="mega-menu-1">${title}
    <div class="fr-col-12 fr-col-lg-3">
      <h5 class="fr-mega-menu__category"><span class="fr-nav__link">Catégorie</span></h5>
      <ul class="fr-mega-menu__list">
        <li><a class="fr-nav__link" href="/lien">Lien</a></li>
      </ul>
    </div>
  </div>
</li>`,
});

// ─── Mobile / Item de niveau 2 ────────────────────────────────────────────────
// « Catégorie » (vs « Lien direct ») correspond à un lien de mégamenu ; « Dernier
// lien » est une variante de mise en page → non bindée.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=251-16994', {
  props: {
    current: figma.enum('État', { Défaut: '', Courant: ' aria-current="page"' }),
  },
  example: ({ current }) =>
    html`<li><a class="fr-nav__link" href="/lien"${current}>Libellé du lien</a></li>`,
});

// ─── Mobile / Navigation - Liste de liens ────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=251-17076', {
  props: {
    category: figma.boolean('Catégorie', {
      true: `<h5 class="fr-mega-menu__category"><span class="fr-nav__link">Catégorie</span></h5>
  <ul class="fr-mega-menu__list">
    <li><a class="fr-nav__link" href="/premier">Premier lien</a></li>
    <li><a class="fr-nav__link" href="/deuxieme">Deuxième lien</a></li>
  </ul>`,
      false: `<ul class="fr-mega-menu__list">
    <li><a class="fr-nav__link" href="/premier">Premier lien</a></li>
  </ul>`,
    }),
  },
  example: ({ category }) =>
    html`<div class="fr-col-12 fr-col-lg-3">
  ${category}
</div>`,
});

// ─── Mobile / Items de niveau 1 - Lien direct ────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=251-17391', {
  props: {
    current: figma.enum('État', { Défaut: '', Courant: ' aria-current="page"' }),
  },
  example: ({ current }) =>
    html`<li class="fr-nav__item">
  <a class="fr-nav__link" href="/lien"${current}>Libellé du lien</a>
</li>`,
});

// ─── Mobile / Items de niveau 1 - Accès rapide ───────────────────────────────
// Les accès rapides (connexion, langue…) ne font pas partie de `fr-nav` : ils
// viennent du bloc `fr-header__tools-links`, dupliqué dans le menu mobile.
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=264-1263', {
  example: () =>
    html`<div class="fr-header__menu-links">
  <ul class="fr-btns-group">
    <li><a class="fr-btn fr-icon-lock-line fr-btn--tertiary" href="/connexion">Se connecter</a></li>
  </ul>
</div>`,
});

// ─── Mobile / Navigation - Complète ──────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=264-2355', {
  props: {
    quickAccess: figma.boolean('Accès rapides', {
      true: `\n  <div class="fr-header__menu-links">
    <ul class="fr-btns-group">
      <li><a class="fr-btn fr-icon-lock-line fr-btn--tertiary" href="/connexion">Se connecter</a></li>
    </ul>
  </div>`,
      false: '',
    }),
  },
  example: ({ quickAccess }) =>
    html`<div class="fr-header__menu fr-modal fr-modal--opened" id="header-menu">
  <div class="fr-container">
    <button type="button" class="fr-btn--close fr-btn" aria-controls="header-menu">Fermer</button>${quickAccess}
    <nav class="fr-nav" id="header-navigation" role="navigation" aria-label="Menu principal">
      <ul class="fr-nav__list">
        <li class="fr-nav__item"><a class="fr-nav__link" href="/premier">Premier lien</a></li>
        <li class="fr-nav__item"><a class="fr-nav__link" href="/deuxieme">Deuxième lien</a></li>
        <li class="fr-nav__item"><a class="fr-nav__link" href="/troisieme">Troisième lien</a></li>
      </ul>
    </nav>
  </div>
</div>`,
});
