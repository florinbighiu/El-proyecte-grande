import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../api/apiService";
import Loading from "../layout/Loading";
import StarRating from "../components/StarRating";
import { defaultQuantity } from "../utils/authConstants";

const LOW_STOCK_THRESHOLD = 25;

const ProductDetail = () => {
  const { productId } = useParams();
  const { isAuthenticated, userId } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    if (product.stock <= 0) {
      toast.error("Product is out of stock!");
      return;
    }
    setAddingToCart(true);
    try {
      await apiService.post(`/cart/add/${userId}/${productId}/${defaultQuantity}`);
      toast.success("Added to cart!");
      setProduct((prev) => ({ ...prev, stock: prev.stock - defaultQuantity }));
    } catch {
      toast.error("Failed to add to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-xl mt-8">Error: {error}</div>;
  if (!product) return <div className="text-gray-500 text-xl mt-8">Product not found.</div>;

  const discountedPrice =
    product.discountPercentage > 0
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;

  const isLowStock = product.stock > 0 && product.stock < LOW_STOCK_THRESHOLD;

  const addToCartLabel =
    product.stock === 0
      ? `${product.title} is out of stock`
      : !isAuthenticated
      ? `Log in to add ${product.title} to your cart`
      : addingToCart
      ? `Adding ${product.title} to cart`
      : `Add ${product.title} to cart`;

  return (
    <div className="w-full mt-10 md:p-6 flex flex-col lg:flex-row items-start gap-8">
      <div className="w-full lg:w-1/2 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center p-8 min-h-[28rem]">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-[24rem] max-w-full object-contain"
        />
      </div>

      <div className="w-full lg:w-1/2 text-black">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-1">{product.category}</p>
        <h1 className="text-3xl font-extrabold text-slate-800 uppercase tracking-tight mb-3">
          {product.title}
        </h1>
        <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>

        <div className="mb-4">
          <StarRating product={product} />
        </div>

        <div className="mb-4">
          <span className="text-3xl font-bold text-red-500">${discountedPrice.toFixed(2)}</span>
          {product.discountPercentage > 0 && (
            <span className="ml-3 text-gray-400 line-through text-lg">${product.price.toFixed(2)}</span>
          )}
          {product.discountPercentage > 0 && (
            <span className="ml-3 bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
              -{product.discountPercentage.toFixed(0)}% OFF
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-sm mb-6">
          <span className="bg-gray-100 px-3 py-1.5 rounded-full">
            Brand: <strong>{product.brand}</strong>
          </span>
          <span className={`px-3 py-1.5 rounded-full ${product.stock === 0 ? "bg-red-100 text-red-600" : isLowStock ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"}`}>
            {product.stock === 0 ? "Out of stock" : isLowStock ? `Only ${product.stock} left!` : `${product.stock} in stock`}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || addingToCart}
          aria-label={addToCartLabel}
          className={`w-full py-3 rounded-full font-bold text-white text-lg transition flex items-center justify-center gap-2 ${
            product.stock === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          } disabled:opacity-70`}>
          {addingToCart ? (
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
          ) : product.stock === 0 ? (
            "Out of Stock"
          ) : (
            "Add to Cart"
          )}
        </button>

        <Link
          to="/products"
          className="block text-center mt-4 text-indigo-600 hover:underline text-sm">
          ← Back to products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
