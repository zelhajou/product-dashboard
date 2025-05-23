import { useNavigate } from "react-router-dom";
import { useProductStore } from "@/store";
import type { ProductFormData } from "@/types";

export function useProductForm() {
  const navigate = useNavigate();
  const addProduct = useProductStore((state) => state.addProduct);
  const isLoading = useProductStore((state) => state.isLoading);

  const handleSubmit = async (data: ProductFormData) => {
    await addProduct(data);
    navigate("/products", {
      state: {
        message: `Product "${data.name}" has been added successfully!`,
        type: "success",
      },
    });
  };

  const handleCancel = () => {
    navigate("/products");
  };

  return {
    handleSubmit,
    handleCancel,
    isLoading,
  };
}