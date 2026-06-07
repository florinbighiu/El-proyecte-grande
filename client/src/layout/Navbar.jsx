import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

import { FiShield } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import { getUserInfo } from "../api/userInfo";
import ProfileDropdown from "../components/ProfileDropdown";
import DropdownContent from "../components/DropdownContent";
import UserProfileButton from "../components/UserProfileButton";
import LogoImage from "../assets/carton.png";

const navLinkClass =
  "text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg px-3 py-2 text-sm font-medium transition";

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (isAuthenticated) getUserInfo(setUserInfo);
    else setUserInfo(null);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={LogoImage} alt="Logo" className="w-8 h-8" />
          <span className="text-xl text-[#bd927c] font-semibold">EcomX</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <Link to="/" className={navLinkClass}>Home</Link>
          <Link to="/products" className={navLinkClass}>Products</Link>
          {isAuthenticated && <Link to="/cart" className={navLinkClass}>Cart</Link>}
          <Link to="/contact" className={navLinkClass}>Contact</Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-800 hover:bg-violet-50 rounded-lg px-3 py-2 transition">
              <FiShield size={14} />
              Admin
            </Link>
          )}
          {!isAuthenticated && (
            <Link
              to="/login"
              className="ml-4 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-full px-5 py-2 transition">
              Log in
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <div className="relative">
              <UserProfileButton
                toggleDropdown={() => setDropdownOpen((o) => !o)}
                userInfo={userInfo}
              />
              {dropdownOpen && (
                <ProfileDropdown handleLogout={handleLogout} userInfo={userInfo} />
              )}
            </div>
          )}
          <button
            className="lg:hidden text-slate-600 hover:text-indigo-700 transition p-1"
            onClick={() => setMobileOpen((o) => !o)}>
            {mobileOpen ? <FaTimes size={18} /> : <CiMenuFries size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <DropdownContent isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      )}
    </nav>
  );
};

export default Navbar;