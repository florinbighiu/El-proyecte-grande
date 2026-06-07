import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";

import ProductList from "./pages/ProductList";
import Navbar from "./layout/Navbar";
import Cart from "./pages/Cart";
import ContactPage from "./pages/ContactPage";
import Homepage from "./pages/Homepage";
import Footer from "./layout/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PasswordReset from "./pages/PasswordReset";
import OAuthCallback from "./pages/OAuthCallback";
import Logout from "./pages/Logout";
import ProductDetail from "./pages/ProductDetail";
import UserProfile from "./pages/UserProfile";
import BackToTopButton from "./layout/BackToTopButton";
import AboutUsPage from "./pages/AboutUsPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <div className="min-h-[80vh] px-3 flex items-start justify-center">
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/user" element={<UserProfile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/reset" element={<PasswordReset />} />
              <Route path="/oauth/callback" element={<OAuthCallback />} />
            </Routes>
          </div>
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          <BackToTopButton />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
