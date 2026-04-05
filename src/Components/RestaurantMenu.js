import { useParams, Link } from "react-router-dom";
import { PLACES_PHOTO_URL, formatTypes, formatPrice } from "./Constants";
import { getMenuForPlace } from "./menuData";
import useRestaurantMenu from "./useRestaurantMenu";
import { MenuShimmer } from "./Shimmer";
import Nav from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./scrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "./cartSlice";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const place = useRestaurantMenu(resId);
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  if (!place) return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />
      <MenuShimmer />
      <ScrollToTop />
      <Footer />
    </div>
  );

  const { displayName, formattedAddress, rating, userRatingCount,
          photos, types, regularOpeningHours, priceLevel } = place;

  const cuisines  = formatTypes(types);
  const price     = formatPrice(priceLevel);
  const isOpen    = regularOpeningHours?.openNow;
  const menuItems = getMenuForPlace(types || []);
  const photoUrl  = photos?.[0]?.name ? PLACES_PHOTO_URL(photos[0].name) : null;
  const totalInCart = cartItems.length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Nav />

      {/* Hero */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        {photoUrl ? (
          <img src={photoUrl} alt={displayName?.text} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center text-7xl">
            🍽️
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Back button */}
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2.5 transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-sm" />
        </Link>

        {/* Restaurant info on hero */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 text-white">
          <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-1">
            {displayName?.text}
          </h1>
          <p className="text-white/80 text-sm mb-3">{cuisines.join(" · ")}</p>
          <div className="flex flex-wrap items-center gap-2">
            {rating && (
              <span className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                ★ {rating}
                <span className="font-normal opacity-80">({userRatingCount})</span>
              </span>
            )}
            {price && (
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {price}
              </span>
            )}
            {isOpen !== undefined && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}>
                {isOpen ? "Open Now" : "Closed"}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-screen-md mx-auto w-full px-4 py-6 space-y-5">

        {/* Address */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-location-dot text-orange-500 text-sm" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-medium mb-0.5">Address</p>
            <p className="text-sm text-gray-700">{formattedAddress}</p>
          </div>
        </div>

        {/* Opening Hours */}
        {regularOpeningHours?.weekdayDescriptions && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <i className="fa-regular fa-clock text-orange-500 text-sm" />
              </div>
              <h2 className="font-semibold text-gray-800 text-sm">Opening Hours</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
              {regularOpeningHours.weekdayDescriptions.map((day, i) => (
                <li key={i} className="text-xs text-gray-500">{day}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Menu */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Menu</h2>
          <ul className="space-y-3">
            {menuItems.map((item) => {
              const qty = cartItems.filter((c) => c.id === item.id).length;
              return (
                <li
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 p-4 hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-gray-100"
                  />
                  <div className="flex-grow min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug">{item.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{item.description}</p>
                    <span className="text-orange-500 font-bold text-sm mt-1.5 block">
                      ₹{item.price / 100}
                    </span>
                  </div>

                  {/* Quantity control */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      aria-label="Remove one"
                      onClick={() => dispatch(removeItem(item))}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg transition-colors ${
                        qty > 0
                          ? "bg-orange-500 text-white hover:bg-orange-600"
                          : "bg-gray-100 text-gray-300 cursor-not-allowed"
                      }`}
                      disabled={qty === 0}
                    >
                      &ndash;
                    </button>
                    <span className="text-sm font-bold text-gray-800 w-5 text-center">{qty}</span>
                    <button
                      aria-label="Add one"
                      onClick={() => dispatch(addItem(item))}
                      className="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold text-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Sticky cart CTA */}
      {totalInCart > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-sm">
          <Link to="/cart" onClick={() => window.scrollTo(0, 0)}>
            <div className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-2xl transition-colors cursor-pointer">
              <span className="bg-orange-600 text-white text-xs font-bold rounded-lg px-2.5 py-1">
                {totalInCart} item{totalInCart !== 1 ? "s" : ""}
              </span>
              <span className="font-bold text-sm">View Cart</span>
              <i className="fa-solid fa-arrow-right text-sm" />
            </div>
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default RestaurantMenu;
