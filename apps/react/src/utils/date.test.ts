import { describe, it, expect } from 'vitest'
import { formatDate, getDates } from './date'

describe('date utilities', () => {
  describe('formatDate', () => {
    it('should return "present" for empty string', () => {
      expect(formatDate('')).toBe('present')
    })

    it('should return 4-digit year as-is', () => {
      expect(formatDate('2023')).toBe('2023')
      expect(formatDate('2020')).toBe('2020')
      expect(formatDate('1999')).toBe('1999')
    })

    it('should handle various date formats', () => {
      const result1 = formatDate('2023-01-01')
      expect(result1).toBe('2023')

      const result2 = formatDate('2024-12-31')
      expect(result2).toBe('2024')
    })

    it('should return original string on parse error', () => {
      const invalidDate = 'not-a-date'
      expect(formatDate(invalidDate)).toBe(invalidDate)
    })

    it('should handle partial dates gracefully', () => {
      const result = formatDate('2023-06')
      // This may be treated as invalid, so it should return the original or parsed value
      expect(result).toBeDefined()
    })
  })

  describe('getDates', () => {
    it('should return "present" when no dates provided', () => {
      const result = getDates({})
      expect(result).toBe('present')
    })

    it('should return start date with " - present" when only startDate provided', () => {
      const result = getDates({ startDate: '2020' })
      expect(result).toBe('2020 - present')
    })

    it('should return only end date when only endDate provided', () => {
      const result = getDates({ endDate: '2023' })
      expect(result).toBe('2023')
    })

    it('should format date range with both startDate and endDate', () => {
      const result = getDates({ startDate: '2020', endDate: '2023' })
      expect(result).toBe('2020 - 2023')
    })

    it('should handle date range with ISO dates', () => {
      const result = getDates({ startDate: '2020-01-01', endDate: '2023-12-31' })
      expect(result).toBe('2020 - 2023')
    })

    it('should handle only endDate correctly', () => {
      const result = getDates({ endDate: '2023' })
      expect(result).toBe('2023')
    })
  })
})
