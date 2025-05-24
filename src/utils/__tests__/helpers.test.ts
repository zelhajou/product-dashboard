import { describe, it, expect } from 'vitest'
import { formatters, productHelpers } from '../helpers'
import { createMockProduct } from '@/test/utils'

describe('formatters', () => {
  describe('currency', () => {
    it('should format number as USD currency', () => {
      expect(formatters.currency(99.99)).toBe('$99.99')
    })

    it('should handle whole numbers', () => {
      expect(formatters.currency(100)).toBe('$100.00')
    })

    it('should handle large numbers with commas', () => {
      expect(formatters.currency(1000)).toBe('$1,000.00')
    })

    it('should handle zero', () => {
      expect(formatters.currency(0)).toBe('$0.00')
    })

    it('should handle negative numbers', () => {
      expect(formatters.currency(-50.25)).toBe('-$50.25')
    })
  })

  describe('number', () => {
    it('should format numbers with commas', () => {
      expect(formatters.number(1000)).toBe('1,000')
      expect(formatters.number(1234567)).toBe('1,234,567')
    })

    it('should handle small numbers without commas', () => {
      expect(formatters.number(100)).toBe('100')
      expect(formatters.number(0)).toBe('0')
    })
  })
})

describe('productHelpers', () => {
  describe('getStockStatus', () => {
    it('should return "out" status for zero stock', () => {
      const status = productHelpers.getStockStatus(0)
      expect(status.status).toBe('out')
      expect(status.label).toBe('Out of Stock')
      expect(status.color).toContain('red')
    })

    it('should return "low" status for critical stock (1-5)', () => {
      const status = productHelpers.getStockStatus(3)
      expect(status.status).toBe('low')
      expect(status.label).toBe('Critical Stock')
      expect(status.color).toContain('red')
    })

    it('should return "high" status for good stock', () => {
      const status = productHelpers.getStockStatus(25)
      expect(status.status).toBe('high')
      expect(status.label).toBe('In Stock')
      expect(status.color).toContain('green')
    })
  })

  describe('calculateInventoryValue', () => {
    it('should calculate total value correctly', () => {
      const products = [
        createMockProduct({ price: 100, stock: 5 }),
        createMockProduct({ price: 50, stock: 10 }),
      ]
      
      const totalValue = productHelpers.calculateInventoryValue(products)
      expect(totalValue).toBe(1000) // (100 * 5) + (50 * 10) = 500 + 500
    })

    it('should return 0 for empty array', () => {
      expect(productHelpers.calculateInventoryValue([])).toBe(0)
    })

    it('should handle zero stock products', () => {
      const products = [
        createMockProduct({ price: 100, stock: 0 }),
        createMockProduct({ price: 50, stock: 5 }),
      ]
      
      const totalValue = productHelpers.calculateInventoryValue(products)
      expect(totalValue).toBe(250) // (100 * 0) + (50 * 5) = 0 + 250
    })
  })
})