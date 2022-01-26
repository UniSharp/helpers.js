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
import * as Arr from './array'

export type HashCallback<TReturn = any, T = any> = (value: T, key: string, index: number, collection: Hash<T>) => TReturn
export type CompareFunction<T = unknown> = (a: T, b: T) => number

interface Pair<T> {
  key: string
  value: T
}

interface Entry<T> extends Pair<T> {
  index: number
}

function* entries<T> (iterable: Hash<T>): Generator<Entry<T>> {
  const keys = Object.keys(iterable)

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    const value = iterable[key]

    yield { value, key, index }
  }
}

function toPairs<T> (items: Hash<T>): Pair<T>[] {
  const result = <Pair<T>[]>[]

  for (const { key, value } of entries(items)) {
    result.push({ key, value })
  }

  return result
}

function fromPairs<T> (items: Pair<T>[]): Hash<T> {
  return items.reduce((result, { key, value }) => {
    return { ...result, [key]: value }
  }, <Hash<T>>{})
}

export function keys (items: Hash): string[] {
  return Object.keys(items)
}

export function values<T> (items: Hash<T>): T[] {
  return Object.values(items)
}

export function contains<T> (haystack: Hash<T>, needle: T): boolean {
  return Object.values(haystack).includes(needle)
}

export function count (items: Hash): number {
  return Object.keys(items).length
}

export function has (items: Hash, key: CollectionItemPath): boolean {
  return find(items, key).exists
}

export function get<T extends Hash> (items: T): T
export function get<TReturn, T> (items: Hash<T>, key: CollectionItemPath): TReturn
export function get<TReturn, T> (items: Hash<T>, key: CollectionItemPath, defaultValue: TReturn): TReturn
export function get<TReturn, T> (items: Hash<T>, key: Optional<CollectionItemPath> = null, defaultValue: Optional<TReturn> = null) {
  if (key === null) {
    return items
  }

  return find<TReturn>(items, key, defaultValue).value
}

export function set<T extends Hash<unknown>> (items: T, key: CollectionItemPath, value: any): T {
  return setHelper(items, key, value)
}

export function sum (items: Hash<unknown>): number
export function sum (items: Hash<Hash<unknown>>, key: CollectionItemPath): number
export function sum (items: Hash<unknown> | Hash<Hash<unknown>>, key: Optional<CollectionItemPath> = null) {
  // FIXME: type
  return Arr.sum(Object.values(<Hash<Hash<unknown>>>items), <CollectionItemPath>key)
}

export function avg (items: Hash<unknown>): number | null
export function avg (items: Hash<Hash<unknown>>, key: CollectionItemPath): number | null
export function avg (items: Hash<unknown> | Hash<Hash<unknown>>, key: Optional<CollectionItemPath> = null) {
  // FIXME: type
  return Arr.avg(Object.values(<Hash<Hash<unknown>>>items), <CollectionItemPath>key)
}

export function each<T> (items: Hash<T>, callback: HashCallback<boolean | void, T>): Hash<T> {
  for (const { key, index, value } of entries(items)) {
    if (callback(value, key, index, items) === false) {
      break
    }
  }

  return items
}

export function slice<T> (items: Hash<T>): Hash<T>
export function slice<T> (items: Hash<T>, begin: number): Hash<T>
export function slice<T> (items: Hash<T>, begin: number, end: number): Hash<T>
export function slice<T> (items: Hash<T>, begin: number = 0, end: Optional<number> = null) {
  const length = count(items)

  if (end === null) {
    end = length
  }

  const result: Hash<T> = {}

  if (begin < 0) {
    begin += length
  }

  if (end < 0) {
    end += length
  }

  for (const { key, index, value } of entries(items)) {
    if (index >= begin && index < end) {
      result[key] = value
    }
  }

  return result
}

// TODO: optional initialValue
export function reduce<TReturn, T> (items: Hash<T>, callback: (carry: TReturn, value: T, key: string, index: number, collection: Hash<T>) => TReturn, initialValue: TReturn) {
  let result: TReturn = initialValue

  for (const { key, index, value } of entries(items)) {
    result = callback(result, value, key, index, items)
  }

  return result
}

export function toArray<T> (items: Hash<T>): T[]
export function toArray<T> (items: Hash<Hash<T>>): T[][]
export function toArray<T> (items: Hash<T | Hash<T>>) {
  return Object.values(items).map((item) => {
    if (isObject(item)) {
      return toArray(<Hash<T>>item)
    }

    return <T>item
  })
}

