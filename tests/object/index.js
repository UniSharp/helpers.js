const assert = require('assert')

describe('Object', () => {
  describe('#isObject', () => {
    it('should determines whether the given item is object', () => {
      assert.equal(Object.isObject({}), true)
      assert.equal(Object.isObject([]), false)
    })
  })

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

  describe('#contains()', () => {
    it('should determines whether the object contains a given item', () => {
      assert.equal({ a: 1, b: 2, c: 3 }.contains(3), true)
      assert.equal({ a: 1, b: 2, c: 3 }.contains(4), false)
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

  describe('#each()', () => {
    it('should iterate over the items', () => {
      let count = 0
      let obj = { a: 1, b: 2, c: 3 }

      obj.each((value, key, index) => {
        assert.equal(key, ['a', 'b', 'c'][count])
        assert.equal(index, count)
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

  describe('#slice()', () => {
    it('should return a new object without args', () => {
      assert.deepEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 }.slice(), { a: 1, b: 2, c: 3, d: 4, e: 5 })
    })

    it('should slice of items with positive begin', () => {
      assert.deepEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 }.slice(2), { c: 3, d: 4, e: 5 })
    })

    it('should slice of items with negative begin', () => {
      assert.deepEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 }.slice(-2), { d: 4, e: 5 })
    })

    it('should slice of items with begin and end', () => {
      assert.deepEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 }.slice(2, 4), { c: 3, d: 4 })
      assert.deepEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 }.slice(2, -2), { c: 3 })
      assert.deepEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 }.slice(-3, 4), { c: 3, d: 4 })
      assert.deepEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 }.slice(-3, -2), { c: 3 })
    })

    it('should slice of items with begin and end but not enough items', () => {
      assert.deepEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 }.slice(4, 6), { e: 5 })
    })
  })

  describe('#toArray()', () => {
    it('should covert object to array', () => {
      assert.deepEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 }.toArray(), [1, 2, 3, 4, 5])
      assert.deepEqual({ a: { a: 1, b: 2 }, b: { c: 3, d: 4 }, c: { e: 5 } }.toArray(), [[1, 2], [3, 4], [5]])
    })
  })

  describe('#chunk()', () => {
    it('should chunk into multiple array of a given size', () => {
      assert.deepEqual(
        { a: 1, b: 2, c: 3, d: 4, e: 5 }.chunk(2),
        [{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }]
      )
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

  describe('#map()', () => {
    it('should iterate over the items and replace value from callback', () => {
      assert.deepEqual(
        { a: 1, b: 2, c: 3 }.map((value, key, index) => `${index} - ${key} - ${value}`),
        { a: '0 - a - 1', b: '1 - b - 2', c: '2 - c - 3' }
      )
    })
  })

  describe('#reduce()', () => {
    it('should iterate over the items and reduce to a single value', () => {
      assert.deepEqual({ a: 1, b: 2, c: 3 }.reduce((carry, value) => carry + value, 0), 6)
      assert.deepEqual(
        { a: 1, b: 2, c: 3 }.reduce((carry, value, key, index) => `${carry} - ${index} - ${key} - ${value}`, ''),
        ' - 0 - a - 1 - 1 - b - 2 - 2 - c - 3'
      )
    })
  })

  describe('#flatten()', () => {
    it('should flatten a multi dimensional object into signle dimension', () => {
      assert.deepEqual({ a: { a: 1, b: 2 }, b: { c: 3, d: 4 }, c: { e: 5 } }.flatten(), [1, 2, 3, 4, 5])
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

  describe('#unique()', () => {
    it('should return all of the unique items', () => {
      assert.deepEqual({ a: 1, b: 2, c: 2 }.unique(), { a: 1, b: 2 })
    })
  })
})
