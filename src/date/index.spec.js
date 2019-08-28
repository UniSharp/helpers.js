import DateInterval from './'

describe('DateInterval', () => {
  describe('#constructor()', () => {
    it('can create duration without argument', () => {
      const interval = new DateInterval()

      expect(interval.milliseconds).toBe(0)
      expect(interval.seconds).toBe(0)
      expect(interval.minutes).toBe(0)
      expect(interval.hours).toBe(0)
      expect(interval.days).toBe(0)
      expect(interval.months).toBe(0)
      expect(interval.years).toBe(0)
    })

    it('can create duration via config', () => {
      const interval = new DateInterval({
        milliseconds: 1,
        seconds: 1,
        minutes: 1,
        hours: 1,
        days: 1,
        months: 1,
        years: 1
      })

      expect(interval.milliseconds).toBe(1)
      expect(interval.seconds).toBe(1)
      expect(interval.minutes).toBe(1)
      expect(interval.hours).toBe(1)
      expect(interval.days).toBe(1)
      expect(interval.months).toBe(1)
      expect(interval.years).toBe(1)
    })
  })

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

  describe('#valueOf()', () => {
    it('should return a new date that is as far in the future as this interval', () => {
      expect(new DateInterval({ milliseconds: 1 }).valueOf()).toBe(1)
      expect(new DateInterval({ seconds: 1      }).valueOf()).toBe(1000)
      expect(new DateInterval({ minutes: 1      }).valueOf()).toBe(1000 * 60)
      expect(new DateInterval({ hours: 1        }).valueOf()).toBe(1000 * 60 * 60)
      expect(new DateInterval({ days: 1         }).valueOf()).toBe(1000 * 60 * 60 * 24)
      expect(new DateInterval({ months: 1       }).valueOf()).toBe(1000 * 60 * 60 * 24 * 30)
      expect(new DateInterval({ years: 1        }).valueOf()).toBe(1000 * 60 * 60 * 24 * 30 * 365)
      expect(new DateInterval({
        milliseconds: 1,
        seconds: 1,
        minutes: 1,
        hours: 1,
        days: 1,
        months: 1,
        years: 1
      }).valueOf()).toBe(
        1 +
        1000 +
        1000 * 60 +
        1000 * 60 * 60 +
        1000 * 60 * 60 * 24 +
        1000 * 60 * 60 * 24 * 30 +
        1000 * 60 * 60 * 24 * 30 * 365
      )

      expect(new DateInterval({ seconds: 2 }) - new DateInterval({ seconds: 1 })).toBe(1000)
      expect(new DateInterval({ seconds: 2 }) + new DateInterval({ seconds: 1 })).toBe(3000)
      expect(new DateInterval({ seconds: 2 }) > new DateInterval({ seconds: 1 })).toBe(true)
      expect(new DateInterval({ seconds: 2 }) < new DateInterval({ seconds: 1 })).toBe(false)
      expect(new DateInterval({ seconds: 2 }) >= new DateInterval({ seconds: 1 })).toBe(true)
      expect(new DateInterval({ seconds: 2 }) <= new DateInterval({ seconds: 1 })).toBe(false)
      expect(new DateInterval({ seconds: 1 }) >= new DateInterval({ seconds: 1 })).toBe(true)
      expect(new DateInterval({ seconds: 1 }) <= new DateInterval({ seconds: 1 })).toBe(true)
    })
  })
})
