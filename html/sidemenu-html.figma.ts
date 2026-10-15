import figma, { html } from '@figma/code-connect/html';

// Menu latéral DSFR : 9 sets utiles. Le set « _🚫Éléments - Base » est un atome
// interne Figma → non connecté. Thème = CSS seul. Survol = pseudo-état → ignoré.
// Les rendus Mobile et Desktop sont le même markup (responsive) : les sets Mobile
// reçoivent le même snippet que leur équivalent Desktop.

// ─── Desktop / Menu latéral - Complet ────────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__DESKTOP_MENU_LATERAL_COMPLET>', {
  props: {
    positionClass: figma.enum('Position', { Gauche: '', Droite: ' fr-sidemenu--right' }),
    title: figma.enum('Titre', {
      True: `\n      <p class="fr-sidemenu__title" id="sidemenu-title">Titre du menu</p>`,
      False: '',
    }),
    items: figma.enum('Éléments', {
      'Liens directs': `<li class="fr-sidemenu__item">
          <a class="fr-sidemenu__link" href="/premiere" target="_self">Première entrée</a>
        </li>
        <li class="fr-sidemenu__item">
          <a class="fr-sidemenu__link" href="/deuxieme" target="_self">Deuxième entrée</a>
        </li>`,
      Dépliants: `<li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn" aria-expanded="false" aria-controls="sidemenu-item-1">Première entrée</button>
          <div class="fr-collapse" id="sidemenu-item-1">
            <ul class="fr-sidemenu__list">
              <li class="fr-sidemenu__item">
                <a class="fr-sidemenu__link" href="/premiere/un" target="_self">Sous-entrée 1</a>
              </li>
            </ul>
          </div>
        </li>`,
    }),
  },
  example: ({ positionClass, title, items }) =>
    html`<nav class="fr-sidemenu${positionClass}" role="navigation" aria-labelledby="sidemenu-title">
  <div class="fr-sidemenu__inner">
    <button type="button" class="fr-sidemenu__btn" aria-controls="sidemenu" aria-expanded="false">Dans cette rubrique</button>
    <div class="fr-collapse" id="sidemenu">${title}
      <ul class="fr-sidemenu__list">
        ${items}
      </ul>
    </div>
  </div>
</nav>`,
});

// ─── Desktop / Lien direct - Item ────────────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__DESKTOP_LIEN_DIRECT_ITEM>', {
  props: {
    current: figma.enum('État', { Défaut: '', Survol: '', Courant: ' aria-current="page"' }),
  },
  example: ({ current }) =>
    html`<li class="fr-sidemenu__item"${current}>
  <a class="fr-sidemenu__link" href="/entree" target="_self">Libellé de l'entrée</a>
</li>`,
});

// ─── Desktop / Dépliant niveau 1 - Item ──────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__DESKTOP_DEPLIANT_NIVEAU_1_ITEM>', {
  props: {
    expanded: figma.enum('Ouvert', { True: 'true', False: 'false' }),
    collapseClass: figma.enum('Ouvert', { True: ' fr-collapse--expanded', False: '' }),
    current: figma.enum('État', { Défaut: '', Courant: ' fr-sidemenu__item--active' }),
  },
  example: ({ expanded, collapseClass, current }) =>
    html`<li class="fr-sidemenu__item${current}">
  <button class="fr-sidemenu__btn" aria-expanded="${expanded}" aria-controls="sidemenu-item-1">Libellé du dépliant</button>
  <div class="fr-collapse${collapseClass}" id="sidemenu-item-1">
    <ul class="fr-sidemenu__list">
      <li class="fr-sidemenu__item">
        <a class="fr-sidemenu__link" href="/entree/un" target="_self">Première sous-entrée</a>
      </li>
      <li class="fr-sidemenu__item">
        <a class="fr-sidemenu__link" href="/entree/deux" target="_self">Deuxième sous-entrée</a>
      </li>
    </ul>
  </div>
</li>`,
});

// ─── Desktop / Dépliant niveau 2 - Item ──────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__DESKTOP_DEPLIANT_NIVEAU_2_ITEM>', {
  props: {
    expanded: figma.enum('Ouvert', { True: 'true', False: 'false' }),
    collapseClass: figma.enum('Ouvert', { True: ' fr-collapse--expanded', False: '' }),
    current: figma.enum('État', { Défaut: '', Courant: ' fr-sidemenu__item--active' }),
  },
  example: ({ expanded, collapseClass, current }) =>
    html`<li class="fr-sidemenu__item${current}">
  <button class="fr-sidemenu__btn" aria-expanded="${expanded}" aria-controls="sidemenu-item-1-1">Dépliant de niveau 2</button>
  <div class="fr-collapse${collapseClass}" id="sidemenu-item-1-1">
    <ul class="fr-sidemenu__list">
      <li class="fr-sidemenu__item">
        <a class="fr-sidemenu__link" href="/entree/un/a" target="_self">Première sous-entrée</a>
      </li>
    </ul>
  </div>
</li>`,
});

