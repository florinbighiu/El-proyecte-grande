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

    const response = await axios
        .get("http://localhost:8080/cart/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

    const fetchedProducts = response.data

    setCartProducts(fetchedProducts);
    console.log(cartProducts)

  };


  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (product) => {
    try {
      await axios.delete(`http://localhost:8080/cart/products/remove/${product.id}`);
      setCartProducts(cartProducts.filter((prod) => prod.id !== product.id));
    } catch (error) {
      console.log(error);
    }
  };

  const totalCost = cartProducts.reduce((accumulator, product) => {
    return accumulator + product.product.price;
  }, 0);

  return (
    <div className="h-full text-white">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-col md:flex-row justify-evenly">
        {cartProducts.length ? (
          <>
            <div
              className="flex flex-col sm:w-4/5 md:w-3/5"
            >
                  {cartProducts.map((product) => (
                        <div key={product.id} className="relative bg-slate-700 mx-3 my-3 rounded-lg shadow-lg backdrop-blur-md hover:cursor-pointer">
                          <div className="flex flex-col h-full">
                            <img
                                src={product.product.thumbnail}
                                alt={product.product.title}
                                className="w-full h-64 object-center rounded-t-lg"
                            />
                            <div className="p-4 flex-grow">
                              <h3 className="text-lg text-white font-semibold mb-2">
                                <strong>{product.product.title}</strong>
                              </h3>
                              <p className="text-lg text-white mb-4">{product.product.description}</p>
                              <p className="text-indigo-400">
                                <strong>${product.product.price.toFixed(2)}</strong>
                              </p>
                            </div>
                            <button
                                onClick={() => handleRemoveFromCart(product)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-3 px-4 rounded-full mt-4 mx-auto"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                    ))}
            </div>
            <div className="h-fit flex items-center justify-start mx-3 my-3 ">
              <div className="bg-slate-800 text-white p-4 rounded-md shadow-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <hr className="my-4 border-t border-gray-300" />
                {cartProducts.map((prod) => (
                  <div key={prod.id}>
                    <div className="flex justify-between items-center space-x-5">
                      <p className="font-bold">{prod.product.title}:</p>
                      <p className="text-lg text-indigo-500">
                        <strong>{prod.product.price.toFixed(2)}$</strong>
                      </p>
                    </div>
                    <hr className="my-4 border-t border-gray-300" />
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Total:</p>
                  <p className="text-lg text-indigo-600">
                    <strong>{totalCost.toFixed(2)}$</strong>
                  </p>
                </div>
                <div className="flex items-center justify-center w-full">
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mt-5 rounded-full">
                    Proceed to Checkout
                  </button>
                </div>
                {showCheckout && <Checkout onClose={() => setShowCheckout(false)} />}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-start">
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
