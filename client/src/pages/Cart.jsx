import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMinus, FiPlus, FiX, FiShoppingBag, FiShoppingCart, FiTruck } from "react-icons/fi";
import apiService from "../api/apiService";
import { useAuth } from "../contexts/AuthContext";
import Checkout from "../components/Checkout";
import EmptyCart from "../assets/empty.png";

const DELIVERY_FEE = 20;

const itemSubtotal = (item) => {
  const base = item.product.price;
  const disc = item.product.discountPercentage;
  const unit = disc > 0 ? base - (base * disc) / 100 : base;
  return unit * item.quantity;
};

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const { product, quantity } = item;
  const unitPrice =
    product.discountPercentage > 0
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;
  const subtotal = unitPrice * quantity;

  return (
    <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
      <div className="w-20 h-20 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-1.5">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-800 text-sm leading-tight truncate">
              {product.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 capitalize">{product.category}</p>
            <p className="text-xs text-slate-500 mt-1">
              ${unitPrice.toFixed(2)} each
              {product.discountPercentage > 0 && (
                <span className="ml-1.5 text-slate-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => onRemove(item)}
            aria-label={`Remove ${product.title} from cart`}
            className="text-slate-300 hover:text-red-400 transition p-0.5 flex-shrink-0 rounded"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div
            className="flex items-center gap-1 bg-slate-50 border border-gray-200 rounded-full px-2 py-1"
            role="group"
            aria-label={`Quantity for ${product.title}`}
          >
            <button
              onClick={() => onDecrease(item)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition rounded-full hover:bg-slate-200"
            >
              <FiMinus size={11} />
            </button>
            <span
              className="text-sm font-semibold w-6 text-center text-slate-800 tabular-nums"
              aria-live="polite"
              aria-label={`Quantity: ${quantity}`}
            >
              {quantity}
            </span>
            <button
              onClick={() => onIncrease(item)}
              aria-label="Increase quantity"
              className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800 transition rounded-full hover:bg-slate-200"
            >
              <FiPlus size={11} />
            </button>
          </div>

          <p className="font-bold text-slate-800 text-sm tabular-nums">
            ${subtotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { userId } = useAuth();
  const [cartProducts, setCartProducts] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    apiService
      .get(`/cart/items/${userId}`)
      .then((res) => setCartProducts(res.data))
      .catch(() => toast.error("Failed to load cart."))
      .finally(() => setLoading(false));
  }, [userId]);

  const decreaseQuantity = async (item) => {
    try {
      await apiService.put(`/cart/update/decrease/${item.id}/1`);
      setCartProducts((prev) =>
        prev
          .map((p) => (p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p))
          .filter((p) => p.quantity > 0)
      );
    } catch {
      toast.error("Failed to update quantity.");
    }
  };

  const increaseQuantity = async (item) => {
    try {
      await apiService.put(`/cart/update/increase/${item.id}/1`);
      setCartProducts((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p))
      );
    } catch {
      toast.error("Not enough stock available.");
    }
  };

  const handleRemove = async (item) => {
    try {
      await apiService.delete(`/cart/remove/${item.id}`);
      setCartProducts((prev) => prev.filter((p) => p.id !== item.id));
      toast.success("Item removed.");
    } catch {
      toast.error("Failed to remove item.");
    }
  };

  const handleCheckoutSuccess = () => {
    setCartProducts([]);
    setShowCheckout(false);
  };

  const subtotal = cartProducts.reduce((acc, item) => acc + itemSubtotal(item), 0);
  const total = subtotal + DELIVERY_FEE;
  const itemCount = cartProducts.reduce((acc, item) => acc + item.quantity, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full mt-24">
        <span className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-100 border-t-indigo-600" />
      </div>
    );
  }

  if (!cartProducts.length) {
    return (
      <div className="flex flex-col items-center justify-center w-full mt-16 px-4">
        <img src={EmptyCart} alt="Empty cart" className="h-40 mb-6 opacity-60" />
        <h2 className="text-xl font-semibold text-slate-700 mb-1">Your cart is empty</h2>
        <p className="text-slate-400 text-sm mb-8">Add some products to get started.</p>
        <Link
          to="/products"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full transition"
        >
          <FiShoppingBag size={16} />
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-baseline gap-3 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Shopping Cart</h1>
        <span className="text-sm text-slate-400">{itemCount} {itemCount === 1 ? "item" : "items"}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3" aria-label="Cart items">
          {cartProducts.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <aside className="lg:col-span-1" aria-label="Order summary">
          <div className="sticky top-20 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-slate-800 text-base mb-5">Order Summary</h2>

            <ul className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-1">
              {cartProducts.map((item) => (
                <li key={item.id} className="flex justify-between text-sm text-slate-500">
                  <span className="truncate max-w-[60%]">
                    {item.product.title}
                    <span className="text-slate-400 ml-1">×{item.quantity}</span>
                  </span>
                  <span className="font-medium text-slate-700 tabular-nums">
                    ${itemSubtotal(item).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-100 pt-4 space-y-2.5 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-slate-700">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span className="flex items-center gap-1.5">
                  <FiTruck size={13} className="text-green-500" />
                  Delivery
                </span>
                <span className="font-medium text-green-600">${DELIVERY_FEE}.00</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800 text-base pt-3 border-t border-gray-100">
                <span>Total</span>
                <span className="tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-full transition flex items-center justify-center gap-2 text-sm"
            >
              <FiShoppingCart size={15} />
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="block text-center mt-3 text-xs text-slate-400 hover:text-slate-600 transition"
            >
              ← Continue shopping
            </Link>
          </div>
        </aside>
      </div>

      {showCheckout && (
        <Checkout
          onClose={() => setShowCheckout(false)}
          onSuccess={handleCheckoutSuccess}
          cartItems={cartProducts}
          totalCost={subtotal}
          deliveryFee={DELIVERY_FEE}
        />
      )}
    </div>
  );
};

export default Cart;