/* eslint-disable react/prop-types */
import { FaUserAlt } from "react-icons/fa";

const UserProfileButton = ({ toggleDropdown }) => {

    return (
        <div className="pr-4">
            <button
                onClick={toggleDropdown}
                type="button"
                className="text-black p-2 rounded-full border border-black/50 text-xl focus:outline-none"
            >
                <FaUserAlt />
            </button>
        </div>
    )
}

export default UserProfileButton;