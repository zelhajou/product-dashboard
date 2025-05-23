import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Select } from "@/components/ui";
import { Icons } from "@/components/icons";
import type { Product, ProductFormData } from "@/types";

// Validation schema
const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters"),

  price: z
    .number()
    .min(0.01, "Price must be greater than 0")
    .max(999999.99, "Price must be less than $1,000,000"),

  stock: z
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .max(999999, "Stock must be less than 1,000,000"),

  category: z.string().min(1, "Category is required"),

  status: z.enum(["active", "archived"], {
    required_error: "Status is required",
  }),
});

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  className?: string;
}

export function ProductForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = "Save Product",
  className = "",
}: ProductFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      price: initialData?.price || 0,
      stock: initialData?.stock || 0,
      category: initialData?.category || "",
      status: initialData?.status || "active",
    },
    mode: "onChange",
  });

  const handleFormSubmit = async (data: ProductFormData) => {
    setSubmitError(null);
    try {
      await onSubmit(data);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to save product"
      );
    }
  };

  const categoryOptions = [
    { value: "Electronics", label: "Electronics" },
    { value: "Accessories", label: "Accessories" },
    { value: "Storage", label: "Storage" },
    { value: "Computing", label: "Computing" },
    { value: "Audio", label: "Audio & Video" },
    { value: "Gaming", label: "Gaming" },
    { value: "Networking", label: "Networking" },
    { value: "Other", label: "Other" },
  ];

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
        {/* Form Header */}
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {initialData
              ? "Update the product information below"
              : "Fill in the details to add a new product to your inventory"}
          </p>
        </div>

        {/* Product Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Icons.info className="w-5 h-5 text-gray-500" />
            Product Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Product Name *"
                placeholder="Enter product name..."
                error={errors.name?.message}
                {...register("name")}
              />
            </div>

            <Select
              label="Category *"
              placeholder="Select a category..."
              error={errors.category?.message}
              {...register("category")}
              options={categoryOptions}
            />

            <Select
              label="Status *"
              error={errors.status?.message}
              {...register("status")}
              options={[
                { value: "active", label: "Active" },
                { value: "archived", label: "Archived" },
              ]}
            />
          </div>
        </div>

        {/* Pricing & Inventory Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Icons.dollar className="w-5 h-5 text-gray-500" />
            Pricing & Inventory
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Price *"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              error={errors.price?.message}
              leftIcon={<span className="text-gray-500 font-medium">$</span>}
              {...register("price", { valueAsNumber: true })}
            />

            <Input
              label="Stock Quantity *"
              type="number"
              min="0"
              placeholder="0"
              error={errors.stock?.message}
              helperText="Number of units in inventory"
              {...register("stock", { valueAsNumber: true })}
            />
          </div>
        </div>


        {/* Error Display */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <Icons.error className="w-5 h-5 text-red-600 mr-3" />
              <span className="text-red-800">{submitError}</span>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!isValid || !isDirty || isLoading}
            className="sm:order-2"
            leftIcon={initialData ? "check" : "add"}
          >
            {isLoading ? "Saving..." : submitLabel}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            disabled={isLoading || !isDirty}
            className="sm:order-1"
            leftIcon="reset"
          >
            Reset Form
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isLoading}
              className="sm:order-3"
            >
              Cancel
            </Button>
          )}
        </div>

        {/* Form Status Indicator */}
        <div className="text-sm flex items-center gap-2">
          {isValid && isDirty ? (
            <>
              <Icons.success className="w-4 h-4 text-green-500" />
              <span className="text-green-700">
                Form is valid and ready to submit
              </span>
            </>
          ) : (
            <>
              <Icons.info className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">
                {!isDirty
                  ? "Make changes to enable saving"
                  : "Please fill in all required fields"}
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProductForm;