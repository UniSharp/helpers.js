import DateInterval from './'

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
