import Logo from "../assets/img/Logo.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <nav className="bg-orange-200 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="logo" className="h-16 w-full m-2 mx-3 navlogo" />
        </Link>
        <ul className="flex space-x-4 p-2">
          <li>
            <Link to="/" className="text-black hover:text-gray-900">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-black hover:text-gray-900">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-black hover:text-gray-900">
              Contact Us
            </Link>
          </li>
        </ul>
        <ul className="flex space-x-4 p-2">
          <li>
            <Link to="/cart" className="text-black hover:text-gray-900">
              <i className="fa fa-shopping-cart mr-2" />
              Cart - {cartItems.length}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
