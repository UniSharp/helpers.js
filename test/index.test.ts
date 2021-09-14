import { Helpers } from '../src'
import { DateInterval } from '../src/date-interval'
import { callCollectionMethod } from '../src/helpers'

describe('Plugin', () => {
  describe('#init()', () => {
    beforeEach(() => Helpers.init({ global }))

    test('global DateInterval', () => {
      expect(global.DateInterval).toEqual(DateInterval)
    })

    test('UniSharp.Helpers.Collection.call', () => {
      expect(UniSharp.Helpers.Collection.call).toEqual(callCollectionMethod)
    })

    test('Number static method', () => {
      expect(Number.random()).toEqual(expect.any(Number))
    })

    test('Number method', () => {
      expect(1.234.round()).toEqual(1)
    })

    test('String static method', () => {
      expect(String.random()).toEqual(expect.any(String))
    })

    test('String method', () => {
      expect('Hello World'.slugify()).toEqual('hello-world')
    })
  })
})
