// Échappement des textes du design injectés dans le code généré.

/** Texte placé dans un attribut entre guillemets doubles (HTML, Angular, Vue, JSX). */
export function escapeAttribute(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

/** Texte placé dans une chaîne JavaScript entre apostrophes (tableaux d'actions, options...). */
export function escapeJsString(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

/** Texte placé entre deux balises (contenu d'un paragraphe, d'un titre...). */
export function escapeText(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
}
