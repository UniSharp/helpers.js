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
      expect(' A:B/C.D??E=F&G#H '.slugify()).toBe('a-b-c-d-e-f-g-h')
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

  describe('#studly()', () => {
    it('should convert the given string to studly case', () => {
      expect('foo bar baz'.studly()).toBe('FooBarBaz')
      expect('foo-bar-baz'.studly()).toBe('FooBarBaz')
      expect('foo_bar_baz'.studly()).toBe('FooBarBaz')
      expect('Foo_Bar_Baz'.studly()).toBe('FooBarBaz')
      expect('   foo   bar   baz   '.studly()).toBe('FooBarBaz')
      expect('___foo___bar___baz___'.studly()).toBe('FooBarBaz')
      expect(' foo -_- bar -_- baz '.studly()).toBe('FooBarBaz')
    })
  })

  describe('#camel()', () => {
    it('should convert the given string to camel case', () => {
      expect('foo bar baz'.camel()).toBe('fooBarBaz')
      expect('foo-bar-baz'.camel()).toBe('fooBarBaz')
      expect('foo_bar_baz'.camel()).toBe('fooBarBaz')
      expect('Foo_Bar_Baz'.camel()).toBe('fooBarBaz')
      expect('   foo   bar   baz   '.camel()).toBe('fooBarBaz')
      expect('___foo___bar___baz___'.camel()).toBe('fooBarBaz')
      expect(' foo -_- bar -_- baz '.camel()).toBe('fooBarBaz')
    })
  })

  describe('#snake()', () => {
    it('should convert the given string to snake case', () => {
      expect('fooBarBaz'.snake()).toBe('foo_bar_baz')
      expect('FooBarBaz'.snake()).toBe('foo_bar_baz')
      expect('foo bar baz'.snake()).toBe('foo_bar_baz')
      expect('foo_bar_baz'.snake()).toBe('foo_bar_baz')
      expect('Foo_Bar_Baz'.snake()).toBe('foo_bar_baz')
      expect('___foo___bar___baz___'.snake()).toBe('foo_bar_baz')
      expect('   foo   bar   baz   '.snake()).toBe('foo_bar_baz')
      expect(' foo -_- bar -_- baz '.snake()).toBe('foo_bar_baz')
    })
  })

  describe('#kebab()', () => {
    it('should convert the given string to kebab case', () => {
      expect('fooBarBaz'.kebab()).toBe('foo-bar-baz')
      expect('FooBarBaz'.kebab()).toBe('foo-bar-baz')
      expect('foo bar baz'.kebab()).toBe('foo-bar-baz')
      expect('foo_bar_baz'.kebab()).toBe('foo-bar-baz')
      expect('Foo_Bar_Baz'.kebab()).toBe('foo-bar-baz')
      expect('___foo___bar___baz___'.kebab()).toBe('foo-bar-baz')
      expect('   foo   bar   baz   '.kebab()).toBe('foo-bar-baz')
      expect(' foo -_- bar -_- baz '.kebab()).toBe('foo-bar-baz')
    })
  })

  describe('#title()', () => {
    it('should convert the given string to title string', () => {
      expect('fooBarBaz'.title()).toBe('Foo Bar Baz')
      expect('FooBarBaz'.title()).toBe('Foo Bar Baz')
      expect('foo bar baz'.title()).toBe('Foo Bar Baz')
      expect('foo_bar_baz'.title()).toBe('Foo Bar Baz')
      expect('Foo_Bar_Baz'.title()).toBe('Foo Bar Baz')
      expect('___foo___bar___baz___'.title()).toBe('Foo Bar Baz')
      expect('   foo   bar   baz   '.title()).toBe('Foo Bar Baz')
      expect(' foo -_- bar -_- baz '.title()).toBe('Foo Bar Baz')
    })
  })

  describe('#ucfirst()', () => {
    it('should convert first character of the given string to uppercase', () => {
      expect('foo'.ucfirst()).toBe('Foo')
      expect('fOo'.ucfirst()).toBe('FOo')
      expect('foO'.ucfirst()).toBe('FoO')
    })
  })

  describe('#lcfirst()', () => {
    it('should convert first character of the given string to lowercase', () => {
      expect('Foo'.lcfirst()).toBe('foo')
      expect('FOo'.lcfirst()).toBe('fOo')
      expect('FoO'.lcfirst()).toBe('foO')
    })
  })
})
