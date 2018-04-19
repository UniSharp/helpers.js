const assert = require('assert')

describe('Number', () => {
  describe('#format()', () => {
    it('should format a number with grouped thousands', () => {
      assert.equal((1000000).format(), '1,000,000')
    })
  })

  describe('#times()', () => {
    it('should iterate callback function n items', () => {
      assert.deepEqual((3).times(n => n), [1, 2, 3])
      assert.deepEqual((3).times(n => n * 2), [2, 4, 6])
    })
  })

  describe('#upto()', () => {
    it('should iterate callback function from n up to and including limit', () => {
      assert.deepEqual((1).upto(3, n => n), [1, 2, 3])
      assert.deepEqual((1).upto(3, n => n * 2), [2, 4, 6])
    })
  })

  describe('#downto()', () => {
    it('should iterate callback function from n down to and including limit', () => {
      assert.deepEqual((3).downto(1, n => n), [3, 2, 1])
      assert.deepEqual((3).downto(1, n => n * 2), [6, 4, 2])
    })
  })
})
