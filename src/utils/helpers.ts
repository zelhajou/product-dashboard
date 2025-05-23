import type { Product } from "@/types/product";

export const formatters = {
  // Currency formatting
  currency: (amount: number, currency: string = "USD"): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  },

  // Number formatting with commas
  number: (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num);
  },

  // Percentage formatting
  percentage: (num: number, decimals: number = 1): string => {
    return `${num.toFixed(decimals)}%`;
  },

  // Date formatting
  date: (date: Date | string): string => {
    const d = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);
  },

  // Relative time formatting
  relativeTime: (date: Date | string): string => {
    const d = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return formatters.date(d);
  },
};

export const productHelpers = {
  // Calculate inventory value
  calculateInventoryValue: (products: Product[]): number => {
    return products.reduce((total, product) => {
      return total + product.price * product.stock;
    }, 0);
  },

  // Get stock status with color coding
  getStockStatus: (
    stock: number
  ): {
    status: "high" | "medium" | "low" | "out";
    label: string;
    color: string;
  } => {
    if (stock === 0) {
      return {
        status: "out",
        label: "Out of Stock",
        color: "bg-red-100 text-red-800",
      };
    }
    if (stock <= 5) {
      return {
        status: "low",
        label: "Critical Stock",
        color: "bg-red-100 text-red-800",
      };
    }
    if (stock <= 10) {
      return {
        status: "low",
        label: "Low Stock",
        color: "bg-yellow-100 text-yellow-800",
      };
    }
    if (stock <= 20) {
      return {
        status: "medium",
        label: "Medium Stock",
        color: "bg-yellow-100 text-yellow-800",
      };
    }
    return {
      status: "high",
      label: "In Stock",
      color: "bg-green-100 text-green-800",
    };
  },

  filterProducts: (
    products: Product[],
    filters: {
      searchTerm?: string;
      category?: string;
      status?: string;
      stockLevel?: string;
      minPrice?: number;
      maxPrice?: number;
    }
  ): Product[] => {
    return products.filter((product) => {
      // Search term matching
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(searchLower);
        const matchesCategory = product.category
          .toLowerCase()
          .includes(searchLower);
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
          case "out":
            if (product.stock !== 0) return false;
            break;
          case "low":
            // Low stock: 1-10 units
            if (product.stock <= 0 || product.stock > 10) return false;
            break;
          case "medium":
            // Medium stock: 11-20 units
            if (product.stock <= 10 || product.stock > 20) return false;
            break;
          case "high":
            // High stock: more than 20 units
            if (product.stock <= 20) return false;
            break;
          default:
            break;
        }
      }

      // Price range filtering
      if (filters.minPrice !== undefined && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
        return false;
      }

      return true;
    });
  },

  // Sort products by different criteria
  sortProducts: (
    products: Product[],
    sortBy: keyof Product,
    direction: "asc" | "desc" = "asc"
  ): Product[] => {
    return [...products].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return direction === "asc" ? comparison : -comparison;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        const comparison = aValue - bValue;
        return direction === "asc" ? comparison : -comparison;
      }

      return 0;
    });
  },

  // Get product statistics
  getProductStats: (products: Product[]) => {
    const activeProducts = products.filter((p) => p.status === "active");
    const lowStockProducts = products.filter(
      (p) => p.stock <= 10 && p.stock > 0
    );
    const outOfStockProducts = products.filter((p) => p.stock === 0);

    return {
      total: products.length,
      active: activeProducts.length,
      archived: products.length - activeProducts.length,
      lowStock: lowStockProducts.length,
      outOfStock: outOfStockProducts.length,
      totalValue: productHelpers.calculateInventoryValue(products),
      averagePrice:
        products.length > 0
          ? products.reduce((sum, p) => sum + p.price, 0) / products.length
          : 0,
      totalStock: products.reduce((sum, p) => sum + p.stock, 0),
    };
  },
};