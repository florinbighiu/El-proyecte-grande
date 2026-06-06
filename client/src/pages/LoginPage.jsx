import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../api/apiService";
import Logo from "../assets/carton.png";

const validate = (formData) => {
  const errors = {};
  if (!formData.username.trim()) errors.username = "Username is required.";
  if (!formData.password) errors.password = "Password is required.";
  return errors;
};

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    setServerError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.post("/auth/login", formData);
      const { jwt, user } = response.data;
      const role = user.authorities?.[0]?.authority ?? "USER";
      login(jwt, user.userId, role);
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid username or password.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-white bg-opacity-40 border border-gray-200/60 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-sm">
        <div className="flex items-center justify-center gap-3 pt-8 pb-2">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
          <h1 className="text-3xl text-[#bd927c] font-semibold">EcomX</h1>
        </div>
        <p className="text-center text-gray-500 text-sm mb-4">Sign in to your account</p>

        <form onSubmit={handleLogin} className="px-8 pb-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.username ? "border-red-400" : "border-gray-300"}`}
              placeholder="Your username"
            />
            {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${errors.password ? "border-red-400" : "border-gray-300"}`}
              placeholder="Your password"
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-full transition duration-200 flex items-center justify-center gap-2">
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
            ) : (
              "Log in"
            )}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
