import { DateInterval } from './date-interval'
import { ArrayCallback } from './collection/array'
import { HashCallback, CompareFunction } from './collection/object'
import { Hash, Collection, CollectionKey, CollectionItemPath, call } from './collection/helpers'
import * as numberMethods from './number'
import * as stringMethods from './string'
import * as arrayMethods from './collection/array'

declare global {
  type UniSharp = {
    Helpers: {
      Collection: {
        call (method: string, items: Hash, ...args: any[]): any
      }
    }
  }

  var DateInterval: DateInterval // eslint-disable-line no-var
  var UniSharp: UniSharp // eslint-disable-line no-var

  interface Object {
    keys(this: Hash): string[]
    values<T>(this: Hash<T>): T[]
    contains<T>(this: Hash<T>, needle: T): boolean
    count(this: Hash): number
    has(this: Hash, key: CollectionItemPath): boolean
    get<T extends Hash>(this: T): T
    get<TReturn, T>(this: Hash<T>, key: CollectionItemPath): TReturn
    get<TReturn, T>(this: Hash<T>, key: CollectionItemPath, defaultValue: TReturn): TReturn
    set<T extends Hash<unknown>>(this: T, key: CollectionItemPath, value: any): T
    sum(this: Hash<unknown>): number
    sum(this: Hash<Hash<unknown>>, key: CollectionItemPath): number
    avg(this: Hash<unknown>): number | null
    avg(this: Hash<Hash<unknown>>, key: CollectionItemPath): number | null
    each<T>(this: Hash<T>, callback: HashCallback<boolean | void, T>): Hash<T>
    slice<T>(this: Hash<T>): Hash<T>
    slice<T>(this: Hash<T>, begin: number): Hash<T>
    slice<T>(this: Hash<T>, begin: number, end: number): Hash<T>
    reduce<TReturn, T>(this: Hash<T>, callback: (carry: TReturn, value: T, key: string, index: number, collection: Hash<T>) => TReturn, initialValue: TReturn): TReturn
    toArray<T>(this: Hash<T>): T[]
    toArray<T>(this: Hash<Hash<T>>): T[][]
    chunk<T>(this: Hash<T>, size: number): Hash<T>[]
    pipe<TReturn, T>(this: Hash<T>, callback: (collection: Hash<T>) => TReturn): TReturn
    filter<T>(this: Hash<T>, callback: HashCallback<boolean, T>): Hash<T>
    reject<T>(this: Hash<T>, callback: HashCallback<boolean, T>): Hash<T>
    only<T>(this: Hash<T>, keys: string[]): Hash<T>
    only<T>(this: Hash<T>, ...keys: string[]): Hash<T>
    except<T>(this: Hash<T>, keys: string[]): Hash<T>
    except<T>(this: Hash<T>, ...keys: string[]): Hash<T>
    isEmpty(this: Hash): boolean
    isNotEmpty(this: Hash): boolean
    first<T>(this: Hash<T>): T
    first<T>(this: Hash<T>, callback: HashCallback<boolean, T>): T
    last<T>(this: Hash<T>): Hash<T>
    last<T>(this: Hash<T>, callback: HashCallback<boolean, T>): Hash<T>
    map<TReturn, T>(this: Hash<T>, callback: HashCallback<TReturn, T>): Hash<TReturn>
    mapWithKeys<TReturn, T>(this: Hash<T>, callback: HashCallback<Hash<TReturn>, T>): Hash<TReturn>
    flatMap<TReturn, T>(this: Hash<T>, callback: HashCallback<Hash<TReturn>, T>): Hash<TReturn>
    flatten<T>(this: Hash<T>): T[]
    flatten<T>(this: Hash<T>, depth: number): T[]
    min(this: Hash<number>): number
    max(this: Hash<number>): number
    pluck<TReturn, T extends Hash<unknown>>(this: Hash<T>, value: CollectionItemPath): TReturn[]
    pluck<TReturn, T extends Hash<unknown>>(this: Hash<T>, value: CollectionItemPath, key: CollectionItemPath): Hash<TReturn>
    pluck<TReturn, T extends Hash<unknown>>(this: Hash<T>, value: CollectionItemPath, callback: HashCallback<string, T>): Hash<TReturn>
    swap<T>(this: Hash<T>, from: string, to: string): Hash<T>
    take<T>(this: Hash<T>, limit: number): Hash<T>
    unique<T>(this: Hash<T>): Hash<T>
    unique<TIdentifier, T extends Hash<TIdentifier>>(this: Hash<T>, key: CollectionKey): Hash<T>
    unique<TIdentifier, T extends Hash<TIdentifier>>(this: Hash<T>, callback: HashCallback<TIdentifier, T>): Hash<T>
    diff<T>(this: Hash<T>, compared: Collection<T>): Hash<T>
    diffKeys<T>(this: Hash<T>, compared: Hash<T>): Hash<T>
    intersect<T>(this: Hash<T>, compared: Collection<T>): Hash<T>
    intersectByKeys<T>(this: Hash<T>, compared: Hash<T>): Hash<T>
    merge<T>(this: Hash<T>, ...merged: Hash<T>[]): Hash<T>
    keyBy<T extends Hash<unknown>>(this: Hash<T>, key: CollectionKey): Hash<T>
    keyBy<T extends Hash<unknown>>(this: Hash<T>, callback: HashCallback<string, T>): Hash<T>
    groupBy<T extends Hash<unknown>>(this: Hash<T>, key: CollectionKey): Hash<Hash<T>>
    groupBy<T extends Hash<unknown>>(this: Hash<T>, callback: HashCallback<string | string[], T>): Hash<Hash<T>>
    sort<T>(this: Hash<T>): Hash<T>
    sort<T>(this: Hash<T>, compareFn: CompareFunction<T>): Hash<T>
    sortDesc<T>(this: Hash<T>): Hash<T>
    sortBy<T extends Hash<unknown>>(this: Hash<T>, key: CollectionItemPath): Hash<T>
    sortBy<T extends Hash<unknown>>(this: Hash<T>, callback: HashCallback<unknown, T>): Hash<T>
    sortByDesc<T extends Hash<unknown>>(this: Hash<T>, key: CollectionItemPath): Hash<T>
    sortByDesc<T extends Hash<unknown>>(this: Hash<T>, callback: HashCallback<unknown, T>): Hash<T>
    index<T>(this: Hash<T>, needle: T): string | null
    join(this: Hash<unknown>): string
    join(this: Hash<unknown>, glue: string): string
    partition<T>(this: Hash<T>, callback: HashCallback<boolean, T>): [Hash<T>, Hash<T>]
    flip(this: Hash<unknown>): Hash<string>
    fill<T>(this: Hash<T>, value: T): Hash<T>
    fill<T>(this: Hash<T>, value: T, start: number): Hash<T>
    fill<T>(this: Hash<T>, value: T, start: number, end: number): Hash<T>
    freeze<T extends Hash>(this: T): Readonly<T>
    isFrozen(this: Hash): boolean
    reverse<T>(this: Hash<T>): Hash<T>
  }

  interface Array<T> { // eslint-disable-line @typescript-eslint/no-unused-vars
    contains<T>(this: T[], needle: T): boolean
    count(this: any[]): number
    has(this: any[], key: CollectionItemPath): boolean
    get<T extends any[]>(this: T): T
    get<TReturn, T>(this: T[], key: CollectionItemPath): TReturn
    get<TReturn, T>(this: T[], key: CollectionItemPath, defaultValue: TReturn): TReturn
    set<T extends unknown[]>(this: T, key: CollectionItemPath, value: any): T
    sum(this: unknown[]): number
    sum(this: Hash<unknown>[], key: CollectionItemPath): number
    avg(this: unknown[]): number | null
    avg(this: Hash<unknown>[], key: CollectionItemPath): number | null
    each<T>(this: T[], callback: ArrayCallback<boolean | void, T>): T[]
    chunk<T>(this: T[], size: number): T[][]
    reject<T>(this: T[], callback: ArrayCallback<boolean, T>): T[]
    only<T>(this: T[], keys: number[]): T[]
    only<T>(this: T[], ...keys: number[]): T[]
    except<T>(this: T[], keys: number[]): T[]
    except<T>(this: T[], ...keys: number[]): T[]
    isEmpty(this: any[]): boolean
    isNotEmpty(this: any[]): boolean
    first<T>(this: T[]): T
    first<T>(this: T[], callback: ArrayCallback<boolean, T>): T
    last<T>(this: T[]): T
    last<T>(this: T[], callback: ArrayCallback<boolean, T>): T
    mapWithKeys<TReturn, T>(this: T[], callback: ArrayCallback<TReturn, T>): Hash<TReturn>
    flatten<T>(this: T[] | T[][]): T[]
    flatten<T>(this: T[] | T[][], depth: number): T[]
    min(this: number[]): number
    max(this: number[]): number
    pipe<TReturn, T>(this: T[], callback: (array: T[]) => TReturn): TReturn
    pluck<TReturn, T extends Hash<unknown>>(this: T[], value: CollectionItemPath): TReturn[]
    pluck<TReturn, T extends Hash<unknown>>(this: T[], value: CollectionItemPath, key: CollectionItemPath): Hash<TReturn>
    pluck<TReturn, T extends Hash<unknown>>(this: T[], value: CollectionItemPath, callback: ArrayCallback<string, T>): Hash<TReturn>
    swap<T>(this: T[], from: number, to: number): T[]
    shuffle<T>(this: T[]): T[]
    take<T>(this: T[], limit: number): T[]
    unique<T>(this: T[]): T[]
    unique<TIdentifier, T extends Hash<TIdentifier>>(this: T[], key: CollectionKey): T[]
    unique<TIdentifier, T extends Hash<TIdentifier>>(this: T[], callback: ArrayCallback<TIdentifier, T>): T[]
    diff<T>(this: T[], compared: Collection<T>): T[]
    intersect<T>(this: T[], compared: Collection<T>): T[]
    merge<T>(this: T[], ...merged: T[][]): T[]
    keyBy<T extends Hash<unknown>>(this: T[], key: CollectionKey): Hash<T>
    keyBy<T extends Hash<unknown>>(this: T[], callback: ArrayCallback<string, T>): Hash<T>
    groupBy<T extends Hash<unknown>>(this: T[], key: CollectionKey): Hash<T[]>
    groupBy<T extends Hash<unknown>>(this: T[], callback: ArrayCallback<string | string[], T>): Hash<T[]>
    sortDesc<T>(this: T[]): T[]
    sortBy<T extends Hash<unknown>>(this: T[], key: CollectionItemPath): T[]
    sortBy<T extends Hash<unknown>>(this: T[], callback: ArrayCallback<unknown, T>): T[]
    sortByDesc<T extends Hash<unknown>>(this: T[], key: CollectionItemPath): T[]
    sortByDesc<T extends Hash<unknown>>(this: T[], callback: ArrayCallback<unknown, T>): T[]
    // FIXME: method name conflict
    // index<T>(this: T[], needle: T): number | null
    append<T>(this: T[], value: T): T[]
    prepend<T>(this: T[], value: T): T[]
    insert<T>(this: T[], target: number, value: T): T[]
    partition<T>(this: T[], callback: ArrayCallback<boolean, T>): [T[], T[]]
    flip(this: string[]): Hash<number>
    freeze<T extends any[]>(this: T): Readonly<T>
    isFrozen(this: any[]): boolean
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

function assignMethods<T> (target: NumberConstructor | StringConstructor | ArrayConstructor, srouce: {}): void {
  for (const [name, method] of Object.entries(srouce)) {
    Object.assign(target.prototype, { [name]: wrapMethod<T>(<(...args: any[]) => any>method) })
  }
}

export const Helpers = {
  Collection: { call },
  init ({ global }: { global: typeof globalThis }): void {
    const { random: numberRandom, ...restNumberMethods } = numberMethods
    const { random: stringRandom, ...restStringMethods } = stringMethods

    assignMethods(global.Number, restNumberMethods)
    assignMethods(global.String, restStringMethods)
    assignMethods(global.Array, arrayMethods)

    Object.assign(global.Number, { random: numberRandom })
    Object.assign(global.String, { random: stringRandom })
    Object.assign(global, { DateInterval, UniSharp: { Helpers } })
  }
}
