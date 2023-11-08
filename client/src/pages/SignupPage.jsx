import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Logo from "../assets/carton.png";

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
      const response = await axios.post("https://el-proyecte-grande-osxq.onrender.com/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response) {
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
      <div className="bg-gray-100 border border-gray-300/50 rounded-lg shadow-lg w-96">
        <div className="flex items-center mt-8 pl-24">
          <img src={Logo} alt="Logo" className="w-10 h-10 my-1" />
          <div className="text-xl text-[#bd927c] ml-4 font-semibold font-body">eCommerce</div>
        </div>
        <form onSubmit={handleRegistration} className="py-3 px-8 font-display">
          <div className="mb-3">
            <label htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-200 text-black rounded-md focus:outline-none"
              placeholder="Your username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-200 text-black rounded-md focus:outline-none"
              placeholder="Your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-200 text-black font-display rounded-md focus:outline-none"
              placeholder="Your password"
            />
          </div>
          <button
            className="w-full bg-purple-600 text-white font-semibold py-2 mt-3 rounded-full transition duration-300 hover:bg-purple-600"
            type="submit">
            Sign Up
          </button>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
        <p className="mb-4 text-gray-500 text-center font-display">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
