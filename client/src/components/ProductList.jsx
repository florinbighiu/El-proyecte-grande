import { ShoppingCartIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await axios.put(`http://localhost:8080/cart/products/add/${product.id}`);

      setProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.id === product.id ? { ...prevProduct, isInCart: true } : prevProduct
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container m-0.5 p-4 text-slate-500 dark:text-slate-400 rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out backdrop-blur-md hover:cursor-pointer relative"
          >
            <img src={product.image} alt={product.title} className="w-full h-60 object-fit" />
            <h3 className="text-lg text-slate-800 font-semibold mt-2">{product.title}</h3>
            <p className="text-slate-950">${product.price.toFixed(2)}</p>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={product.isInCart}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute bottom-4 right-4 ${
                product.isInCart ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span>
                <ShoppingCartIcon className="h-5 w-5" />
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
