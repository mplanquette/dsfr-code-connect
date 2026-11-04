// Faux runtime Figma : exécute un template Code Connect publié, sans passer par Figma.
//
// Le CLI ne sait pas évaluer un template en local. Ce module reproduit la surface de l'API
// `figma` utilisée par nos templates (selectedInstance, getString, getEnum, findInstance,
// executeTemplate, figma.code, figma.batch...) à partir d'une fixture qui décrit le composant.
//
// Le runtime est volontairement plus strict que celui de Figma : une propriété inconnue, un type
// inattendu ou une valeur d'enum non couverte lèvent une erreur au lieu de rendre `undefined`.
// Le but est de faire échouer un template fautif dans les tests plutôt que dans Dev Mode.
import vm from 'node:vm'

const CODE = Symbol('figma.code')

/** Erreur levée quand un template s'écarte du contrat décrit par la fixture. */
export class TemplateContractError extends Error {}

/**
 * Tag `figma.code` : conserve les morceaux et les valeurs, le rendu en texte se fait à la fin
 * pour accepter des résultats de template imbriqués ou des tableaux de résultats.
 */
function code(strings, ...values) {
  return { [CODE]: true, strings: [...strings], values }
}

/**
 * Convertit une valeur interpolable en texte. `undefined` et `null` sont rendus tels quels
 * pour que les tests les détectent (un snippet publié ne doit jamais en contenir).
 */
export function renderValue(value) {
  if (value === undefined || value === null) return String(value)
  if (Array.isArray(value)) return value.map(renderValue).join('')
  if (typeof value === 'object') {
    if (value[CODE]) {
      return value.strings.reduce(
        (out, chunk, i) => out + chunk + (i < value.values.length ? renderValue(value.values[i]) : ''),
        '',
      )
    }
    return value.type === 'ERROR' ? '[ERROR]' : '[object Object]'
  }
  return String(value)
}

const isBooleanVariant = (def) =>
  def.type === 'VARIANT' && def.options.length === 2 && def.options.includes('True') && def.options.includes('False')

function getDefinition(node, name, method, allowedTypes) {
  const def = node.properties[name]
  if (!def) {
    const available = Object.keys(node.properties).join(', ') || 'aucune'
    throw new TemplateContractError(`${method}('${name}') sur « ${node.name} » : propriété absente (disponibles : ${available})`)
  }
  if (!allowedTypes.includes(def.type)) {
    throw new TemplateContractError(`${method}('${name}') sur « ${node.name} » : propriété de type ${def.type}, ${allowedTypes.join(' ou ')} attendu`)
  }
  return def
}

/** Signale tout appel d'une méthode de l'API Figma que le harnais ne simule pas encore. */
function strictProxy(target, label) {
  return new Proxy(target, {
    get(obj, prop) {
      if (prop in obj || typeof prop === 'symbol' || prop === 'then' || prop === 'toJSON') return obj[prop]
      throw new TemplateContractError(`${String(prop)} sur « ${label} » n'est pas simulé par le harnais : l'ajouter à fake-figma.mjs`)
    },
  })
}

/**
 * Construit le handle d'une instance (ce que reçoit le template via `figma.selectedInstance`).
 * `runChild` exécute le template connecté d'un nœud enfant (pour `executeTemplate`).
 */
