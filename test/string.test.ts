import {
  random,
  slugify,
  stripTags,
  limit,
  nl2br,
  ucfirst,
  lcfirst,
  studly,
  camel,
  snake,
  kebab,
  title
} from '../src/string'

describe('String', () => {
  describe('#random()', () => {
    it('should generates a random string with default length', () => {
      expect(random().length).toBe(16)
    })

    it('should generates a random string with specify length', () => {
      expect(random(10).length).toBe(10)
      expect(random(20).length).toBe(20)
      expect(random(30).length).toBe(30)
    })
  })

  describe('#slugify()', () => {
    it('should slugify a string', () => {
      expect(slugify(' A:B/C.D??E=F&G#H ')).toBe('a-b-c-d-e-f-g-h')
    })
  })

  describe('#stripTags()', () => {
    it('should strip tags', () => {
      expect(stripTags('<h1>Hello World</h1>')).toBe('Hello World')
      expect(stripTags('<H1>Hello World</H1>')).toBe('Hello World')
      expect(stripTags('<h1 class="h1">Hello World</h1>')).toBe('Hello World')
      expect(stripTags('<h1 class="h1">Hello < World ></h1>')).toBe('Hello < World >')
    })
  })

  describe('#limit()', () => {
    it('should truncate the given string at the specified length', () => {
      expect(limit('Hello World', 5)).toBe('Hello...')
      expect(limit('您好世界您好世界', 4)).toBe('您好世界...')
    })

    it('should truncate the given string with specify suffix', () => {
      expect(limit('Hello World', 5, '***')).toBe('Hello***')
      expect(limit('您好世界您好世界', 4, '***')).toBe('您好世界***')
    })
  })

  describe('#nl2br()', () => {
    it('should nl2br a string', () => {
      expect(nl2br('a\nb\nc')).toBe('a<br>b<br>c')
      expect(nl2br('a\rb\rc')).toBe('a<br>b<br>c')
      expect(nl2br('a\n\rb\n\rc')).toBe('a<br>b<br>c')
      expect(nl2br('a\r\nb\r\nc')).toBe('a<br>b<br>c')
    })
  })

  describe('#studly()', () => {
    it('should convert the given string to studly case', () => {
      expect(studly('foo bar baz')).toBe('FooBarBaz')
      expect(studly('foo-bar-baz')).toBe('FooBarBaz')
      expect(studly('foo_bar_baz')).toBe('FooBarBaz')
      expect(studly('Foo_Bar_Baz')).toBe('FooBarBaz')
      expect(studly('   foo   bar   baz   ')).toBe('FooBarBaz')
      expect(studly('___foo___bar___baz___')).toBe('FooBarBaz')
      expect(studly(' foo -_- bar -_- baz ')).toBe('FooBarBaz')
    })
  })

  describe('#camel()', () => {
    it('should convert the given string to camel case', () => {
      expect(camel('foo bar baz')).toBe('fooBarBaz')
      expect(camel('foo-bar-baz')).toBe('fooBarBaz')
      expect(camel('foo_bar_baz')).toBe('fooBarBaz')
      expect(camel('Foo_Bar_Baz')).toBe('fooBarBaz')
      expect(camel('   foo   bar   baz   ')).toBe('fooBarBaz')
      expect(camel('___foo___bar___baz___')).toBe('fooBarBaz')
      expect(camel(' foo -_- bar -_- baz ')).toBe('fooBarBaz')
    })
  })

  describe('#snake()', () => {
    it('should convert the given string to snake case', () => {
      expect(snake('fooBarBaz')).toBe('foo_bar_baz')
      expect(snake('FooBarBaz')).toBe('foo_bar_baz')
      expect(snake('foo bar baz')).toBe('foo_bar_baz')
      expect(snake('foo_bar_baz')).toBe('foo_bar_baz')
      expect(snake('Foo_Bar_Baz')).toBe('foo_bar_baz')
      expect(snake('___foo___bar___baz___')).toBe('foo_bar_baz')
      expect(snake('   foo   bar   baz   ')).toBe('foo_bar_baz')
      expect(snake(' foo -_- bar -_- baz ')).toBe('foo_bar_baz')
    })
  })

  describe('#kebab()', () => {
    it('should convert the given string to kebab case', () => {
      expect(kebab('fooBarBaz')).toBe('foo-bar-baz')
      expect(kebab('FooBarBaz')).toBe('foo-bar-baz')
      expect(kebab('foo bar baz')).toBe('foo-bar-baz')
      expect(kebab('foo_bar_baz')).toBe('foo-bar-baz')
      expect(kebab('Foo_Bar_Baz')).toBe('foo-bar-baz')
      expect(kebab('___foo___bar___baz___')).toBe('foo-bar-baz')
      expect(kebab('   foo   bar   baz   ')).toBe('foo-bar-baz')
      expect(kebab(' foo -_- bar -_- baz ')).toBe('foo-bar-baz')
    })
  })

  describe('#title()', () => {
    it('should convert the given string to title string', () => {
      expect(title('fooBarBaz')).toBe('Foo Bar Baz')
      expect(title('FooBarBaz')).toBe('Foo Bar Baz')
      expect(title('foo bar baz')).toBe('Foo Bar Baz')
      expect(title('foo_bar_baz')).toBe('Foo Bar Baz')
      expect(title('Foo_Bar_Baz')).toBe('Foo Bar Baz')
      expect(title('___foo___bar___baz___')).toBe('Foo Bar Baz')
      expect(title('   foo   bar   baz   ')).toBe('Foo Bar Baz')
      expect(title(' foo -_- bar -_- baz ')).toBe('Foo Bar Baz')
    })
  })

  describe('#ucfirst()', () => {
    it('should convert first character of the given string to uppercase', () => {
      expect(ucfirst('foo')).toBe('Foo')
      expect(ucfirst('fOo')).toBe('FOo')
      expect(ucfirst('foO')).toBe('FoO')
    })
  })

  describe('#lcfirst()', () => {
    it('should convert first character of the given string to lowercase', () => {
      expect(lcfirst('Foo')).toBe('foo')
      expect(lcfirst('FOo')).toBe('fOo')
      expect(lcfirst('FoO')).toBe('foO')
    })
  })
})
