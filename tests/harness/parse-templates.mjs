// Récupère les templates tels que Figma les recevra : sortie de `figma connect parse`.
// On teste ce code publié (après résolution des helpers et des données de lot), pas les sources.
import { execFile } from 'node:child_process'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { loadFamilies, loadSubstitutions, prepareStack, resolveUrl, STACKS } from '../../scripts/catalog.mjs'

const run = promisify(execFile)

export { STACKS }

/**
 * Table URL résolue -> URL telle qu'écrite dans le dépôt (`<CLÉ>` ou `<CLÉ>?node-id=...`), pour
 * retrouver un composant à partir de l'URL figurant dans la sortie du parse.
 */
export function loadKeysByUrl(root) {
  const substitutions = loadSubstitutions(root)
  const keysByUrl = new Map(Object.entries(substitutions).map(([key, url]) => [url, key]))
  for (const { groups } of loadFamilies(root)) {
    for (const { components } of groups) for (const { url } of components) keysByUrl.set(resolveUrl(url, substitutions), url)
  }
  return { keysByUrl, substitutions }
}

/**
 * Lance le parse d'une stack et retourne ses templates (« parserless »), indexés par clé de
 * composant.
 * @returns {Promise<{ templates: Map<string, { code: string, label: string }> }>}
 */
async function parseStack(root, stack, keysByUrl) {
  const outFile = join(mkdtempSync(join(tmpdir(), 'dsfr-cc-')), `${stack}.json`)
  const cli = join(root, 'node_modules', '@figma', 'code-connect', 'dist', 'cli.js')
  const config = prepareStack(stack, root)
  await run(process.execPath, [cli, 'connect', 'parse', '--dir', '.', '--config', config, '--skip-update-check', '-o', outFile], {
    cwd: root,
    maxBuffer: 64 * 1024 * 1024,
  })

  const templates = new Map()
  for (const doc of JSON.parse(readFileSync(outFile, 'utf8'))) {
    // Un `figma.connect` ne peut pas être exécuté par le harnais : tout passe par components/.
    if (!doc.templateData?.isParserless) throw new Error(`${stack} : figma.connect hors de components/ (${doc._codeConnectFilePath ?? doc.figmaNode})`)
    const key = keysByUrl.get(doc.figmaNode)
    if (!key) throw new Error(`${stack} : URL sans clé dans figma.config.json (${doc.figmaNode})`)
    if (templates.has(key)) throw new Error(`${stack} : deux templates pour la clé ${key}`)
    templates.set(key, { code: doc.template, label: doc.label })
  }
  return { templates }
}

/** Parse les quatre stacks. @returns {Promise<Map<string, {templates: Map}>>} */
export async function parseAllStacks(root) {
  const { keysByUrl } = loadKeysByUrl(root)
  const results = new Map()
  for (const stack of STACKS) results.set(stack, await parseStack(root, stack, keysByUrl))
  return results
}
