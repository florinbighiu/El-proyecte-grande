import { useState } from "react";
import Logo from "../assets/carton.png";
import axios from "axios";
import toast from "react-hot-toast";

import { API_BASE_URL } from "../api/apiRoute";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/email/send`, formData);
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("Error sending the message:", error);
    } finally {
      setLoading(false);
    }
  };

  const style = {
    backgroundColor: '#faaca8',
    backgroundImage: 'linear-gradient(19deg, #faaca8 0%, #ddd6f3 100%)',
  };

  return (
    <div className="container min-w-full">
      <h1 className="text-3xl font-semibold mb-10 text-center my-[3rem]">Contact Us</h1>
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12 my-12">
        <div className="flex flex-col justify-center items-center text-center  md:text-left">
          <img src={Logo} alt="Logo" className="h-32 mb-8" />
          <p className="mb-6">
            Feel free to reach out to us for any inquiries or feedback.
          </p>
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p className="">
            <strong>Email:</strong> contact@example.com
          </p>
          <p className="">
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p className="">
            <strong>Address:</strong> 123 Main St, City, Country
          </p>
        </div>
        <div style={style} className="flex w-3/4 mx-auto lg:mx-0 lg:max-w-lg border-t border-white text-black shadow-xl flex-col justify-center p-8 rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-black-200 font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-600/2 font-bold font-mono rounded-md focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-black-200 font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-600/25 text-black font-bold font-mono rounded-md focus:outline-none"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-black-200 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-600/25 text-black font-bold font-mono rounded-md focus:outline-none"
                required></textarea>
            </div>

            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full mt-4 w-full">
                Send Message
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
