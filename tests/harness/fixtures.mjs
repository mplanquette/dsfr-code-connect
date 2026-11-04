// Fixtures : description des composants Figma utilisée pour exécuter les templates.
//
// Elles vivent dans `components/<famille>/<famille>.json`, le fichier qui déclare aussi les nodes
// publiés : un groupe y décrit un ou plusieurs component sets de même structure, tels que les
// renvoie `get_context_for_code_connect` (propriétés, options de variante, enfants). C'est la
// copie locale du « contrat Figma » : si le design change, on met ce fichier à jour et les
// instantanés montrent l'effet sur chaque stack.
//
// Format d'un groupe :
//   { "nodeId": "120:4762", "template": "<fichier>.figma.batch.ts" (optionnel),
//     "components": [ { "url": "<CLÉ>", ...données de lot } ],
//     "properties": { "Libellé": { "type": "TEXT", "sample": "Libellé" },
//                     "Désactivé": { "type": "VARIANT", "options": ["False", "True"] },
//                     "Focus": { "type": "BOOLEAN", "vary": false } },
//     "children": [ { "kind": "INSTANCE", "name": "...", "template": "<CLÉ>", "values": {...}, "when": {...} },
//                   { "kind": "TEXT", "name": "...", "text": "..." } ],
//     "variations": [ { "label": "...", "childValues": { "<nom de l'enfant>": { "<propriété>": valeur } } } ] }
//
// Une propriété avec `"vary": false` garde sa valeur par défaut pendant les tests (pseudo-états,
// thèmes, propriétés sans effet sur le markup) pour limiter l'explosion des combinaisons.
// `variations` (optionnel) multiplie les combinaisons par des réglages d'enfants, car les
// propriétés d'un enfant ne sont pas pilotées par le composant racine.
// `values` d'un enfant accepte `"$parent.<propriété>"` pour suivre une variante du parent.
//
// Propriété d'échange d'instance : `{ "type": "INSTANCE_SWAP", "instance": <nœud> }`, où le nœud
// suit le format d'un enfant. Pour une icône, `"connected": { "iconClass": "..." }` simule une
// icône code-connectée (métadonnées exposées par son template) sans dépendre de son fichier.
// Les `variations` acceptent aussi `"swaps": { "<propriété>": <nœud> | null }`.
const MAX_COMBINATIONS = 600

/** Index clé de composant -> groupe (avec la famille et ses données de lot). */
export function indexGroups(families) {
  const index = new Map()
  for (const { name, groups } of families) {
    for (const group of groups) {
      for (const component of group.components) {
        if (index.has(component.url)) throw new Error(`la clé ${component.url} est déclarée deux fois (${name})`)
        index.set(component.url, { ...group, family: name, component })
      }
    }
  }
  return index
}

function defaultValue(def) {
  if (def.default !== undefined) return def.default
  if (def.type === 'VARIANT') return def.options[0]
  if (def.type === 'BOOLEAN') return false
  if (def.type === 'TEXT') return def.sample ?? 'Texte'
  return null
}

function defaultValues(properties) {
  return Object.fromEntries(Object.entries(properties).map(([name, def]) => [name, defaultValue(def)]))
}

/**
 * Énumère les combinaisons de propriétés à tester : produit cartésien des variantes et booléens
 * (hors `vary: false`), puis par les `variations` d'enfants. Les textes gardent leur exemple.
 * @returns {{ label: string, values: Record<string, unknown>, childValues: object }[]}
 */
export function expandCombinations(properties, variations = [{ label: '', childValues: {} }]) {
  const varied = Object.entries(properties).filter(([, def]) => def.vary !== false && (def.type === 'VARIANT' || def.type === 'BOOLEAN'))
  let combos = [{}]
  for (const [name, def] of varied) {
    const options = def.type === 'VARIANT' ? def.options : [false, true]
    combos = combos.flatMap((combo) => options.map((option) => ({ ...combo, [name]: option })))
    if (combos.length > MAX_COMBINATIONS) {
      throw new Error(`trop de combinaisons (> ${MAX_COMBINATIONS}) : marquer des propriétés \`"vary": false\` dans la fixture`)
    }
  }
  const base = defaultValues(properties)
  return combos.flatMap((combo) =>
    variations.map((variation) => {
      const parts = varied.map(([name]) => `${name}=${combo[name]}`)
      if (variation.label) parts.push(variation.label)
      return {
        label: parts.length ? parts.join(', ') : 'défaut',
        values: { ...base, ...combo },
        childValues: variation.childValues ?? {},
        swaps: variation.swaps ?? {},
      }
    }),
  )
}

function whenMatches(when, values) {
  if (!when) return true
  return Object.entries(when).every(([name, accepted]) => accepted.includes(String(values[name])))
}

function resolveValue(value, parentValues) {
  return typeof value === 'string' && value.startsWith('$parent.') ? parentValues[value.slice('$parent.'.length)] : value
}

/**
 * Résout un nœud de fixture en nœud exécutable : valeurs par défaut, références `$parent.X`,
 * enfants filtrés par `when` selon les valeurs courantes.
 */
export function resolveNode(spec, parentValues, index, childValues = {}, swapOverrides = {}) {
  if (spec.kind === 'TEXT') return { kind: 'TEXT', name: spec.name, text: spec.text }
  const group = spec.template ? index.get(spec.template) : undefined
  if (spec.template && !group) throw new Error(`fixtures : enfant « ${spec.name} » référence une clé inconnue (${spec.template})`)

  const properties = { ...(group?.properties ?? {}), ...(spec.properties ?? {}) }
  for (const [name, override] of Object.entries(spec.overrides ?? {})) {
    properties[name] = { ...properties[name], ...override }
  }
  const values = { ...defaultValues(properties) }
  for (const [name, value] of Object.entries(spec.values ?? {})) values[name] = resolveValue(value, parentValues)

  const childSpecs = spec.children ?? group?.children ?? []
  const children = childSpecs
    .filter((child) => whenMatches(child.when, values))
    .map((child) => resolveNode({ ...child, values: { ...child.values, ...childValues[child.name] } }, values, index))

  const swaps = {}
  for (const [name, def] of Object.entries(properties)) {
    if (def.type !== 'INSTANCE_SWAP') continue
    const swapSpec = Object.hasOwn(swapOverrides, name) ? swapOverrides[name] : def.instance
    if (swapSpec) swaps[name] = resolveNode({ kind: 'INSTANCE', name, ...swapSpec }, values, index)
  }
  return { kind: 'INSTANCE', name: spec.name, templateKey: spec.template, connectedMetadata: spec.connected, properties, values, children, swaps }
}

/** Nœud racine d'un composant pour une combinaison donnée. */
export function resolveRoot(key, group, combo, index) {
  const spec = { kind: 'INSTANCE', name: key, properties: group.properties, children: group.children, values: combo.values }
  const node = resolveNode(spec, {}, index, combo.childValues, combo.swaps)
  node.templateKey = key
  return node
}
