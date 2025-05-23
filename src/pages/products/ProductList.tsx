import { Link } from "react-router-dom";
import { useProductList } from "@/hooks";
import { Button } from "@/components/ui";
import { ProductFilters, ProductTable } from "@/components/product";
import { Layout } from "@/components/layout";
import { StatsCard, AlertCard, LoadingSpinner, EmptyState } from "@/components/common";
import { Icons } from "@/components/icons";

export function ProductList() {
  const {
    products,
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

  if (isLoading) {
    return (
      <Layout 
        title="Products" 
        description="Manage your product inventory"
        breadcrumbs={[{ label: "Products" }]}
      >
        <LoadingSpinner size="lg" message="Loading products..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout 
        title="Products" 
        description="Manage your product inventory"
        breadcrumbs={[{ label: "Products" }]}
      >
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
    <Layout
      title="Products"
      description="Manage your product inventory with powerful filtering and sorting"
      breadcrumbs={[{ label: "Products" }]}
    >
      {/* Quick Stats */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={<Icons.product className="w-6 h-6 text-blue-600" />}
          iconColor="bg-blue-100"
          title="Total Products"
          value={stats.total}
          subtitle="All products in inventory"
          onClick={() => handleFiltersChange({})}
        />

        <StatsCard
          icon={<Icons.dollar className="w-6 h-6 text-green-600" />}
          iconColor="bg-green-100"
          title="Total Value"
          value={`${stats.totalValue.toLocaleString()}`}
          subtitle="Inventory worth"
          trend={{
            value: 12.5,
            isPositive: true,
            label: "vs last month"
          }}
        />

        <StatsCard
          icon={<Icons.warning className="w-6 h-6 text-yellow-600" />}
          iconColor="bg-yellow-100"
          title="Low Stock"
          value={stats.lowStock}
          subtitle="Products need restocking"
          onClick={() => handleFiltersChange({ searchTerm: "low stock" })}
          className={stats.lowStock > 0 ? "ring-2 ring-yellow-200" : ""}
        />

        <StatsCard
          icon={<Icons.failed className="w-6 h-6 text-red-600" />}
          iconColor="bg-red-100"
          title="Out of Stock"
          value={stats.outOfStock}
          subtitle="Products unavailable"
          onClick={() => handleFiltersChange({ searchTerm: "out of stock" })}
          className={stats.outOfStock > 0 ? "ring-2 ring-red-200" : ""}
        />
      </div>

      {/* Action Bar */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Icons.product className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">
            {products.length} products filtered
          </span>
          {products.length !== stats.total && (
            <span className="text-xs text-gray-500">
              (of {stats.total} total)
            </span>
          )}
        </div>

        <Button asChild leftIcon="add">
          <Link to="/add-product">Add New Product</Link>
        </Button>
      </div>

      {/* Filters Component */}
      <ProductFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={clearFilters}
        availableCategories={availableCategories}
        className="mb-8"
      />

      {/* Products Table or Empty State */}
      {products.length === 0 && !isLoading ? (
        <EmptyState
          icon={<Icons.product className="w-full h-full" />}
          title="No products found"
          description="No products match your current filters. Try adjusting your search criteria or add your first product."
          primaryAction={{
            label: "Add Your First Product",
            onClick: () => window.location.href = "/add-product",
            icon: "add"
          }}
          secondaryAction={{
            label: "Clear Filters",
            onClick: clearFilters,
            icon: "close"
          }}
        />
      ) : (
        <ProductTable
          products={products}
          sortConfig={sortConfig}
          onSort={handleSort}
          onProductClick={handleProductClick}
          isLoading={isLoading}
        />
      )}
    </Layout>
  );
}

export default ProductList;