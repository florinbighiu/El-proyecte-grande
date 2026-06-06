/* eslint-disable react/prop-types */
const UserProfileButton = ({ toggleDropdown, userInfo }) => {
  const initial = userInfo?.username?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="pr-4">
      <button
        onClick={toggleDropdown}
        type="button"
        title={userInfo?.username ?? "Profile"}
        className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
      >
        {initial}
      </button>
    </div>
  );
};

export default UserProfileButton;