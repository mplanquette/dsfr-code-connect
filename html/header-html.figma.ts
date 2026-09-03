import figma, { html } from '@figma/code-connect/html';

// En-tête DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, markup responsive
// unique. Les composants « Éléments » (Exemple de logo, Fonctionnel droite, Bloc
// marque) sont des atomes internes → non connectés. « Recherche ouverte » (Mobile)
// est un état transitoire d'interaction → non connecté. Thème sombre = CSS seul.

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=148-52', {
  props: {
    service: figma.boolean('Nom du site', {
      true: `\n        <div class="fr-header__service">
          <a href="/" title="Accueil - Nom du site / de l'organisme">
            <p class="fr-header__service-title">Nom du site / de l'organisme</p>
          </a>
        </div>`,
      false: '',
    }),
    search: figma.boolean('Fonctionnel droite', {
      true: `<button type="button" class="fr-btn--search fr-btn" data-fr-opened="false" aria-controls="header-search" id="header-search-button" title="Rechercher">Rechercher</button>\n              `,
      false: '',
    }),
  },
  example: ({ service, search }) =>
    html`<header role="banner" class="fr-header">
  <div class="fr-header__body">
    <div class="fr-container">
      <div class="fr-header__body-row">
        <div class="fr-header__brand fr-enlarge-link">
          <div class="fr-header__brand-top">
            <div class="fr-header__logo">
              <p class="fr-logo">République<br />Française</p>
            </div>
            <div class="fr-header__navbar">
              ${search}<button type="button" class="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="header-menu" id="header-menu-button" title="Menu">Menu</button>
            </div>
          </div>${service}
        </div>
      </div>
    </div>
  </div>
  <div class="fr-header__menu fr-modal" id="header-menu" aria-labelledby="header-menu-button">
    <div class="fr-container">
      <nav class="fr-nav" id="header-navigation" role="navigation" aria-label="Menu principal">
        <ul class="fr-nav__list">
          <li class="fr-nav__item"><a class="fr-nav__link" href="/premier">Premier lien</a></li>
          <li class="fr-nav__item"><a class="fr-nav__link" href="/deuxieme">Deuxième lien</a></li>
        </ul>
      </nav>
    </div>
  </div>
</header>`,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=153-159413', {
  props: {
    service: figma.boolean('Nom du site', {
      true: `\n        <div class="fr-header__service">
          <a href="/" title="Accueil - Nom du site / de l'organisme">
            <p class="fr-header__service-title">Nom du site / de l'organisme</p>
          </a>
        </div>`,
      false: '',
    }),
    search: figma.boolean('Recherche', {
      true: `<button type="button" class="fr-btn--search fr-btn" data-fr-opened="false" aria-controls="header-search" id="header-search-button" title="Rechercher">Rechercher</button>\n              `,
      false: '',
    }),
  },
  example: ({ service, search }) =>
    html`<header role="banner" class="fr-header">
  <div class="fr-header__body">
    <div class="fr-container">
      <div class="fr-header__body-row">
        <div class="fr-header__brand fr-enlarge-link">
          <div class="fr-header__brand-top">
            <div class="fr-header__logo">
              <p class="fr-logo">République<br />Française</p>
            </div>
            <div class="fr-header__navbar">
              ${search}<button type="button" class="fr-btn--menu fr-btn" data-fr-opened="false" aria-controls="header-menu" id="header-menu-button" title="Menu">Menu</button>
            </div>
          </div>${service}
        </div>
      </div>
    </div>
  </div>
  <div class="fr-header__menu fr-modal" id="header-menu" aria-labelledby="header-menu-button">
    <div class="fr-container">
      <nav class="fr-nav" id="header-navigation" role="navigation" aria-label="Menu principal">
        <ul class="fr-nav__list">
          <li class="fr-nav__item"><a class="fr-nav__link" href="/premier">Premier lien</a></li>
          <li class="fr-nav__item"><a class="fr-nav__link" href="/deuxieme">Deuxième lien</a></li>
        </ul>
      </nav>
    </div>
  </div>
</header>`,
});
