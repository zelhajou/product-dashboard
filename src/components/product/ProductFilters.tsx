import { useState } from "react";
import { Icons } from "@/components/icons";
import type { ProductFilters as ProductFiltersType } from "@/types/product";

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onFiltersChange: (filters: Partial<ProductFiltersType>) => void;
  onClearFilters: () => void;
  availableCategories?: string[];
  className?: string;
}

export function ProductFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  availableCategories = [],
  className = "",
}: ProductFiltersProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(filters.searchTerm);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value);
    onFiltersChange({ searchTerm: value });
  };

  const hasActiveFilters = Boolean(
    filters.searchTerm || filters.category || filters.status || filters.stockLevel
  );

  const activeFilterCount = [
    filters.searchTerm,
    filters.category,
    filters.status,
    filters.stockLevel
  ].filter(Boolean).length;

  return (
    <div className={`bg-white border border-gray-200 rounded-lg ${className}`}>
      {/* Main Filter Bar */}
      <div className="flex items-center gap-3 p-4">
        {/* Search Input */}
        <div className="flex-1 relative min-w-0">
          <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={localSearchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {localSearchTerm && (
            <button
              onClick={() => handleSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Icons.close className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => onFiltersChange({ category: e.target.value })}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-32"
        >
          <option value="">All Categories</option>
          {availableCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => onFiltersChange({ status: e.target.value })}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-24"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>

        {/* Advanced Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-colors ${
            showAdvanced || filters.stockLevel
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Icons.filter className="w-4 h-4" />
          {activeFilterCount > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
          <Icons.chevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
        </button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
          >
            <Icons.close className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <div className="space-y-3">
            {/* Stock Level Filters */}
            <div>
              <div className="text-xs font-medium text-gray-700 mb-2">Stock Level</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onFiltersChange({ 
                    stockLevel: filters.stockLevel === "low" ? "" : "low" 
                  })}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-full transition-colors ${
                    filters.stockLevel === "low"
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                      : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Icons.warning className="w-3 h-3" />
                  Low Stock
                </button>
                <button
                  onClick={() => onFiltersChange({ 
                    stockLevel: filters.stockLevel === "out" ? "" : "out" 
                  })}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-full transition-colors ${
                    filters.stockLevel === "out"
                      ? "bg-red-100 text-red-800 border border-red-200"
                      : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Icons.failed className="w-3 h-3" />
                  Out of Stock
                </button>
                <button
                  onClick={() => onFiltersChange({ 
                    stockLevel: filters.stockLevel === "high" ? "" : "high" 
                  })}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-full transition-colors ${
                    filters.stockLevel === "high"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Icons.check className="w-3 h-3" />
                  Well Stocked
                </button>
              </div>
            </div>

            {/* Quick Category Filters */}
            <div>
              <div className="text-xs font-medium text-gray-700 mb-2">Quick Categories</div>
              <div className="flex flex-wrap gap-2">
                {["Electronics", "Accessories", "Storage"].map((category) => (
                  <button
                    key={category}
                    onClick={() => onFiltersChange({ 
                      category: filters.category === category ? "" : category 
                    })}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-full transition-colors ${
                      filters.category === category
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {category === "Electronics" && <Icons.zap className="w-3 h-3" />}
                    {category === "Accessories" && <Icons.settings className="w-3 h-3" />}
                    {category === "Storage" && <Icons.product className="w-3 h-3" />}
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="border-t border-gray-100 px-4 py-2 bg-blue-50">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-blue-700 font-medium">Active filters:</span>
            <div className="flex flex-wrap gap-1">
              {filters.searchTerm && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                  Search: "{filters.searchTerm}"
                  <button
                    onClick={() => onFiltersChange({ searchTerm: "" })}
                    className="hover:bg-blue-200 rounded p-0.5"
                  >
                    <Icons.close className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-800 rounded">
                  {filters.category}
                  <button
                    onClick={() => onFiltersChange({ category: "" })}
                    className="hover:bg-purple-200 rounded p-0.5"
                  >
                    <Icons.close className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.status && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 rounded">
                  {filters.status}
                  <button
                    onClick={() => onFiltersChange({ status: "" })}
                    className="hover:bg-green-200 rounded p-0.5"
                  >
                    <Icons.close className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.stockLevel && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-800 rounded">
                  {filters.stockLevel === "low" ? "Low Stock" : 
                   filters.stockLevel === "out" ? "Out of Stock" : 
                   filters.stockLevel === "high" ? "Well Stocked" : filters.stockLevel}
                  <button
                    onClick={() => onFiltersChange({ stockLevel: "" })}
                    className="hover:bg-orange-200 rounded p-0.5"
                  >
                    <Icons.close className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductFilters;