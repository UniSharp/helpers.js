import './'

const c = UniSharp.Helpers.collection

describe('Collection', () => {
  it('Accept only Array or Object', () => {
    expect(c('slice', 'Hello World')).toBe('Hello World')
  })

  it('Run own method first', () => {
    expect(c('count', { count: () => 10 })).toBe(10)
  })

  describe('#keys()', () => {
    it('should return the keys', () => {
      expect(c('keys', [1, 2, 3])).toEqual([0, 1, 2])
      expect(c('keys', { a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c'])
    })
  })

  describe('#values()', () => {
    it('should return the values', () => {
      expect(c('values', [1, 2, 3])).toEqual([1, 2, 3])
      expect(c('values', { a: 1, b: 2, c: 3 })).toEqual([1, 2, 3])
    })
  })

  describe('#contains()', () => {
    it('should determines whether the object contains a given item', () => {
      expect(c('contains', [1, 2, 3], 3)).toBe(true)
      expect(c('contains', [1, 2, 3], 4)).toBe(false)
      expect(c('contains', { a: 1, b: 2, c: 3 }, 3)).toBe(true)
      expect(c('contains', { a: 1, b: 2, c: 3 }, 4)).toBe(false)
    })
  })

  describe('#count()', () => {
    it('should return the total number', () => {
      expect(c('count', [1, 2, 3])).toBe(3)
      expect(c('count', { a: 1, b: 2, c: 3 })).toBe(3)
    })
  })

  describe('#has()', () => {
    it('should determines if a given key exists', () => {
      expect(c('has', [1, 2, 3, 4, 5], 0)).toBe(true)
      expect(c('has', [1, 2, 3, 4, 5], 5)).toBe(false)
      expect(c('has', [1, 2, 3, 4, 5], '0')).toBe(true)
      expect(c('has', [1, 2, 3, 4, 5], '5')).toBe(false)
      expect(c('has', [[1, 2, 3, 4, 5]], '0.0')).toBe(true)
      expect(c('has', [[1, 2, 3, 4, 5]], '0.5')).toBe(false)
      expect(c('has', [[{ a: 1, b: 2, c: 3 }]], '0.0.a')).toBe(true)
      expect(c('has', [[{ a: 1, b: 2, c: 3 }]], '0.0.d')).toBe(false)

      expect(c('has', [1, 2, 3, 4, 5], '[0]')).toBe(true)
      expect(c('has', [1, 2, 3, 4, 5], '[5]')).toBe(false)
      expect(c('has', [[1, 2, 3, 4, 5]], '[0][0]')).toBe(true)
      expect(c('has', [[1, 2, 3, 4, 5]], '[0][5]')).toBe(false)
      expect(c('has', [[{ a: 1, b: 2, c: 3 }]], '[0][0].a')).toBe(true)
      expect(c('has', [[{ a: 1, b: 2, c: 3 }]], '[0][0].d')).toBe(false)

      expect(c('has', [1, 2, 3, 4, 5], [0])).toBe(true)
      expect(c('has', [1, 2, 3, 4, 5], [5])).toBe(false)
      expect(c('has', [[1, 2, 3, 4, 5]], [0, 0])).toBe(true)
      expect(c('has', [[1, 2, 3, 4, 5]], [0, 5])).toBe(false)
      expect(c('has', [[{ a: 1, b: 2, c: 3 }]], [0, 0, 'a'])).toBe(true)
      expect(c('has', [[{ a: 1, b: 2, c: 3 }]], [0, 0, 'd'])).toBe(false)

      expect(c('has', { a: 1, b: 2, c: 3 }, 'a')).toBe(true)
      expect(c('has', { a: 1, b: 2, c: 3 }, 'd')).toBe(false)
      expect(c('has', { a: { b: { c: 1 } } }, 'a.b.c')).toBe(true)
      expect(c('has', { a: { b: { c: 1 } } }, 'a.b.d')).toBe(false)
      expect(c('has', { a: { b: { c: [1, 2, 3] } } }, 'a.b.c[0]')).toBe(true)
      expect(c('has', { a: { b: { c: [1, 2, 3] } } }, 'a.b.c[4]')).toBe(false)

      expect(c('has', { a: 1, b: 2, c: 3 }, ['a'])).toBe(true)
      expect(c('has', { a: 1, b: 2, c: 3 }, ['d'])).toBe(false)
      expect(c('has', { a: { b: { c: 1 } } }, ['a', 'b', 'c'])).toBe(true)
      expect(c('has', { a: { b: { c: 1 } } }, ['a', 'b', 'd'])).toBe(false)
      expect(c('has', { a: { b: { c: [1, 2, 3] } } }, ['a', 'b', 'c', 0])).toBe(true)
      expect(c('has', { a: { b: { c: [1, 2, 3] } } }, ['a', 'b', 'c', 4])).toBe(false)
    })
  })

  describe('#get()', () => {
    it('should return the value at a given key', () => {
      expect(c('get', [1, 2, 3, 4, 5], 0)).toBe(1)
      expect(c('get', [1, 2, 3, 4, 5], '0')).toBe(1)
      expect(c('get', [[1, 2, 3, 4, 5]], '0.0')).toBe(1)
      expect(c('get', [[{ a: 1, b: 2, c: 3 }]], '0.0.a')).toBe(1)

      expect(c('get', [1, 2, 3, 4, 5], '[0]')).toBe(1)
      expect(c('get', [[1, 2, 3, 4, 5]], '[0][0]')).toBe(1)
      expect(c('get', [[{ a: 1, b: 2, c: 3 }]], '[0][0].a')).toBe(1)

      expect(c('get', [1, 2, 3, 4, 5], [0])).toBe(1)
      expect(c('get', [[1, 2, 3, 4, 5]], [0, 0])).toBe(1)
      expect(c('get', [[{ a: 1, b: 2, c: 3 }]], [0, 0, 'a'])).toBe(1)

      expect(c('get', { a: 1, b: 2, c: 3 }, 'a')).toBe(1)
      expect(c('get', { a: { b: { c: 1 } } }, 'a.b.c')).toBe(1)
      expect(c('get', { a: { b: { c: [1, 2, 3] } } }, 'a.b.c.0')).toBe(1)
      expect(c('get', { a: { b: { c: [1, 2, 3] } } }, 'a.b.c[0]')).toBe(1)

      expect(c('get', { a: 1, b: 2, c: 3 }, ['a'])).toBe(1)
      expect(c('get', { a: { b: { c: 1 } } }, ['a', 'b', 'c'])).toBe(1)
      expect(c('get', { a: { b: { c: [1, 2, 3] } } }, ['a', 'b', 'c', 0])).toBe(1)
    })

    it('should return the default value if given key is not exists', () => {
      expect(c('get', [1, 2, 3, 4, 5], 5, 6)).toBe(6)
      expect(c('get', { a: 1, b: 2, c: 3 }, 'd', 4)).toBe(4)
    })
  })

  describe('#sum()', () => {
    it('should return the sum', () => {
      expect(c('sum', [1, 2, 3])).toBe(6)
      expect(c('sum', { a: 1, b: 2, c: 3 })).toBe(6)
    })

    it('should return the sum of string items', () => {
      expect(c('sum', ['1', '2', '3'])).toBe(6)
      expect(c('sum', { a: '1', b: '2', c: '3' })).toBe(6)
    })
  })

  describe('#avg()', () => {
    it('should return the average value', () => {
      expect(c('avg', [1, 2, 3])).toBe(2)
      expect(c('avg', { a: 1, b: 2, c: 3 })).toBe(2)
    })

    // it('should return the average value of a given key', () => {
    //   expect(c('avg', { a: 1, b: 2, c: 3 })).toBe(2)
    // })
  })

  describe('#each()', () => {
    it('should iterate over the array', () => {
      let count = 0
      let obj = [1, 2, 3]

      c('each', obj, (value, key, index) => {
        expect(key).toBe(count)
        expect(index).toBe(count)
        expect(value).toBe(++count)
      })

      expect(count).toBe(3)
    })

    it('should iterate over the object', () => {
      let count = 0
      let obj = { a: 1, b: 2, c: 3 }

      c('each', obj, (value, key, index) => {
        expect(key).toBe(['a', 'b', 'c'][count])
        expect(index).toBe(count)
        expect(value).toBe(++count)
      })

      expect(count).toBe(3)
    })

    it('should stop iterating when callback function return false', () => {
      let count = 0
      let obj = { a: 1, b: 2, c: 3 }

      c('each', obj, value => {
        if (value === 2) {
          return false
        }

        count++
      })

      expect(count).toBe(1)
    })
  })

  describe('#slice()', () => {
    it('should return a new object without args', () => {
      expect(c('slice', [1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
      expect(c('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 })).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 })
    })

    it('should slice of items with positive begin', () => {
      expect(c('slice', [1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5])
      expect(c('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, 2)).toEqual({ c: 3, d: 4, e: 5 })
    })

    it('should slice of items with negative begin', () => {
      expect(c('slice', [1, 2, 3, 4, 5], -2)).toEqual([4, 5])
      expect(c('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, -2)).toEqual({ d: 4, e: 5 })
    })

    it('should slice of items with begin and end', () => {
      expect(c('slice', [1, 2, 3, 4, 5], 2, 4)).toEqual([3, 4])
      expect(c('slice', [1, 2, 3, 4, 5], 2, -2)).toEqual([3])
      expect(c('slice', [1, 2, 3, 4, 5], -3, 4)).toEqual([3, 4])
      expect(c('slice', [1, 2, 3, 4, 5], -3, -2)).toEqual([3])

      expect(c('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, 2, 4)).toEqual({ c: 3, d: 4 })
      expect(c('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, 2, -2)).toEqual({ c: 3 })
      expect(c('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, -3, 4)).toEqual({ c: 3, d: 4 })
      expect(c('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, -3, -2)).toEqual({ c: 3 })
    })

    it('should slice of items with begin and end but not enough items', () => {
      expect(c('slice', [1, 2, 3, 4, 5], 4, 6)).toEqual([5])
      expect(c('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, 4, 6)).toEqual({ e: 5 })
    })
  })

  describe('#reduce()', () => {
    it('should iterate over the items and reduce to a single value', () => {
      expect(
        c('reduce', [1, 2, 3], (carry, value) => carry + value, 0)
      ).toBe(6)
      expect(
        c('reduce', [1, 2, 3], (carry, value, key, index) => `${carry} - ${index} - ${key} - ${value}`, 'x')
      ).toBe('x - 0 - 0 - 1 - 1 - 1 - 2 - 2 - 2 - 3')

      expect(
        c('reduce', { a: 1, b: 2, c: 3 }, (carry, value) => carry + value, 0)
      ).toBe(6)
      expect(
        c('reduce', { a: 1, b: 2, c: 3 }, (carry, value, key, index) => `${carry} - ${index} - ${key} - ${value}`, 'x')
      ).toBe('x - 0 - a - 1 - 1 - b - 2 - 2 - c - 3')
    })
  })

  describe('#toArray()', () => {
    it('should covert items to array', () => {
      expect(c('toArray', [1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
      expect(c('toArray', [{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }])).toEqual([[1, 2], [3, 4], [5]])
      expect(c('toArray', { a: 1, b: 2, c: 3, d: 4, e: 5 })).toEqual([1, 2, 3, 4, 5])
      expect(c('toArray', { a: { a: 1, b: 2 }, b: { c: 3, d: 4 }, c: { e: 5 } })).toEqual([[1, 2], [3, 4], [5]])
    })
  })

  describe('#chunk()', () => {
    it('should chunk into multiple array of a given size', () => {
      expect(c('chunk', [1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
      expect(c('chunk', { a: 1, b: 2, c: 3, d: 4, e: 5 }, 2)).toEqual([{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }])
    })
  })

  describe('#filter', () => {
    it('should filter the items using the given callback', () => {
      expect(c('filter', [1, 2, 3], value => value > 1)).toEqual([2, 3])
      expect(c('filter', [1, 2, 3], (value, key, index) => key === 1 && index === 1)).toEqual([2])
      expect(c('filter', { a: 1, b: 2, c: 3 }, value => value > 1)).toEqual({ b: 2, c: 3 })
      expect(c('filter', { a: 1, b: 2, c: 3 }, (value, key, index) => key === 'b' && index === 1)).toEqual({ b: 2 })
    })

    it('should filter the items without callback', () => {
      expect(c('filter', ['', false, 0, 1, 2, 3])).toEqual([1, 2, 3])
      expect(c('filter', { a: '', b: false, c: 0, d: 1, e: 2, f: 3 })).toEqual({ d: 1, e: 2, f: 3 })
    })
  })

  describe('#isEmpty()', () => {
    it('should return true if is empty', () => {
      expect(c('isEmpty', [])).toBe(true)
      expect(c('isEmpty', {})).toBe(true)
      expect(c('isEmpty', [1, 2, 3])).toBe(false)
      expect(c('isEmpty', { a: 1, b: 2, c: 3 })).toBe(false)
    })
  })

  describe('#isEmpty()', () => {
    it('should return true if is not empty', () => {
      expect(c('isNotEmpty', [1, 2, 3])).toBe(true)
      expect(c('isNotEmpty', { a: 1, b: 2, c: 3 })).toBe(true)
      expect(c('isNotEmpty', [])).toBe(false)
      expect(c('isNotEmpty', {})).toBe(false)
    })
  })

  describe('#first()', () => {
    it('should return the first element', () => {
      expect(c('first', [1, 2, 3])).toBe(1)
      expect(c('first', { a: 1, b: 2, c: 3 })).toBe(1)
    })

    it('should return null if array is empty', () => {
      expect(c('first', [])).toBe(null)
      expect(c('first', {})).toBe(null)
    })

    it('should return the first element which passes a given truth test', () => {
      expect(c('first', [1, 2, 3], n => n > 1)).toBe(2)
      expect(c('first', { a: 1, b: 2, c: 3 }, n => n > 1)).toBe(2)
    })
  })

  describe('#last()', () => {
    it('should return the last element', () => {
      expect(c('last', [1, 2, 3])).toBe(3)
      expect(c('last', { a: 1, b: 2, c: 3 })).toBe(3)
    })

    it('should return null if array is empty', () => {
      expect(c('last', [])).toBe(null)
      expect(c('last', {})).toBe(null)
    })

    it('should return the last element which passes a given truth test', () => {
      expect(c('last', [1, 2, 3], n => n < 3)).toBe(2)
      expect(c('last', { a: 1, b: 2, c: 3 }, n => n < 3)).toBe(2)
    })
  })

  describe('#map()', () => {
    it('should iterate over the items and replace value from callback', () => {
      expect(c('map', [1, 2, 3], (value, key, index) => `${index} - ${key} - ${value}`)).toEqual(['0 - 0 - 1', '1 - 1 - 2', '2 - 2 - 3'])
      expect(c('map', { a: 1, b: 2, c: 3 }, (value, key, index) => `${index} - ${key} - ${value}`)).toEqual({ a: '0 - a - 1', b: '1 - b - 2', c: '2 - c - 3' })
    })
  })

  describe('#flatten()', () => {
    it('should flatten a multi dimensional object into signle dimension', () => {
      expect(c('flatten', [[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5])
      expect(c('flatten', [{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }])).toEqual([1, 2, 3, 4, 5])
      expect(c('flatten', { a: { a: 1, b: 2 }, b: { c: 3, d: 4 }, c: { e: 5 } })).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('#min()', () => {
    it('should return the minimum value', () => {
      expect(c('min', [1, 2, 3])).toBe(1)
      expect(c('min', { a: 1, b: 2, c: 3 })).toBe(1)
    })
  })

  describe('#max()', () => {
    it('should return the maximum value', () => {
      expect(c('max', [1, 2, 3])).toBe(3)
      expect(c('max', { a: 1, b: 2, c: 3 })).toBe(3)
    })
  })

  describe('#swap()', () => {
    it('should swap two value of given keys', () => {
      expect(c('swap', [1, 2, 3], 1, 2)).toEqual([1, 3, 2])
      expect(c('swap', { a: 1, b: 2, c: 3 }, 'b', 'c')).toEqual({ a: 1, b: 3, c: 2 })
    })
  })

  describe('#shuffle()', () => {
    it('should shuffle the itmes', () => {
      let originalRandom = Math.random

      Math.random = () => 0

      expect(c('shuffle', [1, 2, 3])).toEqual([3, 1, 2])
      expect(c('shuffle', { a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 })

      Math.random = originalRandom
    })
  })

  describe('#take()', () => {
    it('should return a new collection with the specified number of items', () => {
      expect(c('take', [1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3])
      expect(c('take', { a: 1, b: 2, c: 3, d: 4, e: 5 }, 3)).toEqual({ a: 1, b: 2, c: 3 })
    })
  })

  describe('#unique()', () => {
    it('should return all of the unique items', () => {
      expect(c('unique', [1, 2, 2])).toEqual([1, 2])
      expect(c('unique', { a: 1, b: 2, c: 2 })).toEqual({ a: 1, b: 2 })
    })
  })
})
