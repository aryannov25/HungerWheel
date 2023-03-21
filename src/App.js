import React from "react";
import "./App.css";
import Restaurant from "./Components/Restaurant";
import { Provider } from "react-redux";
import store from "./Components/Store";
import Nav from "./Components/Navbar";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Restaurant />
      </Provider>
    </React.StrictMode>
  );
}
export default App;
