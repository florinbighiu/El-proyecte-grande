import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./pages/ProductList";
import Navbar from "./layout/Navbar";
import Cart from "./pages/Cart"
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <>
    <Router>
    <div>
      <Navbar />
      <div className="mx-5 pl-2 pr-3 py-1">
      <Routes>
        <Route path='/contact' element={<ContactPage />}></Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<ProductList />} />
        </Routes>
      </div>
    </div>
    </Router>
  </>
  );
}

export default App;
