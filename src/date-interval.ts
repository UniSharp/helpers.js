import { Optional } from './helpers'

export interface DateIntervalConfig {
  years?: number
  months?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}

export class DateInterval {
  private years: number = 0
  private months: number = 0
  private days: number = 0
  private hours: number = 0
  private minutes: number = 0
  private seconds: number = 0
  private milliseconds: number = 0

  public constructor ({
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0
  }: DateIntervalConfig = {}) {
    this.years = years
    this.months = months
    this.days = days
    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
    this.milliseconds = milliseconds
  }

  public getConfig (): DateIntervalConfig {
    return {
      years: this.years,
      months: this.months,
      days: this.days,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds,
      milliseconds: this.milliseconds
    }
  }

  public setConfig (config: DateIntervalConfig): DateInterval {
    let key: keyof DateIntervalConfig

    for (key in config) {
      const value: Optional<number> = config[key]

      if (value !== 0 && !value) {
        continue
      }

      this[key] = <number>config[key]
    }

    return this
  }

  public invert (): DateInterval {
    return new DateInterval({
      years: this.years * -1,
      months: this.months * -1,
      days: this.days * -1,
      hours: this.hours * -1,
      minutes: this.minutes * -1,
      seconds: this.seconds * -1,
      milliseconds: this.milliseconds * -1
    })
  }

  public ago (date: Optional<Date> = null): Date {
    return this.invert().after(date)
  }

  public after (date: Optional<Date> = null): Date {
    date = date || new Date()

    date.setFullYear(date.getFullYear() + this.years)
    date.setMonth(date.getMonth() + this.months)
    date.setDate(date.getDate() + this.days)
    date.setHours(date.getHours() + this.hours)
    date.setMinutes(date.getMinutes() + this.minutes)
    date.setSeconds(date.getSeconds() + this.seconds)
    date.setMilliseconds(date.getMilliseconds() + this.milliseconds)

    return date
  }

  public valueOf (): number {
    /* eslint-disable */
    return this.years   * 1000 * 60 * 60 * 24 * 30 * 365 +
           this.months  * 1000 * 60 * 60 * 24 * 30 +
           this.days    * 1000 * 60 * 60 * 24 +
           this.hours   * 1000 * 60 * 60 +
           this.minutes * 1000 * 60 +
           this.seconds * 1000 +
           this.milliseconds
    /* eslint-enable */
  }
}
