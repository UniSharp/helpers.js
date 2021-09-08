import { DateInterval } from '../src/date-interval'

describe('DateInterval', () => {
  describe('#constructor()', () => {
    it('can create duration without argument', () => {
      const interval = new DateInterval()

      expect(interval.getConfig()).toStrictEqual({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      })
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

      expect(interval.getConfig()).toStrictEqual({
        years: 1,
        months: 1,
        days: 1,
        hours: 1,
        minutes: 1,
        seconds: 1,
        milliseconds: 1
      })
    })
  })

  describe('#ago()', () => {
    it('should return a new date that is as far in the past as this interval', () => {
      const interval = new DateInterval()

      interval.setConfig({ seconds: 1 })

      expect(interval.ago() instanceof Date).toBe(true)
      expect(Math.round((Date.now() - interval.ago().getTime()) / 1000)).toBe(1)

      interval.setConfig({
        years: 1,
        months: 1,
        days: 1,
        hours: 1,
        minutes: 1,
        seconds: 1,
        milliseconds: 1
      })

      expect(interval.ago(new Date(2002, 2, 2, 2, 2, 2, 2)).getTime()).toBe(new Date(2001, 1, 1, 1, 1, 1, 1).getTime())
    })
  })

  describe('#after()', () => {
    it('should return a new date that is as far in the future as this interval', () => {
      const interval = new DateInterval()

      interval.setConfig({ seconds: 1 })

      expect(interval.after() instanceof Date).toBe(true)
      expect(Math.round((interval.after().getTime() - Date.now()) / 1000)).toBe(1)

      interval.setConfig({
        years: 1,
        months: 1,
        days: 1,
        hours: 1,
        minutes: 1,
        seconds: 1,
        milliseconds: 1
      })

      expect(interval.after(new Date(2001, 1, 1, 1, 1, 1, 1)).getTime()).toBe(new Date(2002, 2, 2, 2, 2, 2, 2).getTime())
    })
  })

  describe('#valueOf()', () => {
    it('should return a new date that is as far in the future as this interval', () => {
      expect(new DateInterval({ milliseconds: 1 }).valueOf()).toBe(1)
      expect(new DateInterval({ seconds: 1 }).valueOf()).toBe(1000)
      expect(new DateInterval({ minutes: 1 }).valueOf()).toBe(1000 * 60)
      expect(new DateInterval({ hours: 1 }).valueOf()).toBe(1000 * 60 * 60)
      expect(new DateInterval({ days: 1 }).valueOf()).toBe(1000 * 60 * 60 * 24)
      expect(new DateInterval({ months: 1 }).valueOf()).toBe(1000 * 60 * 60 * 24 * 30)
      expect(new DateInterval({ years: 1 }).valueOf()).toBe(1000 * 60 * 60 * 24 * 30 * 365)
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
    })
  })
})
