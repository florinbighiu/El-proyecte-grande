import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../api/apiService";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import Loading from "../layout/Loading";
import CategoryDropdown from "../components/CategoryDropdown";
import { defaultQuantity } from "../utils/authConstants";
import { handleAddToCart } from "../api/addToCart";
import { fetchProducts } from "../api/fetchProducts";
import toast from "react-hot-toast";

const EMPTY_PRODUCT = {
  title: "", description: "", price: 0, discountPercentage: 0,
  rating: 0, stock: 0, brand: "", category: "", thumbnail: "",
};

const PRODUCTS_PER_PAGE = 12;

const ProductList = () => {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [newProduct, setNewProduct] = useState(EMPTY_PRODUCT);

  useEffect(() => {
    fetchProducts(setProducts, setIsLoading);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const filteredProducts = useMemo(() =>
    products.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }), [products, searchQuery, selectedCategory]
  );

  const uniqueCategories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateProduct = () => {
    const required = ["title", "description", "brand", "category", "thumbnail"];
    const newErrors = {};
    required.forEach((key) => {
      if (!newProduct[key]) newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
    });
    if (!newProduct.price || newProduct.price <= 0) newErrors.price = "Price must be greater than 0.";
    if (!newProduct.stock || newProduct.stock <= 0) newErrors.stock = "Stock must be greater than 0.";
    return newErrors;
  };

  const handleAddProduct = async () => {
    const validationErrors = validateProduct();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await apiService.post("/products/create", newProduct);
      setProducts((prev) => [...prev, response.data]);
      setShowForm(false);
      setNewProduct(EMPTY_PRODUCT);
      toast.success("Product added successfully!");
    } catch {
      toast.error("Failed to create product.");
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await apiService.put(`/products/${productIdToUpdate}`, newProduct);
      setProducts((prev) => prev.map((p) => (p.id === productIdToUpdate ? response.data : p)));
      toast.success("Product updated successfully!");
      setShowUpdateForm(false);
      setNewProduct(EMPTY_PRODUCT);
    } catch {
      toast.error("Failed to update product.");
    }
  };

  const handleOpenUpdateForm = (productId) => {
    const product = products.find((p) => p.id === productId);
    setProductIdToUpdate(productId);
    setNewProduct({ ...product });
    setShowUpdateForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await apiService.delete(`/products/${productId}`);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      toast.success("Product deleted.");
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const categoriesToShow = selectedCategory
    ? [selectedCategory]
    : uniqueCategories.filter((cat) => paginatedProducts.some((p) => p.category === cat));

  return (
    <div className="flex flex-col w-full">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="m-0.5 p-4 w-full rounded-xl">
          <CategoryDropdown
            categories={uniqueCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {isAdmin && (
            <div className="flex items-center justify-between mb-4 py-2">
              <p className="text-xs text-slate-500 font-medium">Admin mode — you can add, edit and delete products.</p>
              <button
                onClick={() => { setNewProduct(EMPTY_PRODUCT); setErrors({}); setShowForm(true); }}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 px-5 rounded-full transition">
                + Add Product
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-400 mt-16 text-lg">No products found.</p>
          ) : (
            <>
              {categoriesToShow.map((category) => {
                const categoryProducts = paginatedProducts.filter((p) => p.category === category);
                if (!categoryProducts.length) return null;
                return (
                  <div key={category} className="mb-16">
                    <h2 className="m-1 my-3 px-1 text-2xl font-bold text-slate-700 capitalize">
                      {category}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {categoryProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          quantity={defaultQuantity}
                          handleAddToCart={() => handleAddToCart(product, product.id, defaultQuantity, setProducts)}
                          handleDeleteProduct={handleDeleteProduct}
                          handleOpenUpdateForm={handleOpenUpdateForm}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-8 mb-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-5 py-2 rounded-full bg-white bg-opacity-40 border border-gray-200 text-gray-700 disabled:opacity-40 hover:bg-opacity-60 transition text-sm font-medium">
                    ← Prev
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-5 py-2 rounded-full bg-white bg-opacity-40 border border-gray-200 text-gray-700 disabled:opacity-40 hover:bg-opacity-60 transition text-sm font-medium">
                    Next →
                  </button>
                </div>
              )}
            </>
          )}

          {showUpdateForm && (
            <ProductForm
              {...newProduct}
              errors={errors}
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
              onClose={() => { setShowForm(false); setErrors({}); }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
