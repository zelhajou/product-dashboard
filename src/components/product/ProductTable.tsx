import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";
import { Icons } from "@/components/icons";
import { formatters, productHelpers } from "@/utils";
import type { Product, SortConfig } from "@/types";

interface ProductTableProps {
  products: Product[];
  sortConfig: SortConfig;
  onSort: (field: keyof Product) => void;
  onProductClick?: (productId: number) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: number) => void;
  isLoading?: boolean;
  className?: string;
}

export function ProductTable({
  products,
  sortConfig,
  onSort,
  onProductClick,
  onEdit,
  onDelete,
  isLoading = false,
  className = "",
}: ProductTableProps) {
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(
    new Set()
  );

  // Handle row selection
  const handleSelectProduct = (productId: number, checked: boolean) => {
    const newSelected = new Set(selectedProducts);
    if (checked) {
      newSelected.add(productId);
    } else {
      newSelected.delete(productId);
    }
    setSelectedProducts(newSelected);
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(new Set(products.map((p) => p.id)));
    } else {
      setSelectedProducts(new Set());
    }
  };

  // Bulk actions
  const handleBulkDelete = () => {
    if (onDelete && selectedProducts.size > 0) {
      const confirmed = window.confirm(
        `Are you sure you want to delete ${selectedProducts.size} product(s)?`
      );
      if (confirmed) {
        selectedProducts.forEach((id) => onDelete(id));
        setSelectedProducts(new Set());
      }
    }
  };

  const handleBulkEdit = () => {
    // This would typically open a bulk edit modal
    console.log("Bulk edit:", Array.from(selectedProducts));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-50 border-b border-gray-200"></div>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 border-b border-gray-100 bg-white"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Bulk Actions Bar */}
      {selectedProducts.size > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-blue-900">
                {selectedProducts.size} product
                {selectedProducts.size > 1 ? "s" : ""} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                leftIcon="edit"
                onClick={handleBulkEdit}
              >
                Edit Selected
              </Button>
              <Button
                variant="danger"
                size="sm"
                leftIcon="delete"
                onClick={handleBulkDelete}
              >
                Delete Selected
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedProducts(new Set())}
            >
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            {/* Select All Checkbox */}
            <TableHeaderCell className="w-12">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={
                  products.length > 0 &&
                  selectedProducts.size === products.length
                }
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </TableHeaderCell>

            {/* Sortable Headers */}
            <TableHeaderCell
              sortable
              sortDirection={
                sortConfig.field === "name" ? sortConfig.direction : null
              }
              onSort={() => onSort("name")}
            >
              Product Name
            </TableHeaderCell>

            <TableHeaderCell
              sortable
              sortDirection={
                sortConfig.field === "category" ? sortConfig.direction : null
              }
              onSort={() => onSort("category")}
            >
              Category
            </TableHeaderCell>

            <TableHeaderCell
              sortable
              sortDirection={
                sortConfig.field === "price" ? sortConfig.direction : null
              }
              onSort={() => onSort("price")}
              className="text-right"
            >
              Price
            </TableHeaderCell>

            <TableHeaderCell
              sortable
              sortDirection={
                sortConfig.field === "stock" ? sortConfig.direction : null
              }
              onSort={() => onSort("stock")}
              className="text-center"
            >
              Stock
            </TableHeaderCell>

            <TableHeaderCell className="text-center">Status</TableHeaderCell>

            <TableHeaderCell className="text-center">Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => {
            const stockStatus = productHelpers.getStockStatus(product.stock);
            const isSelected = selectedProducts.has(product.id);

            return (
              <TableRow
                key={product.id}
                isClickable={Boolean(onProductClick)}
                onClick={() => onProductClick?.(product.id)}
                className={isSelected ? "bg-blue-50" : ""}
              >
                {/* Selection Checkbox */}
                <TableCell>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectProduct(product.id, e.target.checked);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>

                {/* Product Name */}
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icons.product className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: #{product.id}
                      </div>
                    </div>
                  </div>
                </TableCell>

                {/* Category */}
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {product.category}
                  </span>
                </TableCell>

                {/* Price */}
                <TableCell className="text-right font-semibold text-gray-900">
                  {formatters.currency(product.price)}
                </TableCell>

                {/* Stock */}
                <TableCell className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}
                    >
                      {product.stock} units
                    </span>
                    <div className="w-16 bg-gray-200 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${
                          product.stock > 20
                            ? "bg-green-500"
                            : product.stock > 0
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            (product.stock / 50) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell className="text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        product.status === "active"
                          ? "bg-green-400"
                          : "bg-gray-400"
                      }`}
                    ></span>
                    {product.status}
                  </span>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link to={`/product/${product.id}`}>
                        <Icons.view className="w-4 h-4" />
                      </Link>
                    </Button>

                    {onEdit && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(product);
                        }}
                      >
                        <Icons.edit className="w-4 h-4" />
                      </Button>
                    )}

                    {onDelete && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          const confirmed = window.confirm(
                            `Are you sure you want to delete "${product.name}"?`
                          );
                          if (confirmed) {
                            onDelete(product.id);
                          }
                        }}
                      >
                        <Icons.delete className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <Icons.product className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-4">
            No products match your current filters or search criteria.
          </p>
          <Button asChild leftIcon="add">
            <Link to="/add-product">Add Your First Product</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProductTable;
