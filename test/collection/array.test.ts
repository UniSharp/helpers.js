import { Optional } from '../../src/helpers'
import {
  contains,
  count,
  has,
  get,
  set,
  sum,
  avg,
  each,
  chunk,
  except,
  isEmpty,
  isNotEmpty,
  first,
  last,
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
  intersect,
  merge,
  keyBy,
  groupBy,
  sortDesc,
  sortBy,
  sortByDesc,
  append,
  prepend,
  index,
  insert,
  partition,
  flip,
  freeze,
  isFrozen
} from '../../src/collection/array'

function testIterator (method: Function, callback: Optional<(value: any, index: any, array: any) => any> = null): void {
  it('should iterate correct value, index and array', () => {
    let count: number = 0
    const arr: string[] = ['a', 'b', 'c']

    method(arr, (value: string, index: number, array: string[]) => {
      expect(value).toBe(arr[index])
      expect(index).toBe(count++)
      expect(array).toEqual(arr)

      if (callback) {
        return callback(value, index, array)
      }

      return true
    })

    expect(count).toBe(3)
  })
}

describe('Array', () => {
  describe('#contains()', () => {
    it('should determines whether the object contains a given item', () => {
      expect(contains([1, 2, 3], 3)).toBe(true)
      expect(contains([1, 2, 3], 4)).toBe(false)
    })
  })

  describe('#count()', () => {
    it('should return the total number', () => {
      expect(count([1, 2, 3])).toBe(3)
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
    })

    it('should return the default value if given key is not exists', () => {
      expect(get([1, 2, 3, 4, 5], 5, 6)).toBe(6)
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

      expect(set([], '0.0.a', 1)).toEqual([[{ a: 1 }]])
      expect(set([], '[0][0].a', 1)).toEqual([[{ a: 1 }]])
    })
  })

  describe('#sum()', () => {
    it('should return the sum', () => {
      expect(sum([1, 2, 3])).toBe(6)
    })

    it('should return the sum of string items', () => {
      expect(sum(['1', '2', '3'])).toBe(6)
    })

    it('should return the sum of a given key', () => {
      expect(sum([{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }])).toBe(0)
    })
  })

  describe('#avg()', () => {
    it('should return null if is empty', () => {
      expect(avg([])).toBe(null)
    })

    it('should return the average value', () => {
      expect(avg([1, 2, 3])).toBe(2)
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
      const obj = [1, 2, 3]

      each(obj, (value): boolean | void => {
        if (value === 2) {
          return false
        }

        count++
      })

      expect(count).toBe(1)
    })
  })

  describe('#chunk()', () => {
    it('should chunk into multiple array of a given size', () => {
      expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]])
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
    })
  })

  describe('#reject', () => {
    testIterator(reject)

    it('should reject the items using the given callback', () => {
      expect(reject([1, 2, 3], value => value > 1)).toEqual([1])
      expect(reject([1, 2, 3], (_, index) => index === 1)).toEqual([1, 3])
    })
  })

  describe('#only', () => {
    it('should return the items with the specified keys', () => {
      expect(only([1, 2, 3], [0, 1])).toEqual([1, 2])
      expect(only([1, 2, 3], 0, 1)).toEqual([1, 2])
    })
  })

  describe('#except', () => {
    it('should return the items except for those with the specified keys', () => {
      expect(except([1, 2, 3], [0, 1])).toEqual([3])
      expect(except([1, 2, 3], 0, 1)).toEqual([3])
    })
  })

  describe('#isEmpty()', () => {
    it('should return true if is empty', () => {
      expect(isEmpty([])).toBe(true)
      expect(isEmpty([1, 2, 3])).toBe(false)
    })
  })

  describe('#isNotEmpty()', () => {
    it('should return true if is not empty', () => {
      expect(isNotEmpty([1, 2, 3])).toBe(true)
      expect(isNotEmpty([])).toBe(false)
    })
  })

  describe('#first()', () => {
    testIterator(first, () => false)

    it('should return the first element', () => {
      expect(first([1, 2, 3])).toBe(1)
    })

    it('should return null if array is empty', () => {
      expect(first([])).toBe(null)
    })

    it('should return the first element which passes a given truth test', () => {
      expect(first([1, 2, 3], n => n > 1)).toBe(2)
    })
  })

  describe('#last()', () => {
    testIterator(last)

    it('should return the last element', () => {
      expect(last([1, 2, 3])).toBe(3)
    })

    it('should return null if array is empty', () => {
      expect(last([])).toBe(null)
    })

    it('should return the last element which passes a given truth test', () => {
      expect(last([1, 2, 3], n => n < 3)).toBe(2)
    })
  })

  describe('#mapWithKeys()', () => {
    testIterator(mapWithKeys, () => ({ foo: 'bar' }))

    it('should iterate over the items and replace key and value from callback', () => {
      expect(mapWithKeys([1, 2], (value, index) => ({ [`${value} - ${index}`]: `${index} - ${value}` })))
        .toEqual({ '1 - 0': '0 - 1', '2 - 1': '1 - 2' })
    })
  })

  describe('#flatten()', () => {
    it('should flatten a multi dimensional object into signle dimension', () => {
      expect(flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5])
      expect(flatten([{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }])).toEqual([1, 2, 3, 4, 5])
    })

    it('should flatten a multi dimensional object into specified depth dimension', () => {
      expect(flatten([[[1], [2]], [[3], [4]], [[5]]], 1)).toEqual([[1], [2], [3], [4], [5]])
      expect(flatten([{ a: [1], b: [2] }, { c: [3], d: [4] }, { e: [5] }], 1)).toEqual([[1], [2], [3], [4], [5]])
    })
  })

  describe('#min()', () => {
    it('should return the minimum value', () => {
      expect(min([1, 2, 3])).toBe(1)
    })
  })

  describe('#max()', () => {
    it('should return the maximum value', () => {
      expect(max([1, 2, 3])).toBe(3)
    })
  })

  describe('#pipe', () => {
    it('should pass the items to the given callback and return the result', () => {
      expect(pipe([1, 2, 3], items => [...items, 4])).toEqual([1, 2, 3, 4])
    })
  })

  describe('#pluck', () => {
    it('should retrive all of the values for a given key', () => {
      expect(pluck([{ a: 1, b: 2 }, { a: 1, b: 2 }], 'a')).toEqual([1, 1])

      expect(pluck([{ a: 1, b: 'a' }, { a: 2, b: 'b' }], 'a', 'b')).toEqual({ a: 1, b: 2 })

      expect(pluck(
        [{ a: 1, b: 'a' }, { a: 2, b: 'b' }],
        'a',
        (row: { [key: string]: number | string }): string => row.b.toString()
      )).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#swap()', () => {
    it('should swap two value of given keys', () => {
      expect(swap([1, 2, 3], 1, 2)).toEqual([1, 3, 2])
    })
  })

  describe('#shuffle()', () => {
    it('should shuffle the items', () => {
      const originalRandom = Math.random

      Math.random = () => 0

      expect(shuffle([1, 2, 3])).toEqual([3, 1, 2])

      Math.random = originalRandom
    })
  })

  describe('#take()', () => {
    it('should return a new collection with the specified number of items', () => {
      expect(take([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3])
    })
  })

  describe('#unique()', () => {
    it('should return all of the unique items', () => {
      expect(unique([1, 2, 2])).toEqual([1, 2])
    })

    it('should return all of the unique items by the given key', () => {
      expect(unique([{ a: 1 }, { a: 2 }, { a: 2 }], 'a')).toEqual([{ a: 1 }, { a: 2 }])
    })

    it('should return all of the unique items by the given callback', () => {
      expect(unique([{ a: 1 }, { a: 2 }, { a: 2 }], ({ a }) => a)).toEqual([{ a: 1 }, { a: 2 }])
    })
  })

  describe('#diff()', () => {
    it('should computes the difference of collections', () => {
      expect(diff([1, 2, 3], [1, 2])).toEqual([3])
      expect(diff([1, 2, 3, 3], [1, 2])).toEqual([3, 3])
      expect(diff([1, 2, 3], { a: 1, b: 2 })).toEqual([3])
    })
  })

  describe('#intersect()', () => {
    it('should computes the intersection of collections', () => {
      expect(intersect([1, 2, 3], [1, 2])).toEqual([1, 2])
      expect(intersect([1, 2, 2, 3], [1, 2])).toEqual([1, 2, 2])
      expect(intersect([1, 2, 3], { a: 1, b: 2 })).toEqual([1, 2])
    })
  })

  describe('#merge()', () => {
    it('should merge collections', () => {
      expect(merge([1, 2, 3], [4, 5])).toEqual([1, 2, 3, 4, 5])
    })

    it('should merge more than one collections', () => {
      expect(merge([1, 2, 3], [4, 5], [6, 7])).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
  })

  describe('#keyBy', () => {
    it('should keys the collection by the given key', () => {
      expect(keyBy([{ a: 1, b: 'a' }, { a: 2, b: 'b' }], 'b')).toEqual({ a: { a: 1, b: 'a' }, b: { a: 2, b: 'b' } })
    })

    it('should keys the collection by the given callback', () => {
      expect(keyBy(
        [{ a: 1, b: 'a' }, { a: 2, b: 'b' }],
        (row: { [key: string]: number | string }): string => row.b.toString()
      )).toEqual({ a: { a: 1, b: 'a' }, b: { a: 2, b: 'b' } })
    })
  })

  describe('#groupBy', () => {
    it('should groups the collection by the given key', () => {
      expect(groupBy([{ a: 'a' }, { a: 'a' }, { a: 'b' }], 'a')).toEqual({ a: [{ a: 'a' }, { a: 'a' }], b: [{ a: 'b' }] })
    })

    it('should groups the collection by the given callback', () => {
      expect(groupBy(
        [{ a: 'a' }, { a: 'a' }, { a: 'b' }],
        (row: { [key: string]: string }): string => row.a
      )).toEqual({ a: [{ a: 'a' }, { a: 'a' }], b: [{ a: 'b' }] })
    })

    it('should groups the collection by array value', () => {
      expect(groupBy([{ a: ['a'] }, { a: ['a', 'b'] }, { a: ['b'] }], 'a'))
        .toEqual({ a: [{ a: ['a'] }, { a: ['a', 'b'] }], b: [{ a: ['a', 'b'] }, { a: ['b'] }] })
    })
  })

  describe('#sortDesc', () => {
    it('should sort the collection', () => {
      expect(sortDesc([3, 5, 3, 4, 2, 1])).toEqual([5, 4, 3, 3, 2, 1])
      expect(sortDesc([[1, 2], [3, 4]])).toEqual([[3, 4], [1, 2]])
      expect(sortDesc(['a', 'b', 'c'])).toEqual(['c', 'b', 'a'])
    })
  })

  describe('#sortBy', () => {
    it('should sort the collection by the given key', () => {
      expect(sortBy([{ a: 1, b: 4 }, { a: 2, b: 3 }], 'b')).toEqual([{ a: 2, b: 3 }, { a: 1, b: 4 }])
    })

    it('should sort the collection using the given callback', () => {
      expect(sortBy([{ a: 1, b: 4 }, { a: 2, b: 3 }], item => item.b)).toEqual([{ a: 2, b: 3 }, { a: 1, b: 4 }])
    })
  })

  describe('#sortByDesc', () => {
    it('should sort the collection by the given key', () => {
      expect(sortByDesc([{ a: 2, b: 3 }, { a: 1, b: 4 }], 'b')).toEqual([{ a: 1, b: 4 }, { a: 2, b: 3 }])
    })

    it('should sort the collection using the given callback', () => {
      expect(sortByDesc([{ a: 2, b: 3 }, { a: 1, b: 4 }], item => item.b)).toEqual([{ a: 1, b: 4 }, { a: 2, b: 3 }])
    })
  })

  describe('#index', () => {
    it('should return the index of the first item in collection', () => {
      expect(index([1, 2, 3, 4, 5], 3)).toBe(2)
      expect(index([1, 2, 3, 4, 5], 0)).toBe(null)
    })
  })

  describe('#append', () => {
    it('should append an item to the end of the collection', () => {
      expect(append([1, 2, 3, 4], 5)).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('#prepend', () => {
    it('should add an item to the beginning of the collection', () => {
      expect(prepend([2, 3, 4, 5], 1)).toEqual([1, 2, 3, 4, 5])
    })
  })

  describe('#insert', () => {
    it('should insert an item before the element with the given index of the collection', () => {
      expect(insert([1, 2, 4, 5], 2, 3)).toEqual([1, 2, 3, 4, 5])
      expect(insert([1, 2, 4, 5], 5, 3)).toEqual([1, 2, 4, 5, 3])
    })
  })

  describe('#partition', () => {
    testIterator(partition)

    it('should separate elements that pass a given truth test from those that do not', () => {
      expect(partition([1, 2, 3, 4, 5], (value, index) => index < 2 && value < 3)).toEqual([[1, 2], [3, 4, 5]])
    })
  })

  describe('#flip', () => {
    it('should swap keys with their corresponding values', () => {
      expect(flip(['a', 'b', 'c'])).toEqual({ a: 0, b: 1, c: 2 })
    })
  })

  describe('#freeze', () => {
    it('should freeze the collection', () => {
      const array: never[] = []

      expect(Object.isFrozen(array)).toEqual(false)

      freeze(array)

      expect(Object.isFrozen(array)).toEqual(true)
    })
  })

  describe('#isFrozen', () => {
    it('should return the collection is forzen or not', () => {
      const array: never[] = []

      expect(isFrozen(array)).toEqual(false)

      Object.freeze(array)

      expect(isFrozen(array)).toEqual(true)
    })
  })
})
