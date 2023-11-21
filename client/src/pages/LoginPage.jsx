import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.post("https://el-proyecte-grande-osxq.onrender.com/auth/login", formData);

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
    <div className="min-h-screen flex items-start justify-center mt-28 bg-transparent">
      <div className="bg-gray-100 bg-opacity-40 border-t border-gray-100 rounded-xl shadow-lg w-96">
        <div className="flex items-center mt-8 pl-24">
          <img src={Logo} alt="Logo" className="w-10 h-10 my-1" />
          <div className="text-xl text-[#bd927c] ml-4 font-semibold font-body">EcomX</div>
        </div>
        <form className="py-3 px-8 font-serif">
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
