import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Logo from "../assets/carton.png";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://el-proyecte-grande-osxq.onrender.com/auth/login", formData);

      if (response) {
        localStorage.setItem("authToken", response.data.jwt);
        localStorage.setItem("role", response.data.user.authorities[0].roleId);
        console.log(response.data.user.authorities[0].roleId);

        console.log("Login successful");
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center mt-28 bg-transparent">
      <div className="bg-gray-100 border border-gray-300/50 rounded-lg shadow-lg w-96">
        <div className="flex items-center mt-8 pl-24">
          <img src={Logo} alt="Logo" className="w-10 h-10 my-1" />
          <div className="text-xl text-[#bd927c] ml-4 font-semibold font-body">eCommerce</div>
        </div>
        <form onSubmit={handleLogin} className="py-3 px-8 font-display">
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
              className="w-full px-4 py-2 bg-gray-200 text-black font-serif rounded-md focus:outline-none"
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
              className="w-full px-4 py-2 bg-gray-200 text-black font-serif rounded-md focus:outline-none"
              placeholder="Your password"
            />
          </div>
          <p className="my-3 text-start text-blue-600">
            <a href="/forgotPassword">Forgot your password?</a>
          </p>
          <button
            className="w-full bg-purple-500 text-white font-semibold font-serif py-2 rounded-full transition duration-300 hover:bg-purple-600"
            type="submit">
            Log In
          </button>
        </form>
        <p className="mb-4 text-black text-center font-display">
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
