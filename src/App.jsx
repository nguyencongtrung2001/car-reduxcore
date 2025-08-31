import "./App.css";
import Login from "./page/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
