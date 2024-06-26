/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Checkout from "../components/Checkout";
import { API_BASE_URL } from "../api/apiRoute";

import axios from "axios";

import EmptyCart from "../assets/empty.png";
import toast from "react-hot-toast";
import { FaShoppingBag } from "react-icons/fa";


const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);

    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const quantity = 1;

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/cart/items/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCartProducts(response.data);
        } catch (error) {
            console.error(error.message)
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const decreaseQuantity = async (product) => {
        try {
            await axios.put(`${API_BASE_URL}/cart/update/decrease/${product.id}/${quantity}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const updatedProducts = cartProducts.map((prod) => prod.id === product.id ? {
                ...prod, quantity: prod.quantity - 1,
            } : prod);

            setCartProducts(updatedProducts);

        } catch {
            toast.error('Error updating quantity!');
        }
    };

    const increaseQuantity = async (product) => {
        try {
            await axios.put(`${API_BASE_URL}/cart/update/increase/${product.id}/${quantity}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const updatedProducts = cartProducts.map((prod) => prod.id === product.id ? {
                ...prod, quantity: prod.quantity + 1,
            } : prod);
            setCartProducts(updatedProducts);
        } catch (error) {
            toast.error('No more stock!');
        }
    };


    const handleRemoveFromCart = async (product) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/cart/remove/${product.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setCartProducts((prevProducts) => prevProducts.filter((prod) => prod.id !== product.id));
            } else {
                console.error('Failed to update cart.');
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const totalCost = cartProducts.reduce((accumulator, product) => {
        return (accumulator + (product.product.price - (product.product.price * product.product.discountPercentage) / 100) * product.quantity);
    }, 0);

    const finalCost = totalCost + 20;

    return (
        <div className="text-black mt-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-1 gap-x-5">
                {cartProducts.length ? (<>
                    <div className="flex flex-col col-span-2 row-span-1">
                        {cartProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white border border-gray-200/70 bg-opacity-25 backdrop-blur-md lg:h-64 mx-3 my-3 rounded-xl shadow-md  hover:cursor-pointer">
                                <div className="relative h-full flex flex-col lg:flex-row">
                                    <div className="relative h-full lg:w-1/3">
                                        <img
                                            src={product.product.thumbnail}
                                            alt={product.product.title}
                                            className="w-full h-64 object-cover border border-gray-100/75 shadow-lg rounded-lg"
                                        />
                                    </div>

                                    <div className="p-2 flex-grow flex justify-evenly flex-col lg:w-1/2">
                                        <h3 className="text-xl text-black text-center font-semibold mb-2">
                                            <strong>{product.product.title}</strong>
                                        </h3>
                                        <p className="text-lg text-black text-center mb-2">
                                            {product.product.description}
                                        </p>
                                        <p className="text-red-500 text-center text-xl">
                                            ${product.product.discountPercentage > 0 ? ((product.product.price - (product.product.price * product.product.discountPercentage) / 100) * product.quantity).toFixed(2) : (product.product.price * product.quantity).toFixed(2)}
                                            {product.product.discountPercentage > 0 && (
                                                <span className="text-sm text-gray-700 line-through ml-2">
                                                    ${(product.product.price * product.quantity).toFixed(2)}
                                                </span>)}{" "}
                                        </p>
                                        <div className="flex items-center justify-center space-x-1">
                                            <button disabled={product.quantity < 2} onClick={() => decreaseQuantity(product)}
                                                className={`mt-2 w-8 h-8 rounded-full bg-pink-100 hover:bg-pink-200 hover:shadow-lg flex justify-center items-center ${product.quantity < 2 ? "bg-slate-100 hover:bg-slate-100 hover:bg-opacity-25 hover:shadow-none bg-opacity-25" : ""}`}>-
                                            </button>
                                            <div
                                                className="mt-2 px-1 rounded-xl w-fit text-center text-2xl font-display">
                                                <span>{product.quantity}</span>
                                            </div>
                                            <button onClick={() => increaseQuantity(product)}
                                                className="mt-2 w-8 h-8 rounded-full bg-pink-100 hover:bg-pink-200 hover:shadow-lg flex justify-center items-center">+
                                            </button>
                                        </div>
                                        <div className="flex items-end justify-center">
                                            <button
                                                onClick={() => handleRemoveFromCart(product)}
                                                className="bg-red-500 hover:bg-red-700 w-2/5 text-white font-bold py-2 px-4 rounded-full mt-2 lg:mt-4 mx-auto lg:mx-0">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>))}
                    </div>
                    <div
                        className="h-fit flex items-center justify-start mx-3 my-3 col-span-2 row-span-2 md:col-span-1 md:row-span-1">
                        <div
                            className="bg-gray-100 bg-opacity-50 border-t border-t-white text-black p-4 rounded-xl border border-gray-200/50 shadow-md w-full">
                            <h2 className="text-2xl text-center font-bold mb-4">Order Summary</h2>
                            <hr className="my-4 border-t border-gray-300" />
                            <h2 className="text-xl mb-4">Total items: {cartProducts.length}</h2>
                            <hr className="my-4 border-t border-gray-300" />
                            <div className="flex justify-between items-center space-x-5">
                                <p className="">Products cost</p>
                                <p className="text-lg text-red-500">
                                    {totalCost.toFixed(2)}$
                                </p>
                            </div>
                            <hr className="my-4 border-t border-gray-300" />
                            <div className="flex justify-between items-center space-x-5">
                                <p className="">Delivery fee</p>
                                <p className="text-lg text-green-500">
                                    20$
                                </p>
                            </div>
                            <hr className="my-4 border-t border-gray-300" />
                            <div className="flex justify-between items-center">
                                <p className="text-lg">Total:</p>
                                <p className="text-lg text-red-500">
                                    {finalCost.toFixed(2)}$
                                </p>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => setShowCheckout(true)}
                                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-serif font-bold py-2 px-4 mt-5 w-full rounded-full">
                                    Proceed to Checkout
                                </button>
                            </div>
                            {showCheckout && <Checkout onClose={() => setShowCheckout(false)} />}
                        </div>
                    </div>
                </>) : (
                    <div className="flex flex-col items-center justify-center col-span-3 mt-8">
                        <img src={EmptyCart} alt="EmptyCart" className="h-2/5 " />
                        <h1 className="w-full text-center font-serif text-2xl mt-2">
                            You don't have any items in your cart.
                        </h1>
                        <div className="h-1/4 flex items-center justify-center">
                            <Link to="/products">
                                <div className="flex flex-row items-center space-x-2 bg-pink-500 hover:bg-pink-600 p-2 px-6 text-xl  text-white rounded-full">
                                    <FaShoppingBag />
                                    <p className="text-md">Start shopping</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>);
}

export default Cart;
