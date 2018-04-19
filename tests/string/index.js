const assert = require('assert')

describe('String', () => {
  describe('#slugify()', () => {
    it('should slugify a string', () => {
      assert.equal(' A:B/C.D??E=F&G '.slugify(), 'a-b-c-d-e-f-g')
    })
  })
})
