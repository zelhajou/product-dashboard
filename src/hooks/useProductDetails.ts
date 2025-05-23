import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "@/store";
import type { Product } from "@/types";

export function useProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getProductById = useProductStore((state) => state.getProductById);
  const loadProducts = useProductStore((state) => state.loadProducts);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setProduct(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        await loadProducts();
        const foundProduct = getProductById(Number(id));
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Error loading product:", error);
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id, getProductById, loadProducts]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    if (product) {
      console.log("Edit product:", product.id);
    }
  };

  const handleNavigateToProducts = () => {
    navigate("/products");
  };

  return {
    product,
    isLoading,
    productId: id ? Number(id) : null,
    handleGoBack,
    handleEdit,
    handleNavigateToProducts,
  };
}