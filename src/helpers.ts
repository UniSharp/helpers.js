export type Optional<T> = T | null | undefined

export function isArray (value: any): boolean {
  return value && Array.isArray(value)
}

export function isObject (value: any): boolean {
  return value && typeof value === 'object' && value.constructor.name === 'Object'
}
