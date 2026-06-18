import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-clay-soft text-ink-soft pt-12 mt-20">
    <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-extrabold tracking-tight text-ink mb-3">
          Ecom<span className="text-clay">X</span>
        </h3>
        <p className="text-sm leading-relaxed max-w-xs">
          A tightly edited shop of quality goods at honest prices — handpicked and
          delivered to your door.
        </p>
      </div>
      <div>
        <h3 className="text-xs font-semibold text-ink uppercase tracking-wider mb-4">Quick Links</h3>
        <ul className="space-y-2.5 text-sm">
          <li><Link to="/about" className="hover:text-clay transition-colors">About Us</Link></li>
          <li><Link to="/products" className="hover:text-clay transition-colors">Shop</Link></li>
          <li><Link to="/contact" className="hover:text-clay transition-colors">Contact Us</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xs font-semibold text-ink uppercase tracking-wider mb-4">Contact</h3>
        <address className="text-sm not-italic space-y-1.5">
          <p>123 Commerce St, San Francisco, CA</p>
          <p>support@ecomx.store</p>
          <p>+1 (555) 123-4567</p>
        </address>
      </div>
    </div>
    <div className="border-t border-clay-soft py-5 mt-10 text-center text-xs text-ink-soft/70">
      &copy; {new Date().getFullYear()} EcomX. All rights reserved.
    </div>
  </footer>
);

export default Footer;
