import { Optional } from '../src/helpers'
import {
  CollectionKey,
  keys,
  values,
  contains,
  count,
  has,
  get,
  set,
  sum,
  avg,
  each,
  slice,
  reduce,
  toArray,
  chunk,
  except,
  filter,
  isEmpty,
  isNotEmpty,
  first,
  last,
  map,
  mapWithKeys,
  flatten,
  min,
  max,
  only,
  pipe,
  pluck,
  reject,
  swap,
  shuffle,
  take,
  unique,
  diff,
  diffKeys,
  intersect,
  intersectByKeys,
  merge,
  keyBy,
  groupBy,
  sort,
  sortDesc,
  sortBy,
  sortByDesc,
  append,
  prepend,
  index,
  insert,
  join,
  partition,
  flip,
  fill,
  freeze,
  isFrozen,
  flatMap
} from '../src/collection'

function testIterator (method: Function, callback?: Optional<(value: any, key: CollectionKey, index: number) => any>): void {
  it('should iterate correct key, value and index with array', () => {
    let count: number = 0
    const array: string[] = ['a', 'b', 'c']

    method(array, (value: string, key: number, index: number) => {
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
    let count: number = 0
    const object: { [key: string]: number } = { a: 1, b: 2, c: 3 }
    const keys: string[] = ['a', 'b', 'c']
    const values: number[] = [1, 2, 3]

    method(object, (value: number, key: string, index: number) => {
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
  describe('#keys()', () => {
    it('should return the keys', () => {
      expect(keys([1, 2, 3])).toEqual([0, 1, 2])
      expect(keys({ a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c'])
    })
  })

  describe('#values()', () => {
    it('should return the values', () => {
      expect(values([1, 2, 3])).toEqual([1, 2, 3])
      expect(values({ a: 1, b: 2, c: 3 })).toEqual([1, 2, 3])
    })
  })

  describe('#contains()', () => {
    it('should determines whether the object contains a given item', () => {
      expect(contains([1, 2, 3], 3)).toBe(true)
      expect(contains([1, 2, 3], 4)).toBe(false)
      expect(contains({ a: 1, b: 2, c: 3 }, 3)).toBe(true)
      expect(contains({ a: 1, b: 2, c: 3 }, 4)).toBe(false)
    })
  })

  describe('#count()', () => {
    it('should return the total number', () => {
      expect(count([1, 2, 3])).toBe(3)
      expect(count({ a: 1, b: 2, c: 3 })).toBe(3)
    })
  })

  describe('#has()', () => {
    it('should determines if a given key exists', () => {
      expect(has([1, 2, 3, 4, 5], 0)).toBe(true)
      expect(has([1, 2, 3, 4, 5], 5)).toBe(false)
      expect(has([1, 2, 3, 4, 5], '0')).toBe(true)
      expect(has([1, 2, 3, 4, 5], '5')).toBe(false)
      expect(has([[1, 2, 3, 4, 5]], '0.0')).toBe(true)
      expect(has([[1, 2, 3, 4, 5]], '0.5')).toBe(false)
      expect(has([[{ a: 1, b: 2, c: 3 }]], '0.0.a')).toBe(true)
      expect(has([[{ a: 1, b: 2, c: 3 }]], '0.0.d')).toBe(false)

      expect(has([1, 2, 3, 4, 5], '[0]')).toBe(true)
      expect(has([1, 2, 3, 4, 5], '[5]')).toBe(false)
      expect(has([[1, 2, 3, 4, 5]], '[0][0]')).toBe(true)
      expect(has([[1, 2, 3, 4, 5]], '[0][5]')).toBe(false)
      expect(has([[{ a: 1, b: 2, c: 3 }]], '[0][0].a')).toBe(true)
      expect(has([[{ a: 1, b: 2, c: 3 }]], '[0][0].d')).toBe(false)

      expect(has([1, 2, 3, 4, 5], [0])).toBe(true)
      expect(has([1, 2, 3, 4, 5], [5])).toBe(false)
      expect(has([[1, 2, 3, 4, 5]], [0, 0])).toBe(true)
      expect(has([[1, 2, 3, 4, 5]], [0, 5])).toBe(false)
      expect(has([[{ a: 1, b: 2, c: 3 }]], [0, 0, 'a'])).toBe(true)
      expect(has([[{ a: 1, b: 2, c: 3 }]], [0, 0, 'd'])).toBe(false)

      expect(has({ a: 1, b: 2, c: 3 }, 'a')).toBe(true)
      expect(has({ a: 1, b: 2, c: 3 }, 'd')).toBe(false)
      expect(has({ a: { b: { c: 1 } } }, 'a.b.c')).toBe(true)
      expect(has({ a: { b: { c: 1 } } }, 'a.b.d')).toBe(false)
      expect(has({ a: { b: { c: [1, 2, 3] } } }, 'a.b.c[0]')).toBe(true)
      expect(has({ a: { b: { c: [1, 2, 3] } } }, 'a.b.c[4]')).toBe(false)

      expect(has({ a: 1, b: 2, c: 3 }, ['a'])).toBe(true)
      expect(has({ a: 1, b: 2, c: 3 }, ['d'])).toBe(false)
      expect(has({ a: { b: { c: 1 } } }, ['a', 'b', 'c'])).toBe(true)
      expect(has({ a: { b: { c: 1 } } }, ['a', 'b', 'd'])).toBe(false)
      expect(has({ a: { b: { c: [1, 2, 3] } } }, ['a', 'b', 'c', 0])).toBe(true)
      expect(has({ a: { b: { c: [1, 2, 3] } } }, ['a', 'b', 'c', 4])).toBe(false)
    })
  })

  describe('#get()', () => {
    it('should return the value at a given key', () => {
      expect(get([1, 2, 3, 4, 5], 0)).toBe(1)
      expect(get([1, 2, 3, 4, 5], '0')).toBe(1)
      expect(get([[1, 2, 3, 4, 5]], '0.0')).toBe(1)
      expect(get([[{ a: 1, b: 2, c: 3 }]], '0.0.a')).toBe(1)

      expect(get([1, 2, 3, 4, 5], '[0]')).toBe(1)
      expect(get([[1, 2, 3, 4, 5]], '[0][0]')).toBe(1)
      expect(get([[{ a: 1, b: 2, c: 3 }]], '[0][0].a')).toBe(1)

      expect(get([1, 2, 3, 4, 5], [0])).toBe(1)
      expect(get([[1, 2, 3, 4, 5]], [0, 0])).toBe(1)
      expect(get([[{ a: 1, b: 2, c: 3 }]], [0, 0, 'a'])).toBe(1)

      expect(get({ a: 1, b: 2, c: 3 }, 'a')).toBe(1)
      expect(get({ a: { b: { c: 1 } } }, 'a.b.c')).toBe(1)
      expect(get({ a: { b: { c: [1, 2, 3] } } }, 'a.b.c.0')).toBe(1)
      expect(get({ a: { b: { c: [1, 2, 3] } } }, 'a.b.c[0]')).toBe(1)

      expect(get({ a: 1, b: 2, c: 3 }, ['a'])).toBe(1)
      expect(get({ a: { b: { c: 1 } } }, ['a', 'b', 'c'])).toBe(1)
      expect(get({ a: { b: { c: [1, 2, 3] } } }, ['a', 'b', 'c', 0])).toBe(1)
    })

    it('should return the default value if given key is not exists', () => {
      expect(get([1, 2, 3, 4, 5], 5, 6)).toBe(6)
      expect(get({ a: 1, b: 2, c: 3 }, 'd', 4)).toBe(4)
    })

    it('should return the collection if has no given key', () => {
      expect(get([1, 2, 3])).toEqual([1, 2, 3])
    })
  })

  describe('#set()', () => {
    it('should set the value at a given key', () => {
      expect(set([0, 2, 3, 4, 5], 0, 1)).toEqual([1, 2, 3, 4, 5])
      expect(set([0, 2, 3, 4, 5], '0', 1)).toEqual([1, 2, 3, 4, 5])
      expect(set([[0, 2, 3, 4, 5]], '0.0', 1)).toEqual([[1, 2, 3, 4, 5]])
      expect(set([[{ a: 0, b: 2, c: 3 }]], '0.0.a', 1)).toEqual([[{ a: 1, b: 2, c: 3 }]])

      expect(set([0, 2, 3, 4, 5], '[0]', 1)).toEqual([1, 2, 3, 4, 5])
      expect(set([[0, 2, 3, 4, 5]], '[0][0]', 1)).toEqual([[1, 2, 3, 4, 5]])
      expect(set([[{ a: 0, b: 2, c: 3 }]], '[0][0].a', 1)).toEqual([[{ a: 1, b: 2, c: 3 }]])

      expect(set([0, 2, 3, 4, 5], [0], 1)).toEqual([1, 2, 3, 4, 5])
      expect(set([[0, 2, 3, 4, 5]], [0, 0], 1)).toEqual([[1, 2, 3, 4, 5]])
      expect(set([[{ a: 0, b: 2, c: 3 }]], [0, 0, 'a'], 1)).toEqual([[{ a: 1, b: 2, c: 3 }]])

      expect(set({ a: 0, b: 2, c: 3 }, 'a', 1)).toEqual({ a: 1, b: 2, c: 3 })
      expect(set({ a: { b: { c: 0 } } }, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } })
      expect(set({ a: { b: { c: [0, 2, 3] } } }, 'a.b.c.0', 1)).toEqual({ a: { b: { c: [1, 2, 3] } } })
      expect(set({ a: { b: { c: [0, 2, 3] } } }, 'a.b.c[0]', 1)).toEqual({ a: { b: { c: [1, 2, 3] } } })

      expect(set({ a: 0, b: 2, c: 3 }, ['a'], 1)).toEqual({ a: 1, b: 2, c: 3 })
      expect(set({ a: { b: { c: 0 } } }, ['a', 'b', 'c'], 1)).toEqual({ a: { b: { c: 1 } } })
      expect(set({ a: { b: { c: [0, 2, 3] } } }, ['a', 'b', 'c', 0], 1)).toEqual({ a: { b: { c: [1, 2, 3] } } })

      expect(set([], '0.0.a', 1)).toEqual([[{ a: 1 }]])
      expect(set([], '[0][0].a', 1)).toEqual([[{ a: 1 }]])
      expect(set({}, 'a.b.c[0]', 1)).toEqual({ a: { b: { c: [1] } } })
      expect(set({}, ['a', 'b', 'c', 0], 1)).toEqual({ a: { b: { c: [1] } } })
    })
  })

  describe('#sum()', () => {
    it('should return the sum', () => {
      expect(sum([1, 2, 3])).toBe(6)
      expect(sum({ a: 1, b: 2, c: 3 })).toBe(6)
    })

    it('should return the sum of string items', () => {
      expect(sum(['1', '2', '3'])).toBe(6)
      expect(sum({ a: '1', b: '2', c: '3' })).toBe(6)
    })

    it('should return the sum of a given key', () => {
      expect(sum([{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }])).toBe(0)
      expect(sum([{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }], 'a')).toBe(6)
    })
  })

  describe('#avg()', () => {
    it('should return null if is empty', () => {
      expect(avg([])).toBe(null)
    })

    it('should return the average value', () => {
      expect(avg([1, 2, 3])).toBe(2)
      expect(avg({ a: 1, b: 2, c: 3 })).toBe(2)
    })

    it('should return the average value of a given key', () => {
      expect(avg([{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }])).toBe(0)
      expect(avg([{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }], 'a')).toBe(2)
    })
  })

  describe('#each()', () => {
    testIterator(each)

    it('should stop iterating when callback function return false', () => {
      let count = 0
      const obj = { a: 1, b: 2, c: 3 }

      each(obj, (value): boolean | void => {
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
      expect(slice([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 })).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 })
    })

    it('should slice of items with positive begin', () => {
      expect(slice([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5])
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 2)).toEqual({ c: 3, d: 4, e: 5 })
    })

    it('should slice of items with negative begin', () => {
      expect(slice([1, 2, 3, 4, 5], -2)).toEqual([4, 5])
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, -2)).toEqual({ d: 4, e: 5 })
    })

    it('should slice of items with begin and end', () => {
      expect(slice([1, 2, 3, 4, 5], 2, 4)).toEqual([3, 4])
      expect(slice([1, 2, 3, 4, 5], 2, -2)).toEqual([3])
      expect(slice([1, 2, 3, 4, 5], -3, 4)).toEqual([3, 4])
      expect(slice([1, 2, 3, 4, 5], -3, -2)).toEqual([3])

      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 2, 4)).toEqual({ c: 3, d: 4 })
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 2, -2)).toEqual({ c: 3 })
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, -3, 4)).toEqual({ c: 3, d: 4 })
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, -3, -2)).toEqual({ c: 3 })
    })

    it('should slice of items with begin and end but not enough items', () => {
      expect(slice([1, 2, 3, 4, 5], 4, 6)).toEqual([5])
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 4, 6)).toEqual({ e: 5 })
    })
  })

  describe('#reduce()', () => {
    it('should iterate over the items and reduce to a single value', () => {
      expect(
        reduce<number[]>([1, 2, 3], (carry, value) => [...carry, value], [])
      ).toEqual([1, 2, 3])
      expect(
        reduce<number[]>([1, 2, 3], (carry, _, key: number) => ([...carry, key]), [])
      ).toEqual([0, 1, 2])
      expect(
        reduce<string>([1, 2, 3], (carry, value, key, index) => `${carry} - ${index} - ${key} - ${value}`, 'x')
      ).toBe('x - 0 - 0 - 1 - 1 - 1 - 2 - 2 - 2 - 3')

      expect(
        reduce<number[]>({ a: 1, b: 2, c: 3 }, (carry, value) => [...carry, value], [])
      ).toEqual([1, 2, 3])
      expect(
        reduce<string>({ a: 1, b: 2, c: 3 }, (carry, value, key, index) => `${carry} - ${index} - ${key} - ${value}`, 'x')
      ).toBe('x - 0 - a - 1 - 1 - b - 2 - 2 - c - 3')
    })
  })

  describe('#toArray()', () => {
    it('should covert items to array', () => {
      expect(toArray([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
      expect(toArray([{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }])).toEqual([[1, 2], [3, 4], [5]])
      expect(toArray({ a: 1, b: 2, c: 3, d: 4, e: 5 })).toEqual([1, 2, 3, 4, 5])
      expect(toArray({ a: { a: 1, b: 2 }, b: { c: 3, d: 4 }, c: { e: 5 } })).toEqual([[1, 2], [3, 4], [5]])
    })
  })

  describe('#chunk()', () => {
    it('should chunk into multiple array of a given size', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
      expect(chunk({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 2)).toEqual([{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }])
    })
  })

  describe('#except', () => {
    it('should return the items except for those with the specified keys', () => {
      expect(except([1, 2, 3], [0, 1])).toEqual([3])
      expect(except({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ c: 3 })

      expect(except([1, 2, 3], 0, 1)).toEqual([3])
      expect(except({ a: 1, b: 2, c: 3 }, 'a', 'b')).toEqual({ c: 3 })
    })
  })

  describe('#filter', () => {
    testIterator(filter)

    it('should filter the items using the given callback', () => {
      expect(filter([1, 2, 3], value => value > 1)).toEqual([2, 3])
      expect(filter([1, 2, 3], (_, key, index) => key === 1 && index === 1)).toEqual([2])
      expect(filter({ a: 1, b: 2, c: 3 }, value => value > 1)).toEqual({ b: 2, c: 3 })
      expect(filter({ a: 1, b: 2, c: 3 }, (_, key, index) => key === 'b' && index === 1)).toEqual({ b: 2 })
    })

    it('should filter the items without callback', () => {
      expect(filter(['', false, 0, 1, 2, 3])).toEqual([1, 2, 3])
      expect(filter({ a: '', b: false, c: 0, d: 1, e: 2, f: 3 })).toEqual({ d: 1, e: 2, f: 3 })
    })
  })

  describe('#isEmpty()', () => {
    it('should return true if is empty', () => {
      expect(isEmpty([])).toBe(true)
      expect(isEmpty({})).toBe(true)
      expect(isEmpty([1, 2, 3])).toBe(false)
      expect(isEmpty({ a: 1, b: 2, c: 3 })).toBe(false)
    })
  })

  describe('#isEmpty()', () => {
    it('should return true if is not empty', () => {
      expect(isNotEmpty([1, 2, 3])).toBe(true)
      expect(isNotEmpty({ a: 1, b: 2, c: 3 })).toBe(true)
      expect(isNotEmpty([])).toBe(false)
      expect(isNotEmpty({})).toBe(false)
    })
  })

  describe('#first()', () => {
    testIterator(first)

    it('should return the first element', () => {
      expect(first([1, 2, 3])).toBe(1)
      expect(first({ a: 1, b: 2, c: 3 })).toBe(1)
    })

    it('should return null if array is empty', () => {
      expect(first([])).toBe(null)
      expect(first({})).toBe(null)
    })

    it('should return the first element which passes a given truth test', () => {
      expect(first([1, 2, 3], n => n > 1)).toBe(2)
      expect(first({ a: 1, b: 2, c: 3 }, n => n > 1)).toBe(2)
    })
  })

  describe('#last()', () => {
    testIterator(last)

    it('should return the last element', () => {
      expect(last([1, 2, 3])).toBe(3)
      expect(last({ a: 1, b: 2, c: 3 })).toBe(3)
    })

    it('should return null if array is empty', () => {
      expect(last([])).toBe(null)
      expect(last({})).toBe(null)
    })

    it('should return the last element which passes a given truth test', () => {
      expect(last([1, 2, 3], n => n < 3)).toBe(2)
      expect(last({ a: 1, b: 2, c: 3 }, n => n < 3)).toBe(2)
    })
  })

  describe('#map()', () => {
    testIterator(map)

    it('should iterate over the items and replace value from callback', () => {
      expect(map([1, 2, 3], (value, key, index) => `${index} - ${key} - ${value}`))
        .toEqual(['0 - 0 - 1', '1 - 1 - 2', '2 - 2 - 3'])
      expect(map({ a: 1, b: 2, c: 3 }, (value, key, index) => `${index} - ${key} - ${value}`))
        .toEqual({ a: '0 - a - 1', b: '1 - b - 2', c: '2 - c - 3' })
    })
  })

  describe('#mapWithKeys()', () => {
    testIterator(mapWithKeys, () => ({ foo: 'bar' }))

    it('should iterate over the items and replace key and value from callback', () => {
      expect(mapWithKeys([1, 2], (value, key, index) => ({ [`${index} - ${key}`]: `${index} - ${key} - ${value}` })))
        .toEqual({ '0 - 0': '0 - 0 - 1', '1 - 1': '1 - 1 - 2' })
      expect(mapWithKeys({ a: 1, b: 2 }, (value, key, index) => ({ [`${index} - ${key}`]: `${index} - ${key} - ${value}` })))
        .toEqual({ '0 - a': '0 - a - 1', '1 - b': '1 - b - 2' })
    })
  })

  describe('#flatten()', () => {
    it('should flatten a multi dimensional object into signle dimension', () => {
      expect(flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5])
      expect(flatten([{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }])).toEqual([1, 2, 3, 4, 5])
      expect(flatten({ a: { a: 1, b: 2 }, b: { c: 3, d: 4 }, c: { e: 5 } })).toEqual([1, 2, 3, 4, 5])
    })

    it('should flatten a multi dimensional object into specified depth dimension', () => {
      expect(flatten([[[1], [2]], [[3], [4]], [[5]]], 1)).toEqual([[1], [2], [3], [4], [5]])
      expect(flatten([{ a: [1], b: [2] }, { c: [3], d: [4] }, { e: [5] }], 1)).toEqual([[1], [2], [3], [4], [5]])
      expect(flatten({ a: { a: [1], b: [2] }, b: { c: [3], d: [4] }, c: { e: [5] } }, 1)).toEqual([[1], [2], [3], [4], [5]])
    })
  })

  describe('#min()', () => {
    it('should return the minimum value', () => {
      expect(min([1, 2, 3])).toBe(1)
      expect(min({ a: 1, b: 2, c: 3 })).toBe(1)
    })
  })

  describe('#max()', () => {
    it('should return the maximum value', () => {
      expect(max([1, 2, 3])).toBe(3)
      expect(max({ a: 1, b: 2, c: 3 })).toBe(3)
    })
  })

  describe('#only', () => {
    it('should return the items with the specified keys', () => {
      expect(only([1, 2, 3], [0, 1])).toEqual([1, 2])
      expect(only({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ a: 1, b: 2 })

      expect(only([1, 2, 3], 0, 1)).toEqual([1, 2])
      expect(only({ a: 1, b: 2, c: 3 }, 'a', 'b')).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#pipe', () => {
    it('should pass the items to the given callback and return the result', () => {
      expect(pipe([1, 2, 3], items => [...items, 4])).toEqual([1, 2, 3, 4])
      expect(pipe({ a: 1, b: 2, c: 3 }, items => ({ ...items, b: 4 }))).toEqual({ a: 1, c: 3, b: 4 })
    })
  })

  describe('#pluck', () => {
    it('should retrive all of the values for a given key', () => {
      expect(pluck([[1, 2, 3], [1, 2, 3]], 0)).toEqual([1, 1])
      expect(pluck([{ a: 1, b: 2 }, { a: 1, b: 2 }], 'a')).toEqual([1, 1])
      expect(pluck({ a: { a: 1, b: 2 }, b: { a: 1, b: 2 } }, 'a')).toEqual([1, 1])

      expect(pluck([{ a: 1, b: 'a' }, { a: 2, b: 'b' }], 'a', 'b')).toEqual({ a: 1, b: 2 })
      expect(pluck({ a: { a: 1, b: 'a' }, b: { a: 2, b: 'b' } }, 'a', 'b')).toEqual({ a: 1, b: 2 })

      expect(pluck(
        [{ a: 1, b: 'a' }, { a: 2, b: 'b' }],
        'a',
        (row: { [key: string]: number | string }): string => row.b.toString()
      )).toEqual({ a: 1, b: 2 })
      expect(pluck(
        { a: { a: 1, b: 'a' }, b: { a: 2, b: 'b' } },
        'a',
        (row: { [key: string]: number | string }): string => row.b.toString()
      )).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#reject', () => {
    testIterator(reject)

    it('should reject the items using the given callback', () => {
      expect(reject([1, 2, 3], value => value > 1)).toEqual([1])
      expect(reject([1, 2, 3], (_, key, index) => key === 1 && index === 1)).toEqual([1, 3])
      expect(reject({ a: 1, b: 2, c: 3 }, value => value > 1)).toEqual({ a: 1 })
      expect(reject({ a: 1, b: 2, c: 3 }, (_, key, index) => key === 'b' && index === 1)).toEqual({ a: 1, c: 3 })
    })
  })

  describe('#swap()', () => {
    it('should swap two value of given keys', () => {
      expect(swap([1, 2, 3], 1, 2)).toEqual([1, 3, 2])
      expect(swap({ a: 1, b: 2, c: 3 }, 'b', 'c')).toEqual({ a: 1, b: 3, c: 2 })
    })
  })

  describe('#shuffle()', () => {
    it('should shuffle the itmes', () => {
      const originalRandom = Math.random

      Math.random = () => 0

      expect(shuffle([1, 2, 3])).toEqual([3, 1, 2])
      expect(shuffle({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 })

      Math.random = originalRandom
    })
  })

  describe('#take()', () => {
    it('should return a new collection with the specified number of items', () => {
      expect(take([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3])
      expect(take({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 3)).toEqual({ a: 1, b: 2, c: 3 })
    })
  })

  describe('#unique()', () => {
    it('should return all of the unique items', () => {
      expect(unique([1, 2, 2])).toEqual([1, 2])
      expect(unique({ a: 1, b: 2, c: 2 })).toEqual({ a: 1, b: 2 })
    })

    it('should return all of the unique items by the given key', () => {
      expect(unique([{ a: 1 }, { a: 2 }, { a: 2 }], 'a')).toEqual([{ a: 1 }, { a: 2 }])
      expect(unique({ a: { a: 1 }, b: { a: 2 }, c: { a: 2 } }, 'a')).toEqual({ a: { a: 1 }, b: { a: 2 } })
    })

    it('should return all of the unique items by the given callback', () => {
      expect(unique([{ a: 1 }, { a: 2 }, { a: 2 }], ({ a }) => a)).toEqual([{ a: 1 }, { a: 2 }])
      expect(unique({ a: { a: 1 }, b: { a: 2 }, c: { a: 2 } }, ({ a }) => a)).toEqual({ a: { a: 1 }, b: { a: 2 } })
    })
  })

  describe('#diff()', () => {
    it('should computes the difference of collections', () => {
      expect(diff([1, 2, 3], [1, 2])).toEqual([3])
      expect(diff([1, 2, 3, 3], [1, 2])).toEqual([3, 3])
      expect(diff({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ c: 3 })
      expect(diff({ a: 1, b: 2, c: 3, d: 3 }, { a: 1, b: 2 })).toEqual({ c: 3, d: 3 })
      expect(diff([1, 2, 3], { a: 1, b: 2 })).toEqual([3])
      expect(diff({ a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ c: 3 })
    })
  })

  describe('#diffKeys()', () => {
    it('should computes the difference of collections using keys for comparison', () => {
      expect(diffKeys([1, 2, 3], [1, 2])).toEqual({ 2: 3 })
      expect(diffKeys([1, 2, 3, 3], [1, 2])).toEqual({ 2: 3, 3: 3 })
      expect(diffKeys({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ c: 3 })
      expect(diffKeys({ a: 1, b: 2, c: 3, d: 3 }, { a: 1, b: 2 })).toEqual({ c: 3, d: 3 })
      expect(diffKeys([1, 2, 3], { a: 1, b: 2 })).toEqual({ 0: 1, 1: 2, 2: 3 })
      expect(diffKeys({ a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ a: 1, b: 2, c: 3 })
    })

    it('should computes the difference of collections using keys for comparison if key contains dot', () => {
      expect(diffKeys({ a: 1, 'a.b': 2, 'a.b.c': 3 }, { a: 1, 'a.b.c': 3 })).toEqual({ 'a.b': 2 })
    })
  })

  describe('#intersect()', () => {
    it('should computes the intersection of collections', () => {
      expect(intersect([1, 2, 3], [1, 2])).toEqual([1, 2])
      expect(intersect([1, 2, 2, 3], [1, 2])).toEqual([1, 2, 2])
      expect(intersect({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
      expect(intersect({ a: 1, b: 2, c: 2, d: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2, c: 2 })
      expect(intersect([1, 2, 3], { a: 1, b: 2 })).toEqual([1, 2])
      expect(intersect({ a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#intersectByKeys()', () => {
    it('should computes the intersection of collections using keys for comparison', () => {
      expect(intersectByKeys([1, 2, 3], [1, 2])).toEqual({ 0: 1, 1: 2 })
      expect(intersectByKeys([1, 2, 2, 3], [1, 2])).toEqual({ 0: 1, 1: 2 })
      expect(intersectByKeys({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
      expect(intersectByKeys({ a: 1, b: 2, c: 2, d: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
      expect(intersectByKeys([1, 2, 3], { a: 1, b: 2 })).toEqual({})
      expect(intersectByKeys({ a: 1, b: 2, c: 3 }, [1, 2])).toEqual({})
    })

    it('should computes the intersection of collections using keys for comparison if key contains dot', () => {
      expect(intersectByKeys({ a: 1, 'a.b': 2, 'a.b.c': 3 }, { a: 1, 'a.b.c': 3 })).toEqual({ a: 1, 'a.b.c': 3 })
    })
  })

  describe('#merge()', () => {
    it('should merge collections', () => {
      expect(merge([1, 2, 3], [4, 5])).toEqual([1, 2, 3, 4, 5])
      expect(merge({ a: 1, b: 2, c: 3 }, { d: 4, e: 5 })).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 })
      expect(merge([1, 2, 3], { a: 4, b: 5 })).toEqual({ 0: 1, 1: 2, 2: 3, a: 4, b: 5 })
      expect(merge({ a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ a: 1, b: 2, c: 3, 0: 1, 1: 2 })
      expect(merge({ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 })).toEqual({ a: 4, b: 5, c: 6 })
    })

    it('should merge more than one collections', () => {
      expect(merge([1, 2, 3], [4, 5], [6, 7])).toEqual([1, 2, 3, 4, 5, 6, 7])
      expect(merge({ a: 1, b: 2, c: 3 }, [4, 5], [6, 7])).toEqual({ a: 1, b: 2, c: 3, 0: 4, 1: 5, 2: 6, 3: 7 })
    })
  })

  describe('#keyBy', () => {
    it('should keys the collection by the given key', () => {
      expect(keyBy([{ a: 1, b: 'a' }, { a: 2, b: 'b' }], 'b')).toEqual({ a: { a: 1, b: 'a' }, b: { a: 2, b: 'b' } })
      expect(keyBy({ a: { a: 1, b: 'c' }, b: { a: 2, b: 'd' } }, 'b')).toEqual({ c: { a: 1, b: 'c' }, d: { a: 2, b: 'd' } })
    })

    it('should keys the collection by the given callback', () => {
      expect(keyBy(
        [{ a: 1, b: 'a' }, { a: 2, b: 'b' }],
        (row: { [key: string]: number | string }): string => row.b.toString()
      )).toEqual({ a: { a: 1, b: 'a' }, b: { a: 2, b: 'b' } })
      expect(keyBy(
        { a: { a: 1, b: 'c' }, b: { a: 2, b: 'd' } },
        (row: { [key: string]: number | string }): string => row.b.toString()
      )).toEqual({ c: { a: 1, b: 'c' }, d: { a: 2, b: 'd' } })
    })
  })

  describe('#groupBy', () => {
    it('should groups the collection by the given key', () => {
      expect(groupBy([{ a: 'a' }, { a: 'a' }, { a: 'b' }], 'a')).toEqual({ a: [{ a: 'a' }, { a: 'a' }], b: [{ a: 'b' }] })
      expect(groupBy({ a: { a: 'a' }, b: { a: 'b' } }, 'a')).toEqual({ a: { a: { a: 'a' } }, b: { b: { a: 'b' } } })
    })

    it('should groups the collection by the given callback', () => {
      expect(groupBy(
        [{ a: 'a' }, { a: 'a' }, { a: 'b' }],
        (row: { [key: string]: string }): string => row.a
      )).toEqual({ a: [{ a: 'a' }, { a: 'a' }], b: [{ a: 'b' }] })
      expect(groupBy(
        { a: { a: 'a' }, b: { a: 'b' } },
        (row: { [key: string]: string }): string => row.a
      )).toEqual({ a: { a: { a: 'a' } }, b: { b: { a: 'b' } } })
    })

    it('should groups the collection by array value', () => {
      expect(groupBy([{ a: ['a'] }, { a: ['a', 'b'] }, { a: ['b'] }], 'a'))
        .toEqual({ a: [{ a: ['a'] }, { a: ['a', 'b'] }], b: [{ a: ['a', 'b'] }, { a: ['b'] }] })
      expect(groupBy({ a: { a: ['a'] }, b: { a: ['a', 'b'] } }, 'a'))
        .toEqual({ a: { a: { a: ['a'] }, b: { a: ['a', 'b'] } }, b: { b: { a: ['a', 'b'] } } })
    })
  })

  describe('#sort', () => {
    it('should sort the collection', () => {
      expect(sort([3, 5, 3, 4, 2, 1])).toEqual([1, 2, 3, 3, 4, 5])
      expect(sort([[5, 4], [5, 3]])).toEqual([[5, 3], [5, 4]])
      expect(sort([{ a: 5, b: 4 }, { a: 5, b: 3 }])).toEqual([{ a: 5, b: 3 }, { a: 5, b: 4 }])
      expect(JSON.stringify(sort({ a: 5, b: 4, c: 3 }))).toBe(JSON.stringify({ c: 3, b: 4, a: 5 }))
      expect(JSON.stringify(sort({ a: [5, 4], b: [5, 3] }))).toBe(JSON.stringify({ b: [5, 3], a: [5, 4] }))
      expect(JSON.stringify(sort({ a: { a: 5, b: 4 }, b: { a: 5, b: 3 } }))).toBe(JSON.stringify({ b: { a: 5, b: 3 }, a: { a: 5, b: 4 } }))
    })

    it('should sort the collection using the given callback', () => {
      expect(sort([1, 2, 4, 3, 5, 3], (a, b) => b - a)).toEqual([5, 4, 3, 3, 2, 1])
      expect(sort([[1, 2], [3, 4]], (a, b) => b[0] - a[0])).toEqual([[3, 4], [1, 2]])
      expect(sort([{ a: 1, b: 2 }, { a: 3, b: 4 }], (a, b) => b.a - a.a)).toEqual([{ a: 3, b: 4 }, { a: 1, b: 2 }])
      expect(JSON.stringify(sort({ a: 1, b: 2, c: 3 }, (a, b) => b - a))).toBe(JSON.stringify({ c: 3, b: 2, a: 1 }))
      expect(JSON.stringify(sort({ a: [1, 2], b: [3, 4] }, (a, b) => b[0] - a[0]))).toBe(JSON.stringify({ b: [3, 4], a: [1, 2] }))
      expect(JSON.stringify(sort({ a: { a: 1, b: 2 }, b: { a: 3, b: 4 } }, (a, b) => b.a - a.a))).toBe(JSON.stringify({ b: { a: 3, b: 4 }, a: { a: 1, b: 2 } }))
    })

    it('should sort the collection which contains string', () => {
      expect(sort(['c', 'b', 'a'])).toEqual(['a', 'b', 'c'])
      expect(JSON.stringify(sort({ a: 'c', b: 'b', c: 'a' }))).toBe(JSON.stringify({ c: 'a', b: 'b', a: 'c' }))
    })
  })

  describe('#sortDesc', () => {
    it('should sort the collection', () => {
      expect(sortDesc([3, 5, 3, 4, 2, 1])).toEqual([5, 4, 3, 3, 2, 1])
      expect(sortDesc([[1, 2], [3, 4]])).toEqual([[3, 4], [1, 2]])
      expect(sortDesc([{ a: 1, b: 2 }, { a: 3, b: 4 }])).toEqual([{ a: 3, b: 4 }, { a: 1, b: 2 }])
      expect(JSON.stringify(sortDesc({ a: 1, b: 2, c: 3 }))).toBe(JSON.stringify({ c: 3, b: 2, a: 1 }))
      expect(JSON.stringify(sortDesc({ a: [1, 2], b: [3, 4] }))).toBe(JSON.stringify({ b: [3, 4], a: [1, 2] }))
      expect(JSON.stringify(sortDesc({ a: { a: 1, b: 2 }, b: { a: 3, b: 4 } }))).toBe(JSON.stringify({ b: { a: 3, b: 4 }, a: { a: 1, b: 2 } }))
    })

    it('should sort the collection which contains string', () => {
      expect(sortDesc(['a', 'b', 'c'])).toEqual(['c', 'b', 'a'])
      expect(JSON.stringify(sortDesc({ a: 'a', b: 'b', c: 'c' }))).toBe(JSON.stringify({ c: 'c', b: 'b', a: 'a' }))
    })
  })

  describe('#sortBy', () => {
    it('should sort the collection by the given key', () => {
      expect(sortBy([[1, 4], [2, 3]], 1)).toEqual([[2, 3], [1, 4]])
      expect(sortBy([{ a: 1, b: 4 }, { a: 2, b: 3 }], 'b')).toEqual([{ a: 2, b: 3 }, { a: 1, b: 4 }])
      expect(JSON.stringify(sortBy({ a: [1, 4], b: [2, 3] }, 1))).toBe(JSON.stringify({ b: [2, 3], a: [1, 4] }))
      expect(JSON.stringify(sortBy({ a: { a: 1, b: 4 }, b: { a: 2, b: 3 } }, 'b'))).toBe(JSON.stringify({ b: { a: 2, b: 3 }, a: { a: 1, b: 4 } }))
    })

    it('should sort the collection using the given callback', () => {
      expect(sortBy([[1, 4], [2, 3]], item => item[1])).toEqual([[2, 3], [1, 4]])
      expect(sortBy([{ a: 1, b: 4 }, { a: 2, b: 3 }], item => item.b)).toEqual([{ a: 2, b: 3 }, { a: 1, b: 4 }])
      expect(JSON.stringify(sortBy({ a: [1, 4], b: [2, 3] }, item => item[1]))).toBe(JSON.stringify({ b: [2, 3], a: [1, 4] }))
      expect(JSON.stringify(sortBy({ a: { a: 1, b: 4 }, b: { a: 2, b: 3 } }, item => item.b))).toBe(JSON.stringify({ b: { a: 2, b: 3 }, a: { a: 1, b: 4 } }))
    })

    it('should sort the collection by the given key descending', () => {
      expect(sortBy([[2, 3], [1, 4]], 1, true)).toEqual([[1, 4], [2, 3]])
      expect(sortBy([{ a: 2, b: 3 }, { a: 1, b: 4 }], 'b', true)).toEqual([{ a: 1, b: 4 }, { a: 2, b: 3 }])
      expect(JSON.stringify(sortBy({ a: [2, 3], b: [1, 4] }, 1, true))).toBe(JSON.stringify({ b: [1, 4], a: [2, 3] }))
      expect(JSON.stringify(sortBy({ a: { a: 2, b: 3 }, b: { a: 1, b: 4 } }, 'b', true))).toBe(JSON.stringify({ b: { a: 1, b: 4 }, a: { a: 2, b: 3 } }))
    })

    it('should sort the collection using the given callback descending', () => {
      expect(sortBy([[2, 3], [1, 4]], item => item[1], true)).toEqual([[1, 4], [2, 3]])
      expect(sortBy([{ a: 2, b: 3 }, { a: 1, b: 4 }], item => item.b, true)).toEqual([{ a: 1, b: 4 }, { a: 2, b: 3 }])
      expect(JSON.stringify(sortBy({ a: [2, 3], b: [1, 4] }, item => item[1], true))).toBe(JSON.stringify({ b: [1, 4], a: [2, 3] }))
      expect(JSON.stringify(sortBy({ a: { a: 2, b: 3 }, b: { a: 1, b: 4 } }, item => item.b, true))).toBe(JSON.stringify({ b: { a: 1, b: 4 }, a: { a: 2, b: 3 } }))
    })
  })

  describe('#sortByDesc', () => {
    it('should sort the collection by the given key', () => {
      expect(sortByDesc([[2, 3], [1, 4]], 1)).toEqual([[1, 4], [2, 3]])
      expect(sortByDesc([{ a: 2, b: 3 }, { a: 1, b: 4 }], 'b')).toEqual([{ a: 1, b: 4 }, { a: 2, b: 3 }])
      expect(JSON.stringify(sortByDesc({ a: [2, 3], b: [1, 4] }, 1))).toBe(JSON.stringify({ b: [1, 4], a: [2, 3] }))
      expect(JSON.stringify(sortByDesc({ a: { a: 2, b: 3 }, b: { a: 1, b: 4 } }, 'b'))).toBe(JSON.stringify({ b: { a: 1, b: 4 }, a: { a: 2, b: 3 } }))
    })

    it('should sort the collection using the given callback', () => {
      expect(sortByDesc([[2, 3], [1, 4]], item => item[1])).toEqual([[1, 4], [2, 3]])
      expect(sortByDesc([{ a: 2, b: 3 }, { a: 1, b: 4 }], item => item.b)).toEqual([{ a: 1, b: 4 }, { a: 2, b: 3 }])
      expect(JSON.stringify(sortByDesc({ a: [2, 3], b: [1, 4] }, item => item[1]))).toBe(JSON.stringify({ b: [1, 4], a: [2, 3] }))
      expect(JSON.stringify(sortByDesc({ a: { a: 2, b: 3 }, b: { a: 1, b: 4 } }, item => item.b))).toBe(JSON.stringify({ b: { a: 1, b: 4 }, a: { a: 2, b: 3 } }))
    })
  })

  describe('#append', () => {
    it('should appends an item to the end of the collection', () => {
      expect(append([1, 2, 3, 4], 5)).toEqual([1, 2, 3, 4, 5])
      expect(JSON.stringify(append({ a: 1, b: 2 }, 3, 'c'))).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }))
    })
  })

  describe('#prepend', () => {
    it('should adds an item to the beginning of the collection', () => {
      expect(prepend([2, 3, 4, 5], 1)).toEqual([1, 2, 3, 4, 5])
      expect(JSON.stringify(prepend({ b: 2, c: 3 }, 1, 'a'))).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }))
    })
  })

  describe('#index', () => {
    it('should return the index of the first item in collection', () => {
      expect(index([1, 2, 3, 4, 5], 3)).toBe(2)
      expect(index([1, 2, 3, 4, 5], 0)).toBe(null)
      expect(index({ a: 1, b: 2, c: 3 }, 2)).toBe('b')
      expect(index({ a: 1, b: 2, c: 3 }, 0)).toBe(null)
    })
  })

  describe('#insert', () => {
    it('should insert an item before the element with the given index of the collection', () => {
      expect(insert([1, 2, 4, 5], 2, 3)).toEqual([1, 2, 3, 4, 5])
      expect(insert([1, 2, 4, 5], 5, 3)).toEqual([1, 2, 4, 5, 3])
      expect(JSON.stringify(insert({ a: 1, c: 3 }, 'c', 2, 'b'))).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }))
      expect(JSON.stringify(insert({ a: 1, c: 3 }, 'e', 2, 'b'))).toBe(JSON.stringify({ a: 1, c: 3, b: 2 }))
    })
  })

  describe('#join', () => {
    it('should join the items in a collection', () => {
      expect(join([1, 2, 3, 4, 5])).toBe('1, 2, 3, 4, 5')
      expect(join({ a: 1, b: 2, c: 3 })).toBe('1, 2, 3')
    })

    it('should join the items in a collection with a given glue', () => {
      expect(join([1, 2, 3, 4, 5], '-')).toBe('1-2-3-4-5')
      expect(join({ a: 1, b: 2, c: 3 }, '-')).toBe('1-2-3')
    })
  })

  describe('#partition', () => {
    testIterator(partition)

    it('should separate elements that pass a given truth test from those that do not', () => {
      expect(partition([1, 2, 3, 4, 5], (value, key) => key < 2 && value < 3)).toEqual([[1, 2], [3, 4, 5]])
      expect(partition({ a: 1, b: 2, c: 3 }, (value, key) => key === 'a' && value === 1)).toEqual([{ a: 1 }, { b: 2, c: 3 }])
    })
  })

  describe('#flip', () => {
    it('should swap keys with their corresponding values', () => {
      expect(flip(['a', 'b', 'c'])).toEqual({ a: 0, b: 1, c: 2 })
      expect(flip({ a: 0, b: 1, c: 2 })).toEqual({ 0: 'a', 1: 'b', 2: 'c' })
    })
  })

  describe('#fill', () => {
    it('should fill all elements with a given value', () => {
      expect(fill(['a', 'b', 'c'], 'd')).toEqual(['d', 'd', 'd'])
      expect(fill(['a', 'b', 'c'], 'd', 1)).toEqual(['a', 'd', 'd'])
      expect(fill(['a', 'b', 'c'], 'd', 1, 2)).toEqual(['a', 'd', 'c'])
      expect(fill({ a: 0, b: 1, c: 2 }, 3)).toEqual({ a: 3, b: 3, c: 3 })
      expect(fill({ a: 0, b: 1, c: 2 }, 3, 1)).toEqual({ a: 0, b: 3, c: 3 })
      expect(fill({ a: 0, b: 1, c: 2 }, 3, 1, 2)).toEqual({ a: 0, b: 3, c: 2 })
    })
  })

  describe('#freeze', () => {
    it('should freeze the collection', () => {
      const array: never[] = []
      const object: {} = {}

      expect(Object.isFrozen(array)).toEqual(false)
      expect(Object.isFrozen(object)).toEqual(false)

      freeze(array)
      freeze(object)

      expect(Object.isFrozen(array)).toEqual(true)
      expect(Object.isFrozen(object)).toEqual(true)
    })
  })

  describe('#isFrozen', () => {
    it('should return the collection is forzen or not', () => {
      const array: never[] = []
      const object: {} = {}

      expect(isFrozen(array)).toEqual(false)
      expect(isFrozen(object)).toEqual(false)

      Object.freeze(array)
      Object.freeze(object)

      expect(isFrozen(array)).toEqual(true)
      expect(isFrozen(object)).toEqual(true)
    })
  })

  describe('#flatMap', () => {
    testIterator(flatMap)

    it('should iterates through the collection and passes each value to the given closure', () => {
      expect(flatMap([1, 2, 3], (value, key, index) => [`${index} - ${key} - ${value}`]))
        .toEqual(['0 - 0 - 1', '1 - 1 - 2', '2 - 2 - 3'])
      expect(flatMap([1, 2, 3], (value, key, index) => ({ [key]: `${index} - ${key} - ${value}` })))
        .toEqual({ 0: '0 - 0 - 1', 1: '1 - 1 - 2', 2: '2 - 2 - 3' })
      expect(flatMap({ a: 1, b: 2, c: 3 }, (value, key, index) => ({ [key]: `${index} - ${key} - ${value}` })))
        .toEqual({ a: '0 - a - 1', b: '1 - b - 2', c: '2 - c - 3' })
      expect(flatMap({ a: 1, b: 2, c: 3 }, (value, key, index) => [`${index} - ${key} - ${value}`]))
        .toEqual(['0 - a - 1', '1 - b - 2', '2 - c - 3'])
      expect(flatMap([1, 2, 3], value => [value, value + 1]))
        .toEqual([1, 2, 2, 3, 3, 4])
      expect(flatMap({ a: 1, b: 2 }, (value, key, index) => ({ [key]: value, [index]: value + 1 })))
        .toEqual({ a: 1, 0: 2, b: 2, 1: 3 })
    })
  })
})
