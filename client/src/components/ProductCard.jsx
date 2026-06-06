import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import StarRating from "./StarRating";

const ProductCard = ({ product, handleAddToCart, quantity, handleDeleteProduct, handleOpenUpdateForm }) => {
  const { isAdmin } = useAuth();

  const discountedPrice =
    product.discountPercentage > 0
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;

  return (
    <div className="relative flex flex-col bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {product.discountPercentage > 0 && (
        <div className="absolute top-2.5 right-2.5 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
          -{product.discountPercentage.toFixed(0)}%
        </div>
      )}

      <Link to={`/product/${product.id}`} className="block">
        <div className="w-full h-48 bg-slate-50 flex items-center justify-center p-4 border-b border-gray-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="font-semibold text-sm text-slate-800 truncate">{product.title}</h3>
          <p className="text-slate-400 text-xs mt-0.5 line-clamp-2 leading-relaxed">{product.description}</p>
        </Link>

        <div className="flex items-center justify-between mb-3">
          <StarRating product={product} />
          <span className={`text-xs px-2 py-0.5 rounded-full ${product.stock > 0 ? "bg-slate-100 text-slate-500" : "bg-red-100 text-red-500"}`}>
            {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-slate-800">${discountedPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-slate-400 line-through">${product.price.toFixed(2)}</span>
            )}
          </div>

          <button
            onClick={() => handleAddToCart(product, product.id, quantity)}
            disabled={product.stock === 0}
            className={`w-full py-2 rounded-full text-sm font-semibold transition ${
              product.stock === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}>
            {product.stock === 0 ? "Out of stock" : "Add to Cart"}
          </button>

          {isAdmin && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="flex-1 border border-red-200 text-red-500 hover:bg-red-50 text-xs py-1.5 rounded-full transition">
                Delete
              </button>
              <button
                onClick={() => handleOpenUpdateForm(product.id)}
                className="flex-1 border border-indigo-200 text-indigo-600 hover:bg-indigo-50 text-xs py-1.5 rounded-full transition">
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