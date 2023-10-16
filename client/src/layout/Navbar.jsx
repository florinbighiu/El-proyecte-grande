import { useState } from "react";
import { Link } from "react-scroll";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import LogoImage from "../assets/shoppingcart.png"

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const content = (
    <>
      <div className="lg:hidden backdrop-blur-xl block absolute top-12 w-full left-0 right-0  text-white transition z-50">
        <ul className="text-center text-xl p-20 ">
          <Link spy={true} smooth={true} to="Home">
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-green-800 hover:rounded hover: cursor-pointer">
              Home
            </li>
          </Link>
          <Link spy={true} smooth={true} to="/products">
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-green-800 hover:rounded hover: cursor-pointer">
              Products
            </li>
          </Link>
          <Link spy={true} smooth={true} to="Cart">
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-green-800 hover:rounded hover: cursor-pointer">
              Cart
            </li>
          </Link>
          <Link spy={true} smooth={true} to="Contact">
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-green-800 hover:rounded hover: cursor-pointer">
              Contact
            </li>
          </Link>
          <Link spy={true} smooth={true} to="Login">
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-green-800 hover:rounded hover: cursor-pointer">
              Login
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
  return (
    <nav className="sticky top-0 z-40 w-full bg-gradient-to-r from-rose-100 to-teal-100 flex transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
      <div className="flex items-start flex-1 justify-start ml-24">
        <a href="/">
          <img src={LogoImage} alt="Logo" className=" w-12 my-1" />
          </a>
        </div>
        <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden ">
          <div className="flex-10 py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
            <ul className="flex space-x-8 font-serif font-bold text-base">
              <li className="text-black hover:text-yellow-500">
                <a href="/">Home</a>
              </li>
              <li className="text-black hover:text-yellow-500">
                <a href="/">Products</a>
              </li>
              <li className="text-black hover:text-yellow-500">
                <a href="http://localhost:5173/cart">Cart</a>
              </li>
              <li className="text-black hover:text-yellow-500">
                <a href="/contact">Contact</a>
              </li>
              <li className="text-black hover:text-yellow-500 pl-8">
                <a
                  href="/"
                  className="text-black bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-blue-300 font-serif font-bold text-base rounded-lg px-5 py-2 mr-2 mb-2">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>{click && content}</div>

        <button className="hidden visible-below-767 transition" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
