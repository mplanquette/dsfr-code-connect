// Contrôles de qualité appliqués à chaque snippet rendu.

const FORBIDDEN = [/\bundefined\b/, /\[object Object\]/, /\bNaN\b/, /\[ERROR\]/]

// Éléments HTML sans balise fermante.
const VOID_ELEMENTS = new Set(['area', 'br', 'col', 'hr', 'img', 'input', 'link', 'meta', 'source', 'wbr'])

// Balise ouvrante/fermante ; les valeurs d'attribut entre guillemets ou entre accolades (JSX,
// jusqu'à deux niveaux) peuvent contenir `>` (ex. `=>` dans `onClose={() => {}}`).
const TAG = /<(\/?)([A-Za-z][\w:.-]*)((?:"[^"]*"|'[^']*'|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}|[^'">{])*?)(\/?)>/g

/**
 * Détecte les valeurs parasites qui trahissent un template fautif (propriété non résolue...).
 * @returns {string[]} messages d'erreur (vide si le snippet est sain)
 */
export function findForbiddenTokens(snippet) {
  return FORBIDDEN.filter((pattern) => pattern.test(snippet)).map((pattern) => `le snippet contient ${pattern.source.replace(/\\b|\\/g, '')}`)
}

/**
 * Vérifie que les balises sont équilibrées (HTML, composants Angular/Vue, JSX). Les commentaires
 * HTML sont ignorés.
 * @returns {string[]} messages d'erreur (vide si le balisage est cohérent)
 */
export function findMarkupErrors(snippet) {
  const stack = []
  const errors = []
  for (const match of snippet.replace(/<!--[\s\S]*?-->/g, '').matchAll(TAG)) {
    const [, closing, name, , selfClosing] = match
    if (selfClosing || VOID_ELEMENTS.has(name.toLowerCase())) continue
    if (!closing) {
      stack.push(name)
    } else if (stack.at(-1) === name) {
      stack.pop()
    } else {
      errors.push(`balise </${name}> inattendue (ouverte : ${stack.at(-1) ?? 'aucune'})`)
    }
  }
  for (const name of stack) errors.push(`balise <${name}> non refermée`)
  return errors
}
