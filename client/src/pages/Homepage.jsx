import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Loading from "../layout/Loading.jsx"

import { ShoppingCartIcon } from "@heroicons/react/solid";


function Homepage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const token = localStorage.getItem("authToken");


  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response) {
        setProducts(response.data);
        setIsLoading(false)
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

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <section className="bg-transparent py-16 my-4 text-center rounded-lg">
        <h1 className="mt-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-4xl font-extrabold uppercase tracking-tighter text-transparent sm:text-5xl lg:text-7xl">Discover the Best Deals</h1>
        <p className="order-first bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text font-medium tracking-wide text-transparent m-3">
          Explore our wide range of products at amazing prices.
        </p>
        <Link to="/products">
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700">
            Shop Now
          </button>
        </Link>
      </section>

      <section className="py-12 px-4">
        {isLoading ? (
            <Loading />
        ) : (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Featured Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                    <div key={product.id} className="flex flex-col justify-evenly bg-gray-800 p-4 rounded-lg shadow-lg backdrop-blur-md hover:cursor-pointer relative font-serif">
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full p-2">
                        New
                      </div>
                      <img src={product.image} alt={product.name} className="w-full h-80 rounded-md mb-4" />
                      <h3 className="font-extrabold text-xl text-white  uppercase mb-1">{product.name}</h3>
                      <h2 className="text-white">{product.description}</h2>
                      <p className="text-yellow-400 text-xl font-semibold mt-2">
                        <strong>${product.price.toFixed(2)}</strong>
                      </p>
                      <button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.isInCart}
                          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full  ${
                              product.isInCart ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                      >
                        {product.isInCart ? "In Cart" : "Add to Cart"}
                      </button>
                    </div>
                ))}
              </div>
            </div>
        )}
      </section>


      <section className="bg-transparent border border-gray-700 shadow-md py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">What Our Customers Say</h2>
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <p className="text-lg text-gray-100">
              I love shopping at this store! The products are amazing, and the prices are
              unbeatable.
            </p>
            <p className="text-blue-500">- John Doe</p>
          </div>
          <div className="mb-4">
            <p className="text-lg text-gray-100">
              The customer service is top-notch. I received my order quickly and in perfect
              condition.
            </p>
            <p className="text-blue-500">- Jane Smith</p>
          </div>
        </div>
      </section>

      <section className="bg-transparent text-center text-white py-16 mb-4 w-full">
        <h2 className="mt-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-4xl font-extrabold uppercase tracking-tighter text-transparent sm:text-5xl lg:text-7xl">Ready to Shop?</h2>
        <p className="order-first bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text font-medium tracking-wide text-transparent m-3">
          Start exploring our products and find your next favorite item.
        </p>
        <Link to="/products">
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-500">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Homepage;
