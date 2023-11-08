/* eslint-disable react/prop-types */
import { useState } from "react";

const Checkout = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-gradient-to-r from-gray-100 to-gray-300 p-4 text-black rounded-xl shadow-md w-3/4 md:w-2/4 lg:w-1/4">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-gray-50 focus:outline-none rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-gray-50 focus:outline-none rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full bg-gray-50 focus:outline-none rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">
            Place Order
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-sm text-indigo-600 hover:text-indigo-800">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Checkout;
