import { React, useEffect, useState } from "react";
import Nav from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { IMG_CDN_URL } from "./Constants";
import { clearCart } from "./cartSlice";
import Modal from "./Modal";
import Footer from "./Footer";

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
  const total =
    cartItems.length > 0
      ? cartItems
          .map((x) => (x.price > 0 ? x.price / 100 : x.defaultPrice / 100))
          .reduce((sum, a) => sum + a, 0)
      : 0;

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
      {cartItems?.length > 0 && (
        <div className="menu-title-wrap text-center menu-items-container text-lg font-bold">
          <h3 className="fw-bolder">Cart Items- {cartItems.length}</h3>
        </div>
      )}

      {cartItems?.length == 0 && (
        <div className="mt-4 text-center">
          <h1 className="font-bold text-2xl">Cart Empty</h1>
          <h2 className="mt-2 font-semibold text-2xl">
            You can go to <a href="/" className="font-bold">Home Page</a> to view more restaurants.
          </h2>
        </div>
      )}
      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-items-list">
            {Object.values(uniqueFoodItems).map((item, index) => {
              return (
                <div>
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
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {cartItems.length > 0 ? (
        <>
          <div className="items-start text-center mt-3">
            <div className="font-bold">
              <label>Item Total </label>
              {`₹${total}`}
            </div>
          </div>
        </>
      ) : (
        [null]
      )}

      {cartItems?.length > 0 && (
        <div className="grid">
          <button
            className="p-2 mt-2 col-span-1 justify-self-center hover:bg-green-100 bg-green-400 rounded-md"
            onClick={() => {
              handleClearCart();
            }}
            disabled={!cartItems.length}
          >
            Clear Cart
          </button>
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
      {openModal && <Modal closeModal={setOpenModal} />}
      <Footer />
    </>
  );
}

export default Cart;
