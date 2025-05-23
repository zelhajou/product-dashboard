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
      className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icons.filter className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">
            Filters & Search
          </h2>
          {hasActiveFilters && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {
                [filters.searchTerm, filters.category, filters.status].filter(
                  Boolean
                ).length
              }{" "}
              active
            </span>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon="close"
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        >
          Clear All
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <Input
            label="Search Products"
            placeholder="Search by name or category..."
            value={localSearchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            leftIcon="search"
            rightIcon={
              localSearchTerm ? (
                <button
                  onClick={() => handleSearchChange("")}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                >
                  <Icons.close className="w-4 h-4" />
                </button>
              ) : undefined
            }
          />
        </div>

        {/* Category Filter */}
        <Select
          label="Category"
          value={filters.category}
          onChange={(e) => onFiltersChange({ category: e.target.value })}
          options={[
            { value: "", label: "All Categories" },
            ...availableCategories.map((category) => ({
              value: category,
              label: category,
            })),
          ]}
        />

        {/* Status Filter */}
        <Select
          label="Status"
          value={filters.status}
          onChange={(e) => onFiltersChange({ status: e.target.value })}
          options={[
            { value: "", label: "All Status" },
            { value: "active", label: "Active Products" },
            { value: "archived", label: "Archived Products" },
          ]}
        />
      </div>

      {/* Quick Filter Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-500 mr-2">
            Quick filters:
          </span>

          <Button
            variant="outline"
            size="sm"
            leftIcon="zap"
            onClick={() => onFiltersChange({ category: "Electronics" })}
            className={
              filters.category === "Electronics"
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : ""
            }
          >
            Electronics
          </Button>

          <Button
            variant="outline"
            size="sm"
            leftIcon="settings"
            onClick={() => onFiltersChange({ category: "Accessories" })}
            className={
              filters.category === "Accessories"
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : ""
            }
          >
            Accessories
          </Button>

          <Button
            variant="outline"
            size="sm"
            leftIcon="check"
            onClick={() => onFiltersChange({ status: "active" })}
            className={
              filters.status === "active"
                ? "bg-green-50 border-green-200 text-green-700"
                : ""
            }
          >
            Active Only
          </Button>

          <Button
            variant="outline"
            size="sm"
            leftIcon="warning"
            onClick={() => onFiltersChange({ searchTerm: "low stock" })}
            className="text-yellow-700 border-yellow-200 hover:bg-yellow-50"
          >
            Low Stock
          </Button>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-500">
              Active filters:
            </span>

            {filters.searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                Search: "{filters.searchTerm}"
                <button
                  onClick={() => onFiltersChange({ searchTerm: "" })}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <Icons.close className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.category && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                Category: {filters.category}
                <button
                  onClick={() => onFiltersChange({ category: "" })}
                  className="hover:bg-purple-200 rounded-full p-0.5"
                >
                  <Icons.close className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.status && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Status: {filters.status}
                <button
                  onClick={() => onFiltersChange({ status: "" })}
                  className="hover:bg-green-200 rounded-full p-0.5"
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
