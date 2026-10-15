import figma, { html } from '@figma/code-connect/html';

// Partage DSFR : 1 set. Thème = CSS seul.
// « Désactivé » traduit l'absence de consentement aux cookies tiers : les liens
// réseaux sociaux sont désactivés, le lien mail et la copie restent actifs.

figma.connect('<FIGMA_PARTAGE__PARTAGE>', {
  props: {
    disabled: figma.enum('Désactivé', { True: ' aria-disabled="true"', False: '' }),
    cookiesText: figma.enum('Désactivé', {
      True: `\n  <p class="fr-share__text">Pour partager sur les réseaux sociaux, vous devez accepter les cookies tiers.</p>`,
      False: '',
    }),
  },
  example: ({ disabled, cookiesText }) =>
    html`<div class="fr-share">
  <p class="fr-share__title">Partager la page</p>${cookiesText}
  <ul class="fr-btns-group">
    <li><a class="fr-share__link fr-share__link--facebook" title="Partager sur Facebook" href="#"${disabled}>Partager sur Facebook</a></li>
    <li><a class="fr-share__link fr-share__link--twitter-x" title="Partager sur X" href="#"${disabled}>Partager sur X</a></li>
    <li><a class="fr-share__link fr-share__link--linkedin" title="Partager sur LinkedIn" href="#"${disabled}>Partager sur LinkedIn</a></li>
    <li><a class="fr-share__link fr-share__link--mail" title="Partager par courriel" href="#">Partager par courriel</a></li>
    <li><button type="button" class="fr-share__link fr-share__link--copy" title="Copier dans le presse-papier">Copier dans le presse-papier</button></li>
  </ul>
</div>`,
});
