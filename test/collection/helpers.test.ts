import { call } from '../../src/collection/helpers'

describe('Collection Helpers', () => {
  describe('#collectionCall()', () => {
    it('accept only array or object', () => {
      expect(call('slice', 'Hello World')).toBe('Hello World')
    })

    it('run own method first', () => {
      const Foo = class {
        join (): string {
          return 'join'
        }
      }

      expect(call('join', new Foo())).toBe('join')
      expect(call('join', { join: () => 'nioj' })).toBe('nioj')
      expect(call('join', { foo: 'foo', bar: 'bar' })).toBe('foo,bar')
      expect(call('join', ['foo', 'bar'])).toBe('foo,bar')
    })
  })
})
