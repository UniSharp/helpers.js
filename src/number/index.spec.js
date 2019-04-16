import { Helpers } from '../'

Helpers.init()

describe('Number', () => {
  describe('#random()', () => {
    let originalRandom = Math.random

    it('should return a random float from 0 to 1 (exclusive)', () => {
      Math.random = () => 0.5

      expect(Number.random()).toEqual(0.5)
    })

    it('should return a random integer from 0 to max (exclusive)', () => {
      Math.random = () => 0.5

      expect(Number.random(5)).toEqual(2)
    })

    it('should return a random float from 0 to max (exclusive)', () => {
      Math.random = () => 0.5

      expect(Number.random(2.5)).toEqual(1.25)
    })

    Math.random = originalRandom
  })

  describe('#format()', () => {
    it('should format a number with grouped thousands', () => {
      expect((1000000).format()).toBe('1,000,000')
    })
  })

  describe('#times()', () => {
    it('should iterate callback function n items', () => {
      expect((3).times(n => n)).toEqual([1, 2, 3])
      expect((3).times(n => n * 2)).toEqual([2, 4, 6])
    })
  })

  describe('#upto()', () => {
    it('should iterate callback function from n up to and including limit', () => {
      expect((1).upto(3, n => n)).toEqual([1, 2, 3])
      expect((1).upto(3, n => n * 2)).toEqual([2, 4, 6])
    })
  })

  describe('#downto()', () => {
    it('should iterate callback function from n down to and including limit', () => {
      expect((3).downto(1, n => n)).toEqual([3, 2, 1])
      expect((3).downto(1, n => n * 2)).toEqual([6, 4, 2])
    })
  })

  describe('#round()', () => {
    it('should round a float', () => {
      expect((1.4).round()).toEqual(1)
      expect((1.5).round()).toEqual(2)
      expect((1.44).round()).toEqual(1)
      expect((1.55).round()).toEqual(2)
    })

    it('should round a float with precision', () => {
      expect((1.44).round(1)).toEqual(1.4)
      expect((1.45).round(1)).toEqual(1.5)
      expect((1.444).round(2)).toEqual(1.44)
      expect((1.445).round(2)).toEqual(1.45)
    })
  })

  describe('#floor()', () => {
    it('should round fractions down a float', () => {
      expect((1.4).floor()).toEqual(1)
      expect((1.5).floor()).toEqual(1)
    })
  })

  describe('#ceil()', () => {
    it('should round fractions up a float', () => {
      expect((1.4).ceil()).toEqual(2)
      expect((1.5).ceil()).toEqual(2)
    })
  })

  describe('#abs()', () => {
    it('should return the absolute value', () => {
      expect((10).abs()).toEqual(10)
      expect((-10).abs()).toEqual(10)
    })
  })

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
