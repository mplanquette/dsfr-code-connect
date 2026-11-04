// Lectures typées des propriétés Figma, communes à toutes les familles.
import type { InstanceHandle } from 'figma'

/**
 * Lit une variante et la convertit via `mapping`. Le mapping doit couvrir toutes les options :
 * une option oubliée lève une erreur (détectée par `npm test`) au lieu de produire `undefined`.
 */
export function readEnum<T>(instance: InstanceHandle, name: string, mapping: Record<string, T>): T {
  const value = instance.getEnum(name, mapping)
  if (value === undefined) throw new Error(`Variante « ${name} » : valeur non couverte par le mapping`)
  return value as T
}

/** Variante booléenne du design (options « True » / « False »), ex. « Désactivé ». */
export function readVariantFlag(instance: InstanceHandle, name: string): boolean {
  return readEnum(instance, name, { True: true, False: false })
}
