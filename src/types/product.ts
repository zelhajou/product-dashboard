export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'archived';
}

// Filter interface for the product list filtering functionality
export interface ProductFilters {
  category: string;
  status: string;
  searchTerm: string;
  stockLevel?: string; // Added stockLevel filter
}

// Sort configuration interface
export interface SortConfig {
  field: keyof Product;
  direction: 'asc' | 'desc';
}

// Form data interface for adding new products
export interface ProductFormData {
  name: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'archived';
}

// API-like interfaces
export interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  filters: ProductFilters;
  sortConfig: SortConfig;
}