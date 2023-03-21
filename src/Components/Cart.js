import React from "react";
import Nav from "./Navbar";
import { useSelector } from "react-redux";

function Cart() {
  const cartItems = useSelector((store) => store.cart);
  console.log(cartItems.items);
  return (
    <>
      <Nav />

      {Object.values(cartItems.items).map((cartItems) => {
        return (
          <li type="1" className="text-center">
            {cartItems}
          </li>
        );
      })}
    </>
  );
}

export default Cart;
