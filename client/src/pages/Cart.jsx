import { useState, useEffect } from "react";
import Checkout from "../components/Checkout";
import axios from "axios";

import EmptyCart from "../assets/empty.png";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const fetchCartItems = () => {
    axios
      .get("http://localhost:8080/cart/products")
      .then((response) => {
        if (response.status === 200) {
          setCartProducts(response.data);
        } else {
          console.error("Failed to fetch cart products");
        }
      })
      .catch((error) => {
        console.error("Error fetching cart products", error);
      });
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
    return accumulator + product.price;
  }, 0);

  return (
    <div className="h-full text-white">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-col md:flex-row gap-5 justify-evenly">
        {cartProducts.length ? (
          <>
            <div
              id="cartItems"
              className="flex flex-col md:w-3/4 h-[65vh]  overflow-auto rounded-md bg-slate-800 "
            >
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-slate-700 p-4 mx-5 my-3 rounded-lg shadow-lg backdrop-blur-md hover:cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className=" w-10 h-16 object-contain "
                  />
                  <h3 className="text-lg text-white font-semibold mt-2">
                    <strong>{product.name}</strong>
                  </h3>
                  <h2 className="text-lg text-white font-semibold mt-2">
                    {product.description}
                  </h2>
                  <p className="text-indigo-400">
                    <strong>${product.price.toFixed(2)}</strong>
                  </p>
                  <button
                    onClick={() => handleRemoveFromCart(product)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute bottom-4 right-4">
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="h-fit flex items-center justify-start  ">
              <div className="bg-slate-800 text-white p-4 rounded-md shadow-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <hr className="my-4 border-t border-gray-300" />
                {cartProducts.map((prod) => (
                  <div key={prod.id}>
                    <div className="flex justify-between items-center space-x-5">
                      <p className="font-bold">{prod.name}:</p>
                      <p className="text-lg text-indigo-500">
                        <strong>{prod.price.toFixed(2)}$</strong>
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
