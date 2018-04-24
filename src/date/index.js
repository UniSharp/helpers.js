(() => {
  const PROPERTIES = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond']

  class DateInterval {
    constructor () {
      PROPERTIES.forEach(key => {
        this[`${key}s`] = 0
      })
    }

    invert () {
      let newInterval = new DateInterval()

      PROPERTIES.forEach(key => {
        newInterval[`${key}s`] = this[`${key}s`] * -1
      })

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

  PROPERTIES.forEach(key => {
    Number.prototype[key] = function () {
      return this[`${key}s`]()
    }

    Number.prototype[`${key}s`] = function () {
      let interval = new DateInterval()

      interval[`${key}s`] = this

      return interval
    }
  })

  global.DateInterval = DateInterval
})()
