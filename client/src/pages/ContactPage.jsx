import { useState } from "react";
import Logo from "../assets/carton.png";
import { toast } from "react-hot-toast";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import apiService from "../api/apiService";

const validate = (data) => {
  const errors = {};
  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
};

const inputClass = (error) =>
  `w-full px-4 py-2.5 bg-slate-50 border rounded-lg text-slate-800 focus:outline-none focus:ring-2 transition ${
    error ? "border-red-400 bg-red-50 focus:ring-red-300" : "border-gray-200 focus:ring-indigo-400"
  }`;

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await apiService.post("/email/send", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Contact Us</h1>
        <p className="text-slate-500">We'd love to hear from you. Send us a message!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center gap-8">
          <img src={Logo} alt="Logo" className="h-24 w-24" />
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Get in touch</h2>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <FiMail className="text-indigo-500" size={16} />
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-indigo-500" size={16} />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="text-indigo-500" size={16} />
                <span>123 Main St, City, Country</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur border border-gray-100 rounded-2xl shadow-sm p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass(errors.name)}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass(errors.email)}
                placeholder="you@email.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className={`${inputClass(errors.message)} resize-none`}
                placeholder="Write your message here..."
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-full transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
              ) : (
                <>
                  <FiSend size={15} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;