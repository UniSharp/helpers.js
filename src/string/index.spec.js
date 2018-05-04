import './'

describe('String', () => {
  describe('#slugify()', () => {
    it('should slugify a string', () => {
      expect(' A:B/C.D??E=F&G '.slugify()).toBe('a-b-c-d-e-f-g')
    })
  })
})
