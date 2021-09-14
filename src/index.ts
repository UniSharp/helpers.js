import { ValueOf, callCollectionMethod } from './helpers'
import { DateInterval } from './date-interval'
import {
  Hash,
  Collection,
  CollectionKey,
  CollectionItemPath,
  ArrayCallback,
  HashCallback,
  CompareFunction
} from './collection'
import * as numberMethods from './number'
import * as stringMethods from './string'

declare global {
  type UniSharp = {
    Helpers: {
      Collection: {
        call (method: string, items: Collection, ...args: any[]): any
      }
    }
  }

  var DateInterval: DateInterval // eslint-disable-line no-var
  var UniSharp: UniSharp // eslint-disable-line no-var

  interface Object {
    keys (): string[]
    values<T> (this: T): ValueOf<T>[]
    contains<T> (this: T, needle: ValueOf<T>): boolean
    count (): number
    has (key: CollectionItemPath): boolean
    get<T> (this: T): T
    get (key: CollectionItemPath): any
    get<D> (key: CollectionItemPath, defaultValue: D): D
    set<T> (this: T, key: CollectionItemPath, value: any): T
    sum (): number
    sum (key: CollectionItemPath): number
    avg (): number | null
    avg (key: CollectionItemPath): number | null
    each<T> (this: T, callback: HashCallback<boolean | void, ValueOf<T>>): T
    slice<T> (this: T): T
    slice<T> (this: T, begin: number): T
    slice<T> (this: T, begin: number, end: number): T
    reduce<TR, T> (this: T, callback: (carry: TR, value: ValueOf<T>, key: string, index: number) => TR, initialValue: TR): TR
    toArray<T> (this: T): ValueOf<T>[]
    chunk<T> (this: T, size: number): T[]
    filter<T> (this: T): T
    filter<T> (this: T, callback: HashCallback<boolean, ValueOf<T>>): T
    reject<T> (this: T, callback: HashCallback<boolean, ValueOf<T>>): T
    only<T> (this: T, keys: string[]): T
    only<T> (this: T, ...keys: string[]): T
    except<T> (this: T, keys: string[]): T
    except<T> (this: T, ...keys: string[]): T
    isEmpty (): boolean
    isNotEmpty (): boolean
    first<T> (this: T): ValueOf<T>
    first<T> (this: T, callback: HashCallback<boolean, ValueOf<T>>): ValueOf<T>
    last<T> (this: T): ValueOf<T>
    last<T> (this: T, callback: HashCallback<boolean, ValueOf<T>>): ValueOf<T>
    map<TR, T> (this: T, callback: HashCallback<TR, ValueOf<T>>): Hash<TR>
    mapWithKeys<TR, T> (this: T, callback: HashCallback<Hash<TR>, ValueOf<T>>): Hash<TR>
    flatMap<TR, T> (this: T, callback: HashCallback<TR[], ValueOf<T>>): TR[]
    flatMap<TR, T> (this: T, callback: HashCallback<Hash<TR>, ValueOf<T>>): Hash<TR>
    flatten<T> (this: T): ValueOf<ValueOf<T>>[]
    flatten<T> (this: T, depth: number): ValueOf<ValueOf<T>>[]
    min<T> (this: T): number
    max<T> (this: T): number
    pipe<TR, T> (this: T, callback: (hash: T) => TR): TR
    pluck<T> (this: T, value: CollectionItemPath): ValueOf<T>[]
    pluck<T> (this: T, value: CollectionItemPath, key: CollectionItemPath): Hash<ValueOf<T>>
    pluck<T> (this: T, value: CollectionItemPath, callback: HashCallback<string, ValueOf<T>>): Hash<ValueOf<T>>
    swap<T> (this: T, from: string, to: string): T
    shuffle<T> (this: T): T
    take<T> (this: T, limit: number): T
    unique<T> (this: T): T
    unique<T> (this: T, key: CollectionKey): T
    unique<T> (this: T, callback: HashCallback<any, ValueOf<T>>): T
    diff<T> (this: T, compared: Collection): T
    diffKeys<T> (this: T, compared: Collection): Hash<ValueOf<T>>
    intersect<T> (this: T, compared: Collection): T
    intersectByKeys<T> (this: T, compared: Collection): Hash<ValueOf<T>>
    merge<T> (this: T, ...merged: ValueOf<T>[][]): Hash<ValueOf<T>>
    merge<T> (this: T, ...merged: Hash<ValueOf<T>>[]): Hash<ValueOf<T>>
    keyBy<T> (this: T, key: CollectionKey): Hash<ValueOf<T>>
    keyBy<T> (this: T, callback: HashCallback<string, ValueOf<T>>): Hash<ValueOf<T>>
    groupBy<T> (this: T, key: CollectionKey): Hash<T>
    groupBy<T> (this: T, callback: HashCallback<string, ValueOf<T>>): Hash<T>
    sort<T> (this: T): T
    sort<T> (this: T, callback: CompareFunction<ValueOf<T>>): T
    sortDesc<T> (this: T): T
    sortBy<T> (this: T, key: CollectionItemPath): T
    sortBy<T> (this: T, callback: HashCallback<any, ValueOf<T>>): T
    sortBy<T> (this: T, key: CollectionItemPath, descending: boolean): T
    sortBy<T> (this: T, callback: HashCallback<any, ValueOf<T>>, descending: boolean): T
    sortByDesc<T> (this: T, key: CollectionItemPath): T
    sortByDesc<T> (this: T, callback: HashCallback<any, ValueOf<T>>): T
    index<T> (this: T, needle: ValueOf<T>): string | null
    append<T> (this: T, value: ValueOf<T>, key: string): T
    prepend<T> (this: T, value: ValueOf<T>, key: string): T
    insert<T> (this: T, target: string, value: ValueOf<T>, key: string): T
    join (): string
    join (glue: string): string
    partition<T> (this: T, callback: HashCallback<boolean, ValueOf<T>>): [Hash<T>, Hash<T>]
    flip (): Hash<string>
    fill<T> (this: T, value: ValueOf<T>): T
    fill<T> (this: T, value: ValueOf<T>, start: number): T
    fill<T> (this: T, value: ValueOf<T>, start: number, end: number): T
    freeze<T> (this: T): T
    isFrozen (): boolean
  }

  interface Array<T> {
    keys (): number[]
    values (): T[]
    contains (needle: T): boolean
    count (): number
    has (key: CollectionItemPath): boolean
    get (): T[]
    get (key: CollectionItemPath): any
    get<D> (key: CollectionItemPath, defaultValue: D): D
    set (key: CollectionItemPath, value: any): T[]
    sum (): number
    sum (key: CollectionItemPath): number
    avg (): number | null
    avg (key: CollectionItemPath): number | null
    each (callback: ArrayCallback<boolean | void, T>): T[]
    reduce<TR> (callback: (carry: TR, value: T, key: number, index: number) => TR, initialValue: TR): TR
    toArray (): ValueOf<T>[]
    chunk (size: number): T[][]
    filter (): T[]
    filter (callback: ArrayCallback<boolean, T>): T[]
    reject (callback: ArrayCallback<boolean, T>): T[]
    only (keys: number[]): T[]
    only (...keys: number[]): T[]
    except (keys: number[]): T[]
    except (...keys: number[]): T[]
    isEmpty (): boolean
    isNotEmpty (): boolean
    first (): T
    first (callback: ArrayCallback<boolean, T>): T
    last (): T
    last (callback: ArrayCallback<boolean, T>): T
    map<TR> (callback: ArrayCallback<TR, T>): TR[]
    mapWithKeys<TR> (callback: ArrayCallback<Hash<TR>, T>): Hash<TR>
    flatMap<TR> (callback: ArrayCallback<TR[], T>): TR[]
    flatMap<TR> (callback: ArrayCallback<Hash<TR>, T>): Hash<TR>
    flatten (): ValueOf<T>[]
    flatten (depth: number): ValueOf<T>[]
    min (): number
    max (): number
    pipe<TR> (callback: (array: T[]) => TR): TR
    pluck (value: CollectionItemPath): T[]
    pluck (value: CollectionItemPath, key: CollectionItemPath): Hash<T>
    pluck (value: CollectionItemPath, callback: ArrayCallback<string, T>): Hash<T>
    swap (from: number, to: number): T[]
    shuffle (): T[]
    take (limit: number): T[]
    unique (): T[]
    unique (key: CollectionKey): T[]
    unique (callback: ArrayCallback<any, T>): T[]
    diff (compared: Collection): T[]
    diffKeys (compared: Collection): Hash<T>
    intersect (compared: Collection): T[]
    intersectByKeys (compared: Collection): Hash<T>
    merge (...merged: T[][]): T[]
    merge (...merged: Hash<T>[]): Hash<T>
    keyBy (key: CollectionKey): Hash<T>
    keyBy (callback: ArrayCallback<string, T>): Hash<T>
    groupBy (key: CollectionKey): Hash<T[]>
    groupBy (callback: ArrayCallback<string, T>): Hash<T[]>
    sortDesc (): T[]
    sortBy (key: CollectionItemPath): T[]
    sortBy (callback: ArrayCallback<any, T>): T[]
    sortBy (key: CollectionItemPath, descending: boolean): T[]
    sortBy (callback: ArrayCallback<any, T>, descending: boolean): T[]
    sortByDesc (key: CollectionItemPath): T[]
    sortByDesc (callback: ArrayCallback<any, T>): T[]
    // FIXME: method name conflict
    // index (needle: T): number | null
    append (value: T): T[]
    prepend (value: T): T[]
    insert (target: number, value: T): T[]
    partition (callback: ArrayCallback<boolean, T>): [T[], T[]]
    flip (): Hash<string>
    freeze (): T[]
    isFrozen (): boolean
  }

  interface NumberConstructor {
    random (): number
    random (max: number): number
  }

  interface Number {
    format (): string
    times<T> (callback: (n: number) => T): T[]
    upto<T> (limit: number, callback: (n: number) => T): T[]
    downto<T> (limit: number, callback: (n: number) => T): T[]
    round (): number
    round (precision: number): number
    floor (): number
    ceil (): number
    abs (): number
    year (): DateInterval
    month (): DateInterval
    day (): DateInterval
    hour (): DateInterval
    minute (): DateInterval
    second (): DateInterval
    millisecond (): DateInterval
    years (): DateInterval
    months (): DateInterval
    days (): DateInterval
    hours (): DateInterval
    minutes (): DateInterval
    seconds (): DateInterval
    milliseconds (): DateInterval
  }

  interface StringConstructor {
    random (): string
    random (length: number): string
  }

  interface String {
    slugify (): string
    stripTags (): string
    limit (length: number): string
    limit (length: number, suffix: string): string
    nl2br (): string
    ucfirst (): string
    lcfirst (): string
    studly (): string
    camel (): string
    snake (): string
    kebab (): string
    title (): string
  }
}

function wrapMethod<T> (method: (...args: any[]) => any): (...args: any[]) => any {
  return function (this: T, ...args: any[]): any {
    return method.call(this, this, ...args)
  }
}

function assignMethods<T> (target: NumberConstructor | StringConstructor, srouce: {}): void {
  for (const [name, method] of Object.entries(srouce)) {
    Object.assign(target.prototype, { [name]: wrapMethod<T>(<(...args: any[]) => any>method) })
  }
}

export function init ({ Number, String }: { Number: NumberConstructor, String: StringConstructor }): void {
  const { random: numberRandom, ...restNumberMethods } = numberMethods
  const { random: stringRandom, ...restStringMethods } = stringMethods

  assignMethods<Number>(Number, restNumberMethods)
  assignMethods<String>(String, restStringMethods)

  Object.assign(Number, { random: numberRandom })
  Object.assign(String, { random: stringRandom })
  Object.assign(global, {
    DateInterval,
    UniSharp: {
      Helpers: {
        Collection: {
          call: callCollectionMethod
        }
      }
    }
  })
}
