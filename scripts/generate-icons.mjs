#!/usr/bin/env node
// Génère components/icon/icon.json : la liste des icônes DSFR à code-connecter, lue dans le
// fichier Figma « Fondamentaux » (page « Icônes fonctionnelles ») via l'API REST.
//
// Aucune icône n'est écrite à la main : relancer ce script après une montée de version du
// fichier Fondamentaux, ou avec la clé de votre propre copie (équivalent du rebranchement).
// La clé <FIGMA_ICONES> (URL de base du fichier) va dans figma.local.json, jamais versionné.
//
// Usage : node scripts/generate-icons.mjs --file-key <CLÉ_FONDAMENTAUX> [--dry-run]
// Token : FIGMA_ACCESS_TOKEN (environnement ou .env), scope « File content » suffisant.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const PAGE_NAME = 'Icônes fonctionnelles'
const BASE_KEY = '<FIGMA_ICONES>'
// Échantillon testé par `npm test` dans chaque groupe (le rendu est identique pour tous).
const TEST_SAMPLE = 3

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
  const result = spawnSync('curl', ['-sS', '--http1.1', '--connect-timeout', '30', '--max-time', '180', '--retry', '2', '--fail-with-body', '-H', `X-Figma-Token: ${token}`, `https://api.figma.com/v1${path}`], {
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  })
  if (result.status !== 0) throw new Error(`API Figma ${path} : ${result.stdout || result.stderr}`)
  return JSON.parse(result.stdout)
}

// Un nom d'icône DSFR : minuscules, chiffres et tirets (exclut « En-tête », « Lien »...).
const ICON_NAME = /^[a-z0-9-]+$/
const normalizeBase = (name) => name.replace(/^fr--/, '')

/**
 * Classe une icône de la page selon sa structure. @returns {object|null} entrée de lot, ou null
 * si le composant n'est pas une icône exploitable.
 */
export function classifyIcon(name, variantNames) {
  if (!ICON_NAME.test(name)) return null
  const base = normalizeBase(name)
  if (!variantNames) return { kind: 'fixed', iconClass: `fr-icon-${base}` }
  const sorted = [...variantNames].sort().join('|')
  if (sorted === 'Version=Contour|Version=Pleine') return { kind: 'version', base }
  if (variantNames.every((v) => v.startsWith('Direction=')) && base.startsWith('arrow')) return { kind: 'direction', base, directions: variantNames.map((v) => v.split('=')[1]) }
  return null
}

function main() {
  const args = process.argv.slice(2)
  const fileKey = args[args.indexOf('--file-key') + 1]
  const dryRun = args.includes('--dry-run')
  if (!args.includes('--file-key') || !fileKey) {
    console.error('Usage : node scripts/generate-icons.mjs --file-key <CLÉ_FONDAMENTAUX> [--dry-run]')
    process.exit(1)
  }
  const token = readToken()
  if (!token) throw new Error('Token Figma manquant : FIGMA_ACCESS_TOKEN ou .env')

  const file = figmaGet(`/files/${fileKey}?depth=1`, token)
  const page = file.document.children.find((p) => p.name.trim() === PAGE_NAME)
  if (!page) throw new Error(`Page « ${PAGE_NAME} » introuvable dans ${file.name}`)
  const nodes = figmaGet(`/files/${fileKey}/nodes?ids=${encodeURIComponent(page.id)}&depth=3`, token).nodes[page.id]

  const variantsBySet = new Map()
  for (const component of Object.values(nodes.components)) {
    if (component.componentSetId) variantsBySet.set(component.componentSetId, [...(variantsBySet.get(component.componentSetId) ?? []), component.name])
  }
  const candidates = [
    ...Object.entries(nodes.componentSets).map(([id, set]) => ({ id, name: set.name, variants: variantsBySet.get(id) ?? [] })),
    ...Object.entries(nodes.components).filter(([, c]) => !c.componentSetId).map(([id, c]) => ({ id, name: c.name, variants: null })),
  ]

  const groups = { version: [], direction: [], fixed: [] }
  const skipped = []
  for (const { id, name, variants } of candidates.sort((a, b) => a.name.localeCompare(b.name))) {
    const entry = classifyIcon(name, variants)
    if (!entry) {
      skipped.push(name)
      continue
    }
    const { directions, ...data } = entry
    groups[entry.kind].push({ url: `${BASE_KEY}?node-id=${id.replace(':', '-')}`, ...data })
  }

  console.log(`${file.name} : ${groups.version.length} icônes Contour/Pleine, ${groups.direction.length} directionnelles, ${groups.fixed.length} fixes`)
  if (skipped.length) console.log(`Ignorés (pas des icônes) : ${skipped.join(', ')}`)
  if (dryRun) return

  const catalog = {
    family: 'Icône',
    groups: [
      { nodeId: 'version', testSample: TEST_SAMPLE, components: groups.version, properties: { Version: { type: 'VARIANT', options: ['Contour', 'Pleine'] } } },
      { nodeId: 'direction', testSample: TEST_SAMPLE, components: groups.direction, properties: { Direction: { type: 'VARIANT', options: ['Haut', 'Droite', 'Bas', 'Gauche'] } } },
      { nodeId: 'fixed', testSample: TEST_SAMPLE, components: groups.fixed, properties: {} },
    ].filter((group) => group.components.length),
  }
  writeFileSync(join(REPO_ROOT, 'components', 'icon', 'icon.json'), JSON.stringify(catalog, null, 2) + '\n')

  // La clé de votre copie de fichier ne va jamais dans figma.config.json (versionné) : elle reste
  // dans figma.local.json, ignoré par git, comme le catalogue d'icônes généré.
  const localPath = join(REPO_ROOT, 'figma.local.json')
  const local = existsSync(localPath) ? JSON.parse(readFileSync(localPath, 'utf8')) : {}
  const fileSlug = encodeURIComponent(file.name).replace(/%20/g, '-')
  local.documentUrlSubstitutions = { ...local.documentUrlSubstitutions, [BASE_KEY]: `https://www.figma.com/design/${fileKey}/${fileSlug}` }
  writeFileSync(localPath, JSON.stringify(local, null, 2) + '\n')
  console.log('components/icon/icon.json et figma.local.json générés (ignorés par git) : lancer npm run test:update pour les instantanés.')
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main()
