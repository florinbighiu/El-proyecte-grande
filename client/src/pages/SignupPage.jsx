import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import apiService from "../api/apiService";
import SocialLoginButtons from "../components/SocialLoginButtons";
import Logo from "../assets/carton.png";

const validate = (formData) => {
  const errors = {};
  if (!formData.username.trim()) {
    errors.username = "Username is required.";
  } else if (formData.username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters.";
  }
  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!formData.password) {
    errors.password = "Password is required.";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }
  return errors;
};

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
    setServerError("");
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await apiService.post("/auth/register", formData);
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Please try again.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 bg-white border rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 transition ${errors[field] ? "border-red-400" : "border-gray-300"}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-200/60 w-full max-w-sm px-8 py-10">
        <div className="flex flex-col items-center text-center mb-6">
          <img src={Logo} alt="Logo" className="w-12 h-12 mb-3" />
          <h1 className="text-xl font-semibold text-gray-900">Create your EcomX account</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome! Please fill in the details to get started</p>
        </div>

        <SocialLoginButtons actionLabel="Continue" />

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs uppercase tracking-wide text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleRegistration} className="space-y-4">
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
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
              className={inputClass("username")}
              placeholder="Choose a username"
            />
            {errors.username && <p id="username-error" role="alert" className="mt-1 text-xs text-red-500">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass("email")}
              placeholder="your@email.com"
            />
            {errors.email && <p id="email-error" role="alert" className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                className={`${inputClass("password")} pr-11`}
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600">
                {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p id="password-error" role="alert" className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          {serverError && (
            <div role="alert" className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition duration-200 flex items-center justify-center gap-2">
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
