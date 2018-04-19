const assert = require('assert')

describe('Object', () => {
  describe('#keys()', () => {
    it('should return the keys', () => {
      assert.deepEqual({ a: 1, b: 2, c: 3 }.keys(), ['a', 'b', 'c'])
    })
  })

  describe('#values()', () => {
    it('should return the values', () => {
      assert.deepEqual({ a: 1, b: 2, c: 3 }.values(), [1, 2, 3])
    })
  })

  describe('#count()', () => {
    it('should return the total number', () => {
      assert.equal({ a: 1, b: 2, c: 3 }.count(), 3)
    })
  })

  describe('#sum()', () => {
    it('should return the sum', () => {
      assert.equal({ a: 1, b: 2, c: 3 }.sum(), 6)
    })

    it('should return the sum of string items', () => {
      assert.equal({ a: '1', b: '2', c: '3' }.sum(), 6)
    })
  })

  describe('#avg()', () => {
    it('should return the average value', () => {
      assert.equal({ a: 1, b: 2, c: 3 }.avg(), 2)
    })
  })

  describe('#min()', () => {
    it('should return the minimum value', () => {
      assert.equal({ a: 1, b: 2, c: 3 }.min(), 1)
    })
  })

  describe('#max()', () => {
    it('should return the maximum value', () => {
      assert.equal({ a: 1, b: 2, c: 3 }.max(), 3)
    })
  })

  describe('#each()', () => {
    it('should iterate over the items', () => {
      let count = 0
      let obj = { a: 1, b: 2, c: 3 }

      obj.each((value, key) => {
        assert.equal(key, ['a', 'b', 'c'][count])
        assert.equal(value, ++count)
      })

      assert.equal(count, 3)
    })

    it('should stop iterating when callback function return false', () => {
      let count = 0
      let obj = { a: 1, b: 2, c: 3 }

      obj.each(value => {
        if (value === 2) {
          return false
        }

        count++
      })

      assert.equal(count, 1)
    })
  })

  describe('#filter', () => {
    it('should filter the object using the given callback', () => {
      assert.deepEqual({ a: 1, b: 2, c: 3 }.filter(value => value > 1), { b: 2, c: 3 })
      assert.deepEqual({ a: 1, b: 2, c: 3 }.filter((value, key) => key === 'b'), { b: 2 })
    })
  })

  describe('#first()', () => {
    it('should return the first element', () => {
      assert.equal({ a: 1, b: 2, c: 3 }.first(), 1)
    })

    it('should return null if array is empty', () => {
      assert.equal({}.first(), null)
    })

    it('should return the first element which passes a given truth test', () => {
      assert.equal({ a: 1, b: 2, c: 3 }.first(n => n > 1), 2)
    })
  })

  describe('#last()', () => {
    it('should return the last element', () => {
      assert.equal({ a: 1, b: 2, c: 3 }.last(), 3)
    })

    it('should return null if array is empty', () => {
      assert.equal({}.last(), null)
    })

    it('should return the last element which passes a given truth test', () => {
      assert.equal({ a: 1, b: 2, c: 3 }.last(n => n < 3), 2)
    })
  })
})
