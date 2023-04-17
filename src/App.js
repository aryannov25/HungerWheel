import React from "react";
import "./App.css";
import Restaurant from "./Components/Restaurant";
import Nav from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <React.StrictMode>
      <Nav />
      <Restaurant />
      <Footer />
    </React.StrictMode>
  );
}
export default App;
