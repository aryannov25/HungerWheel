import { React, useEffect, useState } from "react";
import Nav from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { IMG_CDN_URL } from "./Constants";
import { clearCart } from "./cartSlice";

function Cart() {
  const cartItems = useSelector((store) => store.cart);
  console.log(cartItems?.items?.card?.info?.price );

  const dispatch = useDispatch();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("foodItems")));
  }, []);

  console.log(cart);

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.clear();
  };

  return (
    <>
      <Nav />

      <div className="menu-title-wrap menu-items-container text-lg font-bold">
        <h3 className="fw-bolder">Cart Items</h3>
      </div>
      <div className="m-6  ">
        <button
          className="flex space-x-4 p-2 btn bg-green-400"
          onClick={() => handleClearCart()}
        >
          Clear Cart
        </button>
      </div>
      {cartItems.items.map((items) => {
        return (
          <div className="restaurant-menu-content">
            <div className="menu-items-container">
              <div className="menu-items-list">
                <li type="none">
                  <div className="menu-item">
                    <div className="menu-item-details">
                      <h3 className="item-title">{items?.card?.info?.name}</h3>
                      <p className="item-cost">
                        {items?.card?.info?.price > 0
                          ? new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(items?.card?.info?.price / 100)
                          : " "}
                      </p>
                      <p className="item-desc">
                        {items?.card?.info?.description}
                      </p>
                    </div>
                    <div className="menu-img-wrapper">
                      {items?.card?.info?.imageId && (
                        <img
                          className="menu-item-img"
                          src={IMG_CDN_URL + items?.card?.info?.imageId}
                          alt={items?.card?.info?.description}
                        />
                      )}
                    </div>
                  </div>
                </li>
              </div>
            </div>
          </div>
        );
      })}
      <div className="text-end font-bold mt-2">
        <hr />
        {/* Total - {items?.card?.info?.price / 100} */}
      </div>
    </>
  );
}

export default Cart;
