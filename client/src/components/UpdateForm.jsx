/* eslint-disable react/prop-types */

function UpdateForm({ name, price, image, description, handleInputChange, handleUpdate, onClose }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
        <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-2">Update Product</h2>
        <form>
          <div className="mb-4 flex flex-col">
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="mb-2 p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleInputChange}
            placeholder="Price"
            className="mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="image"
            value={image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="mb-2 p-2 border rounded"
          />
          <textarea
            name="description"
            value={description}
            onChange={handleInputChange}
            placeholder="Description"
            rows="4"
            className="mb-2 p-2 border rounded"
          />
          <button type="button" onClick={handleUpdate} className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
  