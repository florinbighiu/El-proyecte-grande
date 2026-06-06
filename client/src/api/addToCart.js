import apiService from "./apiService";
import toast from "react-hot-toast";
import { getUserId } from "../utils/authConstants";

export const handleAddToCart = async (product, productId, quantity, setProducts) => {
  const userId = getUserId();

  if (!userId) {
    toast.error("Please log in to add items to your cart.");
    return;
  }

  if (product.stock <= 0) {
    toast.error("Product is out of stock!");
    return;
  }

  try {
    const response = await apiService.post(`/cart/add/${userId}/${productId}/${quantity}`);
    if (response.status === 200) {
      toast.success("Added to cart!");
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, stock: p.stock - quantity } : p
        )
      );
    }
  } catch {
    toast.error("Failed to add to cart. Please try again.");
  }
};
