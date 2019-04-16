export default class DateInterval {
  constructor () {
    this.years = 0
    this.months = 0
    this.days = 0
    this.hours = 0
    this.minutes = 0
    this.seconds = 0
    this.milliseconds = 0
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
}
