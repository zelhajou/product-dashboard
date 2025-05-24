import type { Product } from "@/types";

export const createMockProduct = (
  overrides: Partial<Product> = {}
): Product => ({
  id: 1,
  name: "Test Product",
  price: 99.99,
  stock: 10,
  category: "Electronics",
  status: "active",
  ...overrides,
});
