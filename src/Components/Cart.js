import { React, useEffect, useState } from "react";
import Nav from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { IMG_CDN_URL } from "./Constants";
import { clearCart } from "./cartSlice";
import Modal from "./Modal";

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  // const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   setCart(JSON.parse(localStorage.getItem("foodItems")));
  // }, []);

  // console.log("as", cart);

  let uniqueFoodItems = [];
  if (cartItems.length > 0) {
    let uniqueItems = [...new Set(cartItems)];
    uniqueFoodItems = uniqueItems.map((value) => [
      value,
      cartItems.filter((str) => str === value).length,
    ]);
  }

  const modalTitle = "Order Confirmation";

  const info = ["Order Placed succesfully! "];

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.clear();
  };
  const placeOrder = () => {
    dispatch(clearCart());
    setOpenModal(true);
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
          onClick={() => {
            handleClearCart();
          }}
          disabled={!cartItems.length}
        >
          Clear Cart
        </button>
      </div>

      {/* {
    <h1>{cart.card.info[0].name}</h1>
  } */}

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-items-list">
            {Object.values(uniqueFoodItems).map((item, index) => {
              return (
                <li type="none" key={index}>
                  <div className="menu-item">
                    <div className="menu-item-details">
                      <h3 className="item-title">
                        {item[0].name} - [{item[1]}]
                      </h3>
                      <p className="item-cost">
                        ₹ {(item[0]?.price || item[0]?.defaultPrice) / 100}
                      </p>
                      <p className="item-desc">{item[0]?.description}</p>
                    </div>
                    <div className="menu-img-wrapper">
                      {item[0]?.imageId && (
                        <img
                          className="w-[118] rounded-md h-[96] object-cover"
                          src={IMG_CDN_URL + item[0]?.imageId}
                          alt="item"
                        />
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </div>
        </div>
      </div>

      {cartItems?.length > 0 && (
        <div className="grid">
          <button
            className="col-span-1 justify-self-center border rounded-lg m-2 bg-orange-200 p-2"
            onClick={() => {
              placeOrder();
            }}
            disabled={!cartItems.length}
          >
            Place Order
          </button>
        </div>
      )}
      {openModal && (
        <Modal closeModal={setOpenModal} info={info} title={modalTitle} />
      )}
      {openInfoModal && (
        <Modal closeModal={setOpenInfoModal} info={infoModel} />
      )}
    </>
  );
}

export default Cart;