export function chunk<T> (items: Hash<T>, size: number): Hash<T>[] {
  return range(0, Math.ceil(count(items) / size) - 1).reduce((chunks, n) => {
    return [...chunks, slice(items, n * size, (n + 1) * size)]
  }, <Hash<T>[]>[])
}

export function pipe<TReturn, T> (items: Hash<T>, callback: (collection: Hash<T>) => TReturn): TReturn {
  return callback(items)
}

export function filter<T> (items: Hash<T>, callback: HashCallback<boolean, T>): Hash<T> {
  const result: Hash = {}

  for (const { key, index, value } of entries(items)) {
    if (callback(value, key, index, items)) {
      result[key] = value
    }
  }

  return result
}

export function reject<T> (items: Hash<T>, callback: HashCallback<boolean, T>): Hash<T> {
  const result: Hash = {}

  for (const { key, index, value } of entries(items)) {
    if (!callback(value, key, index, items)) {
      result[key] = value
    }
  }

  return result
}

export function only<T> (items: Hash<T>, keys: string[]): Hash<T>
export function only<T> (items: Hash<T>, ...keys: string[]): Hash<T>
export function only<T> (items: Hash<T>, ...keys: string[] | string[][]) {
  const result: Hash = {}

  keys = <string[]>keys.flat(Infinity)

  for (const { key, value } of entries(items)) {
    if (keys.includes(key)) {
      result[key] = value
    }
  }

  return result
}

export function except<T> (items: Hash<T>, keys: string[]): Hash<T>
export function except<T> (items: Hash<T>, ...keys: string[]): Hash<T>
export function except<T> (items: Hash<T>, ...keys: string[] | string[][]) {
  const result: Hash = {}

  keys = <string[]>keys.flat(Infinity)

  for (const { key, value } of entries(items)) {
    if (!keys.includes(key)) {
      result[key] = value
    }
  }

  return result
}

export function isEmpty (items: Hash): boolean {
  return !count(items)
}

export function isNotEmpty (items: Hash): boolean {
  return !isEmpty(items)
}

export function first<T> (items: Hash<T>): T
export function first<T> (items: Hash<T>, callback: HashCallback<boolean, T>): T
export function first<T> (items: Hash<T>, callback: Optional<HashCallback<boolean, T>> = null) {
  if (!count(items)) {
    return null
  }

  if (!callback) {
    return Object.values(items)[0]
  }

  for (const { key, index, value } of entries(items)) {
    if (callback(value, key, index, items)) {
      return value
    }
  }

  return null
}

export function last<T> (items: Hash<T>): Hash<T>
export function last<T> (items: Hash<T>, callback: HashCallback<boolean, T>): Hash<T>
export function last<T> (items: Hash<T>, callback: Optional<HashCallback<boolean, T>> = null) {
  const length = count(items)

  if (!length) {
    return null
  }

  if (!callback) {
    return Object.values(items)[length - 1]
  }

  let result = null

  for (const { key, index, value } of entries(items)) {
    if (callback(value, key, index, items)) {
      result = value
    }
  }

  return result
}

export function map<TReturn, T> (items: Hash<T>, callback: HashCallback<TReturn, T>): Hash<TReturn> {
  const result: Hash<TReturn> = {}

  for (const { key, index, value } of entries(items)) {
    result[key] = callback(value, key, index, items)
  }

  return result
}

export function mapWithKeys<TReturn, T> (items: Hash<T>, callback: HashCallback<Hash<TReturn>, T>): Hash<TReturn> {
  let result: Hash<TReturn> = {}

  for (const { key, index, value } of entries(items)) {
    result = { ...result, ...callback(value, key, index, items) }
  }

  return result
}

export function flatMap<TReturn, T> (items: Hash<T>, callback: HashCallback<Hash<TReturn>, T>): Hash<TReturn> {
  return mapWithKeys(items, callback)
}

export function flatten<T> (items: Hash<T>): T[]
export function flatten<T> (items: Hash<T>, depth: number): T[]
export function flatten<T> (items: Hash<T>, depth: number = Infinity) {
  return Arr.flatten(Object.values(items), depth)
}

export function min (items: Hash<number>): number {
  return Arr.min(Object.values(items))
}

export function max (items: Hash<number>): number {
  return Arr.max(Object.values(items))
}

