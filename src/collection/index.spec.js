import c from './'

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

    it('should return the sum of a given key', () => {
      expect(c('sum', [{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }])).toBe(0)
      expect(c('sum', [{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }], 'a')).toBe(6)
    })
  })

  describe('#avg()', () => {
    it('should return null if is empty', () => {
      expect(c('avg', [])).toBe(null)
    })

    it('should return the average value', () => {
      expect(c('avg', [1, 2, 3])).toBe(2)
      expect(c('avg', { a: 1, b: 2, c: 3 })).toBe(2)
    })

    it('should return the average value of a given key', () => {
      expect(c('avg', [{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }])).toBe(0)
      expect(c('avg', [{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }], 'a')).toBe(2)
    })
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

  describe('#except', () => {
    it('should return the items except for those with the specified keys', () => {
      expect(c('except', [1, 2, 3], [0, 1])).toEqual([3])
      expect(c('except', { a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ c: 3 })

      expect(c('except', [1, 2, 3], 0, 1)).toEqual([3])
      expect(c('except', { a: 1, b: 2, c: 3 }, 'a', 'b')).toEqual({ c: 3 })
    })
  })

  describe('#filter', () => {
    it('should filter the items using the given callback', () => {
      expect(c('filter', [1, 2, 3], value => value > 1)).toEqual([2, 3])
      expect(c('filter', [1, 2, 3], (value, key, index) => key === 1 && index === 1)).toEqual([2])
      expect(c('filter', { a: 1, b: 2, c: 3 }, value => value > 1)).toEqual({ b: 2, c: 3 })
      expect(c('filter', { a: 1, b: 2, c: 3 }, (value, key, index) => key === 'b' && index === 1)).toEqual({ b: 2 })
    })

    it('should filter the items using the given value', () => {
      expect(c('filter', [1, 2, 3], 1)).toEqual([1])
      expect(c('filter', { a: 1, b: 2, c: 3 }, 1)).toEqual({ a: 1 })
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
      expect(c('map', [1, 2, 3], (value, key, index) => `${index} - ${key} - ${value}`))
        .toEqual(['0 - 0 - 1', '1 - 1 - 2', '2 - 2 - 3'])
      expect(c('map', { a: 1, b: 2, c: 3 }, (value, key, index) => `${index} - ${key} - ${value}`))
        .toEqual({ a: '0 - a - 1', b: '1 - b - 2', c: '2 - c - 3' })
    })
  })

  describe('#mapWithKeys()', () => {
    it('should iterate over the items and replace key and value from callback', () => {
      expect(c('mapWithKeys', [1, 2], (value, key, index) => ({ [`${index} - ${key}`]: `${index} - ${key} - ${value}` })))
        .toEqual({ '0 - 0': '0 - 0 - 1', '1 - 1': '1 - 1 - 2' })
      expect(c('mapWithKeys', { a: 1, b: 2 }, (value, key, index) => ({ [`${index} - ${key}`]: `${index} - ${key} - ${value}` })))
        .toEqual({ '0 - a': '0 - a - 1', '1 - b': '1 - b - 2' })
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

  describe('#only', () => {
    it('should return the items with the specified keys', () => {
      expect(c('only', [1, 2, 3], [0, 1])).toEqual([1, 2])
      expect(c('only', { a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ a: 1, b: 2 })

      expect(c('only', [1, 2, 3], 0, 1)).toEqual([1, 2])
      expect(c('only', { a: 1, b: 2, c: 3 }, 'a', 'b')).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#pipe', () => {
    it('should pass the items to the given callback and return the result', () => {
      expect(c('pipe', [1, 2, 3], items => [...items, 4])).toEqual([1, 2, 3, 4])
      expect(c('pipe', { a: 1, b: 2, c: 3 }, items => ({ ...items, b: 4 }))).toEqual({ a: 1, b: 2, c: 3, b: 4 })
    })
  })

  describe('#pluck', () => {
    it('should retrive all of the values for a given key', () => {
      expect(c('pluck', [[1, 2, 3], [1, 2, 3]], 0)).toEqual([1, 1])
      expect(c('pluck', [{ a: 1, b: 2 }, { a: 1, b: 2 }], 'a')).toEqual([1, 1])
      expect(c('pluck', { a: { a: 1, b: 2 }, b: { a: 1, b: 2 } }, 'a')).toEqual([1, 1])

      expect(c('pluck', [{ a: 1, b: 'a' }, { a: 2, b: 'b' }], 'a', 'b')).toEqual({ a: 1, b: 2 })
      expect(c('pluck', { a: { a: 1, b: 'a' }, b: { a: 2, b: 'b' } }, 'a', 'b')).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#reject', () => {
    it('should reject the items using the given callback', () => {
      expect(c('reject', [1, 2, 3], value => value > 1)).toEqual([1])
      expect(c('reject', [1, 2, 3], (value, key, index) => key === 1 && index === 1)).toEqual([1, 3])
      expect(c('reject', { a: 1, b: 2, c: 3 }, value => value > 1)).toEqual({ a: 1 })
      expect(c('reject', { a: 1, b: 2, c: 3 }, (value, key, index) => key === 'b' && index === 1)).toEqual({ a: 1, c: 3 })
    })

    it('should reject the items using the given value', () => {
      expect(c('reject', [1, 2, 3], 1)).toEqual([2, 3])
      expect(c('reject', { a: 1, b: 2, c: 3 }, 1)).toEqual({ b: 2, c: 3 })
    })

    it('should throw error without callback', () => {
      expect(() => c('reject', ['', false, 0, 1, 2, 3])).toThrow('Callback function is required.')
      expect(() => c('reject', { a: '', b: false, c: 0, d: 1, e: 2, f: 3 })).toThrow('Callback function is required.')
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

  describe('#diff()', () => {
    it('should computes the difference of collections', () => {
      expect(c('diff', [1, 2, 3], [1, 2])).toEqual([3])
      expect(c('diff', [1, 2, 3, 3], [1, 2])).toEqual([3, 3])
      expect(c('diff', { a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ c: 3 })
      expect(c('diff', { a: 1, b: 2, c: 3, d: 3 }, { a: 1, b: 2 })).toEqual({ c: 3, d: 3 })
      expect(c('diff', [1, 2, 3], { a: 1, b: 2 })).toEqual([3])
      expect(c('diff', { a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ c: 3 })
    })
  })

  describe('#diffKeys()', () => {
    it('should computes the difference of collections using keys for comparison', () => {
      expect(c('diffKeys', [1, 2, 3], [1, 2])).toEqual({ 2: 3 })
      expect(c('diffKeys', [1, 2, 3, 3], [1, 2])).toEqual({ 2: 3, 3: 3 })
      expect(c('diffKeys', { a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ c: 3 })
      expect(c('diffKeys', { a: 1, b: 2, c: 3, d: 3 }, { a: 1, b: 2 })).toEqual({ c: 3, d: 3 })
      expect(c('diffKeys', [1, 2, 3], { a: 1, b: 2 })).toEqual({ 0:1, 1: 2, 2: 3 })
      expect(c('diffKeys', { a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ a: 1, b: 2, c: 3 })
    })
  })

  describe('#intersect()', () => {
    it('should computes the intersection of collections', () => {
      expect(c('intersect', [1, 2, 3], [1, 2])).toEqual([1, 2])
      expect(c('intersect', [1, 2, 2, 3], [1, 2])).toEqual([1, 2, 2])
      expect(c('intersect', { a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
      expect(c('intersect', { a: 1, b: 2, c: 2, d: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2, c: 2 })
      expect(c('intersect', [1, 2, 3], { a: 1, b: 2 })).toEqual([1, 2])
      expect(c('intersect', { a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#intersectByKeys()', () => {
    it('should computes the intersection of collections using keys for comparison', () => {
      expect(c('intersectByKeys', [1, 2, 3], [1, 2])).toEqual({ 0: 1, 1: 2 })
      expect(c('intersectByKeys', [1, 2, 2, 3], [1, 2])).toEqual({ 0: 1, 1: 2 })
      expect(c('intersectByKeys', { a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
      expect(c('intersectByKeys', { a: 1, b: 2, c: 2, d: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
      expect(c('intersectByKeys', [1, 2, 3], { a: 1, b: 2 })).toEqual({})
      expect(c('intersectByKeys', { a: 1, b: 2, c: 3 }, [1, 2])).toEqual({})
    })
  })

  describe('#merge()', () => {
    it('should merge collections', () => {
      expect(c('merge', [1, 2, 3], [4, 5])).toEqual([1, 2, 3, 4, 5])
      expect(c('merge', { a: 1, b: 2, c: 3 }, { d: 4, e: 5 })).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 })
      expect(c('merge', [1, 2, 3], { a: 4, b: 5 })).toEqual({ 0: 1, 1: 2, 2: 3, a: 4, b: 5 })
      expect(c('merge', { a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ a: 1, b: 2, c: 3, 0: 1, 1: 2 })
      expect(c('merge', { a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 })).toEqual({ a: 4, b: 5, c: 6 })
    })

    it('should merge more than one collections', () => {
      expect(c('merge', [1, 2, 3], [4, 5], [6, 7])).toEqual([1, 2, 3, 4, 5, 6, 7])
      expect(c('merge', { a: 1, b: 2, c: 3 }, [4, 5], [6, 7])).toEqual({ a: 1, b: 2, c: 3, 0: 4, 1: 5, 2: 6, 3: 7 })
    })
  })

  describe('#keyBy', () => {
    it('should keys the collection by the given key', () => {
      expect(c('keyBy', [{ a: 1, b: 'a' }, { a: 2, b: 'b' }], 'b')).toEqual({ a: { a: 1, b: 'a' }, b: { a: 2, b: 'b' } })
      expect(c('keyBy', { a: { a: 1, b: 'c' }, b: { a: 2, b: 'd' } }, 'b')).toEqual({ c: { a: 1, b: 'c' }, d: { a: 2, b: 'd' } })
    })
  })

  describe('#groupBy', () => {
    it('should groups the collection by the given key', () => {
      expect(c('groupBy', [{ a: 'a' }, { a: 'a' }], 'a')).toEqual({ a: [{ a: 'a' }, { a: 'a' }] })
      expect(c('groupBy', { a: { a: 'a' }, b: { a: 'a' } }, 'a')).toEqual({ a: { a: { a: 'a' }, b: { a: 'a' } } })
    })

    it('should groups the collection by the given callback', () => {
      expect(c('groupBy', [{ a: 'a' }, { a: 'a' }], row => row.a)).toEqual({ a: [{ a: 'a' }, { a: 'a' }] })
      expect(c('groupBy', { a: { a: 'a' }, b: { a: 'a' } }, row => row.a)).toEqual({ a: { a: { a: 'a' }, b: { a: 'a' } } })
    })
  })

  describe('#sort', () => {
    it('should sort the collection', () => {
      expect(c('sort', [3, 5, 3, 4, 2, 1])).toEqual([1, 2, 3, 3, 4, 5])
      expect(c('sort', [[5, 4], [5, 3]])).toEqual([[5, 3], [5, 4]])
      expect(c('sort', [{ a: 5, b: 4 }, { a: 5, b: 3 }])).toEqual([{ a: 5, b: 3 }, { a: 5, b: 4 }])
      expect(JSON.stringify(c('sort', { a: 5, b: 4, c: 3 }))).toBe(JSON.stringify({ c: 3, b: 4, a: 5 }))
      expect(JSON.stringify(c('sort', { a: [5, 4], b: [5, 3] }))).toBe(JSON.stringify({ b: [5, 3], a: [5, 4] }))
      expect(JSON.stringify(c('sort', { a: { a: 5, b: 4 }, b: { a: 5, b: 3 } }))).toBe(JSON.stringify({ b: { a: 5, b: 3 }, a: { a: 5, b: 4 } }))
    })

    it('should sort the collection using the given callback', () => {
      expect(c('sort', [1, 2, 4, 3, 5, 3], (a, b) => b - a)).toEqual([5, 4, 3, 3, 2, 1])
      expect(c('sort', [[1, 2], [3, 4]], (a, b) => b[0] - a[0])).toEqual([[3, 4], [1, 2]])
      expect(c('sort', [{ a: 1, b: 2 }, { a: 3, b: 4 }], (a, b) => b.a - a.a)).toEqual([{ a: 3, b: 4 }, { a: 1, b: 2 }])
      expect(JSON.stringify(c('sort', { a: 1, b: 2, c: 3 }, (a, b) => b - a))).toBe(JSON.stringify({ c: 3, b: 2, a: 1 }))
      expect(JSON.stringify(c('sort', { a: [1, 2], b: [3, 4] }, (a, b) => b[0] - a[0]))).toBe(JSON.stringify({ b: [3, 4], a: [1, 2] }))
      expect(JSON.stringify(c('sort', { a: { a: 1, b: 2 }, b: { a: 3, b: 4 } }, (a, b) => b.a - a.a))).toBe(JSON.stringify({ b: { a: 3, b: 4 }, a: { a: 1, b: 2 } }))
    })

    it('should sort the collection which contains string', () => {
      expect(c('sort', ['c', 'b', 'a'])).toEqual(['a', 'b', 'c'])
      expect(JSON.stringify(c('sort', { a: 'c', b: 'b', c: 'a' }))).toBe(JSON.stringify({ c: 'a', b: 'b', a: 'c' }))
    })
  })

  describe('#sortBy', () => {
    it('should sort the collection by the given key', () => {
      expect(c('sortBy', [[1, 4], [2, 3]], 1)).toEqual([[2, 3], [1, 4]])
      expect(c('sortBy', [{ a: 1, b: 4 }, { a: 2, b: 3 }], 'b')).toEqual([{ a: 2, b: 3 }, { a: 1, b: 4 }])
      expect(JSON.stringify(c('sortBy', { a: [1, 4], b: [2, 3] }, 1))).toBe(JSON.stringify({ b: [2, 3], a: [1, 4] }))
      expect(JSON.stringify(c('sortBy', { a: { a: 1, b: 4 }, b: { a: 2, b: 3 } }, 'b'))).toBe(JSON.stringify({ b: { a: 2, b: 3 }, a: { a: 1, b: 4 } }))
    })

    it('should sort the collection using the given callback', () => {
      expect(c('sortBy', [[1, 4], [2, 3]], item => item[1])).toEqual([[2, 3], [1, 4]])
      expect(c('sortBy', [{ a: 1, b: 4 }, { a: 2, b: 3 }], item => item.b)).toEqual([{ a: 2, b: 3 }, { a: 1, b: 4 }])
      expect(JSON.stringify(c('sortBy', { a: [1, 4], b: [2, 3] }, item => item[1]))).toBe(JSON.stringify({ b: [2, 3], a: [1, 4] }))
      expect(JSON.stringify(c('sortBy', { a: { a: 1, b: 4 }, b: { a: 2, b: 3 } }, item => item.b))).toBe(JSON.stringify({ b: { a: 2, b: 3 }, a: { a: 1, b: 4 } }))
    })
  })

  describe('#append', () => {
    it('should appends an item to the end of the collection', () => {
      expect(c('append', [1, 2, 3, 4], 5)).toEqual([1, 2, 3, 4, 5])
      expect(JSON.stringify(c('append', { a: 1, b: 2 }, 3, 'c'))).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }))
    })
  })

  describe('#prepend', () => {
    it('should adds an item to the beginning of the collection', () => {
      expect(c('prepend', [2, 3, 4, 5], 1)).toEqual([1, 2, 3, 4, 5])
      expect(JSON.stringify(c('prepend', { b: 2, c: 3 }, 1, 'a'))).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }))
    })
  })

  describe('#index', () => {
    it('should return the index of the first item in collection', () => {
      expect(c('index', [1, 2, 3, 4, 5], 3)).toBe(2)
      expect(c('index', [1, 2, 3, 4, 5], 0)).toBe(null)
      expect(c('index', { a: 1, b: 2, c: 3 }, 2)).toBe('b')
      expect(c('index', { a: 1, b: 2, c: 3 }, 0)).toBe(null)
    })
  })

  describe('#insert', () => {
    it('should insert an item before the element with the given index of the collection', () => {
      expect(c('insert', [1, 2, 4, 5], 2, 3)).toEqual([1, 2, 3, 4, 5])
      expect(c('insert', [1, 2, 4, 5], 5, 3)).toEqual([1, 2, 4, 5, 3])
      expect(JSON.stringify(c('insert', { a: 1, c: 3 }, 'c', 2, 'b'))).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }))
      expect(JSON.stringify(c('insert', { a: 1, c: 3 }, 'e', 2, 'b'))).toBe(JSON.stringify({ a: 1, c: 3, b: 2 }))
    })
  })

  describe('#join', () => {
    it('should join the items in a collection', () => {
      expect(c('join', [1, 2, 3, 4, 5])).toBe('1, 2, 3, 4, 5')
      expect(c('join', { a: 1, b: 2, c: 3 })).toBe('1, 2, 3')
    })

    it('should join the items in a collection with a given glue', () => {
      expect(c('join', [1, 2, 3, 4, 5], '-')).toBe('1-2-3-4-5')
      expect(c('join', { a: 1, b: 2, c: 3 }, '-')).toBe('1-2-3')
    })
  })

  describe('#partition', () => {
    it('should separate elements that pass a given truth test from those that do not', () => {
      expect(c('partition', [1, 2, 3, 4, 5], (value, key) => key < 2 && value < 3)).toEqual([[1, 2], [3, 4, 5]])
      expect(c('partition', { a: 1, b: 2, c: 3 }, (value, key) => key === 'a' && value === 1)).toEqual([{ a: 1 }, { b: 2, c: 3 }])
    })
  })
})
