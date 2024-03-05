import axios from "axios";
import { API_BASE_URL } from "./apiRoute";

export const fetchProducts = async (setProducts, setIsLoading) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);

      if (response) {
        const data = await response.data;
        setProducts(data);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };