/* eslint-disable react/prop-types */
import { ShoppingCartIcon } from "@heroicons/react/solid";

function ProductCard({ product, handleAddToCart, handleDeleteProduct, handleOpenUpdateForm }) {
    const userRole = localStorage.getItem("role");

    return (
        <div className="flex flex-col justify-evenly bg-slate-800 p-4 rounded-lg shadow-lg backdrop-blur-md hover:cursor-pointer relative font-serif gap-y-2">
            <img src={product.image} alt={product.name} className="w-full h-80 rounded-md mx-0 mb-2"
            />
            <h3 className="font-black uppercase tracking-wide text-white mb-1">
                {product.name}</h3>
            <h2 className="text-white">{product.description}</h2>
            <p className="text-blue-500 text-lg font-bold">
                <strong>${product.price.toFixed(2)}</strong>
            </p>
            <div className="flex flex-row items-center justify-around">
                <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.isInCart}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-fit rounded-md ${
                        product.isInCart ? "opacity-50 cursor-not-allowed" : ""
                    }`}>
          <span>
            <ShoppingCartIcon className="h-[24px] w-5" />
          </span>
                </button>
                {userRole === "1" && (
                    <>
                        <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-fit rounded-md">
                            Delete
                        </button>
                        <button
                            onClick={() => handleOpenUpdateForm(product.id)}
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 w-fit rounded-md">
                            Update
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
