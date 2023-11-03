/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import Loading from "../layout/Loading";
import StarRating from "../components/StarRating";

function ProductDetail() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:8080/cart/add/${productId}`, {
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

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-2xl mt-4">Error: {error.message}</div>;
  }

  if (!product) {
    return <div className="text-red-500 text-2xl mt-4">Product not found.</div>;
  }

  return (
    <div className="w-full p-12 flex flex-wrap rounded overflow-hidden">
      <div className="w-full sm:w-1/2 rounded-xl my-5">
        <img
          src={product.thumbnail}
          alt="Thumbnail"
          className="w-full h-96 object-fit rounded-xl"
        />
      </div>
      <div className="w-full sm:w-1/2 px-12 py-4 text-gray-200 flex flex-col items-start justify-between">
        <h3 className="font-extrabold w-full text-3xl text-center uppercase mb-4">
          {product.title}
        </h3>
        <p className="text-xl font-display">{product.description}</p>
        <div className="mt-4 w-full flex flex-col">
          <p className="text-red-500 w-full text-2xl font-semibold mt-2">
            <strong>
              $
              {product.discountPercentage > 0
                ? (product.price - (product.price * product.discountPercentage) / 100).toFixed(2)
                : product.price.toFixed(2)}
            </strong>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.price.toFixed(2)}
              </span>
            )}
          </p>
          <div className="my-1">
            <StarRating product={product} />
          </div>{" "}
          {product.stock < 25 ? (
            <p className="text-xl font-display my-2">
              Limited quantity available / {product.stock} in stock
            </p>
          ) : (
            <p className="text-xl font-display my-2">
              Quantity available / {product.stock} in stock
            </p>
          )}
          <p className="text-xl font-display my-2">Brand {product.brand}</p>
          <p className="text-xl font-display my-2 mb-5">Category {product.category}</p>
        </div>
        <div className="flex flex-col items-end justify-end w-full">
          <button
            onClick={() => handleAddToCart(product.id)}
            className="mb-2 py-3 bg-[#0053a0] hover:bg-blue-700 text-white font-bold p-2 rounded-full w-full focus:outline-none ">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
