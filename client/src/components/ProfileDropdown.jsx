/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";

const ProfileDropdown = ({ handleLogout, userInfo }) => {
  const initial = userInfo?.username?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-xl bg-white border border-gray-100 z-50 overflow-hidden">
      <div className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {initial}
        </div>
        <div className="overflow-hidden">
          <p className="text-white font-semibold text-sm truncate">{userInfo?.username ?? "User"}</p>
          {userInfo?.email && (
            <p className="text-indigo-100 text-xs truncate">{userInfo.email}</p>
          )}
        </div>
      </div>

      <div className="py-1">
        <Link
          to="/user"
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
          role="menuitem"
        >
          <FiUser className="text-indigo-500" size={15} />
          My Profile
        </Link>
        <div className="border-t border-gray-100 mx-3" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full transition"
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