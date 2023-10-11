export default function Navbar() {
  return (
    <nav className="bg-gray-800 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-xl font-semibold ml-2">My Online Shop</span>
        </div>
        <ul className="flex space-x-4">
          <li className="text-white hover:text-yellow-500">
            <a href="/">Home</a>
          </li>
          <li className="text-white hover:text-yellow-500">
            <a href="/products">Products</a>
          </li>
          <li className="text-white hover:text-yellow-500">
            <a href="/cart">Cart</a>
          </li>
          <li className="text-white hover:text-yellow-500">
            <a href="/login">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

