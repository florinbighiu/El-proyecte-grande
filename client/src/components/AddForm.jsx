/* eslint-disable react/prop-types */

function AddForm({ name, price, image, description, handleInputChange, handleAddProduct, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded-md shadow-md sm:w-2/4">
    <h2 className="text-xl font-semibold mb-2">Add Product</h2>
      <form>
        <div className="mb-4 flex flex-col">
        <input
          type="text"
          name="name"
          value={name}
          required
          onChange={handleInputChange}
          placeholder="Product Name"
          className="mb-2 p-2 border rounded"
        />
        <input
          type="number"
          required
          name="price"
          value={price}
          onChange={handleInputChange}
          placeholder="Price"
          className="mb-2 p-2 border rounded"
        />
        <input
          type="text"
          required
          name="image"
          value={image}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="mb-2 p-2 border rounded"
        />
        <textarea
          name="description"
          required
          value={description}
          onChange={handleInputChange}
          placeholder="Description"
          rows="4"
          className="mb-2 p-2 border rounded"
        />
        <button type="button" onClick={handleAddProduct} className=" bg-indigo-600 text-white hover:bg-indigo-700 font-bold py-2 px-4 rounded">
          Add product
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

export default AddForm;
