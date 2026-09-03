import figma, { html } from '@figma/code-connect/html';

// Partage DSFR : 1 set. Thème = CSS seul. Contrairement à React (markup brut), vue-dsfr expose
// un vrai composant dédié `DsfrShare` (props `title`, `mail`, `networks`) → utilisé ici.
// « Désactivé » (absence de consentement aux cookies tiers) n'a pas d'équivalent prop direct dans
// `DsfrShare` (pas de `hasCookiePermissions`) : on approxime en vidant `networks` (les réseaux
// sociaux tiers disparaissent), le bouton mail et le bouton copie restant natifs au composant.
// Les URL de partage passent par des identifiants de propriétés (facebookShareUrl, etc.) supposés
// définis côté application hôte, comme pour `share.figma.ts` (Angular) : évite les esperluettes
// non échappées dans un attribut littéral.

figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=3539-191215', {
  props: {
    networks: figma.enum('Désactivé', {
      True: ' :networks="[]"',
      False: ` :networks="[
    { name: 'facebook', label: 'Partager sur Facebook', url: facebookShareUrl },
    { name: 'twitter-x', label: 'Partager sur X', url: twitterShareUrl },
    { name: 'linkedin', label: 'Partager sur LinkedIn', url: linkedinShareUrl }
  ]"`,
    }),
  },
  example: ({ networks }) =>
    html`<DsfrShare title="Partager la page"${networks} :mail="{ label: 'Partager par mail', to: 'mailto:contact@exemple.fr' }" />`,
  imports: ["import DsfrShare from '@gouvminint/vue-dsfr/DsfrShare.vue'"],
});
