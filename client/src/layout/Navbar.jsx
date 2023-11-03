import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

import LogoImage from "../assets/carton.png";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const logout = () => {
    localStorage.removeItem("authToken");

    window.location.href = "/login";
  };

  const isAuthenticated = localStorage.getItem("authToken");

  const content = (
    <div className="lg:hidden bg-gray-200 block absolute top-14 w-full left-0 right-0  text-black text-bold transition z-50">
      <ul className="text-center text-xl p-20 ">
        <li className="my-4 py-4 border-b border-gray-400 hover:bg-gray-300 hover:rounded hover: cursor-pointer">
          <a href="/">Home</a>
        </li>
        <li className="my-4 py-4 border-b  border-gray-400 hover:bg-gray-300 hover:rounded hover: cursor-pointer">
          <a href="/products">Products</a>
        </li>
        <li className="my-4 py-4 border-b  border-gray-400 hover:bg-gray-300 hover:rounded hover: cursor-pointer">
          <a href="/cart">Cart</a>
        </li>
        <li className="my-4 py-4 border-b  border-gray-400 hover:bg-gray-300 hover:rounded hover: cursor-pointer">
          <a href="/contact">Contact</a>
        </li>
        {isAuthenticated ? (
          <li className="my-4 py-4 border-b  border-gray-400 hover:bg-gray-300 hover:rounded hover: cursor-pointer">
            <a href="/login" onClick={logout}>
              Logout
            </a>
          </li>
        ) : (
          <li className="my-4 py-4 border-b  border-slate-800 hover:bg-slate-700 hover:rounded hover: cursor-pointer">
            <a href="/login">Log In</a>
          </li>
        )}
      </ul>
    </div>
  );

  return (
    <nav className="z-50 text-sm font-medium text-white bg-gray-200">
      <div className=" mx-auto w-full flex flex-wrap justify-between items-center">
        <div className="flex items-center pl-24">
          <a href="/">
            <img src={LogoImage} alt="Logo" className="w-10 h-10 my-1" />
          </a>
          <a href="/">
            <div className="text-xl text-[#bd927c] ml-4 font-semibold font-body">eCommerce</div>
          </a>
        </div>
        <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
          <div className="flex-10 py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
            <ul className="flex space-x-8 font-bold font-serif text-base">
              <li className="text-black hover:text-yellow-500">
                <a href="/">Home</a>
              </li>
              <li className="text-black hover:text-yellow-500">
                <a href="/products">Products</a>
              </li>
              <li className="text-black hover:text-yellow-500">
                <a href="/cart">Cart</a>
              </li>
              <li className="text-black hover:text-yellow-500">
                <a href="/contact">Contact</a>
              </li>
              {isAuthenticated ? (
                <li className="text-black hover:text-yellow-500 pl-8">
                  <a
                    href="/login"
                    onClick={logout}
                    className="text-black bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-blue-300 font-serif font-bold text-base rounded-lg px-5 py-2 mr-2 mb-2">
                    Logout
                  </a>
                </li>
              ) : (
                <li className="text-black hover:text-yellow-500 pl-8">
                  <a
                    href="/login"
                    className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-blue-300 font-serif font-bold text-base rounded-lg px-5 py-2 mr-2 mb-2">
                    Log In
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div>{click && content}</div>
        <button className="hidden text-black visible-below-767 transition mr-5" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
