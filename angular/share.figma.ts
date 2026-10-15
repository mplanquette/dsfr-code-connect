import figma, { html } from '@figma/code-connect/html';

// Partage DSFR : 1 set. Thème = CSS seul.
// « Désactivé » traduit l'absence de consentement aux cookies tiers : les liens
// réseaux sociaux sont désactivés, le lien mail et la copie restent actifs.
// Les URL de partage passent par des propriétés du composant : le parser HTML rejette
// les esperluettes non échappées dans un attribut.
// L'interpolation ne peut pas être collée au nom du tag (`<dsfr-share${...}`) : le parser
// a besoin d'un attribut statique avant elle.

figma.connect('<FIGMA_PARTAGE__PARTAGE>', {
  props: {
    consent: figma.enum('Désactivé', {
      True: ' [hasCookiePermissions]="false"',
      False: ' [hasCookiePermissions]="true"',
    }),
  },
  example: ({ consent }) =>
    html`<dsfr-share consentManagerRoute="/gestion-des-cookies"${consent}>
  <dsfr-share-link name="facebook" [link]="facebookShareUrl"></dsfr-share-link>
  <dsfr-share-link name="twitter-x" [link]="twitterShareUrl"></dsfr-share-link>
  <dsfr-share-link name="linkedin" [link]="linkedinShareUrl"></dsfr-share-link>
  <dsfr-share-link name="mail" [link]="mailShareUrl"></dsfr-share-link>
</dsfr-share>`,
  imports: ["import { DsfrShareComponent, DsfrShareLinkComponent } from '@edugouvfr/ngx-dsfr'"],
});
