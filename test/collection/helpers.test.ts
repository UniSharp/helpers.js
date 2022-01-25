import { call } from '../../src/collection/helpers'

describe('Collection Helpers', () => {
  describe('#collectionCall()', () => {
    it('accept only array or object', () => {
      expect(call('slice', 'Hello World')).toBe('Hello World')
    })

    it('run own method first', () => {
      const Foo = class {
        count (): number {
          return 10
        }
      }

      expect(call('count', new Foo())).toBe(10)
      expect(call('count', { count: () => 10 })).toBe(10)
      expect(call('count', { foo: 'foo' })).toBe(1)
    })
  })
})
