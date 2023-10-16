import { useEffect, useState } from "react";
import axios from "axios";

import AddForm from "../components/AddForm";
import UpdateForm from "../components/UpdateForm";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [ProductId, setProductId] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products");
      if (response.status === 200) {
        setProducts(response.data);
        console.log(response.data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await axios.put(`http://localhost:8080/cart/products/add/${product.id}`);

      setProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.id === product.id ? { ...prevProduct, isInCart: true } : prevProduct
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
    console.log(newProduct);
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:8080/products/create", newProduct);

      setProducts((prevProducts) => [...prevProducts, response.data]);
      setShowForm(false);

      setNewProduct({
        name: "",
        price: 0,
        image: "",
        description: "",
      });
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      // Send a PUT request to update the product at localhost/8080/products/{updateProductId}
      const response = await axios.put(`http://localhost:8080/products/${ProductId}`, newProduct);

      // Update the products array with the updated product data
      setProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.id === ProductId ? { ...response.data } : prevProduct
        )
      );

      // Clear the update form and close it
      setNewProduct({
        name: "",
        price: 0,
        image: "",
        description: "",
      });
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleOpenUpdateForm = (productId) => {
    const productToUpdate = products.find((product) => product.id === productId);

    // Set the updateProductId and pre-fill the newProduct state with existing product data
    setProductId(productId);
    setNewProduct({ ...productToUpdate });
    setShowUpdateForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/products/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className=" container m-0.5 p-4 text-slate-500 dark:text-slate-400 rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
              handleDeleteProduct={handleDeleteProduct}
              handleOpenUpdateForm={handleOpenUpdateForm}
            />
          ))}
          <div className="group bg-white p-4 rounded-lg shadow-lg  backdrop-blur-md hover:cursor-pointer relative flex items-center justify-center w-60 h-inherit">
            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md ">
              Add
            </button>
          </div>
          {showUpdateForm && (
            <UpdateForm
              name={newProduct.name}
              price={newProduct.price}
              description={newProduct.description}
              image={newProduct.image}
              handleInputChange={handleInputChange}
              handleUpdate={handleUpdateProduct}
              onClose={() => setShowUpdateForm(false)}
            />
          )}
          {showForm && (
            <AddForm
              name={newProduct.name}
              price={newProduct.price}
              description={newProduct.description}
              image={newProduct.image}
              handleInputChange={handleInputChange}
              handleAddProduct={handleAddProduct}
              onClose={() => setShowForm(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
