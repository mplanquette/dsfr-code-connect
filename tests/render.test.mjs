// Tests de rendu des templates Code Connect.
//
// Pour chaque famille de components/ et chaque stack : on exécute le template publié avec un faux runtime Figma sur toutes les combinaisons
// de propriétés, on contrôle le snippet (valeurs parasites, balisage) et on le compare à un
// instantané relu par un humain.
//
// Lancer : `npm test`. Après un changement volontaire : `npm run test:update`, puis relire le diff.
import assert from 'node:assert/strict'
import { dirname, join } from 'node:path'
import { describe, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { findForbiddenTokens, findMarkupErrors } from './harness/checks.mjs'
import { evaluateTemplate } from './harness/fake-figma.mjs'
import { loadFamilies, resolveUrl } from '../scripts/catalog.mjs'
import { expandCombinations, indexGroups, resolveRoot } from './harness/fixtures.mjs'
import { loadKeysByUrl, parseAllStacks, STACKS } from './harness/parse-templates.mjs'
import { checkSnapshot } from './harness/snapshots.mjs'

const TESTS_DIR = dirname(fileURLToPath(import.meta.url))
const ROOT = join(TESTS_DIR, '..')
const UPDATE = process.env.UPDATE_SNAPSHOTS === '1'

const parsed = await parseAllStacks(ROOT)
const { substitutions } = loadKeysByUrl(ROOT)
const families = loadFamilies(ROOT)
const index = indexGroups(families)

/** Rend un composant pour une stack et une combinaison ; les erreurs sont retournées, pas levées. */
function renderCombination(stack, key, group, combo) {
  const { templates } = parsed.get(stack)
  const runChild = (node) => {
    const template = templates.get(node.templateKey)
    if (!template) throw new Error(`${stack} : aucun template au nouveau format pour l'enfant ${node.templateKey}`)
    const result = evaluateTemplate(template.code, node, runChild)
    return { example: result.raw, metadata: result.metadata }
  }
  try {
    const root = resolveRoot(key, group, combo, index)
    const result = evaluateTemplate(templates.get(key).code, root, runChild)
    const problems = [...findForbiddenTokens(result.example), ...findMarkupErrors(result.example)]
    return { snippet: result.example, imports: result.imports, problems }
  } catch (error) {
    return { snippet: null, problems: [error.message] }
  }
}

describe('catalogue', () => {
  test('chaque composant déclaré a une URL résolue par figma.config.json', () => {
    const unresolved = [...index.keys()].filter((url) => !resolveUrl(url, substitutions).startsWith('https://'))
    assert.deepEqual(unresolved, [], `clés absentes de figma.config.json : ${unresolved.join(', ')}`)
  })

  test('chaque stack publie chaque composant déclaré', () => {
    const missing = []
    for (const stack of STACKS) for (const key of index.keys()) if (!parsed.get(stack).templates.has(key)) missing.push(`${stack} ${key}`)
    assert.deepEqual(missing, [], `composants absents du parse : ${missing.join(', ')}`)
  })

  test('aucun composant n\'est connecté deux fois (famille et ancien fichier)', () => {
    // Un node migré dont l'ancien figma.connect subsiste donnerait deux snippets concurrents.
    const duplicates = []
    for (const stack of STACKS) for (const key of parsed.get(stack).legacyKeys) if (index.has(key)) duplicates.push(`${stack} ${key}`)
    assert.deepEqual(duplicates, [], `ancien figma.connect à supprimer : ${duplicates.join(', ')}`)
  })
})

for (const { name: file, dir, groups } of families) {
  describe(`rendu : ${file}`, () => {
    const snapshot = new Map()

    for (const stack of STACKS) {
      for (const group of groups) {
        // Les gros groupes homogènes (icônes) ne testent qu'un échantillon : le rendu est le même.
        for (const { url: key } of group.components.slice(0, group.testSample ?? Infinity)) {
          if (!parsed.get(stack).templates.has(key)) continue
          const combos = expandCombinations(group.properties, group.variations)

          test(`${stack} ${key} (${combos.length} combinaisons)`, () => {
            const failures = []
            for (const combo of combos) {
              const { snippet, problems } = renderCombination(stack, key, group, combo)
              if (snippet !== null) snapshot.set(`${stack} | ${key} | ${combo.label}`, snippet)
              for (const problem of problems) failures.push(`[${combo.label}] ${problem}`)
            }
            assert.deepEqual(failures, [], `\n${failures.join('\n')}`)
          })
        }
      }
    }

    test('instantanés', () => {
      const { differences } = checkSnapshot(join(dir, `${file}.snap`), snapshot, { update: UPDATE })
      assert.deepEqual(differences, [], `\n${differences.join('\n\n')}\n\nSi le changement est voulu : npm run test:update`)
    })
  })
}

test('couverture de la migration', (t) => {
  const lines = STACKS.map((stack) => {
    const { templates, legacyCount } = parsed.get(stack)
    return `${stack} : ${templates.size} nœuds au nouveau format, ${legacyCount} à l'ancien format (non testés)`
  })
  t.diagnostic(lines.join(' | '))
})
