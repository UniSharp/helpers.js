import { Optional, isArray, isObject, isNumber } from '../helpers'
import * as methods from './object'

interface FindResult<T> {
  exists: boolean
  value: T
}

export type Hash<T = any> = { [key: string]: T }
export type Collection<T = any> = T[] | Hash<T>
export type CollectionKey = number | string
export type CollectionItemPath = number | string | CollectionKey[]

export function normalizeKey (key: CollectionItemPath): CollectionKey[] {
  if (!isArray(key)) {
    key = key.toString().replace(/^\[|\]/g, '').replace(/\[/g, '.').split('.')
  }

  return (<CollectionKey[]>key).map((segment) => {
    if (isNumber(+segment)) {
      return +segment
    }

    return segment.toString()
  })
}

export function set<T extends Collection<unknown>> (items: T, key: CollectionItemPath, value: any): T {
  const segments = normalizeKey(key)

  // FIXME: type
  let previous: Hash = items
  let previousKey = segments.shift()
  let current = previous[previousKey!]

  while (segments.length) {
    const k = segments.shift()

    if (!isObject(current) && !isArray(current)) {
      previous[previousKey!] = isNumber(+k!) ? [] : {}
      current = previous[previousKey!]
    }

    previousKey = k
    previous = current
    current = current[k!]
  }

  previous[previousKey!] = value

  return items
}

export function find<TReturn = any> (items: Collection<unknown>, key: CollectionItemPath, defaultValue: Optional<TReturn> = null): FindResult<Optional<TReturn>> {
  const segments = normalizeKey(key)

  let haystack: Hash<unknown> | unknown = <Hash<unknown>>{ ...items }

  for (const segment of segments) {
    if (!Object.keys(<Hash<unknown>>haystack).includes(segment.toString())) {
      return { exists: false, value: defaultValue }
    }

    haystack = (<Hash<unknown>>haystack)[segment]
  }

  return { exists: true, value: <TReturn>haystack }
}

export function range (from: number, to: number): number[] {
  const result = []

  for (let i = from; i <= to; i++) {
    result.push(i)
  }

  return result
}

export function call (method: string, items: any, ...args: any[]): any {
  if (isObject(items) && !(method in items)) {
    return (<(items: Hash, ...args: any[]) => any>methods[<keyof typeof methods>method])(items, ...args)
  }

  if (isArray(items) && method in items) {
    return Array.prototype[<keyof Array<any>>method].apply(items, args)
  }

  return items[method](...args)
}
