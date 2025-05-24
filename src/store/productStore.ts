import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  Product,
  ProductFilters,
  SortConfig,
  ProductFormData,
} from "@/types/product";
import { initialProducts, simulateApiDelay } from "@/data/mockData";
import { productHelpers } from "@/utils";

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  filters: ProductFilters;
  sortConfig: SortConfig;
  lastUpdated: Date | null;

  setProducts: (products: Product[]) => void;
  addProduct: (productData: ProductFormData) => Promise<void>;
  updateFilters: (filters: Partial<ProductFilters>) => void;
  updateSort: (sortConfig: SortConfig) => void;
  clearFilters: () => void;
  loadProducts: () => Promise<void>;
  getProductById: (id: number) => Product | undefined;
  applyFiltersAndSort: () => void; 

  getProductStats: () => ReturnType<typeof productHelpers.getProductStats>;
  getLowStockProducts: () => Product[];
  getTopProducts: (limit?: number) => Product[];
}

export const useProductStore = create<ProductStore>()(
  persist(
    devtools(
      (set, get) => ({
        products: [],
        filteredProducts: [],
        isLoading: false,
        error: null,
        lastUpdated: null,
        filters: {
          category: "",
          status: "",
          searchTerm: "",
          stockLevel: "",
        },
        sortConfig: {
          field: "name",
          direction: "asc",
        },

        setProducts: (products) => {
          set({
            products,
            lastUpdated: new Date(),
          });
          get().applyFiltersAndSort();
        },

        loadProducts: async () => {
          set({ isLoading: true, error: null });
          try {
            await simulateApiDelay(800);
            const { products } = get();
            
            // Always load mock data first
            const mockProducts = initialProducts;
            
            // Merge mock data with existing products, avoiding duplicates by ID
            const existingIds = new Set(products.map(p => p.id));
            const newProducts = mockProducts.filter(p => !existingIds.has(p.id));
            const mergedProducts = [...products, ...newProducts];
            
            // Sort products by ID in descending order (newest first)
            const sortedProducts = [...mergedProducts].sort((a, b) => b.id - a.id);
            
            set({
              products: sortedProducts,
              filteredProducts: sortedProducts,
              isLoading: false,
              lastUpdated: new Date(),
            });
            
            console.log("Loaded mock products:", mockProducts.length);
            console.log("Existing products:", products.length);
            console.log("New products added:", newProducts.length);
            console.log("Total products after merge:", sortedProducts.length);
            
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (err) {
            set({
              error: "Failed to load products",
              isLoading: false,
            });
          }
        },

        addProduct: async (productData) => {
          set({ isLoading: true, error: null });
          try {
            await simulateApiDelay(500);

            const { products } = get();
            const newProduct: Product = {
              ...productData,
              id: Math.max(...products.map((p) => p.id), 0) + 1,
            };

            const updatedProducts = [...products, newProduct];
            
            set({
              products: updatedProducts,
              filteredProducts: updatedProducts,
              isLoading: false,
              lastUpdated: new Date(),
            });
            
            console.log("Product added:", newProduct);
            console.log("Total products:", updatedProducts.length);
            
          } catch (err) {
            set({
              error: "Failed to add product",
              isLoading: false,
            });
            throw err;
          }
        },

        updateFilters: (newFilters) => {
          const { filters } = get();
          const updatedFilters = { ...filters, ...newFilters };
          set({ filters: updatedFilters });
          get().applyFiltersAndSort();
        },

        updateSort: (sortConfig) => {
          set({ sortConfig });
          get().applyFiltersAndSort();
        },

        clearFilters: () => {
          set({
            filters: {
              category: "",
              status: "",
              searchTerm: "",
              stockLevel: "",
            },
          });
          get().applyFiltersAndSort();
        },

        getProductById: (id) => {
          const { products } = get();
          return products.find((product) => product.id === id);
        },

        getProductStats: () => {
          const { products } = get();
          return productHelpers.getProductStats(products);
        },

        getLowStockProducts: () => {
          const { products } = get();
          return products.filter(
            (product) =>
              product.stock <= 10 &&
              product.stock > 0 &&
              product.status === "active"
          );
        },

        getTopProducts: (limit = 5) => {
          const { products } = get();
          return productHelpers
            .sortProducts(products, "price", "desc")
            .slice(0, limit);
        },

        applyFiltersAndSort: () => {
          const { products, filters, sortConfig } = get();
          
          console.log("Applying filters to", products.length, "products");
          console.log("Current filters:", filters);

          // Enhanced filtering with stock level support
          const filtered = products.filter((product) => {
            // Search term matching
            if (filters.searchTerm) {
              const searchLower = filters.searchTerm.toLowerCase();
              const matchesName = product.name.toLowerCase().includes(searchLower);
              const matchesCategory = product.category.toLowerCase().includes(searchLower);
              if (!matchesName && !matchesCategory) return false;
            }

            // Category filtering
            if (filters.category && filters.category !== "") {
              if (product.category !== filters.category) return false;
            }

            // Status filtering
            if (filters.status && filters.status !== "") {
              if (product.status !== filters.status) return false;
            }

            // Stock level filtering
            if (filters.stockLevel && filters.stockLevel !== "") {
              switch (filters.stockLevel) {
                case "low":
                  // Low stock: 1-10 units
                  if (product.stock <= 0 || product.stock > 10) return false;
                  break;
                case "out":
                  // Out of stock: 0 units
                  if (product.stock !== 0) return false;
                  break;
                case "high":
                  // High stock: more than 20 units
                  if (product.stock <= 20) return false;
                  break;
                default:
                  break;
              }
            }

            return true;
          });

          console.log("After filtering:", filtered.length, "products");

          const sorted = productHelpers.sortProducts(
            filtered,
            sortConfig.field,
            sortConfig.direction
          );

          console.log("After sorting:", sorted.length, "products");

          set({ filteredProducts: sorted });
        },
      }),
      {
        name: "product-store",
      }
    ),
    {
      name: "product-storage",
      partialize: (state) => ({
        products: state.products,
        lastUpdated: state.lastUpdated,
      }),
    }
  )
);

// Export selectors
export const useProducts = () => useProductStore((state) => state.products);
export const useFilteredProducts = () => useProductStore((state) => state.filteredProducts);
export const useProductsLoading = () => useProductStore((state) => state.isLoading);
export const useProductsError = () => useProductStore((state) => state.error);
export const useProductFilters = () => useProductStore((state) => state.filters);
export const useProductSort = () => useProductStore((state) => state.sortConfig);