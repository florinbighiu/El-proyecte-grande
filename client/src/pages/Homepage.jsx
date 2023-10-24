import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { ShoppingCartIcon } from "@heroicons/react/solid";


function Homepage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products");
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

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <section className="bg-gradient-to-l from-neutral-600 via-fuchsia-200 to-current py-16 my-4 text-center rounded-lg shadow-md">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Discover the Best Deals</h1>
        <p className="text-lg text-gray-700 mb-8">
          Explore our wide range of products at amazing prices.
        </p>
        <Link to="/products">
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700">
            Shop Now
          </button>
        </Link>
      </section>

      <section className="py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-evenly bg-white p-4 rounded-lg shadow-lg backdrop-blur-md hover:cursor-pointer relative font-serif">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-contain mb-2"
              />
              <h3 className="text-lg text-center text-slate-800 font-semibold mt-2">
                {product.name}
              </h3>
              <h2 className="text-slate-950">{product.description}</h2>
              <p className="text-blue-500 text-lg font-bold">
                <strong>${product.price.toFixed(2)}</strong>
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.isInCart}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-fit  ${
                  product.isInCart ? "opacity-50 cursor-not-allowed" : ""
                }`}>
                <span>
                  <ShoppingCartIcon className="h-[24px] w-5" />
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-orange-100 border-1 border-slate-500 shadow-md py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <p className="text-lg text-gray-600">
              I love shopping at this store! The products are amazing, and the prices are
              unbeatable.
            </p>
            <p className="text-blue-500">- John Doe</p>
          </div>
          <div className="mb-4">
            <p className="text-lg text-gray-600">
              The customer service is top-notch. I received my order quickly and in perfect
              condition.
            </p>
            <p className="text-blue-500">- Jane Smith</p>
          </div>
        </div>
      </section>

      <section className="bg-indigo-700 text-center text-white py-16 mb-4 w-full">
        <h2 className="text-3xl font-extrabold mb-4">Ready to Shop?</h2>
        <p className="text-lg mb-8">
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
