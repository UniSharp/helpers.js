import { Optional } from '../../src/helpers'
import {
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
  filter,
  reject,
  only,
  except,
  isEmpty,
  isNotEmpty,
  first,
  last,
  map,
  mapWithKeys,
  flatMap,
  flatten,
  min,
  max,
  pipe,
  pluck,
  swap,
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
  index,
  append,
  prepend,
  insert,
  join,
  partition,
  flip,
  fill,
  freeze,
  isFrozen,
  reverse
} from '../../src/collection/object'

function testIterator (method: Function, callback?: Optional<(value: any) => any>): void {
  it('should iterate correct key, value and index', () => {
    let count: number = 0
    const object: { [key: string]: number } = { a: 1, b: 2, c: 3 }
    const keys: string[] = ['a', 'b', 'c']
    const values: number[] = [1, 2, 3]

    method(object, (value: number, key: string, index: number, items: { [key: string]: number }) => {
      expect(value).toBe(values[count])
      expect(key).toBe(keys[count])
      expect(index).toBe(count++)
      expect(items).toEqual(object)

      if (callback) {
        return callback(value)
      }

      return true
    })

    expect(count).toBe(3)
  })
}

describe('Collection', () => {
  describe('#keys()', () => {
    it('should return the keys', () => {
      expect(keys({ a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c'])
    })
  })

  describe('#values()', () => {
    it('should return the values', () => {
      expect(values({ a: 1, b: 2, c: 3 })).toEqual([1, 2, 3])
    })
  })

  describe('#contains()', () => {
    it('should determines whether the object contains a given item', () => {
      expect(contains({ a: 1, b: 2, c: 3 }, 3)).toBe(true)
      expect(contains({ a: 1, b: 2, c: 3 }, 4)).toBe(false)
    })
  })

  describe('#count()', () => {
    it('should return the total number', () => {
      expect(count({ a: 1, b: 2, c: 3 })).toBe(3)
    })
  })

  describe('#has()', () => {
    it('should determines if a given key exists', () => {
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
      expect(get({ a: 1, b: 2, c: 3 }, 'a')).toBe(1)
      expect(get({ a: { b: { c: 1 } } }, 'a.b.c')).toBe(1)
      expect(get({ a: { b: { c: [1, 2, 3] } } }, 'a.b.c.0')).toBe(1)
      expect(get({ a: { b: { c: [1, 2, 3] } } }, 'a.b.c[0]')).toBe(1)

      expect(get({ a: 1, b: 2, c: 3 }, ['a'])).toBe(1)
      expect(get({ a: { b: { c: 1 } } }, ['a', 'b', 'c'])).toBe(1)
      expect(get({ a: { b: { c: [1, 2, 3] } } }, ['a', 'b', 'c', 0])).toBe(1)
    })

    it('should return the default value if given key is not exists', () => {
      expect(get({ a: 1, b: 2, c: 3 }, 'd', 4)).toBe(4)
    })

    it('should return the collection if has no given key', () => {
      expect(get({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 })
    })
  })

  describe('#set()', () => {
    it('should set the value at a given key', () => {
      expect(set({ a: 0, b: 2, c: 3 }, 'a', 1)).toEqual({ a: 1, b: 2, c: 3 })
      expect(set({ a: { b: { c: 0 } } }, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } })
      expect(set({ a: { b: { c: [0, 2, 3] } } }, 'a.b.c.0', 1)).toEqual({ a: { b: { c: [1, 2, 3] } } })
      expect(set({ a: { b: { c: [0, 2, 3] } } }, 'a.b.c[0]', 1)).toEqual({ a: { b: { c: [1, 2, 3] } } })

      expect(set({ a: 0, b: 2, c: 3 }, ['a'], 1)).toEqual({ a: 1, b: 2, c: 3 })
      expect(set({ a: { b: { c: 0 } } }, ['a', 'b', 'c'], 1)).toEqual({ a: { b: { c: 1 } } })
      expect(set({ a: { b: { c: [0, 2, 3] } } }, ['a', 'b', 'c', 0], 1)).toEqual({ a: { b: { c: [1, 2, 3] } } })

      expect(set({}, 'a.b.c[0]', 1)).toEqual({ a: { b: { c: [1] } } })
      expect(set({}, ['a', 'b', 'c', 0], 1)).toEqual({ a: { b: { c: [1] } } })
    })
  })

  describe('#sum()', () => {
    it('should return the sum', () => {
      expect(sum({ a: 1, b: 2, c: 3 })).toBe(6)
    })

    it('should return the sum of string items', () => {
      expect(sum({ a: '1', b: '2', c: '3' })).toBe(6)
    })

    it('should return the sum of a given key', () => {
      expect(sum({ a: { a: 1, b: 1 }, b: { a: 2, b: 2 }, c: { a: 3, b: 3 } })).toBe(0)
      expect(sum({ a: { a: 1, b: 1 }, b: { a: 2, b: 2 }, c: { a: 3, b: 3 } }, 'a')).toBe(6)
    })
  })

  describe('#avg()', () => {
    it('should return null if is empty', () => {
      expect(avg({})).toBe(null)
    })

    it('should return the average value', () => {
      expect(avg({ a: 1, b: 2, c: 3 })).toBe(2)
    })

    it('should return the average value of a given key', () => {
      expect(avg({ a: { a: 1, b: 1 }, b: { a: 2, b: 2 }, c: { a: 3, b: 3 } })).toBe(0)
      expect(avg({ a: { a: 1, b: 1 }, b: { a: 2, b: 2 }, c: { a: 3, b: 3 } }, 'a')).toBe(2)
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
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 })).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 })
    })

    it('should slice of items with positive begin', () => {
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 2)).toEqual({ c: 3, d: 4, e: 5 })
    })

    it('should slice of items with negative begin', () => {
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, -2)).toEqual({ d: 4, e: 5 })
    })

    it('should slice of items with begin and end', () => {
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 2, 4)).toEqual({ c: 3, d: 4 })
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 2, -2)).toEqual({ c: 3 })
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, -3, 4)).toEqual({ c: 3, d: 4 })
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, -3, -2)).toEqual({ c: 3 })
    })

    it('should slice of items with begin and end but not enough items', () => {
      expect(slice({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 4, 6)).toEqual({ e: 5 })
    })
  })

  describe('#reduce()', () => {
    it('should iterate over the items and reduce to a single value', () => {
      expect(
        reduce({ a: 1, b: 2, c: 3 }, (carry, value) => [...carry, value], <number[]>[])
      ).toEqual([1, 2, 3])
      expect(
        reduce({ a: 1, b: 2, c: 3 }, (carry, value, key, index) => `${carry} - ${index} - ${key} - ${value}`, 'x')
      ).toBe('x - 0 - a - 1 - 1 - b - 2 - 2 - c - 3')
    })
  })

  describe('#toArray()', () => {
    it('should covert items to array', () => {
      expect(toArray({ a: 1, b: 2, c: 3, d: 4, e: 5 })).toEqual([1, 2, 3, 4, 5])
      expect(toArray({ a: { a: 1, b: 2 }, b: { c: 3, d: 4 }, c: { e: 5 } })).toEqual([[1, 2], [3, 4], [5]])
    })
  })

  describe('#chunk()', () => {
    it('should chunk into multiple array of a given size', () => {
      expect(chunk({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 2)).toEqual([{ a: 1, b: 2 }, { c: 3, d: 4 }, { e: 5 }])
    })
  })

  describe('#pipe', () => {
    it('should pass the items to the given callback and return the result', () => {
      expect(pipe({ a: 1, b: 2, c: 3 }, items => ({ ...items, b: 4 }))).toEqual({ a: 1, c: 3, b: 4 })
    })
  })

  describe('#filter', () => {
    testIterator(filter)

    it('should filter the items using the given callback', () => {
      expect(filter({ a: 1, b: 2, c: 3 }, value => value > 1)).toEqual({ b: 2, c: 3 })
      expect(filter({ a: 1, b: 2, c: 3 }, (_, key, index) => key === 'b' && index === 1)).toEqual({ b: 2 })
    })
  })

  describe('#reject', () => {
    testIterator(reject)

    it('should reject the items using the given callback', () => {
      expect(reject({ a: 1, b: 2, c: 3 }, value => value > 1)).toEqual({ a: 1 })
      expect(reject({ a: 1, b: 2, c: 3 }, (_, key, index) => key === 'b' && index === 1)).toEqual({ a: 1, c: 3 })
    })
  })

  describe('#only', () => {
    it('should return the items with the specified keys', () => {
      expect(only({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ a: 1, b: 2 })
      expect(only({ a: 1, b: 2, c: 3 }, 'a', 'b')).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#except', () => {
    it('should return the items except for those with the specified keys', () => {
      expect(except({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ c: 3 })
      expect(except({ a: 1, b: 2, c: 3 }, 'a', 'b')).toEqual({ c: 3 })
    })
  })

  describe('#isEmpty()', () => {
    it('should return true if is empty', () => {
      expect(isEmpty({})).toBe(true)
      expect(isEmpty({ a: 1, b: 2, c: 3 })).toBe(false)
    })
  })

  describe('#isNotEmpty()', () => {
    it('should return true if is not empty', () => {
      expect(isNotEmpty({ a: 1, b: 2, c: 3 })).toBe(true)
      expect(isNotEmpty({})).toBe(false)
    })
  })

  describe('#first()', () => {
    testIterator(first, () => false)

    it('should return the first element', () => {
      expect(first({ a: 1, b: 2, c: 3 })).toBe(1)
    })

    it('should return null if array is empty', () => {
      expect(first({})).toBe(null)
    })

    it('should return the first element which passes a given truth test', () => {
      expect(first({ a: 1, b: 2, c: 3 }, n => n > 1)).toBe(2)
    })
  })

  describe('#last()', () => {
    testIterator(last)

    it('should return the last element', () => {
      expect(last({ a: 1, b: 2, c: 3 })).toBe(3)
    })

    it('should return null if array is empty', () => {
      expect(last({})).toBe(null)
    })

    it('should return the last element which passes a given truth test', () => {
      expect(last({ a: 1, b: 2, c: 3 }, n => n < 3)).toBe(2)
    })
  })

  describe('#map()', () => {
    testIterator(map)

    it('should iterate over the items and replace value from callback', () => {
      expect(map({ a: 1, b: 2, c: 3 }, (value, key, index) => `${index} - ${key} - ${value}`))
        .toEqual({ a: '0 - a - 1', b: '1 - b - 2', c: '2 - c - 3' })
    })
  })

  describe('#mapWithKeys()', () => {
    testIterator(mapWithKeys, () => ({ foo: 'bar' }))

    it('should iterate over the items and replace key and value from callback', () => {
      expect(mapWithKeys({ a: 1, b: 2 }, (value, key, index) => ({ [`${index} - ${key}`]: `${index} - ${key} - ${value}` })))
        .toEqual({ '0 - a': '0 - a - 1', '1 - b': '1 - b - 2' })
    })
  })

  describe('#flatMap', () => {
    testIterator(flatMap)

    it('should iterates through the collection and passes each value to the given closure', () => {
      expect(flatMap({ a: 1, b: 2, c: 3 }, (value, key, index) => ({ [key]: `${index} - ${key} - ${value}` })))
        .toEqual({ a: '0 - a - 1', b: '1 - b - 2', c: '2 - c - 3' })
      expect(flatMap({ a: 1, b: 2 }, (value, key, index) => ({ [key]: value, [index.toString()]: value + 1 })))
        .toEqual({ a: 1, 0: 2, b: 2, 1: 3 })
    })
  })

  describe('#flatten()', () => {
    it('should flatten a multi dimensional object into signle dimension', () => {
      expect(flatten({ a: { a: 1, b: 2 }, b: { c: 3, d: 4 }, c: { e: 5 } })).toEqual([1, 2, 3, 4, 5])
    })

    it('should flatten a multi dimensional object into specified depth dimension', () => {
      expect(flatten({ a: { a: [1], b: [2] }, b: { c: [3], d: [4] }, c: { e: [5] } }, 1)).toEqual([[1], [2], [3], [4], [5]])
    })
  })

  describe('#min()', () => {
    it('should return the minimum value', () => {
      expect(min({ a: 1, b: 2, c: 3 })).toBe(1)
    })
  })

  describe('#max()', () => {
    it('should return the maximum value', () => {
      expect(max({ a: 1, b: 2, c: 3 })).toBe(3)
    })
  })

  describe('#pluck', () => {
    it('should retrive all of the values for a given key', () => {
      expect(pluck({ a: { a: 1, b: 2 }, b: { a: 1, b: 2 } }, 'a')).toEqual([1, 1])
      expect(pluck({ a: { a: 1, b: 'a' }, b: { a: 2, b: 'b' } }, 'a', 'b')).toEqual({ a: 1, b: 2 })
      expect(pluck(
        { a: { a: 1, b: 'a' }, b: { a: 2, b: 'b' } },
        'a',
        (row: { [key: string]: number | string }): string => row.b.toString()
      )).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#swap()', () => {
    it('should swap two value of given keys', () => {
      expect(swap({ a: 1, b: 2, c: 3 }, 'b', 'c')).toEqual({ a: 1, b: 3, c: 2 })
    })
  })

  describe('#take()', () => {
    it('should return a new collection with the specified number of items', () => {
      expect(take({ a: 1, b: 2, c: 3, d: 4, e: 5 }, 3)).toEqual({ a: 1, b: 2, c: 3 })
    })
  })

  describe('#unique()', () => {
    it('should return all of the unique items', () => {
      expect(unique({ a: 1, b: 2, c: 2 })).toEqual({ a: 1, b: 2 })
    })

    it('should return all of the unique items by the given key', () => {
      expect(unique({ a: { a: 1 }, b: { a: 2 }, c: { a: 2 } }, 'a')).toEqual({ a: { a: 1 }, b: { a: 2 } })
    })

    it('should return all of the unique items by the given callback', () => {
      expect(unique({ a: { a: 1 }, b: { a: 2 }, c: { a: 2 } }, ({ a }) => a)).toEqual({ a: { a: 1 }, b: { a: 2 } })
    })
  })

  describe('#diff()', () => {
    it('should computes the difference of collections', () => {
      expect(diff({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ c: 3 })
      expect(diff({ a: 1, b: 2, c: 3, d: 3 }, { a: 1, b: 2 })).toEqual({ c: 3, d: 3 })
      expect(diff({ a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ c: 3 })
    })
  })

  describe('#diffKeys()', () => {
    it('should computes the difference of collections using keys for comparison', () => {
      expect(diffKeys({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ c: 3 })
      expect(diffKeys({ a: 1, b: 2, c: 3, d: 3 }, { a: 1, b: 2 })).toEqual({ c: 3, d: 3 })
    })

    it('should computes the difference of collections using keys for comparison if key contains dot', () => {
      expect(diffKeys({ a: 1, 'a.b': 2, 'a.b.c': 3 }, { a: 1, 'a.b.c': 3 })).toEqual({ 'a.b': 2 })
    })
  })

  describe('#intersect()', () => {
    it('should computes the intersection of collections', () => {
      expect(intersect({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
      expect(intersect({ a: 1, b: 2, c: 2, d: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2, c: 2 })
      expect(intersect({ a: 1, b: 2, c: 3 }, [1, 2])).toEqual({ a: 1, b: 2 })
    })
  })

  describe('#intersectByKeys()', () => {
    it('should computes the intersection of collections using keys for comparison', () => {
      expect(intersectByKeys({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
      expect(intersectByKeys({ a: 1, b: 2, c: 2, d: 3 }, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 })
    })

    it('should computes the intersection of collections using keys for comparison if key contains dot', () => {
      expect(intersectByKeys({ a: 1, 'a.b': 2, 'a.b.c': 3 }, { a: 1, 'a.b.c': 3 })).toEqual({ a: 1, 'a.b.c': 3 })
    })
  })

  describe('#merge()', () => {
    it('should merge collections', () => {
      expect(merge({ a: 1, b: 2, c: 3 }, { d: 4, e: 5 })).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 })
      expect(merge({ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 })).toEqual({ a: 4, b: 5, c: 6 })
    })

    it('should merge more than one collections', () => {
      expect(merge({ a: 1, b: 2, c: 3 }, { d: 4, e: 5 }, { f: 6, g: 7 })).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 })
    })
  })

  describe('#keyBy', () => {
    it('should keys the collection by the given key', () => {
      expect(keyBy({ a: { a: 1, b: 'c' }, b: { a: 2, b: 'd' } }, 'b')).toEqual({ c: { a: 1, b: 'c' }, d: { a: 2, b: 'd' } })
    })

    it('should keys the collection by the given callback', () => {
      expect(keyBy(
        { a: { a: 1, b: 'c' }, b: { a: 2, b: 'd' } },
        (row: { [key: string]: number | string }): string => row.b.toString()
      )).toEqual({ c: { a: 1, b: 'c' }, d: { a: 2, b: 'd' } })
    })
  })

  describe('#groupBy', () => {
    it('should groups the collection by the given key', () => {
      expect(groupBy({ a: { a: 'a' }, b: { a: 'b' } }, 'a')).toEqual({ a: { a: { a: 'a' } }, b: { b: { a: 'b' } } })
    })

    it('should groups the collection by the given callback', () => {
      expect(groupBy(
        { a: { a: 'a' }, b: { a: 'b' } },
        (row: { [key: string]: string }): string => row.a
      )).toEqual({ a: { a: { a: 'a' } }, b: { b: { a: 'b' } } })
    })

    it('should groups the collection by array value', () => {
      expect(groupBy({ a: { a: ['a'] }, b: { a: ['a', 'b'] } }, 'a'))
        .toEqual({ a: { a: { a: ['a'] }, b: { a: ['a', 'b'] } }, b: { b: { a: ['a', 'b'] } } })
    })
  })

  describe('#sort', () => {
    it('should sort the collection', () => {
      expect(JSON.stringify(sort({ a: 5, b: 4, c: 3 }))).toBe(JSON.stringify({ c: 3, b: 4, a: 5 }))
      expect(JSON.stringify(sort({ a: [5, 4], b: [5, 3] }))).toBe(JSON.stringify({ b: [5, 3], a: [5, 4] }))
      expect(JSON.stringify(sort({ a: { a: 5, b: 4 }, b: { a: 5, b: 3 } }))).toBe(JSON.stringify({ b: { a: 5, b: 3 }, a: { a: 5, b: 4 } }))
    })

    it('should sort the collection using the given callback', () => {
      expect(JSON.stringify(sort({ a: 1, b: 2, c: 3 }, (a, b) => b - a))).toBe(JSON.stringify({ c: 3, b: 2, a: 1 }))
      expect(JSON.stringify(sort({ a: [1, 2], b: [3, 4] }, (a, b) => b[0] - a[0]))).toBe(JSON.stringify({ b: [3, 4], a: [1, 2] }))
      expect(JSON.stringify(sort({ a: { a: 1, b: 2 }, b: { a: 3, b: 4 } }, (a, b) => b.a - a.a))).toBe(JSON.stringify({ b: { a: 3, b: 4 }, a: { a: 1, b: 2 } }))
    })

    it('should sort the collection which contains string', () => {
      expect(JSON.stringify(sort({ a: 'c', b: 'b', c: 'a' }))).toBe(JSON.stringify({ c: 'a', b: 'b', a: 'c' }))
    })
  })

  describe('#sortDesc', () => {
    it('should sort the collection', () => {
      expect(JSON.stringify(sortDesc({ a: 1, b: 2, c: 3 }))).toBe(JSON.stringify({ c: 3, b: 2, a: 1 }))
      expect(JSON.stringify(sortDesc({ a: [1, 2], b: [3, 4] }))).toBe(JSON.stringify({ b: [3, 4], a: [1, 2] }))
      expect(JSON.stringify(sortDesc({ a: { a: 1, b: 2 }, b: { a: 3, b: 4 } }))).toBe(JSON.stringify({ b: { a: 3, b: 4 }, a: { a: 1, b: 2 } }))
    })

    it('should sort the collection which contains string', () => {
      expect(JSON.stringify(sortDesc({ a: 'a', b: 'b', c: 'c' }))).toBe(JSON.stringify({ c: 'c', b: 'b', a: 'a' }))
    })
  })

  describe('#sortBy', () => {
    it('should sort the collection by the given key', () => {
      expect(JSON.stringify(sortBy({ a: { a: 1, b: 4 }, b: { a: 2, b: 3 } }, 'b'))).toBe(JSON.stringify({ b: { a: 2, b: 3 }, a: { a: 1, b: 4 } }))
    })

    it('should sort the collection using the given callback', () => {
      expect(JSON.stringify(sortBy({ a: { a: 1, b: 4 }, b: { a: 2, b: 3 } }, item => item.b))).toBe(JSON.stringify({ b: { a: 2, b: 3 }, a: { a: 1, b: 4 } }))
    })
  })

  describe('#sortByDesc', () => {
    it('should sort the collection by the given key', () => {
      expect(JSON.stringify(sortByDesc({ a: { a: 2, b: 3 }, b: { a: 1, b: 4 } }, 'b'))).toBe(JSON.stringify({ b: { a: 1, b: 4 }, a: { a: 2, b: 3 } }))
    })

    it('should sort the collection using the given callback', () => {
      expect(JSON.stringify(sortByDesc({ a: { a: 2, b: 3 }, b: { a: 1, b: 4 } }, item => item.b))).toBe(JSON.stringify({ b: { a: 1, b: 4 }, a: { a: 2, b: 3 } }))
    })
  })

  describe('#index', () => {
    it('should return the index of the first item in collection', () => {
      expect(index({ a: 1, b: 2, c: 3 }, 2)).toBe('b')
      expect(index({ a: 1, b: 2, c: 3 }, 0)).toBe(null)
    })
  })

  describe('#append', () => {
    it('should appends an item to the end of the collection', () => {
      expect(JSON.stringify(append({ a: 1, b: 2 }, 3, 'c'))).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }))
    })
  })

  describe('#prepend', () => {
    it('should adds an item to the beginning of the collection', () => {
      expect(JSON.stringify(prepend({ b: 2, c: 3 }, 1, 'a'))).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }))
    })
  })

  describe('#insert', () => {
    it('should insert an item before the element with the given index of the collection', () => {
      expect(JSON.stringify(insert({ a: 1, c: 3 }, 'c', 2, 'b'))).toBe(JSON.stringify({ a: 1, b: 2, c: 3 }))
      expect(JSON.stringify(insert({ a: 1, c: 3 }, 'e', 2, 'b'))).toBe(JSON.stringify({ a: 1, c: 3, b: 2 }))
    })
  })

  describe('#join', () => {
    it('should join the items in a collection', () => {
      expect(join({ a: 1, b: 2, c: 3 })).toBe('1,2,3')
    })

    it('should join the items in a collection with a given glue', () => {
      expect(join({ a: 1, b: 2, c: 3 }, '-')).toBe('1-2-3')
    })
  })

  describe('#partition', () => {
    testIterator(partition)

    it('should separate elements that pass a given truth test from those that do not', () => {
      expect(partition({ a: 1, b: 2, c: 3 }, (value, key) => key === 'a' && value === 1)).toEqual([{ a: 1 }, { b: 2, c: 3 }])
    })
  })

  describe('#flip', () => {
    it('should swap keys with their corresponding values', () => {
      expect(flip({ a: 0, b: 1, c: 2 })).toEqual({ 0: 'a', 1: 'b', 2: 'c' })
    })
  })

  describe('#fill', () => {
    it('should fill all elements with a given value', () => {
      expect(fill({ a: 0, b: 1, c: 2 }, 3)).toEqual({ a: 3, b: 3, c: 3 })
      expect(fill({ a: 0, b: 1, c: 2 }, 3, 1)).toEqual({ a: 0, b: 3, c: 3 })
      expect(fill({ a: 0, b: 1, c: 2 }, 3, 1, 2)).toEqual({ a: 0, b: 3, c: 2 })
    })
  })

  describe('#freeze', () => {
    it('should freeze the collection', () => {
      const object: {} = {}

      expect(Object.isFrozen(object)).toEqual(false)

      freeze(object)

      expect(Object.isFrozen(object)).toEqual(true)
    })
  })

  describe('#isFrozen', () => {
    it('should return the collection is forzen or not', () => {
      const object: {} = {}

      expect(isFrozen(object)).toEqual(false)

      Object.freeze(object)

      expect(isFrozen(object)).toEqual(true)
    })
  })

  describe('#reverse', () => {
    it('should reverses the order of the items and preserving the original keys', () => {
      expect(JSON.stringify(reverse({ a: 1, b: 2, c: 3 }))).toBe(JSON.stringify({ c: 3, b: 2, a: 1 }))
    })
  })
})
