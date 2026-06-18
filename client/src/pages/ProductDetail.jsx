import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiArrowLeft,
} from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../api/apiService";
import Loading from "../layout/Loading";
import StarRating from "../components/StarRating";

const LOW_STOCK_THRESHOLD = 25;

const ProductDetail = () => {
  const { productId } = useParams();
  const { isAuthenticated, userId } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

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
      toast.error("This product is out of stock.");
      return;
    }
    setAddingToCart(true);
    try {
      await apiService.post(`/cart/add/${userId}/${productId}/${qty}`);
      toast.success(`Added ${qty} to cart!`);
      setProduct((prev) => ({ ...prev, stock: prev.stock - qty }));
      setQty(1);
    } catch {
      toast.error("Failed to add to cart. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <Loading />;
  if (error)
    return <div className="max-w-6xl mx-auto px-4 py-16 text-center text-red-500">Error: {error}</div>;
  if (!product)
    return <div className="max-w-6xl mx-auto px-4 py-16 text-center text-ink-soft">Product not found.</div>;

  const discountedPrice =
    product.discountPercentage > 0
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;

  const soldOut = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock < LOW_STOCK_THRESHOLD;
  const maxQty = Math.max(1, product.stock);

  const addToCartLabel = soldOut
    ? `${product.title} is out of stock`
    : !isAuthenticated
    ? `Log in to add ${product.title} to your cart`
    : addingToCart
    ? `Adding ${product.title} to cart`
    : `Add ${product.title} to cart`;

  const specs = [
    { label: "Brand", value: product.brand || "—" },
    { label: "Category", value: product.category, capitalize: true },
    { label: "Rating", value: `${product.rating?.toFixed(1) ?? "—"} / 5` },
    {
      label: "Availability",
      value: soldOut ? "Out of stock" : isLowStock ? `Only ${product.stock} left` : `${product.stock} in stock`,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-ink-soft mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-clay transition-colors">Home</Link>
        <FiChevronRight size={12} className="text-ink-soft/50" />
        <Link to="/products" className="hover:text-clay transition-colors">Shop</Link>
        <FiChevronRight size={12} className="text-ink-soft/50" />
        <span className="text-ink font-medium truncate capitalize">{product.category}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* image */}
        <div className="lg:sticky lg:top-20 self-start">
          <div className="relative bg-white border border-clay-soft rounded-2xl flex items-center justify-center p-8 sm:p-12 min-h-[24rem] lg:min-h-[32rem] overflow-hidden">
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-clay text-white text-xs font-bold px-2.5 py-1 rounded-full">
                −{product.discountPercentage.toFixed(0)}% OFF
              </span>
            )}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-[20rem] lg:max-h-[26rem] max-w-full object-contain"
            />
          </div>
        </div>

        {/* info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-clay-dark mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-3">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mb-5">
            <StarRating product={product} />
            <span className="text-sm text-ink-soft">({product.rating?.toFixed(1)})</span>
          </div>

          <div className="flex items-baseline gap-3 mb-5">
            <span className="text-4xl font-extrabold text-ink">${discountedPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-ink-soft/60 line-through text-lg">${product.price.toFixed(2)}</span>
                <span className="bg-clay-soft text-clay-dark text-xs font-bold px-2 py-0.5 rounded-full">
                  Save {product.discountPercentage.toFixed(0)}%
                </span>
              </>
            )}
          </div>

          <p className="text-ink-soft leading-relaxed mb-7">{product.description}</p>

          {/* spec list */}
          <dl className="border-t border-clay-soft mb-7">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-center justify-between py-2.5 border-b border-clay-soft text-sm">
                <dt className="text-ink-soft">{spec.label}</dt>
                <dd className={`font-medium text-ink ${spec.capitalize ? "capitalize" : ""}`}>{spec.value}</dd>
              </div>
            ))}
          </dl>

          {/* quantity + add to cart */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex items-center border border-clay-soft rounded-full bg-white shrink-0 self-start">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={soldOut || qty <= 1}
                aria-label="Decrease quantity"
                className="w-11 h-11 flex items-center justify-center text-ink-soft hover:text-clay disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FiMinus size={15} />
              </button>
              <span className="w-10 text-center font-semibold text-ink tabular-nums" aria-live="polite">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                disabled={soldOut || qty >= maxQty}
                aria-label="Increase quantity"
                className="w-11 h-11 flex items-center justify-center text-ink-soft hover:text-clay disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FiPlus size={15} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={soldOut || addingToCart}
              aria-label={addToCartLabel}
              className={`flex-1 py-3 rounded-full font-bold text-cream transition-colors flex items-center justify-center gap-2 ${
                soldOut ? "bg-ink-soft/40 cursor-not-allowed" : "bg-ink hover:bg-clay"
              } disabled:opacity-70`}
            >
              {addingToCart ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-cream" />
              ) : soldOut ? (
                "Out of stock"
              ) : (
                "Add to cart"
              )}
            </button>
          </div>

          {/* trust row */}
          <div className="grid grid-cols-3 gap-3 py-4 border-y border-clay-soft text-center">
            {[
              { icon: FiTruck, label: "Free over $75" },
              { icon: FiRefreshCw, label: "30-day returns" },
              { icon: FiShield, label: "Secure checkout" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-xs text-ink-soft">
                <Icon size={18} className="text-clay" />
                {label}
              </div>
            ))}
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 mt-6 text-sm text-clay-dark hover:text-clay font-medium"
          >
            <FiArrowLeft size={14} /> Back to all products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
