export type Optional<T> = T | null | undefined

export function isArray (value: unknown): boolean {
  return value !== undefined && value !== null && Array.isArray(value)
}

export function isObject (value: unknown): boolean {
  return value !== undefined && value !== null && typeof value === 'object' && value!.constructor.name === 'Object'
}

export function isFunction (value: unknown): boolean {
  return typeof value === 'function'
}

export function isNumber (value: unknown): boolean {
  return typeof value === 'number' && isFinite(value)
}

export function isFloat (value: unknown): boolean {
  return Number(value) === value && value % 1 !== 0
}

export function isString (value: unknown): boolean {
  return typeof value === 'string' || value instanceof String
}

export function spaceship (a: unknown, b: unknown): number {
  const normalizedA = normalizeComparable(a)
  const normalizedB = normalizeComparable(b)

  if (normalizedA > normalizedB) {
    return 1
  }

  if (normalizedA < normalizedB) {
    return -1
  }

  return 0
}

function normalizeComparable (value: unknown): number | string {
  if (isNumber(value)) {
    return <number>value
  }

  if (isString(value)) {
    return <string>value
  }

  if (isArray(value)) {
    return (<unknown[]>value).toString()
  }

  return Object.values(<{ [key: string]: unknown }>value).toString()
}
