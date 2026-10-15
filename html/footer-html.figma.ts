import figma, { html } from '@figma/code-connect/html';

// Pied de page DSFR : 2 sets (Desktop, Mobile), thème clair uniquement, markup
// responsive unique. Les composants préfixés « 🚫Éléments » (Liste de liens, Logo
// partenaire, Partenaires, Liens, Mentions, Bloc marque) sont des atomes internes →
// non connectés. Thème sombre = CSS seul.

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_PIED_DE_PAGE__DESKTOP_PIED_DE_PAGE>', {
  props: {
    reboundLinks: figma.boolean('Liens', {
      true: `\n    <div class="fr-footer__top">
      <div class="fr-grid-row fr-grid-row--start fr-grid-row--gutters">
        <div class="fr-col-6 fr-col-sm-3 fr-col-md-2">
          <h3 class="fr-footer__top-cat">Liens de réorientation</h3>
          <ul class="fr-footer__top-list">
            <li><a class="fr-footer__top-link" href="/premier">Premier lien</a></li>
            <li><a class="fr-footer__top-link" href="/deuxieme">Deuxième lien</a></li>
          </ul>
        </div>
      </div>
    </div>`,
      false: '',
    }),
    partners: figma.boolean('Partenaires', {
      true: `\n    <div class="fr-footer__partners">
      <h4 class="fr-footer__partners-title">Nos partenaires</h4>
      <div class="fr-footer__partners-logos">
        <div class="fr-footer__partners-main">
          <a class="fr-footer__partners-link" href="#" title="Partenaire">
            <img class="fr-footer__partners-img" src="assets/img/partner.png" alt="Partenaire" />
          </a>
        </div>
      </div>
    </div>`,
      false: '',
    }),
  },
  example: ({ reboundLinks, partners }) =>
    html`<footer class="fr-footer" role="contentinfo">
  <div class="fr-container">${reboundLinks}${partners}
    <div class="fr-footer__body">
      <div class="fr-footer__brand fr-enlarge-link">
        <p class="fr-logo">République<br />Française</p>
      </div>
      <div class="fr-footer__content">
        <ul class="fr-footer__content-list">
          <li class="fr-footer__content-item">
            <a class="fr-footer__content-link" href="https://legifrance.gouv.fr" target="_blank" rel="noopener external">legifrance.gouv.fr</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="fr-footer__bottom">
      <ul class="fr-footer__bottom-list">
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/accessibilite">Accessibilité : non conforme</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/mentions-legales">Mentions légales</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/donnees-personnelles">Données personnelles</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/cookies">Gestion des cookies</a></li>
      </ul>
      <div class="fr-footer__bottom-copy">
        <p>
          Sauf mention contraire, tous les contenus de ce site sont sous
          <a href="https://etalab.gouv.fr" target="_blank" rel="noopener external">licence etalab-2.0</a>
        </p>
      </div>
    </div>
  </div>
</footer>`,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_PIED_DE_PAGE__MOBILE_PIED_DE_PAGE>', {
  props: {
    reboundLinks: figma.boolean('Liens', {
      true: `\n    <div class="fr-footer__top">
      <div class="fr-grid-row fr-grid-row--start fr-grid-row--gutters">
        <div class="fr-col-6 fr-col-sm-3 fr-col-md-2">
          <h3 class="fr-footer__top-cat">Liens de réorientation</h3>
          <ul class="fr-footer__top-list">
            <li><a class="fr-footer__top-link" href="/premier">Premier lien</a></li>
            <li><a class="fr-footer__top-link" href="/deuxieme">Deuxième lien</a></li>
          </ul>
        </div>
      </div>
    </div>`,
      false: '',
    }),
    partners: figma.boolean('Partenaires', {
      true: `\n    <div class="fr-footer__partners">
      <h4 class="fr-footer__partners-title">Nos partenaires</h4>
      <div class="fr-footer__partners-logos">
        <div class="fr-footer__partners-main">
          <a class="fr-footer__partners-link" href="#" title="Partenaire">
            <img class="fr-footer__partners-img" src="assets/img/partner.png" alt="Partenaire" />
          </a>
        </div>
      </div>
    </div>`,
      false: '',
    }),
  },
  example: ({ reboundLinks, partners }) =>
    html`<footer class="fr-footer" role="contentinfo">
  <div class="fr-container">${reboundLinks}${partners}
    <div class="fr-footer__body">
      <div class="fr-footer__brand fr-enlarge-link">
        <p class="fr-logo">République<br />Française</p>
      </div>
      <div class="fr-footer__content">
        <ul class="fr-footer__content-list">
          <li class="fr-footer__content-item">
            <a class="fr-footer__content-link" href="https://legifrance.gouv.fr" target="_blank" rel="noopener external">legifrance.gouv.fr</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="fr-footer__bottom">
      <ul class="fr-footer__bottom-list">
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/accessibilite">Accessibilité : non conforme</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/mentions-legales">Mentions légales</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/donnees-personnelles">Données personnelles</a></li>
        <li class="fr-footer__bottom-item"><a class="fr-footer__bottom-link" href="/cookies">Gestion des cookies</a></li>
      </ul>
      <div class="fr-footer__bottom-copy">
        <p>
          Sauf mention contraire, tous les contenus de ce site sont sous
          <a href="https://etalab.gouv.fr" target="_blank" rel="noopener external">licence etalab-2.0</a>
        </p>
      </div>
    </div>
  </div>
</footer>`,
});
