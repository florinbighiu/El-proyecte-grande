/* eslint-disable react/prop-types */
import { useState } from "react";

function ProductCard({ product, handleAddToCart, handleDeleteProduct, handleOpenUpdateForm }) {
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
        <div className="relative bg-gradient-to-r from-slate-700 to-slate-800 p-4 rounded-lg shadow-lg cursor-pointer duration-300">
            <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full p-2">
                New
            </div>
            <img src={product.image} alt={product.name} className="w-full h-80 rounded-md mb-4" />
            <div className="text-white text-center">
                <h3 className="font-extrabold text-xl uppercase mb-1">{product.name}</h3>
                <p className={`text-gray-200 text-lg ${showMore ? "..." : "overflow-hidden h-14"}`}>
                    {showMore ? product.description : truncatedDescription}
                </p>
                {product.description.split("\n").length > maxDescriptionLines && (
                    <button
                        onClick={toggleDescription}
                        className="text-blue-400 font-semibold hover:underline mt-2 focus:outline-none"
                    >
                        {showMore ? "Show Less" : "Show More"}
                    </button>
                )}
                <p className="text-yellow-400 text-xl font-semibold mt-2">
                    <strong>${product.price.toFixed(2)}</strong>
                </p>
            </div>
            <div className="mt-4 flex flex-col items-center w-full">
                <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.isInCart}
                    className={`mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded-md w-full focus:outline-none ${
                        product.isInCart ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {product.isInCart ? "In Cart" : "Add to Cart"}
                </button>
                {userRole === "1" && (
                    <div className="flex flex-row space-x-2 w-full">
                        <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => handleOpenUpdateForm(product.id)}
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none"
                        >
                            Update
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
