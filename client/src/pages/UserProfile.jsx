import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getUserInfo } from "../api/userInfo";
import apiService from "../api/apiService";
import Loading from "../layout/Loading";
import { toast } from "react-hot-toast";
import { FiUser, FiMail, FiShield, FiEdit2, FiEye, FiEyeOff } from "react-icons/fi";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_PASSWORD_FORM = { currentPassword: "", newPassword: "", confirmPassword: "" };

const UserProfile = () => {
  const { isAdmin } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);

  const [passwordForm, setPasswordForm] = useState(EMPTY_PASSWORD_FORM);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [visibleFields, setVisibleFields] = useState({});
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    getUserInfo(setUserInfo);
  }, []);

  if (!userInfo) return <Loading />;

  const role = userInfo.authorities?.[0]?.authority ?? "USER";

  const toggleFieldVisibility = (name) => {
    setVisibleFields((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleStartEditEmail = () => {
    setEmailValue(userInfo.email ?? "");
    setEmailError("");
    setIsEditingEmail(true);
  };

  const handleCancelEditEmail = () => {
    setIsEditingEmail(false);
    setEmailError("");
  };

  const handleSaveEmail = async () => {
    const trimmed = emailValue.trim();
    if (!trimmed) {
      setEmailError("Email is required.");
      return;
    }
    if (!EMAIL_PATTERN.test(trimmed)) {
      setEmailError("Email must be a valid address.");
      return;
    }

    setSavingEmail(true);
    try {
      const res = await apiService.put("/users/me", { email: trimmed });
      setUserInfo(res.data);
      setIsEditingEmail(false);
      toast.success("Email updated successfully!");
    } catch (err) {
      setEmailError(err.response?.data?.message || "Failed to update email.");
    } finally {
      setSavingEmail(false);
    }
  };

  const handlePasswordFieldChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setPasswordErrors((prev) => ({ ...prev, [name]: null, server: null }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!passwordForm.currentPassword) errors.currentPassword = "Current password is required.";
    if (!passwordForm.newPassword) errors.newPassword = "Password is required.";
    else if (passwordForm.newPassword.length < 6) errors.newPassword = "Password must be at least 6 characters long.";
    if (passwordForm.confirmPassword !== passwordForm.newPassword) errors.confirmPassword = "Passwords do not match.";

    if (Object.keys(errors).length) {
      setPasswordErrors(errors);
      return;
    }

    setChangingPassword(true);
    try {
      await apiService.put("/users/me/password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm(EMPTY_PASSWORD_FORM);
      setPasswordErrors({});
      toast.success("Password updated successfully!");
    } catch (err) {
      setPasswordErrors({ server: err.response?.data?.message || "Failed to update password." });
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 mb-16 px-4 space-y-6">
      <div className="bg-white bg-opacity-40 backdrop-blur-md border border-gray-200/60 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 h-28" />

        <div className="px-8 pb-8">
          <div className="-mt-14 mb-4 flex items-end gap-4">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold uppercase">
              {userInfo.username?.[0] ?? "U"}
            </div>
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-gray-800">{userInfo.username}</h1>
              <span className={`text-xs px-3 py-0.5 rounded-full font-semibold ${isAdmin ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                {role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <InfoCard icon={<FiUser />} label="Username" value={userInfo.username} title="Username cannot be changed" />
            <InfoCard icon={<FiMail />} label="Email" value={userInfo.email || "Not set"} />
            <InfoCard icon={<FiShield />} label="Role" value={role} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">Email address</h2>

        {isEditingEmail ? (
          <div>
            <input
              type="email"
              value={emailValue}
              onChange={(e) => { setEmailValue(e.target.value); setEmailError(""); }}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "email-error" : undefined}
              className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 transition ${emailError ? "border-red-400" : "border-gray-300"}`}
              placeholder="you@example.com"
            />
            {emailError && <p id="email-error" role="alert" className="mt-1 text-xs text-red-500">{emailError}</p>}
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleSaveEmail}
                disabled={savingEmail}
                className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-semibold py-2 px-5 rounded-full transition text-sm">
                {savingEmail ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancelEditEmail}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-5 rounded-full transition text-sm">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">{userInfo.email || "Not set"}</span>
            <button
              onClick={handleStartEditEmail}
              className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              <FiEdit2 size={14} />
              Edit
            </button>
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <h2 className="text-base font-semibold text-slate-800 mb-4">Change password</h2>

        <form onSubmit={handleChangePassword} className="space-y-4" noValidate>
          <PasswordField
            label="Current password"
            name="currentPassword"
            value={passwordForm.currentPassword}
            error={passwordErrors.currentPassword}
            visible={!!visibleFields.currentPassword}
            onChange={handlePasswordFieldChange}
            onToggleVisibility={() => toggleFieldVisibility("currentPassword")}
          />
          <PasswordField
            label="New password"
            name="newPassword"
            value={passwordForm.newPassword}
            error={passwordErrors.newPassword}
            visible={!!visibleFields.newPassword}
            onChange={handlePasswordFieldChange}
            onToggleVisibility={() => toggleFieldVisibility("newPassword")}
          />
          <PasswordField
            label="Confirm new password"
            name="confirmPassword"
            value={passwordForm.confirmPassword}
            error={passwordErrors.confirmPassword}
            visible={!!visibleFields.confirmPassword}
            onChange={handlePasswordFieldChange}
            onToggleVisibility={() => toggleFieldVisibility("confirmPassword")}
          />

          {passwordErrors.server && (
            <div role="alert" className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2">
              {passwordErrors.server}
            </div>
          )}

          <button
            type="submit"
            disabled={changingPassword}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-semibold py-2.5 px-6 rounded-full transition text-sm">
            {changingPassword ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value, title }) => (
  <div className="bg-white bg-opacity-60 border border-gray-100 rounded-xl p-4 flex items-center gap-3" title={title}>
    <div className="text-indigo-500 text-xl">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">{value}</p>
    </div>
  </div>
);

const PasswordField = ({ label, name, value, error, visible, onChange, onToggleVisibility }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full px-3.5 py-2.5 pr-11 bg-white border rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 transition ${error ? "border-red-400" : "border-gray-300"}`}
        placeholder="••••••••"
      />
      <button
        type="button"
        onClick={onToggleVisibility}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600">
        {visible ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
      </button>
    </div>
    {error && <p id={`${name}-error`} role="alert" className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export default UserProfile;
