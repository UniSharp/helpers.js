import './'

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
})
