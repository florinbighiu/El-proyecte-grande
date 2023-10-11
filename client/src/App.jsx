import ProductList from "./components/ProductList";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <ProductList />
      </div>
    </div>
  );
}

export default App;
