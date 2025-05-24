import { Link } from "react-router-dom";
import { useProductDetails } from "@/hooks";
import { Button } from "@/components/ui";
import { Layout } from "@/components/layout";
import { EmptyState, SkeletonProductDetails } from "@/components/common";
import { Icons } from "@/components/icons";

export function ProductDetails() {
  const { product, isLoading, handleGoBack, handleNavigateToProducts } =
    useProductDetails();

  if (isLoading) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Loading..." },
        ]}
      >
        <SkeletonProductDetails />
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Not Found" },
        ]}
      >
        <div className="flex items-center justify-center py-20">
          <EmptyState
            icon={<Icons.product className="w-full h-full" />}
            title="Product Not Found"
            description="The product you're looking for doesn't exist or may have been removed."
            primaryAction={{
              label: "View All Products",
              onClick: handleNavigateToProducts,
            }}
            secondaryAction={{
              label: "Go Back",
              onClick: handleGoBack,
            }}
          />
        </div>
      </Layout>
    );
  }

  const getStockStatus = () => {
    if (product.stock === 0)
      return {
        label: "Out of Stock",
        color: "bg-red-100 text-red-800",
        dot: "bg-red-500",
      };
    if (product.stock <= 10)
      return {
        label: "Low Stock",
        color: "bg-yellow-100 text-yellow-800",
        dot: "bg-yellow-500",
      };
    return {
      label: "In Stock",
      color: "bg-green-100 text-green-800",
      dot: "bg-green-500",
    };
  };

  const stockStatus = getStockStatus();

  return (
    <Layout
      breadcrumbs={[
        { label: "Products", href: "/products" },
        { label: product.name },
      ]}
    >
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Product Header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icons.product className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">
                      {product.name}
                    </h1>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-500">
                        #{product.id}
                      </span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleGoBack}>
                    <Icons.back className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Icons.edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="p-6 border-b border-gray-100">
              <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Icons.image className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No image available</p>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    Product Details
                  </h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Product ID</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        #{product.id}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Category</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {product.category}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Status</dt>
                      <dd>
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
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    Inventory & Pricing
                  </h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Unit Price</dt>
                      <dd className="text-sm font-medium text-gray-900 font-mono">
                        ${product.price.toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Stock Quantity</dt>
                      <dd className="text-sm font-medium text-gray-900 font-mono">
                        {product.stock} units
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Total Value</dt>
                      <dd className="text-sm font-medium text-gray-900 font-mono">
                        ${(product.price * product.stock).toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          {/* Stock Status Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Stock Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Current Stock</span>
                <span className="text-lg font-semibold text-gray-900 font-mono">
                  {product.stock}
                </span>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Stock Level</span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1 ${stockStatus.dot}`}
                    ></span>
                    {stockStatus.label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      product.stock === 0
                        ? "bg-red-500"
                        : product.stock <= 10
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min((product.stock / 50) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button
                className="w-full justify-start"
                variant="outline"
                size="sm"
              >
                <Icons.edit className="w-4 h-4 mr-2" />
                Edit Product
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                size="sm"
              >
                <Icons.copy className="w-4 h-4 mr-2" />
                Duplicate
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                size="sm"
                asChild
              >
                <Link to="/products">
                  <Icons.product className="w-4 h-4 mr-2" />
                  View All Products
                </Link>
              </Button>
            </div>
          </div>

          {/* Alerts */}
          {product.stock <= 10 && product.stock > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <Icons.warning className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">
                    Low Stock Alert
                  </h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Only {product.stock} units remaining. Consider restocking
                    soon.
                  </p>
                </div>
              </div>
            </div>
          )}

          {product.stock === 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start">
                <Icons.failed className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-red-800">
                    Out of Stock
                  </h4>
                  <p className="text-sm text-red-700 mt-1">
                    This product is currently unavailable for sale.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;
