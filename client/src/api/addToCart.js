import { API_BASE_URL } from "../api/apiRoute.js";
import axios from "axios";
import toast from "react-hot-toast";
import { getToken, getUserId } from "../utils/authConstants.js";

export const handleAddToCart = async (product, productId, quantity, setProducts) => {
  const token = getToken();
  const userId = getUserId();

  try {
    if (product.stock > 0) {
      const response = await axios.post(
        `${API_BASE_URL}/cart/add/${userId}/${productId}/${quantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product added to the cart!");
        setProducts((prevProducts) =>
          prevProducts.map((prevProduct) =>
            prevProduct.id === productId
              ? { ...prevProduct, stock: prevProduct.stock - quantity }
              : prevProduct
          )
        );
      } else {
        toast.error("Failed to add the product!");
      }
    } else {
      toast.error("Product is out of stock!");
    }
  } catch (error) {
    toast.error("An error occured!");
    console.log(error.message);
  }
};
