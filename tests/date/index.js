const assert = require('assert')

describe('Number', () => {
  describe('#millisecond()', () => {
    it('should return a date interval', () => {
      assert.equal((1).millisecond() instanceof DateInterval, true)
      assert.equal((1).millisecond().milliseconds, 1)
    })
  })

  describe('#milliseconds()', () => {
    it('should return a date interval', () => {
      assert.equal((10).milliseconds() instanceof DateInterval, true)
      assert.equal((10).milliseconds().milliseconds, 10)
    })
  })

  describe('#second()', () => {
    it('should return a date interval', () => {
      assert.equal((1).second() instanceof DateInterval, true)
      assert.equal((1).second().seconds, 1)
    })
  })

  describe('#seconds()', () => {
    it('should return a date interval', () => {
      assert.equal((10).seconds() instanceof DateInterval, true)
      assert.equal((10).seconds().seconds, 10)
    })
  })

  describe('#minute()', () => {
    it('should return a date interval', () => {
      assert.equal((1).minute() instanceof DateInterval, true)
      assert.equal((1).minute().minutes, 1)
    })
  })

  describe('#minutes()', () => {
    it('should return a date interval', () => {
      assert.equal((10).minutes() instanceof DateInterval, true)
      assert.equal((10).minutes().minutes, 10)
    })
  })

  describe('#hour()', () => {
    it('should return a date interval', () => {
      assert.equal((1).hour() instanceof DateInterval, true)
      assert.equal((1).hour().hours, 1)
    })
  })

  describe('#hours()', () => {
    it('should return a date interval', () => {
      assert.equal((10).hours() instanceof DateInterval, true)
      assert.equal((10).hours().hours, 10)
    })
  })

  describe('#day()', () => {
    it('should return a date interval', () => {
      assert.equal((1).day() instanceof DateInterval, true)
      assert.equal((1).day().days, 1)
    })
  })

  describe('#days()', () => {
    it('should return a date interval', () => {
      assert.equal((10).days() instanceof DateInterval, true)
      assert.equal((10).days().days, 10)
    })
  })

  describe('#month()', () => {
    it('should return a date interval', () => {
      assert.equal((1).month() instanceof DateInterval, true)
      assert.equal((1).month().months, 1)
    })
  })

  describe('#months()', () => {
    it('should return a date interval', () => {
      assert.equal((10).months() instanceof DateInterval, true)
      assert.equal((10).months().months, 10)
    })
  })

  describe('#year()', () => {
    it('should return a date interval', () => {
      assert.equal((1).year() instanceof DateInterval, true)
      assert.equal((1).year().years, 1)
    })
  })

  describe('#years()', () => {
    it('should return a date interval', () => {
      assert.equal((10).years() instanceof DateInterval, true)
      assert.equal((10).years().years, 10)
    })
  })
})

describe('DateInterval', () => {
  describe('#ago()', () => {
    it('should return a new date that is as far in the past as this interval', () => {
      let interval = new DateInterval

      interval.seconds = 1

      assert.equal(interval.ago() instanceof Date, true)
      assert.equal(Math.round((Date.now() - interval.ago().getTime()) / 1000), 1)

      interval.milliseconds = 1
      interval.seconds = 1
      interval.minutes = 1
      interval.hours = 1
      interval.days = 1
      interval.months = 1
      interval.years = 1

      assert.equal(interval.ago(new Date(2002, 2, 2, 2, 2, 2, 2)).getTime(), new Date(2001, 1, 1, 1, 1, 1, 1).getTime())
    })
  })

  describe('#after()', () => {
    it('should return a new date that is as far in the future as this interval', () => {
      let interval = new DateInterval

      interval.seconds = 1

      assert.equal(interval.after() instanceof Date, true)
      assert.equal(Math.round((interval.after().getTime() - Date.now()) / 1000), 1)

      interval.milliseconds = 1
      interval.seconds = 1
      interval.minutes = 1
      interval.hours = 1
      interval.days = 1
      interval.months = 1
      interval.years = 1

      assert.equal(interval.after(new Date(2001, 1, 1, 1, 1, 1, 1)).getTime(), new Date(2002, 2, 2, 2, 2, 2, 2).getTime())
    })
  })
})
