/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FiHome, FiShoppingBag, FiShoppingCart, FiMail, FiLogIn, FiLogOut } from "react-icons/fi";

const NavItem = ({ to, icon, label }) => (
  <li>
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition text-sm font-medium"
    >
      <span className="text-indigo-400">{icon}</span>
      {label}
    </Link>
  </li>
);

const DropdownContent = ({ isAuthenticated, handleLogout }) => {
  return (
    <div className="lg:hidden absolute top-14 w-full left-0 right-0 bg-white/97 backdrop-blur-sm border-b border-gray-200 shadow-lg z-50">
      <ul className="px-4 py-3 space-y-0.5">
        <NavItem to="/" icon={<FiHome size={16} />} label="Home" />
        <NavItem to="/products" icon={<FiShoppingBag size={16} />} label="Products" />
        {isAuthenticated && (
          <NavItem to="/cart" icon={<FiShoppingCart size={16} />} label="Cart" />
        )}
        <NavItem to="/contact" icon={<FiMail size={16} />} label="Contact" />
        <li className="pt-1 border-t border-gray-100 mt-1">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition text-sm font-medium"
            >
              <FiLogOut size={16} />
              Log Out
            </button>
          ) : (
            <NavItem to="/login" icon={<FiLogIn size={16} />} label="Log In" />
          )}
        </li>
      </ul>
    </div>
  );
};

export default DropdownContent;