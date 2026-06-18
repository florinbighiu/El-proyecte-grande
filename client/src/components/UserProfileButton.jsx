/* eslint-disable react/prop-types */
const UserProfileButton = ({ toggleDropdown, userInfo }) => {
  const initial = userInfo?.username?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="pr-4">
      <button
        onClick={toggleDropdown}
        type="button"
        title={userInfo?.username ?? "Profile"}
        className="w-9 h-9 rounded-full bg-ink hover:bg-clay text-cream font-bold text-sm flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-clay/50 focus:ring-offset-1 focus:ring-offset-cream"
      >
        {initial}
      </button>
    </div>
  );
};

export default UserProfileButton;