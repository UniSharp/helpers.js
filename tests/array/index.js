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
      let count = 0
      let array = [1, 2, 3]

      array.each((value, index) => {
        assert.equal(value, ++count)
      })

      assert.equal(count, 3)
    })

    it('should stop iterating when callback function return false', () => {
      let count = 0
      let array = [1, 2, 3]

      array.each(value => {
        if (value === 2) {
          return false
        }

        count++
      })

      assert.equal(count, 1)
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

  describe('#chunk()', () => {
    it('should chunk into multiple array of a given size', () => {
      assert.deepEqual([1, 2, 3, 4, 5].chunk(2), [[1, 2], [3, 4], [5]])
    })
  })

  describe('#flatten()', () => {
    it('should flatten a multi dimensional array into signle dimension', () => {
      assert.deepEqual([[1, 2], [3, 4], [5]].flatten(), [1, 2, 3, 4, 5])
    })
  })

  describe('#contains()', () => {
    it('should determines whether the collection contains a given item', () => {
      assert.equal([1, 2, 3, 4, 5].contains(3), true)
      assert.equal([1, 2, 3, 4, 5].contains(6), false)
    })
  })
})
