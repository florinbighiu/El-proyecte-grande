import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff, FiUser, FiLock } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../api/apiService";
import AuthLayout from "../layout/AuthLayout";

const validate = (formData) => {
  const errors = {};
  if (!formData.username.trim()) errors.username = "Username is required.";
  if (!formData.password) errors.password = "Password is required.";
  return errors;
};

const inputClass = (hasError) =>
  `w-full pl-11 pr-3.5 py-2.5 bg-white border rounded-lg text-ink placeholder-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-clay/40 focus:border-clay transition ${
    hasError ? "border-red-400" : "border-clay-soft"
  }`;

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ username: "", password: "" });
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
      const redirectTo = location.state?.from?.pathname ?? "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid username or password.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      subtitle="Sign in to continue to your account."
      altText="Don't have an account?"
      altLinkText="Register"
      altLinkTo="/signup"
    >
      <form onSubmit={handleLogin} className="space-y-4" noValidate>
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
              placeholder="Your username"
            />
          </div>
          {errors.username && <p id="username-error" role="alert" className="mt-1 text-xs text-red-500">{errors.username}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-ink">
              Password
            </label>
            <Link to="/reset" className="text-xs text-clay-dark hover:text-clay font-medium">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/60" size={16} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`${inputClass(!!errors.password)} pr-11`}
              placeholder="Your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-ink-soft hover:text-ink">
              {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p id="password-error" role="alert" className="mt-1 text-xs text-red-500">{errors.password}</p>}
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
            "Login"
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
