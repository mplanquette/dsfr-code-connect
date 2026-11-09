// Lettre d'information et réseaux sociaux DSFR : sets Desktop et Mobile (`layout`, lu dans
// follow.json), thème clair uniquement. Le DSFR est responsive : même snippet des deux côtés, à
// deux écarts historiques près (cf. Vue ci-dessous). « Liens réseaux » n'est pas lue.
// « Newsletter Aucun » est approximé par le type le plus proche : l'API ne modélise pas
// indépendamment les 6 combinaisons de « Newsletter »×« Liens réseaux ».
//   - Angular : `DsfrFollowType` « networks » (Aucun), « newsletter » (Bouton seul),
//     « newsletter-mail » (Formulaire) ; « Description » → attribut `description`.
//   - HTML : réseaux sociaux seuls (Aucun). « Description » n'est pas rendue dans le markup.
//   - React : « Description » n'est pas bindable en tant que prop indépendante côté react-dsfr :
//     `<Follow>` ne porte le texte de description que niché dans `newsletter.desc`, affiché tel
//     quel dans les branches Newsletter ≠ Aucun, non piloté par le toggle Figma. « Aucun » omet
//     la prop `newsletter` (seul `social` est fourni). `newsletter` et `social` sont déclarés en
//     `const` avant le JSX puis référencés par leur identifiant.
//   - Vue : DsfrFollow n'a pas de prop `type` façon ngx-dsfr : la lettre d'info se pilote via
//     `newsletter-data` (objet `DsfrNewsLetterProps`, avec `onlyCallout` pour « Bouton seul ») et
//     les réseaux via `networks`. « Aucun » = absence de `newsletter-data`. Le set Desktop ajoute
//     `description: 'Texte de description.'` à `newsletter-data`, le set Mobile non.
import figma from 'figma'
import { readEnum } from '../_shared/read'
import { renderFor } from '../_shared/stack'

const instance = figma.selectedInstance
const { stack, layout } = figma.batch as { stack: string; layout: 'desktop' | 'mobile' }

const newsletter = readEnum(instance, 'Newsletter', { Formulaire: 'form', 'Bouton seul': 'button', Aucun: 'none' } as const)

const rendered = renderFor(stack, {
  angular: () => {
    const type = { form: ' type="newsletter-mail"', button: ' type="newsletter"', none: ' type="networks"' }[newsletter]
    const description = instance.getBoolean('Description') ? ' description="Texte de description."' : ''
    return {
      imports: ["import { DsfrFollowComponent, DsfrFollowLinkComponent } from '@edugouvfr/ngx-dsfr'"],
      example: figma.code`<dsfr-follow id="follow"${type}${description}>
  <dsfr-follow-link name="facebook" link="https://www.facebook.com"></dsfr-follow-link>
  <dsfr-follow-link name="twitter-x" link="https://twitter.com"></dsfr-follow-link>
  <dsfr-follow-link name="linkedin" link="https://www.linkedin.com"></dsfr-follow-link>
</dsfr-follow>`,
    }
  },
  html: () => {
    // Mêmes réseaux que les portages ; chaque lien s'ouvre dans un nouvel onglet, signalé dans le title.
    const social = `<div class="fr-follow__social">
      <p class="fr-h5">Nous suivre</p>
      <ul class="fr-btns-group">
        <li><a class="fr-btn--facebook fr-btn" title="Facebook - nouvelle fenêtre" href="https://www.facebook.com" target="_blank" rel="noopener">Facebook</a></li>
        <li><a class="fr-btn--twitter-x fr-btn" title="X - nouvelle fenêtre" href="https://twitter.com" target="_blank" rel="noopener">X</a></li>
        <li><a class="fr-btn--linkedin fr-btn" title="LinkedIn - nouvelle fenêtre" href="https://www.linkedin.com" target="_blank" rel="noopener">LinkedIn</a></li>
      </ul>
    </div>`
    const content = {
      form: `<div class="fr-follow__newsletter">
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
      button: `<div class="fr-follow__newsletter">
      <div>
        <p class="fr-h5">S'abonner à notre lettre d'information</p>
      </div>
      <div>
        <ul class="fr-btns-group fr-btns-group--inline-md">
          <li><button type="button" class="fr-btn">S'abonner</button></li>
        </ul>
      </div>
    </div>`,
      none: social,
    }[newsletter]
    return {
      example: figma.code`<div class="fr-follow">
  <div class="fr-container">
    <div class="fr-grid-row">
      ${content}
    </div>
  </div>
</div>`,
    }
  },
  react: () => {
    const declaration = {
      form: `const newsletter = {
  desc: 'Texte de description.',
  buttonProps: { type: 'submit', children: "S'abonner" },
  form: {
    formComponent: ({ children }) => <form action="/abonnement">{children}</form>,
    success: false
  }
};
`,
      button: `const newsletter = {
  desc: 'Texte de description.',
  buttonProps: { linkProps: { href: '/abonnement' }, children: "S'abonner" }
};
`,
      none: '',
    }[newsletter]
    const attribute = newsletter === 'none' ? '' : '\n  newsletter={newsletter}'
    return {
      imports: ["import { Follow } from '@codegouvfr/react-dsfr/Follow'"],
      example: figma.code`${declaration}const social = {
  buttons: [
    { type: 'facebook', linkProps: { href: 'https://www.facebook.com' } },
    { type: 'twitter-x', linkProps: { href: 'https://twitter.com' } },
    { type: 'linkedin', linkProps: { href: 'https://www.linkedin.com' } }
  ]
};

<Follow id="follow"${attribute}
  social={social} />`,
    }
  },
  vue: () => {
    const title = `S\\'abonner à notre lettre d\\'information`
    const description = layout === 'desktop' ? `, description: 'Texte de description.'` : ''
    const newsletterData = {
      form: ` :newsletter-data="{ title: '${title}'${description} }"`,
      button: ` :newsletter-data="{ title: '${title}'${description}, onlyCallout: true }"`,
      none: '',
    }[newsletter]
    return {
      imports: ["import DsfrFollow from '@gouvminint/vue-dsfr/DsfrFollow.vue'"],
      example: figma.code`<DsfrFollow id="follow"${newsletterData}
    :networks="[
      { type: 'facebook', name: 'Facebook', href: 'https://www.facebook.com' },
      { type: 'twitter-x', name: 'X', href: 'https://twitter.com' },
      { type: 'linkedin', name: 'LinkedIn', href: 'https://www.linkedin.com' }
    ]"
  />`,
    }
  },
})

export default {
  id: `follow-${layout}`,
  ...rendered,
  metadata: { nestable: true },
}
