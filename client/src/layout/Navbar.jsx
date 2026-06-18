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
  "text-ink-soft hover:text-clay hover:bg-clay-soft rounded-lg px-3 py-2 text-sm font-medium transition-colors";

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
    <nav className="w-full bg-cream/85 backdrop-blur-sm border-b border-clay-soft sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={LogoImage} alt="Logo" className="w-8 h-8" />
          <span className="text-xl font-extrabold tracking-tight text-ink">
            Ecom<span className="text-clay">X</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          <Link to="/" className={navLinkClass}>Home</Link>
          <Link to="/products" className={navLinkClass}>Products</Link>
          {isAuthenticated && <Link to="/cart" className={navLinkClass}>Cart</Link>}
          <Link to="/contact" className={navLinkClass}>Contact</Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-sm font-medium text-clay hover:text-clay-dark hover:bg-clay-soft rounded-lg px-3 py-2 transition-colors">
              <FiShield size={14} />
              Admin
            </Link>
          )}
          {!isAuthenticated && (
            <Link
              to="/login"
              className="ml-4 bg-ink hover:bg-clay text-cream text-sm font-semibold rounded-full px-5 py-2 transition-colors">
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
            className="lg:hidden text-ink hover:text-clay transition-colors p-1"
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