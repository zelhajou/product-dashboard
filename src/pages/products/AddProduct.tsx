import { useProductForm } from "@/hooks";
import { ProductForm } from "@/components/product";
import { Layout } from "@/components/layout";

export function AddProduct() {
  const { handleSubmit, handleCancel, isLoading } = useProductForm();

  return (
    <Layout
      breadcrumbs={[
        { label: "Products", href: "/products" },
        { label: "Add Product" }
      ]}
    >
      {/* Main Form*/}
      <ProductForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
        submitLabel="Add Product"
        className="w-full max-w-none"
      />
    </Layout>
  );
}

export default AddProduct;