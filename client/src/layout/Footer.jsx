
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-5">
          <div>
            <h3 className="text-2xl font-bold mb-4">eCommerce</h3>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id justo eu lectus elementum placerat.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul>
              <li>
                <a href="/">About Us</a>
              </li>
              <li>
                <a href="/products">Shop</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <address className="text-gray-400">
              123 Main Street<br />
              City, State ZIP<br />
              Email: info@example.com<br />
              Phone: (123) 456-7890
            </address>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-600 mt-8 pt-4 text-center">
        <p>&copy; {new Date().getFullYear()} eCommerce. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
