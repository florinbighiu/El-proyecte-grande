/* eslint-disable react/prop-types */

import toast from "react-hot-toast";

function UpdateForm({
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  thumbnail,
  handleInputChange,
  handleUpdate,
  onClose,
}) {
  const toaster = () => toast.success("Product updated!");

  const update = () => {
    handleUpdate();
    toaster();
  };

  const style = {
    backgroundColor: '#faaca8',
    backgroundImage: 'linear-gradient(19deg, #faaca8 0%, #ddd6f3 100%)',
  };

  return (
    <div className="fixed inset-0 overflow-auto flex items-center justify-center z-50 bg-gray-800 bg-opacity-75 ">
      <div style={style} className=" text-black p-4 rounded-lg shadow-md w-3/4 sm:w-3/4 md:w-1/4">
        <h2 className="text-xl font-semibold mb-2">Update Product</h2>
        <form>
          <div className="mb-4 flex text-black flex-col max-h-96 overflow-y-auto px-2">
            <label htmlFor="name" className="mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="mb-2 p-2 bg-gray-100 border border-white/75 focus:outline-none rounded"
            />

            <label htmlFor="description" className="mb-1">
              Description
            </label>
            <input
              name="description"
              value={description}
              onChange={handleInputChange}
              placeholder="Description"
              rows="4"
              className="mb-2 p-2 bg-gray-100 border border-white/75 focus:outline-none rounded"
            />

            <label htmlFor="price" className="mb-1">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={price}
              onChange={handleInputChange}
              placeholder="Price"
              className="mb-2 p-2 bg-gray-100 border border-white/75 focus:outline-none rounded"
            />

            <label htmlFor="discountpercentage" className="mb-1">
              Discount Percentage
            </label>
            <input
              type="text"
              name="discountPercentage"
              value={discountPercentage}
              onChange={handleInputChange}
              placeholder="Discount Percentage"
              className="mb-2 p-2 bg-gray-100 border border-white/75 focus:outline-none rounded"
            />

            <label htmlFor="rating" className="mb-1">
              Rating
            </label>
            <input
              type="text"
              name="rating"
              value={rating}
              onChange={handleInputChange}
              placeholder="Rating"
              className="mb-2 p-2 bg-gray-100 border border-white/75 focus:outline-none rounded"
            />

            <label htmlFor="stock" className="mb-1">
              Stock
            </label>
            <input
              type="text"
              name="stock"
              value={stock}
              onChange={handleInputChange}
              placeholder="Stock"
              className="mb-2 p-2 bg-gray-100 border border-white/75 focus:outline-none rounded"
            />

            <label htmlFor="brand" className="mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={brand}
              onChange={handleInputChange}
              placeholder="Brand"
              className="mb-2 p-2 bg-gray-100 border border-white/75 focus:outline-none rounded"
            />

            <label htmlFor="category" className="mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={handleInputChange}
              placeholder="Category"
              className="mb-2 p-2 bg-gray-100 border border-white/75 focus:outline-none rounded"
            />

            <label htmlFor="image" className="mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="thumbnail"
              value={thumbnail}
              onChange={handleInputChange}
              placeholder="Image URL"
              className="mb-2 p-2 bg-gray-100 border border-white/75 focus:outline-none rounded"
            />
          </div>
          <div className="flex flex-col justify-center">
            <button
              type="button"
              onClick={update}
              className="bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded-full">
              Update Product
            </button>
            <button
              onClick={onClose}
              className="mt-4 w-full py-2 text-center text-sm text-indigo-600 hover:text-indigo-800">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
