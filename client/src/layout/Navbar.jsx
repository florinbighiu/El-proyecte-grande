import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

import { getUserInfo } from "../api/userInfo";
import ProfileDropdown from "../components/ProfileDropdown";
import DropdownContent from "../components/DropdownContent";
import UserProfileButton from "../components/UserProfileButton";

import LogoImage from "../assets/carton.png";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserInfo(setUserInfo)
  }, [])

  const handleClick = () => setClick(!click);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();

    window.location.href = "/login";
  };

  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <nav>
      <div className="my-1 w-full flex flex-wrap justify-between items-center">
        <div className="sticky left-0 flex items-center mx-12">
          <a href="/">
            <img src={LogoImage} alt="Logo" className="w-10 h-10 my-1" />
          </a>
          <a href="/">
            <div className="text-xl text-[#bd927c] ml-4 font-semibold font-body">EcomX</div>
          </a>
        </div>
        <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
          <div className="flex-10 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
            {isAuthenticated ? (
              <>
              <ul className="flex font-semibold font-serif text-md">
                <li className="text-black py-2 px-2 cursor-pointer hover:bg-slate-500 hover:bg-opacity-5 hover:shadow-xl rounded-full">
                  <a href="/" className="px-1">Home</a>
                </li>
                <li className="text-black p-2 px-3 cursor-pointer hover:bg-slate-500 hover:bg-opacity-5 hover:shadow-xl rounded-full">
                  <a href="/products" className="px-1">Products</a>
                </li>
                <li className="text-black p-2 px-3 cursor-pointer hover:bg-slate-500 hover:bg-opacity-5 hover:shadow-xl rounded-full">
                  <a href="/cart" className="">Cart</a>
                </li>
                <li className="text-black p-2 px-3 cursor-pointer hover:bg-slate-500 hover:bg-opacity-5 hover:shadow-xl rounded-full">
                  <a href="/contact" className="px-1">Contact</a>
                </li>
              </ul>
              {isDropdownOpen && isAuthenticated && <ProfileDropdown handleLogout={handleLogout} userInfo={userInfo} />}
              </>
            ) : (
              <ul className="flex font-bold font-serif text-base">
                <li className="text-black hover:text-yellow-500 my-2">
                  <a href="/" className="text-black hover:bg-indigo-200 hover:bg-opacity-25 font-serif text-base rounded-full px-2 py-3 mb-2">Home</a>
                </li>
                <li className="text-black hover:text-yellow-500 my-2">
                  <a href="/contact" className="text-black hover:bg-indigo-200 hover:bg-opacity-25  font-serif text-base rounded-full px-3 py-2 mb-2">Contact</a>
                </li>
                <li className="text-black hover:text-yellow-500 my-2 pl-12">
                  <a
                    href="/login"
                    className="text-black border border-indigo-600/50 hover:text-white hover:bg-indigo-600 hover:shadow-lg focus:ring-4 focus:ring-blue-300 font-serif text-base rounded-full px-5 py-2 mb-2">
                    Log in
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-end space-x-5">
          {click && <DropdownContent isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}
          <button className="hidden text-black visible-below-767 transition mx-0" onClick={handleClick}>
            {click ? <FaTimes /> : <CiMenuFries />}
          </button>
          {isAuthenticated && <UserProfileButton toggleDropdown={toggleDropdown} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
