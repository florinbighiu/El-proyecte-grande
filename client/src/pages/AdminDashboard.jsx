import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FiPackage, FiUsers, FiAlertTriangle, FiXCircle,
  FiSearch, FiPlus, FiEdit2, FiTrash2, FiChevronLeft
} from "react-icons/fi";
import apiService from "../api/apiService";
import ProductForm from "../components/ProductForm";
import Loading from "../layout/Loading";
import toast from "react-hot-toast";

const EMPTY_PRODUCT = {
  title: "", description: "", price: 0, discountPercentage: 0,
  rating: 0, stock: 0, brand: "", category: "", thumbnail: "",
};

const StatCard = ({ icon, label, value, bg, text }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
      <span className={text}>{icon}</span>
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </div>
  </div>
);

const StockBadge = ({ stock }) => {
  if (stock === 0) return <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-600 font-medium">Out of stock</span>;
  if (stock < 25) return <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">Low ({stock})</span>;
  return <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600 font-medium">{stock}</span>;
};

const RoleBadge = ({ role }) => (
  <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${role === "ADMIN" ? "bg-red-100 text-red-600" : "bg-indigo-100 text-indigo-600"}`}>
    {role}
  </span>
);

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("products");
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formProduct, setFormProduct] = useState(EMPTY_PRODUCT);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    Promise.all([apiService.get("/products"), apiService.get("/users/all")])
      .then(([pr, ur]) => { setProducts(pr.data); setUsers(ur.data); })
      .catch(() => toast.error("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    totalProducts: products.length,
    totalUsers: users.length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock < 25).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
  };

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(
      (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(
      (u) => u.username.toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q)
    );
  }, [users, search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormProduct((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateProduct = () => {
    const required = ["title", "description", "brand", "category", "thumbnail"];
    const errs = {};
    required.forEach((k) => {
      if (!formProduct[k]) errs[k] = `${k.charAt(0).toUpperCase() + k.slice(1)} is required.`;
    });
    if (!formProduct.price || formProduct.price <= 0) errs.price = "Price must be greater than 0.";
    if (formProduct.stock === "" || formProduct.stock < 0) errs.stock = "Stock must be 0 or more.";
    return errs;
  };

  const handleAddProduct = async () => {
    const errs = validateProduct();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    try {
      const res = await apiService.post("/products/create", formProduct);
      setProducts((prev) => [...prev, res.data]);
      setShowAddForm(false);
      setFormProduct(EMPTY_PRODUCT);
      toast.success("Product added!");
    } catch { toast.error("Failed to add product."); }
  };

  const handleEditProduct = async () => {
    try {
      const res = await apiService.put(`/products/${editingId}`, formProduct);
      setProducts((prev) => prev.map((p) => (p.id === editingId ? res.data : p)));
      setShowEditForm(false);
      setFormProduct(EMPTY_PRODUCT);
      toast.success("Product updated!");
    } catch { toast.error("Failed to update product."); }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await apiService.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted.");
    } catch { toast.error("Failed to delete product."); }
  };

  const openEdit = (product) => {
    setFormProduct({ ...product });
    setEditingId(product.id);
    setFormErrors({});
    setShowEditForm(true);
  };

  const openAdd = () => {
    setFormProduct(EMPTY_PRODUCT);
    setFormErrors({});
    setShowAddForm(true);
  };

  if (loading) return <Loading />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/" className="text-slate-400 hover:text-slate-600 transition">
          <FiChevronLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-sm text-slate-500">Manage your store</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<FiPackage size={22} />} label="Total Products" value={stats.totalProducts} bg="bg-indigo-100" text="text-indigo-600" />
        <StatCard icon={<FiUsers size={22} />} label="Total Users" value={stats.totalUsers} bg="bg-violet-100" text="text-violet-600" />
        <StatCard icon={<FiAlertTriangle size={22} />} label="Low Stock" value={stats.lowStock} bg="bg-amber-100" text="text-amber-600" />
        <StatCard icon={<FiXCircle size={22} />} label="Out of Stock" value={stats.outOfStock} bg="bg-red-100" text="text-red-500" />
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {["products", "users"].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setSearch(""); }}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition capitalize ${tab === t ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"}`}
              >
                {t === "products" ? `Products (${stats.totalProducts})` : `Users (${stats.totalUsers})`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 flex-1 sm:w-64">
              <FiSearch size={15} className="text-slate-400 flex-shrink-0" />
              <input
                className="bg-transparent text-sm focus:outline-none text-slate-700 placeholder:text-slate-400 w-full"
                placeholder={`Search ${tab}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {tab === "products" && (
              <button
                onClick={openAdd}
                className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition flex-shrink-0"
              >
                <FiPlus size={15} /> Add
              </button>
            )}
          </div>
        </div>

        {tab === "products" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-12">#</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Product</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Category</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Price</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Stock</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-10 text-center text-slate-400">No products found.</td>
                  </tr>
                ) : (
                  filteredProducts.map((p, i) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-3 text-slate-400 text-xs">{i + 1}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-medium text-slate-800 truncate max-w-[180px]">{p.title}</p>
                            <p className="text-xs text-slate-400 truncate max-w-[180px]">{p.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 hidden md:table-cell">
                        <span className="px-2 py-0.5 text-xs rounded-full bg-slate-100 text-slate-600">{p.category}</span>
                      </td>
                      <td className="px-5 py-3 font-semibold text-slate-800">${Number(p.price).toFixed(2)}</td>
                      <td className="px-5 py-3 hidden sm:table-cell">
                        <StockBadge stock={p.stock} />
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                            title="Edit"
                          >
                            <FiEdit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
                            title="Delete"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === "users" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-12">#</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">User</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Email</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-10 text-center text-slate-400">No users found.</td>
                  </tr>
                ) : (
                  filteredUsers.map((u, i) => {
                    const role = u.authorities?.[0]?.authority ?? "USER";
                    return (
                      <tr key={u.userId} className="hover:bg-slate-50 transition">
                        <td className="px-5 py-3 text-slate-400 text-xs">{i + 1}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center flex-shrink-0">
                              {u.username?.[0]?.toUpperCase() ?? "U"}
                            </div>
                            <span className="font-medium text-slate-800">{u.username}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 hidden sm:table-cell text-slate-500">{u.email || "—"}</td>
                        <td className="px-5 py-3">
                          <RoleBadge role={role} />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddForm && (
        <ProductForm
          {...formProduct}
          errors={formErrors}
          isAddOrEditProduct={true}
          handleInputChange={handleInputChange}
          onSaveProduct={handleAddProduct}
          onClose={() => { setShowAddForm(false); setFormErrors({}); }}
        />
      )}
      {showEditForm && (
        <ProductForm
          {...formProduct}
          errors={formErrors}
          isAddOrEditProduct={false}
          handleInputChange={handleInputChange}
          onSaveProduct={handleEditProduct}
          onClose={() => { setShowEditForm(false); setFormErrors({}); }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;