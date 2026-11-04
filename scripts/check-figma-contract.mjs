#!/usr/bin/env node
// Contrat Figma : vérifie que la description des composants (components/<famille>/<famille>.json)
// correspond toujours au design publié.
//
// Les tests de rendu (`npm test`) prouvent qu'un template est juste pour la description donnée.
// Ce script prouve que la description est juste pour le fichier Figma : pour chaque node publié,
// il compare les propriétés déclarées (nom, type, options de variante) à celles que renvoie l'API
// REST Figma. Il détecte ainsi une propriété renommée ou une option de variante ajoutée lors d'une
// montée de version du fichier, avant que les snippets ne cassent silencieusement en Dev Mode.
//
// Usage : node scripts/check-figma-contract.mjs   (token : FIGMA_ACCESS_TOKEN ou .env)
// Code de sortie 1 si un écart est trouvé.
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { loadFamilies, resolveUrl } from './catalog.mjs'

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const BATCH_SIZE = 40

function readToken() {
  if (process.env.FIGMA_ACCESS_TOKEN) return process.env.FIGMA_ACCESS_TOKEN
  const envPath = join(REPO_ROOT, '.env')
  if (!existsSync(envPath)) return undefined
  const line = readFileSync(envPath, 'utf8').split(/\r?\n/).find((l) => l.startsWith('FIGMA_ACCESS_TOKEN='))
  return line?.slice('FIGMA_ACCESS_TOKEN='.length).trim() || undefined
}

// curl plutôt que fetch : respecte les variables de proxy d'entreprise, comme le rebranchement.
function figmaGet(path, token) {
  // HTTP/1.1 : le proxy d'entreprise coupe les réponses HTTP/2 volumineuses ; délai borné pour ne pas bloquer.
  const result = spawnSync('curl', ['-sS', '--http1.1', '--connect-timeout', '30', '--max-time', '120', '--retry', '2', '--fail-with-body', '-H', `X-Figma-Token: ${token}`, `https://api.figma.com/v1${path}`], {
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  })
  if (result.status !== 0) throw new Error(`API Figma ${path} : ${result.stdout || result.stderr}`)
  return JSON.parse(result.stdout)
}

/** Extrait fileKey et node-id (format `1:2`) d'une URL de design Figma résolue. */
export function parseFigmaUrl(url) {
  const match = url.match(/\/design\/([A-Za-z0-9]+)\/[^?]*\?node-id=(\d+)[-:](\d+)/)
  return match ? { fileKey: match[1], nodeId: `${match[2]}:${match[3]}` } : null
}

/** Propriétés Figma d'un node, au format des fixtures : nom sans suffixe `#id` -> { type, options }. */
export function figmaProperties(document) {
  const definitions = document.componentPropertyDefinitions ?? {}
  return Object.fromEntries(
    Object.entries(definitions).map(([key, def]) => [key.replace(/#[^#]*$/, ''), { type: def.type, options: def.variantOptions }]),
  )
}

/**
 * Compare la description déclarée d'un groupe aux propriétés réelles d'un node.
 * @returns {string[]} écarts trouvés
 */
export function compareProperties(declared, actual) {
  const problems = []
  for (const [name, def] of Object.entries(declared)) {
    const real = actual[name]
    if (!real) {
      problems.push(`propriété « ${name} » absente du design`)
      continue
    }
    if (real.type !== def.type) problems.push(`« ${name} » : type ${real.type} dans le design, ${def.type} déclaré`)
    if (def.type === 'VARIANT' && real.options) {
      const missing = real.options.filter((option) => !def.options.includes(option))
      const extra = def.options.filter((option) => !real.options.includes(option))
      if (missing.length) problems.push(`« ${name} » : option(s) du design non déclarée(s) : ${missing.join(', ')}`)
      if (extra.length) problems.push(`« ${name} » : option(s) déclarée(s) absente(s) du design : ${extra.join(', ')}`)
    }
  }
  for (const name of Object.keys(actual)) {
    if (!Object.hasOwn(declared, name)) problems.push(`propriété « ${name} » du design non déclarée`)
  }
  return problems
}

function main() {
  const token = readToken()
  if (!token) {
    console.error('Token Figma manquant : FIGMA_ACCESS_TOKEN ou .env')
    process.exit(1)
  }
  const substitutions = JSON.parse(readFileSync(join(REPO_ROOT, 'figma.config.json'), 'utf8')).codeConnect.documentUrlSubstitutions

  // Node à vérifier -> description attendue. Les gros groupes homogènes (icônes) ne vérifient
  // que leur échantillon de test.
  const checks = []
  for (const { name: family, groups } of loadFamilies(REPO_ROOT)) {
    for (const group of groups) {
      for (const component of group.components.slice(0, group.testSample ?? Infinity)) {
        const target = parseFigmaUrl(resolveUrl(component.url, substitutions))
        if (!target) throw new Error(`${family} : URL non résolue (${component.url})`)
        checks.push({ family, url: component.url, ...target, properties: group.properties })
      }
    }
  }

  const byFile = new Map()
  for (const check of checks) byFile.set(check.fileKey, [...(byFile.get(check.fileKey) ?? []), check])
  const failures = []
  for (const [fileKey, fileChecks] of byFile) {
    for (let i = 0; i < fileChecks.length; i += BATCH_SIZE) {
      const batch = fileChecks.slice(i, i + BATCH_SIZE)
      const ids = batch.map((check) => check.nodeId).join(',')
      const { nodes } = figmaGet(`/files/${fileKey}/nodes?ids=${encodeURIComponent(ids)}&depth=1`, token)
      for (const check of batch) {
        const node = nodes[check.nodeId]
        const problems = node ? compareProperties(check.properties, figmaProperties(node.document)) : ['node introuvable dans le fichier']
        for (const problem of problems) failures.push(`${check.family} ${check.url} : ${problem}`)
      }
    }
  }

  console.log(`${checks.length} nodes vérifiés.`)
  if (failures.length) {
    console.error(`\n${failures.length} écart(s) entre les descriptions et le design :\n${failures.join('\n')}`)
    process.exit(1)
  }
  console.log('Aucun écart : les descriptions correspondent au design publié.')
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main()
