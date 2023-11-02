import { useState, useEffect } from "react";
import Checkout from "../components/Checkout";
import axios from "axios";

import EmptyCart from "../assets/empty.png";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const fetchCartItems = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Token not found in localStorage");
      return;
    }

    const response = await axios.get("http://localhost:8080/cart/items", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const fetchedProducts = response.data;

    setCartProducts(fetchedProducts);
    console.log(cartProducts);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (product) => {
    try {
      await axios.delete(`http://localhost:8080/cart/remove/${product.id}`);
      setCartProducts(cartProducts.filter((prod) => prod.id !== product.id));
    } catch (error) {
      console.log(error);
    }
  };

  const totalCost = cartProducts.reduce((accumulator, product) => {
    return (
      accumulator +
      (product.product.price - (product.product.price * product.product.discountPercentage) / 100)
    );
  }, 0);

  const finalCost = totalCost + 20;

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-1 gap-x-5 gap-y-0">
        {cartProducts.length ? (
          <>
            <div className="flex flex-col col-span-2 row-span-1">
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-800 mx-3 my-3 rounded-lg shadow-lg backdrop-blur-md hover:cursor-pointer">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/3">
                      <img
                        src={product.product.thumbnail}
                        alt={product.product.title}
                        className="w-full h-40 lg:h-64 object-fill rounded-lg"
                      />
                    </div>
                    <div className="p-2 lg:p-4 flex-grow flex justify-between flex-col lg:w-1/2">
                      <h3 className="text-lg text-white text-center font-semibold mb-2">
                        <strong>{product.product.title}</strong>
                      </h3>
                      <p className="text-lg text-white text-center mb-2">
                        {product.product.description}
                      </p>
                      <p className="text-red-500 text-center text-xl">
                        <strong>
                          $
                          {product.product.discountPercentage > 0
                            ? (
                                product.product.price -
                                (product.product.price * product.product.discountPercentage) / 100
                              ).toFixed(2)
                            : product.product.price.toFixed(2)}
                        </strong>
                        {product.product.discountPercentage > 0 && (
                          <span className="text-sm text-gray-400 line-through ml-2">
                            ${product.product.price.toFixed(2)}
                          </span>
                        )}{" "}
                      </p>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleRemoveFromCart(product)}
                          className="bg-red-500 hover:bg-red-700 w-2/5 text-white font-bold py-2 my-2 lg:my-3 px-4 rounded-lg mt-2 lg:mt-4 mx-auto lg:mx-0">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-fit flex items-center justify-start mx-3 my-3 col-span-2 row-span-2 md:col-span-1 md:row-span-1">
              <div className="bg-slate-800 text-white p-4 rounded-md shadow-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <hr className="my-4 border-t border-gray-300" />
                <div className="flex justify-between items-center space-x-5">
                  <p className="font-bold">Products cost:</p>
                  <p className="text-lg text-red-500">
                    <strong>{totalCost}$</strong>
                  </p>
                </div>
                <hr className="my-4 border-t border-gray-300" />
                <div className="flex justify-between items-center space-x-5">
                  <p className="font-bold">Delivery fee:</p>
                  <p className="text-lg text-green-500">
                    <strong>20$</strong>
                  </p>
                </div>
                <hr className="my-4 border-t border-gray-300" />
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Total:</p>
                  <p className="text-lg text-red-500">
                    <strong>{finalCost.toFixed(2)}$</strong>
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mt-5 w-full rounded-lg">
                    Proceed to Checkout
                  </button>
                </div>
                {showCheckout && <Checkout onClose={() => setShowCheckout(false)} />}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-start col-span-3 mt-24">
            <img src={EmptyCart} alt="EmptyCart" className="h-2/4 " />
            <h1 className="w-full text-center mt-14 text-lg">
              Your cart is empty. To add products to your cart go{" "}
              <a href="/products" className="text-blue-500">
                back to shop.
              </a>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
