import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductList from "./pages/ProductList";
import Navbar from "./layout/Navbar";
import Cart from "./pages/Cart";
import ContactPage from "./pages/ContactPage";
import Homepage from "./pages/Homepage";
import Footer from "./layout/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PasswordReset from "./pages/PasswordReset";
import Logout from "./pages/Logout";

function App() {
 
  return (
    <Router>
      <div>
        <Navbar />
        <div className="mx-5 pl-2 pr-3 py-1">
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignupPage />}></Route>
            <Route path="/reset" element={<PasswordReset />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
