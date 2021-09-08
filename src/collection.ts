import { Optional } from './helpers'

export type List<T = any> = T[]
export type Hash<T = any> = { [key: string]: T }
export type Collection<T = any> = List<T> | Hash<T>
export type CollectionKey = number | string
export type CollectionItemPath = number | string | CollectionKey[]
export type IterableCallback<T = any, K = CollectionKey> = (value: any, key: K, index: number) => T
export type CompareFunction = (a: any, b: any) => number

interface FindResult {
  exists: boolean
  value: any
}

interface KeyValuePair {
  key: string
  value: any
}

function isFunction (value: any): boolean {
  return typeof value === 'function'
}

function isNumber (value: any): boolean {
  return typeof value === 'number' && isFinite(value)
}

function isArray (value: any): boolean {
  return value && Array.isArray(value)
}

function isObject (value: any): boolean {
  return value && typeof value === 'object' && value.constructor.name === 'Object'
}

function spaceship (a: any, b: any): number {
  if (a > b) {
    return 1
  }

  if (a < b) {
    return -1
  }

  return 0
}

function normalizeCallback (callback: Optional<IterableCallback<boolean>>): IterableCallback<boolean> {
  if (isFunction(callback)) {
    return <IterableCallback<boolean>>callback
  }

  return (value: any): boolean => !!value
}

