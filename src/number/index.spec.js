import './'

describe('Number', () => {
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
})
