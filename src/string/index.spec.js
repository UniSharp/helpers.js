import { Helpers } from '../'

Helpers.init()

describe('String', () => {
  describe('#random()', () => {
    it('should generates a random string with default length', () => {
      expect(String.random().length).toBe(16)
    })

    it('should generates a random string with specify length', () => {
      expect(String.random(10).length).toBe(10)
      expect(String.random(20).length).toBe(20)
      expect(String.random(30).length).toBe(30)
    })
  })

  describe('#slugify()', () => {
    it('should slugify a string', () => {
      expect(' A:B/C.D??E=F&G '.slugify()).toBe('a-b-c-d-e-f-g')
    })
  })

  describe('#stripTags()', () => {
    it('should strip tags', () => {
      expect('<h1>Hello World</h1>'.stripTags()).toBe('Hello World')
      expect('<H1>Hello World</H1>'.stripTags()).toBe('Hello World')
      expect('<h1 class="h1">Hello World</h1>'.stripTags()).toBe('Hello World')
      expect('<h1 class="h1">Hello < World ></h1>'.stripTags()).toBe('Hello < World >')
    })
  })

  describe('#limit()', () => {
    it('should truncate the given string at the specified length', () => {
      expect('Hello World'.limit(5)).toBe('Hello...')
      expect('您好世界您好世界'.limit(4)).toBe('您好世界...')
    })

    it('should truncate the given string with specify suffix', () => {
      expect('Hello World'.limit(5, '***')).toBe('Hello***')
      expect('您好世界您好世界'.limit(4, '***')).toBe('您好世界***')
    })
  })

  describe('#nl2br()', () => {
    it('should nl2br a string', () => {
      expect('a\nb\nc'.nl2br()).toBe('a<br>b<br>c')
      expect('a\rb\rc'.nl2br()).toBe('a<br>b<br>c')
      expect('a\n\rb\n\rc'.nl2br()).toBe('a<br>b<br>c')
      expect('a\r\nb\r\nc'.nl2br()).toBe('a<br>b<br>c')
    })
  })
})
