import { useProductForm } from "@/hooks";
import { ProductForm } from "@/components/product";
import { Layout } from "@/components/layout";


export function AddProduct() {
  const { handleSubmit, handleCancel, isLoading } = useProductForm();

  return (
    <Layout
      title="Add New Product"
      description="Fill in the details below to add a new product to your inventory"
      breadcrumbs={[
        { label: "Products", href: "/products" },
        { label: "Add Product" }
      ]}
    >

      {/* Product Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-2">
          <ProductForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
            submitLabel="Add Product"
          />
        </div>

      </div>
    </Layout>
  );
}

export default AddProduct;