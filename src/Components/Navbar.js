import Logo from "../assets/img/HungerWheel.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);
  return (
    <div>
      <div className="flex justify-between bg-gray-200">
        <a href="/">
          {" "}
          <img className="h-20 w-24 m-2" src={Logo} alt="logo" />
        </a>
        <div className="mt-6 mr-4 items-center">
          <ul className="flex space-x-4 p-2">
            <a href="/">
              <li>Home</li>
            </a>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/cart">
              <li>Cart - {cartItems.length}Items</li>
            </Link>
          </ul>
        </div>
        <div className="mt-6 mr-4 items-center">
          <ul className="flex space-x-4 p-2"></ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
