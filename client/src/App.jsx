import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./pages/ProductList";
import Navbar from "./layout/Navbar";
import Cart from "./pages/Cart"
import ContactPage from './pages/ContactPage';
import Homepage from './pages/Homepage';
import Footer from './layout/Footer';

function App() {
  return (
    <>
    <Router>
    <div>
      <Navbar />
      <div className="mx-5 pl-2 pr-3 py-1">
      <Routes>
        <Route path='/contact' element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductList />} />
          <Route path='/' element={<Homepage />}/>
        </Routes>
      </div>
      <Footer />
    </div>
    </Router>
  </>
  );
}

export default App;
