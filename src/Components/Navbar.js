import Logo from "../assets/img/HungerWheel.png";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <div>
      <div className="flex justify-between bg-orange-200">
        <img className="h-20 w-24 m-2" src={Logo} alt="logo" />
        <div className="mt-6 mr-4 items-center">
          <ul className="flex space-x-4 p-2">
            <a href="/">
              <li>Home</li>
            </a>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/store">
              <li>Store</li>
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
