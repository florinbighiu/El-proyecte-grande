import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-gray-200 text-slate-500 pt-10 mt-20">
    <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">EcomX</h3>
        <p className="text-sm leading-relaxed">
          Your destination for the best deals on quality products, delivered straight to your door.
        </p>
      </div>
      <div>
        <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-4">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li><Link to="/about" className="hover:text-indigo-600 transition">About Us</Link></li>
          <li><Link to="/products" className="hover:text-indigo-600 transition">Shop</Link></li>
          <li><Link to="/contact" className="hover:text-indigo-600 transition">Contact Us</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-4">Contact</h3>
        <address className="text-sm not-italic space-y-1.5">
          <p>123 Main Street, City, State ZIP</p>
          <p>info@example.com</p>
          <p>(123) 456-7890</p>
        </address>
      </div>
    </div>
    <div className="border-t border-gray-200 py-5 mt-8 text-center text-xs text-slate-400">
      &copy; {new Date().getFullYear()} EcomX. All rights reserved.
    </div>
  </footer>
);

export default Footer;