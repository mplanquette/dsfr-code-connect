// Instantanés des snippets rendus, en texte lisible (relisible en PR).
//
// Format : un bloc par combinaison, introduit par une ligne `=== <stack> | <clé> | <combinaison>`
// puis le snippet tel que le verra le développeur. Régénérer avec `npm run test:update` après un
// changement volontaire, puis relire le diff.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const HEADER = '=== '

/** Sérialise une table `entrée -> snippet` (ordre d'insertion conservé). */
export function serializeSnapshot(entries) {
  return [...entries].map(([title, snippet]) => `${HEADER}${title}\n${snippet}\n`).join('\n')
}

/** Relit un fichier d'instantanés. @returns {Map<string, string>} */
export function parseSnapshot(text) {
  const entries = new Map()
  let title = null
  let lines = []
  const flush = () => {
    if (title !== null) entries.set(title, lines.join('\n').replace(/\n+$/, ''))
  }
  for (const line of text.split('\n')) {
    if (line.startsWith(HEADER)) {
      flush()
      title = line.slice(HEADER.length)
      lines = []
    } else {
      lines.push(line)
    }
  }
  flush()
  return entries
}

/**
 * Compare les instantanés calculés au fichier de référence.
 * @returns {{ updated: boolean, differences: string[] }} `updated` vaut true si le fichier a été réécrit
 */
export function checkSnapshot(file, actual, { update }) {
  if (update) {
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, serializeSnapshot(actual))
    return { updated: true, differences: [] }
  }
  if (!existsSync(file)) {
    return { updated: false, differences: [`instantané absent (${file}) : lancer \`npm run test:update\` puis relire le fichier`] }
  }
  const expected = parseSnapshot(readFileSync(file, 'utf8'))
  const differences = []
  for (const [title, snippet] of actual) {
    if (!expected.has(title)) differences.push(`nouveau : ${title}`)
    else if (expected.get(title) !== snippet) differences.push(`modifié : ${title}\n--- attendu\n${expected.get(title)}\n--- obtenu\n${snippet}`)
  }
  for (const title of expected.keys()) if (!actual.has(title)) differences.push(`disparu : ${title}`)
  return { updated: false, differences }
}
