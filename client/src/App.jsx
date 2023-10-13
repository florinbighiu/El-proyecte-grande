import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./components/ProductList";
import Navbar from "./layout/Navbar";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <div className="container mx-5 pl-2 pr-3 py-1">
      <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<ProductList />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
