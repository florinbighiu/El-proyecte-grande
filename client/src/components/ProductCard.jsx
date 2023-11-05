/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

import StarRating from "./StarRating";

function ProductCard({ product, handleAddToCart, quantity, handleDeleteProduct, handleOpenUpdateForm }) {
  const userRole = localStorage.getItem("role");
  const maxDescriptionLines = 3;
  const [showMore, setShowMore] = useState(false);

  const toggleDescription = () => {
    setShowMore(!showMore);
  };

  const truncatedDescription = product.description
    .split("\n")
    .slice(0, maxDescriptionLines)
    .join("\n");

  return (
    <div className="relative bg-white border border-gray-300/75 rounded-lg shadow-lg duration-300 w-fit">
      {product.discountPercentage > 0 && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-red-400 to-red-600 text-black p-2 rounded-full">
          <div className="text-md font-semibold">
            <span className="text-lg">-</span>
            {product.discountPercentage.toFixed(2)}%
          </div>
        </div>
      )}
      <Link to={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} className="w-full h-56 rounded-lg shadow-lg mb-4" />
      </Link>

      <div className="text-black text-center p-2 ">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-extrabold text-lg uppercase mb-1">{product.title}</h3>
          <p
            className={`text-black text-lg text-start font-display px-1  ${showMore ? "..." : "overflow-hidden h-14"
              }`}>
            {showMore ? product.description : truncatedDescription}
          </p>
        </Link>

        {product.description.split("\n").length > maxDescriptionLines && (
          <button
            onClick={toggleDescription}
            className="text-blue-400 font-semibold hover:underline mt-2 focus:outline-none">
            {showMore ? "Show Less" : "Show More"}
          </button>
        )}
        <div className="my-1">
          <StarRating product={product} />
        </div>
        <p className="text-red-500 text-xl font-semibold mt-2 text-center">

          $
          {product.discountPercentage > 0
            ? (product.price - (product.price * product.discountPercentage) / 100).toFixed(2)
            : product.price.toFixed(2)}

          {product.discountPercentage > 0 && (
            <span className="text-sm text-gray-700 line-through ml-2">
              ${product.price.toFixed(2)}
            </span>
          )}
        </p>
      </div>
      <div className=" p-2 flex flex-col items-center w-full text-gray-100">
        <button
          onClick={() => handleAddToCart(product, product.id, quantity)}
          className={`mb-2 bg-blue-800 hover:bg-blue-900 font-bold p-2 rounded-md w-full focus:outline-none ${product.stock === 0 ? "opacity-50 bg-red-500 hover:bg-red-700" : ""
            }`}>
          {product.stock === 0 ? "Out of stock" : `Add to Cart (${product.stock})`}
        </button>
        {userRole === "1" && (
          <div className="flex flex-row space-x-2 w-full">
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="bg-pink-600 hover:bg-pink-700  font-bold py-2 px-4 rounded-md w-full focus:outline-none">
              Delete
            </button>
            <button
              onClick={() => handleOpenUpdateForm(product.id)}
              className="bg-violet-600 hover:bg-violet-800  font-bold py-2 px-4 rounded-md w-full focus:outline-none">
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;