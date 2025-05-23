import { z } from "zod";
import { VALIDATION_LIMITS, STOCK_THRESHOLDS } from "@/shared/constants";

export const productValidation = {
  // Base field validators
  name: z
    .string()
    .min(1, "Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(
      VALIDATION_LIMITS.MAX_PRODUCT_NAME_LENGTH,
      `Product name must be less than ${VALIDATION_LIMITS.MAX_PRODUCT_NAME_LENGTH} characters`
    )
    .regex(
      /^[a-zA-Z0-9\s\-_&.()]+$/,
      "Product name contains invalid characters"
    ),

  price: z
    .number()
    .min(
      VALIDATION_LIMITS.MIN_PRICE,
      `Price must be greater than ${VALIDATION_LIMITS.MIN_PRICE}`
    )
    .max(
      VALIDATION_LIMITS.MAX_PRICE,
      `Price must be less than $${VALIDATION_LIMITS.MAX_PRICE.toLocaleString()}`
    )
    .refine(
      (val) => Number((val * 100).toFixed(0)) / 100 === val,
      "Price can only have up to 2 decimal places"
    ),

  stock: z
    .number()
    .int("Stock must be a whole number")
    .min(VALIDATION_LIMITS.MIN_STOCK, "Stock cannot be negative")
    .max(
      VALIDATION_LIMITS.MAX_STOCK,
      `Stock must be less than ${VALIDATION_LIMITS.MAX_STOCK.toLocaleString()}`
    ),

  category: z
    .string()
    .min(1, "Category is required")
    .max(VALIDATION_LIMITS.MAX_CATEGORY_LENGTH, "Category name is too long"),

  status: z.enum(["active", "archived"], {
    required_error: "Status is required",
    invalid_type_error: "Status must be either active or archived",
  }),
};

export const productSchema = z.object(productValidation);

export const partialProductSchema = productSchema.partial();

// Search and filter validation
export const searchValidation = {
  searchTerm: z.string().max(100, "Search term is too long").optional(),
  category: z.string().max(50).optional(),
  status: z.enum(["", "active", "archived"]).optional(),
};

export const filtersSchema = z.object(searchValidation);

// Custom validation helpers using shared constants
export const validationHelpers = {
  // Check if price is reasonable
  isPriceReasonable: (price: number): boolean => {
    return (
      price >= VALIDATION_LIMITS.MIN_PRICE &&
      price <= VALIDATION_LIMITS.MAX_PRICE
    );
  },

  // Check if stock level is concerning
  isStockLow: (
    stock: number,
    threshold: number = STOCK_THRESHOLDS.LOW_STOCK
  ): boolean => {
    return stock <= threshold && stock > 0;
  },

  // Check if stock is critical
  isStockCritical: (stock: number): boolean => {
    return stock <= STOCK_THRESHOLDS.CRITICAL_STOCK && stock > 0;
  },

  // Check if out of stock
  isOutOfStock: (stock: number): boolean => {
    return stock === STOCK_THRESHOLDS.OUT_OF_STOCK;
  },

  // Validate file size for future image uploads
  isFileSizeValid: (fileSize: number, maxSizeMB: number = 5): boolean => {
    return fileSize <= maxSizeMB * 1024 * 1024;
  },

  // Format validation errors for UI display
  formatValidationError: (error: z.ZodError): Record<string, string> => {
    return error.errors.reduce((acc, curr) => {
      const path = curr.path.join(".");
      acc[path] = curr.message;
      return acc;
    }, {} as Record<string, string>);
  },

  // Sanitize user input
  sanitizeInput: (input: string): string => {
    return input.trim().replace(/\s+/g, " ");
  },
};

// Export types for TypeScript
export type ProductValidation = z.infer<typeof productSchema>;
export type PartialProductValidation = z.infer<typeof partialProductSchema>;
export type FiltersValidation = z.infer<typeof filtersSchema>;
