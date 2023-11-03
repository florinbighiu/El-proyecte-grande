import { useEffect, useState } from "react";
import axios from "axios";

import AddForm from "../components/AddForm";
import UpdateForm from "../components/UpdateForm";
import ProductCard from "../components/ProductCard";
import Loading from "../layout/Loading.jsx";
import toast from "react-hot-toast";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("role");
  const quantity = 1;

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
    image: "",
  });

  const fetchProducts = async () => {
    try {
      if (!token) {
        return;
      }

      const response = await axios.get("http://localhost:8080/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    fetchProducts();
  }, []);

  const handleAddToCart = async (product, productId, quantity) => {
    try {
      if (product.stock > 0) {
        const response = await axios.post(
          `http://localhost:8080/cart/add/${productId}/${quantity}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
      console.error("Error adding product to the cart", error);
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
        newProduct.name === "" ||
        newProduct.price === 0 ||
        newProduct.image === "" ||
        newProduct.description === ""
      ) {
        console.error("Please fill in all required fields.");
      } else {
        const response = await axios.post("http://localhost:8080/products/create", newProduct, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts((prevProducts) => [...prevProducts, response.data]);
        setShowForm(false);
        setNewProduct({
          name: "",
          description: "",
          price: 0,
          discountPercentage: 0,
          rating: 0,
          stock: 0,
          brand: "",
          category: "",
          image: "",
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
        prevProduct.id === productIdToUpdate ? { ...response.data } : prevProduct
      );
      setProducts(updatedProducts);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: "",
        category: "",
        image: "",
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
      await axios.delete(`http://localhost:8080/products/${productId}`);
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex flex-col text-white">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="m-0.5 p-4 text-slate-500 dark:text-white rounded-xl">
          {Array.from(new Set(products.map((product) => product.category))).map((category) => (
            <div key={category} className="mb-28">
              <h2 className="m-1 px-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-5xl w-fit font-extrabold uppercase tracking-tighter text-transparent">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {" "}
                {products
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
                  <div className="group bg-gradient-to-r from-slate-700 to-slate-800 bg-opacity-50 p-4 rounded-lg shadow-lg backdrop-blur-md hover:cursor-pointer relative flex items-center justify-center w-inherit h-inherit">
                    <button
                      onClick={() => setShowForm(true)}
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md sm:w-full md:w-32">
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

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