// ─── Mobile / Menu latéral - Complet - Fermé ─────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__MOBILE_MENU_LATERAL_COMPLET_FERME>', {
  example: () =>
    html`<nav class="fr-sidemenu" role="navigation" aria-labelledby="sidemenu-title">
  <div class="fr-sidemenu__inner">
    <button type="button" class="fr-sidemenu__btn" aria-controls="sidemenu" aria-expanded="false">Dans cette rubrique</button>
    <div class="fr-collapse" id="sidemenu">
      <p class="fr-sidemenu__title" id="sidemenu-title">Titre du menu</p>
      <ul class="fr-sidemenu__list">
        <li class="fr-sidemenu__item">
          <a class="fr-sidemenu__link" href="/premiere" target="_self">Première entrée</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`,
});

// ─── Mobile / Menu latéral - Complet - Ouvert ────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__MOBILE_MENU_LATERAL_COMPLET_OUVERT>', {
  props: {
    title: figma.enum('Titre', {
      True: `\n      <p class="fr-sidemenu__title" id="sidemenu-title">Titre du menu</p>`,
      False: '',
    }),
    items: figma.enum('Éléments', {
      'Liens directs': `<li class="fr-sidemenu__item">
          <a class="fr-sidemenu__link" href="/premiere" target="_self">Première entrée</a>
        </li>
        <li class="fr-sidemenu__item">
          <a class="fr-sidemenu__link" href="/deuxieme" target="_self">Deuxième entrée</a>
        </li>`,
      Dépliants: `<li class="fr-sidemenu__item">
          <button class="fr-sidemenu__btn" aria-expanded="false" aria-controls="sidemenu-item-1">Première entrée</button>
          <div class="fr-collapse" id="sidemenu-item-1">
            <ul class="fr-sidemenu__list">
              <li class="fr-sidemenu__item">
                <a class="fr-sidemenu__link" href="/premiere/un" target="_self">Sous-entrée 1</a>
              </li>
            </ul>
          </div>
        </li>`,
    }),
  },
  example: ({ title, items }) =>
    html`<nav class="fr-sidemenu" role="navigation" aria-labelledby="sidemenu-title">
  <div class="fr-sidemenu__inner">
    <button type="button" class="fr-sidemenu__btn" aria-controls="sidemenu" aria-expanded="true">Dans cette rubrique</button>
    <div class="fr-collapse fr-collapse--expanded" id="sidemenu">${title}
      <ul class="fr-sidemenu__list">
        ${items}
      </ul>
    </div>
  </div>
</nav>`,
});

// ─── Mobile / Lien direct - Item ─────────────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__MOBILE_LIEN_DIRECT_ITEM>', {
  props: {
    current: figma.enum('Courant', { False: '', True: ' aria-current="page"' }),
  },
  example: ({ current }) =>
    html`<li class="fr-sidemenu__item"${current}>
  <a class="fr-sidemenu__link" href="/entree" target="_self">Libellé de l'entrée</a>
</li>`,
});

// ─── Mobile / Dépliant niveau 1 - Item ───────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__MOBILE_DEPLIANT_NIVEAU_1_ITEM>', {
  props: {
    expanded: figma.enum('Ouvert', { True: 'true', False: 'false' }),
    collapseClass: figma.enum('Ouvert', { True: ' fr-collapse--expanded', False: '' }),
    current: figma.enum('Courant', { False: '', True: ' fr-sidemenu__item--active' }),
  },
  example: ({ expanded, collapseClass, current }) =>
    html`<li class="fr-sidemenu__item${current}">
  <button class="fr-sidemenu__btn" aria-expanded="${expanded}" aria-controls="sidemenu-item-1">Libellé du dépliant</button>
  <div class="fr-collapse${collapseClass}" id="sidemenu-item-1">
    <ul class="fr-sidemenu__list">
      <li class="fr-sidemenu__item">
        <a class="fr-sidemenu__link" href="/entree/un" target="_self">Première sous-entrée</a>
      </li>
    </ul>
  </div>
</li>`,
});

// ─── Mobile / Dépliant niveau 2 - Item ───────────────────────────────────────
figma.connect('<FIGMA_MENU_LATERAL__MOBILE_DEPLIANT_NIVEAU_2_ITEM>', {
  props: {
    expanded: figma.enum('Ouvert', { True: 'true', False: 'false' }),
    collapseClass: figma.enum('Ouvert', { True: ' fr-collapse--expanded', False: '' }),
    current: figma.enum('Courant', { False: '', True: ' fr-sidemenu__item--active' }),
  },
  example: ({ expanded, collapseClass, current }) =>
    html`<li class="fr-sidemenu__item${current}">
  <button class="fr-sidemenu__btn" aria-expanded="${expanded}" aria-controls="sidemenu-item-1-1">Dépliant de niveau 2</button>
  <div class="fr-collapse${collapseClass}" id="sidemenu-item-1-1">
    <ul class="fr-sidemenu__list">
      <li class="fr-sidemenu__item">
        <a class="fr-sidemenu__link" href="/entree/un/a" target="_self">Première sous-entrée</a>
      </li>
    </ul>
  </div>
</li>`,
});
