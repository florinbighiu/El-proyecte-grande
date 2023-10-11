import { useState } from "react";
import { Link } from "react-scroll";
import {FaTimes} from "react-icons/fa";
import {CiMenuFries} from "react-icons/ci";


const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () =>  setClick(!click);
  
    const content = <>
        <div className="lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-400 transition z-50">
            <ul className="text-center text-xl p-20">
                <Link spy={true} smooth={true} to="Home">
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-green-800 hover:rounded hover: cursor-pointer">Home</li>
                </Link >
                <Link spy={true} smooth={true} to="Products">
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-green-800 hover:rounded hover: cursor-pointer">Products</li>
                </Link>
                <Link spy={true} smooth={true} to="Cart">
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-green-800 hover:rounded hover: cursor-pointer">Cart</li>
                </Link>
                <Link spy={true} smooth={true} to="Contact">
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-green-800 hover:rounded hover: cursor-pointer">Contact</li>
                </Link>
                <Link spy={true} smooth={true} to="Login">
                    <li className="my-4 py-4 border-b border-slate-800 hover:bg-green-800 hover:rounded hover: cursor-pointer">Login</li>
                </Link>
            </ul>
        </div>
    </>
    return (
        <nav>
            <div className="bg-slate-400 h-10vh flex justify-between z-50 text-green lg:py-5 px-20 py-4 border-b border-slate-800">
                <div className="flex items-center flex-1">
                    <span className="text-3xl font-bold">Logo</span>
                </div>
                <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
                    <div className="flex-10">
                    <ul className="flex gap-8 mr-16 text-[18px]">
                <Link spy={true} smooth={true} to="Home">
                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Home</li>
                </Link>
                <Link spy={true} smooth={true} to="Products">
                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Products</li>
                </Link>
                <Link spy={true} smooth={true} to="Cart">
                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Cart</li>
                </Link>
                <Link spy={true} smooth={true} to="Contact">
                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Contact</li>
                </Link>
                <Link spy={true} smooth={true} to="Login">
                    <li className="hover:text-fuchsia-600 transition border-b-2 border-slate-900 hover:border-fuchsia-600 cursor-pointer">Login</li>
                </Link>
            </ul>
                    </div>
                </div>
                <div>
                    {click && content}
                </div>

                <button className="block sm:hidden transtion" onClick={handleClick}>
                    {click ? <FaTimes/> : <CiMenuFries/>}
                </button>

            </div>
        </nav>
    );
};

export default Navbar;