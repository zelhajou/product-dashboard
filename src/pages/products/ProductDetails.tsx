import { Link } from "react-router-dom";
import { useProductDetails } from "@/hooks";
import { Button } from "@/components/ui";
import { Layout } from "@/components/layout";
import { 
  LoadingSpinner, 
  EmptyState, 
  InfoCard, 
  AlertCard 
} from "@/components/common";
import { Icons } from "@/components/icons";

export function ProductDetails() {
  const {
    product,
    isLoading,
    handleGoBack,
    handleEdit,
    handleNavigateToProducts,
  } = useProductDetails();

  if (isLoading) {
    return (
      <Layout
        title="Product Details"
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Loading..." }
        ]}
      >
        <LoadingSpinner size="lg" message="Loading product details..." />
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout
        title="Product Not Found"
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "Not Found" }
        ]}
      >
        <EmptyState
          icon={<Icons.product className="w-full h-full" />}
          title="Product Not Found"
          description="The product you're looking for doesn't exist or may have been removed."
          primaryAction={{
            label: "View All Products",
            onClick: handleNavigateToProducts,
            icon: "product"
          }}
          secondaryAction={{
            label: "Go Back",
            onClick: handleGoBack,
            icon: "back"
          }}
          size="lg"
        />
      </Layout>
    );
  }

  return (
    <Layout
      title={product.name}
      description={`Product details for ${product.name} in ${product.category}`}
      breadcrumbs={[
        { label: "Products", href: "/products" },
        { label: product.name }
      ]}
    >
      {/* Action Bar */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <span className="text-lg text-gray-600">{product.category}</span>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              product.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {product.status}
          </span>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleGoBack}
            leftIcon="back"
          >
            Back
          </Button>
          <Button variant="secondary" leftIcon="edit" onClick={handleEdit}>
            Edit Product
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {product.stock <= 10 && product.stock > 0 && (
        <div className="mb-6">
          <AlertCard
            type="warning"
            title="Low Stock Alert"
            description={`This product has only ${product.stock} units left in stock`}
            action={
              <Button size="sm" asChild leftIcon="add">
                <Link to="/add-product">Restock Product</Link>
              </Button>
            }
          />
        </div>
      )}

      {product.stock === 0 && (
        <div className="mb-6">
          <AlertCard
            type="error"
            title="Out of Stock"
            description="This product is currently out of stock and unavailable for sale"
            action={
              <Button size="sm" asChild leftIcon="add">
                <Link to="/add-product">Restock Now</Link>
              </Button>
            }
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Image Placeholder */}
        <div className="lg:col-span-2">
          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center">
              <Icons.image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Product Image</p>
              <Button variant="outline" size="sm" className="mt-3" leftIcon="upload">
                Upload Image
              </Button>
            </div>
          </div>
        </div>

        {/* Product Info Sidebar */}
        <div className="space-y-6">
          {/* Price Card */}
          <InfoCard
            title="Pricing"
            icon={<Icons.dollar className="w-5 h-5 text-green-600" />}
            variant="elevated"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ${product.price.toFixed(2)}
              </div>
              <p className="text-gray-600">Current Price</p>
            </div>
          </InfoCard>

          {/* Stock Card */}
          <InfoCard
            title="Stock Level"
            icon={<Icons.product className="w-5 h-5 text-blue-600" />}
            variant="elevated"
            headerAction={
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 20
                    ? "bg-green-100 text-green-800"
                    : product.stock > 0
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock > 20
                  ? "In Stock"
                  : product.stock > 0
                  ? "Low Stock"
                  : "Out of Stock"}
              </span>
            }
          >
            <div className="text-2xl font-bold text-gray-900 mb-4">
              {product.stock} units
            </div>

            {/* Stock level indicator */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  product.stock > 20
                    ? "bg-green-500"
                    : product.stock > 0
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${Math.min((product.stock / 50) * 100, 100)}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              Stock level: {Math.min((product.stock / 50) * 100, 100).toFixed(0)}%
            </p>
          </InfoCard>

          {/* Product Details */}
          <InfoCard
            title="Product Details"
            icon={<Icons.info className="w-5 h-5 text-gray-600" />}
          >
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Product ID</dt>
                <dd className="text-sm text-gray-900">#{product.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="text-sm text-gray-900">{product.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="text-sm text-gray-900 capitalize">
                  {product.status}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">
                  Stock Units
                </dt>
                <dd className="text-sm text-gray-900">{product.stock}</dd>
              </div>
            </dl>
          </InfoCard>

          {/* Actions */}
          <InfoCard
            title="Quick Actions"
            icon={<Icons.settings className="w-5 h-5 text-gray-600" />}
          >
            <div className="space-y-3">
              <Button className="w-full" variant="outline" leftIcon="edit" onClick={handleEdit}>
                Edit Product
              </Button>
              <Button className="w-full" variant="secondary" leftIcon="copy">
                Duplicate Product
              </Button>
              <Button className="w-full" variant="outline" leftIcon="download">
                Export Details
              </Button>
            </div>
          </InfoCard>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails;