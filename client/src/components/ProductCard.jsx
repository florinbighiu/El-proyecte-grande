/* eslint-disable react/prop-types */
import { ShoppingCartIcon } from "@heroicons/react/solid";

function ProductCard({
  product,
  handleAddToCart,
  handleDeleteProduct,
  handleOpenUpdateForm,
}) {
  return (
    <div className="flex flex-col justify-evenly bg-white p-4 rounded-lg shadow-lg backdrop-blur-md hover:cursor-pointer relative font-serif">
      <img src={product.image} alt={product.name} className="w-full h-60 object-contain mb-2" />
      <h3 className="text-lg text-center text-slate-800 font-semibold mt-2">{product.name}</h3>
      <h2 className="text-slate-950">{product.description}</h2>
      <p className="text-slate-950 text-lg font-bold">${product.price.toFixed(2)}</p>
      <div className="flex flex-row items-center justify-around">
        <button
          onClick={() => handleAddToCart(product)}
          disabled={product.isInCart}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ${
            product.isInCart ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span>
            <ShoppingCartIcon className="h-[24px] w-5" />
          </span>
        </button>
        <button
          onClick={() => handleDeleteProduct(product.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Delete
        </button>
        <button
          onClick={() => handleOpenUpdateForm(product.id)}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
