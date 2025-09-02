import "./App.css";
import Login from "./page/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home";
import ProductDetail from "./page/ProductDetail";
import Cart from "./page/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;