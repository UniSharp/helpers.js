import {
  Optional,
  isArray,
  isObject,
  isFunction,
  spaceship
} from '../helpers'
import {
  Hash,
  Collection,
  CollectionKey,
  CollectionItemPath,
  set as setHelper,
  find,
  range
} from './helpers'
import * as Obj from './object'

export type ArrayCallback<TReturn = any, T = any> = (value: T, index: number, array: T[]) => TReturn

interface Pair<T> {
  index: number
  value: T
}

interface Entry<T> extends Pair<T> {}

// FIXME: duplicate code
function* entries<T> (iterable: T[]): Generator<Entry<T>> {
  for (let index = 0; index < iterable.length; index++) {
    yield { value: iterable[index], index }
  }
}

export function contains<T> (haystack: T[], needle: T): boolean {
  return Object.values(haystack).includes(needle)
}

export function count (items: any[]): number {
  return items.length
}

export function has (items: any[], key: CollectionItemPath): boolean {
  return find(items, key).exists
}

export function get<T extends any[]> (items: T): T
export function get<TReturn, T> (items: T[], key: CollectionItemPath): TReturn
export function get<TReturn, T> (items: T[], key: CollectionItemPath, defaultValue: TReturn): TReturn
export function get<TReturn, T> (items: T[], key: Optional<CollectionItemPath> = null, defaultValue: Optional<TReturn> = null) {
  if (key === null) {
    return items
  }

  return find<TReturn>(items, key, defaultValue).value
}

export function set<T extends unknown[]> (items: T, key: CollectionItemPath, value: any): T {
  return setHelper(items, key, value)
}

export function sum (items: unknown[]): number
export function sum (items: Hash<unknown>[], key: CollectionItemPath): number
export function sum (items: unknown[] | Hash<unknown>[], key: Optional<CollectionItemPath> = null) {
  if (key) {
    items = pluck(<Hash<unknown>[]>items, key)
  }

  return (<unknown[]>items).reduce((result, value) => <number>result + (Number(value) || 0), 0)
}

export function avg (items: unknown[]): number | null
export function avg (items: Hash<unknown>[], key: CollectionItemPath): number | null
export function avg (items: unknown[] | Hash<unknown>[], key: Optional<CollectionItemPath> = null) {
  if (!items.length) {
    return null
  }

  if (key) {
    items = pluck(<Hash<unknown>[]>items, key)
  }

  return sum(items) / items.length
}

export function each<T> (items: T[], callback: ArrayCallback<boolean | void, T>): T[] {
  for (const { index, value } of entries(items)) {
    if (callback(value, index, items) === false) {
      break
    }
  }

  return items
}

export function chunk<T> (items: T[], size: number): T[][] {
  return range(0, Math.ceil(items.length / size) - 1).reduce((chunks, n) => {
    return [...chunks, items.slice(n * size, (n + 1) * size)]
  }, <T[][]>[])
}

export function reject<T> (items: T[], callback: ArrayCallback<boolean, T>): T[] {
  return items.filter((value, indes, array) => !callback(value, indes, array))
}

export function only<T> (items: T[], keys: number[]): T[]
export function only<T> (items: T[], ...keys: number[]): T[]
export function only<T> (items: T[], ...keys: number[] | number[][]) {
  const result: T[] = []

  keys = <number[]>keys.flat(Infinity)

  for (const { index, value } of entries(items)) {
    if (keys.includes(index)) {
      result.push(value)
    }
  }

  return result
}

export function except<T> (items: T[], keys: number[]): T[]
export function except<T> (items: T[], ...keys: number[]): T[]
export function except<T> (items: T[], ...keys: number[] | number[][]) {
  const result: T[] = []

  keys = <number[]>keys.flat(Infinity)

  for (const { index, value } of entries(items)) {
    if (!keys.includes(index)) {
      result.push(value)
    }
  }

  return result
}

export function isEmpty (items: any[]): boolean {
  return !items.length
}

export function isNotEmpty (items: any[]): boolean {
  return !!items.length
}

export function first<T> (items: T[]): T
export function first<T> (items: T[], callback: ArrayCallback<boolean, T>): T
export function first<T> (items: T[], callback: Optional<ArrayCallback<boolean, T>> = null) {
  if (!items.length) {
    return null
  }

  if (!callback) {
    return items[0]
  }

  for (const { value, index } of entries(items)) {
    if (callback(value, index, items)) {
      return value
    }
  }

  return null
}

