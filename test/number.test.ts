import { DateInterval } from '../src/date-interval'
import {
  random,
  format,
  times,
  upto,
  downto,
  round,
  floor,
  ceil,
  abs,
  year,
  month,
  day,
  hour,
  minute,
  second,
  millisecond,
  years,
  months,
  days,
  hours,
  minutes,
  seconds,
  milliseconds
} from '../src/number'

describe('Number', () => {
  describe('#random()', () => {
    const originalRandom: () => number = Math.random

    it('should return a random float from 0 to 1 (exclusive)', () => {
      Math.random = (): number => 0.5

      expect(random()).toEqual(0.5)
    })

    it('should return a random integer from 0 to max (exclusive)', () => {
      Math.random = (): number => 0.5

      expect(random(5)).toEqual(2)
    })

    it('should return a random float from 0 to max (exclusive)', () => {
      Math.random = (): number => 0.5

      expect(random(2.5)).toEqual(1.25)
    })

    Math.random = originalRandom
  })

  describe('#format()', () => {
    it('should format a number with grouped thousands', () => {
      expect(format(1000000)).toBe('1,000,000')
    })
  })

  describe('#times()', () => {
    it('should iterate callback function n items', () => {
      expect(times(3, n => n)).toEqual([1, 2, 3])
      expect(times(3, n => n * 2)).toEqual([2, 4, 6])
    })
  })

  describe('#upto()', () => {
    it('should iterate callback function from n up to and including limit', () => {
      expect(upto(1, 3, n => n)).toEqual([1, 2, 3])
      expect(upto(1, 3, n => n * 2)).toEqual([2, 4, 6])
    })
  })

  describe('#downto()', () => {
    it('should iterate callback function from n down to and including limit', () => {
      expect(downto(3, 1, n => n)).toEqual([3, 2, 1])
      expect(downto(3, 1, n => n * 2)).toEqual([6, 4, 2])
    })
  })

  describe('#round()', () => {
    it('should round a float', () => {
      expect(round(1.4)).toEqual(1)
      expect(round(1.5)).toEqual(2)
      expect(round(1.44)).toEqual(1)
      expect(round(1.55)).toEqual(2)
    })

    it('should round a float with precision', () => {
      expect(round(1.44, 1)).toEqual(1.4)
      expect(round(1.45, 1)).toEqual(1.5)
      expect(round(1.444, 2)).toEqual(1.44)
      expect(round(1.445, 2)).toEqual(1.45)
    })
  })

  describe('#floor()', () => {
    it('should round fractions down a float', () => {
      expect(floor(1.4)).toEqual(1)
      expect(floor(1.5)).toEqual(1)
    })
  })

  describe('#ceil()', () => {
    it('should round fractions up a float', () => {
      expect(ceil(1.4)).toEqual(2)
      expect(ceil(1.5)).toEqual(2)
    })
  })

  describe('#abs()', () => {
    it('should return the absolute value', () => {
      expect(abs(10)).toEqual(10)
      expect(abs(-10)).toEqual(10)
    })
  })

  describe('#millisecond()', () => {
    it('should return a date interval', () => {
      expect(millisecond(1) instanceof DateInterval).toBe(true)
      expect(millisecond(1).getConfig().milliseconds).toBe(1)
    })
  })

  describe('#milliseconds()', () => {
    it('should return a date interval', () => {
      expect(milliseconds(10) instanceof DateInterval).toBe(true)
      expect(milliseconds(10).getConfig().milliseconds).toBe(10)
    })
  })

  describe('#second()', () => {
    it('should return a date interval', () => {
      expect(second(1) instanceof DateInterval).toBe(true)
      expect(second(1).getConfig().seconds).toBe(1)
    })
  })

  describe('#seconds()', () => {
    it('should return a date interval', () => {
      expect(seconds(10) instanceof DateInterval).toBe(true)
      expect(seconds(10).getConfig().seconds).toBe(10)
    })
  })

  describe('#minute()', () => {
    it('should return a date interval', () => {
      expect(minute(1) instanceof DateInterval).toBe(true)
      expect(minute(1).getConfig().minutes).toBe(1)
    })
  })

  describe('#minutes()', () => {
    it('should return a date interval', () => {
      expect(minutes(10) instanceof DateInterval).toBe(true)
      expect(minutes(10).getConfig().minutes).toBe(10)
    })
  })

  describe('#hour()', () => {
    it('should return a date interval', () => {
      expect(hour(1) instanceof DateInterval).toBe(true)
      expect(hour(1).getConfig().hours).toBe(1)
    })
  })

  describe('#hours()', () => {
    it('should return a date interval', () => {
      expect(hours(10) instanceof DateInterval).toBe(true)
      expect(hours(10).getConfig().hours).toBe(10)
    })
  })

  describe('#day()', () => {
    it('should return a date interval', () => {
      expect(day(1) instanceof DateInterval).toBe(true)
      expect(day(1).getConfig().days).toBe(1)
    })
  })

  describe('#days()', () => {
    it('should return a date interval', () => {
      expect(days(10) instanceof DateInterval).toBe(true)
      expect(days(10).getConfig().days).toBe(10)
    })
  })

  describe('#month()', () => {
    it('should return a date interval', () => {
      expect(month(1) instanceof DateInterval).toBe(true)
      expect(month(1).getConfig().months).toBe(1)
    })
  })

  describe('#months()', () => {
    it('should return a date interval', () => {
      expect(months(10) instanceof DateInterval).toBe(true)
      expect(months(10).getConfig().months).toBe(10)
    })
  })

  describe('#year()', () => {
    it('should return a date interval', () => {
      expect(year(1) instanceof DateInterval).toBe(true)
      expect(year(1).getConfig().years).toBe(1)
    })
  })

  describe('#years()', () => {
    it('should return a date interval', () => {
      expect(years(10) instanceof DateInterval).toBe(true)
      expect(years(10).getConfig().years).toBe(10)
    })
  })
})
