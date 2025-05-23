import { create } from "zustand";
import { devtools } from "zustand/middleware";
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
          set({
            products: initialProducts,
            isLoading: false,
            lastUpdated: new Date(),
          });
          get().applyFiltersAndSort();
        } catch (error) {
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
            isLoading: false,
            lastUpdated: new Date(),
          });

          get().applyFiltersAndSort();
          
          console.log("Product added:", newProduct);
          console.log("Total products:", updatedProducts.length);
          
        } catch (error) {
          set({
            error: "Failed to add product",
            isLoading: false,
          });
          throw error;
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
          },
        });
        get().applyFiltersAndSort();
      },

      getProductById: (id) => {
        const { products } = get();
        return products.find((product) => product.id === id);
      },

      // Enhanced analytics methods
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

        let filtered = productHelpers.filterProducts(products, {
          searchTerm: filters.searchTerm,
          category: filters.category,
          status: filters.status,
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
  )
);

export const useProducts = () =>
  useProductStore((state) => state.filteredProducts);
export const useProductsLoading = () =>
  useProductStore((state) => state.isLoading);
export const useProductsError = () => useProductStore((state) => state.error);
export const useProductFilters = () =>
  useProductStore((state) => state.filters);
export const useProductSort = () =>
  useProductStore((state) => state.sortConfig);