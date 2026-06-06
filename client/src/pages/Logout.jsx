import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="bg-white bg-opacity-40 backdrop-blur-md border border-gray-200/60 p-8 rounded-2xl shadow-xl w-80 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Log Out</h2>
        <p className="text-gray-500 text-sm mb-6">Are you sure you want to log out of your account?</p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-full transition">
          Yes, Log Out
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-3 text-gray-500 hover:text-gray-700 text-sm transition">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
