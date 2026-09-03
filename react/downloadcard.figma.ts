import figma, { html } from '@figma/code-connect/html';

// Carte de téléchargement DSFR : 8 sets (Desktop/Mobile × MD/SM × Avec/Sans média),
// thème clair uniquement. Desktop et Mobile ne diffèrent que par Focus et le nombre
// d'états pseudo-CSS : même snippet. Les composants « ⚙️ » (Contenu, Corps, Zone de
// précision, Zone d'action, Média) sont des atomes internes → non connectés.
// Thème sombre = CSS seul. Focus, Survol, Cliqué = pseudo-états → ignorés.
// react-dsfr <Card> n'a pas de mode « téléchargement » dédié (contrairement à
// `[download]="true"` sur `dsfr-card`) : approximé avec `linkProps={{ href, download:
// true }}` + `enlargeLink` (carte entièrement cliquable) et `detail` pour afficher le
// type/poids du fichier, solution à valider par le dev.
// « Désactivé » n'a pas non plus de prop dédiée sur <Card> (contrairement à
// `dsfr-card` et à `<Tile>` qui expose bien `disabled`) : approximé via
// `nativeDivProps={{ "aria-disabled": true }}`, sans le traitement visuel complet
// (à compléter par CSS côté dev si besoin).

const imports = ["import { Card } from '@codegouvfr/react-dsfr/Card'"];

// ─── Desktop / MD / Sans média ───────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506467', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  nativeDivProps={{ "aria-disabled": true }}', false: '' }) },
  example: ({ disabled }) =>
    html`<Card
  title="Nom du fichier"
  detail="PDF, 518 Ko"
  enlargeLink
  linkProps={{ href: '/assets/fichier.pdf', download: true }}${disabled} />`,
  imports,
});

// ─── Desktop / SM / Sans média ───────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506480', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  nativeDivProps={{ "aria-disabled": true }}', false: '' }) },
  example: ({ disabled }) =>
    html`<Card
  title="Nom du fichier"
  detail="PDF, 518 Ko"
  size="small"
  enlargeLink
  linkProps={{ href: '/assets/fichier.pdf', download: true }}${disabled} />`,
  imports,
});

// ─── Desktop / MD / Avec média ───────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506493', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  nativeDivProps={{ "aria-disabled": true }}', false: '' }) },
  example: ({ disabled }) =>
    html`<Card
  title="Nom du fichier"
  detail="PDF, 518 Ko"
  imageUrl="/assets/img/card.jpg"
  imageAlt=""
  enlargeLink
  linkProps={{ href: '/assets/fichier.pdf', download: true }}${disabled} />`,
  imports,
});

// ─── Desktop / SM / Avec média ───────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506511', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  nativeDivProps={{ "aria-disabled": true }}', false: '' }) },
  example: ({ disabled }) =>
    html`<Card
  title="Nom du fichier"
  detail="PDF, 518 Ko"
  imageUrl="/assets/img/card.jpg"
  imageAlt=""
  size="small"
  enlargeLink
  linkProps={{ href: '/assets/fichier.pdf', download: true }}${disabled} />`,
  imports,
});

// ─── Mobile / SM / Sans média ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506618', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  nativeDivProps={{ "aria-disabled": true }}', false: '' }) },
  example: ({ disabled }) =>
    html`<Card
  title="Nom du fichier"
  detail="PDF, 518 Ko"
  size="small"
  enlargeLink
  linkProps={{ href: '/assets/fichier.pdf', download: true }}${disabled} />`,
  imports,
});

// ─── Mobile / SM / Avec média ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506625', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  nativeDivProps={{ "aria-disabled": true }}', false: '' }) },
  example: ({ disabled }) =>
    html`<Card
  title="Nom du fichier"
  detail="PDF, 518 Ko"
  imageUrl="/assets/img/card.jpg"
  imageAlt=""
  size="small"
  enlargeLink
  linkProps={{ href: '/assets/fichier.pdf', download: true }}${disabled} />`,
  imports,
});

// ─── Mobile / MD / Sans média ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506635', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  nativeDivProps={{ "aria-disabled": true }}', false: '' }) },
  example: ({ disabled }) =>
    html`<Card
  title="Nom du fichier"
  detail="PDF, 518 Ko"
  enlargeLink
  linkProps={{ href: '/assets/fichier.pdf', download: true }}${disabled} />`,
  imports,
});

// ─── Mobile / MD / Avec média ────────────────────────────────────────────────
figma.connect('https://www.figma.com/design/oTfPRLw3QjAoW3dDIS4MuN/DSFR---v1.15.0---Composants?node-id=20953-506642', {
  props: { disabled: figma.boolean('Désactivé', { true: '\n  nativeDivProps={{ "aria-disabled": true }}', false: '' }) },
  example: ({ disabled }) =>
    html`<Card
  title="Nom du fichier"
  detail="PDF, 518 Ko"
  imageUrl="/assets/img/card.jpg"
  imageAlt=""
  enlargeLink
  linkProps={{ href: '/assets/fichier.pdf', download: true }}${disabled} />`,
  imports,
});
