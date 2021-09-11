import {
  Optional,
  isArray,
  isObject,
  isFunction,
  isNumber,
  spaceship
} from '../helpers'

export type List<T = any> = T[]
export type Hash<T = any> = { [key: string]: T }
export type Collection<T = any> = List<T> | Hash<T>
export type CollectionKey = number | string
export type CollectionItemPath = number | string | CollectionKey[]
export type CollectionCallback<T = any, K = any> = (value: any, key: K, index: number) => T
export type ListCallback<T = any> = CollectionCallback<T, number>
export type HashCallback<T = any> = CollectionCallback<T, string>
export type CompareFunction = (a: any, b: any) => number

interface FindResult {
  exists: boolean
  value: any
}

interface KeyValuePair {
  key: string
  value: any
}

interface Entry<K = CollectionKey> {
  key: K
  index: number
  value: any
}

function entries (iterable: List): Generator<Entry<number>>
function entries (iterable: Hash): Generator<Entry<string>>
function* entries (iterable: Collection): Generator<Entry> {
  const iterableIsArray: boolean = isArray(iterable)

  if (iterableIsArray) {
    for (let key = 0; key < iterable.length; key++) {
      yield <Entry<number>>{ key, index: key, value: (<List>iterable)[key] }
    }
    return
  }

  let index: number = 0

  for (const key in iterable) {
    yield <Entry<string>>{ key, index: index++, value: (<Hash>iterable)[key] }
  }
}

function normalizeCallback (callback: Optional<CollectionCallback<boolean>>): CollectionCallback<boolean> {
  if (isFunction(callback)) {
    return <CollectionCallback<boolean>>callback
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

  const target = (<Hash>items)[segment]

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
        (item: unknown) => isObject(item) ? Object.values(<Hash>item) : item
      )
    ) * [1, -1][+descending]
  })

  if (afterSort) {
    result = result.map(afterSort)
  }

  return isObject(items) ? pluck(result, 'value', 'key') : pluck(result, 'value')
}

function _sortBy (
  items: Collection,
  callback: CollectionCallback | CollectionItemPath,
  descending: boolean = false
): Collection {
  if (!isFunction(callback)) {
    const key: CollectionItemPath = <CollectionItemPath>callback

    callback = (item: Collection) => get(item, key)
  }

  return _sort(
    map(items, (item, key, index) => (<CollectionCallback>callback)(item, key, index)),
    null,
    descending,
    // FIXME: type hint
    ({ key }) => ({ key, value: (<Hash>items)[key] })
  )
}

