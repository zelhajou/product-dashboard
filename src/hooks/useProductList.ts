import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useProductStore,
  useProducts,
  useFilteredProducts,
  useProductsLoading,
  useProductsError,
  useProductFilters,
  useProductSort,
} from "@/store";
import { getUniqueCategories } from "@/data";
import type { Product, ProductFilters } from "@/types";

export function useProductList() {
  const navigate = useNavigate();

  // Store actions
  const loadProducts = useProductStore((state) => state.loadProducts);
  const updateFilters = useProductStore((state) => state.updateFilters);
  const updateSort = useProductStore((state) => state.updateSort);
  const clearFilters = useProductStore((state) => state.clearFilters);
  const getProductStats = useProductStore((state) => state.getProductStats);
  const getLowStockProducts = useProductStore(
    (state) => state.getLowStockProducts
  );

  // Store selectors
  const allProducts = useProducts();
  const filteredProducts = useFilteredProducts();
  const isLoading = useProductsLoading();
  const error = useProductsError();
  const filters = useProductFilters();
  const sortConfig = useProductSort();

  // Derived data
  const availableCategories = getUniqueCategories(allProducts);
  const stats = getProductStats();
  const lowStockProducts = getLowStockProducts();

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Event handlers
  const handleSort = (field: keyof Product) => {
    const direction =
      sortConfig.field === field && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    updateSort({ field, direction });
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleFiltersChange = (newFilters: Partial<ProductFilters>) => {
    updateFilters(newFilters);
  };

  return {
    // Data
    products: filteredProducts,
    allProducts,
    isLoading,
    error,
    filters,
    sortConfig,
    availableCategories,
    stats,
    lowStockProducts,

    // Actions
    handleFiltersChange,
    clearFilters,
    handleSort,
    handleProductClick,
    loadProducts,
  };
}
