/* eslint-disable react/prop-types */
function DropdownContent ({isAuthenticated, handleLogout }) {

    return (
    <div id="content" className="lg:hidden block absolute top-14 w-full left-0 right-0  text-black text-bold transition z-50">
        <ul className="text-center text-xl p-20 ">
            <li className="my-4 py-4 border-b border-gray-400 hover:bg-indigo-300 hover:bg-opacity-25 hover:rounded hover: cursor-pointer">
                <a href="/">Home</a>
            </li>
            <li className="my-4 py-4 border-b  border-gray-400 hover:bg-indigo-300 hover:bg-opacity-25 hover:rounded hover: cursor-pointer">
                <a href="/products">Products</a>
            </li>
            <li className="my-4 py-4 border-b  border-gray-400 hover:bg-indigo-300 hover:bg-opacity-25 hover:rounded hover: cursor-pointer">
                <a href="/cart">Cart</a>
            </li>
            <li className="my-4 py-4 border-b  border-gray-400 hover:bg-indigo-300 hover:bg-opacity-25 hover:rounded hover: cursor-pointer">
                <a href="/contact">Contact</a>
            </li>
            {isAuthenticated ? (
                <li className="my-4 py-4 border-b  border-gray-400 hover:bg-indigo-300 hover:bg-opacity-25 hover:rounded hover: cursor-pointer">
                    <a href="/login" onClick={handleLogout}>
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
}

export default DropdownContent;