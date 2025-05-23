import { useMemo } from "react";
import { useProductStore } from "@/store";
import { formatters } from "@/utils";

export function useProductStats() {
  const products = useProductStore((state) => state.products);
  const getProductStats = useProductStore((state) => state.getProductStats);
  const getLowStockProducts = useProductStore(
    (state) => state.getLowStockProducts
  );

  return useMemo(() => {
    const stats = getProductStats();
    const lowStockProducts = getLowStockProducts();

    return {
      // Formatted stats for display
      totalProducts: stats.total,
      totalValue: formatters.currency(stats.totalValue),
      averagePrice: formatters.currency(stats.averagePrice),
      totalStock: formatters.number(stats.totalStock),

      // Counts
      activeProducts: stats.active,
      archivedProducts: stats.archived,
      lowStockCount: stats.lowStock,
      outOfStockCount: stats.outOfStock,

      // Product arrays
      lowStockProducts,

      // Raw stats for calculations
      rawStats: stats,
    };
  }, [products, getProductStats, getLowStockProducts]);
}
