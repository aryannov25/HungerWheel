import React from "react";

const CartItem = ({ item }) => {
  const itemPrice = item.price ? item.price : item.defaultPrice;
  return (
    <div className="flex justify-between min-w-[400px] py-2">
      <div className="flex justify-between items-center">
        <div className="text-sm max-w-[225px] pr-4">{item.name}</div>
      </div>
      <div className="flex justify-end items-center">
        <div className="ml-2 text-sm w-20 text-end">
          {"₹" + (item.quantity * itemPrice) / 100}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
