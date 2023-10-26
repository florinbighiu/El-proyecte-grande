import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Logo from "../assets/ecommerce.png";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Registration successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center mt-28 bg-transparent">
      <div className="bg-slate-800 rounded-lg shadow-md w-96">
        <div className="flex items-center justify-center pt-4">
          <img src={Logo} alt="Logo" className="w-24" />
        </div>{" "}
        <form onSubmit={handleRegistration} className="p-8">
          <div className="mb-5">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-md focus:outline-none"
              placeholder="Your username"
            />
          </div>
          <div className="mb-5">
          
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-semibold"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400"
              placeholder="Your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-slate-700 text-white font-serif rounded-md focus:outline-none"
              placeholder="Your password"
            />
          </div>
          <button
            className="w-full bg-purple-500 text-white font-semibold py-2 rounded-md transition duration-300 hover:bg-purple-600"
            type="submit"
          >
            Sign Up
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
        <p className="mb-4 text-gray-600 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