function normalizeKey (key: CollectionItemPath): CollectionKey[] {
  if (!isArray(key)) {
    key = key.toString().replace(/^\[|\]/g, '').replace(/\[/g, '.').split('.')
  }

  return [...<CollectionKey[]>key]
}

function find (items: Collection, key: CollectionItemPath, defaultValue: Optional<any> = null): FindResult {
  key = normalizeKey(key)

  const segment = (<CollectionKey>key.shift()).toString()

  if (isArray(items)) {
    items = { ...items }
  }

  if (!contains(keys(items), segment)) {
    return {
      exists: false,
      value: defaultValue
    }
  }

  const target = items[segment]

  if (!key.length) {
    return {
      exists: true,
      value: target
    }
  }

  return find(target, key, defaultValue)
}

function _sort (
  items: Collection,
  callback: Optional<CompareFunction> = null,
  descending: boolean = false,
  afterSort: Optional<(pair: KeyValuePair) => KeyValuePair> = null
): Collection {
  let result: List = Object.values(map(items, (value, key) => ({ key, value })))

  result = result.sort((a, b) => {
    if (callback) {
      return (<CompareFunction>callback)(a.value, b.value)
    }

    return spaceship.apply(
      null,
      map(
        [a.value, b.value],
        (item: any) => isObject(item) ? Object.values(item) : item
      )
    ) * [1, -1][+descending]
  })

  if (afterSort) {
    result = result.map(afterSort)
  }

  return isObject(items) ? pluck(result, 'value', 'key') : pluck(result, 'value')
}

export function keys (items: List): List<number>
export function keys (items: Hash): List<string>
export function keys (items: Collection) {
  const keys: string[] = Object.keys(items)

  if (isArray(items)) {
    return keys.map((key: string): number => +key)
  }

  return keys
}

export function values (items: List): List
export function values (items: Hash): List
export function values (items: Collection) {
  return Object.values(items)
}

export function contains (haystack: Collection, needle: any): boolean {
  return Object.values(haystack).includes(needle)
}

export function count (items: Collection): number {
  return Object.keys(items).length
}

export function has (items: Collection, key: CollectionItemPath): boolean {
  return find(items, key).exists
}

export function get (items: Collection): any
export function get (items: Collection, key: CollectionItemPath): any
export function get (items: Collection, key: CollectionItemPath, defaultValue: any): any
export function get (items: Collection, key: Optional<CollectionItemPath> = null, defaultValue: Optional<any> = null) {
  if (key === null) {
    return items
  }

  return find(items, key, defaultValue).value
}

export function set (items: Hash, key: CollectionItemPath, value: any): Hash
export function set (items: List, key: CollectionItemPath, value: any): List
export function set (items: Collection, key: CollectionItemPath, value: any) {
  key = normalizeKey(key)

  let previous: Collection = items
  let previousKey: CollectionKey = <CollectionKey>key.shift()
  let current: any = items[previousKey]

  while (key.length) {
    const k: CollectionKey = <CollectionKey>key.shift()

    if (!isObject(current) && !isArray(current)) {
      previous[previousKey] = isNumber(+k) ? [] : {}
      current = previous[previousKey]
    }

    previousKey = k
    previous = current
    current = current[k]
  }

  previous[previousKey] = value

  return items
}

export function sum (items: Collection): number
export function sum (items: Collection, key: CollectionItemPath): number
export function sum (items: Collection, key: Optional<CollectionItemPath> = null) {
  if (key) {
    items = pluck(items, key)
  }

  return Object.values(items).reduce((carry: number, n: any) => carry + (+n || 0), 0)
}

export function avg (items: Collection): number | null
export function avg (items: Collection, key: CollectionItemPath): number | null
export function avg (items: Collection, key: Optional<CollectionItemPath> = null) {
  const c = count(items)

  if (!c) {
    return null
  }

  if (key) {
    items = pluck(items, key)
  }

  return sum(items) / c
}

// FIXME: typehint
export function each (items: List, callback: IterableCallback<boolean | void, number>): List
export function each (items: Hash, callback: IterableCallback<boolean | void, string>): Hash
export function each (items: Collection, callback) {
  const itemsIsArray: boolean = isArray(items)

  let index: number = 0
  let key: CollectionKey

  for (key in items) {
    if (itemsIsArray) {
      key = +key
    }

    if (callback(items[key], key, index++) === false) {
      break
    }
  }

  return items
}

export function slice (items: List): List
export function slice (items: Hash): Hash
export function slice (items: List, begin: number): List
export function slice (items: Hash, begin: number): Hash
export function slice (items: List, begin: number, end: number): List
export function slice (items: Hash, begin: number, end: number): Hash
export function slice (items: Collection, begin: number = 0, end: Optional<number> = null) {
  if (end === null) {
    end = count(items)
  }

  if (isArray(items)) {
    return items.slice(begin, end)
  }

  const result: Hash = {}

  if (begin < 0) {
    begin = count(items) + begin
  }

  if (end < 0) {
    end = count(items) + end
  }

  let index: number = 0

  for (const key in items) {
    const value = items[key]

    if (index >= begin && index < <number>end) {
      result[key] = value
    }

    index++
  }

  return result
}

// TODO: optional initialValue
export function reduce<T = any> (
  items: Collection,
  callback: (carry: T, value: any, key: CollectionKey, index: number) => T,
  initialValue: T
): T {
  const itemsIsArray: boolean = isArray(items)

  let result: T = initialValue
  let index: number = 0
  let key: CollectionKey

  for (key in items) {
    if (itemsIsArray) {
      key = +key
    }

    result = callback(result, items[key], key, index++)
  }

  return result
}

export function toArray (items: Collection): List {
  return reduce(
    items,
    (carry: any[], value: any) => [...carry, isObject(value) ? toArray(value) : value],
    []
  )
}

export function chunk (items: List, size: number): List<List>
export function chunk (items: Hash, size: number): List<Hash>
export function chunk (items: Collection, size: number) {
  return reduce(
    [...Array(Math.ceil(count(items) / size)).keys()],
    (carry: Collection[], n: number) => [...carry, slice(items, n * size, (n + 1) * size)],
    []
  )
}

export function filter (items: List): List
export function filter (items: Hash): Hash
export function filter (items: List, callback: IterableCallback<boolean>): List
export function filter (items: Hash, callback: IterableCallback<boolean>): Hash
export function filter (items: Collection, callback: Optional<IterableCallback<boolean>> = null) {
  const itemsIsArray: boolean = isArray(items)

  const result: Hash = {}
  let index: number = 0

  callback = normalizeCallback(callback)

  let key: CollectionKey

  for (key in items) {
    const value: any = items[key]

    if (itemsIsArray) {
      key = +key
    }

    if (callback(value, key, index++)) {
      result[key] = value
    }
  }

  return itemsIsArray ? Object.values(result) : result
}

export function except (items: List, ...keys: CollectionKey[] | CollectionKey[][]): List
export function except (items: Hash, ...keys: CollectionKey[] | CollectionKey[][]): Hash
export function except (items: Collection, ...keys: CollectionKey[] | CollectionKey[][]) {
  const itemsIsArray: boolean = isArray(items)

  const result: Object = {}

  keys = flatten(keys)

  let key: CollectionKey

  for (key in items) {
    if (itemsIsArray) {
      key = +key
    }

    if (!keys.includes(key)) {
      result[key] = items[key]
    }
  }

  return itemsIsArray ? Object.values(result) : result
}

export function isEmpty (items: Collection): boolean {
  return !count(items)
}

export function isNotEmpty (items: Collection): boolean {
  return !isEmpty(items)
}

export function first (items: Collection): any
export function first (items: Collection, callback: IterableCallback<boolean>): any
export function first (items: Collection, callback: Optional<IterableCallback<boolean>> = null) {
  if (callback) {
    items = filter(items, callback)
  }

  return isNotEmpty(items) ? Object.values(items)[0] : null
}

export function last (items: Collection): any
export function last (items: Collection, callback: IterableCallback<boolean>): any
export function last (items: Collection, callback: Optional<IterableCallback<boolean>> = null) {
  if (callback) {
    items = filter(items, callback)
  }

  return isNotEmpty(items) ? Object.values(items)[count(items) - 1] : null
}

export function map<T> (items: List, callback: IterableCallback<T>): List
export function map<T> (items: Hash, callback: IterableCallback<T>): Hash
export function map<T> (items: Collection, callback: IterableCallback<T>): Collection {
  const itemsIsArray: boolean = isArray(items)

  const result: Hash<T> = {}
  let index: number = 0
  let key: CollectionKey

  for (key in items) {
    if (itemsIsArray) {
      key = +key
    }

    result[key] = callback(items[key], key, index++)
  }

  return isObject(items) ? result : Object.values(result)
}

export function mapWithKeys (items: Collection, callback: IterableCallback<Hash>): Hash {
  const itemsIsArray: boolean = isArray(items)

  let result: Hash = {}
  let index: number = 0
  let key: CollectionKey

  for (key in items) {
    if (itemsIsArray) {
      key = +key
    }

    result = { ...result, ...callback(items[key], key, index++) }
  }

  return result
}

export function flatten (items: Collection): List
export function flatten (items: Collection, depth: number): List
export function flatten (items: Collection, depth: number = Infinity) {
  let result: any[] = []

  for (const key in items) {
    const item: any = items[key]

    if (!isArray(item) && !isObject(item)) {
      result.push(item)

      continue
    }

    if (depth === 1) {
      result = [...result, ...values(item)]

      continue
    }

    result = [...result, ...flatten(item, depth - 1)]
  }

  return result
}

export function min (items: List<number>): number
export function min (items: Hash<number>): number
export function min (items: Collection<number>) {
  return Math.min(...Object.values(items))
}

export function max (items: List<number>): number
export function max (items: Hash<number>): number
export function max (items: Collection<number>) {
  return Math.max(...Object.values(items))
}

export function only (items: List, ...keys: CollectionKey[] | CollectionKey[][]): List
export function only (items: Hash, ...keys: CollectionKey[] | CollectionKey[][]): Hash
export function only (items: Collection, ...keys: CollectionKey[] | CollectionKey[][]) {
  const itemsIsArray: boolean = isArray(items)

  const result: Object = {}

  keys = flatten(keys)

  let key: CollectionKey

  for (key in items) {
    if (itemsIsArray) {
      key = +key
    }

    if (keys.includes(key)) {
      result[key] = items[key]
    }
  }

  return isObject(items) ? result : Object.values(result)
}

// FIXME: typehint
export function pipe (items: List, callback: (items: List) => any): any
export function pipe (items: Hash, callback: (items: Hash) => any): any
export function pipe (items: Collection, callback) {
  return callback(items)
}

export function pluck (items: Collection, value: CollectionItemPath): List
export function pluck (items: Collection, value: CollectionItemPath, key: CollectionItemPath): Hash
export function pluck (items: Collection, value: CollectionItemPath, key: IterableCallback<string>): Hash
export function pluck (items: Collection, value: CollectionItemPath, key: Optional<CollectionItemPath | IterableCallback<string>> = null) {
  const keyIsFunction: boolean = isFunction(key)
  const keyIsNull: boolean = key === null
  const itemsIsArray: boolean = isArray(items)
  let result: Collection = keyIsNull ? [] : {}
  let index: number = 0
  let k: CollectionKey

  for (k in items) {
    if (itemsIsArray) {
      k = +k
    }

    const row: any = items[k]
    const v: any = get(row, value)

    if (keyIsNull) {
      result = [...<any[]>result, v]
      continue
    }

    if (keyIsFunction) {
      result = { ...result, [(<IterableCallback<string>>key)(row, k, index++)]: v }
      continue
    }

    result = { ...result, [get(row, key)]: v }
  }

  return result
}

export function reject (items: List, callback: IterableCallback<boolean>): List
export function reject (items: Hash, callback: IterableCallback<boolean>): Hash
export function reject (items: Collection, callback: IterableCallback<boolean>) {
  const itemsIsArray: boolean = isArray(items)

  const result: Hash = {}
  let index: number = 0
  let key: CollectionKey

  callback = normalizeCallback(callback)

  for (key in items) {
    if (itemsIsArray) {
      key = +key
    }

    if (!callback(items[key], key, index++)) {
      result[key] = items[key]
    }
  }

  return isObject(items) ? result : Object.values(result)
}

export function swap (items: List, from: number, to: number): List
export function swap (items: Hash, from: string, to: string): Hash
export function swap (items: Collection, from: CollectionKey, to: CollectionKey) {
  const result: Collection = slice(items)
  const temp: any = result[from]

  result[from] = result[to]
  result[to] = temp

  return result
}

export function shuffle (items: List): List
export function shuffle (items: Hash): Hash
export function shuffle (items: Collection): Collection {
  if (isObject(items)) {
    return items
  }

  const length: number = count(items)
  let result: List = <List>slice(items)

  for (let i = 0; i < length; i++) {
    const target: number = Math.floor(Math.random() * length)

    result = swap(result, i, target)
  }

  return result
}

export function take (items: List, limit: number): List
export function take (items: Hash, limit: number): Hash
export function take (items: Collection, limit: number) {
  return slice(items, 0, limit)
}

// TODO: itempath
export function unique (items: List): List
export function unique (items: List, key: CollectionKey): List
export function unique (items: List, key: IterableCallback): List
export function unique (items: Hash): Hash
export function unique (items: Hash, key: CollectionKey): Hash
export function unique (items: Hash, key: IterableCallback): Hash
export function unique (items: Collection, key: Optional<CollectionKey | IterableCallback> = null): Collection {
  const keyIsFunction: boolean = isFunction(key)
  const itemsIsArray: boolean = isArray(items)
  const haystack: any[] = []
  const result: Hash = {}
  let index: number = 0
  let k: CollectionKey

  for (k in items) {
    if (itemsIsArray) {
      k = +k
    }

    const row: any = items[k]
    const uniqueBy: any = keyIsFunction ? (<IterableCallback>key)(row, k, index++) : get(row, key)

    if (!haystack.includes(uniqueBy)) {
      result[k] = row

      haystack.push(uniqueBy)
    }
  }

  return isObject(items) ? result : Object.values(result)
}

export function diff (items: List, compared: Collection): List
export function diff (items: Hash, compared: Collection): Hash
export function diff (items: Collection, compared: Collection) {
  return filter(items, item => !contains(compared, item))
}

export function diffKeys (items: List, compared: Collection): Hash
export function diffKeys (items: Hash, compared: Collection): Hash
export function diffKeys (items: Collection, compared: Collection): Hash {
  const comparedKeys: string[] = Object.keys(compared)

  return filter({ ...items }, (_, key) => !contains(comparedKeys, key))
}

export function intersect (items: List, compared: Collection): List
export function intersect (items: Hash, compared: Collection): Hash
export function intersect (items: Collection, compared: Collection) {
  return filter(items, item => contains(compared, item))
}

export function intersectByKeys (items: List, compared: Collection): Hash
export function intersectByKeys (items: Hash, compared: Collection): Hash
export function intersectByKeys (items: Collection, compared: Collection): Hash {
  const comparedKeys: string[] = Object.keys(compared)

  return filter({ ...items }, (_, key) => contains(comparedKeys, key))
}

export function merge (items: List, ...merged: List[]): List
export function merge (items: List, ...merged: Hash[]): Hash
export function merge (items: Hash, ...merged: List[]): Hash
export function merge (items: Hash, ...merged: Hash[]): Hash
export function merge (items: Collection, ...merged: Collection[]) {
  function _merge (items: Collection, merged: Collection, flag: number): { flag: number, result: Collection } {
    const mergedIsArray: boolean = isArray(merged)

    let result: Hash = { ...items }

    for (const key in merged) {
      result = { ...result, [mergedIsArray ? flag++ : key]: merged[key] }
    }

    return {
      flag,
      result: isObject(items) || isObject(merged) ? result : Object.values(result)
    }
  }

  let result: Collection = items
  let flag: number = isArray(items) ? count(items) : 0

  for (const key in merged) {
    ({ result, flag } = _merge(result, merged[key], flag))
  }

  return result
}

// TODO: itempath
export function keyBy (items: Collection, key: CollectionKey): Hash
export function keyBy (items: Collection, key: IterableCallback<string>): Hash
export function keyBy (items: Collection, key: CollectionKey | IterableCallback<string>): Hash {
  const keyIsFunction: boolean = isFunction(key)
  const itemsIsArray: boolean = isArray(items)
  const result: Object = {}
  let index: number = 0
  let k: CollectionKey

  for (k in items) {
    if (itemsIsArray) {
      k = +k
    }

    const row = items[k]

    result[keyIsFunction ? (<IterableCallback<string>>key)(row, k, index++) : get(row, key)] = row
  }

  return result
}

// TODO: itempath
export function groupBy (items: Collection, key: CollectionKey): Hash
export function groupBy (items: Collection, key: IterableCallback<string>): Hash
export function groupBy (items: Collection, key: CollectionKey | IterableCallback<string>) {
  const keyIsFunction: boolean = isFunction(key)
  const itemsIsArray: boolean = isArray(items)
  const result: Object = {}
  let index: number = 0
  let k: CollectionKey

  for (k in items) {
    if (itemsIsArray) {
      k = +k
    }

    const row: any = items[k]
    let groups = keyIsFunction ? (<IterableCallback<string>>key)(row, k, index++) : get(row, key)

    if (!isArray(groups)) {
      groups = [groups]
    }

    for (const gk in groups) {
      const group = groups[gk]

      if (!result[group]) {
        result[group] = itemsIsArray ? [] : {}
      }

      itemsIsArray ? (<any[]>result[group]).push(row) : result[group][k] = row
    }
  }

  return result
}

export function sort (items: List): List
export function sort (items: Hash): Hash
export function sort (items: List, callback: CompareFunction): List
export function sort (items: Hash, callback: CompareFunction): Hash
export function sort (items: Collection, callback: Optional<CompareFunction> = null) {
  if (isArray(items) && callback) {
    return items.sort(callback)
  }

  return _sort(items, callback)
}

export function sortDesc (items: List): List
export function sortDesc (items: Hash): Hash
export function sortDesc (items: Collection) {
  return _sort(items, null, true)
}

// FIXME: typehint
export function sortBy (items: List, callback: CollectionItemPath): List
export function sortBy (items: Hash, callback: CollectionItemPath): Hash
export function sortBy (items: List, callback: IterableCallback<any, number>): List
export function sortBy (items: Hash, callback: IterableCallback<any, string>): Hash
export function sortBy (items: List, callback: CollectionItemPath, descending: boolean): List
export function sortBy (items: Hash, callback: CollectionItemPath, descending: boolean): Hash
export function sortBy (items: List, callback: IterableCallback<any, number>, descending: boolean): List
export function sortBy (items: Hash, callback: IterableCallback<any, string>, descending: boolean): Hash
export function sortBy (items: Collection, callback, descending: boolean = false) {
  if (!isFunction(callback)) {
    const key: CollectionItemPath = <CollectionItemPath>callback

    callback = item => get(item, key)
  }

  return _sort(
    map(items, (value, key, index) => (<IterableCallback>callback)(value, key, index)),
    null,
    descending,
    ({ key }) => ({ key, value: items[key] })
  )
}

// FIXME: typehint
export function sortByDesc (items: List, callback: CollectionItemPath): List
export function sortByDesc (items: Hash, callback: CollectionItemPath): Hash
export function sortByDesc (items: List, callback: IterableCallback<any, number>): List
export function sortByDesc (items: Hash, callback: IterableCallback<any, string>): Hash
export function sortByDesc (items: Collection, callback) {
  return sortBy(items, callback, true)
}

export function append (items: List, value: any): List
export function append (items: Hash, value: any, key: string): Hash
export function append (items: Collection, value: any, key: Optional<string> = null) {
  return isArray(items) ? [...<List>items, value] : { ...items, [<string>key]: value }
}

export function prepend (items: List, value: any): List
export function prepend (items: Hash, value: any, key: string): Hash
export function prepend (items: Collection, value: any, key: Optional<string> = null) {
  return isArray(items) ? [value, ...<List>items] : { [<string>key]: value, ...items }
}

export function index (items: List, needle: any): number | null
export function index (items: Hash, needle: any): string | null
export function index (items: Collection, needle: any) {
  const haystack = Object.values(items)
  const result = haystack.indexOf(needle)

  if (result === -1) {
    return null
  }

  return isObject(items) ? Object.keys(items)[result] : result
}

export function insert (items: List, target: number, value: any): List
export function insert (items: Hash, target: string, value: any, key: string): Hash
export function insert (items: Collection, target: CollectionKey, value: any, key: Optional<string> = null) {
  if (isArray(items)) {
    return [...slice(<List>items, 0, <number>target), value, ...slice(<List>items, <number>target)]
  }

  target = index(Object.keys(items), target) ?? count(items)

  return { ...slice(items, 0, target), [<string>key]: value, ...slice(items, target) }
}

export function join (items: Collection, glue: string = ', '): string {
  if (isObject(items)) {
    items = Object.values(items)
  }

  return items.join(glue)
}

export function partition (items: List, callback): List<List>
export function partition (items: Hash, callback): List<Hash>
export function partition (items: Collection, callback) {
  const itemsIsArray: boolean = isArray(items)

  const result: List<Collection> = itemsIsArray ? [[], []] : [{}, {}]
  let index: number = 0
  let key: CollectionKey

  for (key in items) {
    if (itemsIsArray) {
      key = +key
    }

    const value: any = items[key]
    const part: number = +!callback(value, key, index++)

    itemsIsArray ? (<List>result[part]).push(value) : result[part][key] = value
  }

  return result
}

export function flip (items: Collection): Hash {
  const itemsIsArray: boolean = isArray(items)

  const result: Hash = {}

  for (const key in items) {
    result[items[key]] = itemsIsArray ? +key : key
  }

  return result
}

export function fill (items: List, value: any): List
export function fill (items: Hash, value: any): Hash
export function fill (items: List, value: any, start: number): List
export function fill (items: Hash, value: any, start: number): Hash
export function fill (items: List, value: any, start: number, end: number): List
export function fill (items: Hash, value: any, start: number, end: number): Hash
export function fill (items: Collection, value: any, start: number = 0, end: Optional<number> = null) {
  if (!end) {
    end = count(items)
  }

  if (isArray(items)) {
    return (<List>items).fill(value, start, end)
  }

  let index: number = 0
  const result: Hash = {}

  for (const key in items) {
    result[key] = start <= index && index < end ? value : items[key]
    index++
  }

  return result
}

export function freeze (items: List): List
export function freeze (items: Hash): Hash
export function freeze (items: Collection) {
  return Object.freeze(items)
}

export function isFrozen (items: Collection): boolean {
  return Object.isFrozen(items)
}

export function flatMap<T = any> (items: Collection, callback: IterableCallback<List<T>>): List<T>
export function flatMap<T = any> (items: Collection, callback: IterableCallback<Hash<T>>): Hash<T>
export function flatMap<T = any> (items: Collection, callback: IterableCallback<Collection<T>>) {
  let result: Collection = []
  let index: number = 0

  for (const key in items) {
    result = merge(result, callback(items[key], isNumber(+key) ? +key : key, index++))
  }

  return result
}

export const methods = {
  keys,
  values,
  contains,
  count,
  has,
  get,
  set,
  sum,
  avg,
  each,
  slice,
  reduce,
  toArray,
  chunk,
  except,
  filter,
  isEmpty,
  isNotEmpty,
  first,
  last,
  map,
  mapWithKeys,
  flatten,
  min,
  max,
  only,
  pipe,
  pluck,
  reject,
  swap,
  shuffle,
  take,
  unique,
  diff,
  diffKeys,
  intersect,
  intersectByKeys,
  merge,
  keyBy,
  groupBy,
  sort,
  sortDesc,
  sortBy,
  sortByDesc,
  append,
  prepend,
  index,
  insert,
  join,
  partition,
  flip,
  fill,
  freeze,
  isFrozen,
  flatMap
}

export function call (method: string, items: any, ...args): any {
  if ((!isArray(items) && !isObject(items)) ||
      (isObject(items) && method in items)) {
    return items[method](...args)
  }

  return methods[method](items, ...args)
}
