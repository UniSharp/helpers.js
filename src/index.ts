import { callCollectionMethod } from './helpers'
import { DateInterval } from './date-interval'
import { Collection } from './collection'
import * as numberMethods from './number'
import * as stringMethods from './string'

declare global {
  interface globalThis {
    DateInterval: DateInterval
    UniSharp: {
      Helpers: {
        Collection: {
          call: (method: string, items: Collection, ...args: any[]) => any
        }
      }
    }
  }

  interface NumberConstructor {
    random: (max?: number) => number
  }

  interface Number {
    format: () => string
    times: <T>(callback: (n: number) => T) => T[]
    upto: <T>(limit: number, callback: (n: number) => T) => T[]
    downto: <T>(limit: number, callback: (n: number) => T) => T[]
    round: (precision?: number) => number
    floor: () => number
    ceil: () => number
    abs: () => number
    year: () => DateInterval
    month: () => DateInterval
    day: () => DateInterval
    hour: () => DateInterval
    minute: () => DateInterval
    second: () => DateInterval
    millisecond: () => DateInterval
    years: () => DateInterval
    months: () => DateInterval
    days: () => DateInterval
    hours: () => DateInterval
    minutes: () => DateInterval
    seconds: () => DateInterval
    milliseconds: () => DateInterval
  }

  interface StringConstructor {
    random: (length?: number) => string
  }

  interface String {
    slugify: () => string
    stripTags: () => string
    limit: (length: number, suffix?: string) => string
    nl2br: () => string
    ucfirst: () => string
    lcfirst: () => string
    studly: () => string
    camel: () => string
    snake: () => string
    kebab: () => string
    title: () => string
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
