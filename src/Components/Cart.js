import React from "react";
import Nav from "./Navbar";
import { useSelector } from "react-redux";

function Cart() {
  const cartItems = useSelector((store) => store.cart);
  console.log(cartItems.items);
  return (
    <>
      <Nav />

      {(cartItems.items).map((items) => {
        return (
          <li type="1" className="text-center">
            {items}
          </li>
        );
      })}
    </>
  );
}

export default Cart;
