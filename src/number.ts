import { Optional } from './helpers'
import { DateInterval, DateIntervalConfig } from './date-interval'

declare global {
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
}

function isFloat (n: Optional<number>): boolean {
  return Number(n) === n && n % 1 !== 0
}

function createInterval (type: keyof DateIntervalConfig, value: number) {
  return new DateInterval({ [type]: value })
}

export function init (Number: NumberConstructor): void {
  Number.random = function (max: Optional<number> = null) {
    const result: number = Math.random() * (max || 1)

    if (max === null || max === undefined || isFloat(max)) {
      return result
    }

    return Math.floor(result)
  }

  Number.prototype.format = function (): string {
    return this.toString().replace(/(.)(?=(?:\d{3})+$)/g, '$1,')
  }

  Number.prototype.times = function <T> (callback: (n: number) => T): T[] {
    return [...Array(+this).keys()].map((n: number) => n + 1).map(callback)
  }

  Number.prototype.upto = function <T> (limit: number, callback: (n: number) => T): T[] {
    return (limit - +this + 1).times((n: number) => n + +this - 1).map(callback)
  }

  Number.prototype.downto = function <T> (limit: number, callback: (n: number) => T): T[] {
    return (+this - limit + 1).times((n: number) => +this - n + 1).map(callback)
  }

  Number.prototype.round = function (precision: number = 0): number {
    return Math.round(+this * 10 ** precision) / 10 ** precision
  }

  Number.prototype.floor = function (): number {
    return Math.floor(+this)
  }

  Number.prototype.ceil = function (): number {
    return Math.ceil(+this)
  }

  Number.prototype.abs = function (): number {
    return Math.abs(+this)
  }

  Number.prototype.year = function (): DateInterval {
    return createInterval('years', +this)
  }

  Number.prototype.month = function (): DateInterval {
    return createInterval('months', +this)
  }

  Number.prototype.day = function (): DateInterval {
    return createInterval('days', +this)
  }

  Number.prototype.hour = function (): DateInterval {
    return createInterval('hours', +this)
  }

  Number.prototype.minute = function (): DateInterval {
    return createInterval('minutes', +this)
  }

  Number.prototype.second = function (): DateInterval {
    return createInterval('seconds', +this)
  }

  Number.prototype.millisecond = function (): DateInterval {
    return createInterval('milliseconds', +this)
  }

  Number.prototype.years = function (): DateInterval {
    return this.year()
  }

  Number.prototype.months = function (): DateInterval {
    return this.month()
  }

  Number.prototype.days = function (): DateInterval {
    return this.day()
  }

  Number.prototype.hours = function (): DateInterval {
    return this.hour()
  }

  Number.prototype.minutes = function (): DateInterval {
    return this.minute()
  }

  Number.prototype.seconds = function (): DateInterval {
    return this.second()
  }

  Number.prototype.milliseconds = function (): DateInterval {
    return this.millisecond()
  }
}
