import Logo from "../assets/img/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cartItems = useSelector((store) => store.cart.items);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={Logo} alt="HungerWheel" className="h-9 w-auto" />
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {[["/" , "Home"], ["/about", "About"], ["/contact", "Contact"]].map(([path, label]) => (
            <li key={path}>
              <Link
                to={path}
                className={`text-sm font-medium transition-colors ${
                  isActive(path)
                    ? "text-orange-500"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Cart */}
        <Link to="/cart">
          <div className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white pl-4 pr-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md">
            <i className="fa-solid fa-bag-shopping text-base" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 shadow-sm">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
