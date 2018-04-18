require('../src')

const assert = require('assert')

describe('Array', () => {
  describe('#count()', () => {
    it('should return the total number', () => {
      assert.equal([1, 2, 3].count(), 3)
    })
  })

  describe('#sum()', () => {
    it('should return the sum', () => {
      assert.equal([1, 2, 3].sum(), 6)
    })

    it('should return the sum of string items', () => {
      assert.equal(['1', '2', '3'].sum(), 6)
    })
  })

  describe('#avg()', () => {
    it('should return the average value', () => {
      assert.equal([1, 2, 3].avg(), 2)
    })
  })

  describe('#min()', () => {
    it('should return the minimum value', () => {
      assert.equal([1, 2, 3].min(), 1)
    })
  })

  describe('#max()', () => {
    it('should return the maximum value', () => {
      assert.equal([1, 2, 3].max(), 3)
    })
  })

  describe('#each()', () => {
    it('should iterate over the items', () => {
      [1, 2, 3].each((value, index) => {
        assert.equal(value, [1, 2, 3][index])
      })
    })
  })

  describe('#first()', () => {
    it('should return the first element', () => {
      assert.equal([1, 2, 3].first(), 1)
    })

    it('should return null if array is empty', () => {
      assert.equal([].first(), null)
    })

    it('should return the first element which passes a given truth test', () => {
      assert.equal([1, 2, 3].first(n => n > 1), 2)
    })
  })

  describe('#last()', () => {
    it('should return the last element', () => {
      assert.equal([1, 2, 3].last(), 3)
    })

    it('should return null if array is empty', () => {
      assert.equal([].last(), null)
    })

    it('should return the last element which passes a given truth test', () => {
      assert.equal([1, 2, 3].last(n => n < 3), 2)
    })
  })

  describe('#unique()', () => {
    it('should return all of the unique items', () => {
      assert.deepEqual([1, 1, 2, 2, 3, 3].unique(), [1, 2, 3])
    })
  })
})

describe('String', () => {
  describe('#slugify()', () => {
    it('should slugify a string', () => {
      assert.equal(' A:B/C.D??E=F&G '.slugify(), 'a-b-c-d-e-f-g')
    })
  })
})

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
