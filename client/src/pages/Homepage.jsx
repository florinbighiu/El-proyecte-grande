/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import ProductCard from "../components/ProductCard.jsx";
import ProductForm from "../components/ProductForm.tsx";
import Loading from "../layout/Loading.jsx";
import apiService from "../api/apiService.js";
import { useAuth } from "../contexts/AuthContext.jsx";

const TestimonialCard = ({ quote, author }) => (
  <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl p-8 shadow-sm text-left">
    <div className="text-indigo-300 text-5xl font-serif leading-none mb-3">"</div>
    <p className="text-slate-600 text-base leading-relaxed mb-6">{quote}</p>
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-sm">
        {author[0]}
      </div>
      <span className="text-slate-800 font-semibold text-sm">{author}</span>
    </div>
  </div>
);

const Homepage = () => {
  const { userId, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    apiService
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => console.error("Failed to fetch products"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleAddToCart = async (product, productId, quantity) => {
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    if (product.stock <= 0) {
      toast.error("Product is out of stock!");
      return;
    }
    try {
      await apiService.post(`/cart/add/${userId}/${productId}/${quantity}`, {});
      toast.success("Added to cart!");
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, stock: p.stock - quantity } : p
        )
      );
    } catch {
      toast.error("Could not add to cart. Please try again.");
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleOpenUpdateForm = (productId) => {
    const product = products.find((p) => p.id === productId);
    setProductIdToUpdate(productId);
    setEditedProduct({ ...product });
    setShowUpdateForm(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await apiService.put(`/products/${productIdToUpdate}`, editedProduct);
      setProducts((prev) => prev.map((p) => (p.id === productIdToUpdate ? response.data : p)));
      toast.success("Product updated successfully!");
      setShowUpdateForm(false);
    } catch {
      toast.error("Failed to update product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await apiService.delete(`/products/${productId}`);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      toast.success("Product deleted.");
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const featuredProducts = products.slice(0, 4);
  const quantity = 1;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <section className="py-24 text-center">
        <div className="inline-block mb-5 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold tracking-wide uppercase">
          New arrivals every week
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-800 tracking-tight leading-tight mb-5">
          Discover the<br />
          <span className="text-indigo-600">Best Deals</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto mb-8">
          Explore our wide range of products at amazing prices, delivered straight to your door.
        </p>
        <Link to="/products">
          <button className="bg-indigo-500 text-white py-3 px-8 rounded-full hover:bg-indigo-600 font-semibold shadow-lg shadow-indigo-200 transition">
            Shop Now
          </button>
        </Link>
      </section>

      <section className="py-12 mb-16">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Featured Products</h2>
              <Link to="/products" className="text-indigo-600 hover:underline text-sm font-medium">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  handleAddToCart={handleAddToCart}
                  handleDeleteProduct={handleDeleteProduct}
                  handleOpenUpdateForm={handleOpenUpdateForm}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {showUpdateForm && (
        <ProductForm
          {...editedProduct}
          errors={errors}
          isAddOrEditProduct={false}
          handleInputChange={handleEditInputChange}
          onSaveProduct={handleUpdateProduct}
          onClose={() => setShowUpdateForm(false)}
        />
      )}

      <section className="my-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">What Our Customers Say</h2>
          <p className="text-slate-500 text-sm">Real reviews from real shoppers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TestimonialCard
            quote="I love shopping at this store! The products are amazing, and the prices are unbeatable."
            author="John Doe"
          />
          <TestimonialCard
            quote="The customer service is top-notch. I received my order quickly and in perfect condition."
            author="Jane Smith"
          />
        </div>
      </section>

      <section className="my-16 rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white py-16 px-8 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight mb-3">Ready to Shop?</h2>
        <p className="text-indigo-100 text-base mb-8 max-w-md mx-auto">
          Start exploring our products and find your next favorite item.
        </p>
        <Link to="/products">
          <button className="bg-white text-indigo-700 py-3 px-8 rounded-full hover:bg-indigo-50 font-semibold shadow-lg transition">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Homepage;