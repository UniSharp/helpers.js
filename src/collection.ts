import {
  Optional,
  ValueOf,
  isArray,
  isObject,
  isFunction,
  isNumber,
  spaceship
} from './helpers'

export type Hash<T = any> = { [key: string]: T }
export type Collection<T = any> = T[] | Hash<T>
export type CollectionKey = number | string
export type CollectionItemPath = number | string | CollectionKey[]
// FIXME: typehint
export type CollectionCallback<TR = any, T = any, K = any> = (value: T, key: K, index: number) => TR
export type ArrayCallback<TR = any, T = any> = CollectionCallback<TR, T, number>
export type HashCallback<TR = any, T = any> = CollectionCallback<TR, T, string>
export type CompareFunction<T = any> = (a: T, b: T) => number

interface FindResult {
  exists: boolean
  value: any
}

interface KeyValuePair {
  key: string
  value: any
}

interface Entry<T = any, K = CollectionKey> {
  key: K
  index: number
  value: T
}

function entries<C extends any[]> (iterable: C): Generator<Entry<ValueOf<C>, number>>
function entries<C extends Hash> (iterable: C): Generator<Entry<ValueOf<C>, string>>
function* entries<C extends Collection> (iterable: C): Generator<Entry<ValueOf<C>>> {
  const iterableIsArray: boolean = isArray(iterable)

  if (iterableIsArray) {
    for (let key = 0; key < iterable.length; key++) {
      yield <Entry<ValueOf<C>, number>>{ key, index: key, value: (<ValueOf<C>[]>iterable)[key] }
    }
    return
  }

  let index: number = 0

  for (const key in iterable) {
    yield <Entry<ValueOf<C>, string>>{ key, index: index++, value: (<Hash<ValueOf<C>>>iterable)[key] }
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

function _sort<C extends Collection> (
  items: C,
  callback: Optional<CompareFunction<ValueOf<C>>> = null,
  descending: boolean = false,
  afterSort: Optional<(pair: KeyValuePair) => KeyValuePair> = null
): C {
  let result: KeyValuePair[] = Object.values(map(items, (value, key) => ({ key, value })))

  result = result.sort((a, b) => {
    if (callback) {
      return (<CompareFunction>callback)(a.value, b.value)
    }

    [a, b] = [a.value, b.value].map(item => isObject(item) ? Object.values(<Hash>item) : item)

    return spaceship(a, b) * (descending ? -1 : 1)
  })

  if (afterSort) {
    result = result.map(afterSort)
  }

  return isObject(items) ? <C>pluck(result, 'value', 'key') : <C>pluck(result, 'value')
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

export function keys (items: any[]): number[]
export function keys (items: Hash): string[]
export function keys (items: Collection) {
  if (isObject(items)) {
    return Object.keys(items)
  }

  return Object.keys(items).map((key: string): number => +key)
}

export function values<C extends Collection> (items: C): ValueOf<C>[] {
  return Object.values(items)
}

export function contains<C extends Collection> (haystack: C, needle: ValueOf<C>): boolean {
  return Object.values(haystack).includes(needle)
}

export function count (items: Collection): number {
  return Object.keys(items).length
}

export function has (items: Collection, key: CollectionItemPath): boolean {
  return find(items, key).exists
}

export function get<C extends Collection> (items: C): C
export function get<C extends Collection> (items: C, key: CollectionItemPath): ValueOf<C>
export function get<C extends Collection> (items: C, key: CollectionItemPath, defaultValue: ValueOf<C>): ValueOf<C>
export function get<C extends Collection> (items: C, key: Optional<CollectionItemPath> = null, defaultValue: Optional<ValueOf<C>> = null) {
  if (key === null) {
    return items
  }

  return find(items, key, defaultValue).value
}

export function set<C extends Collection> (items: C, key: CollectionItemPath, value: any): C {
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

  return (<number[]>Object.values(items)).reduce((carry: number, n: number) => carry + (+n || 0), 0)
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

export function each<C extends any[]> (items: C, callback: ArrayCallback<boolean | void, ValueOf<C>>): C
export function each<C extends Hash> (items: C, callback: HashCallback<boolean | void, ValueOf<C>>): C
export function each<C extends Collection> (items: C, callback: CollectionCallback<boolean | void, ValueOf<C>>) {
  for (const { key, index, value } of entries(items)) {
    if (callback(value, key, index) === false) {
      break
    }
  }

  return items
}

export function slice<C extends Collection> (items: C): C
export function slice<C extends Collection> (items: C, begin: number): C
export function slice<C extends Collection> (items: C, begin: number, end: number): C
export function slice<C extends Collection> (items: C, begin: number = 0, end: Optional<number> = null) {
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

// TODO: optional initialValue
export function reduce<TR, C extends any[]> (items: C, callback: (carry: TR, value: ValueOf<C>, key: number, index: number) => TR, initialValue: TR): TR
export function reduce<TR, C extends Hash> (items: C, callback: (carry: TR, value: ValueOf<C>, key: string, index: number) => TR, initialValue: TR): TR
// FIXME: type hint
export function reduce<TR, C extends Collection> (items: C, callback: (carry: TR, value: ValueOf<C>, key: any, index: number) => TR, initialValue: TR) {
  let result: TR = initialValue

  for (const { key, index, value } of entries(items)) {
    result = callback(result, value, key, index)
  }

  return result
}

export function toArray<C extends Collection> (items: C): ValueOf<C>[] {
  return reduce(
    items,
    (carry: any[], value: any) => [...carry, isObject(value) ? toArray(value) : value],
    []
  )
}

export function chunk<C extends Collection> (items: C, size: number): C[] {
  return reduce(
    [...Array(Math.ceil(count(items) / size)).keys()],
    (carry: C[], n: number) => [...carry, slice(items, n * size, (n + 1) * size)],
    []
  )
}

export function filter<C extends Collection> (items: C): C
export function filter<C extends any[]> (items: C, callback: ArrayCallback<boolean, ValueOf<C>>): C
export function filter<C extends Hash> (items: C, callback: HashCallback<boolean, ValueOf<C>>): C
export function filter<C extends Collection> (items: C, callback: Optional<CollectionCallback<boolean, ValueOf<C>>> = null) {
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

export function reject<C extends any[]> (items: C, callback: ArrayCallback<boolean, ValueOf<C>>): C
export function reject<C extends Hash> (items: C, callback: HashCallback<boolean, ValueOf<C>>): C
export function reject<C extends Collection> (items: C, callback: CollectionCallback<boolean, ValueOf<C>>) {
  const result: Hash = {}

  callback = normalizeCallback(callback)

  for (const { key, index, value } of entries(items)) {
    if (!callback(value, key, index)) {
      result[key] = value
    }
  }

  return isArray(items) ? Object.values(result) : result
}

export function only<C extends Collection> (items: C, keys: CollectionKey[]): C
export function only<C extends Collection> (items: C, ...keys: CollectionKey[]): C
export function only<C extends Collection> (items: C, ...keys: CollectionKey[] | CollectionKey[][]) {
  const itemsIsArray: boolean = isArray(items)

  const result: Hash = {}

  keys = <CollectionKey[]>keys.flat(Infinity)

  for (const { key, value } of entries(items)) {
    if (keys.includes(key)) {
      result[key] = value
    }
  }

  return itemsIsArray ? Object.values(result) : result
}

export function except<C extends any[]> (items: C, keys: number[]): C
export function except<C extends Hash> (items: C, keys: string[]): C
export function except<C extends any[]> (items: C, ...keys: number[]): C
export function except<C extends Hash> (items: C, ...keys: string[]): C
export function except<C extends Collection> (items: C, ...keys: CollectionKey[] | CollectionKey[][]) {
  const itemsIsArray: boolean = isArray(items)

  const result: Hash = {}

  keys = <CollectionKey[]>keys.flat(Infinity)

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

export function first<C extends Collection> (items: C): ValueOf<C>
export function first<C extends any[]> (items: C, callback: ArrayCallback<boolean, ValueOf<C>>): ValueOf<C>
export function first<C extends Hash> (items: C, callback: HashCallback<boolean, ValueOf<C>>): ValueOf<C>
export function first<C extends Collection> (items: C, callback: Optional<CollectionCallback<boolean, ValueOf<C>>> = null) {
  if (callback) {
    items = filter(items, callback)
  }

  return isNotEmpty(items) ? Object.values(items)[0] : null
}

export function last<C extends Collection> (items: C): ValueOf<C>
export function last<C extends any[]> (items: C, callback: ArrayCallback<boolean, ValueOf<C>>): ValueOf<C>
export function last<C extends Hash> (items: C, callback: HashCallback<boolean, ValueOf<C>>): ValueOf<C>
export function last<C extends Collection> (items: C, callback: Optional<CollectionCallback<boolean, ValueOf<C>>> = null) {
  if (callback) {
    items = filter(items, callback)
  }

  return isNotEmpty(items) ? Object.values(items)[count(items) - 1] : null
}

export function map<TR, C extends any[]> (items: C, callback: ArrayCallback<TR, ValueOf<C>>): TR[]
export function map<TR, C extends Hash> (items: C, callback: HashCallback<TR, ValueOf<C>>): Hash<TR>
export function map<TR, C extends Collection> (items: C, callback: CollectionCallback<TR, ValueOf<C>>) {
  const result: Hash<TR> = {}

  for (const { key, index, value } of entries(items)) {
    result[key] = callback(value, key, index)
  }

  return isArray(items) ? Object.values(result) : result
}

export function mapWithKeys<TR, C extends any[]> (items: C, callback: ArrayCallback<Hash<TR>, ValueOf<C>>): Hash<TR>
export function mapWithKeys<TR, C extends Hash> (items: C, callback: HashCallback<Hash<TR>, ValueOf<C>>): Hash<TR>
export function mapWithKeys<TR, C extends Collection> (items: C, callback: CollectionCallback<Hash<TR>, ValueOf<C>>) {
  let result: Hash<TR> = {}

  for (const { key, index, value } of entries(items)) {
    result = { ...result, ...callback(value, key, index) }
  }

  return result
}

export function flatMap<TR, C extends any[]> (items: C, callback: ArrayCallback<TR[], ValueOf<C>>): TR[]
export function flatMap<TR, C extends any[]> (items: C, callback: ArrayCallback<Hash<TR>, ValueOf<C>>): Hash<TR>
export function flatMap<TR, C extends Hash> (items: C, callback: HashCallback<TR[], ValueOf<C>>): TR[]
export function flatMap<TR, C extends Hash> (items: C, callback: HashCallback<Hash<TR>, ValueOf<C>>): Hash<TR>
// FIXME: typehint
export function flatMap<TR, C extends Collection> (items: C, callback: CollectionCallback<any, ValueOf<C>>) {
  let result: Collection<TR> = <TR[]>[]

  for (const { key, index, value } of entries(items)) {
    result = merge(result, callback(value, key, index))
  }

  return result
}

export function flatten<C extends Collection> (items: Collection<C>): ValueOf<C>[]
export function flatten<C extends Collection> (items: Collection<C>, depth: number): ValueOf<C>[]
export function flatten<C extends Collection> (items: Collection<C>, depth: number = Infinity) {
  let result: any[] = []

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

export function min (items: Collection<number>): number {
  return Math.min(...Object.values(items))
}

export function max (items: Collection<number>): number {
  return Math.max(...Object.values(items))
}

// FIXME: typehint
export function pipe<TR, C extends Collection> (items: C, callback: (items: C) => TR): TR {
  return callback(items)
}

export function pluck<C extends Collection> (items: C, value: CollectionItemPath): ValueOf<C>[]
export function pluck<C extends Collection> (items: C, value: CollectionItemPath, key: CollectionItemPath): Hash<ValueOf<C>>
export function pluck<C extends any[]> (items: C, value: CollectionItemPath, callback: ArrayCallback<string, ValueOf<C>>): Hash<ValueOf<C>>
export function pluck<C extends Hash> (items: C, value: CollectionItemPath, callback: HashCallback<string, ValueOf<C>>): Hash<ValueOf<C>>
export function pluck<C extends Collection> (items: C, value: CollectionItemPath, key: Optional<CollectionItemPath | CollectionCallback<string, ValueOf<C>>> = null) {
  const keyIsFunction: boolean = isFunction(key)
  const keyIsNull: boolean = key === null
  let result: Collection<ValueOf<C>> = keyIsNull ? [] : {}

  for (const { key: k, index, value: row } of entries(items)) {
    const v: ValueOf<C> = get(row, value)

    if (keyIsNull) {
      result = [...<ValueOf<C>[]>result, v]
      continue
    }

    if (keyIsFunction) {
      result = { ...result, [(<CollectionCallback<string>>key)(row, k, index)]: v }
      continue
    }

    result = { ...result, [get(row, <CollectionItemPath>key)]: v }
  }

  return result
}

export function swap<C extends any[]> (items: C, from: number, to: number): C
export function swap<C extends Hash> (items: C, from: string, to: string): C
export function swap<C extends Collection> (items: C, from: CollectionKey, to: CollectionKey) {
  const result: Collection = slice(items)
  const temp: ValueOf<C> = result[from]

  result[from] = result[to]
  result[to] = temp

  return result
}

export function shuffle<C extends Collection> (items: C): C {
  if (isObject(items)) {
    return items
  }

  const length: number = count(items)
  let result = slice(<Extract<C, any[]>>items)

  for (let i = 0; i < length; i++) {
    const target: number = Math.floor(Math.random() * length)

    result = swap(result, i, target)
  }

  return result
}

export function take<C extends Collection> (items: C, limit: number): C {
  return slice(items, 0, limit)
}

// TODO: support itempath
export function unique<C extends Collection> (items: C): C
export function unique<C extends Collection> (items: C, key: CollectionKey): C
export function unique<C extends any[]> (items: C, callback: ArrayCallback<any, ValueOf<C>>): C
export function unique<C extends Hash> (items: C, callback: HashCallback<any, ValueOf<C>>): C
export function unique<C extends Collection> (items: C, key: Optional<CollectionKey | CollectionCallback<any, ValueOf<C>>> = null) {
  const keyIsFunction: boolean = isFunction(key)
  const haystack: any[] = []
  const result: Hash = {}

  for (const { key: k, index, value: row } of entries(items)) {
    const uniqueBy: any = keyIsFunction ? (<CollectionCallback>key)(row, k, index) : get(row, <CollectionKey>key)

    if (!haystack.includes(uniqueBy)) {
      result[k] = row

      haystack.push(uniqueBy)
    }
  }

  return isArray(items) ? Object.values(result) : result
}

export function diff<C extends Collection> (items: C, compared: Collection): C {
  return filter(items, item => !contains(compared, item))
}

export function diffKeys<C extends Collection> (items: C, compared: Collection): Hash<ValueOf<C>> {
  const comparedKeys: string[] = Object.keys(compared)

  return filter(<Hash<ValueOf<C>>>{ ...items }, (_, key) => !contains(comparedKeys, key))
}

export function intersect<C extends Collection> (items: C, compared: Collection): C {
  return filter(items, item => contains(compared, item))
}

export function intersectByKeys<C extends Collection> (items: C, compared: Collection): Hash<ValueOf<C>> {
  const comparedKeys: string[] = Object.keys(compared)

  return filter(<Hash<ValueOf<C>>>{ ...items }, (_, key) => contains(comparedKeys, key))
}

export function merge<C extends any[]> (items: C, ...merged: ValueOf<C>[][]): ValueOf<C>[]
export function merge<C extends any[]> (items: C, ...merged: Hash<ValueOf<C>>[]): Hash<ValueOf<C>>
export function merge<C extends Hash> (items: C, ...merged: ValueOf<C>[][]): Hash<ValueOf<C>>
export function merge<C extends Hash> (items: C, ...merged: Hash<ValueOf<C>>[]): Hash<ValueOf<C>>
export function merge<C extends Collection> (items: C, ...merged: Collection<ValueOf<C>>[]) {
  let result: Collection<ValueOf<C>> = items
  let flag: number = isArray(items) ? count(items) : 0

  for (const right of merged) {
    const rightIsArray: boolean = isArray(right)

    let left = <Hash<ValueOf<C>>>{ ...result }

    for (const { key, value } of entries(right)) {
      left = { ...left, [rightIsArray ? (flag++).toString() : key]: value }
    }

    result = isObject(result) || isObject(right) ? left : Object.values(left)
  }

  return result
}

// TODO: support itempath
export function keyBy<C extends Collection> (items: C, key: CollectionKey): Hash<ValueOf<C>>
export function keyBy<C extends any[]> (items: C, callback: ArrayCallback<string, ValueOf<C>>): Hash<ValueOf<C>>
export function keyBy<C extends Hash> (items: C, callback: HashCallback<string, ValueOf<C>>): Hash<ValueOf<C>>
export function keyBy<C extends Collection> (items: C, key: CollectionKey | CollectionCallback<string, ValueOf<C>>) {
  const keyIsFunction: boolean = isFunction(key)
  const result: Hash = {}

  for (const { key: k, index, value: row } of entries(items)) {
    result[keyIsFunction ? (<CollectionCallback<string>>key)(row, k, index) : get(row, <CollectionKey>key)] = row
  }

  return result
}

// TODO: support itempath
export function groupBy<C extends Collection> (items: C, key: CollectionKey): Hash<C>
export function groupBy<C extends any[]> (items: C, callback: ArrayCallback<string, ValueOf<C>>): Hash<C>
export function groupBy<C extends Hash> (items: C, callback: HashCallback<string, ValueOf<C>>): Hash<C>
export function groupBy<C extends Collection> (items: C, key: CollectionKey | CollectionCallback<string, ValueOf<C>>) {
  const keyIsFunction: boolean = isFunction(key)
  const itemsIsArray: boolean = isArray(items)
  const result: Hash<Collection> = {}

  for (const { key: k, index, value: row } of entries(items)) {
    let groups: string | string[] = keyIsFunction
      ? (<CollectionCallback<string | string[]>>key)(row, k, index)
      : <string | string[]>get(row, <CollectionKey>key)

    if (!isArray(groups)) {
      groups = [<string>groups]
    }

    for (const group of <string[]>groups) {
      if (!result[group]) {
        result[group] = itemsIsArray ? [] : {}
      }

      itemsIsArray ? (<any[]>result[group]).push(row) : (<Hash>result[group])[k] = row
    }
  }

  return result
}

export function sort<C extends Collection> (items: C): C
export function sort<C extends Collection> (items: C, callback: CompareFunction<ValueOf<C>>): C
export function sort<C extends Collection> (items: C, callback: Optional<CompareFunction<ValueOf<C>>> = null) {
  if (isArray(items) && callback) {
    return (<ValueOf<C>[]>items).sort(callback)
  }

  return _sort(items, callback)
}

export function sortDesc<C extends Collection> (items: C): C {
  return _sort(items, null, true)
}

export function sortBy<C extends Collection> (items: C, key: CollectionItemPath): C
export function sortBy<C extends any[]> (items: C, callback: ArrayCallback<any, ValueOf<C>>): C
export function sortBy<C extends Hash> (items: C, callback: HashCallback<any, ValueOf<C>>): C
export function sortBy<C extends Collection> (items: C, key: CollectionItemPath, descending: boolean): C
export function sortBy<C extends any[]> (items: C, callback: ArrayCallback<any, ValueOf<C>>, descending: boolean): C
export function sortBy<C extends Hash> (items: C, callback: HashCallback<any, ValueOf<C>>, descending: boolean): C
export function sortBy<C extends Collection> (items: C, callback: CollectionCallback<any, ValueOf<C>> | CollectionItemPath, descending: boolean = false) {
  return _sortBy(items, callback, descending)
}

export function sortByDesc<C extends Collection> (items: C, key: CollectionItemPath): C
export function sortByDesc<C extends any[]> (items: C, callback: ArrayCallback<any, ValueOf<C>>): C
export function sortByDesc<C extends Hash> (items: C, callback: HashCallback<any, ValueOf<C>>): C
export function sortByDesc<C extends Collection> (items: C, callback: CollectionCallback<any, ValueOf<C>> | CollectionItemPath) {
  return _sortBy(items, callback, true)
}

export function index<C extends any[]> (items: C, needle: ValueOf<C>): number | null
export function index<C extends Hash> (items: C, needle: ValueOf<C>): string | null
export function index<C extends Collection> (items: C, needle: C) {
  const haystack = Object.values(items)
  const result = haystack.indexOf(needle)

  if (result === -1) {
    return null
  }

  return isArray(items) ? result : Object.keys(items)[result]
}

export function append<C extends Collection> (items: C, value: ValueOf<C>): C
export function append<C extends Collection> (items: C, value: ValueOf<C>, key: string): C
export function append<C extends Collection> (items: C, value: ValueOf<C>, key: Optional<string> = null) {
  return isArray(items) ? [...<any[]>items, value] : { ...items, [<string>key]: value }
}

export function prepend<C extends Collection> (items: C, value: ValueOf<C>): C
export function prepend<C extends Collection> (items: C, value: ValueOf<C>, key: string): C
export function prepend<C extends Collection> (items: C, value: ValueOf<C>, key: Optional<string> = null) {
  return isArray(items) ? [value, ...<any[]>items] : { [<string>key]: value, ...items }
}

export function insert<C extends any[]> (items: C, target: number, value: ValueOf<C>): C
export function insert<C extends Hash> (items: C, target: string, value: ValueOf<C>, key: string): C
export function insert<C extends Collection> (items: C, target: CollectionKey, value: ValueOf<C>, key: Optional<string> = null) {
  if (isArray(items)) {
    return [...slice(<any[]>items, 0, <number>target), value, ...slice(<any[]>items, <number>target)]
  }

  target = index(Object.keys(items), <string>target) ?? count(items)

  return { ...slice(items, 0, target), [<string>key]: value, ...slice(items, target) }
}

export function join (items: Collection): string
export function join (items: Collection, glue: string): string
export function join (items: Collection, glue: string = ', ') {
  if (isObject(items)) {
    items = Object.values(items)
  }

  return items.join(glue)
}

export function partition<C extends any[]> (items: C, callback: ArrayCallback<boolean, ValueOf<C>>): [C, C]
export function partition<C extends Hash> (items: C, callback: HashCallback<boolean, ValueOf<C>>): [C, C]
export function partition<C extends Collection> (items: C, callback: CollectionCallback<boolean, ValueOf<C>>) {
  const itemsIsArray: boolean = isArray(items)

  const result = itemsIsArray
    ? <[ValueOf<C>[], ValueOf<C>[]]>[[], []]
    : <[Hash<ValueOf<C>>, Hash<ValueOf<C>>]>[{}, {}]

  for (const { key, index, value } of entries(items)) {
    const part: number = callback(value, key, index) ? 0 : 1

    itemsIsArray
      ? (<ValueOf<C>[]>result[part]).push(value)
      : (<Hash<ValueOf<C>>>result[part])[key] = value
  }

  return result
}

export function flip (items: Collection): Hash<string> {
  const result: Hash = {}

  for (const { key, value } of entries(items)) {
    result[value] = key
  }

  return result
}

export function fill<C extends Collection> (items: C, value: ValueOf<C>): C
export function fill<C extends Collection> (items: C, value: ValueOf<C>, start: number): C
export function fill<C extends Collection> (items: C, value: ValueOf<C>, start: number, end: number): C
export function fill<C extends Collection> (items: C, value: ValueOf<C>, start: number = 0, end: Optional<number> = null) {
  if (!end) {
    end = count(items)
  }

  if (isArray(items)) {
    return (<any[]>items).fill(value, start, end)
  }

  const result: Hash = {}

  for (const { key, index, value: item } of entries(items)) {
    result[key] = start <= index && index < end ? value : item
  }

  return result
}

export function freeze<C extends Collection> (items: C): C {
  return Object.freeze(items)
}

export function isFrozen (items: Collection): boolean {
  return Object.isFrozen(items)
}
