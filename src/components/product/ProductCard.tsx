import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { Icons } from "@/components/icons";
import { formatters, productHelpers } from "@/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: number) => void;
  className?: string;
}

export function ProductCard({
  product,
  onEdit,
  onDelete,
  className = "",
}: ProductCardProps) {
  const stockStatus = productHelpers.getStockStatus(product.stock);

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow ${className}`}
    >
      {/* Product Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Link
            to={`/product/${product.id}`}
            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {product.name}
          </Link>
          <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        </div>

        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            product.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {product.status}
        </span>
      </div>

      {/* Product Image Placeholder */}
      <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
        <Icons.image className="w-8 h-8 text-gray-400" />
      </div>

      {/* Product Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Price</span>
          <span className="text-lg font-bold text-gray-900">
            {formatters.currency(product.price)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Stock</span>
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
          >
            {product.stock} units
          </span>
        </div>

        {/* Stock Level Bar */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Stock Level</span>
            <span>{stockStatus.label}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                product.stock > 20
                  ? "bg-green-500"
                  : product.stock > 0
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <Button variant="outline" size="sm" asChild className="flex-1">
          <Link to={`/product/${product.id}`}>
            <Icons.view className="w-4 h-4" />
            View
          </Link>
        </Button>

        {onEdit && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(product)}
            className="flex-1"
          >
            <Icons.edit className="w-4 h-4" />
            Edit
          </Button>
        )}

        {onDelete && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(product.id)}
          >
            <Icons.delete className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
