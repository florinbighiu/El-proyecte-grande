/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";

const ProfileDropdown = ({ handleLogout, userInfo }) => {
  const initial = userInfo?.username?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-xl bg-white border border-clay-soft z-50 overflow-hidden">
      <div className="relative px-4 py-3.5 bg-ink flex items-center gap-3 overflow-hidden">
        <div className="absolute -top-8 -right-6 w-24 h-24 rounded-full bg-clay/30 blur-2xl" aria-hidden />
        <div className="relative w-9 h-9 rounded-full bg-clay flex items-center justify-center text-cream font-bold text-sm shrink-0">
          {initial}
        </div>
        <div className="relative overflow-hidden">
          <p className="text-cream font-semibold text-sm truncate">{userInfo?.username ?? "User"}</p>
          {userInfo?.email && <p className="text-cream/50 text-xs truncate">{userInfo.email}</p>}
        </div>
      </div>

      <div className="py-1">
        <Link
          to="/user"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink hover:bg-cream-deep transition-colors"
          role="menuitem"
        >
          <FiUser className="text-clay" size={15} />
          My Profile
        </Link>
        <div className="border-t border-clay-soft mx-3" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition-colors"
          role="menuitem"
        >
          <FiLogOut size={15} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
