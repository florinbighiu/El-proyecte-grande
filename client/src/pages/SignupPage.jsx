import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";
import apiService from "../api/apiService";
import AuthLayout from "../layout/AuthLayout";

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

const inputClass = (hasError) =>
  `w-full pl-11 pr-3.5 py-2.5 bg-white border rounded-lg text-ink placeholder-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-clay/40 focus:border-clay transition ${
    hasError ? "border-red-400" : "border-clay-soft"
  }`;

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

  return (
    <AuthLayout
      subtitle="Create your account in under a minute."
      altText="Already have an account?"
      altLinkText="Log in"
      altLinkTo="/login"
    >
      <form onSubmit={handleRegistration} className="space-y-4" noValidate>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-ink mb-1.5">
            Username
          </label>
          <div className="relative">
            <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/60" size={16} />
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? "username-error" : undefined}
              className={inputClass(!!errors.username)}
              placeholder="Choose a username"
            />
          </div>
          {errors.username && <p id="username-error" role="alert" className="mt-1 text-xs text-red-500">{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
            Email
          </label>
          <div className="relative">
            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/60" size={16} />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass(!!errors.email)}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && <p id="email-error" role="alert" className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-ink mb-1.5">
            Password
          </label>
          <div className="relative">
            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/60" size={16} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : "password-hint"}
              className={`${inputClass(!!errors.password)} pr-11`}
              placeholder="At least 6 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-ink-soft hover:text-ink">
              {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password ? (
            <p id="password-error" role="alert" className="mt-1 text-xs text-red-500">{errors.password}</p>
          ) : (
            <p id="password-hint" className="mt-1 text-xs text-ink-soft/70">Use 6 or more characters.</p>
          )}
        </div>

        {serverError && (
          <div role="alert" className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5">
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink hover:bg-clay disabled:opacity-60 text-cream font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-1">
          {loading ? (
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-cream" />
          ) : (
            "Create account"
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
