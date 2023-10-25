import { useEffect, useState } from "react";
import axios from "axios";

import AddForm from "../components/AddForm";
import UpdateForm from "../components/UpdateForm";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
  });

  const fetchProducts = async () => {
    const jwt =
      "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW4iLCJpYXQiOjE2OTgxNzE4NjMsInJvbGVzIjoiQURNSU4ifQ.GoPhsp8nVhPvghxd08UPR4cG0Jm9MJpyGp45h3jL8FB-MvFzm9lOuw0wG4jx_7ur9k4pONR17__PypxyMDvR63bLAYhBi4daWcnQT2nIvXwMwRLDXpfdWxAvuqB8aGxULeX1J44w2bySd5VRHFb4wPbAB7RdVqJIQcENKQFV8vSTN_16f2BQG-ZTGQrnlsuuPCEyY5et2-die97xSfrkSJir2LKfnIaqNznJozVyo_jIdb6-GB7Mb4U28-ufH4LpDDkBxhV_8dnNnMKXNzl9k1QyGVom_fUVcOJD16iLERwzu9EDhWzvi3DcIBcPGkj-5T1d-HwdpB1q4jtcmJaG-A";

    const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "http://localhost:8080/products";

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + jwt,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await axios.put(`http://localhost:8080/cart/products/add/${product.id}`);
      const updatedProducts = products.map((prevProduct) =>
        prevProduct.id === product.id
          ? { ...prevProduct, isInCart: true }
          : prevProduct
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleAddProduct = async () => {
    try {
      if (
        newProduct.name === "" ||
        newProduct.price === 0 ||
        newProduct.image === "" ||
        newProduct.description === ""
      ) {
        console.error("Please fill in all fields.");
      } else {
        const response = await axios.post(
          "http://localhost:8080/products/create",
          newProduct
        );
        setProducts((prevProducts) => [...prevProducts, response.data]);
        setShowForm(false);
        setNewProduct({
          name: "",
          price: 0,
          image: "",
          description: "",
        });
      }
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/products/${productIdToUpdate}`,
        newProduct
      );
      const updatedProducts = products.map((prevProduct) =>
        prevProduct.id === productIdToUpdate
          ? { ...response.data }
          : prevProduct
      );
      setProducts(updatedProducts);
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
    const productToUpdate = products.find(
      (product) => product.id === productId
    );
    setProductIdToUpdate(productId);
    setNewProduct({ ...productToUpdate });
    setShowUpdateForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/products/${productId}`);
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="m-0.5 p-4 text-slate-500 dark:text-slate-400 rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-fit">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
              handleDeleteProduct={handleDeleteProduct}
              handleOpenUpdateForm={handleOpenUpdateForm}
            />
          ))}
          <div className="group bg-white p-4 rounded-lg shadow-lg backdrop-blur-md hover:cursor-pointer relative flex items-center justify-center w-60 h-inherit">
            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md sm:w-full md:w-32"
            >
              Add
            </button>
          </div>
          {showUpdateForm && (
            <UpdateForm
              {...newProduct}
              handleInputChange={handleInputChange}
              handleUpdate={handleUpdateProduct}
              onClose={() => setShowUpdateForm(false)}
            />
          )}
          {showForm && (
            <AddForm
              {...newProduct}
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
