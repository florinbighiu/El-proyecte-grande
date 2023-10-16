import { useState, useEffect } from "react";
import Checkout from "../components/Checkout";
import axios from "axios";

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
    <>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="flex flex-row">
        {cartProducts.length ? (
          <>
            <div
              id="cartItems"
              className="flex flex-col w-2/3 h-[75vh] overflow-auto rounded-md bg-white border-2 border-slate-300	">
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-slate-100 border-2 border-slate-300 p-4 mx-5 mt-5 mb-1 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out backdrop-blur-md hover:cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.name}
                    className=" w-10 h-16 object-contain "
                  />
                  <h3 className="text-lg text-slate-800 font-semibold mt-2">{product.name}</h3>
                  <h2 className="text-lg text-slate-800 font-semibold mt-2">
                    {product.description}
                  </h2>
                  <p className="text-indigo-700">
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
            <div className="w-full h-fit flex items-center justify-end ">
              <div className="bg-white p-4 rounded-md shadow-md w-fit h-2/3">
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                <hr className="my-4 border-t border-gray-300" />
                {cartProducts.map((prod) => (
                  <div key={prod.id}>
                    <div className="flex flex-row justify-between">
                      <p className="w-3/4">{prod.name}:</p>
                      <p className="w-1/4 text-end text-lg text-indigo-700">
                        <strong>{prod.price.toFixed(2)}$</strong>
                      </p>
                    </div>
                    <hr className="my-4 border-t border-gray-300" />
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">Total:</p>
                  <p className="text-lg text-indigo-700">
                    <strong>{totalCost}$</strong>
                  </p>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                  Proceed to Checkout
                </button>
                {showCheckout && <Checkout onClose={() => setShowCheckout(false)} />}
              </div>
            </div>
          </>
        ) : (
          <h1 className="w-full text-center mt-14">
            Your cart is empty. To add products to you cart go{" "}
            <a href="/" className="text-blue-500">
              back to shop.
            </a>
          </h1>
        )}
      </div>
    </>
  );
}

export default Cart;
