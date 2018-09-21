import './'

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
})
