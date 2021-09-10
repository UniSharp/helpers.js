import { Optional } from './helpers'
import { DateInterval, DateIntervalConfig } from './date-interval'

function isFloat (n: Optional<number>): boolean {
  return Number(n) === n && n % 1 !== 0
}

function createInterval (type: keyof DateIntervalConfig, value: number) {
  return new DateInterval({ [type]: value })
}

export function random (): number
export function random (max: number): number
export function random (max: Optional<number> = null) {
  const result: number = Math.random() * (max || 1)

  if (max === null || max === undefined || isFloat(max)) {
    return result
  }

  return Math.floor(result)
}

export function format (number: number): string {
  return number.toString().replace(/(.)(?=(?:\d{3})+$)/g, '$1,')
}

export function times<T> (number: number, callback: (n: number) => T): T[] {
  return [...Array(number).keys()].map((n: number) => n + 1).map(callback)
}

export function upto<T> (number: number, limit: number, callback: (n: number) => T): T[] {
  return times((limit - number + 1), (n: number) => n + number - 1).map(callback)
}

export function downto<T> (number: number, limit: number, callback: (n: number) => T): T[] {
  return times((number - limit + 1), (n: number) => number - n + 1).map(callback)
}

export function round (number: number, precision: number = 0): number {
  return Math.round(number * 10 ** precision) / 10 ** precision
}

export function floor (number: number): number {
  return Math.floor(number)
}

export function ceil (number: number): number {
  return Math.ceil(number)
}

export function abs (number: number): number {
  return Math.abs(number)
}

export function year (number: number): DateInterval {
  return createInterval('years', number)
}

export function month (number: number): DateInterval {
  return createInterval('months', number)
}

export function day (number: number): DateInterval {
  return createInterval('days', number)
}

export function hour (number: number): DateInterval {
  return createInterval('hours', number)
}

export function minute (number: number): DateInterval {
  return createInterval('minutes', number)
}

export function second (number: number): DateInterval {
  return createInterval('seconds', number)
}

export function millisecond (number: number): DateInterval {
  return createInterval('milliseconds', number)
}

export function years (number: number): DateInterval {
  return year(number)
}

export function months (number: number): DateInterval {
  return month(number)
}

export function days (number: number): DateInterval {
  return day(number)
}

export function hours (number: number): DateInterval {
  return hour(number)
}

export function minutes (number: number): DateInterval {
  return minute(number)
}

export function seconds (number: number): DateInterval {
  return second(number)
}

export function milliseconds (number: number): DateInterval {
  return millisecond(number)
}
