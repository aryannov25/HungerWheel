import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./src/App";
import RestaurantMenu from "./src/Components/RestaurantMenu";
import Store from "./src/Components/Store";
import About from "./src/Components/About";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
      <Route path="/cart" element={<About />} />
      <Route path="/store" element={<Store />} />
    </Routes>
  </BrowserRouter>
);
