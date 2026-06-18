import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import StarRating from "./StarRating";

const ProductCard = ({ product, handleAddToCart, quantity, handleDeleteProduct, handleOpenUpdateForm }) => {
  const { isAdmin, isAuthenticated } = useAuth();

  const discountedPrice =
    product.discountPercentage > 0
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;

  const addToCartLabel =
    product.stock === 0
      ? `${product.title} is out of stock`
      : !isAuthenticated
      ? `Log in to add ${product.title} to your cart`
      : `Add ${product.title} to cart`;

  return (
    <div className="group relative flex flex-col bg-white border border-clay-soft rounded-2xl shadow-sm hover:shadow-xl hover:shadow-clay/5 hover:-translate-y-1 transition duration-300 overflow-hidden">
      {product.discountPercentage > 0 && (
        <div className="absolute top-2.5 right-2.5 bg-clay text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
          -{product.discountPercentage.toFixed(0)}%
        </div>
      )}

      <Link to={`/product/${product.id}`} className="block">
        <div className="w-full h-32 sm:h-40 lg:h-48 bg-cream-deep flex items-center justify-center p-3 sm:p-4 border-b border-clay-soft overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-2.5 sm:p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="block mb-1.5 sm:mb-2">
          <h3 className="font-semibold text-xs sm:text-sm text-ink truncate group-hover:text-clay-dark transition-colors">{product.title}</h3>
          <p className="hidden sm:block text-ink-soft text-xs mt-0.5 line-clamp-2 leading-relaxed">{product.description}</p>
        </Link>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2 sm:mb-3">
          <StarRating product={product} />
          <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${product.stock > 0 ? "bg-cream-deep text-ink-soft" : "bg-red-100 text-red-500"}`}>
            {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
            <span className="text-sm sm:text-lg font-bold text-ink">${discountedPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-[10px] sm:text-xs text-ink-soft/60 line-through">${product.price.toFixed(2)}</span>
            )}
          </div>

          <button
            onClick={() => handleAddToCart(product, product.id, quantity)}
            disabled={product.stock === 0}
            aria-label={addToCartLabel}
            className={`w-full py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
              product.stock === 0
                ? "bg-cream-deep text-ink-soft/50 cursor-not-allowed"
                : "bg-ink hover:bg-clay text-cream"
            }`}>
            {product.stock === 0 ? "Out of stock" : "Add to Cart"}
          </button>

          {isAdmin && (
            <div className="flex gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="flex-1 border border-red-200 text-red-500 hover:bg-red-50 text-[10px] sm:text-xs py-1 sm:py-1.5 rounded-full transition-colors">
                Delete
              </button>
              <button
                onClick={() => handleOpenUpdateForm(product.id)}
                className="flex-1 border border-clay-soft text-clay-dark hover:bg-clay-soft text-[10px] sm:text-xs py-1 sm:py-1.5 rounded-full transition-colors">
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
