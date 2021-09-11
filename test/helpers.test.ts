import { callCollectionMethod } from '../src/helpers'

describe('Helpers', () => {
  describe('#collectionCall()', () => {
    it('accept only array or object', () => {
      expect(callCollectionMethod('slice', 'Hello World')).toBe('Hello World')
    })

    it('run own method first', () => {
      const Foo = class {
        count (): number {
          return 10
        }
      }

      expect(callCollectionMethod('count', new Foo())).toBe(10)
      expect(callCollectionMethod('count', { count: () => 10 })).toBe(10)
      expect(callCollectionMethod('count', ['foo'])).toBe(1)
      expect(callCollectionMethod('count', { foo: 'foo' })).toBe(1)
    })
  })
})
