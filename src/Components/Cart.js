import { React, useState } from "react";
import Nav from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./cartSlice";
import Modal from "./Modal";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch  = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  // Group items by id
  const grouped = cartItems.reduce((acc, item) => {
    acc[item.id] = acc[item.id] ? { ...acc[item.id], qty: acc[item.id].qty + 1 } : { ...item, qty: 1 };
    return acc;
  }, {});
  const uniqueItems = Object.values(grouped);

  const subtotal = cartItems.reduce((sum, x) => sum + (x.price || x.defaultPrice || 0) / 100, 0);
  const taxes    = 49;
  const delivery = 29;
  const total    = subtotal + taxes + delivery;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />

      {cartItems.length === 0 ? (
        /* Empty state */
        <div className="flex-grow flex flex-col items-center justify-center text-center px-6 py-20">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-4xl mb-6">
            🛒
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-400 text-sm mb-8 max-w-xs">
            Looks like you haven't added anything yet. Explore restaurants and add some food!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors shadow-sm"
          >
            <i className="fa-solid fa-utensils" />
            Browse Restaurants
          </Link>
        </div>
      ) : (
        <div className="flex-grow max-w-2xl mx-auto w-full px-4 py-8 space-y-5">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-gray-900">Your Cart</h1>
            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Items */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
            {uniqueItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4">
                {item.imageUrl && (
                  <img
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-gray-100"
                    src={item.imageUrl}
                    alt={item.name}
                  />
                )}
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h3>
                  <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{item.description}</p>
                  <span className="text-orange-500 font-bold text-sm mt-1 block">
                    ₹{(item.price || item.defaultPrice) / 100}
                  </span>
                </div>
                <div className="shrink-0 bg-orange-100 text-orange-600 rounded-xl px-3 py-1 text-sm font-bold">
                  ×{item.qty}
                </div>
              </div>
            ))}
          </div>

          {/* Price breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
            <h2 className="font-bold text-gray-900 text-sm pb-2 border-b border-gray-50">
              Price Breakup
            </h2>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Item Total</span><span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Taxes & Charges</span><span>₹{taxes}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Delivery Fee</span><span>₹{delivery}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-base pt-3 border-t border-gray-100">
              <span>Total</span>
              <span className="text-orange-500">₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pb-6">
            <button
              className="flex-1 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-xl font-semibold text-sm transition-colors"
              onClick={() => { dispatch(clearCart()); localStorage.clear(); }}
            >
              Clear Cart
            </button>
            <button
              className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm hover:shadow-md"
              onClick={() => { dispatch(clearCart()); setOpenModal(true); }}
            >
              Place Order
            </button>
          </div>

        </div>
      )}

      {openModal && <Modal closeModal={setOpenModal} />}
      <Footer />
    </div>
  );
}

export default Cart;