export function last<T> (items: T[]): T
export function last<T> (items: T[], callback: ArrayCallback<boolean, T>): T
export function last<T> (items: T[], callback: Optional<ArrayCallback<boolean, T>> = null) {
  if (!items.length) {
    return null
  }

  if (!callback) {
    return items[items.length - 1]
  }

  let result = null

  for (const { value, index } of entries(items)) {
    if (callback(value, index, items)) {
      result = value
    }
  }

  return result
}

export function mapWithKeys<TReturn, T> (items: T[], callback: ArrayCallback<TReturn, T>): Hash<TReturn> {
  let result: Hash<TReturn> = {}

  for (const { index, value } of entries(items)) {
    result = { ...result, ...callback(value, index, items) }
  }

  return result
}

export function flatten<T> (items: T[] | T[][]): T[]
export function flatten<T> (items: T[] | T[][], depth: number): T[]
export function flatten<T> (items: T[] | T[][], depth: number = Infinity) {
  let result: any[] = []

  for (const item of Object.values(items)) {
    if (!isArray(item) && !isObject(item)) {
      result.push(item)

      continue
    }

    if (depth === 1) {
      result = [...result, ...Object.values(item)]

      continue
    }

    result = [...result, ...flatten(item, depth - 1)]
  }

  return result
}

export function min (items: number[]): number {
  return Math.min(...items)
}

export function max (items: number[]): number {
  return Math.max(...items)
}

export function pipe<TReturn, T> (items: T[], callback: (array: T[]) => TReturn): TReturn {
  return callback(items)
}

// FIXME: duplicate code
export function pluck<TReturn, T extends Hash<unknown>> (items: T[], value: CollectionItemPath): TReturn[]
export function pluck<TReturn, T extends Hash<unknown>> (items: T[], value: CollectionItemPath, key: CollectionItemPath): Hash<TReturn>
export function pluck<TReturn, T extends Hash<unknown>> (items: T[], value: CollectionItemPath, callback: ArrayCallback<string, T>): Hash<TReturn>
export function pluck<TReturn, T extends Hash<unknown>> (items: T[], value: CollectionItemPath, key: Optional<CollectionItemPath | ArrayCallback<string, T>> = null) {
  const keyIsFunction: boolean = isFunction(key)
  const keyIsNull: boolean = key === null

  let result: Hash<TReturn> = {}

  for (const { index, value: row } of entries(items)) {
    const v = Obj.get<TReturn, unknown>(row, value)

    if (keyIsNull) {
      result = { ...result, [index]: v }
      continue
    }

    if (keyIsFunction) {
      result = { ...result, [(<ArrayCallback<string, T>>key)(row, index, items)]: v }
      continue
    }

    result = { ...result, [Obj.get<string, unknown>(row, <CollectionItemPath>key)]: v }
  }

  return keyIsNull ? Object.values(result) : result
}

export function swap<T> (items: T[], from: number, to: number): T[] {
  const result = items.slice()
  const temp = result[from]

  result[from] = result[to]
  result[to] = temp

  return result
}

export function shuffle<T> (items: T[]): T[] {
  let result = items.slice()

  for (let i = 0; i < items.length; i++) {
    const target: number = Math.floor(Math.random() * items.length)

    result = swap(result, i, target)
  }

  return result
}

export function take<T> (items: T[], limit: number): T[] {
  return items.slice(0, limit)
}

// TODO: support itempath
export function unique<T> (items: T[]): T[]
export function unique<TIdentifier, T extends Hash<TIdentifier>> (items: T[], key: CollectionKey): T[]
export function unique<TIdentifier, T extends Hash<TIdentifier>> (items: T[], callback: ArrayCallback<TIdentifier, T>): T[]
export function unique<TIdentifier, T extends Hash<TIdentifier>> (items: T[], key: Optional<CollectionKey | ArrayCallback<TIdentifier, T>> = null) {
  const keyIsFunction: boolean = isFunction(key)
  const haystack: TIdentifier[] = []
  const result: T[] = []

  for (const { index, value: row } of entries(items)) {
    const uniqueBy: TIdentifier = keyIsFunction ? (<ArrayCallback<TIdentifier, T>>key)(row, index, items) : Obj.get(row, <CollectionKey>key)

    if (!haystack.includes(uniqueBy)) {
      result.push(row)
      haystack.push(uniqueBy)
    }
  }

  return result
}

export function diff<T> (items: T[], compared: Collection<T>): T[] {
  compared = Object.values(compared)

  return items.filter(item => !(<T[]>compared).includes(item))
}

