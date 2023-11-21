/* eslint-disable react/prop-types */
function ProfileDropdown({ handleLogout, userInfo }) {

    return (
        <div className="absolute right-4 top-12 mt-2 w-36 h-36 rounded-lg shadow-lg bg-white">
            <div
                className="py-1 h-full flex flex-col items-center justify-evenly"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
            >
                {userInfo &&
                        <h1 className="block px-4 py-2 text-md w-full text-center text-gray-700 rounded-t-lg bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">{userInfo?.username}</h1>
                }
                <a
                    href="/user"
                    className="block px-4 py-2 text-sm w-full text-center text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                >
                    Profile
                </a>
                <a
                    href="#"
                    className="block px-4 py-2 text-sm w-full text-center text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                >
                    Settings
                </a>
                <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm w-full text-gray-700 hover:bg-gray-100 hover:rounded-lg"
                    role="menuitem"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default ProfileDropdown;