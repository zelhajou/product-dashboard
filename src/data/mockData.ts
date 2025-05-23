import { Product } from "@/types/product";

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    stock: 15,
    category: "Electronics",
    status: "active",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 699.99,
    stock: 20,
    category: "Electronics",
    status: "active",
  },
  {
    id: 3,
    name: "Headphones",
    price: 149.99,
    stock: 30,
    category: "Accessories",
    status: "active",
  },
  {
    id: 4,
    name: "Mouse",
    price: 24.99,
    stock: 50,
    category: "Accessories",
    status: "active",
  },
  {
    id: 5,
    name: "Keyboard",
    price: 49.99,
    stock: 40,
    category: "Accessories",
    status: "active",
  },
  {
    id: 6,
    name: "Monitor",
    price: 299.99,
    stock: 10,
    category: "Electronics",
    status: "active",
  },
  {
    id: 7,
    name: "Tablet",
    price: 399.99,
    stock: 0,
    category: "Electronics",
    status: "archived",
  },
  {
    id: 8,
    name: "USB Drive",
    price: 19.99,
    stock: 100,
    category: "Storage",
    status: "active",
  },
  {
    id: 9,
    name: "External HDD",
    price: 89.99,
    stock: 25,
    category: "Storage",
    status: "active",
  },
  {
    id: 10,
    name: "Webcam",
    price: 59.99,
    stock: 0,
    category: "Accessories",
    status: "archived",
  },
];

// Helper function to get unique categories
export const getUniqueCategories = (products: Product[]): string[] => {
  return Array.from(new Set(products.map((product) => product.category)));
};

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