export function intersect<T> (items: T[], compared: Collection<T>): T[] {
  compared = Object.values(compared)

  return items.filter(item => (<T[]>compared).includes(item))
}

export function merge<T> (items: T[], ...merged: T[][]): T[] {
  return items.concat(...merged)
}

// TODO: support itempath
export function keyBy<T extends Hash<unknown>> (items: T[], key: CollectionKey): Hash<T>
export function keyBy<T extends Hash<unknown>> (items: T[], callback: ArrayCallback<string, T>): Hash<T>
export function keyBy<T extends Hash<unknown>> (items: T[], key: CollectionKey | ArrayCallback<string, T>) {
  const keyIsFunction: boolean = isFunction(key)
  const result: Hash<T> = {}

  for (const { index, value: row } of entries(items)) {
    result[keyIsFunction ? (<ArrayCallback<string, T>>key)(row, index, items) : Obj.get<string, unknown>(row, <CollectionKey>key)] = row
  }

  return result
}

// TODO: support itempath
export function groupBy<T extends Hash<unknown>> (items: T[], key: CollectionKey): Hash<T[]>
export function groupBy<T extends Hash<unknown>> (items: T[], callback: ArrayCallback<string | string[], T>): Hash<T[]>
export function groupBy<T extends Hash<unknown>> (items: T[], key: CollectionKey | ArrayCallback<string | string[], T>) {
  const keyIsFunction: boolean = isFunction(key)
  const result: Hash<T[]> = {}

  for (const { index, value: row } of entries(items)) {
    let groups: string | string[] = keyIsFunction
      ? (<ArrayCallback<string | string[]>>key)(row, index, items)
      : Obj.get<string | string[], unknown>(row, <CollectionKey>key)

    if (!isArray(groups)) {
      groups = [<string>groups]
    }

    for (const group of <string[]>groups) {
      if (!result[group]) {
        result[group] = []
      }

      result[group].push(row)
    }
  }

  return result
}

export function sortDesc<T> (items: T[]): T[] {
  return items.slice().sort().reverse()
}

export function sortBy<T extends Hash<unknown>> (items: T[], key: CollectionItemPath): T[]
export function sortBy<T extends Hash<unknown>> (items: T[], callback: ArrayCallback<unknown, T>): T[]
export function sortBy<T extends Hash<unknown>> (items: T[], key: CollectionItemPath | ArrayCallback<unknown, T>) {
  const callback = isFunction(key) ? <ArrayCallback<unknown, T>>key : (item: T): unknown => Obj.get(item, <CollectionItemPath>key)
  const comparable = <Pair<unknown>[]>[]

  for (const { index, value } of entries(items)) {
    comparable.push({ index, value: callback(value, index, items) })
  }

  const sorted = comparable.sort((a, b) => spaceship(a.value, b.value))

  return sorted.reduce(
    (result, { index }) => [...result, items[index]],
    <T[]>[]
  )
}

export function sortByDesc<T extends Hash<unknown>> (items: T[], key: CollectionItemPath): T[]
export function sortByDesc<T extends Hash<unknown>> (items: T[], callback: ArrayCallback<unknown, T>): T[]
export function sortByDesc<T extends Hash<unknown>> (items: T[], key: CollectionItemPath | ArrayCallback<unknown, T>) {
  // FIXME: type
  return sortBy(items, <CollectionItemPath>key).reverse()
}

export function index<T> (haystack: T[], needle: T): number | null {
  const result = haystack.indexOf(needle)

  if (result === -1) {
    return null
  }

  return result
}

export function append<T> (items: T[], value: T): T[] {
  return [...items, value]
}

export function prepend<T> (items: T[], value: T): T[] {
  return [value, ...items]
}

export function insert<T> (items: T[], target: number, value: T): T[] {
  return [...items.slice(0, target), value, ...items.slice(target)]
}

export function partition<T> (items: T[], callback: ArrayCallback<boolean, T>): [T[], T[]] {
  const result: [T[], T[]] = [[], []]

  for (const { index, value } of entries(items)) {
    const part: number = callback(value, index, items) ? 0 : 1

    result[part].push(value)
  }

  return result
}

export function flip (items: string[]): Hash<number> {
  const result: Hash<number> = {}

  for (const { index, value } of entries(items)) {
    result[value] = index
  }

  return result
}

export function freeze<T extends any[]> (items: T): Readonly<T> {
  return Object.freeze<T>(items)
}

export function isFrozen (items: any[]): boolean {
  return Object.isFrozen(items)
}
