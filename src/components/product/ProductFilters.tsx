import { useState } from "react";
import { Input, Select, Button } from "@/components/ui";
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

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value);
    onFiltersChange({ searchTerm: value });
  };

  const hasActiveFilters = Boolean(
    filters.searchTerm || filters.category || filters.status
  );

  return (
    <div
      className={`bg-gray-50 shadow rounded-lg border border-gray-200 p-3 space-y-3 divide-y divide-gray-100 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <Icons.filter className="w-4 h-4 text-gray-500" />
          <h2 className="text-base font-semibold text-gray-900">
            Filters & Search
          </h2>
          {hasActiveFilters && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 text-blue-800 animate-fade-in">
              {
                [filters.searchTerm, filters.category, filters.status].filter(Boolean).length
              } active
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          leftIcon="close"
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
          className="transition-colors focus:ring-2 focus:ring-blue-400 h-7 px-2 text-xs"
        >
          Clear
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-3">
        {/* Search Input */}
        <div className="md:col-span-2">
          <Input
            label=""
            placeholder="Search products..."
            value={localSearchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            leftIcon="search"
            rightIcon={
              localSearchTerm ? (
                <button
                  onClick={() => handleSearchChange("")}
                  className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full"
                  type="button"
                >
                  <Icons.close className="w-4 h-4" />
                </button>
              ) : undefined
            }
            className="transition-colors focus:ring-2 focus:ring-blue-400 h-8 text-sm"
          />
        </div>
        {/* Category Filter */}
        <Select
          label=""
          value={filters.category}
          onChange={(e) => onFiltersChange({ category: e.target.value })}
          options={[
            { value: "", label: "All Categories" },
            ...availableCategories.map((category) => ({
              value: category,
              label: category,
            })),
          ]}
          className="transition-colors focus:ring-2 focus:ring-blue-400 h-8 text-sm"
        />
        {/* Status Filter */}
        <Select
          label=""
          value={filters.status}
          onChange={(e) => onFiltersChange({ status: e.target.value })}
          options={[
            { value: "", label: "All Status" },
            { value: "active", label: "Active" },
            { value: "archived", label: "Archived" },
          ]}
          className="transition-colors focus:ring-2 focus:ring-blue-400 h-8 text-sm"
        />
      </div>

      {/* Quick Filter Buttons */}
      <div className="pt-3">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-xs font-medium text-gray-500 mr-1">
            Quick:
          </span>
          <Button
            variant="outline"
            size="sm"
            leftIcon="zap"
            onClick={() => onFiltersChange({ category: "Electronics" })}
            className={`rounded-full px-3 py-1 transition-colors focus:ring-2 focus:ring-blue-400 text-xs h-7 ${filters.category === "Electronics" ? "bg-blue-50 border-blue-200 text-blue-700" : ""}`}
          >
            Electronics
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon="settings"
            onClick={() => onFiltersChange({ category: "Accessories" })}
            className={`rounded-full px-3 py-1 transition-colors focus:ring-2 focus:ring-blue-400 text-xs h-7 ${filters.category === "Accessories" ? "bg-blue-50 border-blue-200 text-blue-700" : ""}`}
          >
            Accessories
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon="check"
            onClick={() => onFiltersChange({ status: "active" })}
            className={`rounded-full px-3 py-1 transition-colors focus:ring-2 focus:ring-green-400 text-xs h-7 ${filters.status === "active" ? "bg-green-50 border-green-200 text-green-700" : ""}`}
          >
            Active
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon="warning"
            onClick={() => onFiltersChange({ searchTerm: "low stock" })}
            className="rounded-full px-3 py-1 transition-colors focus:ring-2 focus:ring-yellow-400 text-xs h-7 text-yellow-700 border-yellow-200 hover:bg-yellow-50"
          >
            Low Stock
          </Button>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-3">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-xs font-medium text-gray-500">
              Active:
            </span>
            {filters.searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-blue-100 text-blue-800 animate-fade-in">
                <Icons.search className="w-3 h-3" />
                "{filters.searchTerm}"
                <button
                  onClick={() => onFiltersChange({ searchTerm: "" })}
                  className="hover:bg-blue-200 rounded-full p-0.5 transition-colors focus:ring-2 focus:ring-blue-400"
                >
                  <Icons.close className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-purple-100 text-purple-800 animate-fade-in">
                <Icons.settings className="w-3 h-3" />
                {filters.category}
                <button
                  onClick={() => onFiltersChange({ category: "" })}
                  className="hover:bg-purple-200 rounded-full p-0.5 transition-colors focus:ring-2 focus:ring-purple-400"
                >
                  <Icons.close className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-green-100 text-green-800 animate-fade-in">
                <Icons.check className="w-3 h-3" />
                {filters.status}
                <button
                  onClick={() => onFiltersChange({ status: "" })}
                  className="hover:bg-green-200 rounded-full p-0.5 transition-colors focus:ring-2 focus:ring-green-400"
                >
                  <Icons.close className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductFilters;
