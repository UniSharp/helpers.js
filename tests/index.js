require('../src')

const assert = require('assert')

describe('Array', function () {
  describe('#count()', function () {
    it('should return the total number', function () {
      assert.equal([1, 2, 3].count(), 3)
    })
  })

  describe('#sum()', function () {
    it('should return the sum', function () {
      assert.equal([1, 2, 3].sum(), 6)
    })

    it('should return the sum of string items', function () {
      assert.equal(['1', '2', '3'].sum(), 6)
    })
  })

  describe('#avg()', function () {
    it('should return the average value', function () {
      assert.equal([1, 2, 3].avg(), 2)
    })
  })

  describe('#min()', function () {
    it('should return the minimum value', function () {
      assert.equal([1, 2, 3].min(), 1)
    })
  })

  describe('#max()', function () {
    it('should return the maximum value', function () {
      assert.equal([1, 2, 3].max(), 3)
    })
  })

  describe('#each()', function () {
    it('should iterate over the items', function () {
      [1, 2, 3].each(function (value, index) {
        assert.equal(value, [1, 2, 3][index])
      })
    })
  })

  describe('#first()', function () {
    it('should return the first element', function () {
      assert.equal([1, 2, 3].first(), 1)
    })

    it('should return null if array is empty', function () {
      assert.equal([].first(), null)
    })

    it('should return the first element which passes a given truth test', function () {
      assert.equal([1, 2, 3].first(function (n) {
        return n > 1
      }), 2)
    })
  })

  describe('#last()', function () {
    it('should return the last element', function () {
      assert.equal([1, 2, 3].last(), 3)
    })

    it('should return null if array is empty', function () {
      assert.equal([].last(), null)
    })

    it('should return the last element which passes a given truth test', function () {
      assert.equal([1, 2, 3].last(function (n) {
        return n < 3
      }), 2)
    })
  })
})

describe('String', function () {
  describe('#slugify()', function () {
    it('should slugify a string', function () {
      assert.equal(' A:B/C.D??E=F&G '.slugify(), 'a-b-c-d-e-f-g')
    })
  })
})

describe('Number', function () {
  describe('#format()', function () {
    it('should format a number with grouped thousands and dollar sign', function () {
      assert.equal((1000000).format(), '$ 1,000,000')
    })

    it('should format a number with grouped thousands but dollar sign', function () {
      assert.equal((1000000).format(false), '1,000,000')
    })
  })

  describe('#times()', function () {
    it('should iterate callback function n items', function () {
      assert.deepEqual((3).times(function (n) {
        return n
      }), [0, 1, 2])
    })
  })
})
