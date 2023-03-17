import React from "react";
import "./App.css";
import Restaurant from "./Components/Restaurant";
import Footer from "./Components/Footer";
import RestaurantMenu from "./Components/RestaurantMenu";
import { Provider } from "react-redux";
import store from "./Components/Store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Restaurant />
      </Provider>
    </div>
  );
}
export default App;
