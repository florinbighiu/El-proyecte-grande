/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getToken, getUserId, defaultQuantity } from "../utils/authConstants";
import { API_BASE_URL } from "../api/apiRoute";

import axios from "axios";

import Loading from "../layout/Loading";
import StarRating from "../components/StarRating";

function ProductDetail() {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = getToken();
  const userId = getUserId();
  const quantity = defaultQuantity;

  async function fetchProduct(productId) {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  }

  useEffect(() => {
    async function getProduct() {
      setLoading(true);
      try {
        const product = await fetchProduct(productId);
        setProduct(product);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [productId]);


  const handleAddToCart = async (product, product_id, quantity) => {
    try {
      if (product.stock > 0) {
        const response = await axios.post(
          `${API_BASE_URL}/cart/add/${userId}/${productId}/${quantity}`,
          {},
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );

        if (response.status === 200) {
          toast.success("Product added to the cart!");
          setProduct((prevProduct) => ({ ...prevProduct, stock: prevProduct.stock - quantity }));
        } else {
          toast.error("Failed to add the product!");
        }
      } else {
        toast.error("Product is out of stock!");
      }
    } catch (error) {
      toast.error("An error occurred while adding the product to the cart");
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
    <div className="w-full mt-[4rem] md:p-6 flex lg:flex-row flex-col items-center justify-between">
      <div className="w-full lg:w-1/2 bg-white bg-opacity-25 backdrop-blur-md rounded-xl p-1">
        <img
          src={product.thumbnail}
          alt="Thumbnail"
          className="w-full h-[33rem] object-cover shadow-lg rounded-xl"
        />
      </div>
      <div className="w-full lg:w-1/2 h-[33rem] md:px-8 my-0.5 text-black flex flex-col items-start justify-center">
        <div className="h-full mx-6 flex items-center justify-center flex-col">
          <h3 className="p-5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-3xl text-center font-extrabold uppercase tracking-tighter text-transparent">
            {product.title}
          </h3>
          <p className="text-xl">{product.description}</p>
          <div className="mt-4 w-full flex flex-col items-start justify-center">
            <p className="text-red-500 w-full text-2xl font-semibold mt-2">
              $
              {product.discountPercentage > 0
                ? (product.price - (product.price * product.discountPercentage) / 100).toFixed(2)
                : product.price.toFixed(2)}
              {product.discountPercentage > 0 && (
                <span className="text-sm text-black line-through ml-2">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </p>
            <div className="my-1">
              <StarRating product={product} />
            </div>{" "}
            {product.stock < 25 ? (
              <p className="text-xl my-2">
                Limited quantity available /
                <span className="text-xl text-red-600">{" " + product.stock + " "}</span>
                in stock
              </p>
            ) : (
              <p className="text-xl my-2">
                Quantity available /
                <span className="text-xl text-green-600">{" "}{product.stock}{" "}</span>
                in stock
              </p>
            )}
            <p className="text-xl my-2">Brand: {product.brand}</p>
            <p className="text-xl my-2 mb-5">Category:
              <span className="uppercase">{" " + product.category}</span>
            </p>
          </div>
          <div className="flex flex-col items-end justify-end w-full">
            <button
              onClick={() => handleAddToCart(product, product.id, quantity)}
              className={`mb-2 bg-blue-800 hover:bg-blue-900 text-white font-bold p-2 rounded-full w-full focus:outline-none ${product.stock === 0 ? "opacity-50 bg-red-500 hover:bg-red-700" : ""
                }`}>
              {product.stock === 0 ? "Out of stock" : `Add to Cart`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
