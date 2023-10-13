import { useState, useEffect } from 'react';
import Checkout from './Checkout'; // Import your Checkout component
import axios from 'axios';

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false); 

  const fetchCartItems = () => {
    axios
      .get('http://localhost:8080/cart/products')
      .then((response) => {
        if (response.status === 200) {
          setCartProducts(response.data);
        } else {
          console.error('Failed to fetch cart products');
        }
      })
      .catch((error) => {
        console.error('Error fetching cart products', error);
      });
  }

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (product) => {
    try {
      await axios.delete(`http://localhost:8080/cart/products/remove/${product.id}`);
      setCartProducts(cartProducts.filter(prod => prod.id !== product.id))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

    <div className='flex flex-row'>
      <div className="flex flex-col w-1/2">
        {cartProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-slate-500 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out backdrop-blur-md hover:cursor-pointer"
          >
            <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover " />
            <h3 className="text-lg text-slate-800 font-semibold mt-2">{product.name}</h3>
            <p className="text-slate-950">${product.price.toFixed(2)}</p>
            <button onClick={() => handleRemoveFromCart(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full absolute bottom-4 right-4">
              Remove
            </button>
          </div>
        ))}
       
      </div>
      <div className='w-full'>
      <div className="bg-white p-4 rounded-md shadow-md mx-auto w-fit">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      
      <hr className="my-4 border-t border-gray-300" />
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Total:</p>
        <p className="text-lg text-indigo-700">$</p>
      </div>
      <button
        onClick={() => setShowCheckout(true)}
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full mt-4"
      >
        Proceed to Checkout
      </button>
      {showCheckout && (
        <Checkout 
        onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
      </div>
    </div>
  </>
  );
}

export default Cart;
