import { Helpers } from '../'

const call = Helpers.Collection.call

const testIterator = (method, callback) => {
  it('should iterate correct key, value and index with array', () => {
    let count = 0
    let array = ['a', 'b', 'c']

    call(method, array, (value, key, index) => {
      expect(value).toBe(array[count])
      expect(key).toBe(count)
      expect(index).toBe(count++)

      if (callback) {
        return callback(value, key, index)
      }

      return true
    })

    expect(count).toBe(3)
  })

  it('should iterate correct key, value and index with object', () => {
    let count = 0
    let object = { a: 1, b: 2, c: 3 }
    let keys = ['a', 'b', 'c']
    let values = [1, 2, 3]

    call(method, object, (value, key, index) => {
      expect(value).toBe(values[count])
      expect(key).toBe(keys[count])
      expect(index).toBe(count++)

      if (callback) {
        return callback(value, key, index)
      }

      return true
    })

    expect(count).toBe(3)
  })
}

describe('Collection', () => {
  it('Accept only Array or Object', () => {
    expect(call('slice', 'Hello World')).toBe('Hello World')
  })

  it('Run own method first', () => {
    const Foo = () => {}
    Foo.prototype = { count: () => 10 }

    expect(call('count', new Foo)).toBe(10)
    expect(call('count', { count: () => 10 })).toBe(10)
  })

  describe('#keys()', () => {
    it('should return the keys', () => {
      expect(call('keys', [1, 2, 3])).toEqual([0, 1, 2])
      expect(call('keys', { a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c'])
    })
  })

  describe('#values()', () => {
    it('should return the values', () => {
      expect(call('values', [1, 2, 3])).toEqual([1, 2, 3])
      expect(call('values', { a: 1, b: 2, c: 3 })).toEqual([1, 2, 3])
    })
  })

  describe('#contains()', () => {
    it('should determines whether the object contains a given item', () => {
      expect(call('contains', [1, 2, 3], 3)).toBe(true)
      expect(call('contains', [1, 2, 3], 4)).toBe(false)
      expect(call('contains', { a: 1, b: 2, c: 3 }, 3)).toBe(true)
      expect(call('contains', { a: 1, b: 2, c: 3 }, 4)).toBe(false)
    })
  })

  describe('#count()', () => {
    it('should return the total number', () => {
      expect(call('count', [1, 2, 3])).toBe(3)
      expect(call('count', { a: 1, b: 2, c: 3 })).toBe(3)
    })
  })

  describe('#has()', () => {
    it('should determines if a given key exists', () => {
      expect(call('has', [1, 2, 3, 4, 5], 0)).toBe(true)
      expect(call('has', [1, 2, 3, 4, 5], 5)).toBe(false)
      expect(call('has', [1, 2, 3, 4, 5], '0')).toBe(true)
      expect(call('has', [1, 2, 3, 4, 5], '5')).toBe(false)
      expect(call('has', [[1, 2, 3, 4, 5]], '0.0')).toBe(true)
      expect(call('has', [[1, 2, 3, 4, 5]], '0.5')).toBe(false)
      expect(call('has', [[{ a: 1, b: 2, c: 3 }]], '0.0.a')).toBe(true)
      expect(call('has', [[{ a: 1, b: 2, c: 3 }]], '0.0.d')).toBe(false)

      expect(call('has', [1, 2, 3, 4, 5], '[0]')).toBe(true)
      expect(call('has', [1, 2, 3, 4, 5], '[5]')).toBe(false)
      expect(call('has', [[1, 2, 3, 4, 5]], '[0][0]')).toBe(true)
      expect(call('has', [[1, 2, 3, 4, 5]], '[0][5]')).toBe(false)
      expect(call('has', [[{ a: 1, b: 2, c: 3 }]], '[0][0].a')).toBe(true)
      expect(call('has', [[{ a: 1, b: 2, c: 3 }]], '[0][0].d')).toBe(false)

      expect(call('has', [1, 2, 3, 4, 5], [0])).toBe(true)
      expect(call('has', [1, 2, 3, 4, 5], [5])).toBe(false)
      expect(call('has', [[1, 2, 3, 4, 5]], [0, 0])).toBe(true)
      expect(call('has', [[1, 2, 3, 4, 5]], [0, 5])).toBe(false)
      expect(call('has', [[{ a: 1, b: 2, c: 3 }]], [0, 0, 'a'])).toBe(true)
      expect(call('has', [[{ a: 1, b: 2, c: 3 }]], [0, 0, 'd'])).toBe(false)

      expect(call('has', { a: 1, b: 2, c: 3 }, 'a')).toBe(true)
      expect(call('has', { a: 1, b: 2, c: 3 }, 'd')).toBe(false)
      expect(call('has', { a: { b: { c: 1 } } }, 'a.b.c')).toBe(true)
      expect(call('has', { a: { b: { c: 1 } } }, 'a.b.d')).toBe(false)
      expect(call('has', { a: { b: { c: [1, 2, 3] } } }, 'a.b.c[0]')).toBe(true)
      expect(call('has', { a: { b: { c: [1, 2, 3] } } }, 'a.b.c[4]')).toBe(false)

      expect(call('has', { a: 1, b: 2, c: 3 }, ['a'])).toBe(true)
      expect(call('has', { a: 1, b: 2, c: 3 }, ['d'])).toBe(false)
      expect(call('has', { a: { b: { c: 1 } } }, ['a', 'b', 'c'])).toBe(true)
      expect(call('has', { a: { b: { c: 1 } } }, ['a', 'b', 'd'])).toBe(false)
      expect(call('has', { a: { b: { c: [1, 2, 3] } } }, ['a', 'b', 'c', 0])).toBe(true)
      expect(call('has', { a: { b: { c: [1, 2, 3] } } }, ['a', 'b', 'c', 4])).toBe(false)
    })
  })

  describe('#get()', () => {
    it('should return the value at a given key', () => {
      expect(call('get', [1, 2, 3, 4, 5], 0)).toBe(1)
      expect(call('get', [1, 2, 3, 4, 5], '0')).toBe(1)
      expect(call('get', [[1, 2, 3, 4, 5]], '0.0')).toBe(1)
      expect(call('get', [[{ a: 1, b: 2, c: 3 }]], '0.0.a')).toBe(1)

      expect(call('get', [1, 2, 3, 4, 5], '[0]')).toBe(1)
      expect(call('get', [[1, 2, 3, 4, 5]], '[0][0]')).toBe(1)
      expect(call('get', [[{ a: 1, b: 2, c: 3 }]], '[0][0].a')).toBe(1)

      expect(call('get', [1, 2, 3, 4, 5], [0])).toBe(1)
      expect(call('get', [[1, 2, 3, 4, 5]], [0, 0])).toBe(1)
      expect(call('get', [[{ a: 1, b: 2, c: 3 }]], [0, 0, 'a'])).toBe(1)

      expect(call('get', { a: 1, b: 2, c: 3 }, 'a')).toBe(1)
      expect(call('get', { a: { b: { c: 1 } } }, 'a.b.c')).toBe(1)
      expect(call('get', { a: { b: { c: [1, 2, 3] } } }, 'a.b.c.0')).toBe(1)
      expect(call('get', { a: { b: { c: [1, 2, 3] } } }, 'a.b.c[0]')).toBe(1)

      expect(call('get', { a: 1, b: 2, c: 3 }, ['a'])).toBe(1)
      expect(call('get', { a: { b: { c: 1 } } }, ['a', 'b', 'c'])).toBe(1)
      expect(call('get', { a: { b: { c: [1, 2, 3] } } }, ['a', 'b', 'c', 0])).toBe(1)
    })

    it('should return the default value if given key is not exists', () => {
      expect(call('get', [1, 2, 3, 4, 5], 5, 6)).toBe(6)
      expect(call('get', { a: 1, b: 2, c: 3 }, 'd', 4)).toBe(4)
    })
  })

  describe('#set()', () => {
    it('should set the value at a given key', () => {
      expect(call('set', [0, 2, 3, 4, 5], 0, 1)).toEqual([1, 2, 3, 4, 5])
      expect(call('set', [0, 2, 3, 4, 5], '0', 1)).toEqual([1, 2, 3, 4, 5])
      expect(call('set', [[0, 2, 3, 4, 5]], '0.0', 1)).toEqual([[1, 2, 3, 4, 5]])
      expect(call('set', [[{ a: 0, b: 2, c: 3 }]], '0.0.a', 1)).toEqual([[{ a: 1, b: 2, c: 3 }]])

      expect(call('set', [0, 2, 3, 4, 5], '[0]', 1)).toEqual([1, 2, 3, 4, 5])
      expect(call('set', [[0, 2, 3, 4, 5]], '[0][0]', 1)).toEqual([[1, 2, 3, 4, 5]])
      expect(call('set', [[{ a: 0, b: 2, c: 3 }]], '[0][0].a', 1)).toEqual([[{ a: 1, b: 2, c: 3 }]])

      expect(call('set', [0, 2, 3, 4, 5], [0], 1)).toEqual([1, 2, 3, 4, 5])
      expect(call('set', [[0, 2, 3, 4, 5]], [0, 0], 1)).toEqual([[1, 2, 3, 4, 5]])
      expect(call('set', [[{ a: 0, b: 2, c: 3 }]], [0, 0, 'a'], 1)).toEqual([[{ a: 1, b: 2, c: 3 }]])

      expect(call('set', { a: 0, b: 2, c: 3 }, 'a', 1)).toEqual({ a: 1, b: 2, c: 3 })
      expect(call('set', { a: { b: { c: 0 } } }, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } })
      expect(call('set', { a: { b: { c: [0, 2, 3] } } }, 'a.b.c.0', 1)).toEqual({ a: { b: { c: [1, 2, 3] } } })
      expect(call('set', { a: { b: { c: [0, 2, 3] } } }, 'a.b.c[0]', 1)).toEqual({ a: { b: { c: [1, 2, 3] } } })

      expect(call('set', { a: 0, b: 2, c: 3 }, ['a'], 1)).toEqual({ a: 1, b: 2, c: 3 })
      expect(call('set', { a: { b: { c: 0 } } }, ['a', 'b', 'c'], 1)).toEqual({ a: { b: { c: 1 } } })
      expect(call('set', { a: { b: { c: [0, 2, 3] } } }, ['a', 'b', 'c', 0], 1)).toEqual({ a: { b: { c: [1, 2, 3] } } })

      expect(call('set', [], '0.0.a', 1)).toEqual([[{ a: 1 }]])
      expect(call('set', [], '[0][0].a', 1)).toEqual([[{ a: 1 }]])
      expect(call('set', {}, 'a.b.c[0]', 1)).toEqual({ a: { b: { c: [1] } } })
      expect(call('set', {}, ['a', 'b', 'c', 0], 1)).toEqual({ a: { b: { c: [1] } } })
    })
  })

  describe('#sum()', () => {
    it('should return the sum', () => {
      expect(call('sum', [1, 2, 3])).toBe(6)
      expect(call('sum', { a: 1, b: 2, c: 3 })).toBe(6)
    })

    it('should return the sum of string items', () => {
      expect(call('sum', ['1', '2', '3'])).toBe(6)
      expect(call('sum', { a: '1', b: '2', c: '3' })).toBe(6)
    })

    it('should return the sum of a given key', () => {
      expect(call('sum', [{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }])).toBe(0)
      expect(call('sum', [{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }], 'a')).toBe(6)
    })
  })

  describe('#avg()', () => {
    it('should return null if is empty', () => {
      expect(call('avg', [])).toBe(null)
    })

    it('should return the average value', () => {
      expect(call('avg', [1, 2, 3])).toBe(2)
      expect(call('avg', { a: 1, b: 2, c: 3 })).toBe(2)
    })

    it('should return the average value of a given key', () => {
      expect(call('avg', [{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }])).toBe(0)
      expect(call('avg', [{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }], 'a')).toBe(2)
    })
  })

  describe('#each()', () => {
    testIterator('each')

    it('should stop iterating when callback function return false', () => {
      let count = 0
      let obj = { a: 1, b: 2, c: 3 }

      call('each', obj, value => {
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
      expect(call('slice', [1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
      expect(call('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 })).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 })
    })

    it('should slice of items with positive begin', () => {
      expect(call('slice', [1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5])
      expect(call('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, 2)).toEqual({ c: 3, d: 4, e: 5 })
    })

    it('should slice of items with negative begin', () => {
      expect(call('slice', [1, 2, 3, 4, 5], -2)).toEqual([4, 5])
      expect(call('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, -2)).toEqual({ d: 4, e: 5 })
    })

    it('should slice of items with begin and end', () => {
      expect(call('slice', [1, 2, 3, 4, 5], 2, 4)).toEqual([3, 4])
      expect(call('slice', [1, 2, 3, 4, 5], 2, -2)).toEqual([3])
      expect(call('slice', [1, 2, 3, 4, 5], -3, 4)).toEqual([3, 4])
      expect(call('slice', [1, 2, 3, 4, 5], -3, -2)).toEqual([3])

      expect(call('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, 2, 4)).toEqual({ c: 3, d: 4 })
      expect(call('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, 2, -2)).toEqual({ c: 3 })
      expect(call('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, -3, 4)).toEqual({ c: 3, d: 4 })
      expect(call('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, -3, -2)).toEqual({ c: 3 })
    })

    it('should slice of items with begin and end but not enough items', () => {
      expect(call('slice', [1, 2, 3, 4, 5], 4, 6)).toEqual([5])
      expect(call('slice', { a: 1, b: 2, c: 3, d: 4, e: 5 }, 4, 6)).toEqual({ e: 5 })
    })
  })

  describe('#reduce()', () => {
    it('should iterate over the items and reduce to a single value', () => {
      expect(
        call('reduce', [1, 2, 3], (carry, value) => [...carry, value], [])
      ).toEqual([1, 2, 3])
      expect(
        call('reduce', [1, 2, 3], (carry, value, key) => ([...carry, key]), [])
      ).toEqual([0, 1, 2])
      expect(
        call('reduce', [1, 2, 3], (carry, value, key, index) => `${carry} - ${index} - ${key} - ${value}`, 'x')
      ).toBe('x - 0 - 0 - 1 - 1 - 1 - 2 - 2 - 2 - 3')

      expect(
        call('reduce', { a: 1, b: 2, c: 3 }, (carry, value) => [...carry, value], [])
      ).toEqual([1, 2, 3])
      expect(
        call('reduce', { a: 1, b: 2, c: 3 }, (carry, value, key, index) => `${carry} - ${index} - ${key} - ${value}`, 'x')
      ).toBe('x - 0 - a - 1 - 1 - b - 2 - 2 - c - 3')
    })
  })

  describe('#toArray()', () => {
    it('should covert items to array', () => {
      expect(call('toArray', [1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
      expect(call('toArray', [{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }])).toEqual([[1, 2], [3, 4], [5]])
      expect(call('toArray', { a: 1, b: 2, c: 3, d: 4, e: 5 })).toEqual([1, 2, 3, 4, 5])
      expect(call('toArray', { a: { a: 1, b: 2 }, b: { c: 3, d: 4 }, c: { e: 5 } })).toEqual([[1, 2], [3, 4], [5]])
    })
  })

  describe('#chunk()', () => {
    it('should chunk into multiple array of a given size', () => {
      expect(call('chunk', [1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
      expect(call('chunk', { a: 1, b: 2, c: 3, d: 4, e: 5 }, 2)).toEqual([{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }])
    })
  })

  describe('#except', () => {
    it('should return the items except for those with the specified keys', () => {
      expect(call('except', [1, 2, 3], [0, 1])).toEqual([3])
      expect(call('except', { a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ c: 3 })

      expect(call('except', [1, 2, 3], 0, 1)).toEqual([3])
      expect(call('except', { a: 1, b: 2, c: 3 }, 'a', 'b')).toEqual({ c: 3 })
    })
  })

  describe('#filter', () => {
    testIterator('filter')

    it('should filter the items using the given callback', () => {
      expect(call('filter', [1, 2, 3], value => value > 1)).toEqual([2, 3])
      expect(call('filter', [1, 2, 3], (value, key, index) => key === 1 && index === 1)).toEqual([2])
      expect(call('filter', { a: 1, b: 2, c: 3 }, value => value > 1)).toEqual({ b: 2, c: 3 })
      expect(call('filter', { a: 1, b: 2, c: 3 }, (value, key, index) => key === 'b' && index === 1)).toEqual({ b: 2 })
    })

    it('should filter the items using the given value', () => {
      expect(call('filter', [1, 2, 3], 1)).toEqual([1])
      expect(call('filter', { a: 1, b: 2, c: 3 }, 1)).toEqual({ a: 1 })
    })

    it('should filter the items without callback', () => {
      expect(call('filter', ['', false, 0, 1, 2, 3])).toEqual([1, 2, 3])
      expect(call('filter', { a: '', b: false, c: 0, d: 1, e: 2, f: 3 })).toEqual({ d: 1, e: 2, f: 3 })
    })
  })

  describe('#isEmpty()', () => {
    it('should return true if is empty', () => {
      expect(call('isEmpty', [])).toBe(true)
      expect(call('isEmpty', {})).toBe(true)
      expect(call('isEmpty', [1, 2, 3])).toBe(false)
      expect(call('isEmpty', { a: 1, b: 2, c: 3 })).toBe(false)
    })
  })

  describe('#isEmpty()', () => {
    it('should return true if is not empty', () => {
      expect(call('isNotEmpty', [1, 2, 3])).toBe(true)
      expect(call('isNotEmpty', { a: 1, b: 2, c: 3 })).toBe(true)
      expect(call('isNotEmpty', [])).toBe(false)
      expect(call('isNotEmpty', {})).toBe(false)
    })
  })

  describe('#first()', () => {
    testIterator('first')

    it('should return the first element', () => {
      expect(call('first', [1, 2, 3])).toBe(1)
      expect(call('first', { a: 1, b: 2, c: 3 })).toBe(1)
    })

    it('should return null if array is empty', () => {
      expect(call('first', [])).toBe(null)
      expect(call('first', {})).toBe(null)
    })

    it('should return the first element which passes a given truth test', () => {
      expect(call('first', [1, 2, 3], n => n > 1)).toBe(2)
      expect(call('first', { a: 1, b: 2, c: 3 }, n => n > 1)).toBe(2)
    })
  })

  describe('#last()', () => {
    testIterator('last')

    it('should return the last element', () => {
      expect(call('last', [1, 2, 3])).toBe(3)
      expect(call('last', { a: 1, b: 2, c: 3 })).toBe(3)
    })

    it('should return null if array is empty', () => {
      expect(call('last', [])).toBe(null)
      expect(call('last', {})).toBe(null)
    })

    it('should return the last element which passes a given truth test', () => {
      expect(call('last', [1, 2, 3], n => n < 3)).toBe(2)
      expect(call('last', { a: 1, b: 2, c: 3 }, n => n < 3)).toBe(2)
    })
  })

  describe('#map()', () => {
    testIterator('map')

    it('should iterate over the items and replace value from callback', () => {
      expect(call('map', [1, 2, 3], (value, key, index) => `${index} - ${key} - ${value}`))
        .toEqual(['0 - 0 - 1', '1 - 1 - 2', '2 - 2 - 3'])
      expect(call('map', { a: 1, b: 2, c: 3 }, (value, key, index) => `${index} - ${key} - ${value}`))
        .toEqual({ a: '0 - a - 1', b: '1 - b - 2', c: '2 - c - 3' })
    })
  })

  describe('#mapWithKeys()', () => {
    testIterator('mapWithKeys', () => ({ foo: 'bar' }))

    it('should iterate over the items and replace key and value from callback', () => {
      expect(call('mapWithKeys', [1, 2], (value, key, index) => ({ [`${index} - ${key}`]: `${index} - ${key} - ${value}` })))
        .toEqual({ '0 - 0': '0 - 0 - 1', '1 - 1': '1 - 1 - 2' })
      expect(call('mapWithKeys', { a: 1, b: 2 }, (value, key, index) => ({ [`${index} - ${key}`]: `${index} - ${key} - ${value}` })))
        .toEqual({ '0 - a': '0 - a - 1', '1 - b': '1 - b - 2' })
    })
  })

  describe('#flatten()', () => {
    it('should flatten a multi dimensional object into signle dimension', () => {
      expect(call('flatten', [[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5])
      expect(call('flatten', [{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }])).toEqual([1, 2, 3, 4, 5])
      expect(call('flatten', { a: { a: 1, b: 2 }, b: { c: 3, d: 4 }, c: { e: 5 } })).toEqual([1, 2, 3, 4, 5])
    })

    it('should flatten a multi dimensional object into specified depth dimension', () => {
      expect(call('flatten', [[[1], [2]], [[3], [4]], [[5]]], 1)).toEqual([[1], [2], [3], [4], [5]])
      expect(call('flatten', [{ a: [1], b: [2] }, { c: [3], d: [4] }, { e: [5] }], 1)).toEqual([[1], [2], [3], [4], [5]])
      expect(call('flatten', { a: { a: [1], b: [2] }, b: { c: [3], d: [4] }, c: { e: [5] } }, 1)).toEqual([[1], [2], [3], [4], [5]])
    })
  })

  describe('#min()', () => {
    it('should return the minimum value', () => {
      expect(call('min', [1, 2, 3])).toBe(1)
      expect(call('min', { a: 1, b: 2, c: 3 })).toBe(1)
    })
  })

  describe('#max()', () => {
    it('should return the maximum value', () => {
      expect(call('max', [1, 2, 3])).toBe(3)
      expect(call('max', { a: 1, b: 2, c: 3 })).toBe(3)
    })
  })

  describe('#only', () => {
    it('should return the items with the specified keys', () => {
      expect(call('only', [1, 2, 3], [0, 1])).toEqual([1, 2])
      expect(call('only', { a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ a: 1, b: 2 })

      expect(call('only', [1, 2, 3], 0, 1)).toEqual([1, 2])
      expect(call('only', { a: 1, b: 2, c: 3 }, 'a', 'b')).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#pipe', () => {
    it('should pass the items to the given callback and return the result', () => {
      expect(call('pipe', [1, 2, 3], items => [...items, 4])).toEqual([1, 2, 3, 4])
      expect(call('pipe', { a: 1, b: 2, c: 3 }, items => ({ ...items, b: 4 }))).toEqual({ a: 1, b: 2, c: 3, b: 4 })
    })
  })

  describe('#pluck', () => {
    it('should retrive all of the values for a given key', () => {
      expect(call('pluck', [[1, 2, 3], [1, 2, 3]], 0)).toEqual([1, 1])
      expect(call('pluck', [{ a: 1, b: 2 }, { a: 1, b: 2 }], 'a')).toEqual([1, 1])
      expect(call('pluck', { a: { a: 1, b: 2 }, b: { a: 1, b: 2 } }, 'a')).toEqual([1, 1])

      expect(call('pluck', [{ a: 1, b: 'a' }, { a: 2, b: 'b' }], 'a', 'b')).toEqual({ a: 1, b: 2 })
      expect(call('pluck', { a: { a: 1, b: 'a' }, b: { a: 2, b: 'b' } }, 'a', 'b')).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#reject', () => {
    testIterator('reject')

    it('should reject the items using the given callback', () => {
      expect(call('reject', [1, 2, 3], value => value > 1)).toEqual([1])
      expect(call('reject', [1, 2, 3], (value, key, index) => key === 1 && index === 1)).toEqual([1, 3])
      expect(call('reject', { a: 1, b: 2, c: 3 }, value => value > 1)).toEqual({ a: 1 })
      expect(call('reject', { a: 1, b: 2, c: 3 }, (value, key, index) => key === 'b' && index === 1)).toEqual({ a: 1, c: 3 })
    })

    it('should reject the items using the given value', () => {
      expect(call('reject', [1, 2, 3], 1)).toEqual([2, 3])
      expect(call('reject', { a: 1, b: 2, c: 3 }, 1)).toEqual({ b: 2, c: 3 })
    })

    it('should throw error without callback', () => {
      expect(() => call('reject', ['', false, 0, 1, 2, 3])).toThrow('Callback function is required.')
      expect(() => call('reject', { a: '', b: false, c: 0, d: 1, e: 2, f: 3 })).toThrow('Callback function is required.')
    })
  })

  describe('#swap()', () => {
    it('should swap two value of given keys', () => {
      expect(call('swap', [1, 2, 3], 1, 2)).toEqual([1, 3, 2])
      expect(call('swap', { a: 1, b: 2, c: 3 }, 'b', 'c')).toEqual({ a: 1, b: 3, c: 2 })
    })
  })

  describe('#shuffle()', () => {
    it('should shuffle the itmes', () => {
      let originalRandom = Math.random

      Math.random = () => 0

      expect(call('shuffle', [1, 2, 3])).toEqual([3, 1, 2])
      expect(call('shuffle', { a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 })

      Math.random = originalRandom
    })
  })

  describe('#take()', () => {
    it('should return a new collection with the specified number of items', () => {
      expect(call('take', [1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3])
      expect(call('take', { a: 1, b: 2, c: 3, d: 4, e: 5 }, 3)).toEqual({ a: 1, b: 2, c: 3 })
    })
  })

  describe('#unique()', () => {
    it('should return all of the unique items', () => {
      expect(call('unique', [1, 2, 2])).toEqual([1, 2])
      expect(call('unique', { a: 1, b: 2, c: 2 })).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#diff()', () => {
    it('should computes the difference of collections', () => {
      expect(call('diff', [1, 2, 3], [1, 2])).toEqual([3])
      expect(call('diff', [1, 2, 3, 3], [1, 2])).toEqual([3, 3])
      expect(call('diff', { a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ c: 3 })
      expect(call('diff', { a: 1, b: 2, c: 3, d: 3 }, { a: 1, b: 2 })).toEqual({ c: 3, d: 3 })
      expect(call('diff', [1, 2, 3], { a: 1, b: 2 })).toEqual([3])
      expect(call('diff', { a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ c: 3 })
    })
  })

  describe('#diffKeys()', () => {
    it('should computes the difference of collections using keys for comparison', () => {
      expect(call('diffKeys', [1, 2, 3], [1, 2])).toEqual({ 2: 3 })
      expect(call('diffKeys', [1, 2, 3, 3], [1, 2])).toEqual({ 2: 3, 3: 3 })
      expect(call('diffKeys', { a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ c: 3 })
      expect(call('diffKeys', { a: 1, b: 2, c: 3, d: 3 }, { a: 1, b: 2 })).toEqual({ c: 3, d: 3 })
      expect(call('diffKeys', [1, 2, 3], { a: 1, b: 2 })).toEqual({ 0:1, 1: 2, 2: 3 })
      expect(call('diffKeys', { a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ a: 1, b: 2, c: 3 })
    })

    it('should computes the difference of collections using keys for comparison if key contains dot', () => {
      expect(call('diffKeys', { a: 1, 'a.b': 2, 'a.b.c': 3 }, { a: 1, 'a.b.c': 3 })).toEqual({ 'a.b': 2 })
    })
  })

  describe('#intersect()', () => {
    it('should computes the intersection of collections', () => {
      expect(call('intersect', [1, 2, 3], [1, 2])).toEqual([1, 2])
      expect(call('intersect', [1, 2, 2, 3], [1, 2])).toEqual([1, 2, 2])
      expect(call('intersect', { a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
      expect(call('intersect', { a: 1, b: 2, c: 2, d: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2, c: 2 })
      expect(call('intersect', [1, 2, 3], { a: 1, b: 2 })).toEqual([1, 2])
      expect(call('intersect', { a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#intersectByKeys()', () => {
    it('should computes the intersection of collections using keys for comparison', () => {
      expect(call('intersectByKeys', [1, 2, 3], [1, 2])).toEqual({ 0: 1, 1: 2 })
      expect(call('intersectByKeys', [1, 2, 2, 3], [1, 2])).toEqual({ 0: 1, 1: 2 })
      expect(call('intersectByKeys', { a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
      expect(call('intersectByKeys', { a: 1, b: 2, c: 2, d: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
      expect(call('intersectByKeys', [1, 2, 3], { a: 1, b: 2 })).toEqual({})
      expect(call('intersectByKeys', { a: 1, b: 2, c: 3 }, [1, 2])).toEqual({})
    })

    it('should computes the intersection of collections using keys for comparison if key contains dot', () => {
      expect(call('intersectByKeys', { a: 1, 'a.b': 2, 'a.b.c': 3 }, { a: 1, 'a.b.c': 3 })).toEqual({ a: 1, 'a.b.c': 3 })
    })
  })

  describe('#merge()', () => {
    it('should merge collections', () => {
      expect(call('merge', [1, 2, 3], [4, 5])).toEqual([1, 2, 3, 4, 5])
      expect(call('merge', { a: 1, b: 2, c: 3 }, { d: 4, e: 5 })).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 })
      expect(call('merge', [1, 2, 3], { a: 4, b: 5 })).toEqual({ 0: 1, 1: 2, 2: 3, a: 4, b: 5 })
      expect(call('merge', { a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ a: 1, b: 2, c: 3, 0: 1, 1: 2 })
      expect(call('merge', { a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 })).toEqual({ a: 4, b: 5, c: 6 })
    })

    it('should merge more than one collections', () => {
      expect(call('merge', [1, 2, 3], [4, 5], [6, 7])).toEqual([1, 2, 3, 4, 5, 6, 7])
      expect(call('merge', { a: 1, b: 2, c: 3 }, [4, 5], [6, 7])).toEqual({ a: 1, b: 2, c: 3, 0: 4, 1: 5, 2: 6, 3: 7 })
    })
  })

  describe('#keyBy', () => {
    it('should keys the collection by the given key', () => {
      expect(call('keyBy', [{ a: 1, b: 'a' }, { a: 2, b: 'b' }], 'b')).toEqual({ a: { a: 1, b: 'a' }, b: { a: 2, b: 'b' } })
      expect(call('keyBy', { a: { a: 1, b: 'c' }, b: { a: 2, b: 'd' } }, 'b')).toEqual({ c: { a: 1, b: 'c' }, d: { a: 2, b: 'd' } })
    })
  })

  describe('#groupBy', () => {
    it('should groups the collection by the given key', () => {
      expect(call('groupBy', [{ a: 'a' }, { a: 'a' }, { a: 'b' }], 'a')).toEqual({ a: [{ a: 'a' }, { a: 'a' }], b: [{ a: 'b' }] })
      expect(call('groupBy', { a: { a: 'a' }, b: { a: 'b' } }, 'a')).toEqual({ a: { a: { a: 'a' } }, b: { b: { a: 'b' } } })
    })

    it('should groups the collection by the given callback', () => {
      expect(call('groupBy', [{ a: 'a' }, { a: 'a' }, { a: 'b' }], row => row.a)).toEqual({ a: [{ a: 'a' }, { a: 'a' }], b: [{ a: 'b' }] })
      expect(call('groupBy', { a: { a: 'a' }, b: { a: 'b' } }, row => row.a)).toEqual({ a: { a: { a: 'a' } }, b: { b: { a: 'b' } } })
    })
  })

  describe('#sort', () => {
    it('should sort the collection', () => {
      expect(call('sort', [3, 5, 3, 4, 2, 1])).toEqual([1, 2, 3, 3, 4, 5])
      expect(call('sort', [[5, 4], [5, 3]])).toEqual([[5, 3], [5, 4]])
      expect(call('sort', [{ a: 5, b: 4 }, { a: 5, b: 3 }])).toEqual([{ a: 5, b: 3 }, { a: 5, b: 4 }])
      expect(JSON.stringify(call('sort', { a: 5, b: 4, c: 3 }))).toBe(JSON.stringify({ c: 3, b: 4, a: 5 }))
      expect(JSON.stringify(call('sort', { a: [5, 4], b: [5, 3] }))).toBe(JSON.stringify({ b: [5, 3], a: [5, 4] }))
      expect(JSON.stringify(call('sort', { a: { a: 5, b: 4 }, b: { a: 5, b: 3 } }))).toBe(JSON.stringify({ b: { a: 5, b: 3 }, a: { a: 5, b: 4 } }))
    })

    it('should sort the collection using the given callback', () => {
      expect(call('sort', [1, 2, 4, 3, 5, 3], (a, b) => b - a)).toEqual([5, 4, 3, 3, 2, 1])
      expect(call('sort', [[1, 2], [3, 4]], (a, b) => b[0] - a[0])).toEqual([[3, 4], [1, 2]])
      expect(call('sort', [{ a: 1, b: 2 }, { a: 3, b: 4 }], (a, b) => b.a - a.a)).toEqual([{ a: 3, b: 4 }, { a: 1, b: 2 }])
      expect(JSON.stringify(call('sort', { a: 1, b: 2, c: 3 }, (a, b) => b - a))).toBe(JSON.stringify({ c: 3, b: 2, a: 1 }))
      expect(JSON.stringify(call('sort', { a: [1, 2], b: [3, 4] }, (a, b) => b[0] - a[0]))).toBe(JSON.stringify({ b: [3, 4], a: [1, 2] }))
      expect(JSON.stringify(call('sort', { a: { a: 1, b: 2 }, b: { a: 3, b: 4 } }, (a, b) => b.a - a.a))).toBe(JSON.stringify({ b: { a: 3, b: 4 }, a: { a: 1, b: 2 } }))
    })

    it('should sort the collection which contains string', () => {
      expect(call('sort', ['c', 'b', 'a'])).toEqual(['a', 'b', 'c'])
      expect(JSON.stringify(call('sort', { a: 'c', b: 'b', c: 'a' }))).toBe(JSON.stringify({ c: 'a', b: 'b', a: 'c' }))
    })
  })

  describe('#sortDesc', () => {
    it('should sort the collection', () => {
      expect(call('sortDesc', [3, 5, 3, 4, 2, 1])).toEqual([5, 4, 3, 3, 2, 1])
      expect(call('sortDesc', [[1, 2], [3, 4]])).toEqual([[3, 4], [1, 2]])
      expect(call('sortDesc', [{ a: 1, b: 2 }, { a: 3, b: 4 }])).toEqual([{ a: 3, b: 4 }, { a: 1, b: 2 }])
      expect(JSON.stringify(call('sortDesc', { a: 1, b: 2, c: 3 }))).toBe(JSON.stringify({ c: 3, b: 2, a: 1 }))
      expect(JSON.stringify(call('sortDesc', { a: [1, 2], b: [3, 4] }))).toBe(JSON.stringify({ b: [3, 4], a: [1, 2] }))
      expect(JSON.stringify(call('sortDesc', { a: { a: 1, b: 2 }, b: { a: 3, b: 4 } }))).toBe(JSON.stringify({ b: { a: 3, b: 4 }, a: { a: 1, b: 2 } }))
    })

    it('should sort the collection which contains string', () => {
      expect(call('sortDesc', ['a', 'b', 'c'])).toEqual(['c', 'b', 'a'])
      expect(JSON.stringify(call('sortDesc', { a: 'a', b: 'b', c: 'c' }))).toBe(JSON.stringify({ c: 'c', b: 'b', a: 'a' }))
    })
  })

  describe('#sortBy', () => {
    it('should sort the collection by the given key', () => {
      expect(call('sortBy', [[1, 4], [2, 3]], 1)).toEqual([[2, 3], [1, 4]])
      expect(call('sortBy', [{ a: 1, b: 4 }, { a: 2, b: 3 }], 'b')).toEqual([{ a: 2, b: 3 }, { a: 1, b: 4 }])
      expect(JSON.stringify(call('sortBy', { a: [1, 4], b: [2, 3] }, 1))).toBe(JSON.stringify({ b: [2, 3], a: [1, 4] }))
      expect(JSON.stringify(call('sortBy', { a: { a: 1, b: 4 }, b: { a: 2, b: 3 } }, 'b'))).toBe(JSON.stringify({ b: { a: 2, b: 3 }, a: { a: 1, b: 4 } }))
    })

    it('should sort the collection using the given callback', () => {
      expect(call('sortBy', [[1, 4], [2, 3]], item => item[1])).toEqual([[2, 3], [1, 4]])
      expect(call('sortBy', [{ a: 1, b: 4 }, { a: 2, b: 3 }], item => item.b)).toEqual([{ a: 2, b: 3 }, { a: 1, b: 4 }])
      expect(JSON.stringify(call('sortBy', { a: [1, 4], b: [2, 3] }, item => item[1]))).toBe(JSON.stringify({ b: [2, 3], a: [1, 4] }))
      expect(JSON.stringify(call('sortBy', { a: { a: 1, b: 4 }, b: { a: 2, b: 3 } }, item => item.b))).toBe(JSON.stringify({ b: { a: 2, b: 3 }, a: { a: 1, b: 4 } }))
    })

    it('should sort the collection by the given key descending', () => {
      expect(call('sortBy', [[2, 3], [1, 4]], 1, true)).toEqual([[1, 4], [2, 3]])
      expect(call('sortBy', [{ a: 2, b: 3 }, { a: 1, b: 4 }], 'b', true)).toEqual([{ a: 1, b: 4 }, { a: 2, b: 3 }])
      expect(JSON.stringify(call('sortBy', { a: [2, 3], b: [1, 4] }, 1, true))).toBe(JSON.stringify({ b: [1, 4], a: [2, 3] }))
      expect(JSON.stringify(call('sortBy', { a: { a: 2, b: 3 }, b: { a: 1, b: 4 } }, 'b', true))).toBe(JSON.stringify({ b: { a: 1, b: 4 }, a: { a: 2, b: 3 } }))
    })

    it('should sort the collection using the given callback descending', () => {
      expect(call('sortBy', [[2, 3], [1, 4]], item => item[1], true)).toEqual([[1, 4], [2, 3]])
      expect(call('sortBy', [{ a: 2, b: 3 }, { a: 1, b: 4 }], item => item.b, true)).toEqual([{ a: 1, b: 4 }, { a: 2, b: 3 }])
      expect(JSON.stringify(call('sortBy', { a: [2, 3], b: [1, 4] }, item => item[1], true))).toBe(JSON.stringify({ b: [1, 4], a: [2, 3] }))
      expect(JSON.stringify(call('sortBy', { a: { a: 2, b: 3 }, b: { a: 1, b: 4 } }, item => item.b, true))).toBe(JSON.stringify({ b: { a: 1, b: 4 }, a: { a: 2, b: 3 } }))
    })
  })

  describe('#sortByDesc', () => {
    it('should sort the collection by the given key', () => {
      expect(call('sortByDesc', [[2, 3], [1, 4]], 1)).toEqual([[1, 4], [2, 3]])
      expect(call('sortByDesc', [{ a: 2, b: 3 }, { a: 1, b: 4 }], 'b')).toEqual([{ a: 1, b: 4 }, { a: 2, b: 3 }])
      expect(JSON.stringify(call('sortByDesc', { a: [2, 3], b: [1, 4] }, 1))).toBe(JSON.stringify({ b: [1, 4], a: [2, 3] }))
      expect(JSON.stringify(call('sortByDesc', { a: { a: 2, b: 3 }, b: { a: 1, b: 4 } }, 'b'))).toBe(JSON.stringify({ b: { a: 1, b: 4 }, a: { a: 2, b: 3 } }))
    })

    it('should sort the collection using the given callback', () => {
      expect(call('sortByDesc', [[2, 3], [1, 4]], item => item[1])).toEqual([[1, 4], [2, 3]])
      expect(call('sortByDesc', [{ a: 2, b: 3 }, { a: 1, b: 4 }], item => item.b)).toEqual([{ a: 1, b: 4 }, { a: 2, b: 3 }])
      expect(JSON.stringify(call('sortByDesc', { a: [2, 3], b: [1, 4] }, item => item[1]))).toBe(JSON.stringify({ b: [1, 4], a: [2, 3] }))
      expect(JSON.stringify(call('sortByDesc', { a: { a: 2, b: 3 }, b: { a: 1, b: 4 } }, item => item.b))).toBe(JSON.stringify({ b: { a: 1, b: 4 }, a: { a: 2, b: 3 } }))
    })
  })

  describe('#append', () => {
    it('should appends an item to the end of the collection', () => {
      expect(call('append', [1, 2, 3, 4], 5)).toEqual([1, 2, 3, 4, 5])
      expect(JSON.stringify(call('append', { a: 1, b: 2 }, 3, 'c'))).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }))
    })
  })

  describe('#prepend', () => {
    it('should adds an item to the beginning of the collection', () => {
      expect(call('prepend', [2, 3, 4, 5], 1)).toEqual([1, 2, 3, 4, 5])
      expect(JSON.stringify(call('prepend', { b: 2, c: 3 }, 1, 'a'))).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }))
    })
  })

  describe('#index', () => {
    it('should return the index of the first item in collection', () => {
      expect(call('index', [1, 2, 3, 4, 5], 3)).toBe(2)
      expect(call('index', [1, 2, 3, 4, 5], 0)).toBe(null)
      expect(call('index', { a: 1, b: 2, c: 3 }, 2)).toBe('b')
      expect(call('index', { a: 1, b: 2, c: 3 }, 0)).toBe(null)
    })
  })

  describe('#insert', () => {
    it('should insert an item before the element with the given index of the collection', () => {
      expect(call('insert', [1, 2, 4, 5], 2, 3)).toEqual([1, 2, 3, 4, 5])
      expect(call('insert', [1, 2, 4, 5], 5, 3)).toEqual([1, 2, 4, 5, 3])
      expect(JSON.stringify(call('insert', { a: 1, c: 3 }, 'c', 2, 'b'))).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }))
      expect(JSON.stringify(call('insert', { a: 1, c: 3 }, 'e', 2, 'b'))).toBe(JSON.stringify({ a: 1, c: 3, b: 2 }))
    })
  })

  describe('#join', () => {
    it('should join the items in a collection', () => {
      expect(call('join', [1, 2, 3, 4, 5])).toBe('1, 2, 3, 4, 5')
      expect(call('join', { a: 1, b: 2, c: 3 })).toBe('1, 2, 3')
    })

    it('should join the items in a collection with a given glue', () => {
      expect(call('join', [1, 2, 3, 4, 5], '-')).toBe('1-2-3-4-5')
      expect(call('join', { a: 1, b: 2, c: 3 }, '-')).toBe('1-2-3')
    })
  })

  describe('#partition', () => {
    testIterator('partition')

    it('should separate elements that pass a given truth test from those that do not', () => {
      expect(call('partition', [1, 2, 3, 4, 5], (value, key) => key < 2 && value < 3)).toEqual([[1, 2], [3, 4, 5]])
      expect(call('partition', { a: 1, b: 2, c: 3 }, (value, key) => key === 'a' && value === 1)).toEqual([{ a: 1 }, { b: 2, c: 3 }])
    })
  })

  describe('#flip', () => {
    it('should swap keys with their corresponding values', () => {
      expect(call('flip', ['a', 'b', 'c'])).toEqual({ a: 0, b: 1, c: 2 })
      expect(call('flip', { a: 0, b: 1, c: 2 })).toEqual({ 0: 'a', 1: 'b', 2: 'c' })
    })
  })

  describe('#fill', () => {
    it('should fill all elements with a given value', () => {
      expect(call('fill', ['a', 'b', 'c'], 'd')).toEqual(['d', 'd', 'd'])
      expect(call('fill', ['a', 'b', 'c'], 'd', 1)).toEqual(['a', 'd', 'd'])
      expect(call('fill', ['a', 'b', 'c'], 'd', 1, 2)).toEqual(['a', 'd', 'c'])
      expect(call('fill', { a: 0, b: 1, c: 2 }, 3)).toEqual({ a: 3, b: 3, c: 3 })
      expect(call('fill', { a: 0, b: 1, c: 2 }, 3, 1)).toEqual({ a: 0, b: 3, c: 3 })
      expect(call('fill', { a: 0, b: 1, c: 2 }, 3, 1, 2)).toEqual({ a: 0, b: 3, c: 2 })
    })
  })

  describe('#freeze', () => {
    it('should freeze the collection', () => {
      let array = []
      let object = []

      expect(Object.isFrozen(array)).toEqual(false)
      expect(Object.isFrozen(object)).toEqual(false)

      call('freeze', array)
      call('freeze', object)

      expect(Object.isFrozen(array)).toEqual(true)
      expect(Object.isFrozen(object)).toEqual(true)
    })
  })

  describe('#isFrozen', () => {
    it('should return the collection is forzen or not', () => {
      let array = []
      let object = []

      expect(call('isFrozen', array)).toEqual(false)
      expect(call('isFrozen', object)).toEqual(false)

      Object.freeze(array)
      Object.freeze(object)

      expect(call('isFrozen', array)).toEqual(true)
      expect(call('isFrozen', object)).toEqual(true)
    })
  })

  describe('#flatMap', () => {
    testIterator('flatMap')

    it('should iterates through the collection and passes each value to the given closure', () => {
      expect(call('flatMap', [1, 2, 3], (value, key, index) => [`${index} - ${key} - ${value}`]))
        .toEqual(['0 - 0 - 1', '1 - 1 - 2', '2 - 2 - 3'])
      expect(call('flatMap', [1, 2, 3], (value, key, index) => ({ [key]: `${index} - ${key} - ${value}` })))
        .toEqual({ 0: '0 - 0 - 1', 1: '1 - 1 - 2', 2: '2 - 2 - 3' })
      expect(call('flatMap', { a: 1, b: 2, c: 3 }, (value, key, index) => ({ [key]: `${index} - ${key} - ${value}` })))
        .toEqual({ a: '0 - a - 1', b: '1 - b - 2', c: '2 - c - 3' })
      expect(call('flatMap', { a: 1, b: 2, c: 3 }, (value, key, index) => [`${index} - ${key} - ${value}`]))
        .toEqual(['0 - a - 1', '1 - b - 2', '2 - c - 3'])
      expect(call('flatMap', [1, 2, 3], (value, key, index) => [value, value + 1]))
        .toEqual([1, 2, 2, 3, 3, 4])
      expect(call('flatMap', { a: 1, b: 2 }, (value, key, index) => ({ [key]: value, [index]: value + 1 })))
        .toEqual({ a: 1, 0: 2, b: 2, 1: 3 })
    })
  })
})
