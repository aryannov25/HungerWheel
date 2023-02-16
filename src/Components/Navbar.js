import Logo from "../assets/img/HungerWheel.png";

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
            <a href="/">
              <li>About</li>
            </a>
            <a href="/">
              <li>Store</li>
            </a>
          </ul>
        </div>
        <div className="mt-6 mr-4 items-center">
          <ul className="flex space-x-4 p-2">
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
