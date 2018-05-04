import './'

describe('Object', () => {
  describe('#isObject', () => {
    it('should determines whether the given item is object', () => {
      expect(Object.isObject({})).toBe(true)
      expect(Object.isObject([])).toBe(false)
    })
  })
})

