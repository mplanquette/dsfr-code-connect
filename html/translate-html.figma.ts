import figma, { html } from '@figma/code-connect/html';

// Sélecteur de langue DSFR : 2 sets (Desktop, Mobile). Thème = CSS seul.
// « État Ouvert / Fermé » est piloté par le JS du DSFR (fr-collapse) : le markup est
// identique, seul aria-expanded change au runtime. Le rendu Mobile est responsive.

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_SELECTEUR_DE_LANGUE__SELECTEUR_DE_LANGUE_DESKTOP>', {
  props: {
    lang: figma.string('Langue'),
    outlineClass: figma.enum('Encadré', {
      True: ' fr-btn fr-btn--tertiary',
      False: ' fr-btn--tertiary-no-outline',
    }),
  },
  example: ({ lang, outlineClass }) =>
    html`<div class="fr-translate fr-nav">
  <div class="fr-nav__item">
    <button type="button" class="fr-translate__btn${outlineClass}" aria-controls="translate-menu" aria-expanded="false" title="Sélectionner une langue">
      ${lang}<span class="fr-hidden-lg">&nbsp;- Français</span>
    </button>
    <div class="fr-collapse fr-translate__menu fr-menu" id="translate-menu">
      <ul class="fr-menu__list">
        <li><a class="fr-translate__language fr-nav__link" hreflang="fr" lang="fr" href="#" aria-current="true">FR&nbsp;- Français</a></li>
        <li><a class="fr-translate__language fr-nav__link" hreflang="en" lang="en" href="#">EN&nbsp;- English</a></li>
        <li><a class="fr-translate__language fr-nav__link" hreflang="es" lang="es" href="#">ES&nbsp;- Español</a></li>
      </ul>
    </div>
  </div>
</div>`,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_SELECTEUR_DE_LANGUE__SELECTEUR_DE_LANGUE_MOBILE>', {
  props: {
    lang: figma.string('Langue'),
  },
  example: ({ lang }) =>
    html`<div class="fr-translate fr-nav">
  <div class="fr-nav__item">
    <button type="button" class="fr-translate__btn fr-btn fr-btn--tertiary" aria-controls="translate-menu" aria-expanded="false" title="Sélectionner une langue">
      ${lang}<span class="fr-hidden-lg">&nbsp;- Français</span>
    </button>
    <div class="fr-collapse fr-translate__menu fr-menu" id="translate-menu">
      <ul class="fr-menu__list">
        <li><a class="fr-translate__language fr-nav__link" hreflang="fr" lang="fr" href="#" aria-current="true">FR&nbsp;- Français</a></li>
        <li><a class="fr-translate__language fr-nav__link" hreflang="en" lang="en" href="#">EN&nbsp;- English</a></li>
      </ul>
    </div>
  </div>
</div>`,
});
