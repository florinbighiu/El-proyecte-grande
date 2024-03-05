import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { API_BASE_URL } from "../api/apiRoute";
import Logo from "../assets/carton.png";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);

      if (response) {
        localStorage.setItem("authToken", response.data.jwt);
        localStorage.setItem("role", response.data.user.authorities[0].roleId);
        localStorage.setItem("userId", response.data.user.userId);

        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      setLoading(false)
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-gray-100 bg-opacity-40 border-t border-gray-100 rounded-xl shadow-lg w-96">
        <div className="w-full flex items-center justify-center mt-6">
          <img src={Logo} alt="Logo" className="w-10 h-10 my-1" />
          <h1 className="text-3xl text-[#bd927c] ml-4 font-semibold">EcomX</h1>
        </div>
        <form className="py-3 px-8">
          <div className="mb-3">
            <label htmlFor="username" className="text-black">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-100 text-black font-serif rounded-md focus:outline-none"
              placeholder="Your username"
            />
          </div>
          <div className="">
            <label htmlFor="password" className="text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-100 text-black font-serif rounded-md focus:outline-none"
              placeholder="Your password"
            />
          </div>
          <p className="my-3 text-start text-blue-600">
            <a href="/forgotPassword">Forgot your password?</a>
          </p>
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-rose-700"></div>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full bg-purple-500 text-white font-semibold font-serif py-2 rounded-full transition duration-300 hover:bg-purple-600"
              type="submit">
              Log in
            </button>
          )}
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </form>
        <p className="mb-4 text-black text-center">
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
