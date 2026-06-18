/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FiArrowRight, FiStar, FiTruck, FiShield } from "react-icons/fi";

import ProductCard from "../components/ProductCard.jsx";
import ProductForm from "../components/ProductForm.tsx";
import Loading from "../layout/Loading.jsx";
import apiService from "../api/apiService.js";
import { useAuth } from "../contexts/AuthContext.jsx";

const MARQUEE = [
  "Free shipping over $75",
  "New arrivals every week",
  "30-day easy returns",
  "Secure checkout",
  "Loved by 10,000+ shoppers",
];

const Testimonial = ({ quote, author, role }) => (
  <figure className="relative bg-white border border-clay-soft rounded-2xl p-7 shadow-sm">
    <span className="absolute -top-4 left-6 text-clay text-6xl font-serif leading-none select-none">"</span>
    <div className="flex gap-0.5 text-clay mb-4 mt-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar key={i} size={14} className="fill-clay" />
      ))}
    </div>
    <blockquote className="text-ink/90 leading-relaxed mb-6">{quote}</blockquote>
    <figcaption className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-ink text-cream font-semibold flex items-center justify-center text-sm">
        {author[0]}
      </div>
      <div>
        <p className="text-ink font-semibold text-sm leading-tight">{author}</p>
        <p className="text-ink-soft text-xs">{role}</p>
      </div>
    </figcaption>
  </figure>
);

