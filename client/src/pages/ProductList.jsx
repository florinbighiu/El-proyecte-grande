import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import AddForm from "../components/AddForm";
import UpdateForm from "../components/UpdateForm";
import ProductCard from "../components/ProductCard";
import Loading from "../layout/Loading.jsx";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = React.useState([20, 37]);
  const [sortByPriceAsc, setSortByPriceAsc] = useState(true);
  const [sortAlphabeticallyAsc, setSortAlphabeticallyAsc] = useState(true);
  console.log("sortPrice");
  console.log(sortByPriceAsc);

  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("role");

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
  });

  const fetchProducts = async () => {
    try {
      if (!token) {
        return;
      }

      const response = await fetch("http://localhost:8080/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, PUT, POST, DELETE, PATCH, OPTIONS",
        },
      });

      if (response) {
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchProducts();
    }, 2000);
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await fetch(`http://localhost:8080/cart/products/add/${product.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, PUT, POST, DELETE, PATCH, OPTIONS",
        },
      });
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

  const handleSearchQueryInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchProducts = async () => {
    try {
      if (searchQuery.trim() === "") {
        fetchProducts();
        return;
      }

      const response = await fetch(
        `http://localhost:8080/products/search?query=${searchQuery}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&sortByPriceAsc=${sortByPriceAsc}&sortAlphabeticallyAsc=${sortAlphabeticallyAsc}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, PUT, POST, DELETE, PATCH, OPTIONS",
          },
        }
      );

      if (response) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to search products");
      }
    } catch (error) {
      console.error("Error searching products", error);
    }
  };

  const handleChange = (event, priceRange) => {
    setPriceRange(priceRange);
  };

  console.log(priceRange);

  const handlePriceSort = () => {
    setSortByPriceAsc(!sortByPriceAsc);
  };

  const handleAlphabeticalSort = () => {
    setSortAlphabeticallyAsc(!sortAlphabeticallyAsc);
  };

  return (
    <div className="flex flex-col text-white">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>

      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryInput}
          placeholder="Search products..."
          className="border border-gray-300 rounded-md py-2 px-3 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
        />
        <button
          onClick={handleSearchProducts}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Search
        </button>
      </div>
      <Box sx={{ width: 300 }}>
        {/* <input type="text" value={priceRange[0]}>
          $${priceRange[0]}
        </input> */}
        <Slider
          valueLabelDisplay="auto"
          onChange={handleChange}
          value={priceRange}
        />
        {/* <input value={priceRange[1]}></input> */}
      </Box>
      <div className="flex items-center my-4">
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md mx-2"
          onClick={handlePriceSort}
        >
          Sort by Price
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md mx-2"
          onClick={handleAlphabeticalSort}
        >
          Sort Alphabetically{" "}
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="m-0.5 p-4 text-slate-500 dark:text-white rounded-xl">
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
            {userRole === "1" && (
              <div className="group bg-slate-800 p-4 rounded-lg shadow-lg backdrop-blur-md hover:cursor-pointer relative flex items-center justify-center w-60 h-inherit">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md sm:w-full md:w-32"
                >
                  Add
                </button>
              </div>
            )}
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
      )}
    </div>
  );
}

export default ProductList;
