// Sélection du rendu selon la stack publiée.
//
// Chaque famille lit le design une seule fois, puis fournit une fonction de rendu par stack.
// `stack` est ajouté à chaque entrée de lot par scripts/catalog.mjs (le CLI publie un label à la
// fois, le template ne le connaît pas autrement).

export type Stack = 'angular' | 'html' | 'react' | 'vue'

/** Ce qu'une stack ajoute à l'export du template : le snippet et, si besoin, ses imports. */
export interface Rendered {
  example: unknown
  imports?: string[]
}

/**
 * Exécute uniquement le rendu de la stack demandée : les lectures propres à une stack ne sont
 * donc jamais faites pour les autres.
 */
export function renderFor(stack: string, renderers: Record<Stack, () => Rendered>): Rendered {
  const render = renderers[stack as Stack]
  if (!render) throw new Error(`Stack inconnue dans le lot : ${stack}`)
  return render()
}
