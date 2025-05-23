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
    watch,
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

  const watchedValues = watch();

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

  const getCompletionPercentage = () => {
    const fields = [
      watchedValues.name,
      watchedValues.category,
      watchedValues.price,
      watchedValues.stock !== undefined,
      watchedValues.status
    ];
    const completed = fields.filter(Boolean).length;
    return Math.round((completed / fields.length) * 100);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {initialData ? "Edit Product" : "Add Product"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {initialData
                  ? "Update product information"
                  : "Create a new product in your inventory"}
              </p>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">
                  {getCompletionPercentage()}% Complete
                </div>
                <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Information */}
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-2">
                  <h3 className="text-base font-medium text-gray-900">Product Information</h3>
                  <p className="text-sm text-gray-500">Basic details about your product</p>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Product Name"
                    placeholder="Enter product name"
                    error={errors.name?.message}
                    {...register("name")}
                    className="font-mono"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Category"
                      placeholder="Select category"
                      error={errors.category?.message}
                      {...register("category")}
                      options={categoryOptions}
                    />

                    <Select
                      label="Status"
                      error={errors.status?.message}
                      {...register("status")}
                      options={[
                        { value: "active", label: "Active" },
                        { value: "archived", label: "Archived" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-2">
                  <h3 className="text-base font-medium text-gray-900">Pricing & Inventory</h3>
                  <p className="text-sm text-gray-500">Set pricing and manage stock levels</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    error={errors.price?.message}
                    leftIcon={<span className="text-gray-500">$</span>}
                    {...register("price", { valueAsNumber: true })}
                    className="font-mono"
                  />

                  <Input
                    label="Stock Quantity"
                    type="number"
                    min="0"
                    placeholder="0"
                    error={errors.stock?.message}
                    {...register("stock", { valueAsNumber: true })}
                    className="font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="space-y-6">
              {/* Product Preview */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Product Preview</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-medium text-gray-900 truncate ml-2">
                      {watchedValues.name || "—"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Category:</span>
                    <span className="font-medium text-gray-900">
                      {watchedValues.category || "—"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-medium text-gray-900 font-mono">
                      ${watchedValues.price?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Stock:</span>
                    <span className="font-medium text-gray-900 font-mono">
                      {watchedValues.stock || 0} units
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      watchedValues.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {watchedValues.status || 'active'}
                    </span>
                  </div>

                  {watchedValues.price && watchedValues.stock && (
                    <>
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-gray-700">Total Value:</span>
                          <span className="text-gray-900 font-mono">
                            ${(watchedValues.price * watchedValues.stock).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Level Indicator */}
              {watchedValues.stock !== undefined && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Stock Level</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Current Stock:</span>
                      <span className="font-medium text-gray-900 font-mono">
                        {watchedValues.stock} units
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          watchedValues.stock === 0
                            ? "bg-red-500"
                            : watchedValues.stock <= 10
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${Math.min((watchedValues.stock / 50) * 100, 100)}%` }}
                      />
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {watchedValues.stock === 0 
                        ? "Out of stock" 
                        : watchedValues.stock <= 10 
                        ? "Low stock - consider restocking" 
                        : "Stock level is healthy"}
                    </div>
                  </div>
                </div>
              )}

              {/* Form Status */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Form Status</h4>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Completion:</span>
                    <span className="font-medium text-gray-900">
                      {getCompletionPercentage()}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Status:</span>
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                      isValid && isDirty 
                        ? 'text-green-700' 
                        : 'text-gray-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        isValid && isDirty ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                      {isValid && isDirty ? 'Ready to save' : 'Incomplete'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {submitError && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <Icons.error className="w-5 h-5 text-red-600 mr-3" />
                <span className="text-red-800 text-sm">{submitError}</span>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                disabled={isLoading || !isDirty}
                size="sm"
                leftIcon="reset"
              >
                Reset
              </Button>
              
              {onCancel && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isLoading}
                  size="sm"
                >
                  Cancel
                </Button>
              )}
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!isValid || !isDirty || isLoading}
              leftIcon={initialData ? "check" : "add"}
            >
              {isLoading ? "Saving..." : submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;