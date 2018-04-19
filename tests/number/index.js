const assert = require('assert')

describe('Number', () => {
  describe('#format()', () => {
    it('should format a number with grouped thousands', () => {
      assert.equal((1000000).format(), '1,000,000')
    })
  })

  describe('#times()', () => {
    it('should iterate callback function n items', () => {
      assert.deepEqual((3).times(n => n), [0, 1, 2])
    })
  })
})
