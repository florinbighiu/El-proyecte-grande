import apiService from "./apiService";

export const fetchProducts = async (setProducts, setIsLoading) => {
  try {
    const response = await apiService.get("/products");
    setProducts(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    setIsLoading(false);
  }
};
