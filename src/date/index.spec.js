import './'

describe('Number', () => {
  describe('#millisecond()', () => {
    it('should return a date interval', () => {
      expect((1).millisecond() instanceof DateInterval).toBe(true)
      expect((1).millisecond().milliseconds).toBe(1)
    })
  })

  describe('#milliseconds()', () => {
    it('should return a date interval', () => {
      expect((10).milliseconds() instanceof DateInterval).toBe(true)
      expect((10).milliseconds().milliseconds).toBe(10)
    })
  })

  describe('#second()', () => {
    it('should return a date interval', () => {
      expect((1).second() instanceof DateInterval).toBe(true)
      expect((1).second().seconds).toBe(1)
    })
  })

  describe('#seconds()', () => {
    it('should return a date interval', () => {
      expect((10).seconds() instanceof DateInterval).toBe(true)
      expect((10).seconds().seconds).toBe(10)
    })
  })

  describe('#minute()', () => {
    it('should return a date interval', () => {
      expect((1).minute() instanceof DateInterval).toBe(true)
      expect((1).minute().minutes).toBe(1)
    })
  })

  describe('#minutes()', () => {
    it('should return a date interval', () => {
      expect((10).minutes() instanceof DateInterval).toBe(true)
      expect((10).minutes().minutes).toBe(10)
    })
  })

  describe('#hour()', () => {
    it('should return a date interval', () => {
      expect((1).hour() instanceof DateInterval).toBe(true)
      expect((1).hour().hours).toBe(1)
    })
  })

  describe('#hours()', () => {
    it('should return a date interval', () => {
      expect((10).hours() instanceof DateInterval).toBe(true)
      expect((10).hours().hours).toBe(10)
    })
  })

  describe('#day()', () => {
    it('should return a date interval', () => {
      expect((1).day() instanceof DateInterval).toBe(true)
      expect((1).day().days).toBe(1)
    })
  })

  describe('#days()', () => {
    it('should return a date interval', () => {
      expect((10).days() instanceof DateInterval).toBe(true)
      expect((10).days().days).toBe(10)
    })
  })

  describe('#month()', () => {
    it('should return a date interval', () => {
      expect((1).month() instanceof DateInterval).toBe(true)
      expect((1).month().months).toBe(1)
    })
  })

  describe('#months()', () => {
    it('should return a date interval', () => {
      expect((10).months() instanceof DateInterval).toBe(true)
      expect((10).months().months).toBe(10)
    })
  })

  describe('#year()', () => {
    it('should return a date interval', () => {
      expect((1).year() instanceof DateInterval).toBe(true)
      expect((1).year().years).toBe(1)
    })
  })

  describe('#years()', () => {
    it('should return a date interval', () => {
      expect((10).years() instanceof DateInterval).toBe(true)
      expect((10).years().years).toBe(10)
    })
  })
})

describe('DateInterval', () => {
  describe('#ago()', () => {
    it('should return a new date that is as far in the past as this interval', () => {
      let interval = new DateInterval

      interval.seconds = 1

      expect(interval.ago() instanceof Date).toBe(true)
      expect(Math.round((Date.now() - interval.ago().getTime()) / 1000)).toBe(1)

      interval.milliseconds = 1
      interval.seconds = 1
      interval.minutes = 1
      interval.hours = 1
      interval.days = 1
      interval.months = 1
      interval.years = 1

      expect(interval.ago(new Date(2002, 2, 2, 2, 2, 2, 2)).getTime()).toBe(new Date(2001, 1, 1, 1, 1, 1, 1).getTime())
    })
  })

  describe('#after()', () => {
    it('should return a new date that is as far in the future as this interval', () => {
      let interval = new DateInterval

      interval.seconds = 1

      expect(interval.after() instanceof Date).toBe(true)
      expect(Math.round((interval.after().getTime() - Date.now()) / 1000)).toBe(1)

      interval.milliseconds = 1
      interval.seconds = 1
      interval.minutes = 1
      interval.hours = 1
      interval.days = 1
      interval.months = 1
      interval.years = 1

      expect(interval.after(new Date(2001, 1, 1, 1, 1, 1, 1)).getTime()).toBe(new Date(2002, 2, 2, 2, 2, 2, 2).getTime())
    })
  })
})
