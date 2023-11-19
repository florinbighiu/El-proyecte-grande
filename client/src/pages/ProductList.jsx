import { useEffect, useState } from "react";
import axios from "axios";

import AddForm from "../components/AddForm";
import UpdateForm from "../components/UpdateForm";
import ProductCard from "../components/ProductCard";
import Loading from "../layout/Loading.jsx";
import CategoryDropdown from "../components/CategoryDropdown.jsx";

import toast from "react-hot-toast";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const quantity = 1;

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

  const fetchProducts = async () => {
    try {
      if (!token) {
        return;
      }

      const response = await axios.get("https://el-proyecte-grande-osxq.onrender.com/products");

      if (response) {
        const data = await response.data;
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
    fetchProducts()
  }, []);

  const handleAddToCart = async (product, productId, quantity) => {
    try {
      if (product.stock > 0) {
        const response = await axios.post(
          `https://el-proyecte-grande-osxq.onrender.com/cart/add/${userId}/${productId}/${quantity}`,
          {},
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );

        if (response.status === 200) {
          toast.success("Product added to the cart!");
          setProducts((prevProducts) =>
            prevProducts.map((prevProduct) =>
              prevProduct.id === productId
                ? { ...prevProduct, stock: prevProduct.stock - quantity }
                : prevProduct
            )
          );
        } else {
          toast.error("Failed to add the product!");
        }
      } else {
        toast.error("Product is out of stock!");
      }
    } catch (error) {
      toast.error("An error occurred while adding the product to the cart");
    }
  };


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
        toast.error("Please fill in all required fields.");
      } else {
        const response = await axios.post("https://el-proyecte-grande-osxq.onrender.com/products/create", newProduct, {
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
        `https://el-proyecte-grande-osxq.onrender.com/products/${productIdToUpdate}`,
        newProduct
      );
      const updatedProducts = products.map((prevProduct) =>
        prevProduct.id === productIdToUpdate ? { ...response.data } : prevProduct
      );
      setProducts(updatedProducts);
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
      await axios.delete(`https://el-proyecte-grande-osxq.onrender.com/products/${productId}`);
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));


  return (
    <div className="flex flex-col text-white">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="m-0.5 p-4 text-slate-500 dark:text-white rounded-xl">
          <CategoryDropdown
            categories={Array.from(new Set(products.map((product) => product.category)))}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
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
                      handleAddToCart={handleAddToCart}
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
                            handleAddToCart={handleAddToCart}
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
      )}
    </div>
  );
}

export default ProductList;
