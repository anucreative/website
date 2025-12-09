import { describe, test, expect } from 'vitest'
import { getThemeFromCompany } from './theme-selector'

describe('theme-selector', () => {
  describe('getThemeFromCompany', () => {
    const expectations: Array<[string | undefined, 'alan' | 'default']> = [
      ['alan', 'alan'],
      [undefined, 'default'],
      ['', 'default'],
      ['null', 'default'],
      ['Alan', 'default'],
      ['google', 'default'],
      ['microsoft', 'default'],
      ['apple', 'default'],
      [' alan', 'default'],
      ['alan ', 'default'],
    ]

    test.each(expectations)('should return "%s" when company param is %s', (input, expected) => {
      expect(getThemeFromCompany(input)).toBe(expected)
    })
  })
})
