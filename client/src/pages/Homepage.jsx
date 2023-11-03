import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import ProductCard from "../components/ProductCard.jsx";
import Loading from "../layout/Loading.jsx";

function Homepage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("authToken");
  const quantity = 1;

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        setProducts(response.data);
        setIsLoading(false);
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

  const handleAddToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(`http://localhost:8080/cart/add/${productId}/${quantity}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Product added to the cart!");
      } else {
        toast.error("Failed to add the product!");
      }
    } catch (error) {
      console.error("Error adding product to the cart", error);
      alert("An error occurred while adding the product to the cart");
    }
  };

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <section className="bg-transparent py-16 mt-4 text-center rounded-lg">
        <h1 className="mt-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-4xl font-extrabold uppercase tracking-tighter text-transparent sm:text-5xl lg:text-7xl">
          Discover the Best Deals
        </h1>
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
            <h2 className="m-1 px-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-3xl w-fit font-extrabold uppercase tracking-tighter text-transparent">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} quantity={quantity} handleAddToCart={handleAddToCart} />
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

      <section className="bg-transparent text-center text-white py-16 w-full">
        <h2 className="mt-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-4xl font-extrabold uppercase tracking-tighter text-transparent sm:text-5xl lg:text-7xl">
          Ready to Shop?
        </h2>
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
