import figma, { html } from '@figma/code-connect/html';

// Lettre d'information et réseaux sociaux DSFR : 4 sets, thème clair uniquement
// (Desktop/Mobile responsive, même markup). « Newsletter Aucun » est approximé par
// le rendu le plus proche (réseaux sociaux seuls) : le markup DSFR ne modélise pas
// indépendamment les 6 combinaisons de « Newsletter »×« Liens réseaux ».

const socialLinks = `<li><a class="fr-btn--facebook fr-btn" href="https://www.facebook.com" title="facebook - nouvelle fenêtre">Facebook</a></li>
      <li><a class="fr-btn--twitter-x fr-btn" href="https://twitter.com" title="twitter-x - nouvelle fenêtre">X</a></li>
      <li><a class="fr-btn--linkedin fr-btn" href="https://www.linkedin.com" title="linkedin - nouvelle fenêtre">LinkedIn</a></li>`;

// ─── Desktop ─────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_LETTRE_D_INFORMATION_ET_RESEAUX_SOCIAUX__DESKTOP>', {
  props: {
    description: figma.boolean('Description', {
      true: `\n        <p class="fr-text--sm">Texte de description.</p>`,
      false: '',
    }),
    content: figma.enum('Newsletter', {
      Formulaire: `<div class="fr-follow__newsletter">
      <div>
        <p class="fr-h5">S'abonner à notre lettre d'information</p>
      </div>
      <div>
        <div class="fr-input-group">
          <label class="fr-label" for="newsletter-email">Votre adresse mail</label>
          <input class="fr-input" type="email" id="newsletter-email" name="newsletter-email" />
        </div>
        <button type="button" class="fr-btn">S'abonner</button>
        <p class="fr-hint-text">Vous pouvez vous désabonner à tout moment.</p>
      </div>
    </div>`,
      'Bouton seul': `<div class="fr-follow__newsletter">
      <div>
        <p class="fr-h5">S'abonner à notre lettre d'information</p>
      </div>
      <div>
        <ul class="fr-btns-group fr-btns-group--inline-md">
          <li><button type="button" class="fr-btn">S'abonner</button></li>
        </ul>
      </div>
    </div>`,
      Aucun: `<div class="fr-follow__social">
      <p class="fr-h5">Nous suivre</p>
      <ul class="fr-btns-group">
        ${socialLinks}
      </ul>
    </div>`,
    }),
  },
  example: ({ content }) =>
    html`<div class="fr-follow">
  <div class="fr-container">
    <div class="fr-grid-row">
      ${content}
    </div>
  </div>
</div>`,
});

// ─── Mobile ──────────────────────────────────────────────────────────────────
figma.connect('<FIGMA_LETTRE_D_INFORMATION_ET_RESEAUX_SOCIAUX__MOBILE>', {
  props: {
    content: figma.enum('Newsletter', {
      Aucun: `<div class="fr-follow__social">
      <p class="fr-h5">Nous suivre</p>
      <ul class="fr-btns-group">
        ${socialLinks}
      </ul>
    </div>`,
      'Bouton seul': `<div class="fr-follow__newsletter">
      <div>
        <p class="fr-h5">S'abonner à notre lettre d'information</p>
      </div>
      <div>
        <ul class="fr-btns-group fr-btns-group--inline-md">
          <li><button type="button" class="fr-btn">S'abonner</button></li>
        </ul>
      </div>
    </div>`,
      Formulaire: `<div class="fr-follow__newsletter">
      <div>
        <p class="fr-h5">S'abonner à notre lettre d'information</p>
      </div>
      <div>
        <div class="fr-input-group">
          <label class="fr-label" for="newsletter-email">Votre adresse mail</label>
          <input class="fr-input" type="email" id="newsletter-email" name="newsletter-email" />
        </div>
        <button type="button" class="fr-btn">S'abonner</button>
        <p class="fr-hint-text">Vous pouvez vous désabonner à tout moment.</p>
      </div>
    </div>`,
    }),
  },
  example: ({ content }) =>
    html`<div class="fr-follow">
  <div class="fr-container">
    <div class="fr-grid-row">
      ${content}
    </div>
  </div>
</div>`,
});

// ─── Formulaire (élément desktop) ─────────────────────────────────────────────
figma.connect('<FIGMA_LETTRE_D_INFORMATION_ET_RESEAUX_SOCIAUX__ELEMENT_FORMULAIRE_DESKTOP>', {
  props: {
    stateClass: figma.enum('Etat', {
      Default: '', Valide: ' fr-input-group--valid', Erreur: ' fr-input-group--error',
    }),
    message: figma.enum('Etat', {
      Default: '',
      Valide: `\n  <p class="fr-message fr-message--valid">Texte de validation</p>`,
      Erreur: `\n  <p class="fr-message fr-message--error">Texte d'erreur</p>`,
    }),
  },
  example: ({ stateClass, message }) =>
    html`<div class="fr-input-group${stateClass}">
  <label class="fr-label" for="newsletter-email">Adresse email</label>
  <input class="fr-input" type="email" id="newsletter-email" name="newsletter-email" />${message}
</div>`,
});

// ─── Formulaire (élément mobile) ──────────────────────────────────────────────
figma.connect('<FIGMA_LETTRE_D_INFORMATION_ET_RESEAUX_SOCIAUX__ELEMENT_FORMULAIRE_MOBILE>', {
  props: {
    stateClass: figma.enum('Etat', {
      Default: '', Valide: ' fr-input-group--valid', Erreur: ' fr-input-group--error',
    }),
    message: figma.enum('Etat', {
      Default: '',
      Valide: `\n  <p class="fr-message fr-message--valid">Texte de validation</p>`,
      Erreur: `\n  <p class="fr-message fr-message--error">Texte d'erreur</p>`,
    }),
  },
  example: ({ stateClass, message }) =>
    html`<div class="fr-input-group${stateClass}">
  <label class="fr-label" for="newsletter-email">Adresse email</label>
  <input class="fr-input" type="email" id="newsletter-email" name="newsletter-email" />${message}
</div>`,
});