function createInstanceHandle(node, runChild) {
  const children = node.children.map((child) => createChildHandle(child, runChild))

  const handle = {
    type: 'INSTANCE',
    name: node.name,
    children,
    getString: (name) => {
      getDefinition(node, name, 'getString', ['TEXT'])
      return node.values[name]
    },
    getBoolean: (name, mapping) => {
      const def = getDefinition(node, name, 'getBoolean', ['BOOLEAN', 'VARIANT'])
      if (def.type === 'VARIANT' && !isBooleanVariant(def)) {
        throw new TemplateContractError(`getBoolean('${name}') sur « ${node.name} » : variante non booléenne (${def.options.join('/')})`)
      }
      const value = def.type === 'BOOLEAN' ? node.values[name] : node.values[name] === 'True'
      return mapping ? mapping[String(value)] : value
    },
    getEnum: (name, mapping) => {
      getDefinition(node, name, 'getEnum', ['VARIANT'])
      const value = node.values[name]
      if (!Object.hasOwn(mapping, value)) {
        throw new TemplateContractError(
          `getEnum('${name}') sur « ${node.name} » : valeur « ${value} » non couverte (clés : ${Object.keys(mapping).join(', ')})`,
        )
      }
      return mapping[value]
    },
    getPropertyValue: (name) => {
      getDefinition(node, name, 'getPropertyValue', ['TEXT', 'BOOLEAN', 'VARIANT'])
      return node.values[name]
    },
    hasCodeConnect: () => Boolean(node.templateKey),
    findInstance: (name) => children.find((c) => c.type === 'INSTANCE' && c.name === name) ?? { type: 'ERROR', message: `instance « ${name} » introuvable` },
    findText: (name) => children.find((c) => c.type === 'TEXT' && c.name === name) ?? { type: 'ERROR', message: `texte « ${name} » introuvable` },
    findConnectedInstances: (predicate) => children.filter((c) => c.type === 'INSTANCE' && c.hasCodeConnect() && predicate(c)),
    getInstanceSwap: (name) => {
      getDefinition(node, name, 'getInstanceSwap', ['INSTANCE_SWAP'])
      const swapped = node.swaps[name]
      return swapped ? createInstanceHandle(swapped, runChild) : { type: 'ERROR', message: `aucune instance dans « ${name} »` }
    },
    executeTemplate: () => {
      // Comme dans Figma, une instance sans Code Connect rend une section d'erreur (sans
      // métadonnées) : l'interpoler fait apparaître [ERROR] dans le snippet, détecté par les tests.
      if (node.connectedMetadata) return { example: '', metadata: { props: node.connectedMetadata } }
      if (!node.templateKey) return { example: { type: 'ERROR', message: `« ${node.name} » sans Code Connect` }, metadata: undefined }
      return runChild(node)
    },
  }
  return strictProxy(handle, node.name)
}

function createChildHandle(node, runChild) {
  if (node.kind === 'TEXT') return { type: 'TEXT', name: node.name, textContent: node.text }
  return createInstanceHandle(node, runChild)
}

/**
 * Exécute le code d'un template publié (sortie de `figma connect parse`) pour un nœud résolu.
 * @returns {{ id: string, imports: string[]|undefined, metadata: object|undefined, example: string, raw: unknown }}
 */
export function evaluateTemplate(templateCode, node, runChild) {
  const figma = strictProxy(
    {
      get batch() {
        // Le CLI préfixe les templates de lot par `globalThis['__FIGMA_BATCH'] = {...}`.
        return context.__FIGMA_BATCH ?? {}
      },
      selectedInstance: createInstanceHandle(node, runChild),
      code,
    },
    'figma',
  )
  const moduleShim = { exports: {} }
  const requireShim = (name) => {
    if (name !== 'figma') throw new TemplateContractError(`require('${name}') non autorisé dans un template`)
    return figma
  }
  // Contexte vm neuf à chaque exécution : globalThis isolé, donc données de lot propres.
  const context = vm.createContext({ require: requireShim, module: moduleShim })

  const body = templateCode.replace(/^export default /m, 'module.exports.default = ')
  vm.runInContext(body, context, { filename: 'template.js', timeout: 2000 })

  const definition = moduleShim.exports.default
  if (!definition || typeof definition.id !== 'string' || definition.id === '') {
    throw new TemplateContractError('le template doit exporter un objet avec un `id` non vide')
  }
  if (definition.example === undefined) throw new TemplateContractError('le template doit exporter `example`')
  return {
    id: definition.id,
    imports: definition.imports,
    metadata: definition.metadata,
    example: renderValue(definition.example),
    raw: definition.example,
  }
}
