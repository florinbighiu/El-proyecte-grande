import { useEffect, useState } from "react";
import axios from "axios";

import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import Loading from "../layout/Loading.jsx";
import CategoryDropdown from "../components/CategoryDropdown.jsx";
import { getUserRole, getToken, defaultQuantity } from "../utils/authConstants.js";
import { API_BASE_URL } from "../api/apiRoute.js";
import { handleAddToCart } from "../api/addToCart.js";
import { fetchProducts } from "../api/fetchProducts.js";

import toast from "react-hot-toast";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({});

  const token = getToken();
  const userRole = getUserRole();
  const quantity = defaultQuantity;

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    thumbnail: "",
  });

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));


  useEffect(() => {
    fetchProducts(setProducts, setIsLoading);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleAddProduct = async () => {
    try {
      if (
        newProduct.title === "" ||
        newProduct.price === 0 ||
        newProduct.stock === 0 ||
        newProduct.discountPercentage === 0 ||
        newProduct.brand === "" ||
        newProduct.rating === 0 ||
        newProduct.category === "" ||
        newProduct.thumbnail === "" ||
        newProduct.description === ""
      ) {
        const newErrors = {
          title: newProduct.title === "" ? "Title is required." : null,
          price: newProduct.price === 0 ? "Price is required." : null,
          stock: newProduct.stock === 0 ? "Stock is required." : null,
          discountPercentage: newProduct.discountPercentage === 0 ? "Discount Percentage is required." : null,
          brand: newProduct.brand === "" ? "Brand is required." : null,
          rating: newProduct.rating === 0 ? "Rating is required." : null,
          category: newProduct.category === "" ? "Category is required." : null,
          thumbnail: newProduct.thumbnail === "" ? "Thumbnail is required." : null,
          description: newProduct.description === "" ? "Description is required." : null,
        };
        setErrors(newErrors);
      } else {
        const response = await axios.post(`${API_BASE_URL}/products/create`, newProduct, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts((prevProducts) => [...prevProducts, response.data]);
        setShowForm(false);
        setNewProduct({
          title: "",
          description: "",
          price: 0,
          discountPercentage: 0,
          rating: 0,
          stock: 0,
          brand: "",
          category: "",
          thumbnail: "",
        });
        toast.success("Product added successfully!");
      }
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/products/${productIdToUpdate}`,
        newProduct
      );
      const updatedProducts = products.map((prevProduct) =>
        prevProduct.id === productIdToUpdate ? { ...response.data } : prevProduct
      );
      setProducts(updatedProducts);
      toast.success("Product updated successfully!");
      setNewProduct({
        title: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: "",
        category: "",
        thumbnail: "",
      });
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  const handleOpenUpdateForm = (productId) => {
    const productToUpdate = products.find((product) => product.id === productId);
    setProductIdToUpdate(productId);
    setNewProduct({ ...productToUpdate });
    setShowUpdateForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/products/${productId}`);
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  return (
    <div className="flex flex-col w-full text-white">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="m-0.5 p-4 w-full text-slate-500 dark:text-white rounded-xl">
          <CategoryDropdown
            categories={Array.from(new Set(products.map((product) => product.category)))}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {userRole === "1" && (
            <div className="group bg-white border border-gray-200/70 bg-opacity-20 p-4 rounded-lg backdrop-blur-md relative flex items-center justify-center w-inherit h-inherit">
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full sm:w-full md:w-32">
                Add
              </button>
            </div>
          )}
          {selectedCategory !== "" ? (
            <div key={selectedCategory} className="my-12">
              <h2 className="m-1 my-2 px-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-5xl w-fit font-extrabold uppercase tracking-tighter text-transparent">
                {selectedCategory}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts
                  .filter((product) => product.category === selectedCategory)
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantity={quantity}
                      handleAddToCart={() => handleAddToCart(product, product.id, quantity, setProducts)}
                      handleDeleteProduct={handleDeleteProduct}
                      handleOpenUpdateForm={handleOpenUpdateForm}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div>
              {uniqueCategories
                .filter(category => {
                  const matchingProducts = filteredProducts.filter(product => product.category === category);
                  return matchingProducts.length > 0;
                })
                .map((category) => (
                  <div key={category} className="mb-28">
                    <h2 className="m-1 my-2 px-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-5xl w-fit font-extrabold uppercase tracking-tighter text-transparent">
                      {category}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {" "}
                      {filteredProducts
                        .filter((product) => product.category === category)
                        .map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            quantity={quantity}
                            handleAddToCart={() => handleAddToCart(product, product.id, quantity, setProducts)}
                            handleDeleteProduct={handleDeleteProduct}
                            handleOpenUpdateForm={handleOpenUpdateForm}
                          />
                        ))}
                      {userRole === "1" && (
                        <div className="group bg-white border border-gray-200/70 bg-opacity-20 p-4 rounded-lg shadow-lg backdrop-blur-md relative flex items-center justify-center w-inherit h-inherit">
                          <button
                            onClick={() => setShowForm(true)}
                            className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full sm:w-full md:w-32">
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              }
            </div>
          )
          }

          {showUpdateForm && (
            <ProductForm
              {...newProduct}
              isAddOrEditProduct={false}
              handleInputChange={handleInputChange}
              onSaveProduct={handleUpdateProduct}
              onClose={() => setShowUpdateForm(false)}
            />
          )}
          {showForm && (
            <ProductForm
              {...newProduct}
              errors={errors}
              isAddOrEditProduct={true}
              handleInputChange={handleInputChange}
              onSaveProduct={handleAddProduct}
              onClose={() => setShowForm(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ProductList;