const Homepage = () => {
  const { userId, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [productIdToUpdate, setProductIdToUpdate] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    apiService
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => console.error("Failed to fetch products"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleAddToCart = async (product, productId, quantity) => {
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    if (product.stock <= 0) {
      toast.error("Product is out of stock!");
      return;
    }
    try {
      await apiService.post(`/cart/add/${userId}/${productId}/${quantity}`, {});
      toast.success("Added to cart!");
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, stock: p.stock - quantity } : p))
      );
    } catch {
      toast.error("Could not add to cart. Please try again.");
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleOpenUpdateForm = (productId) => {
    const product = products.find((p) => p.id === productId);
    setProductIdToUpdate(productId);
    setEditedProduct({ ...product });
    setShowUpdateForm(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await apiService.put(`/products/${productIdToUpdate}`, editedProduct);
      setProducts((prev) => prev.map((p) => (p.id === productIdToUpdate ? response.data : p)));
      toast.success("Product updated successfully!");
      setShowUpdateForm(false);
    } catch {
      toast.error("Failed to update product.");
    }
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

  const featuredProducts = products.slice(0, 4);
  const heroProduct = products[0];
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))].slice(0, 6);
  const heroPrice =
    heroProduct && heroProduct.discountPercentage > 0
      ? heroProduct.price - (heroProduct.price * heroProduct.discountPercentage) / 100
      : heroProduct?.price;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* ── Hero (asymmetric) ─────────────────────────── */}
      <section className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center pt-12 pb-16 lg:pt-20 lg:pb-20">
        <div>
          <div className="inline-flex items-center gap-2 mb-5 pl-1.5 pr-3 py-1.5 bg-clay-soft text-clay-dark rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-clay animate-pulse" />
            New arrivals every week
          </div>
          <h1 className="text-5xl lg:text-[4.2rem] font-extrabold text-ink tracking-tight leading-[1.02] mb-5">
            Things you'll
            <br />
            actually <span className="text-clay italic font-serif font-medium">love.</span>
          </h1>
          <p className="text-lg text-ink-soft max-w-md mb-8 leading-relaxed">
            A tightly edited shop of quality goods at honest prices — handpicked,
            and delivered straight to your door.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-ink text-cream py-3.5 px-7 rounded-full hover:bg-clay font-semibold transition-colors"
            >
              Shop Now <FiArrowRight size={17} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center text-ink font-semibold py-3.5 px-2 border-b-2 border-transparent hover:border-clay transition-colors"
            >
              Our story
            </Link>
          </div>
          <div className="flex items-center gap-6 mt-10 text-sm">
            <div>
              <p className="font-bold text-ink text-xl">10k+</p>
              <p className="text-ink-soft text-xs">Happy shoppers</p>
            </div>
            <span className="w-px h-8 bg-clay-soft" />
            <div>
              <p className="font-bold text-ink text-xl flex items-center gap-1">
                4.8 <FiStar size={14} className="fill-clay text-clay" />
              </p>
              <p className="text-ink-soft text-xs">Average rating</p>
            </div>
            <span className="w-px h-8 bg-clay-soft" />
            <div>
              <p className="font-bold text-ink text-xl">{products.length || "—"}</p>
              <p className="text-ink-soft text-xs">Products in stock</p>
            </div>
          </div>
        </div>

        {/* featured product showpiece */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute inset-0 m-auto w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-clay-soft/70 blur-2xl" aria-hidden />
          <div className="relative w-full max-w-sm">
            {heroProduct ? (
              <div className="bg-white rounded-3xl border border-clay-soft shadow-xl shadow-clay/5 p-6 animate-floaty">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-clay-dark bg-clay-soft px-2.5 py-1 rounded-full">
                    ★ Featured
                  </span>
                  {heroProduct.discountPercentage > 0 && (
                    <span className="text-xs font-bold text-white bg-clay px-2.5 py-1 rounded-full">
                      −{heroProduct.discountPercentage.toFixed(0)}%
                    </span>
                  )}
                </div>
                <Link to={`/product/${heroProduct.id}`} className="block">
                  <div className="h-56 flex items-center justify-center bg-cream-deep rounded-2xl p-6 mb-4">
                    <img
                      src={heroProduct.thumbnail}
                      alt={heroProduct.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-ink truncate">{heroProduct.title}</h3>
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-extrabold text-ink">${heroPrice.toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(heroProduct, heroProduct.id, 1)}
                    className="text-sm font-semibold text-clay hover:text-clay-dark inline-flex items-center gap-1"
                  >
                    Add <FiArrowRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-clay-soft shadow-xl p-6 h-80 animate-pulse" />
            )}
          </div>
        </div>
      </section>

      {/* ── Marquee strip ─────────────────────────────── */}
      <div className="border-y border-clay-soft overflow-hidden py-3.5 -mx-4">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0" aria-hidden={dup === 1}>
              {MARQUEE.map((t, j) => (
                <span key={j} className="flex items-center text-sm font-medium text-ink-soft">
                  <span className="px-6">{t}</span>
                  <FiStar size={11} className="fill-clay text-clay" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Category chips ────────────────────────────── */}
      {categories.length > 0 && (
        <section className="py-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-sm font-semibold text-ink-soft mr-1">Browse:</span>
            {categories.map((cat) => (
              <Link
                key={cat}
                to="/products"
                className="capitalize text-sm font-medium px-4 py-2 rounded-full bg-white border border-clay-soft text-ink hover:bg-ink hover:text-cream hover:border-ink transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Featured products ─────────────────────────── */}
      <section className="pb-16">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex items-end justify-between mb-7">
              <div>
                <span className="block w-10 h-1 bg-clay rounded-full mb-3" />
                <h2 className="text-3xl font-extrabold text-ink tracking-tight">Featured products</h2>
              </div>
              <Link
                to="/products"
                className="text-clay-dark hover:text-clay text-sm font-semibold inline-flex items-center gap-1"
              >
                View all <FiArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={1}
                  handleAddToCart={handleAddToCart}
                  handleDeleteProduct={handleDeleteProduct}
                  handleOpenUpdateForm={handleOpenUpdateForm}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {showUpdateForm && (
        <ProductForm
          {...editedProduct}
          errors={errors}
          isAddOrEditProduct={false}
          handleInputChange={handleEditInputChange}
          onSaveProduct={handleUpdateProduct}
          onClose={() => setShowUpdateForm(false)}
        />
      )}

      {/* ── Social proof ──────────────────────────────── */}
      <section className="py-12">
        <div className="text-center mb-12">
          <span className="text-clay-dark text-sm font-semibold uppercase tracking-wider">Reviews</span>
          <h2 className="text-3xl font-extrabold text-ink tracking-tight mt-2">Loved by real shoppers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <Testimonial
            quote="The products are genuinely well-chosen and the prices are unbeatable. My new go-to shop."
            author="John Doe"
            role="Verified buyer"
          />
          <Testimonial
            quote="Top-notch service — my order arrived fast and packed with care. Couldn't be happier."
            author="Jane Smith"
            role="Member since 2024"
          />
        </div>
      </section>

      {/* ── Closing CTA (warm, no gradient) ───────────── */}
      <section className="my-16 rounded-3xl bg-ink text-cream overflow-hidden relative">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-clay/25 blur-2xl" aria-hidden />
        <div className="relative grid lg:grid-cols-12 gap-8 items-center py-16 px-8 lg:px-14">
          <div className="lg:col-span-8">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
              Ready to find your
              <br />
              next <span className="text-clay italic font-serif font-medium">favorite?</span>
            </h2>
            <p className="text-cream/70 max-w-md">
              Free shipping on orders over $75 · 30-day returns · secure checkout.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-cream text-ink py-3.5 px-8 rounded-full hover:bg-clay hover:text-cream font-semibold transition-colors"
            >
              Start shopping <FiArrowRight size={17} />
            </Link>
            <div className="flex items-center gap-4 mt-6 lg:justify-end text-cream/60 text-xs">
              <span className="inline-flex items-center gap-1.5"><FiTruck size={13} /> Fast delivery</span>
              <span className="inline-flex items-center gap-1.5"><FiShield size={13} /> Secure</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
