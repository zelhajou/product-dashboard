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

  const stockLevelOptions = [
    {
      value: "low",
      label: "Low Stock",
      shortLabel: "Low",
      icon: Icons.warning,
      colorClass:
        "text-yellow-800 bg-yellow-100 border-yellow-200 hover:bg-yellow-200",
    },
    {
      value: "out",
      label: "Out of Stock",
      shortLabel: "Out",
      icon: Icons.failed,
      colorClass: "text-red-800 bg-red-100 border-red-200 hover:bg-red-200",
    },
    {
      value: "high",
      label: "Well Stocked",
      shortLabel: "Good",
      icon: Icons.check,
      colorClass:
        "text-green-800 bg-green-100 border-green-200 hover:bg-green-200",
    },
  ];

  const quickCategories = [
    { value: "Electronics", icon: Icons.zap },
    { value: "Accessories", icon: Icons.settings },
    { value: "Storage", icon: Icons.product },
  ];

  const getFilterChipColor = (type: string, value: string) => {
    switch (type) {
      case "search":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200";
      case "category":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200";
      case "status":
        return "bg-green-100 text-green-800 hover:bg-green-200 border-green-200";
      case "stockLevel":
        if (value === "low")
          return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200";
        if (value === "out")
          return "bg-red-100 text-red-800 hover:bg-red-200 border-red-200";
        if (value === "high")
          return "bg-green-100 text-green-800 hover:bg-green-200 border-green-200";
        return "bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200";
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
    >
      {/* Main Filter Bar  */}
      <div className="p-3 sm:p-4">
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:gap-3">
          {/* Enhanced Search Input  */}
          <div className="flex-1 relative min-w-0 group order-1">
            <Icons.search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 
                                     group-focus-within:text-blue-500 transition-colors duration-200"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={localSearchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 sm:py-2 text-sm border border-gray-300 rounded-md 
                       bg-white transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       hover:border-gray-400"
            />
            {localSearchTerm && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 
                         hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <Icons.close className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Controls Row */}
          <div className="flex items-center gap-2 sm:gap-3 order-2">
            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => onFiltersChange({ category: e.target.value })}
              className="flex-1 sm:flex-none px-2 sm:px-3 py-2.5 sm:py-2 text-sm border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                       bg-white sm:min-w-32 transition-all duration-200 hover:border-gray-400"
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
              className="flex-1 sm:flex-none px-2 sm:px-3 py-2.5 sm:py-2 text-sm border border-gray-300 rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                       bg-white sm:min-w-24 transition-all duration-200 hover:border-gray-400"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>

            {/* Advanced Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2.5 sm:py-2 text-sm rounded-md transition-all duration-200 ${
                showAdvanced || filters.stockLevel
                  ? "bg-blue-100 text-blue-700 border border-blue-200 shadow-sm"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              }`}
            >
              <Icons.filter className="w-4 h-4 flex-shrink-0" />
              {activeFilterCount > 0 && (
                <span
                  className="bg-blue-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 
                               flex items-center justify-center font-medium flex-shrink-0"
                >
                  {activeFilterCount}
                </span>
              )}
              <span className="hidden sm:inline">Filters</span>
              <Icons.chevronDown
                className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 flex-shrink-0 ${
                  showAdvanced ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2.5 sm:py-2 text-sm text-red-600 
                         border border-red-200 rounded-md hover:bg-red-50 hover:border-red-300 
                         transition-all duration-200"
              >
                <Icons.close className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          showAdvanced
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="border-t border-gray-100 p-3 sm:p-4 bg-gray-50">
          <div className="space-y-3 sm:space-y-4">
            {/* Stock Level Filters */}
            <div>
              <div className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Stock Level
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-3 sm:flex sm:flex-wrap gap-2">
                {stockLevelOptions.map(
                  ({
                    value,
                    label,
                    shortLabel,
                    icon: IconComponent,
                    colorClass,
                  }) => (
                    <button
                      key={value}
                      onClick={() =>
                        onFiltersChange({
                          stockLevel: filters.stockLevel === value ? "" : value,
                        })
                      }
                      className={`inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-2 sm:py-1.5 text-xs rounded-full 
                               border transition-all duration-200 ${
                                 filters.stockLevel === value
                                   ? colorClass
                                   : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                               }`}
                    >
                      <IconComponent className="w-3 h-3 flex-shrink-0" />
                      <span className="sm:hidden">{shortLabel}</span>
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Quick Category Filters*/}
            <div>
              <div className="text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Quick Categories
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-3 sm:flex sm:flex-wrap gap-2">
                {quickCategories.map(({ value, icon: IconComponent }) => (
                  <button
                    key={value}
                    onClick={() =>
                      onFiltersChange({
                        category: filters.category === value ? "" : value,
                      })
                    }
                    className={`inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-2 sm:py-1.5 text-xs rounded-full 
                               border transition-all duration-200 ${
                                 filters.category === value
                                   ? "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"
                                   : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                               }`}
                  >
                    <IconComponent className="w-3 h-3 flex-shrink-0" />
                    <span>{value}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters  */}
      {hasActiveFilters && (
        <div className="border-t border-gray-100 px-3 sm:px-4 py-3 bg-blue-50">
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-sm font-medium text-blue-700 flex items-center gap-1 flex-shrink-0">
              <Icons.filter className="w-4 h-4" />
              <span className="hidden xs:inline">
                Active filters ({activeFilterCount}):
              </span>
              <span className="xs:hidden">
                {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""}:
              </span>
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {filters.searchTerm && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium 
                                border transition-all duration-200 ${getFilterChipColor(
                                  "search",
                                  filters.searchTerm
                                )}`}
                >
                  <Icons.search className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate max-w-20 sm:max-w-none">
                    "
                    {filters.searchTerm.length > 12
                      ? filters.searchTerm.slice(0, 12) + "..."
                      : filters.searchTerm}
                    "
                  </span>
                  <button
                    onClick={() => onFiltersChange({ searchTerm: "" })}
                    className="ml-1 p-0.5 rounded-full hover:bg-black/10 transition-colors duration-200 flex-shrink-0"
                  >
                    <Icons.close className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.category && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium 
                                border transition-all duration-200 ${getFilterChipColor(
                                  "category",
                                  filters.category
                                )}`}
                >
                  <span className="truncate">{filters.category}</span>
                  <button
                    onClick={() => onFiltersChange({ category: "" })}
                    className="ml-1 p-0.5 rounded-full hover:bg-black/10 transition-colors duration-200 flex-shrink-0"
                  >
                    <Icons.close className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.status && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium 
                                border transition-all duration-200 ${getFilterChipColor(
                                  "status",
                                  filters.status
                                )}`}
                >
                  <span>{filters.status}</span>
                  <button
                    onClick={() => onFiltersChange({ status: "" })}
                    className="ml-1 p-0.5 rounded-full hover:bg-black/10 transition-colors duration-200 flex-shrink-0"
                  >
                    <Icons.close className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.stockLevel && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium 
                                border transition-all duration-200 ${getFilterChipColor(
                                  "stockLevel",
                                  filters.stockLevel
                                )}`}
                >
                  {filters.stockLevel === "low" && (
                    <Icons.warning className="w-3 h-3 flex-shrink-0" />
                  )}
                  {filters.stockLevel === "out" && (
                    <Icons.failed className="w-3 h-3 flex-shrink-0" />
                  )}
                  {filters.stockLevel === "high" && (
                    <Icons.check className="w-3 h-3 flex-shrink-0" />
                  )}
                  <span>
                    {filters.stockLevel === "low"
                      ? "Low Stock"
                      : filters.stockLevel === "out"
                      ? "Out of Stock"
                      : filters.stockLevel === "high"
                      ? "Well Stocked"
                      : filters.stockLevel}
                  </span>
                  <button
                    onClick={() => onFiltersChange({ stockLevel: "" })}
                    className="ml-1 p-0.5 rounded-full hover:bg-black/10 transition-colors duration-200 flex-shrink-0"
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
