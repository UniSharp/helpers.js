import { call } from '../../src/collection/helpers'

describe('Collection Helpers', () => {
  describe('#collectionCall()', () => {
    it('accept only array or object', () => {
      expect(call(global)('slice', 'Hello World')).toBe('Hello World')
    })

    it('run own method first', () => {
      const Foo = class {
        join (): string {
          return 'join'
        }
      }

      expect(call(global)('join', new Foo())).toBe('join')
      expect(call(global)('join', { join: () => 'nioj' })).toBe('nioj')
      expect(call(global)('join', { foo: 'foo', bar: 'bar' })).toBe('foo,bar')
      expect(call(global)('join', ['foo', 'bar'])).toBe('foo,bar')
    })
  })
})