// FIXME: duplicate code
export function pluck<TReturn, T extends Hash<unknown>> (items: Hash<T>, value: CollectionItemPath): TReturn[]
export function pluck<TReturn, T extends Hash<unknown>> (items: Hash<T>, value: CollectionItemPath, key: CollectionItemPath): Hash<TReturn>
export function pluck<TReturn, T extends Hash<unknown>> (items: Hash<T>, value: CollectionItemPath, callback: HashCallback<string, T>): Hash<TReturn>
export function pluck<TReturn, T extends Hash<unknown>> (items: Hash<T>, value: CollectionItemPath, key: Optional<CollectionItemPath | HashCallback<string, T>> = null) {
  const keyIsFunction: boolean = isFunction(key)
  const keyIsNull: boolean = key === null

  let result: Hash<TReturn> = {}

  for (const { index, key: k, value: row } of entries(items)) {
    const v = get<TReturn, unknown>(row, value)

    if (keyIsNull) {
      result = { ...result, [index]: v }
      continue
    }

    if (keyIsFunction) {
      result = { ...result, [(<HashCallback<string, T>>key)(row, k, index, items)]: v }
      continue
    }

    result = { ...result, [get<string, unknown>(row, <CollectionItemPath>key)]: v }
  }

  return keyIsNull ? Object.values(result) : result
}

export function swap<T> (items: Hash<T>, from: string, to: string): Hash<T> {
  const result = { ...items }
  const temp = result[from]

  result[from] = result[to]
  result[to] = temp

  return result
}

export function take<T> (items: Hash<T>, limit: number): Hash<T> {
  return slice(items, 0, limit)
}

// TODO: support itempath
export function unique<T> (items: Hash<T>): Hash<T>
export function unique<TIdentifier, T extends Hash<TIdentifier>> (items: Hash<T>, key: CollectionKey): Hash<T>
export function unique<TIdentifier, T extends Hash<TIdentifier>> (items: Hash<T>, callback: HashCallback<TIdentifier, T>): Hash<T>
export function unique<TIdentifier, T extends Hash<TIdentifier>> (items: Hash<T>, key: Optional<CollectionKey | HashCallback<TIdentifier, T>> = null) {
  const keyIsFunction: boolean = isFunction(key)
  const haystack: TIdentifier[] = []
  const result: Hash = {}

  for (const { key: k, index, value: row } of entries(items)) {
    const uniqueBy: TIdentifier = keyIsFunction ? (<HashCallback<TIdentifier, T>>key)(row, k, index, items) : get(row, <CollectionKey>key)

    if (!haystack.includes(uniqueBy)) {
      result[k] = row
      haystack.push(uniqueBy)
    }
  }

  return result
}

export function diff<T> (items: Hash<T>, compared: Collection<T>): Hash<T> {
  compared = Object.values(compared)

  return filter(items, item => !(<T[]>compared).includes(item))
}

export function diffKeys<T> (items: Hash<T>, compared: Hash<T>): Hash<T> {
  const comparedKeys = Object.keys(compared)

  return filter(items, (_, key) => !comparedKeys.includes(key))
}

export function intersect<T> (items: Hash<T>, compared: Collection<T>): Hash<T> {
  compared = Object.values(compared)

  return filter(items, item => (<T[]>compared).includes(item))
}

export function intersectByKeys<T> (items: Hash<T>, compared: Hash<T>): Hash<T> {
  const comparedKeys = Object.keys(compared)

  return filter(items, (_, key) => comparedKeys.includes(key))
}

export function merge<T> (items: Hash<T>, ...merged: Hash<T>[]): Hash<T> {
  return merged.reduce((result, right) => {
    return { ...result, ...right }
  }, items)
}

// TODO: support itempath
export function keyBy<T extends Hash<unknown>> (items: Hash<T>, key: CollectionKey): Hash<T>
export function keyBy<T extends Hash<unknown>> (items: Hash<T>, callback: HashCallback<string, T>): Hash<T>
export function keyBy<T extends Hash<unknown>> (items: Hash<T>, key: CollectionKey | HashCallback<string, T>) {
  const keyIsFunction: boolean = isFunction(key)
  const result: Hash<T> = {}

  for (const { key: k, index, value: row } of entries(items)) {
    result[keyIsFunction ? (<HashCallback<string, T>>key)(row, k, index, items) : get<string, unknown>(row, <CollectionKey>key)] = row
  }

  return result
}

// TODO: support itempath
export function groupBy<T extends Hash<unknown>> (items: Hash<T>, key: CollectionKey): Hash<Hash<T>>
export function groupBy<T extends Hash<unknown>> (items: Hash<T>, callback: HashCallback<string | string[], T>): Hash<Hash<T>>
export function groupBy<T extends Hash<unknown>> (items: Hash<T>, key: CollectionKey | HashCallback<string | string[], T>) {
  const keyIsFunction: boolean = isFunction(key)
  const result: Hash<Hash<T>> = {}

  for (const { key: k, index, value: row } of entries(items)) {
    let groups: string | string[] = keyIsFunction
      ? (<HashCallback<string | string[]>>key)(row, k, index, items)
      : get<string | string[], unknown>(row, <CollectionKey>key)

    if (!isArray(groups)) {
      groups = [<string>groups]
    }

    for (const group of <string[]>groups) {
      if (!result[group]) {
        result[group] = {}
      }

      result[group][k] = row
    }
  }

  return result
}

