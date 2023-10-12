import ProductList from "./components/ProductList";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto pl-2 pr-3 py-1">
        <ProductList />
      </div>
    </div>
  );
}

export default App;
