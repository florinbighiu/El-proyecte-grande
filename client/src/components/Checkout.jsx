import { useState } from "react";
import toast from "react-hot-toast";
import { FiX, FiCheckCircle } from "react-icons/fi";
import apiService from "../api/apiService";

const validate = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = "Full name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email.";
  }
  if (!data.phone.trim()) errors.phone = "Phone number is required.";
  if (!data.address.trim()) errors.address = "Address is required.";
  return errors;
};

const Checkout = ({ onClose, onSuccess, cartItems, totalCost, deliveryFee }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        deliveryFee,
        items: cartItems.map((item) => ({
          title: item.product.title,
          quantity: item.quantity,
          price: item.product.price,
          discountPercentage: item.product.discountPercentage,
        })),
      };
      await apiService.post("/email/order", payload);
      setPlaced(true);
      toast.success("Order placed successfully!");
      setTimeout(onSuccess, 2500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-3 py-2 border rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm ${errors[field] ? "border-red-400" : "border-gray-300"}`;

  if (placed) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60">
        <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center gap-4 max-w-xs w-full">
          <FiCheckCircle className="text-green-500 text-6xl" />
          <h2 className="text-2xl font-bold text-gray-800">Order Placed!</h2>
          <p className="text-gray-500 text-center text-sm">
            Thank you, {formData.name}. Your order is being processed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Checkout</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <FiX size={22} />
          </button>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-600 mb-2">Order Summary</p>
          <div className="space-y-1 max-h-28 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-700">
                <span className="truncate max-w-[60%]">{item.product.title} × {item.quantity}</span>
                <span>${((item.product.price - (item.product.price * item.product.discountPercentage) / 100) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between text-sm font-bold text-gray-800">
            <span>Total</span>
            <span className="text-indigo-600">${(totalCost + deliveryFee).toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass("name")} placeholder="John Doe" />
            {errors.name && <p className="mt-0.5 text-xs text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass("email")} placeholder="you@email.com" />
            {errors.email && <p className="mt-0.5 text-xs text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass("phone")} placeholder="+1 234 567 8900" />
            {errors.phone && <p className="mt-0.5 text-xs text-red-500">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Delivery Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className={inputClass("address")} placeholder="123 Main St, City, Country" />
            {errors.address && <p className="mt-0.5 text-xs text-red-500">{errors.address}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-full transition flex items-center justify-center gap-2">
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
            ) : (
              `Place Order — $${(totalCost + deliveryFee).toFixed(2)}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
