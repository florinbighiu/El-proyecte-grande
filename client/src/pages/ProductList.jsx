import { useEffect, useState, useMemo } from "react";
import { FiPlus, FiX, FiPackage } from "react-icons/fi";
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
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

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

  const handleOpenAddForm = () => {
    setNewProduct(EMPTY_PRODUCT);
    setErrors({});
    setShowForm(true);
  };

  const resultLabel = `${filteredProducts.length} ${filteredProducts.length === 1 ? "product" : "products"}`;

  return (
    <div className="flex flex-col w-full">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Products</h1>
              <p className="text-sm text-slate-400 mt-1">
                {resultLabel}
                {selectedCategory && <span> in <span className="font-medium text-slate-500 capitalize">{selectedCategory}</span></span>}
                {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <CategoryDropdown
                categories={uniqueCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              {isAdmin && (
                <button
                  onClick={handleOpenAddForm}
                  className="inline-flex items-center justify-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold py-2.5 px-5 rounded-full transition whitespace-nowrap">
                  <FiPlus size={16} />
                  Add Product
                </button>
              )}
            </div>
          </div>

          {(selectedCategory || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory("")}
                  className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-medium pl-3 pr-2 py-1.5 rounded-full hover:bg-indigo-100 transition capitalize"
                >
                  {selectedCategory}
                  <FiX size={13} />
                </button>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-600 text-xs font-medium pl-3 pr-2 py-1.5 rounded-full hover:bg-slate-200 transition"
                >
                  &ldquo;{searchQuery}&rdquo;
                  <FiX size={13} />
                </button>
              )}
              <button
                onClick={() => { setSelectedCategory(""); setSearchQuery(""); }}
                className="text-xs text-slate-400 hover:text-slate-600 underline-offset-2 hover:underline transition"
              >
                Clear all
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20 px-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <FiPackage className="text-slate-400" size={26} />
              </div>
              <h2 className="text-lg font-semibold text-slate-700 mb-1">No products found</h2>
              <p className="text-sm text-slate-400 max-w-sm">
                Try adjusting your search or category filter to find what you&apos;re looking for.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5 mt-8 sm:mt-10">
                {paginatedProducts.map((product) => (
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

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-10 mb-4">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-5 py-2 rounded-full bg-white border border-gray-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-200 hover:text-indigo-600 transition text-sm font-medium">
                    ← Prev
                  </button>
                  <span className="text-sm text-slate-500">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-5 py-2 rounded-full bg-white border border-gray-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-200 hover:text-indigo-600 transition text-sm font-medium">
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
