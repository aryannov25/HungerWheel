import React from "react";
import Nav from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { IMG_CDN_URL } from "./Constants";
import { clearCart } from "./cartSlice";

function Cart() {
  const cartItems = useSelector((store) => store.cart);
  // console.log(cartItems.items);

  const dispatch = useDispatch();

  // console.log();
  localStorage.getItem("foodItems")

  
  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.clear();
  };

  // const totalAmount =
  //   items.reduce((c, a) => {
  //     const itemPrice = a.price ? a.price : a.defaultPrice;
  //     return c + a.quantity * itemPrice;
  //   }, 0) / 100;

  // const govTaxes = (totalAmount * 12) / 100;

  // const toPayAmount = (totalAmount + govTaxes).toFixed(2);

  return (
    <>
      <Nav />

      {/* <div className="flex justify-between mx-20 bg-[#E6E9EB]">
        <div className="bg-white m-5 flex-1">Account</div>
        <div className="flex flex-col p-8 bg-white m-6 min-h-[calc(100vh_-_200px)] min-w-[500px]">
          <div className="flex mb-4">
            <div>
              <img
                className="h-14 w-14"
                src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/h7wbfbhtwsagfa4ecklk"
                alt=""
              />
            </div>
            <div className="flex flex-col flex-1 ml-3">
              <span className="text-xl font-semibold">{restaurant.name}</span>
              <span className="text-sm text-[#686b78]">
                {restaurant.areaName}
              </span>
            </div>
          </div>
          <div>
            {cartItems.items.map((items) => {
              return <CartIt key={item.id} item={items} />;
            })}
          </div>
          <div className="flex flex-col mt-10 text-sm">
            <div className="font-semibold py-2">{"Bill Details"}</div>
            <div className="flex justify-between border-b py-2 text-[#686b78] border-b-gray-100">
              <div>{"Item Total"}</div>
              <div>{"₹" + totalAmount}</div>
            </div>
            <div className="flex justify-between border-b-2 border-black py-2 text-[#686b78]">
              <div>{"Govt Taxes & Other Charges"}</div>
              <div>{"₹" + govTaxes}</div>
            </div>
            <div className="flex justify-between font-bold text-black py-4">
              <div>{"TO PAY"}</div>
              <div>{"₹" + toPayAmount}</div>
            </div>
          </div>
        </div>
      </div> */}

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
                <li type="1">
                  <div className="menu-item">
                    <div className="menu-item-details">
                      <h3 className="item-title">{items.name}</h3>
                      <p className="item-cost">
                        {items.price > 0
                          ? new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(items.price / 100)
                          : " "}
                      </p>
                      <p className="item-desc">{items.description}</p>
                    </div>
                    <div className="menu-img-wrapper">
                      {items.imageId && (
                        <img
                          className="menu-item-img"
                          src={IMG_CDN_URL + items.imageId}
                          alt={items.description}
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
    </>
  );
}

export default Cart;
