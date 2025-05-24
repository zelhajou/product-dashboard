import { useProductList } from "@/hooks";
import { Button, Pagination } from "@/components/ui";
import { ProductFilters, ProductTable } from "@/components/product";
import { Layout } from "@/components/layout";
import {
  StatsCard,
  AlertCard,
  EmptyState,
  SkeletonStats,
  SkeletonActionBar,
  SkeletonFilter,
  SkeletonTable,
} from "@/components/common";
import { Icons } from "@/components/icons";
import { useState, useEffect } from "react";

export function ProductList() {
  const {
    products,
    allProducts,
    isLoading,
    error,
    filters,
    sortConfig,
    availableCategories,
    stats,
    handleFiltersChange,
    clearFilters,
    handleSort,
    handleProductClick,
    loadProducts,
  } = useProductList();

  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortConfig]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Enhanced handlers for stock level filtering
  const handleLowStockClick = () => {
    handleFiltersChange({ stockLevel: "low" });
  };

  const handleOutOfStockClick = () => {
    handleFiltersChange({ stockLevel: "out" });
  };

  const handleAllProductsClick = () => {
    clearFilters();
  };

  const handleAddProduct = () => {
    window.location.href = "/add-product";
  };

  if (isLoading) {
    return (
      <Layout breadcrumbs={[{ label: "Products" }]}>
        <div className="space-y-8">
          {/* Skeleton Stats */}
          <SkeletonStats className="mb-8" />

          {/* Skeleton Action Bar */}
          <SkeletonActionBar className="mb-6" />

          {/* Skeleton Filters */}
          <SkeletonFilter className="mb-6" />

          {/* Skeleton Table */}
          <SkeletonTable rows={8} columns={7} />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout breadcrumbs={[{ label: "Products" }]}>
        <AlertCard
          type="error"
          title="Error loading products"
          description={error}
          action={
            <Button
              variant="outline"
              onClick={() => loadProducts()}
              leftIcon="reset"
              size="sm"
            >
              Try Again
            </Button>
          }
        />
      </Layout>
    );
  }

  return (
    <Layout breadcrumbs={[{ label: "Products" }]}>
      {/* Stats Cards */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Inventory Overview
          </h2>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={<Icons.product className="w-7 h-7 text-blue-600" />}
            iconColor="bg-blue-100"
            title="Total Products"
            value={stats.total}
            subtitle="Active inventory items"
            // trend={{
            //   value: 12,
            //   isPositive: true,
            //   label: "vs last month",
            // }}
            onClick={handleAllProductsClick}
          />

          <StatsCard
            icon={<Icons.dollar className="w-7 h-7 text-green-600" />}
            iconColor="bg-green-100"
            title="Total Value"
            value={`$${stats.totalValue.toLocaleString()}`}
            subtitle="Inventory worth"
          />

          <StatsCard
            icon={<Icons.warning className="w-7 h-7 text-yellow-600" />}
            iconColor="bg-yellow-100"
            title="Low Stock"
            value={stats.lowStock}
            subtitle="Items need restocking"
            onClick={handleLowStockClick}
            hasAlert={stats.lowStock > 0}
            alertType="warning"
          />

          <StatsCard
            icon={<Icons.failed className="w-7 h-7 text-red-600" />}
            iconColor="bg-red-100"
            title="Out of Stock"
            value={stats.outOfStock}
            subtitle="Items unavailable"
            onClick={handleOutOfStockClick}
            hasAlert={stats.outOfStock > 0}
            alertType="danger"
          />
        </div>
      </div>

      {/* ProductFilters Component */}
      <div className="mb-6">
        <ProductFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={clearFilters}
          availableCategories={availableCategories}
          productCount={products.length}
          totalCount={allProducts.length}
          showActionBar={true}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onAddProduct={handleAddProduct}
        />
      </div>

      {/* Main Content */}
      {products.length === 0 && !isLoading ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12">
          <EmptyState
            icon={<Icons.product className="w-full h-full" />}
            title="No products found"
            description="No products match your current filters. Try adjusting your search criteria or add your first product."
            primaryAction={{
              label: "Add Your First Product",
              onClick: () => (window.location.href = "/add-product"),
              icon: "add",
            }}
            secondaryAction={{
              label: "Clear Filters",
              onClick: clearFilters,
              icon: "close",
            }}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Products Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <ProductTable
              products={paginatedProducts}
              sortConfig={sortConfig}
              onSort={handleSort}
              onProductClick={handleProductClick}
              isLoading={isLoading}
            />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, products.length)} of{" "}
                  {products.length} products
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export default ProductList;
