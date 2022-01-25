import { spaceship } from '../src/helpers'

describe('Helpers', () => {
  it('#spaceship()', () => {
    expect(spaceship(1, 2)).toBe(-1)
    expect(spaceship(2, 1)).toBe(1)
    expect(spaceship(1, 1)).toBe(0)
  })
})
