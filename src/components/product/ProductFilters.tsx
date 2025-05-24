import { useState } from "react";
import { Icons } from "@/components/icons";
import type { ProductFilters as ProductFiltersType } from "@/types/product";

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onFiltersChange: (filters: Partial<ProductFiltersType>) => void;
  onClearFilters: () => void;
  availableCategories?: string[];
  className?: string;
  productCount?: number;
  totalCount?: number;
  showActionBar?: boolean;
  viewMode?: "table" | "grid";
  onViewModeChange?: (mode: "table" | "grid") => void;
  onAddProduct?: () => void;
}

export function ProductFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  availableCategories = [],
  className = "",
  productCount = 0,
  totalCount = 0,
  showActionBar = true,
  viewMode = "table",
  onViewModeChange,
  onAddProduct,
}: ProductFiltersProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(filters.searchTerm);

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value);
    onFiltersChange({ searchTerm: value });
  };

  const hasActiveFilters = Boolean(
    filters.searchTerm ||
      filters.category ||
      filters.status ||
      filters.stockLevel
  );

  const activeFilterCount = [
    filters.searchTerm,
    filters.category,
    filters.status,
    filters.stockLevel,
  ].filter(Boolean).length;

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200/60 shadow-sm overflow-hidden ${className}`}
    >
      {/* Top Section - Action Bar */}
      {showActionBar && (
        <div className="border-b border-gray-100/80 px-6 py-4 bg-gradient-to-r from-gray-50/30 to-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left section */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {productCount.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {productCount === 1 ? "product" : "products"}
                  </span>
                  {productCount !== totalCount && (
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md font-medium">
                      of {totalCount.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Filter Status */}
              {hasActiveFilters && (
                <div className="flex items-center gap-3">
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-xs font-medium text-gray-600">
                      {activeFilterCount} filter
                      {activeFilterCount !== 1 ? "s" : ""} active
                    </span>
                    <button
                      onClick={onClearFilters}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right section*/}
            <div className="flex items-center gap-3">
              {/* Enhanced View Toggle */}
              {onViewModeChange && (
                <div className="flex items-center bg-gray-100/80 rounded-lg p-0.5 border border-gray-200/50">
                  <button
                    onClick={() => onViewModeChange("table")}
                    className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                      viewMode === "table"
                        ? "bg-white text-gray-900 shadow-sm font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                    title="Table view"
                  >
                    <Icons.barChart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onViewModeChange("grid")}
                    className={`px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-white text-gray-900 shadow-sm font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                    title="Grid view"
                  >
                    <Icons.settings className="w-4 h-4" />
                  </button>
                </div>
              )}

              {onAddProduct && (
                <button
                  onClick={onAddProduct}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                >
                  <Icons.add className="w-4 h-4" />
                  Add Product
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Section - Compact Filters */}
      <div className="px-6 py-4">
        <div className="space-y-4">
          {/* Compact Search & Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Compact Search Bar */}
            <div className="relative group flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icons.search className="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={localSearchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 text-sm placeholder-gray-400 bg-gray-50/50 border border-gray-200/60 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 focus:bg-white hover:bg-white hover:border-gray-300"
              />
              {localSearchTerm && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icons.close className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Compact Filter Controls */}
            <div className="flex gap-2 flex-shrink-0">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={filters.category}
                  onChange={(e) =>
                    onFiltersChange({ category: e.target.value })
                  }
                  className="appearance-none bg-white border border-gray-200/60 rounded-lg px-3 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 hover:border-gray-300 transition-all duration-200 min-w-[120px]"
                >
                  <option value="">Category</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Icons.chevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={filters.status}
                  onChange={(e) => onFiltersChange({ status: e.target.value })}
                  className="appearance-none bg-white border border-gray-200/60 rounded-lg px-3 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 hover:border-gray-300 transition-all duration-200 min-w-[100px]"
                >
                  <option value="">Status</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Icons.chevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Stock Level Filter */}
              <div className="relative">
                <select
                  value={filters.stockLevel}
                  onChange={(e) =>
                    onFiltersChange({ stockLevel: e.target.value })
                  }
                  className="appearance-none bg-white border border-gray-200/60 rounded-lg px-3 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 hover:border-gray-300 transition-all duration-200 min-w-[110px]"
                >
                  <option value="">Stock</option>
                  <option value="high">✓ Good</option>
                  <option value="low">⚠ Low</option>
                  <option value="out">✗ Out</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Icons.chevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Compact Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                <Icons.filter className="w-3 h-3" />
                Filters:
              </span>

              {filters.searchTerm && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-200/50">
                  <Icons.search className="w-3 h-3" />"
                  {filters.searchTerm.length > 15
                    ? filters.searchTerm.slice(0, 15) + "..."
                    : filters.searchTerm}
                  "
                  <button
                    onClick={() => onFiltersChange({ searchTerm: "" })}
                    className="ml-0.5 p-0.5 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <Icons.close className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}

              {filters.category && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-md border border-purple-200/50">
                  <Icons.settings className="w-3 h-3" />
                  {filters.category}
                  <button
                    onClick={() => onFiltersChange({ category: "" })}
                    className="ml-0.5 p-0.5 rounded-full hover:bg-purple-100 transition-colors"
                  >
                    <Icons.close className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}

              {filters.status && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-md border border-emerald-200/50">
                  <Icons.check className="w-3 h-3" />
                  {filters.status}
                  <button
                    onClick={() => onFiltersChange({ status: "" })}
                    className="ml-0.5 p-0.5 rounded-full hover:bg-emerald-100 transition-colors"
                  >
                    <Icons.close className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}

              {filters.stockLevel && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md border ${
                    filters.stockLevel === "low"
                      ? "bg-amber-50 text-amber-700 border-amber-200/50"
                      : filters.stockLevel === "out"
                      ? "bg-red-50 text-red-700 border-red-200/50"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200/50"
                  }`}
                >
                  {filters.stockLevel === "low" && (
                    <Icons.warning className="w-3 h-3" />
                  )}
                  {filters.stockLevel === "out" && (
                    <Icons.failed className="w-3 h-3" />
                  )}
                  {filters.stockLevel === "high" && (
                    <Icons.check className="w-3 h-3" />
                  )}
                  {filters.stockLevel === "low"
                    ? "Low"
                    : filters.stockLevel === "out"
                    ? "Out"
                    : "Good"}
                  <button
                    onClick={() => onFiltersChange({ stockLevel: "" })}
                    className={`ml-0.5 p-0.5 rounded-full transition-colors ${
                      filters.stockLevel === "low"
                        ? "hover:bg-amber-100"
                        : filters.stockLevel === "out"
                        ? "hover:bg-red-100"
                        : "hover:bg-emerald-100"
                    }`}
                  >
                    <Icons.close className="w-2.5 h-2.5" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductFilters;
