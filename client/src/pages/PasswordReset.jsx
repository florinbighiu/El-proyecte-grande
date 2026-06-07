import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import apiService from "../api/apiService";
import Logo from "../assets/carton.png";

const inputClass = (hasError) =>
  `w-full px-3.5 py-2.5 bg-white border rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 transition ${hasError ? "border-red-400" : "border-gray-300"}`;

const Card = ({ title, subtitle, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-200/60 w-full max-w-sm px-8 py-10">
      <div className="flex flex-col items-center text-center mb-6">
        <img src={Logo} alt="Logo" className="w-12 h-12 mb-3" />
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  </div>
);

const RequestResetForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await apiService.post("/auth/reset/request", { email });
      setSent(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong. Please try again.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center space-y-4">
        <p className="text-gray-600 text-sm" role="status">
          If an account exists for <span className="font-medium text-gray-800">{email}</span>, we've sent a link to reset your password.
        </p>
        <Link to="/login" className="inline-block text-indigo-600 hover:text-indigo-700 font-medium text-sm">
          Back to log in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={error ? "email-error" : undefined}
          className={inputClass(!!error)}
          placeholder="your@email.com"
        />
        {error && <p id="email-error" role="alert" className="mt-1 text-xs text-red-500">{error}</p>}
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
          "Send reset link"
        )}
      </button>

      <p className="text-center text-sm text-gray-500">
        Remember your password?{" "}
        <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
          Log in
        </Link>
      </p>
    </form>
  );
};

const ConfirmResetForm = ({ token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
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

  const validate = () => {
    const validationErrors = {};
    if (!formData.newPassword) {
      validationErrors.newPassword = "Password is required.";
    } else if (formData.newPassword.length < 6) {
      validationErrors.newPassword = "Password must be at least 6 characters.";
    }
    if (formData.confirmPassword !== formData.newPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await apiService.post("/auth/reset/confirm", { token, newPassword: formData.newPassword });
      toast.success("Password updated. You can now log in.");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Reset link is invalid or has expired.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              aria-invalid={!!errors.newPassword}
              aria-describedby={errors.newPassword ? "newPassword-error" : undefined}
              className={`${inputClass(!!errors.newPassword)} pr-11`}
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
          {errors.newPassword && <p id="newPassword-error" role="alert" className="mt-1 text-xs text-red-500">{errors.newPassword}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm new password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            className={inputClass(!!errors.confirmPassword)}
            placeholder="Re-enter your new password"
          />
          {errors.confirmPassword && <p id="confirmPassword-error" role="alert" className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
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
            "Update password"
          )}
        </button>
    </form>
  );
};

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return (
    <Card
      title={token ? "Set a new password" : "Reset your password"}
      subtitle={token ? "Choose a new password for your account" : "Enter your email and we'll send you a link to reset your password"}>
      {token ? <ConfirmResetForm token={token} /> : <RequestResetForm />}
    </Card>
  );
};

export default PasswordReset;