export function sort<T> (items: Hash<T>): Hash<T>
export function sort<T> (items: Hash<T>, compareFn: CompareFunction<T>): Hash<T>
export function sort<T> (items: Hash<T>, compareFn: Optional<CompareFunction<T>> = null) {
  return fromPairs(toPairs(items).sort((a, b) => {
    if (compareFn) {
      return compareFn(a.value, b.value)
    }

    return spaceship(a.value, b.value)
  }))
}

export function sortDesc<T> (items: Hash<T>): Hash<T> {
  return fromPairs(toPairs(items).sort((a, b) => spaceship(b.value, a.value)))
}

export function sortBy<T extends Hash<unknown>> (items: Hash<T>, key: CollectionItemPath): Hash<T>
export function sortBy<T extends Hash<unknown>> (items: Hash<T>, callback: HashCallback<unknown, T>): Hash<T>
export function sortBy<T extends Hash<unknown>> (items: Hash<T>, key: CollectionItemPath | HashCallback<unknown, T>) {
  const callback = isFunction(key) ? <HashCallback<unknown, T>>key : (item: T): unknown => get(item, <CollectionItemPath>key)
  const comparable = <Hash<unknown>>{}

  for (const { key, index, value } of entries(items)) {
    comparable[key] = callback(value, key, index, items)
  }

  return map(sort(comparable), (_, key) => items[key])
}

export function sortByDesc<T extends Hash<unknown>> (items: Hash<T>, key: CollectionItemPath): Hash<T>
export function sortByDesc<T extends Hash<unknown>> (items: Hash<T>, callback: HashCallback<unknown, T>): Hash<T>
export function sortByDesc<T extends Hash<unknown>> (items: Hash<T>, key: CollectionItemPath | HashCallback<unknown, T>) {
  // FIXME: type
  return reverse(sortBy(items, <CollectionItemPath>key))
}

export function index<T> (items: Hash<T>, needle: T): string | null {
  const haystack = Object.values(items)
  const result = haystack.indexOf(needle)

  if (result === -1) {
    return null
  }

  return Object.keys(items)[result]
}

export function append<T> (items: Hash<T>, value: T, key: string): Hash<T> {
  return { ...items, [key]: value }
}

export function prepend<T> (items: Hash<T>, value: T, key: string): Hash<T> {
  return { [key]: value, ...items }
}

export function insert<T> (items: Hash<T>, target: string, value: T, key: string): Hash<T> {
  const targetIndex = Arr.index(Object.keys(items), target) ?? count(items)

  return { ...slice(items, 0, targetIndex), [key]: value, ...slice(items, targetIndex) }
}

export function join (items: Hash<unknown>): string
export function join (items: Hash<unknown>, glue: string): string
export function join (items: Hash<unknown>, glue: string = ',') {
  return Object.values(items).join(glue)
}

export function partition<T> (items: Hash<T>, callback: HashCallback<boolean, T>): [Hash<T>, Hash<T>] {
  const result = <[Hash<T>, Hash<T>]>[{}, {}]

  for (const { key, index, value } of entries(items)) {
    const part: number = callback(value, key, index, items) ? 0 : 1

    result[part][key] = value
  }

  return result
}

export function flip (items: Hash<unknown>): Hash<string> {
  const result: Hash<string> = {}

  for (const { key, value } of entries(items)) {
    result[`${value}`] = key
  }

  return result
}

export function fill<T> (items: Hash<T>, value: T): Hash<T>
export function fill<T> (items: Hash<T>, value: T, start: number): Hash<T>
export function fill<T> (items: Hash<T>, value: T, start: number, end: number): Hash<T>
export function fill<T> (items: Hash<T>, value: T, start: number = 0, end: Optional<number> = null) {
  if (!end) {
    end = count(items)
  }

  const result: Hash<T> = {}

  for (const { key, index, value: item } of entries(items)) {
    result[key] = start <= index && index < end ? value : item
  }

  return result
}

export function freeze<T extends Hash> (items: T): Readonly<T> {
  return Object.freeze(items)
}

export function isFrozen (items: Hash): boolean {
  return Object.isFrozen(items)
}

export function reverse<T> (items: Hash<T>): Hash<T> {
  return Object.keys(items).reverse().reduce((result, key) => {
    return { ...result, [key]: items[key] }
  }, <Hash<T>>{})
}
