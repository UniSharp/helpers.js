export default class DateInterval {
  constructor ({ years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = {}) {
    this.years = years
    this.months = months
    this.days = days
    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
    this.milliseconds = milliseconds
  }

  invert () {
    let newInterval = new DateInterval()

    newInterval.years = this.years * -1
    newInterval.months = this.months * -1
    newInterval.days = this.days * -1
    newInterval.hours = this.hours * -1
    newInterval.minutes = this.minutes * -1
    newInterval.seconds = this.seconds * -1
    newInterval.milliseconds = this.milliseconds * -1

    return newInterval
  }

  ago (date = null) {
    return this.invert().after(date)
  }

  after (date = null) {
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

  valueOf () {
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