export function keys (items: List): List<number>
export function keys (items: Hash): List<string>
export function keys (items: Collection) {
  if (isObject(items)) {
    return Object.keys(items)
  }

  return Object.keys(items).map((key: string): number => +key)
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

  // FIXME: type hint
  let previous: Hash = items
  let previousKey: CollectionKey = <CollectionKey>key.shift()
  // FIXME: type hint
  let current: Hash = previous[previousKey]

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

  return (<List<number>>Object.values(items)).reduce((carry: number, n: number) => carry + (+n || 0), 0)
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

export function each (items: List, callback: ListCallback<boolean | void>): List
export function each (items: Hash, callback: HashCallback<boolean | void>): Hash
export function each (items: Collection, callback: CollectionCallback<boolean | void>) {
  for (const { key, index, value } of entries(items)) {
    if (callback(value, key, index) === false) {
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

  for (const { key, index, value } of entries(items)) {
    if (index >= begin && index < <number>end) {
      result[key] = value
    }
  }

  return result
}

// FIXME: type hint
// TODO: optional initialValue
export function reduce<T = any> (
  items: Collection,
  callback: (carry: T, value: any, key: CollectionKey, index: number) => T,
  initialValue: T
): T {
  let result: T = initialValue

  for (const { key, index, value } of entries(items)) {
    result = callback(result, value, key, index)
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
export function filter (items: List, callback: ListCallback<boolean>): List
export function filter (items: Hash, callback: HashCallback<boolean>): Hash
export function filter (items: Collection, callback: Optional<CollectionCallback<boolean>> = null) {
  const itemsIsArray: boolean = isArray(items)

  const result: Hash = {}

  callback = normalizeCallback(callback)

  for (const { key, index, value } of entries(items)) {
    if (callback(value, key, index)) {
      result[key] = value
    }
  }

  return itemsIsArray ? Object.values(result) : result
}

export function only (items: List, keys: CollectionKey[]): List
export function only (items: Hash, keys: CollectionKey[]): Hash
export function only (items: List, ...keys: CollectionKey[]): List
export function only (items: Hash, ...keys: CollectionKey[]): Hash
export function only (items: Collection, ...keys: CollectionKey[] | CollectionKey[][]) {
  const itemsIsArray: boolean = isArray(items)

  const result: Hash = {}

  keys = flatten(keys)

  for (const { key, value } of entries(items)) {
    if (keys.includes(key)) {
      result[key] = value
    }
  }

  return itemsIsArray ? Object.values(result) : result
}

export function except (items: List, keys: CollectionKey[]): List
export function except (items: Hash, keys: CollectionKey[]): Hash
export function except (items: List, ...keys: CollectionKey[]): List
export function except (items: Hash, ...keys: CollectionKey[]): Hash
export function except (items: Collection, ...keys: CollectionKey[] | CollectionKey[][]) {
  const itemsIsArray: boolean = isArray(items)

  const result: Hash = {}

  keys = flatten(keys)

  for (const { key, value } of entries(items)) {
    if (!keys.includes(key)) {
      result[key] = value
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
export function first (items: List, callback: ListCallback<boolean>): any
export function first (items: Hash, callback: HashCallback<boolean>): any
export function first (items: Collection, callback: Optional<CollectionCallback<boolean>> = null) {
  if (callback) {
    items = filter(items, <typeof items extends List ? ListCallback<boolean> : HashCallback<boolean>>callback)
  }

  return isNotEmpty(items) ? Object.values(items)[0] : null
}

export function last (items: Collection): any
export function last (items: List, callback: ListCallback<boolean>): any
export function last (items: Hash, callback: HashCallback<boolean>): any
export function last (items: Collection, callback: Optional<CollectionCallback<boolean>> = null) {
  if (callback) {
    items = filter(items, <typeof items extends List ? ListCallback<boolean> : HashCallback<boolean>>callback)
  }

  return isNotEmpty(items) ? Object.values(items)[count(items) - 1] : null
}

export function map<T = any> (items: List, callback: ListCallback<T>): List
export function map<T = any> (items: Hash, callback: HashCallback<T>): Hash
export function map<T = any> (items: Collection, callback: CollectionCallback<T>) {
  const result: Hash<T> = {}

  for (const { key, index, value } of entries(items)) {
    result[key] = callback(value, key, index)
  }

  return isArray(items) ? Object.values(result) : result
}

export function mapWithKeys<T = any> (items: List, callback: ListCallback<Hash<T>>): Hash<T>
export function mapWithKeys<T = any> (items: Hash, callback: HashCallback<Hash<T>>): Hash<T>
export function mapWithKeys<T = any> (items: Collection, callback: CollectionCallback<Hash<T>>) {
  let result: Hash<T> = {}

  for (const { key, index, value } of entries(items)) {
    result = { ...result, ...callback(value, key, index) }
  }

  return result
}

export function flatMap<T = any> (items: List, callback: ListCallback<List<T>>): List<T>
export function flatMap<T = any> (items: List, callback: ListCallback<Hash<T>>): Hash<T>
export function flatMap<T = any> (items: Hash, callback: HashCallback<List<T>>): Hash<T>
export function flatMap<T = any> (items: Hash, callback: HashCallback<Hash<T>>): Hash<T>
export function flatMap<T = any> (items: Collection, callback: CollectionCallback<Collection<T>>) {
  let result: Collection<T> = []

  for (const { key, index, value } of entries(items)) {
    result = merge(result, callback(value, key, index))
  }

  return result
}

export function flatten (items: Collection): List
export function flatten (items: Collection, depth: number): List
export function flatten (items: Collection, depth: number = Infinity) {
  let result: List = []

  for (const item of Object.values(items)) {
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

// FIXME: typehint
export function pipe (items: List, callback: (items: List) => any): any
export function pipe (items: Hash, callback: (items: Hash) => any): any
export function pipe (items: Collection, callback: ((items: List) => any) | ((items: Hash) => any)) {
  return callback(items)
}

export function pluck (items: Collection, value: CollectionItemPath): List
export function pluck (items: Collection, value: CollectionItemPath, key: CollectionItemPath): Hash
export function pluck (items: Collection, value: CollectionItemPath, callback: CollectionCallback<string>): Hash
export function pluck (items: Collection, value: CollectionItemPath, key: Optional<CollectionItemPath | CollectionCallback<string>> = null) {
  const keyIsFunction: boolean = isFunction(key)
  const keyIsNull: boolean = key === null
  let result: Collection = keyIsNull ? [] : {}

  for (const { key: k, index, value: row } of entries(items)) {
    const v: any = get(row, value)

    if (keyIsNull) {
      result = [...<List>result, v]
      continue
    }

    if (keyIsFunction) {
      result = { ...result, [(<CollectionCallback<string>>key)(row, k, index)]: v }
      continue
    }

    result = { ...result, [get(row, key)]: v }
  }

  return result
}

export function reject (items: List, callback: ListCallback<boolean>): List
export function reject (items: Hash, callback: HashCallback<boolean>): Hash
export function reject (items: Collection, callback: CollectionCallback<boolean>) {
  const result: Hash = {}

  callback = normalizeCallback(callback)

  for (const { key, index, value } of entries(items)) {
    if (!callback(value, key, index)) {
      result[key] = value
    }
  }

  return isArray(items) ? Object.values(result) : result
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

// TODO: support itempath
export function unique (items: List): List
export function unique (items: List, key: CollectionKey): List
export function unique (items: List, callback: ListCallback): List
export function unique (items: Hash): Hash
export function unique (items: Hash, key: CollectionKey): Hash
export function unique (items: Hash, callback: HashCallback): Hash
export function unique (items: Collection, key: Optional<CollectionKey | CollectionCallback> = null): Collection {
  const keyIsFunction: boolean = isFunction(key)
  const haystack: List = []
  const result: Hash = {}

  for (const { key: k, index, value: row } of entries(items)) {
    const uniqueBy: any = keyIsFunction ? (<CollectionCallback>key)(row, k, index) : get(row, key)

    if (!haystack.includes(uniqueBy)) {
      result[k] = row

      haystack.push(uniqueBy)
    }
  }

  return isArray(items) ? Object.values(result) : result
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
  let result: Collection = items
  let flag: number = isArray(items) ? count(items) : 0

  for (const right of merged) {
    const rightIsArray: boolean = isArray(right)

    let left: Hash = { ...result }

    for (const { key, value } of entries(right)) {
      left = { ...left, [rightIsArray ? flag++ : key]: value }
    }

    result = isObject(result) || isObject(right) ? left : Object.values(left)
  }

  return result
}

// TODO: support itempath
export function keyBy (items: Collection, key: CollectionKey): Hash
export function keyBy (items: List, callback: ListCallback<string>): Hash
export function keyBy (items: Hash, callback: HashCallback<string>): Hash
export function keyBy (items: Collection, key: CollectionKey | CollectionCallback<string>): Hash {
  const keyIsFunction: boolean = isFunction(key)
  const result: Hash = {}

  for (const { key: k, index, value: row } of entries(items)) {
    result[keyIsFunction ? (<CollectionCallback<string>>key)(row, k, index) : get(row, key)] = row
  }

  return result
}

// TODO: support itempath
export function groupBy (items: Collection, key: CollectionKey): Hash
export function groupBy (items: List, callback: ListCallback<string>): Hash
export function groupBy (items: Hash, callback: HashCallback<string>): Hash
export function groupBy (items: Collection, key: CollectionKey | CollectionCallback<string>) {
  const keyIsFunction: boolean = isFunction(key)
  const itemsIsArray: boolean = isArray(items)
  const result: Hash<Collection> = {}

  for (const { key: k, index, value: row } of entries(items)) {
    let groups = keyIsFunction ? (<CollectionCallback<string>>key)(row, k, index) : get(row, key)

    if (!isArray(groups)) {
      groups = [groups]
    }

    for (const group of groups) {
      if (!result[group]) {
        result[group] = itemsIsArray ? [] : {}
      }

      itemsIsArray ? (<List>result[group]).push(row) : (<Hash>result[group])[k] = row
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

export function sortBy (items: List, callback: ListCallback): List
export function sortBy (items: Hash, callback: HashCallback): Hash
export function sortBy (items: List, key: CollectionItemPath): List
export function sortBy (items: Hash, key: CollectionItemPath): Hash
export function sortBy (items: List, callback: ListCallback, descending: boolean): List
export function sortBy (items: Hash, callback: HashCallback, descending: boolean): Hash
export function sortBy (items: List, key: CollectionItemPath, descending: boolean): List
export function sortBy (items: Hash, key: CollectionItemPath, descending: boolean): Hash
export function sortBy (items: Collection, callback: CollectionCallback | CollectionItemPath, descending: boolean = false) {
  return _sortBy(items, callback, descending)
}

export function sortByDesc (items: List, callback: ListCallback): List
export function sortByDesc (items: Hash, callback: HashCallback): Hash
export function sortByDesc (items: List, key: CollectionItemPath): List
export function sortByDesc (items: Hash, key: CollectionItemPath): Hash
export function sortByDesc (items: Collection, callback: CollectionCallback | CollectionItemPath) {
  return _sortBy(items, callback, true)
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

  return isArray(items) ? result : Object.keys(items)[result]
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

export function partition (items: List, callback: ListCallback<boolean>): List<List>
export function partition (items: Hash, callback: HashCallback<boolean>): List<Hash>
export function partition (items: Collection, callback: CollectionCallback<boolean>) {
  const itemsIsArray: boolean = isArray(items)

  const result: List<Collection> = itemsIsArray ? [[], []] : [{}, {}]

  for (const { key, index, value } of entries(items)) {
    const part: number = callback(value, key, index) ? 0 : 1

    itemsIsArray ? (<List>result[part]).push(value) : (<Hash>result[part])[key] = value
  }

  return result
}

export function flip (items: Collection): Hash {
  const result: Hash = {}

  for (const { key, value } of entries(items)) {
    result[value] = key
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

  const result: Hash = {}

  for (const { key, index, value: item } of entries(items)) {
    result[key] = start <= index && index < end ? value : item
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
