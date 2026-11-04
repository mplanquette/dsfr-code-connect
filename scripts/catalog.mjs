// Catalogue des familles de composants : prépare, pour une stack, ce que le CLI Code Connect
// doit publier.
//
// Chaque famille vit dans `components/<famille>/` :
//   - `<famille>.figma.batch.ts` : un seul template pour les quatre stacks (lecture du design
//     une fois, puis une fonction de rendu par stack) ;
//   - `<famille>.json` : les nodes Figma connectés (clé de figma.config.json + données propres
//     à chaque node) et la description de leurs propriétés, qui sert aussi de fixture aux tests ;
//   - `<famille>.snap` : les snippets rendus, relus en revue.
//
// Le CLI publie un label à la fois et le template a besoin de savoir pour quelle stack il rend :
// on génère donc, dans `.codeconnect/` (ignoré par git), un fichier de lot par stack où chaque
// entrée porte `stack`, et une config qui l'inclut avec les fichiers historiques de la stack.
//
// Usage CLI : node scripts/catalog.mjs prepare <stack>   (affiche le chemin de la config générée)
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
export const STACKS = ['angular', 'html', 'react', 'vue']
export const COMPONENTS_DIR = 'components'
const OUTPUT_DIR = '.codeconnect'

const toPosix = (path) => path.split('\\').join('/')

/**
 * Charge toutes les familles de `components/` (un dossier par famille, sauf `_shared`).
 * @returns {{ name: string, dir: string, family: string, groups: object[] }[]}
 */
export function loadFamilies(root = REPO_ROOT) {
  const base = join(root, COMPONENTS_DIR)
  if (!existsSync(base)) return []
  return readdirSync(base, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
    .map((entry) => entry.name)
    .sort()
    // Une famille sans catalogue (ex. icon/ avant `generate-icons.mjs`) n'est pas encore publiée.
    .filter((name) => existsSync(join(base, name, `${name}.json`)))
    .map((name) => {
      const dir = join(base, name)
      const data = JSON.parse(readFileSync(join(dir, `${name}.json`), 'utf8'))
      const groups = data.groups.map((group) => ({ ...group, template: group.template ?? `${name}.figma.batch.ts` }))
      return { name, dir, family: data.family, groups }
    })
}

/**
 * Substitutions d'URL : `figma.config.json` (versionné) complété par `figma.local.json` (ignoré par
 * git, propre à chaque utilisateur : clés de ses copies de fichiers, ex. icônes). Le local l'emporte.
 */
export function loadSubstitutions(root = REPO_ROOT) {
  const read = (file) => {
    const path = join(root, file)
    return existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : {}
  }
  return {
    ...read('figma.config.json').codeConnect?.documentUrlSubstitutions,
    ...read('figma.local.json').documentUrlSubstitutions,
  }
}

/**
 * Résout une URL de composant (`<CLÉ>` ou `<CLÉ>?node-id=...`) avec documentUrlSubstitutions,
 * comme le fait le CLI : les clés les plus longues d'abord.
 */
export function resolveUrl(url, substitutions) {
  let resolved = url
  for (const key of Object.keys(substitutions).sort((a, b) => b.length - a.length)) {
    resolved = resolved.split(key).join(substitutions[key])
  }
  return resolved
}

/**
 * Écrit le fichier de lot et la config de la stack dans `.codeconnect/`.
 * @returns {string} chemin de la config générée, relatif à la racine du dépôt
 */
export function prepareStack(stack, root = REPO_ROOT) {
  if (!STACKS.includes(stack)) throw new Error(`Stack inconnue : ${stack}`)
  const outDir = join(root, OUTPUT_DIR)
  mkdirSync(outDir, { recursive: true })

  // Un groupe de lot par fichier de template ; `templateFile` est relatif au fichier de lot.
  const byTemplate = new Map()
  for (const { dir, groups } of loadFamilies(root)) {
    for (const group of groups) {
      const templatePath = join(dir, group.template)
      if (!existsSync(templatePath)) throw new Error(`Template introuvable : ${relative(root, templatePath)}`)
      const components = byTemplate.get(templatePath) ?? []
      components.push(...group.components.map((component) => ({ ...component, stack })))
      byTemplate.set(templatePath, components)
    }
  }
  const batch = [...byTemplate].map(([templatePath, components]) => ({
    templateFile: toPosix(relative(outDir, templatePath)),
    components,
  }))
  const batchFile = `${stack}.figma.batch.json`
  writeFileSync(join(outDir, batchFile), JSON.stringify(batch, null, 2) + '\n')

  const rootConfig = JSON.parse(readFileSync(join(root, 'figma.config.json'), 'utf8')).codeConnect
  const config = {
    codeConnect: {
      parser: rootConfig.parser,
      // Fichiers historiques de la stack (en cours de migration) + lot généré des familles.
      include: [`${stack}/*.figma.ts`, ...(batch.length ? [`${OUTPUT_DIR}/${batchFile}`] : [])],
      documentUrlSubstitutions: loadSubstitutions(root),
    },
  }
  const configFile = join(OUTPUT_DIR, `figma.${stack}.config.json`)
  writeFileSync(join(root, configFile), JSON.stringify(config, null, 2) + '\n')
  return toPosix(configFile)
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [command, stack] = process.argv.slice(2)
  if (command !== 'prepare' || !stack) {
    console.error('Usage : node scripts/catalog.mjs prepare <angular|html|react|vue>')
    process.exit(1)
  }
  console.log(prepareStack(stack))
}
