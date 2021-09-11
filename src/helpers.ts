import { Collection } from './collection'
import * as collectionMethods from './collection'

export type Optional<T> = T | null | undefined
export type ValueOf<T> = T extends any[] ? T[0] : T[keyof T]

export function isArray (value: any): boolean {
  return value && Array.isArray(value)
}

export function isObject (value: any): boolean {
  return value && typeof value === 'object' && value.constructor.name === 'Object'
}

export function isFunction (value: any): boolean {
  return typeof value === 'function'
}

export function isNumber (value: any): boolean {
  return typeof value === 'number' && isFinite(value)
}

export function isFloat (value: any): boolean {
  return Number(value) === value && value % 1 !== 0
}

export function spaceship (a: any, b: any): number {
  if (a > b) {
    return 1
  }

  if (a < b) {
    return -1
  }

  return 0
}

export function callCollectionMethod (method: string, items: any, ...args: any[]): any {
  if ((!isArray(items) && !isObject(items)) ||
      (isObject(items) && method in items)
  ) {
    return items[method](...args)
  }

  return (<(items: Collection, ...args: any[]) => any>collectionMethods[<keyof typeof collectionMethods>method])(items, ...args)
}
