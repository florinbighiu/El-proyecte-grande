import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./Navbar.css";

const Home = () => <h1>Welcome to the Home Page</h1>;
const About = () => <h1>About Us</h1>;
const Contact = () => <h1>Contact Us</h1>;

const Navbar = () => {
  return (
    <Router>
      <div>
      <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          My Online Shop
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/products">Products</Link>
          </li>
          <li className="navbar-item">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Routes>
      </div>
    </Router>
  );
};

export default Navbar;
